using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DMS.Repository;
using DMS.Abstraction;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.AspNetCore.Http.Features;
using System.Text;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentController : BaseController<DocumentController>
    {
        readonly DocumentService _documentService;
        public static string fileUploadPath;
        private static readonly FormOptions _defaultFormOptions = new FormOptions();

        public DocumentController(ILogger<DocumentController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new DocumentRepository(settings);
            var accessrepository = new DocumentAccessHistoryRepository(settings);
            _documentService = new DocumentService(repository, accessrepository);
            fileUploadPath = settings.Value.FileUploadPath;
        }

        [HttpGet]
        public IActionResult Get(int loginId, bool showShared)
        {
            return Execute(() => Ok(_documentService.GetAllDocuments(showShared, loginId).Result));
        }

        //[HttpGet("id/durationInHours")]
        //public string GetShareDocumentURL(int id, double durationInHours)
        //{
        //    //TODO Check permission before sharing document URL

        //    var SCollection = new ServiceCollection();
        //    SCollection.AddDataProtection();
        //    var SerPro = SCollection.BuildServiceProvider();
        //    CipherService cipherService = ActivatorUtilities.CreateInstance<Class.CipherService>(SerPro);

        //    DateTime expiry = DateTime.Now.AddHours(durationInHours);

        //    string input = id + "_" + expiry.ToString();
        //    string encrypted = cipherService.Encrypt(input);
        //    string decrypted = cipherService.Decrypt(encrypted);
        //    string url = Request.Host + "/document/download/" + input;
        //    return url;
        //}

        [HttpPost]
        public IActionResult AddDocument([FromBody]Document document, [FromBody]byte[] file)
        {
            // TODO : Check add permission, save document in repository, check date time issue
            return Execute(() => Ok(_documentService.AddDocument(document, file)));
        }

        [HttpDelete]
        public IActionResult Delete(int id, int loginid)
        {
            return Execute(() => Ok(_documentService.DeleteDocument(id, loginid)));
        }

        [HttpGet("getdocument/{id}")]
        public IActionResult GetDocumentById(int id, int loginId)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.GetDocumentById(id, loginId).Result));
        }

        [HttpGet("searchdocuments")]
        public IActionResult GetDocumentById(string fileName, string Extension, DateTime fromDate, DateTime toDate)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.SearchDocument(fileName, Extension, fromDate, toDate).Result));
        }

        [HttpPost("versions/add")]
        public IActionResult CheckInDocument(int documentId, string why, string what,
                                        bool isNewRevision, [FromBody]byte[] file, string fileName,
                                        string extension, int loginId)
        {
            // TODO : validate request, Check ediit permission, check if lock by user is current user, save document in repository
            return Execute(() => Ok(_documentService.CheckInDocument(documentId, why, what,
                                        isNewRevision, file, fileName, extension, loginId)));
        }

        [HttpPut]
        public IActionResult CheckoutDocument(int documentId, int loginId)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.CheckOutDocument(documentId, loginId)));
        }

        [HttpPut("TagDocument/{id}")]
        public IActionResult TagDocument(int id, int loginId, string tags)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.TagDocument(id, loginId, tags)));
        }

        [HttpGet("versions/{id}")]
        public IActionResult GetVersionDetails(int id, int loginId)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.GetVersionDetails(id, loginId).Result));
        }

        [HttpPost("UploadFiles")]
        public async Task<IActionResult> UploadJsonFile()
        {
            try
            {
                int createdBy = 1;
                if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                    return BadRequest($"Expected a multipart request, but got {Request.ContentType}");

                string targetFilePath = null;

                var boundary = MultipartRequestHelper.GetBoundary(
                    MediaTypeHeaderValue.Parse(Request.ContentType),
                    _defaultFormOptions.MultipartBoundaryLengthLimit);
                var reader = new MultipartReader(boundary, HttpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();
                while (section != null)
                {
                    ContentDispositionHeaderValue contentDisposition;
                    var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);

                    string contentName = contentDisposition.Name.Replace("\"", "");
                    if (contentName.Contains("userId"))
                        createdBy = Convert.ToInt32(contentName.Split('~')[1].ToString());

                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {
                            targetFilePath = Path.GetTempPath() + "\\" + contentDisposition.FileName.Replace("\"", "");
                            using (var targetStream = System.IO.File.Create(targetFilePath))
                            {
                                await section.Body.CopyToAsync(targetStream);
                            }

                            // Saves document details in database
                            byte[] file = new byte[100];
                            var document = new Document()
                            {
                                CreatedBy = createdBy,
                                CurrentRevision = 1,
                                CurrentVersion = 1,
                                Extension = Path.GetExtension(targetFilePath),
                                FileName = Path.GetFileNameWithoutExtension(targetFilePath),
                            };
                            Execute(() => Ok(_documentService.AddDocument(document, file).Status));
                        }
                    }

                    // Drains any remaining section body that has not been consumed and
                    // reads the headers for the next section.
                    section = await reader.ReadNextSectionAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            var uploadedData = new UploadedData()
            {
                Name = "",
                Age = 0,
                Zipcode = 0,
                FilePath = ""
            };
            return Json(uploadedData);
        }

        [HttpGet("DownloadFile")]
        public async Task<IActionResult> DownloadFile(int documentId, int versionId, int revisionId, int userId)
        {
            Document document = await _documentService.GetDocumentById(documentId, userId);
            string filePath = fileUploadPath + "\\" + documentId + "\\" + versionId + "\\" + revisionId + document.Extension;
            var stream = new MemoryStream();
            using (var file = System.IO.File.OpenRead(filePath))
            {
                file.CopyTo(stream);
            }
            stream.Position = 0;

            var response = File(stream, "application/octet-stream"); // FileStreamResult
            return response;
        }

        [HttpPost("uploadCheckedInFile")]
        //[DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> uploadCheckedInFile()
        {
            try
            {
                int createdBy = 1;
                int DocumentId = 1;
                bool IsRevision = false;
                string What = "";
                string Why = "";

                if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                {
                    return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
                }

                // Used to accumulate all the form url encoded key value pairs in the 
                // request.
                var formAccumulator = new KeyValueAccumulator();
                string targetFilePath = null;

                var boundary = MultipartRequestHelper.GetBoundary(
                    MediaTypeHeaderValue.Parse(Request.ContentType),
                    _defaultFormOptions.MultipartBoundaryLengthLimit);
                var reader = new MultipartReader(boundary, HttpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();
                while (section != null)
                {
                    ContentDispositionHeaderValue contentDisposition;
                    var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);

                    string contentName = contentDisposition.Name.Replace("\"", "");
                    if (contentName.Contains("userId"))
                    {
                        createdBy = Convert.ToInt32(contentName.Split('~')[1].ToString());
                    }
                    if (contentName.Contains("documentId"))
                    {
                        DocumentId = Convert.ToInt32(contentName.Split('~')[1].ToString());
                    }
                    if (contentName.Contains("What"))
                    {
                        What = Convert.ToString(contentName.Split('~')[1]);
                    }
                    if (contentName.Contains("Why"))
                    {
                        Why = Convert.ToString(contentName.Split('~')[1]);
                    }
                    if (contentName.Contains("revision"))
                    {
                        if (Convert.ToInt32(contentName.Split('~')[1].ToString()) == 1)
                        {
                            IsRevision = false;
                        }
                        else if (Convert.ToInt32(contentName.Split('~')[1].ToString()) == 2)
                        {
                            IsRevision = true;
                        }

                    }

                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {
                            targetFilePath = Path.GetTempPath() + "\\" + contentDisposition.FileName.Replace("\"", "");
                            using (var targetStream = System.IO.File.Create(targetFilePath))
                            {
                                await section.Body.CopyToAsync(targetStream);
                            }

                            // Saves document details in database
                            //Document document, [FromBody]byte[] file
                            byte[] file = new byte[100];
                            var Extension = Path.GetExtension(targetFilePath);
                            var FileName = Path.GetFileNameWithoutExtension(targetFilePath);

                            Execute(() => Ok(_documentService.CheckInDocument(DocumentId, Why, What, IsRevision, file, FileName, Extension, createdBy).Status));
                            //var myTask = _documentService.AddDocument(document, file); // call your method which will return control once it hits await
                            //string result = myTask.Status.ToString();
                        }

                    }

                    section = await reader.ReadNextSectionAsync();
                }


            }
            catch (Exception ex)
            {

                throw ex;
            }
            var uploadedData = new UploadedData()
            {
                Name = "",
                Age = 0,
                Zipcode = 0,
                FilePath = ""
            };
            return Json(uploadedData);
        }

        [HttpGet("GetTags")]
        public IActionResult GetTags(int loginId)
        {
                return Execute(() => Ok(_documentService.GetTags(loginId).Result));
        }

    }

    public static class MultipartRequestHelper
    {
        // Content-Type: multipart/form-data; boundary="----WebKitFormBoundarymx2fSWqWSd0OxQqq"
        // The spec says 70 characters is a reasonable limit.
        public static string GetBoundary(MediaTypeHeaderValue contentType, int lengthLimit)
        {
            var boundary = HeaderUtilities.RemoveQuotes(contentType.Boundary);
            if (string.IsNullOrWhiteSpace(boundary))
            {
                throw new InvalidDataException("Missing content-type boundary.");
            }

            if (boundary.Length > lengthLimit)
            {
                throw new InvalidDataException(
                    $"Multipart boundary length limit {lengthLimit} exceeded.");
            }

            return boundary;
        }

        public static bool IsMultipartContentType(string contentType)
        {
            return !string.IsNullOrEmpty(contentType)
                   && contentType.IndexOf("multipart/", StringComparison.OrdinalIgnoreCase) >= 0;
        }

        public static bool HasFormDataContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            // Content-Disposition: form-data; name="key";
            return contentDisposition != null
                   && contentDisposition.DispositionType.Equals("form-data")
                   && string.IsNullOrEmpty(contentDisposition.FileName)
                   && string.IsNullOrEmpty(contentDisposition.FileNameStar);
        }

        public static bool HasFileContentDisposition(ContentDispositionHeaderValue contentDisposition)
        {
            // Content-Disposition: form-data; name="myfile1"; filename="Misc 002.jpg"
            return contentDisposition != null
                   && contentDisposition.DispositionType.Equals("form-data")
                   && (!string.IsNullOrEmpty(contentDisposition.FileName)
                       || !string.IsNullOrEmpty(contentDisposition.FileNameStar));
        }
    }

    public class UploadedData
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public int Zipcode { get; set; }

        public string FilePath { get; set; }
    }
}
