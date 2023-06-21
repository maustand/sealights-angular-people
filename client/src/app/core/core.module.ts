import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@env';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PersonsState } from './store/persons/persons.state';
import { CountriesState } from './store/countries/countries.state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([PersonsState, CountriesState]),
    NgxsRouterPluginModule.forRoot(),
    ...(!environment.production
      ? [NgxsReduxDevtoolsPluginModule.forRoot()]
      : []),
  ],
  exports: [AppRoutingModule],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }
}
