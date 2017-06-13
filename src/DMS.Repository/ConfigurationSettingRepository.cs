using System;
using System.Linq;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using DMS.Abstraction.ConfigurationSettings;

namespace DMS.Repository
{
    public class ConfigurationSettingRepository : IConfigurationSettingRepository
    {
        private readonly DMSContext _context = null;

        public ConfigurationSettingRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }

        public IConfigurationSetting GetConfSettings()
        {
            return _context.ConfigurationSettings.AsQueryable().FirstOrDefault();
        }

        public IConfigurationSetting Update(ConfigurationSetting confSetting)
        {
            if (confSetting == null) { throw new ArgumentNullException(nameof(confSetting), "configuration Setting should not be null."); }

            ConfigurationSetting repositoryConfSetting = _context.ConfigurationSettings.AsQueryable().FirstOrDefault(x => x.ConfSettingId == confSetting.ConfSettingId);
            if (repositoryConfSetting == null) { throw new ArgumentNullException(nameof(confSetting), "No such configuration settings exists in the system."); }

            repositoryConfSetting.EncryptionKey = confSetting.EncryptionKey;
            repositoryConfSetting.Repository = confSetting.Repository;
            repositoryConfSetting.Size = confSetting.Size;


            var filter = Builders<ConfigurationSetting>.Filter.Eq(s => s.ConfSettingId, confSetting.ConfSettingId);
            _context.ConfigurationSettings.ReplaceOne(filter, repositoryConfSetting);

            return repositoryConfSetting;
        }
    }
}
