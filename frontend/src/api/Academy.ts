import { Identifiable } from './Identifiable';
import { Review } from './Review';
import { Subscription } from './Subscription';

export type Academy = Identifiable & {
  name: string,
  description: string,
  slogan: string,
  header_image: string,
  zip_code: string,
  city: string,
  building_number: string,
  creation_date: string,
  stars: number,
  min_age?: string,
  max_age?: string,
  promotion?: boolean,
  reviews: Review[],
  subscriptions: Subscription[]
};
