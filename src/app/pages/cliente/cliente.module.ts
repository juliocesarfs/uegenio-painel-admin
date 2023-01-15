import { ClienteRoutes } from "./cliente.routing";
import { ClienteFormComponent } from "./cliente-form/cliente-form.component";
import { NgModule } from "@angular/core";
import { NgxMaskModule } from "ngx-mask";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../layouts/material.module";

import { OrderModule } from "ngx-order-pipe";
import { MessageModule } from "../../shared/message/message.module";
import { ValidationModule } from "../../shared/validation/validation.module";
import { ClienteClientModule } from "../cliente/shared/cliente-client/cliente-client.module";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";

@NgModule({
  declarations: [ClienteFormComponent, ClienteListComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    OrderModule,
    CommonModule,
    MessageModule,
    MaterialModule,
    ValidationModule,
    ClienteClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(ClienteRoutes),
  ],
})
export class ClienteModule {}
