import { Identifiable } from './Identifiable';

export type AccessToken = Identifiable & {
  date: string,
  user_agent: string,
  ip_address: string
}
