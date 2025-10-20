import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schemas';
import mongoose, { Model } from 'mongoose';
import bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>
  ) { }

  async create(createAdminDto: CreateAdminDto) {

    const existingAdmin = await this.adminSchema.findOne({ email: createAdminDto.email })

    if(existingAdmin){
      throw new BadRequestException("Bu email allaqachon ro'yxatdan o'tgan")
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7)
    return this.adminSchema.create({
      ...createAdminDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.adminSchema.find();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri")
    }
    return this.adminSchema.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri")
    }
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto);
    // return this.adminSchema.updateOne({_id: id}, updateAdminDto);
    // return this.adminSchema.findOneAndReplace({_id: id}, updateAdminDto, { new: true});         // To'liq ligicha o'chirib kegin qaytarib beradi 
  }


  findAdminByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID noto'g'ri")
    }
    return this.adminSchema.deleteOne({ _id: id })
    // return this.adminSchema.findByIdAndDelete({ _id: id })
  }
}
