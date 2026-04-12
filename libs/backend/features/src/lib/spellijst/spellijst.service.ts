import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spellijst } from '../schemas/spelLijst.schema';
import { Spel } from '../schemas/spel.schema';
import { CreateSpellijstDTO } from '../../../../dto/src/lib/create-spellijst.dto';
import { CreateSpelDTO } from '@org/dto';

@Injectable()
export class SpellijstService {
  constructor(
    @InjectModel(Spellijst.name)
    private spellijstModel: Model<Spellijst>,
    @InjectModel(Spel.name)
    private spelModel: Model<Spel>
  ) {}

  getAll() {
    return this.spellijstModel
      .find()
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers')
      .exec();
  }

  getSpelById(id: string) {
    return this.spellijstModel
      .findById(id)
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers')
      .exec();
  }

  createSpellijst(dto: CreateSpellijstDTO, spelleiderId: string) {
    Logger.log(`Nieuwe spellijst: ${dto.naam}`);

    const spellijst = new this.spellijstModel({
      naam: dto.naam,
      beschrijving: dto.beschrijving,
      spellen: dto.spelIds ?? [],
      spelers: dto.spelerIds ?? [],
      spelleider: spelleiderId,
    });

    return spellijst.save();
  }

  async addExistingSpellen(spellijstId: string, spelIds: string[]) {
    const spellijst = await this.spellijstModel.findById(spellijstId);

    if (!spellijst) {
      throw new NotFoundException('Spellijst niet gevonden');
    }

    const existingIds = spellijst.spellen.map((id) => String(id));
    const idsToAdd = spelIds.filter((id) => !existingIds.includes(id));

    spellijst.spellen = [...spellijst.spellen, ...(idsToAdd as any)];
    await spellijst.save();

    return this.spellijstModel
      .findById(spellijstId)
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers')
      .exec();
  }

  async createSpelAndAddToSpellijst(
    spellijstId: string,
    createSpelDto: CreateSpelDTO
  ) {
    const spellijst = await this.spellijstModel.findById(spellijstId);

    if (!spellijst) {
      throw new NotFoundException('Spellijst niet gevonden');
    }

    const nieuwSpel = await this.spelModel.create({
      naam: createSpelDto.naam,
      beschrijving: createSpelDto.beschrijving,
      uitleg: createSpelDto.uitleg,
      orgineleNaam: createSpelDto.orgineleNaam,
      teams: createSpelDto.teams,
      teamGrootte: createSpelDto.teamGrootte,
    });

    spellijst.spellen = [...spellijst.spellen, nieuwSpel._id as any];
    await spellijst.save();

    return this.spellijstModel
      .findById(spellijstId)
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers')
      .exec();
  }

  async removeSpelFromSpellijst(spellijstId: string, spelId: string) {
    const spellijst = await this.spellijstModel.findById(spellijstId);

    if (!spellijst) {
      throw new NotFoundException('Spellijst niet gevonden');
    }

    spellijst.spellen = spellijst.spellen.filter(
      (id) => String(id) !== String(spelId)
    ) as any;

    await spellijst.save();

    return this.spellijstModel
      .findById(spellijstId)
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers')
      .exec();
  }
}