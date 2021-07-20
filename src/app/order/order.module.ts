import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; 


@NgModule({
  declarations: [OrderComponent],
  imports: [
    SharedModule,
    OrderRoutingModule,
    NgbDatepickerModule,
  ]
})
export class OrderModule { }
