import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string 

    @ApiPropertyOptional({ description: 'coverImage is optional'})
    @IsString()
    @IsOptional()
    coverImage: string

    @IsArray()
    @IsNotEmpty()
    categories: { id: number }[]
}