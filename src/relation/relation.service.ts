import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Relation } from './schema/relation.schema';
import { Model, Types } from 'mongoose';
import { User } from '../users/schema/user.schema';

@Injectable()
export class RelationService {
  constructor(
    @InjectModel(Relation.name) private readonly relationSchema: Model<Relation>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) { }

  async create(createRelationDto: CreateRelationDto) {
    const { user_1, user_2 } = createRelationDto;

    if (!Types.ObjectId.isValid(user_1) || !Types.ObjectId.isValid(user_2)) {
      throw new BadRequestException("User id noto'g'ri formatda ")
    }

    const user1 = await this.userSchema.findById(user_1)
    if (!user1) {
      throw new NotFoundException("Bunday user_1 topilmadi ")
    }

    const user2 = await this.userSchema.findById(user_2)
    if (!user2) {
      throw new NotFoundException("Bunday user2 topilmadi")
    }

    const relation = await this.relationSchema.create({ user_1, user_2 })

    user1.user_1.push(relation)
    user2.user_2.push(relation)

    await user1.save()
    await user2.save()


    return {
      message: 'Yangi relation yaratildi',
      relation,
    };
  }

  findAll() {
    return this.relationSchema
      .find()
      .populate("user_1")
      .populate("user_2")
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Relation ID noto'g'ri formatda")
    }

    const relation = await this.relationSchema
      .findById(id)
      .populate('user_1')
      .populate('user_2')

    if (!relation) {
      throw new NotFoundException("Bunday relation topilmadi")
    }

    return relation;
  }

  async update(id: string, updateRelationDto: UpdateRelationDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(" Relation ID noto'g'ri formatda")
    }

    const relation = await this.relationSchema.findById(id);
    if (!relation) {
      throw new NotFoundException("Bunday ID topilmadi")
    }

    const { user_1, user_2 } = updateRelationDto;

    if (user_1 && user_1 !== relation.user_1.toString()) {
      if (!Types.ObjectId.isValid(user_1)) {
        throw new BadRequestException("User1 ID noto'g'ri formatda")
      }

      const newUser = await this.userSchema.findById(user_1);

      if (!newUser) {
        throw new NotFoundException("Bunday user_1 topilmadi")
      }
      relation.user_1 = user_1;
    }

    if (user_2 && user_2 !== relation.user_2.toString()) {
      if (!Types.ObjectId.isValid(user_2)) {
        throw new BadRequestException("User ID noto'g'ri formatda")
      }

      const newUser2 = await this.userSchema.findById(user_2);
      if (!newUser2) {
        throw new NotFoundException("Bunday user_2 topilmadi")
      }

      relation.user_2 = user_2;
    }



    await relation.save()

    return relation;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Relation ID noto'g'ri formatda");
    }

    const relation = await this.relationSchema.findByIdAndDelete(id);
    if (!relation) {
      throw new NotFoundException("Bunday relation topilmadi");
    }

    return { message: `Relation #${id} muvaffaqiyatli o'chirildi` };
  }
}
