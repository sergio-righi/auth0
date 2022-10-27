import fs from 'fs';
import { join } from 'path';

import { AuthController } from '../controllers';
import { helper } from '../utils';

export default {

  init() {
    const providersPath = join(__dirname, '..', 'providers');
    fs.readdirSync(providersPath).forEach((file) => {
      const authFile = helper.removeExtensionFromFile(file);
      import(join(providersPath, authFile));
    });
  },

  getConfigByProviderName(providerName: string) {
    return {
      clientID: '',//env.get(`authentication.${providerName}.clientID` as any),
      clientSecret: '',//env.get(`authentication.${providerName}.clientSecret` as any),
      scope: '',//env.get(`authentication.${providerName}.scope` as any),
      callbackURL: this._getCallback(providerName),
    };
  },

  processUserFromSSO: AuthController.handleThirdPartyProvider,

  find: AuthController.find,

  _getCallback: (providerName: string) => `http://localhost:3000/auth/${providerName}/callback`
}