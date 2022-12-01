export default interface IUser {
  _id?: string;
  name?: string;
  avatar?: string;
  password?: string;
  verified: boolean;
  deleted: boolean;
}