import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ICreateUser } from '@org/data-api';
import { UserRol } from '../../../features/src/lib/schemas/user.schema'

export class CreateUserDto implements ICreateUser {
  @IsString()
  naam!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  wachtwoord!: string;

  @IsNotEmpty()
  @IsEnum(UserRol)
  rol!: UserRol;
}
