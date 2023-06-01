import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsString()
  @IsNotEmpty({
    message: 'Le password ne peut être vide',
  })
  password: string;
  
  @IsArray()
  @IsOptional()
  roles: string[]
  
}
