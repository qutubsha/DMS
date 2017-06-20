using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DMS.Abstraction.SharedDocumentUsers;
using DMS.Repository;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class SharedDocumentUserController : BaseController<SharedDocumentUserController>
    {

        readonly ISharedDocumentUserService _sharedDocUserService;
        public SharedDocumentUserController(ILogger<SharedDocumentUserController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new SharedDocumentUserRepository(settings);
            _sharedDocUserService = new SharedDocumentUserService(repository);
        }

        [HttpGet("SharedWithMe")]
        public IActionResult GetDocumentsSharedWithMe(int loginId)
        {
            return Execute(() => Ok(_sharedDocUserService.GetDocumentsSharedWithMe(loginId)));
        }

        [HttpGet("SharedByMe")]
        public IActionResult GetDocumentsSharedByMe(int loginId)
        {
            return Execute(() => Ok(_sharedDocUserService.GetDocumentsSharedByMe(loginId)));
        }
    }
}
