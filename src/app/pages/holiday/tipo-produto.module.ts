import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { HolidayRoutes } from './tipo-produto.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { HolidayFormComponent } from './tipo-produto-form/holiday-form.component';
import { HolidayListComponent } from './tipo-produto-list/tipo-produto-list.component';
import { HolidayClientModule } from './shared/tipo-amigo-client/tipo-produto-client.module';

import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    HolidayFormComponent,
    HolidayListComponent,
  ],
  entryComponents: [
  ],
  imports: [
    FormsModule,
    OrderModule,
    CommonModule,
    MessageModule,
    MaterialModule,
    ValidationModule,
    HolidayClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(HolidayRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule
  ]
})
export class HolidayModule { }
