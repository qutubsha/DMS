using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentController : BaseController<DocumentController>
    {
        readonly DocumentService _documentService;
        public static string fileUploadPath;

        public DocumentController(ILogger<DocumentController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new DocumentRepository(settings);
            var accessrepository = new DocumentAccessHistoryRepository(settings);
            _documentService = new DocumentService(repository, accessrepository);
            fileUploadPath = settings.Value.FileUploadPath;
        }

        [HttpGet]
        public IActionResult Get(int loginId)
        {
            return Execute(() => Ok(_documentService.GetAllDocuments(false, loginId).Result));
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
        public IActionResult AddDocument([FromBody]Document document, [FromBody]byte[] file, string fileUploadPath)
        {
            // TODO : Check add permission, save document in repository, check date time issue
            return Execute(() => Ok(_documentService.AddDocument(document, file, fileUploadPath)));
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

        [HttpPost("UploadFiles")]
        public HttpResponseMessage UploadJsonFile(int userId)
        {
            HttpResponseMessage response = new HttpResponseMessage();

            var httpRequest = HttpContext.Request;
            if (httpRequest.Form.Files.Count > 0)
            {
                long size = httpRequest.Form.Files.Sum(f => f.Length);
                foreach (var formFile in httpRequest.Form.Files)
                {
                    IFormFile postedFile = httpRequest.Form.Files[formFile.Name];
                    var filePath1 = Path.GetTempPath() + "\\" + formFile.FileName;
                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(filePath1, FileMode.Create))
                        {
                            formFile.CopyToAsync(stream);
                        }

                        // Saves document details in database
                        //Document document, [FromBody]byte[] file
                        byte[] file = new byte[100];
                        var document = new Document()
                        {
                            CreatedBy = userId,
                            CurrentRevision = 1,
                            CurrentVersion = 1,
                            Extension = Path.GetExtension(filePath1),
                            FileName = Path.GetFileNameWithoutExtension(filePath1),
                        };
                        var myTask = _documentService.AddDocument(document, file, fileUploadPath); // call your method which will return control once it hits await
                        string result = myTask.Status.ToString();
                    }
                }
            }
            return response;
        }
    }
}
