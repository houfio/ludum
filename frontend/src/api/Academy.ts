import { Identifiable } from './Identifiable';

export type Academy = Identifiable & {
  name: string,
  description: string,
  slogan: string,
  header_image: string,
  zip_code: string,
  city: string,
  building_number: string,
  creation_date: string
};
