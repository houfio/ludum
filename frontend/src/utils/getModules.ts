import { auth } from '../modules/auth';
import { http } from '../modules/http';
import { academy } from '../modules/academy';
import { subscriptions } from '../modules/subscription';
import { content } from '../modules/content';

export const getModules = () => [
  auth,
  http,
  academy,
  content,
  subscriptions,
  content
];
