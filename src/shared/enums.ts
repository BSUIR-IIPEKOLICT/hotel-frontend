export enum Title {
  MAIN = 'Main',
  LOGIN = 'Login',
  REGISTER = 'Register',
  ERROR = 'Error',
  ADMIN = 'Admin',
  BOOKINGS = 'Bookings',
  USERS = 'Users',
  BUILDINGS = 'Buildings',
  TYPES = 'Types',
  OPTIONS = 'Options',
}

export enum EndPoint {
  MAIN = '/',
  ADMIN = '/admin',
  LOGIN = '/login',
  REGISTER = '/register',
  BOOKINGS = '/bookings',
  ROOM = '/room',
  USERS = '/admin/users',
  BUILDINGS = '/admin/buildings',
  OPTIONS = '/admin/options',
  TYPES = '/admin/types',
}

export enum APIRoute {
  AUTH = '/auth',
  BOOKINGS = '/bookings',
  BUILDINGS = '/buildings',
  COMMENTS = '/comments',
  OPTIONS = '/options',
  ROOMS = '/rooms',
  TYPES = '/types',
  USERS = '/users',
}

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum StorageKey {
  DARK_MODE = 'darkMode',
  TOKEN = 'token',
}
