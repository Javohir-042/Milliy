import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsStrongPassword
} from 'class-validator';
import { Gender } from '../../common/enum/user.enum';

export class CreateUserDto {
    @ApiProperty({
        description: 'Foydalanuvchi ismi',
        example: 'Botir'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Foydalanuvchi username',
        example: 'botir123'
    })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({
        description: 'Foydalanuvchi telefon raqami',
        example: '+998976006787'
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'Foydalanuvchi jinsi',
        enum: Gender,
        example: Gender.MALE
    })
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Foydalanuvchi bio yoki qisqa tavsifi',
        example: 'Salom, men Botirman'
    })
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiProperty({
        description: 'Foydalanuvchi yoshi',
        example: 25
    })
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty({
        description: 'Foydalanuvchi email manzili',
        example: 'botir@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Foydalanuvchi kuchli paroli',
        example: 'Botir123!'
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Foydalanuvchi himoya kodi ',
        example: 'Xafli_parol'
    })
    @IsString()
    @IsNotEmpty()
    protection: string;
}
