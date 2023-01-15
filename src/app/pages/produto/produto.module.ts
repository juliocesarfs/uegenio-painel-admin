
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { ProdutoRoutes } from './produto.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoClientModule } from './shared/produto-client/produto-client.module';

import { ProdutoRankingComponent } from './produto-ranking/produto-ranking.component';
import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdutoEstoquComponent } from './produto-estoque/produto-estoque.component';




@NgModule({
  declarations: [
    ProdutoFormComponent,
    ProdutoListComponent,
    ProdutoRankingComponent,
    ProdutoEstoquComponent
  ],
  entryComponents: [
  ],
  imports: [
    FormsModule,
    OrderModule,
    CommonModule,
    MessageModule,
    MaterialModule,
    ValidationModule,
    ProdutoClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(ProdutoRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule,
  ],
  bootstrap: [ProdutoRankingComponent]
})
export class ProdutoModule { }

platformBrowserDynamic().bootstrapModule(ProdutoModule);
