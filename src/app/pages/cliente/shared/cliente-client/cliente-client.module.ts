import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClienteResolve } from "./cliente.resolve";
import { ClienteClientService } from "./cliente-client.service";

import { ClienteListResolve } from "./cliente-list.resolve";

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ClienteClientService, ClienteResolve, ClienteListResolve],
})
export class ClienteClientModule {}
