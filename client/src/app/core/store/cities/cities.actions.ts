import { City } from '@core/models/city';

export namespace CityActions {
  export class Create {
    static readonly type = '[Cities] create a new city in a certain country';
    constructor(public payload: City) {}
  }
}
