import { ItemVendaClientResolve } from './../../shared/services/item-venda-client/item-venda-client.resolve';

import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { VendaRoutes } from './venda.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListComponent } from './venda-list/venda-list.component';
import { VendaClientModule } from './shared/venda-client/venda-client.module';
import { ItemVendaClientService } from 'src/app/shared/services/item-venda-client/item-venda-client.service';
import { VendaPorcentagemClienteComponent } from './venda-porcentagem-client/venda-porcentagem-client.component';
import { DxButtonModule, DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';
import { VendaConsultaComponent } from './venda-consulta/venda-consulta.component';
import { VendaConsultaMComponent } from './venda-consultam/venda-consulta.component';
import { VendaConsultaClienteComponent } from './venda-consultacliente/venda-consultacliente.component';
import { VendaIndividualClienteComponent } from './venda-consultaindividual/venda-consultacliente.component';
import { VendaProdutoComponent } from './venda-tipoProduto/venda-consulta.component';
import { RelatorioVendaComponent } from './venda-relatorio/relatorio.component';




@NgModule({
  declarations: [
    VendaFormComponent,
    VendaListComponent,
    VendaPorcentagemClienteComponent,
    VendaConsultaComponent,
    VendaConsultaMComponent,
    VendaConsultaClienteComponent,
    VendaIndividualClienteComponent,
    VendaProdutoComponent,
    RelatorioVendaComponent

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
    VendaClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(VendaRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule,
    DxChartModule,
    DxButtonModule,


  ],
  providers: [ItemVendaClientService, ItemVendaClientResolve],
})
export class VendaModule { }
