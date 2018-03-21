import { auth } from '../modules/auth';
import { http } from '../modules/http';
import { academy } from '../modules/academy';

export const getModules = () => [
  auth,
  http,
  academy
];
