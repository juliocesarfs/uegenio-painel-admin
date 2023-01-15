import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { HolidayListResolve } from './shared/tipo-amigo-client/tipo-produto-list.resolve';
import { HolidayResolve } from './shared/tipo-amigo-client/tipo-produto.resolve';
import { HolidayFormComponent } from './tipo-produto-form/holiday-form.component';
import { HolidayListComponent } from './tipo-produto-list/tipo-produto-list.component';




/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const HolidayRoutes: Routes = [

  {
    path: 'consulta',
    component: HolidayListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      holiday: HolidayResolve,
    }
  },
  {
    path: 'incluir',
    component: HolidayFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
    },
  },

  {
    path: 'listar',
    component: HolidayListComponent,
    canActivate: [
      SecurityGuard
    ],
    resolve: {
      holidays: HolidayListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: HolidayFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
    },
    resolve: {
      holiday: HolidayResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: HolidayFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
    },
    resolve: {
      holiday: HolidayResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
