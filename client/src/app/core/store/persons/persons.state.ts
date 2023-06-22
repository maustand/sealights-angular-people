import { Injectable } from '@angular/core';
import { Person } from '@core/models/person';
import { PersonsService } from '@core/services/dal/persons/persons.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { PersonActions } from './persons.actions';

export interface PersonsStateModel {
  items: Person[];
  filterValue: string;
}

@State<PersonsStateModel>({
  name: 'persons',
  defaults: {
    items: [],
    filterValue: '',
  },
})
@Injectable()
export class PersonsState {
  constructor(private readonly personsService: PersonsService) {}

  @Selector() static getRaw(state: PersonsStateModel) {
    return state.items;
  }

  @Selector() static getItemsByName(state: PersonsStateModel) {
    const filterStr = state.filterValue.toLowerCase();
    const personsList = state.items;

    const filtered = personsList.filter((i) => {
      return i.name.toLowerCase().indexOf(filterStr) !== -1;
    });

    return filtered;
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
  createPerson(
    { patchState, getState }: StateContext<PersonsStateModel>,
    { payload }: PersonActions.CreatePerson
  ) {
    const state = getState();
    return this.personsService.create(payload).pipe(
      tap((newPerson) => {
        patchState({ items: [...state.items, newPerson] });
      })
    );
  }

  @Action(PersonActions.DoFilterByName)
  filterByName(
    { patchState }: StateContext<PersonsStateModel>,
    { nameForFilterValues }: PersonActions.DoFilterByName
  ) {
    patchState({ filterValue: nameForFilterValues });
  }
}
