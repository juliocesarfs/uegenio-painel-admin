import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { SemesterRoutes } from './semester.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { SemesterFormComponent } from './tipo-produto-form/semester-form.component';
import { SemesterListComponent } from './tipo-produto-list/tipo-produto-list.component';
import { SemesterClientModule } from './shared/semester-client/semester-client.module';

import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    SemesterFormComponent,
    SemesterListComponent,
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
    SemesterClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(SemesterRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule
  ]
})
export class SemesterModule { }
