using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.ConfigurationSettings
{
    [BsonIgnoreExtraElements]
    public class ConfigurationSetting : IConfigurationSetting
    {
        public int ConfSettingId
        {
            get; set;
        }

        public string EncryptionKey
        {
            get;set;
        }

        public string Repository
        {
            get; set;
        }

        public decimal Size
        {
            get; set;
        }
    }
}
