import { City } from './city';


export interface CountryCity extends Omit<City, 'countryId'> {}

export interface Country {
  id: number;
  name: string;
  cities: CountryCity[]
}
