import { ProdutoClientService } from './shared/produto-client/produto-client.service';
import { Routes } from '@angular/router';
import { SecurityGuard } from '../../shared/security/security.guard';
import { SubjectListResolve } from '../tipo-produto/shared/tipo-amigo-client/tipo-produto-list.resolve';


import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoRankingComponent } from './produto-ranking/produto-ranking.component';
import { ProdutoListResolve } from './shared/produto-client/produto-list.resolve';
//import { ProdutoRankingResolve } from './shared/produto-client/produto-ranking.resolve';

import { ProdutoResolve } from './shared/produto-client/produto.resolve';
import { ProdutoRankingResolve } from './shared/produto-client/produto-ranking.resolve';
import { ProdutoEstoquComponent } from './produto-estoque/produto-estoque.component';



/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const ProdutoRoutes: Routes = [
  {
    path: 'incluir',
    component: ProdutoFormComponent,
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
      tipoProdutos: SubjectListResolve
    }
  },
  {
    path: 'listar',
    component: ProdutoListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_PRODUTO_PESQUISAR'
        ]
      }
    },
    resolve: {
      tipoProdutos: SubjectListResolve,
      produtos: ProdutoListResolve
    }
  },

  {
    path: 'ranking',
    component: ProdutoRankingComponent,
    resolve: {
      // produtoRanking: ProdutoRankingResolve
      produtos: ProdutoRankingResolve,
      tipo: SubjectListResolve,

    }
  },
  {
    path: 'tipo',
    component: ProdutoRankingComponent,
    resolve: {
      // produtoRanking: ProdutoRankingResolve
      produtos: ProdutoRankingResolve,
      tipo: SubjectListResolve,

    }
  },

  {
    path: ':id/alterar',
    component: ProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_PRODUTO_ALTERAR'
        ]
      }
    },
    resolve: {
      produto: ProdutoResolve,
      tipoProdutos: SubjectListResolve
    }
  },
  {
    path: ':id/visualizar',
    component: ProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_PRODUTO_VISUALIZAR'
        ]
      }
    },
    resolve: {
      produto: ProdutoResolve,
      tipoProdutos: SubjectListResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },

  {
    path: 'estoque',
    component: ProdutoEstoquComponent,
    resolve: {
      // produtoRanking: ProdutoRankingResolve
      produtos: ProdutoRankingResolve,

    }
  },
];
