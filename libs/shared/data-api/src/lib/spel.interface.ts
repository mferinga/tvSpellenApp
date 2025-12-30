export interface ISpel {
  id: number;
  naam: string;
  beschrijving: string;
  uitleg: string;
  originleNaam?: string;
  teams?: boolean;
  teamgrootte?: number;
}

export type ICreateSpel = Pick<
  ISpel,
  'naam' | 'beschrijving' | 'uitleg' | 'originleNaam' | 'teams' | 'teamgrootte'
>;
