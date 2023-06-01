import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string 

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string 

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    picture: string

    @IsString()
    @IsOptional()
    password: string
}