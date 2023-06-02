import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string 

    @IsString()
    @IsOptional()
    coverImage: string

    @IsArray()
    @IsNotEmpty()
    categories: { id: number }[]
}