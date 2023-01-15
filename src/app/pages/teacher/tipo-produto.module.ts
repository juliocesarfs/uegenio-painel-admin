import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { TeacherRoutes } from './tipo-produto.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { TeacherFormComponent } from './tipo-produto-form/teacher-form.component';
import { TeacherListComponent } from './tipo-produto-list/tipo-produto-list.component';
import { TeacherClientModule } from './shared/tipo-amigo-client/tipo-produto-client.module';

import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    TeacherFormComponent,
    TeacherListComponent,
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
    TeacherClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(TeacherRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule
  ]
})
export class TeacherModule { }
