import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateChatDto {
    @ApiProperty({
        example: "652d89cf53a0e648a3b0a1e7",
        description: "Birinchi foydalanuvchining MongoDB identifikatori",
    })
    @IsMongoId()
    @IsNotEmpty()
    user_1Id: string;

    @ApiProperty({
        example: "652d89cf53a0e648a3b0a1e9",
        description: "Ikkinchi foydalanuvchining MongoDB identifikatori ",
    })
    @IsMongoId()
    @IsNotEmpty()
    user_2Id: string;
}
