using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.ConfigurationSettings
{
    public interface IConfigurationSetting
    {
        int ConfSettingId { get; set; }
        string Repository { get; set; }

        decimal Size { get; set; }

        string EncryptionKey { get; set; }
    }
}
