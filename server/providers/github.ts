import passport from 'passport';
import { Request } from 'express';
import { VerifiedCallback } from 'passport-jwt';
import { Strategy as GithubStrategy } from 'passport-github2';

import { AuthService } from '../services';

const providerName = 'github';
const passportConfig = AuthService.getConfigByProviderName(providerName);
const processUserData = ({ _json: json }) => {
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    avatar: json.avatar_url
  }
}

if (passportConfig.clientID) {
  passport.use(
    new GithubStrategy(
      { ...passportConfig, passReqToCallback: true },
      (req: Request, accessToken: string, refreshToken: string, profile: any, verified: VerifiedCallback) => {
        AuthService.processUserFromSSO(req, processUserData(profile), providerName, verified);
      },
    ),
  );
}