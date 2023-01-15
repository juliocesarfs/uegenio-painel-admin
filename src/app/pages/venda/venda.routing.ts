import { ProdutoResolve } from './../produto/shared/produto-client/produto.resolve';
import { ClienteListResolve } from './../cliente/shared/cliente-client/cliente-list.resolve';
import { ItemVendaClientResolve } from './../../shared/services/item-venda-client/item-venda-client.resolve';
import {Routes} from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';

import {VendaFormComponent} from './venda-form/venda-form.component';
import {VendaListComponent} from './venda-list/venda-list.component';
import { VendaListResolve } from './shared/venda-client/venda-list.resolve';
import { VendaResolve } from './shared/venda-client/venda.resolve';
import { VendaPorcentagemClient } from './venda-porcentagem-client/venda-porcentagem-client';
import { VendaPorcentagemClienteComponent } from './venda-porcentagem-client/venda-porcentagem-client.component';
import { VendaPorcentagemClientResolve } from './shared/venda-client/venda-porcentagem-client.resolve';
import { VendaConsultaComponent } from './venda-consulta/venda-consulta.component';
import { VendaConsultaMComponent } from './venda-consultam/venda-consulta.component';
import { VendaConsultaClienteComponent } from './venda-consultacliente/venda-consultacliente.component';
import { VendaIndividualClienteComponent } from './venda-consultaindividual/venda-consultacliente.component';
import { VendaProdutoComponent } from './venda-tipoProduto/venda-consulta.component';
import { RelatorioVendaComponent } from './venda-relatorio/relatorio.component';




/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const VendaRoutes: Routes = [
  {
    path: 'incluir',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_VENDA_INCLUIR'
        ]
      }
    },
    resolve: {

      clientes: ClienteListResolve
    }
  },
  {
    path: 'listar',
    component: VendaListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_VENDA_PESQUISAR'
        ]
      }
    },
    resolve: {
      vendas: VendaListResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: ':id/alterar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_VENDA_ALTERAR'
        ]
      }
    },
    resolve: {
      venda: VendaResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: ':id/visualizar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'cssalterar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_VENDA_INCLUIR'
        ]
      }
    },
    resolve: {

      clientes: ClienteListResolve
    }
  },
  {
    path: 'porcentagemClient',
    component: VendaPorcentagemClienteComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },

  {
    path: 'consulta',
    component: VendaConsultaComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
  {
    path: 'consultam',
    component: VendaConsultaMComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
  {
    path: 'consultacliente',
    component: VendaConsultaClienteComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
  {
    path: 'consultaindividual',
    component: VendaIndividualClienteComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
  {
    path: 'vendaTipo',
    component: VendaProdutoComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
  {
    path: 'relatorio',
    component: RelatorioVendaComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaPorcentagemClientResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve,
    }
  },
];
