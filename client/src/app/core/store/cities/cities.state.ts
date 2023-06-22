import { Injectable } from '@angular/core';
import { City } from '@core/models/city';
import { CitiesService } from '@core/services/dal/cities/cities.service';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { CityActions } from './cities.actions';

export interface CitiesStateModel {
  items: City[];
}

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
    return this.citiesService.create(payload).pipe(
      tap((newItem) => {
        const state = ctx.getState();
        ctx.setState({ items: [...state.items, newItem] });
      })
    );
  }
}
