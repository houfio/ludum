import { Identifiable } from './Identifiable';

export type Review = Identifiable & {
  stars: number,
  title: string,
  review: string,
  creation_date: string,
  first_name: string,
  last_name: string
};
