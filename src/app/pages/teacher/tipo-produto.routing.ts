import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { TeacherListResolve } from './shared/tipo-amigo-client/tipo-produto-list.resolve';
import { TeacherResolve } from './shared/tipo-amigo-client/tipo-produto.resolve';
import { TeacherFormComponent } from './tipo-produto-form/teacher-form.component';
import { TeacherListComponent } from './tipo-produto-list/tipo-produto-list.component';




/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const TeacherRoutes: Routes = [

  {
    path: 'consulta',
    component: TeacherListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      teacher: TeacherResolve,
    }
  },
  {
    path: 'incluir',
    component: TeacherFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
    },
  },

  {
    path: 'listar',
    component: TeacherListComponent,
    canActivate: [
      SecurityGuard
    ],
    resolve: {
      teachers: TeacherListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: TeacherFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
    },
    resolve: {
      teacher: TeacherResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: TeacherFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      teacher: TeacherResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
