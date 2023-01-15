import { Routes } from "@angular/router";
import { SecurityGuard } from "../../shared/security/security.guard";

import { ClienteFormComponent } from "./cliente-form/cliente-form.component";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { ClienteListResolve } from "./shared/cliente-client/cliente-list.resolve";
import { ClienteResolve } from "./shared/cliente-client/cliente.resolve";

/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const ClienteRoutes: Routes = [
  {
    path: "incluir",
    component: ClienteFormComponent,
    canActivate: [SecurityGuard],
    data: {
      acao: "incluir",
      security: {
        roles: ["ROLE_CLIENTE_INCLUIR"],
      },
    },
    resolve: {},
  },
  {
    path: "listar",
    component: ClienteListComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: ["ROLE_CLIENTE_PESQUISAR"],
      },
    },
    resolve: {
      clientes: ClienteListResolve,
    },
  },
  {
    path: ":id/alterar",
    component: ClienteFormComponent,
    canActivate: [SecurityGuard],
    data: {
      acao: "alterar",
      security: {
        roles: ["ROLE_CLIENTE_ALTERAR"],
      },
    },
    resolve: {
      cliente: ClienteResolve,
    },
  },
  {
    path: ":id/visualizar",
    component: ClienteFormComponent,
    canActivate: [SecurityGuard],
    data: {
      acao: "visualizar",
      security: {
        roles: ["ROLE_CLIENTE_VISUALIZAR"],
      },
    },
    resolve: {
      cliente: ClienteResolve,
    },
  },
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
];
