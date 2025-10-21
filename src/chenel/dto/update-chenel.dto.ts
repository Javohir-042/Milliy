import { PartialType } from '@nestjs/swagger';
import { CreateChenelDto } from './create-chenel.dto';

export class UpdateChenelDto extends PartialType(CreateChenelDto) {}
