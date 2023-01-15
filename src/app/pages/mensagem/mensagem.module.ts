
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { MensagemRoutes } from './mensagem.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { MensagemFormComponent } from './mensagem-form/mensagem-form.component';
import { MensagemListComponent } from './mensagem-list/mensagem-list.component';
import { MensagemClientModule } from './shared/mensagem-client.module';





@NgModule({
  declarations: [
    MensagemFormComponent,
    MensagemListComponent,

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
    MensagemClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(MensagemRoutes),


  ],

})
export class MensagemModule { }
