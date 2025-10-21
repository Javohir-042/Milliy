import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>,
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionSchema.create(createRegionDto);
    return region;
  }

  async findAll() {
    return this.regionSchema.find().populate('districts', 'name -_id');
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Region ID noto'g'ri formatda");
    }

    const region = await this.regionSchema.findById(id).populate('districts', 'name -_id');
    if (!region) {
      throw new NotFoundException("Bunday region topilmadi");
    }

    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Region ID noto'g'ri formatda");
    }

    const updatedRegion = await this.regionSchema.findByIdAndUpdate(id, updateRegionDto, { new: true });
    if (!updatedRegion) {
      throw new NotFoundException("Bunday region topilmadi");
    }

    return updatedRegion;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Region ID noto'g'ri formatda");
    }

    const deletedRegion = await this.regionSchema.findByIdAndDelete(id);
    if (!deletedRegion) {
      throw new NotFoundException("Bunday region topilmadi");
    }

    return { message: `Region ID muvaffaqiyatli o'chirildi` };
  }
}
