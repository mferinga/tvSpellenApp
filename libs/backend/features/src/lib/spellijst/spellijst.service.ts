import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spellijst } from '../schemas/spelLijst.schema';
import { CreateSpellijstDTO } from '../../../../dto/src/lib/create-spellijst.dto';

@Injectable()
export class SpellijstService {
  constructor(
    @InjectModel(Spellijst.name)
    private spellijstModel: Model<Spellijst>
  ) {}

  getAll() {
    return this.spellijstModel
      .find()
      .populate('spellen')
      .populate('spelleider')
      .populate('spelers');
  }

  createSpellijst(
    dto: CreateSpellijstDTO,
    spelleiderId: string
  ) {
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
}