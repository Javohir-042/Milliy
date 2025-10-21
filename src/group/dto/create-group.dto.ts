import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GroupEnum } from '../../common/enum/user.enum';

export class CreateGroupDto {
    @ApiProperty({
        example: 'FullStect Developerlar guruhi',
        description: 'Guruh nomi ',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: GroupEnum.ACTIVE,
        description: 'Guruh statusi:',
        enum: GroupEnum,
    })
    @IsEnum(GroupEnum)
    @IsNotEmpty()
    status: GroupEnum;
}
