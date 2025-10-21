import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "../region/schema/region.schema";
import { Model, Types } from "mongoose";
import { District } from "./schema/district.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private readonly districtSchema: Model<District>,
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) { }


  async create(createDistrictDto: CreateDistrictDto) {
    const regionId = createDistrictDto.regionId;
    const region = await this.regionSchema.findById(regionId);
    if (!region) {
      throw new NotFoundException("Bunday region_id topilmadi")
    }

    const district = await this.districtSchema.create(createDistrictDto)

    region.districts.push(district)

    await region.save();

    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("regionId", "name -_id")
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("District ID noto'g'ri formatda");
    }

    const district = await this.districtSchema.findById(id).populate("regionId", "name -_id");
    if (!district) {
      throw new NotFoundException("Bunday tuman topilmadi");
    }

    return district;
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("District ID noto'g'ri formatda");
    }

    const district = await this.districtSchema.findById(id);
    if (!district) throw new NotFoundException("Bunday id topilmadi");

    if (updateDistrictDto.regionId && updateDistrictDto.regionId !== district.regionId.toString()) {
      if (!Types.ObjectId.isValid(updateDistrictDto.regionId)) {
        throw new BadRequestException("Region ID noto'g'ri formatda");
      }

      const newRegion = await this.regionSchema.findById(updateDistrictDto.regionId);
      if (!newRegion) throw new NotFoundException("Bunday region_id topilmadi");

      await Promise.all([
        this.regionSchema.findByIdAndUpdate(district.regionId, { $pull: { districts: district._id } }),
        this.regionSchema.findByIdAndUpdate(updateDistrictDto.regionId, { $push: { districts: district._id } }),
      ]);
    }

    return this.districtSchema.findByIdAndUpdate(id, updateDistrictDto, { new: true });
  }


  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("District ID noto'g'ri formatda ")
    }

    const district = await this.districtSchema.findById(id);
    if (!district) {
      throw new NotFoundException("Bunday tuman topilmadi");
    }

    await this.regionSchema.findByIdAndUpdate(district.regionId, {
      $pull: { districts: district._id },
    });

    await this.districtSchema.findByIdAndDelete(id);

    return { message: "Tuman muvaffaqiyatli o'chirildi", }
  }
}
