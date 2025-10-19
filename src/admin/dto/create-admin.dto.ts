import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from "class-validator";
import { Role } from "../../common/enum/user.enum";

export class CreateAdminDto {
    @ApiProperty({
        example: "Admin",
        description: "Adminning to'liq ismi",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "admin@mail.uz",
        description: "Adminning unikal email manzili",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @ApiProperty({
        example: "Admin123!",
        description: "Kuchli parol (kamida 8 ta belgi, katta harf, kichik harf, raqam va maxsus belgi bo'lishi kerak)",
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    
    @ApiProperty({
        example: "+998901234567",
        description: "Adminning telefon raqami",
    })
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;


    @ApiProperty({
        example: Role.ADMIN,
        description: "Roli (standart qiymat ADMIN sifatida belgilanadi)",
        default: Role.ADMIN,
    })
    readonly role: Role = Role.ADMIN;
}
