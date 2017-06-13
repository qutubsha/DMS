using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using DMS.Repository;
using Microsoft.Extensions.Options;
using DMS.Abstraction.ConfigurationSettings;

namespace DMS.WebApi.Controllers
{
    [Route("api/configurationsettings")]
    public class ConfigurationSettingsController : BaseController<ConfigurationSettingsController>
    {
        readonly ConfigurationSettingService _confSettingService;
        public ConfigurationSettingsController(ILogger<ConfigurationSettingsController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new ConfigurationSettingRepository(settings);
            _confSettingService = new ConfigurationSettingService(repository);
        }

        [HttpGet]
        public IActionResult GetConfSettings()
        {
            return Execute(() => Ok(_confSettingService.GetConfSettings()));
        }

        [HttpPut]
        public IActionResult UpdateConfSettings([FromBody] ConfigurationSetting confSetting)
        {
            return Execute(() => Ok(_confSettingService.Update(confSetting)));
        }
    }
}
