import { Identifiable } from './Identifiable';

export type Event = Identifiable & {
  description: string,
  date: string
}
