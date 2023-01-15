import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { SubjectRoutes } from './tipo-produto.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { SubjectFormComponent } from './tipo-produto-form/tipo-produto-form.component';
import { SubjectListComponent } from './tipo-produto-list/tipo-produto-list.component';
import { SubjectClientModule } from './shared/tipo-amigo-client/tipo-produto-client.module';

import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    SubjectFormComponent,
    SubjectListComponent,
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
    SubjectClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(SubjectRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule
  ]
})
export class SubjectModule { }
