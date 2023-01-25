import { Routes } from "@angular/router";
import { SecurityGuard } from "../../shared/security/security.guard";
import { AdministracaoComponent } from "./administracao.component";
import { LayoutComponent } from "../../layouts/layout.component";

/**
 * Configuração de 'Rotas' do módulo 'Home'.
 *
 * @author Guiliano Rangel (UEG)
 */
export const AdministracaoRoutes: Routes = [
  {
    path: "administracao",
    component: LayoutComponent,
    canActivate: [SecurityGuard],
    children: [
      {
        path: "",
        component: AdministracaoComponent,
      },
      {
        path: "grupo",
        loadChildren: () =>
          import("../grupo/grupo.module").then((m) => m.GrupoModule),
      },

      {
        path: "subject",
        loadChildren: () =>
          import("../tipo-produto/tipo-produto.module").then(
            (m) => m.SubjectModule
          ),
      },
      {
        path: "teacher",
        loadChildren: () =>
          import("../teacher/tipo-produto.module").then(
            (m) => m.TeacherModule
          ),
      },
      {
        path: "holiday",
        loadChildren: () =>
          import("../holiday/tipo-produto.module").then(
            (m) => m.HolidayModule
          ),
      },
      {
        path: "semester",
        loadChildren: () =>
          import("../semester/semester.module").then(
            (m) => m.SemesterModule
          ),
      },
      {
        path: "classroom",
        loadChildren: () =>
          import("../classroom/classroom.module").then(
            (m) => m.ClassroomModule
          ),
      },

    ],
  },
];
