import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
    @ApiProperty({
        example: 'Chilonzor',
        description: 'Tuman nomi',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '6714bfa1e56a10fcb3c2a9d7',
        description: 'Region . MongoDB ID shaklida',
    })
    @IsMongoId()
    @IsNotEmpty()
    regionId: string;
}
