import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({
        example: 'Toshkent viloyati',
        description: 'Hudud (viloyat) nomi',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
