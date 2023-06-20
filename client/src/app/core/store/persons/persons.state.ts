import { Injectable } from '@angular/core';
import { Person } from '@core/models/persons';
import { PersonsService } from '@core/services/dal/persons/persons.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { PersonActions } from './persons.actions';

export interface PersonsStateModel {
  items: Person[];
}

@State<PersonsStateModel>({
  name: 'persons',
  defaults: {
    items: [],
  },
})
@Injectable()
export class PersonsState {
  constructor(private readonly personsService: PersonsService) {}

  @Selector() static getRaw(state: PersonsStateModel) {
    return state.items;
  }

  @Action(PersonActions.FetchAll)
  fetchAll(
    { patchState }: StateContext<PersonsStateModel>,
    {}: PersonActions.FetchAll
  ) {
    return this.personsService.all().pipe(
      tap((response) => {
        patchState({ items: response });
      })
    );
  }

  @Action(PersonActions.CreatePerson)
  createArticle(
    ctx: StateContext<PersonsStateModel>,
    { payload }: PersonActions.CreatePerson
  ) {
    const state = ctx.getState();

    return this.personsService.create(payload).pipe(
      tap((newPerson) => {
        ctx.setState({
          items: [...state.items, newPerson],
        });
      })
    );
  }
}
