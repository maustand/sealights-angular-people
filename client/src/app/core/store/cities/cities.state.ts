import { Injectable } from '@angular/core';
import { CitiesService } from '@core/services/dal/cities/cities.service';
import { Action, State, StateContext } from '@ngxs/store';
import { CityActions } from './cities.actions';

export class CitiesStateModel {}

@State<CitiesStateModel>({
  name: 'cities',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CitiesState {
  constructor(private readonly citiesService: CitiesService) {}

  @Action(CityActions.Create)
  createArticle(
    ctx: StateContext<CitiesStateModel>,
    { payload }: CityActions.Create
  ) {
    return this.citiesService.create(payload);
  }
}
