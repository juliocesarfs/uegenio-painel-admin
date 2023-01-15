import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { SemesterListResolve } from './shared/tipo-amigo-client/tipo-produto-list.resolve';
import { SemesterResolve } from './shared/tipo-amigo-client/tipo-produto.resolve';
import { SemesterFormComponent } from './tipo-produto-form/semester-form.component';
import { SemesterListComponent } from './tipo-produto-list/tipo-produto-list.component';




/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const SemesterRoutes: Routes = [

  {
    path: 'consulta',
    component: SemesterListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      semester: SemesterResolve,
    }
  },
  {
    path: 'incluir',
    component: SemesterFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
    },
  },

  {
    path: 'listar',
    component: SemesterListComponent,
    canActivate: [
      SecurityGuard
    ],
    resolve: {
      semesters: SemesterListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: SemesterFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
    },
    resolve: {
      semester: SemesterResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: SemesterFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      semester: SemesterResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
