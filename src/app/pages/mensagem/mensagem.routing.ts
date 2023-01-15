import { ProdutoListResolve } from './../produto/shared/produto-client/produto-list.resolve';
import { ClienteListResolve } from './../cliente/shared/cliente-client/cliente-list.resolve';
import {Routes} from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';

import {MensagemFormComponent} from './mensagem-form/mensagem-form.component';
import {MensagemListComponent} from './mensagem-list/mensagem-list.component';
import { MensagemListResolve } from './shared/mensagem-list.resolve';
import { MensagemResolve } from './shared/mensagem.resolve';
import { MensagemTodosResolve } from './shared/mensagemtodos.resolve';






/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const MensagemRoutes: Routes = [
  {
    path: 'incluir',
    component: MensagemFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_PRODUTO_INCLUIR'
        ]
      }
    },
    resolve: {
      produto: ProdutoListResolve,
    }
  },

  {
    path: 'incluir1',
    component: MensagemFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir1',
      security: {
        roles: [
          'ROLE_PRODUTO_INCLUIR'
        ]
      }
    },
    resolve: {
      produto: ProdutoListResolve
    }
  },
  {
    path: 'listar',
    component: MensagemListComponent,
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
      mensagem: MensagemListResolve,
      produto: ProdutoListResolve,
      mensagem1: MensagemTodosResolve
    }
  },
  {
    path: 'retirar',
    component: MensagemFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'retirar',
      security: {
        roles: [
          'ROLE_VENDA_ALTERAR'
        ]
      }
    },
    resolve: {
      mensagem: MensagemResolve,
      produto: ProdutoListResolve,
      mensagem1: MensagemTodosResolve
    }
  },
  {
    path: ':id/visualizar',
    component: MensagemFormComponent,
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
      mensagem: MensagemResolve,
      produto: ProdutoListResolve,
      mensagem1: MensagemTodosResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },

];
