import { ButtonConfiguraton } from '../abstractions/interfaces';
import { EndPoint } from './enums';

export const API_URL = process.env.API_URL || 'http://localhost:5000';

export const ADMIN_BUTTONS: ButtonConfiguraton[] = [
  {
    title: 'Buildings',
    path: EndPoint.BUILDINGS,
  },
  {
    title: 'Options',
    path: EndPoint.OPTIONS,
  },
  {
    title: 'Types',
    path: EndPoint.TYPES,
  },
  {
    title: 'Users',
    path: EndPoint.USERS,
  },
];
