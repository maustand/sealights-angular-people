import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PersonsState } from './persons.state';

describe('Persons actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PersonsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));
/*
  it('should create an action and add an item', () => {
    store.dispatch(new PersonsActions('item-1'));
    store.select(state => state.persons.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });
*/
});
