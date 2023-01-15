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
        path: "usuario",
        loadChildren: () =>
          import("./../usuario/usuario.module").then((m) => m.UsuarioModule),
      },
      {
        path: "tipo-amigo",
        loadChildren: () =>
          import("../tipo-amigo/tipo-amigo.module").then(
            (m) => m.TipoAmigoModule
          ),
      },
      {
        path: "amigo",
        loadChildren: () =>
          import("../amigo/amigo.module").then((m) => m.AmigoModule),
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
          import("../semester/tipo-produto.module").then(
            (m) => m.SemesterModule
          ),
      },
      {
        path: "classroom",
        loadChildren: () =>
          import("../classroom/usuario.module").then(
            (m) => m.ClassroomModule
          ),
      },
      {
        path: "produto",
        loadChildren: () =>
          import("../produto/produto.module").then((m) => m.ProdutoModule),
      },
      {
        path: "mensagem",
        loadChildren: () =>
          import("../mensagem/mensagem.module").then((m) => m.MensagemModule),
      },
      {
        path: "venda",
        loadChildren: () =>
          import("../venda/venda.module").then((m) => m.VendaModule),
      },
      {
        path: "cliente",
        loadChildren: () =>
          import("../cliente/cliente.module").then((m) => m.ClienteModule),
      },
    ],
  },
];
