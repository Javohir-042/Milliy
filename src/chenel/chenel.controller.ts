import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChenelService } from './chenel.service';
import { CreateChenelDto } from './dto/create-chenel.dto';
import { UpdateChenelDto } from './dto/update-chenel.dto';

@Controller('chenel')
export class ChenelController {
  constructor(private readonly chenelService: ChenelService) {}

  @Post()
  create(@Body() createChenelDto: CreateChenelDto) {
    return this.chenelService.create(createChenelDto);
  }

  @Get()
  findAll() {
    return this.chenelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chenelService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChenelDto: UpdateChenelDto) {
  //   return this.chenelService.update(id, updateChenelDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chenelService.remove(id);
  }
}
