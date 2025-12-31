import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateSpel, ISpel } from '@org/data-api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Spel } from '../schemas/spel.schema';
import { Model } from 'mongoose';
import { CreateSpelDTO } from '@org/dto';

@Injectable()
export class SpelService {  

  constructor(@InjectModel(Spel.name) private spelModel: Model<Spel>) {}

  getAllSpellen() {
    Logger.log('Ophalen van alle spellen');
    return this.spelModel.find();
  }

  // getById(id: number) {
  //   Logger.log(`Ophalen van spel met id: ${id}`);
  //   const spel = this.spellen$.value.find((s) => s.id === id);
  //   if (!spel) {
  //     throw new NotFoundException(`Spel met id ${id} niet gevonden`);
  //   }
  //   return spel;
  // }

  createSpel(createSpelDTO: CreateSpelDTO) {
    Logger.log(`Aanmaken van nieuw spel: ${createSpelDTO.naam}`);
    const newSpel = new this.spelModel(createSpelDTO);
    return newSpel.save();
  }
}
