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

        public DocumentController(ILogger<DocumentController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new DocumentRepository(settings);
            var accessrepository = new DocumentAccessHistoryRepository(settings);
            _documentService = new DocumentService(repository, accessrepository);
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
        public IActionResult TagDocument(int id, int loginId,string tags)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.TagDocument(id, loginId,tags)));
        }

        [HttpGet("versions/{id}")]
        public IActionResult GetVersionDetails(int id, int loginId)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.GetVersionDetails(id, loginId).Result));
        }

        [HttpPost("UploadFiles")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();

            var httpRequest = HttpContext.Request;
            if (httpRequest.Form.Files.Count > 0)
            {
                long size = httpRequest.Form.Files.Sum(f => f.Length);
                foreach (var formFile in httpRequest.Form.Files)
                {
                    IFormFile postedFile = httpRequest.Form.Files[formFile.Name];

                    //var filePath = HttpContext.Request.HttpContext.Request MsapPath("~/UploadFile/" + postedFile.FileName);
                    ////postedFile.SaveAs(filePath);
                    //var postedFile = httpRequest.Files[file];
                    //File abc = new File(;
                    //var filePath = HttpContext.Request.u .MapPath("~/UploadFile/" + postedFile.FileName);
                    //postedFile.SaveAs(filePath);


                    //    System.Console.WriteLine("You received the call!");
                    //  WriteLog("PostFiles call received!", true);
                    //We would always copy the attachments to the folder specified above but for now dump it wherver....


                    // full path to file in temp location
                    var filePath = Path.GetTempFileName();
                    var fileName = Path.GetTempFileName();
                    var filePath1 = Path.GetFullPath("D:\\DMSUploadFiles") + "\\" + formFile.FileName;


                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(filePath1, FileMode.Create))
                        {
                            formFile.CopyToAsync(stream);
                            //formFile.CopyToAsync(stream);
                        }
                    }
                    // process uploaded files
                    // Don't rely on or trust the FileName property without validation.
                    //Displaying File Name for verification purposes for 

                    // return Ok(new { count = httpRequest.Form.Files.Count, fileName, size, filePath });

                }
            }
            return response;
        }
    }
}
