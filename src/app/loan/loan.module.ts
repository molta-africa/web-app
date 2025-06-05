import { NgModule } from '@angular/core';
import { DirectivesModule } from 'app/directives/directives.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { SharedModule } from 'app/shared/shared.module';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';

@NgModule({
  imports: [
    SharedModule,
    PipesModule,
    DirectivesModule,
    LoanRoutingModule
  ],
  declarations: [
    LoanComponent
  ]
})
export class LoanModule {}
