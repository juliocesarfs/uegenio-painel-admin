/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { StatusAtivoInativo} from 'src/app/shared/app.constantes';
import { MessageService } from 'src/app/shared/message/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { VendaClientService } from '../shared/venda-client/venda-client.service';
import {FiltroVendaDTO} from '../../../shared/dto/filtro-venda.dto';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {ModuloClientService} from '../../../shared/services/modulo-client/modulo-client.service';
import { VendaPorcentagemClient } from './venda-porcentagem-client';
import Funnel from "devextreme/viz/funnel";
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';
import { Utils } from 'ngx-bootstrap';
import { DxColorBoxComponent } from 'devextreme-angular';
import { PatternValidator } from '@angular/forms';



/**
 * Componente de listagem de Venda.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './venda-porcentagem-client.component.html',
  styleUrls: ['./venda-porcentagem-client-component.scss']
})
export class VendaPorcentagemClienteComponent extends  AbstractComponent implements OnInit {

  public vendaPorcentagemCliente: VendaPorcentagemClient[];
  public venda: Object;
  public i;
  public co1;
  public co2;
  public found;


  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param vendaClientService
   * @param securityService
   * @param moduloService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    private vendaClientService: VendaClientService, // TODO ver se vai usar mesmo
    public securityService: SecurityService,
  ) {
    super();
    this.vendaPorcentagemCliente = route.snapshot.data.venda;
    //const valor= this.vendaPorcentagemCliente.map(t=>t.nomeCliente);

    //this.found= this.vendaPorcentagemCliente.filter(x=> x.id== 2);
   // console.log(this.found);
    this.co1=0;
    this.co2=0;
    this.i=0;
    const found= this.vendaPorcentagemCliente.filter(el=> el.nomeCliente==='Sem Cliente');
    this.co1= found.length;
    this.co2= this.vendaPorcentagemCliente.length-found.length;




    //this.found= valor.find(element=> element != null);

    //while(this.i<this.vendaPorcentagemCliente.length){

    console.log('O valor é:'+this.co1+this.co2);

    console.log('VendaPorcentagemCliente: ', this.vendaPorcentagemCliente);
  }




  @ViewChild('grafico', { static: true }) element: ElementRef;
  ngOnInit() {

  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};


    const data = {
      labels: ['Sem Cliente', 'Com Clientes'],
      datasets: [
        {

          label: 'Porcentagem de Clientes Cadastrados em Vendas',
          data: [ this.co1, this.co2],
          fill: true,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(60, 179, 113)'],
        }
      ]
    }


    new Chart(this.element.nativeElement, {
      type: 'pie',
      data: data,

      options: {
        scales: {
          y: {
            grid: {
              offset: false
            }
          }
        },
        plugin:{
          labels:{
            render: 'percentage',
            fontColor: ['green', 'red']
          }
        }



      },
    });
  }
}

  /**
   * Inicializa o Component.

  ngOnInit() {
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    const arg = e.target
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }


}*/
