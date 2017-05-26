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
            _documentService = new DocumentService(repository);
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

        [HttpDelete("{id}")]
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

        [HttpGet("versions/{id}")]
        public IActionResult GetVersionDetails(int id, int loginId)
        {
            //TODO : Check permission, validate request
            return Execute(() => Ok(_documentService.GetVersionDetails(id, loginId).Result));
        }
    }
}
