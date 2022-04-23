import BaseRepository from '../core/BaseRepository';

export function Repository(route: string = '/') {
  return function <T extends new (...args: any[]) => BaseRepository<any, any>>(Constructor: T) {
    return class extends Constructor {
      override route: string;

      constructor(...args: any[]) {
        super(...args);
        this.route = route;
      }
    };
  };
}
