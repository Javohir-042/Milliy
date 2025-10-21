import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schema/group.schema';
import { Model, Types } from 'mongoose';


@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupSchema: Model<Group>
  ) { }


  async create(createGroupDto: CreateGroupDto) {

    const group = this.groupSchema.create(createGroupDto);

    return group;
  }

  findAll() {
    return this.groupSchema.find().populate("groupUser");
  } 

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Group id noto'g'ri formatda")
    }

    const group = await this.groupSchema.findById(id).populate("groupUser")

    if (!group) {
      throw new NotFoundException("Bunday Id topilmadi")
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Group ID noto'g'ri formatda")
    }

    const group = await this.groupSchema.findById(id)
    if (!group) {
      throw new NotFoundException("Bunday id topilmadi")
    }

    const udpate = await this.groupSchema.findByIdAndUpdate(id, updateGroupDto, { new: true })

    return udpate;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Group ID noto'g'ri formatda")
    }

    const group = await this.groupSchema.findById(id)
    if (!group) {
      throw new NotFoundException("Bunday id topilmadi")
    }

    await this.groupSchema.findByIdAndDelete(id)

    return { message: "Group muvaffaqiyatli o'chirildi" }
  }
}
