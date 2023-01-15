import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { ClassroomRoutes } from './usuario.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { ClassroomFormComponent } from './usuario-form/classroom-form.component';
import { ClassroomListComponent } from './usuario-list/classroom-list.component';
import { ClassroomClientModule } from './shared/usuario-client/usuario-client.module';
import { UsuarioTelefoneFormComponent } from './usuario-telefone-form/usuario-telefone-form.component';

@NgModule({
  declarations: [
    ClassroomFormComponent,
    ClassroomListComponent,
    UsuarioTelefoneFormComponent
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
    ClassroomClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(ClassroomRoutes)
  ]
})
export class ClassroomModule { }
