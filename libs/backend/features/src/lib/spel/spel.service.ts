import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spel } from '../schemas/spel.schema';
import { CreateSpelDTO } from '@org/dto';

@Injectable()
export class SpelService {
  constructor(
    @InjectModel(Spel.name)
    private spelModel: Model<Spel>
  ) {}

  getAllSpellen() {
    return this.spelModel.find().exec();
  }

  getSpelById(id: string) {
    return this.spelModel.findById(id).exec();
  }

  createSpel(createSpelDto: CreateSpelDTO) {
    const spel = new this.spelModel(createSpelDto);
    return spel.save();
  }

  updateSpel(id: string, updateSpelDto: CreateSpelDTO) {
    return this.spelModel
      .findByIdAndUpdate(
        id,
        {
          naam: updateSpelDto.naam,
          beschrijving: updateSpelDto.beschrijving,
          uitleg: updateSpelDto.uitleg,
          orgineleNaam: updateSpelDto.orgineleNaam,
          teams: updateSpelDto.teams,
          teamGrootte: updateSpelDto.teamGrootte,
        },
        { new: true }
      )
      .exec();
  }
}