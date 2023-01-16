import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { SemesterListResolve } from '../semester/shared/semester-client/semester-list.resolve';
import { SubjectListResolve } from '../tipo-produto/shared/tipo-amigo-client/tipo-produto-list.resolve';
import { ClassroomResolve } from './shared/usuario-client/classroom.resolve';
import { ClassroomFormComponent } from './usuario-form/classroom-form.component';
import { ClassroomListComponent } from './usuario-list/classroom-list.component';

/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const ClassroomRoutes: Routes = [
  {
    path: 'incluir',
    component: ClassroomFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',

    },
    resolve: {
      semester: SemesterListResolve,
      subjects: SubjectListResolve
    }
  },
  {
    path: 'listar',
    component: ClassroomListComponent,
    canActivate: [
      SecurityGuard
    ],

  },
  {
    path: ':id/alterar',
    component: ClassroomFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',

    },
    resolve: {
      classroom: ClassroomResolve,
      // sistemas: SistemaAtivoResolve
    }
  },
  {
    path: ':id/visualizar',
    component: ClassroomFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',

    },
    resolve: {
      classroom: ClassroomResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
