﻿using DMS.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.WebApi.Controllers
{ 
    public abstract class BaseController<T>:Controller
    {
        private ILogger<T> _logger;

        protected BaseController(ILogger<T> logger)
        {
            _logger = logger;
            //_logger.LogInformation("Just an error log message text.");
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
            catch (NotFoundException ex)
            {
                _logger.LogWarning(ex.ToString());
                return NotFound();
            }
            catch (RecordAlreadyExist ex)
            {
                _logger.LogWarning(ex.ToString());
                return StatusCode((int)System.Net.HttpStatusCode.Conflict);
            }
            catch (FluentValidation.ValidationException ex)
            {
                _logger.LogWarning(ex.ToString());
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex.ToString());
                return BadRequest(ex.Message);
            }
        }

    }
}
