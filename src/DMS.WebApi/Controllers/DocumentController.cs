using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using DMS.WebApi.Class;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DMS.Repository;
using DMS.Abstraction.Documents;
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
using System.Globalization;
using System.Threading;
//using System.Net;
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
        [GenerateAntiforgeryTokenCookieForAjax]
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

        //[HttpPost("UploadFiles")]
        //public HttpResponseMessage UploadJsonFile(int userId)
        //{
        //    HttpResponseMessage response = new HttpResponseMessage();

        //    var httpRequest = HttpContext.Request;
        //    if (httpRequest.Form.Files.Count > 0)
        //    {
        //        long size = httpRequest.Form.Files.Sum(f => f.Length);
        //        foreach (var formFile in httpRequest.Form.Files)
        //        {
        //            IFormFile postedFile = httpRequest.Form.Files[formFile.Name];
        //            var filePath1 = Path.GetTempPath() + "\\" + formFile.FileName;
        //            if (formFile.Length > 0)
        //            {
        //                using (var stream = new FileStream(filePath1, FileMode.Create))
        //                {
        //                    formFile.CopyToAsync(stream);
        //                }

        //                // Saves document details in database
        //                //Document document, [FromBody]byte[] file
        //                byte[] file = new byte[100];
        //                var document = new Document()
        //                {
        //                    CreatedBy = userId,
        //                    CurrentRevision = 1,
        //                    CurrentVersion = 1,
        //                    Extension = Path.GetExtension(filePath1),
        //                    FileName = Path.GetFileNameWithoutExtension(filePath1),
        //                };
        //                var myTask = _documentService.AddDocument(document, file); // call your method which will return control once it hits await
        //                string result = myTask.Status.ToString();
        //            }
        //        }
        //    }
        //    return response;
        //}

        // 1. Disable the form value model binding here to take control of handling 
        //    potentially large files.
        // 2. Typically antiforgery tokens are sent in request body, but since we 
        //    do not want to read the request body early, the tokens are made to be 
        //    sent via headers. The antiforgery token filter first looks for tokens
        //    in the request header and then falls back to reading the body.


        [HttpPost("UploadFiles")]
        //[DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> UploadJsonFile()
        {
            try
            {
                int createdBy = 1;

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
                            var document = new Document()
                            {
                                CreatedBy = createdBy,
                                CurrentRevision = 1,
                                CurrentVersion = 1,
                                Extension = Path.GetExtension(targetFilePath),
                                FileName = Path.GetFileNameWithoutExtension(targetFilePath),
                            };
                            Execute(() => Ok(_documentService.AddDocument(document, file).Status));
                            //var myTask = _documentService.AddDocument(document, file); // call your method which will return control once it hits await
                            //string result = myTask.Status.ToString();
                        }
                        //else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                        //{
                        //    // Content-Disposition: form-data; name="key"
                        //    //
                        //    // value

                        //    // Do not limit the key name length here because the 
                        //    // multipart headers length limit is already in effect.
                        //    var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        //    var encoding = GetEncoding(section);
                        //    using (var streamReader = new StreamReader(
                        //        section.Body,
                        //        encoding,
                        //        detectEncodingFromByteOrderMarks: true,
                        //        bufferSize: 1024,
                        //        leaveOpen: true))
                        //    {
                        //        // The value length limit is enforced by MultipartBodyLengthLimit
                        //        var value = await streamReader.ReadToEndAsync();
                        //        if (String.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                        //        {
                        //            value = String.Empty;
                        //        }
                        //        formAccumulator.Append(key, value);

                        //        if (formAccumulator.ValueCount > _defaultFormOptions.ValueCountLimit)
                        //        {
                        //            throw new InvalidDataException($"Form key count limit {_defaultFormOptions.ValueCountLimit} exceeded.");
                        //        }
                        //    }
                        //}
                    }

                    // Drains any remaining section body that has not been consumed and
                    // reads the headers for the next section.
                    section = await reader.ReadNextSectionAsync();
                }

                // Bind form data to a model
                //var user = new User();
                //var formValueProvider = new FormValueProvider(
                //    BindingSource.Form,
                //    new FormCollection(formAccumulator.GetResults()),
                //    CultureInfo.CurrentCulture);

                //var bindingSuccessful = await TryUpdateModelAsync(user, prefix: "",
                //    valueProvider: formValueProvider);
                //if (!bindingSuccessful)
                //{
                //    if (!ModelState.IsValid)
                //    {
                //        return BadRequest(ModelState);
                //    }
                //}
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

        [HttpGet("Docu")]
        public async Task<IActionResult> DownloadF(int documentId, int userId)
        {
            //var stream = await { { __get_stream_here__} }
            Task<Document> document = _documentService.GetDocumentById(documentId, userId);
            Document doc = document.Result;
            // To Do: Set Version Id and Revision Id dynamic foe getting the file from Uploaded path.
            string filePath = fileUploadPath + "\\" + documentId + "\\" + "1" + "\\" + "1" + doc.Extension;
            var stream = new MemoryStream();
            using (var file = System.IO.File.OpenRead(filePath))
            {
                file.CopyTo(stream);
            }
            stream.Position = 0;

            var response = File(stream, "application/octet-stream"); // FileStreamResult
            return response;
        }

        [HttpPost("DownloadFile")]
        public HttpResponseMessage DownloadFile(int documentId, int userId)
        {
            //var response = Request.CreateResponse(HttpStatusCode.OK);
            //response.Content = new StreamContent(stream);
            //// ...
            //// stream.Write(...);
            //// ...
            //return response;

            //string targetFilePath = Path.GetTempPath() + "\\";// + contentDisposition.FileName.Replace("\"", "");
            //File
            //using ()
            //{
            //    await section.Body.CopyToAsync(targetStream);
            //}

            //var targetStream = System.IO.File.ReadAllBytes("d:\\file.txt");
            //FileStream file = new FileStream("d:\\file.txt", FileMode.Create, FileAccess.Write);
            //var streamReader = new StreamReader("d:\\file.txt", Encoding.UTF8);
            //response.Content = new StreamContent(file);
            //return response;

            //HttpResponseMessage objResponse = new HttpResponseMessage();
            //Task<Document> document = _documentService.GetDocumentById(documentId, userId);
            //Document doc = document.Result;
            //if (doc != null)
            //{
            //    // To Do: Set Version Id and Revision Id dynamic foe getting the file from Uploaded path.
            //    string filePath = fileUploadPath + "\\" + documentId + "\\" + "1" + "\\" + "1" + doc.Extension;
            //    objResponse.Content = new StreamContent(new FileStream(filePath, FileMode.Open, FileAccess.Read));
            //    objResponse.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            //    objResponse.Content.Headers.ContentDisposition.FileName = doc.FileName + doc.Extension;
            //}
            //return objResponse;

            HttpResponseMessage response = new HttpResponseMessage();
            Task<Document> document = _documentService.GetDocumentById(documentId, userId);
            Document doc = document.Result;
            if (doc != null)
            {
                // To Do: Set Version Id and Revision Id dynamic foe getting the file from Uploaded path.
                string filePath = fileUploadPath + "\\" + documentId + "\\" + "1" + "\\" + "1" + doc.Extension;
                var stream = new MemoryStream();
                using (var file = System.IO.File.OpenRead(filePath))
                {
                    file.CopyTo(stream);
                }
                stream.Position = 0;

                response.StatusCode = System.Net.HttpStatusCode.OK;
                response.Content = new ByteArrayContent(stream.ToArray());
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(MimeMapping.MimeTypes.GetMimeMapping(doc.FileName + doc.Extension));
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = doc.FileName + doc.Extension;
            }
            return response;
        }

        [HttpPost]
        [Route("down")]
        public ByteArrayContent Download(int documentId, int userId)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            ByteArrayContent result = null;
            try
            {
                Task<Document> document = _documentService.GetDocumentById(documentId, userId);
                Document doc = document.Result;
                // To Do: Set Version Id and Revision Id dynamic foe getting the file from Uploaded path.
                string filePath = fileUploadPath + "\\" + documentId + "\\" + "1" + "\\" + "1" + doc.Extension;

                var stream = new MemoryStream();
                using (var file = System.IO.File.OpenRead(filePath))
                {
                    file.CopyTo(stream);
                }
                stream.Position = 0;

                result = new ByteArrayContent(stream.ToArray());

                //using (MemoryStream ms = new MemoryStream())
                //{
                //    using (FileStream file = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                //    {
                //        byte[] bytes = new byte[file.Length];
                //        file.Read(bytes, 0, (int)file.Length);
                //        ms.Write(bytes, 0, (int)file.Length);



                //        //result = new ByteArrayContent(bytes.ToArray());


                //        //httpResponseMessage.Content.Headers.Add("x-filename", doc.FileName + doc.Extension);
                //        //httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                //        //httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                //        //httpResponseMessage.Content.Headers.ContentDisposition.FileName = doc.FileName + doc.Extension;
                //        //httpResponseMessage.StatusCode = System.Net.HttpStatusCode.OK;
                //    }
                //}
            }
            catch (Exception ex)
            {
                //return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
            return result;
        }

        private static Encoding GetEncoding(MultipartSection section)
        {
            MediaTypeHeaderValue mediaType;
            var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out mediaType);
            // UTF-7 is insecure and should not be honored. UTF-8 will succeed in 
            // most cases.
            if (!hasMediaTypeHeader || Encoding.UTF7.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
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

    }

    public class GenerateAntiforgeryTokenCookieForAjaxAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var antiforgery = context.HttpContext.RequestServices.GetService<IAntiforgery>();

            // We can send the request token as a JavaScript-readable cookie, 
            // and Angular will use it by default.
            var tokens = antiforgery.GetAndStoreTokens(context.HttpContext);
            context.HttpContext.Response.Cookies.Append(
                "XSRF-TOKEN",
                tokens.RequestToken,
                new CookieOptions() { HttpOnly = false });
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DisableFormValueModelBindingAttribute : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var formValueProviderFactory = context.ValueProviderFactories
                .OfType<FormValueProviderFactory>()
                .FirstOrDefault();
            if (formValueProviderFactory != null)
            {
                context.ValueProviderFactories.Remove(formValueProviderFactory);
            }

            var jqueryFormValueProviderFactory = context.ValueProviderFactories
                .OfType<JQueryFormValueProviderFactory>()
                .FirstOrDefault();
            if (jqueryFormValueProviderFactory != null)
            {
                context.ValueProviderFactories.Remove(jqueryFormValueProviderFactory);
            }
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
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
