import { Injectable, NotFoundException } from '@nestjs/common';
import { ISpel } from '@org/data-api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class SpelService {
  private spellen$ = new BehaviorSubject<ISpel[]>([
    {
      id: 0,
      naam: 'Voetbal',
      beschrijving: 'Een teamsport gespeeld met een ronde bal',
      uitleg:
        'Twee teams proberen de bal in het doel van de tegenstander te krijgen',
      teams: true,
      teamgrootte: 11,
    },
    {
      id: 1,
      naam: 'Tennis',
      beschrijving:
        'Een racketsport die gespeeld wordt op een rechthoekig veld',
      uitleg: 'Spelers slaan de bal over het net om punten te scoren',
      teams: false,
    },
  ]);

  getAll() {
    Logger.log('Ophalen van alle spellen');
    return this.spellen$.value;
  }

  getById(id: number) {
    Logger.log(`Ophalen van spel met id: ${id}`);
    const spel = this.spellen$.value.find((s) => s.id === id);
    if (!spel) {
      throw new NotFoundException(`Spel met id ${id} niet gevonden`);
    }
    return spel;
  }

  create(
    spel: Pick<
      ISpel,
      | 'naam'
      | 'beschrijving'
      | 'uitleg'
      | 'originleNaam'
      | 'teams'
      | 'teamgrootte'
    >
  ) {
    Logger.log(`Aanmaken van nieuw spel: ${spel.naam}`);
    const newSpel: ISpel = {
      id: this.generateId(),
      ...spel,
    };
    this.spellen$.next([...this.spellen$.value, newSpel]);
    return newSpel;
  }

  private generateId(): number {
    const spellen = this.spellen$.value;
    return spellen.length > 0 ? Math.max(...spellen.map((s) => s.id)) + 1 : 0;
  }
}
