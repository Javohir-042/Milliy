import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schema/user.schema";
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.userSchema.findOne({ email: createUserDto.email });
    console.log(existingUser)

    if (existingUser) {
      throw new BadRequestException("Bu email bilan foydalanuvchi allaqachon mavjud!")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const hashedProtection = await bcrypt.hash(createUserDto.protection, 7);

    return this.userSchema.create({
      ...createUserDto,
      password: hashedPassword,
      protection: hashedProtection,
    });

  }



  findAll() {
    return this.userSchema.find()
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri")
    }

    const user = await this.userSchema.findById(id);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi`);
    }

    return this.userSchema.findById(id);
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri");
    }

    const user = await this.userSchema.findById(id);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      throw new BadRequestException("Emailni o'zgartirish mumkin emas!");
    }



    if (updateUserDto.password) {
      const hashed = await bcrypt.hash(updateUserDto.password, 7);
      updateUserDto.password = hashed;
    }


    Object.assign(user, updateUserDto);

    await user.save();

    return user;
  }


  async remove(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri");
    }

    const result = await this.userSchema.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException(`User with ID not found`);
    }
    return { message: `User with ID has been deleted` };
  }

}
