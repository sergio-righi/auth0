import { enums } from '../utils'

export default interface JWTType {
  xp: number;
  type: enums.TokenType;
  sub: string;
}