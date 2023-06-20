import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDashBoardComponent } from './features/persons/persons-dashboard/persons-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons',
  },
  {
    path: 'persons',
    children: [
      {
        path: '',
        component: PeopleDashBoardComponent,
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './features/persons/persons-create/persons-create.component'
          ).then((m) => m.PeopleCreateComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
