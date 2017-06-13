using DMS.Abstraction.ConfigurationSettings;

namespace DMS
{
    public class ConfigurationSettingService : IConfigurationSettingService
    {

        private IConfigurationSettingRepository _confSettingRepository;

        public ConfigurationSettingService(IConfigurationSettingRepository confSettingRepository)
        {
            _confSettingRepository = confSettingRepository;
        }

        /// <summary>
        /// Get configuration settings
        /// </summary>
        /// <returns></returns>
        public IConfigurationSetting GetConfSettings()
        {
            return _confSettingRepository.GetConfSettings();
        }

        /// <summary>
        /// Update configuration settings
        /// </summary>
        /// <param name="confSetting"></param>
        /// <returns>Configuration setting</returns>
        public IConfigurationSetting Update(ConfigurationSetting confSetting)
        {
            return _confSettingRepository.Update(confSetting);
        }
    }
}
