import { Identifiable } from './Identifiable';

export type Subscription = Identifiable & {
  title: string,
  description: string,
  price: number
}
