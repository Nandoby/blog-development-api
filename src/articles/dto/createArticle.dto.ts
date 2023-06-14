import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateArticleDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string 

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    coverImage: string

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    categories: { id: number }[]
}