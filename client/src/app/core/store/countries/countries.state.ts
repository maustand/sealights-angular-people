import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CountryActions } from './countries.actions';
import { Country } from '@core/models/country';
import { CountriesService } from '@core/services/dal/countries/countries.service';
import { tap } from 'rxjs';

export interface CountriesStateModel {
  items: Country[];
}

@State<CountriesStateModel>({
  name: 'countries',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CountriesState {
  constructor(private readonly countriesService: CountriesService) {}

  @Selector() static getRaw(state: CountriesStateModel) {
    return state.items;
  }

  @Action(CountryActions.FetchAll)
  fetchAll(
    { patchState }: StateContext<CountriesStateModel>,
    {}: CountryActions.FetchAll
  ) {
    return this.countriesService.all().pipe(
      tap((countriesRes) => {
        patchState({ items: countriesRes });
      })
    );
  }
}
