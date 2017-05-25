using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DMS.Repository;
using DMS.Abstraction.DocumentAccessHistories;
using DMS.Abstraction;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentAccessHistoryController : BaseController<DocumentAccessHistoryController>
    {
        readonly DocumentAccessHistoryService _documentAccessHistoryService;

        public DocumentAccessHistoryController(ILogger<DocumentAccessHistoryController> logger, 
                IOptions<Settings> settings) : base(logger)
        {
            var repository = new DocumentAccessHistoryRepository(settings);
            _documentAccessHistoryService = new DocumentAccessHistoryService(repository);
        }

        [HttpGet("{documentId}")]
        public List<DocumentAccessHistory> Get(int documentId)
        {
            return _documentAccessHistoryService.GetDocumentAccessHistory(documentId).Result;
        }

        [HttpPost]
        public IActionResult InsertDocumentAccessLog([FromBody]DocumentAccessHistory documentAccesHistory)
        {
            return Execute(() => Ok(_documentAccessHistoryService.InsertDocumentAccessLog(documentAccesHistory)));
        }
    }
}
