import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ChenelEnum } from "../../common/enum/user.enum";

export class CreateChenelDto {

    @ApiProperty({
        example: "652d89cf53a0e648a3b0a1e7",
        description: "Foydalanuvchi MongoDB identifikatori"
    })
    @IsMongoId({ message: "user_id noto'g'ri formatda" })
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({
        example: "Tech Channel",
        description: "Kanal nomi"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: ChenelEnum.PUBLIC,
        description: "Kanal statusi"
    })
    @IsEnum(ChenelEnum, { message: "status ChenelEnum dan bo'lishi kerak" })
    status: ChenelEnum;

    @ApiPropertyOptional({
        example: "Bu kanal texnologiyalar haqida",
        description: "Kanal tavsifi"
    })
    @IsString()
    @IsOptional()
    description: string;
}
