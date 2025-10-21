import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';

@Controller('group-users')
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  @Post()
  create(@Body() createGroupUserDto: CreateGroupUserDto) {
    return this.groupUsersService.create(createGroupUserDto);
  }

  @Get()
  findAll() {
    return this.groupUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupUsersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupUserDto: UpdateGroupUserDto) {
    return this.groupUsersService.update(id, updateGroupUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupUsersService.remove(id);
  }
}
