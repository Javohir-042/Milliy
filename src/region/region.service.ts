import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) { }


  create(createRegionDto: CreateRegionDto) {
    return this.regionSchema.create(createRegionDto);
  }

  findAll() {
    return this.regionSchema.find().populate("districts", "name -_id");
  }

  findOne(id: string) {
    return this.regionSchema.findById(id).populate("districts");
  }

  update(id: string, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: string) {
    return `This action removes a #${id} region`;
  }
}
