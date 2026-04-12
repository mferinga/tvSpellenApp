export interface ISpel {
  _id: string;
  naam: string;
  beschrijving: string;
  uitleg: string;
  orgineleNaam?: string;
  teams?: boolean;
  teamGrootte?: number;
}

export type ICreateSpel = Pick<
  ISpel,
  'naam' | 'beschrijving' | 'uitleg' | 'orgineleNaam' | 'teams' | 'teamGrootte'
>;
