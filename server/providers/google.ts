import passport from 'passport';
import { Request } from 'express';
import { VerifiedCallback } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { AuthService } from '../services';

const providerName = 'google';
const passportConfig = AuthService.getConfigByProviderName(providerName);
const processUserData = ({ _json: json }) => {
  return {
    id: json.sub,
    name: json.name,
    email: json.email,
    avatar: json.picture
  }
}

if (passportConfig.clientID) {
  passport.use(
    new GoogleStrategy(
      { ...passportConfig, passReqToCallback: true },
      (req: Request, accessToken: string, refreshToken: string, profile: any, verified: VerifiedCallback) => {
        AuthService.processUserFromSSO(req, processUserData(profile), providerName, verified);
      },
    ),
  );
}