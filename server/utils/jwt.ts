import { decode, sign, verify } from 'jsonwebtoken';

import { JWTType } from '../interfaces';
import { crypto, enums, env } from '../utils';

const generateToken = (userId: string, type: enums.TokenType) => {
  const audience = env.get('authentication.token.audience');
  const issuer = env.get('authentication.token.issuer');
  const secret = env.get('authorization.secret');
  const expiresIn =
    type === enums.TokenType.ACCESS_TOKEN
      ? env.get('authentication.token.expiresIn')
      : env.get('authentication.refreshToken.expiresIn');

  const token = sign({ type }, secret, {
    expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId,
  });

  return {
    token: crypto.encrypt(token),
    expiration: (decode(token) as JWTType).xp * 1000,
  };
};

export default {
  generateAccessToken: (userId: string) => {
    return generateToken(userId, enums.TokenType.ACCESS_TOKEN);
  },

  generateRefreshToken: (userId: string) => {
    return generateToken(userId, enums.TokenType.REFRESH_TOKEN);
  },

  getTokenType: (token: string): enums.TokenType => {
    return (verify(token, env.get('authorization.secret')) as JWTType).type;
  },

  parseTokenAndGetUserId: (token: string): string => {
    const decryptedToken = crypto.decrypt(token);
    const decoded = verify(decryptedToken, env.get('authorization.secret')) as JWTType;
    return decoded.sub || '';
  }
}