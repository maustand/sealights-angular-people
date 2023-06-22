import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CitiesState } from './cities.state';

describe('Cities actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CitiesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
