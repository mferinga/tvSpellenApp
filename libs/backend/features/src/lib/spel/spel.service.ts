import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spel } from '../schemas/spel.schema';
import { Presentator } from '../schemas/presentator.schema';
import { CreateSpelDTO } from '@org/dto';
import { CreatePresentatorDTO } from '../../../../dto/src/lib/create-presentator.dto';

@Injectable()
export class SpelService {
  constructor(
    @InjectModel(Spel.name)
    private spelModel: Model<Spel>,
    @InjectModel(Presentator.name)
    private presentatorModel: Model<Presentator>
  ) {}

  getAllSpellen() {
    return this.spelModel.find().populate('presentators').exec();
  }

  getSpelById(id: string) {
    return this.spelModel.findById(id).populate('presentators').exec();
  }

  createSpel(createSpelDto: CreateSpelDTO) {
    const spel = new this.spelModel({
      naam: createSpelDto.naam,
      beschrijving: createSpelDto.beschrijving,
      uitleg: createSpelDto.uitleg,
      originleNaam: createSpelDto.orgineleNaam,
      teams: createSpelDto.teams,
      teamgrootte: createSpelDto.teamGrootte,
      presentators: createSpelDto.presentators ?? [],
    });

    return spel.save();
  }

  updateSpel(id: string, dto: CreateSpelDTO) {
    return this.spelModel
      .findByIdAndUpdate(
        id,
        {
          naam: dto.naam,
          beschrijving: dto.beschrijving,
          uitleg: dto.uitleg,
          originleNaam: dto.orgineleNaam,
          teams: dto.teams,
          teamgrootte: dto.teamGrootte,
          presentators: dto.presentators ?? [],
        },
        { new: true }
      )
      .populate('presentators')
      .exec();
  }

  async addExistingPresentators(spelId: string, presentatorIds: string[]) {
    const spel = await this.spelModel.findById(spelId);

    if (!spel) {
      throw new NotFoundException('Spel niet gevonden');
    }

    const existingIds = spel.presentators.map((id) => String(id));
    const idsToAdd = presentatorIds.filter((id) => !existingIds.includes(id));

    spel.presentators = [...spel.presentators, ...(idsToAdd as any)];
    await spel.save();

    return this.spelModel.findById(spelId).populate('presentators').exec();
  }

  async createPresentatorAndAddToSpel(
    spelId: string,
    dto: CreatePresentatorDTO
  ) {
    const spel = await this.spelModel.findById(spelId);

    if (!spel) {
      throw new NotFoundException('Spel niet gevonden');
    }

    const presentator = await this.presentatorModel.create({
      naam: dto.naam,
      geboortedatum: dto.geboortedatum ? new Date(dto.geboortedatum) : undefined,
      bio: dto.bio,
    });

    spel.presentators = [...spel.presentators, presentator._id as any];
    await spel.save();

    return this.spelModel.findById(spelId).populate('presentators').exec();
  }
}