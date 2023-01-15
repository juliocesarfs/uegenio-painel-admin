import { ProdutoRankingResolve } from './produto-ranking.resolve';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoResolve } from './produto.resolve';
import { ProdutoClientService } from './produto-client.service';

import { ProdutoListResolve } from './produto-list.resolve';
import { SubjectListResolve } from 'src/app/pages/tipo-produto/shared/tipo-amigo-client/tipo-produto-list.resolve';



/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProdutoClientService,
    ProdutoResolve,
    SubjectListResolve,
    ProdutoListResolve,
    ProdutoRankingResolve
  ]
})
export class ProdutoClientModule { }
