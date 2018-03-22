import { auth } from '../modules/auth';
import { http } from '../modules/http';
import { academy } from '../modules/academy';
import { subscriptions } from '../modules/subscription';

export const getModules = () => [
  auth,
  http,
  academy,
  subscriptions
];
