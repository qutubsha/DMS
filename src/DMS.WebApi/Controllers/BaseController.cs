using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.WebApi.Controllers
{
    public class BaseController:Controller
    {
        private readonly ILogger<ValuesController> _logger;

        protected BaseController(ILogger<ValuesController> logger)
        {
            _logger = logger;
            _logger.LogInformation("Just an error log message text.");
        }


        protected IActionResult Execute(Func<IActionResult> expression)
        {
            try
            {
                return expression();
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex.ToString());
                return BadRequest(ex.Message);
            }
            //catch (NotFoundException ex)
            //{
            //    Log.Warn(ex.ToString());
            //    return NotFound();
            //}
            //catch (RecordAlreadyExist ex)
            //{
            //    Log.Warn(ex.ToString());
            //    return StatusCode(System.Net.HttpStatusCode.Conflict);
            //}
            //catch (FluentValidation.ValidationException ex)
            //{
            //    Log.Warn(ex.ToString());
            //    return BadRequest(ex.Message);
            //}
            catch (Exception ex)
            {
                _logger.LogWarning(ex.ToString());
                return BadRequest(ex.Message);
            }
        }

    }
}
