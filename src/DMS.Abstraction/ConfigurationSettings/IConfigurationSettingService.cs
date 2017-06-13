using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.ConfigurationSettings
{
    public interface IConfigurationSettingService

    {
        IConfigurationSetting GetConfSettings();

        IConfigurationSetting Update(ConfigurationSetting confSetting);
    }
}
