import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { Chat } from './schema/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatSchema: Model<Chat>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) { }

  async create(createChatDto: CreateChatDto) {
    const { user_1Id, user_2Id } = createChatDto;

    if (!Types.ObjectId.isValid(user_1Id) || !Types.ObjectId.isValid(user_2Id)) {
      throw new BadRequestException("User id noto'g'ri formatda");
    }

    const user1 = await this.userSchema.findById(user_1Id);
    if (!user1) {
      throw new NotFoundException("Bunday user_1Id topilmadi");
    }

    const user2 = await this.userSchema.findById(user_2Id);
    if (!user2) {
      throw new NotFoundException("Bunday user_2Id topilmadi");
    }

    const chat = await this.chatSchema.create({ user_1Id, user_2Id });

    

    await user1.save();
    await user2.save();

    return {
      message: 'Yangi Chat yaratildi',
      chat,
    };
  }

  findAll() {
    return this.chatSchema
      .find()
      .populate('user_1Id')
      .populate('user_2Id');
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chat ID noto'g'ri formatda");
    }

    const chat = await this.chatSchema
      .findById(id)
      .populate('user_1Id')
      .populate('user_2Id');

    if (!chat) {
      throw new NotFoundException("Bunday Chat topilmadi");
    }

    return chat;
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chat ID noto'g'ri formatda");
    }

    const chat = await this.chatSchema.findById(id);
    if (!chat) {
      throw new NotFoundException("Bunday Chat topilmadi");
    }

    const { user_1Id, user_2Id } = updateChatDto;

    if (user_1Id && user_1Id !== chat.user_1Id.toString()) {
      if (!Types.ObjectId.isValid(user_1Id)) {
        throw new BadRequestException("User1 ID noto'g'ri formatda");
      }

      const newUser = await this.userSchema.findById(user_1Id);
      if (!newUser) {
        throw new NotFoundException("Bunday user_1Id topilmadi");
      }

      chat.user_1Id = user_1Id;
    }

    if (user_2Id && user_2Id !== chat.user_2Id.toString()) {
      if (!Types.ObjectId.isValid(user_2Id)) {
        throw new BadRequestException("User2 ID noto'g'ri formatda");
      }

      const newUser2 = await this.userSchema.findById(user_2Id);
      if (!newUser2) {
        throw new NotFoundException("Bunday user_2Id topilmadi");
      }

      chat.user_2Id = user_2Id;
    }

    await chat.save();
    return chat;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chat ID noto'g'ri formatda");
    }

    const chat = await this.chatSchema.findByIdAndDelete(id);
    if (!chat) {
      throw new NotFoundException("Bunday Chat topilmadi");
    }

    return { message: `Chat #${id} muvaffaqiyatli o'chirildi` };
  }
}
