import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateRelationDto {
    @ApiProperty({
        example: "Do'stlik",
        description: "Foydalanuvchilar orasidagi munosabat turi",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "652d89cf53a0e648a3b0a1e7",
        description: "Birinchi foydalanuvchining MongoDB identifikatori",
    })
    @IsMongoId()
    @IsNotEmpty()
    user_1: string;

    @ApiProperty({
        example: "652d89cf53a0e648a3b0a1e9",
        description: "Ikkinchi foydalanuvchining MongoDB identifikatori ",
    })
    @IsMongoId()
    @IsNotEmpty()
    user_2: string;
}
