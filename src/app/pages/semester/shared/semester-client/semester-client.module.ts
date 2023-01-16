import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SemesterResolve } from "./semester.resolve";
import { SemesterClientService } from "./semester-client.service";

import { SemesterListResolve } from "./semester-list.resolve";
import { SubjectClientService } from "src/app/pages/tipo-produto/shared/tipo-amigo-client/tipo-produto-client.service";
import { SubjectResolve } from "src/app/pages/tipo-produto/shared/tipo-amigo-client/tipo-produto.resolve";

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SemesterClientService, SemesterResolve, SemesterListResolve],
})
export class SemesterClientModule { }
