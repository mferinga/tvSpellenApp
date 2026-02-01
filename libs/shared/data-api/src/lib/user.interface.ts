import { UserRol } from '@org/features'

export interface IUser {
  _id: string;
  naam: string;
  email: string;
  wachtwoord: string;
  rol: UserRol;
}

export type ICreateUser = Pick<
  IUser,
  'naam' | 'email' | 'wachtwoord' | 'rol'
>;
