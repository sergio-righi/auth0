import passport from 'passport';
import { Request } from 'express';
import { Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';

import { UserModel } from '../models';
import { enums, env, crypto, jwt } from '../utils';

class JWTProvider {
  constructor() {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: (req: Request) => {
            try {
              if (!req.headers.authorization) {
                throw new Error('token was not provided, authorization header is empty');
              }

              const authorization = req.headers.authorization;
              const tokenFromHeader = authorization.includes('&') ? authorization.split('&')[1] : authorization;
              // const tokenFromHeader = req.headers.authorization.replace('Bearer ', '').trim();
              const decryptedToken = crypto.decrypt(tokenFromHeader);
              const tokenType = jwt.getTokenType(decryptedToken);

              if (tokenType !== enums.TokenType.ACCESS_TOKEN) {
                throw new Error('wrong token type provided');
              }

              return decryptedToken;
            } catch (err: any) {
              console.error('Token is not valid', err.message);
              return null;
            }
          },
          secretOrKey: env.get('authorization.secret'),
          passReqToCallback: true,
        },
        (req: any, payload: any, done: VerifiedCallback) => {
          UserModel.findById(payload.sub, (err: any, user: any) => {
            if (err) return done(err, false);
            req.currentUser = user?.toObject();
            return !user ? done(null, false) : done(null, user);
          });
        },
      ),
    );
  }
}

export default new JWTProvider();