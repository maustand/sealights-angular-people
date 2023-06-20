import { Injectable } from '@angular/core';
import { Person } from '@core/models/persons';
import { Action, State, StateContext } from '@ngxs/store';
import { PersonActions } from './persons.actions';
import { PersonsService } from '@core/services/dal/persons/persons.service';
import { tap } from 'rxjs';

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

  // @Action(PersonActions)
  // add({ getState, setState }: StateContext<PersonsStateModel>, { payload }: PersonsAction) {
  //   const state = getState();
  //   setState({ items: [ ...state.items, payload ] });
  // }

  @Action(PersonActions.FetchAll)
  fetchAll(
    { getState, setState }: StateContext<PersonsStateModel>,
    {}: PersonActions.FetchAll
  ) {
    const state = getState();

    return this.personsService.all().pipe(
      tap((response) => {
        setState({ items: response });
      })
    );
  }
}
