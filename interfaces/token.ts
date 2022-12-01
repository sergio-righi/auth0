export default interface TokenType {
  _id?: string;
  userId?: string;
  number?: string | null;
  code?: string | null;
  done?: number;
  expires?: number;
}
