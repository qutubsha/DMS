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

        // GET: api/values
        [HttpGet]
        public List<Document> Get()
        {
            //var SCollection = new ServiceCollection();
            //SCollection.AddDataProtection();
            //var SerPro = SCollection.BuildServiceProvider();
            //CipherService cipherService = ActivatorUtilities.CreateInstance<Class.CipherService>(SerPro);

            //string input = "1/10-10-2017";
            //string encrypted = cipherService.Encrypt(input);
            //string decrypted = cipherService.Decrypt(encrypted);
            //string url = "http://localhost:56833/api/Document/";

            //return new string[] { input, encrypted, decrypted , url+encrypted};
            return _documentService.GetAllDocuments(false, 1).Result;//new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id,int loginid)
        {
             await _documentService.DeleteDocument(id, loginid);
        }
    }
}
