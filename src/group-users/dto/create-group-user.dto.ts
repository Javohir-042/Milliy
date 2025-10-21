import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateGroupUserDto {
    @ApiProperty({
        example: "652ab7f4c19b723e849a13f9",
        description: "Guruhning unikal identifikatori",
    })
    @IsMongoId({ message: "groupId yaroqli MongoId bo'lishi kerak" })
    @IsNotEmpty({ message: "groupId bo'sh bo'lmasligi kerak" })
    groupId: string;

    @ApiProperty({
        example: "652ab7f4c19b723e849a13fa",
        description: "Foydalanuvchining unikal identifikatori",
    })
    @IsMongoId({ message: "userId yaroqli MongoId bo'lishi kerak" })
    @IsNotEmpty({ message: "userId bo'sh bo'lmasligi kerak" })
    userId: string;
}
