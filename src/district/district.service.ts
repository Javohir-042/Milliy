import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from '../region/schema/region.schema';
import { Model } from 'mongoose';
import { District } from './schema/district.schema';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>,
    @InjectModel(District.name) private readonly districtSchema: Model<District>
  ) { }


  async create(createDistrictDto: CreateDistrictDto) {
    const regionId = createDistrictDto.regionId;
    const region = await this.regionSchema.findById(regionId);
    if(!region){
      throw new NotFoundException("Bunday viloyat topilmadi")
    }

    const district = await this.districtSchema.create(createDistrictDto)

    region.districts.push(district)

    await region.save();

    return district;
  }

  findAll() {
    return  this.districtSchema.find().populate("regionId")
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
