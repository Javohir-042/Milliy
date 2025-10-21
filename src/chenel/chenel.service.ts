import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChenelDto } from './dto/create-chenel.dto';
import { UpdateChenelDto } from './dto/update-chenel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chenel } from './schema/chenel.schema';
import { Model, Types } from 'mongoose';
import { User } from '../users/schema/user.schema';

@Injectable()
export class ChenelService {
  constructor(
    @InjectModel(Chenel.name) private readonly chenelSchema: Model<Chenel>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) { }


  async create(createChenelDto: CreateChenelDto) {
    const userId = createChenelDto.user_id;
    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new NotFoundException('Bunday user_id topilmadi');
    }

    const chenel = await this.chenelSchema.create(createChenelDto);

    user.chenel_Id.push(chenel);

    await user.save();

    return chenel;
  }


  findAll() {
    return this.chenelSchema.find().populate("userId")
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Chenel ID noto'g'ri formatda")
    }

    const chenel = await this.chenelSchema.findById(id).populate("userId")
    if (!chenel) {
      throw new NotFoundException("Bunday ID topilmadi")
    }
    return chenel
  }

  // async update(id: string, updateChenelDto: UpdateChenelDto) {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new BadRequestException("Chenel ID noto'g'ri formatda")
  //   }

  //   const chenel = await this.chenelSchema.findById(id).populate("userId")
  //   if (!chenel) {
  //     throw new NotFoundException("Bunday ID topilmadi")
  //   }

  //   if(updateChenelDto.user_id && updateChenelDto.user_id !== chenel.user_id.toString()) {
  //     if(!Types.ObjectId.isValid(updateChenelDto.user_id)) {
  //       throw new BadRequestException("User ID noto'g'ri formatda")
  //     }

  //     const newChenel = await this
  //   }

  // }

  remove(id: string) {
    return `This action removes a #${id} chenel`;
  }
}
