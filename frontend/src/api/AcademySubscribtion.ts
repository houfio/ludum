import { Identifiable } from './Identifiable';

export type AcademySubscription = Identifiable & {
  title: string,
  description: string,
  price: number,
  subscribers: (Identifiable & {
    first_name: string,
    last_name: string
  })[]
}
