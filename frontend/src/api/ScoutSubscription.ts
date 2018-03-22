import { Identifiable } from './Identifiable';

export type ScoutSubscription = Identifiable & {
  title: string,
  description: string,
  price: number
}
