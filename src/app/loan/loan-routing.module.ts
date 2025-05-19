import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';
import { LoanComponent } from './loan.component';

/** Custom Components */

const routes: Routes = [
  Route.withShell([
    {
      path: 'loan',
      data: {
        title: 'Loans',
        breadcrumb: 'Loans',
        routeParamBreadcrumb: false
      },
      children: [
        {
          path: '',
          component: LoanComponent
        }
      ]
    }
  ])

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoanRoutingModule {}
