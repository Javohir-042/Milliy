import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupUser } from './schema/group-user.schema';
import { Model, Types } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { Group } from '../group/schema/group.schema';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectModel(GroupUser.name) private readonly groupUserSchema: Model<GroupUser>,
    @InjectModel(Group.name) private readonly groupSchema: Model<Group>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) { }

  async create(createGroupUserDto: CreateGroupUserDto) {

    const { userId, groupId } = createGroupUserDto;

    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new NotFoundException('Bunday userId topilmadi');
    }

    const group = await this.groupSchema.findById(groupId);
    if (!group) {
      throw new NotFoundException('Bunday groupId topilmadi');
    }

    const groupUser = await this.groupUserSchema.create({ userId, groupId });

    user.groupUser.push(groupUser);
    group.groupUser.push(groupUser);

    await user.save();
    await group.save();

    return groupUser;

  }

  findAll() {
    return this.groupUserSchema
      .find()
      .populate("userId")
      .populate("groupId")
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("GroupUser ID noto'g'ri formatda");
    }

    const groupUser = await this.groupUserSchema
      .findById(id)
      .populate("userId")
      .populate("groupId");

    if (!groupUser) {
      throw new NotFoundException("Bunday GroupUser topilmadi");
    }

    return groupUser;
  }


  async update(id: string, updateGroupUserDto: UpdateGroupUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("GroupUser ID noto'g'ri formatda");
    }

    const groupUser = await this.groupUserSchema.findById(id);
    if (!groupUser) {
      throw new NotFoundException("Bunday GroupUser topilmadi");
    }

    const { userId, groupId } = updateGroupUserDto;

    // Agar userId o'zgargan bo'lsa
    if (userId && userId !== groupUser.userId.toString()) {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException("User ID noto'g'ri formatda");
      }

      const newUser = await this.userSchema.findById(userId);
      if (!newUser) throw new NotFoundException("Bunday user topilmadi");

      // Oldingi user documentidan olib tashlash
      await this.userSchema.findByIdAndUpdate(groupUser.userId, {
        $pull: { groupUser: groupUser },
      });

      // Yangi userga qo'shish
      newUser.groupUser.push(groupUser);
      await newUser.save();

      groupUser.userId = userId;
    }

    // Agar groupId o'zgargan bo'lsa
    if (groupId && groupId !== groupUser.groupId.toString()) {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new BadRequestException("Group ID noto'g'ri formatda");
      }

      const newGroup = await this.groupSchema.findById(groupId);
      if (!newGroup) throw new NotFoundException("Bunday group topilmadi");

      // Oldingi group documentidan olib tashlash
      await this.groupSchema.findByIdAndUpdate(groupUser.groupId, {
        $pull: { groupUser: groupUser },
      });

      // Yangi groupga qo'shish
      newGroup.groupUser.push(groupUser);
      await newGroup.save();

      groupUser.groupId = groupId;
    }

    // GroupUser hujjatini yangilash
    await groupUser.save();

    return groupUser;
  }


  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("GroupUser ID noto'g'ri formatda");
    }

    const groupUser = await this.groupUserSchema.findById(id);
    if (!groupUser) {
      throw new NotFoundException("Bunday GroupUser topilmadi");
    }

    // Oldingi user va group documentlaridan olib tashlash
    await this.userSchema.findByIdAndUpdate(groupUser.userId, {
      $pull: { groupUser: groupUser._id },
    });

    await this.groupSchema.findByIdAndUpdate(groupUser.groupId, {
      $pull: { groupUser: groupUser._id },
    });

    // GroupUser hujjatini o‘chirish
    await this.groupUserSchema.findByIdAndDelete(id);

    return { message: `GroupUser #${id} muvaffaqiyatli o'chirildi` };
  }

}
