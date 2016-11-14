import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
  version: string;
};

export const AppConfig: IAppConfig = {
  version: '1.0.1-beta'
};
