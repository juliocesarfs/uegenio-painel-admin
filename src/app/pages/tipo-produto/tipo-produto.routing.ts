import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { SubjectListResolve } from './shared/tipo-amigo-client/tipo-produto-list.resolve';
import { SubjectResolve } from './shared/tipo-amigo-client/tipo-produto.resolve';
import { SubjectFormComponent } from './tipo-produto-form/tipo-produto-form.component';
import { SubjectListComponent } from './tipo-produto-list/tipo-produto-list.component';




/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const SubjectRoutes: Routes = [

  {
    path: 'consulta',
    component: SubjectListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      subject: SubjectResolve,
    }
  },
  {
    path: 'incluir',
    component: SubjectFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
    },
  },

  {
    path: 'listar',
    component: SubjectListComponent,
    canActivate: [
      SecurityGuard
    ],
    resolve: {
      subjects: SubjectListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: SubjectFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
    },
    resolve: {
      subject: SubjectResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: SubjectFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      subject: SubjectResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
