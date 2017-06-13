export interface IConfigurationSetting {
    ConfSettingId: number;
    EncryptionKey: string;
    Repository: string;
    Size: number;
}

export class ConfigurationSetting implements IConfigurationSetting {
    constructor(
        public ConfSettingId: number,
        public EncryptionKey: string,
        public Repository: string,
        public Size: number
    ) { }
}