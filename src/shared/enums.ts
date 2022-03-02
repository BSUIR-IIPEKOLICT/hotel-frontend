export enum Title {
  Main = 'main',
  Login = 'login',
  Register = 'register',
  Error = 'error',
  Admin = 'admin',
  Orders = 'orders',
}

export enum EndPoint {
  Main = '/',
  Admin = '/admin',
  Login = '/login',
  Register = '/register',
  Orders = '/orders',
  Room = '/room',
  Buildings = '/buildings',
  Services = '/services',
  Types = '/types',
}

export enum APIRoute {
  Users = '/users',
  Buildings = '/buildings',
  Types = '/types',
  Rooms = '/rooms',
  Reviews = '/reviews',
  Baskets = '/baskets',
  Services = '/services',
  Orders = '/orders',
}

export enum Role {
  Admin = 'admin',
  Client = 'client',
}

export enum LSKey {
  DarkMode = 'darkMode',
  Token = 'token',
}
