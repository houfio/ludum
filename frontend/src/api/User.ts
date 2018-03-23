import { Identifiable } from './Identifiable';
import { AccessToken } from './AccessToken';
import { Event } from './Event';

export type User = Identifiable & {
  first_name: string,
  last_name: string,
  email: string,
  phone_number?: string,
  team?: string,
  zip_code?: string,
  city?: string,
  house_number?: string,
  birth_date?: string,
  receive_newsletter: boolean,
  avatar?: string,
  creation_date: string,
  balance: number,
  access_tokens: AccessToken[],
  events: Event[]
};
