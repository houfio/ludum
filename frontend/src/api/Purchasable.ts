import { Identifiable } from './Identifiable';

export type Purchasable = Identifiable & {
  title: string,
  price: string,
  image: string
}
