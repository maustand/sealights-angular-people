import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CountriesState } from './countries.state';

describe('Countries actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CountriesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));


});
