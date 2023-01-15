import { VendaClientValidacao } from './venda-date';
import { VendaClienteClient } from './venda-consulta-cliente';
import { logging } from 'protractor';
/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute, Router } from '@angular/router';
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
import { VendaPorcentagemClient } from './venda-consulta';
import Funnel from "devextreme/viz/funnel";

import { DxButtonModule } from 'devextreme-angular';
import { ThrowStmt } from '@angular/compiler';
import { Chart } from 'chart.js';
import { Utils } from 'ngx-bootstrap';
import { DxChartComponent, DxColorBoxComponent } from 'devextreme-angular';
import { NgForm, PatternValidator } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { NgModule,  enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule } from 'devextreme-angular';
import { exportFromMarkup } from 'devextreme/viz/export';
import { VendaClientValidacao1 } from './venda-dateconf';
import { VendaClienteDataClient } from './venda-consulta-clienteData';



/**
 * Componente de listagem de Venda.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './venda-consultacliente.component.html',
  styleUrls: ['./venda-consultacliente-component.scss']
})
export class VendaConsultaClienteComponent extends  AbstractComponent implements OnInit {
  public canvg;
  public vendaPorcentagemCliente: VendaPorcentagemClient[];
  public clientes: VendaClienteClient[];
  public vendaDataInicial: any;
  public vendaDataFinal:any;
  public vendaDataInicialOpen: any;
  public vendaDataFinalOpen:any;
  public i;
  public co1;
  public co2;
  public date:Date;
  public found;
  public datepipe: DatePipe;
  public objetoFiltrado: VendaPorcentagemClient[];
  public objetosFiltrados: VendaPorcentagemClient[];
  public objetoFiltro: VendaClientValidacao1[]=[];
  public produtosVinculados;
  public venda:any;
  public valorItemVenda:any;
  public lucroLiquido:number;
  public valorVenda:number;
  public valorDistribuidor;
  public quantidadeProduto;
  public clientesCadastrados;
  public ticketMedio;
  public months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  public clienteData: VendaClienteDataClient[]=[];


  //public found;
  public dados;
  public arg;
  public chart: DxChartComponent;
  public j;
  public objetoFiltradoCliente: VendaClienteClient[];


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
    public router: Router,
    private messageService: MessageService,
    private vendaClientService: VendaClientService, // TODO ver se vai usar mesmo
    public securityService: SecurityService,
  ) {
    super();
    this.produtosVinculados = [];
    this.vendaPorcentagemCliente = route.snapshot.data.venda;
    this.venda= route.snapshot.data.venda;
    this.produtosVinculados= route.snapshot.data.itemVenda;
    console.log("Produtos Vinculados",this.venda.valorTotal);

    this.clientes= route.snapshot.data.clientes;
    console.log(this.clientes);
    //const valor= this.vendaPorcentagemCliente.map(t=>t.nomeCliente);

    //this.found= this.vendaPorcentagemCliente.filter(x=> x.id== 2);
   // console.log(this.found);
    this.co1=0;
    this.co2=0;
    this.i=0;
    const found= this.vendaPorcentagemCliente.find(el=> el.id===1);

    this.objetoFiltro=[];








    //this.found= valor.find(element=> element != null);

    //while(this.i<this.vendaPorcentagemCliente.length){

    console.log('O valor é:'+this.co1+this.co2);

    console.log('VendaPorcentagemCliente: ', this.vendaPorcentagemCliente);
  }

  export() {
    exportFromMarkup(this.prepareMarkup(), {
      width: 300,
      height: 100,
      margin: 0,
      format: 'png',
      svgToCanvas(svg, canvas) {
        return new Promise((resolve) => {

        });
      },
    });
  }
  prepareMarkup() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="300px" height="100px">${
      document.getElementById('custom_markup_container').innerHTML
    }<g transform="translate(305,12)">${
      this.chart.instance.svg()
    }</g>`
            + '</svg>';
  }




  customizeTooltip(arg: any) {


    return {
      text: `<span class='title'>Clientes:</span><br />&nbsp;<br />`
                +  ` ${
        arg.valueText} `,
    };
  }

  customizeLabel(arg: any) {
    return `${arg.value} `;
  }

  print() {
    this.chart.instance.print();
  }

//  export() {
  //  this.chart.instance.exportTo('Example', 'png');
  //}


  /*
   * Inicializa o Component.
*/
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


  public getValor(){

    const contador= this.valorItemVenda.map(e=> e.id);
    var i;
    var j;
    let co1=0;
    this.lucroLiquido=0;
    this.valorVenda=0;
    this.quantidadeProduto=0;
    for(i=0;i<this.objetosFiltrados.length;i++){
      for(j=0;j<this.valorItemVenda[i].length;j++){
      this.lucroLiquido=this.lucroLiquido +(Number(this.valorItemVenda[i][0].quantidadeVendida)*(Number(this.valorItemVenda[i][0].preco)*Number((this.valorItemVenda[i][0].valorLiquido/100))));

      this.quantidadeProduto++;
      }
      this.valorVenda= this.valorVenda +Number(this.objetosFiltrados[i].valorTotal);
    }

    this.valorDistribuidor=0;
    this.valorDistribuidor=this.valorVenda-this.lucroLiquido;
    this.valorDistribuidor=this.valorDistribuidor.toFixed(2);
    this.lucroLiquido.toFixed(2)
    this.valorVenda=Number(this.valorVenda.toFixed(2));




    console.log(this.valorVenda);


  }

  public valoresClientes(){
    this.clientesCadastrados=0;
    this.clientesCadastrados=this.objetoFiltradoCliente.length;
     console.log( this.objetoFiltradoCliente);
  }

  public salvar(vendaDataInicial: any, vendaDataFinal: any, form: NgForm, event: any) {
    form.onSubmit(event);


    if (form.valid) {
     const dateSendingToServer = new DatePipe('en-US').transform(vendaDataFinal, 'dd/MM/yyyy');
     const dateSendingToServer1 = new DatePipe('en-US').transform(vendaDataInicial, 'dd/MM/yyyy')
     this.vendaDataInicial=dateSendingToServer1;

     this.vendaDataFinal=dateSendingToServer;
     this.objetoFiltro=[];
     this.produtosVinculados = [];
     this.objetoFiltrado=[];
     this.objetosFiltrados=[];
     this.dadosVenda();
     this.valorCerto();

     this.valorItemVenda=this.objetosFiltrados.map(el=> el.itemVenda);
     this.dadosCliente();
     this.getValor();
     this.dadosFiltro();
     this.valoresClientes();
     this.ticket();
     this.dadosFiltroCliente();

     //this.converteDataddMM();

    } else {
      this.messageService.addMsgSuccess("MSG001");
    }
  }
  public ticket(){
  this.ticketMedio=0;
   this.ticketMedio= (this.valorVenda/Number(this.objetosFiltrados.length)).toFixed(2);
  }

  public dadosFiltro(){
    let conta=0;
    let contaj=0;
    let co1=0;
    let co2=0;
    const contador= this.objetosFiltrados.map(e=> e.id);
    console.log(contador);
    this.i=0;
    this.j=0;

    for(this.i=0;this.i<this.objetosFiltrados.length;this.i++){
       const found=this.objetosFiltrados.find(el=> el.id===(contador[conta]));

      for(this.j=0;this.j<this.objetosFiltrados.length;this.j++){

       const dados=this.objetosFiltrados.find(el1=> el1.id===contador[contaj]);

        //let dados1=this.objetosFiltrados.map(i=> i.dataVenda);
          if(dados!==undefined && found!==undefined){

          let date1=this.converteData(new DatePipe('en-US').transform(found.dataVenda, 'dd/MM/yyyy'));
          let date2= this.converteData(new DatePipe('en-US').transform(dados.dataVenda, 'dd/MM/yyyy'));

           if(date1.getMonth()== date2.getMonth()) {
            console.log(date1+" DATA 2 "+ date2);
            co1= co1+Number(dados.valorTotal);
            this.date=found.dataVenda;



          }}

        contaj++;

   }
   let date3= this.converteData(new DatePipe('en-US').transform(this.date, 'dd/MM/yyyy'));
   const monthAtual= date3.getMonth();

   this.objetoFiltro.push({
    dataVenda:this.date,
    valorTotal:co1,
    mes: this.months[monthAtual] });
    co1 = 0;
    conta++;
    contaj=0;


  }
  console.log(this.objetoFiltro);


  }


public converteData(DataDDMMYY) {
    const dataSplit = DataDDMMYY.split('/');
    const novaData = new Date(parseInt(dataSplit[2], 10),
                  parseInt(dataSplit[1], 10) - 1,
                  parseInt(dataSplit[0], 10));

    return novaData;
}



public dadosFiltroCliente(){
  let conta=0;
  let contaj=0;
  let co1=0;
  let co2=0;
  const contador= this.objetoFiltradoCliente.map(e=> e.id);
  this.i=0;
  this.j=0;

  for(this.i=0;this.i<this.objetoFiltradoCliente.length;this.i++){
     const found=this.objetoFiltradoCliente.find(el=> el.id===(contador[conta]));

    for(this.j=0;this.j<this.objetoFiltradoCliente.length;this.j++){

     const dados=this.objetoFiltradoCliente.find(el1=> el1.id===contador[contaj]);

      //let dados1=this.objetosFiltrados.map(i=> i.dataVenda);
        if(dados!==undefined && found!==undefined){

        let date1=this.converteData(new DatePipe('en-US').transform(found.dataCadastro, 'dd/MM/yyyy'));
        let date2= this.converteData(new DatePipe('en-US').transform(dados.dataCadastro, 'dd/MM/yyyy'));
        console.log("Data1",found.dataCadastro)
        console.log("Data2",dados.dataCadastro)
         if(date1.getMonth()== date2.getMonth()) {
          co1++;
          this.date=found.dataCadastro;
          console.log("Quantidade", co1);


        }}


      contaj++;

 }
 let date3= this.converteData(new DatePipe('en-US').transform(this.date, 'dd/MM/yyyy'));
   const monthAtual= date3.getMonth();


   this.clienteData.push({
    dataCadastro:this.date,
    quantidade:co1,
    mes: this.months[monthAtual] });
    co1 = 0;
    conta++;
    contaj=0;
}
}
  public dadosCliente(){
    let datainicial = this.converteData(this.vendaDataInicial);
    let dataFinal = this.converteData(this.vendaDataFinal);

    this.objetoFiltradoCliente=this.clientes.filter(result=>
       {
    return this.converteData(new DatePipe('en-US').transform(result.dataCadastro, 'dd/MM/yyyy')) >= datainicial && this.converteData(new DatePipe('en-US').transform(result.dataCadastro, 'dd/MM/yyyy')) <= dataFinal;
  })
  }


  public dadosVenda(){
    let datainicial = this.converteData(this.vendaDataInicial);

    let dataFinal = this.converteData(this.vendaDataFinal);
    this.objetoFiltrado = this.vendaPorcentagemCliente.filter(result =>
      {
        return this.converteData(new DatePipe('en-US').transform(result.dataVenda, 'dd/MM/yyyy')) >= datainicial && this.converteData(new DatePipe('en-US').transform(result.dataVenda, 'dd/MM/yyyy')) <= dataFinal;
     }



     //this.router.navigate(["/administracao/venda/consulta"])

)
//this.converteData( new DatePipe('en-US').transform(result.dataVenda, 'dd/MM/yyyy')).getTime >= datainicial.getTime && this.converteData(new DatePipe('en-US').transform(result.dataVenda, 'dd/MM/yyyy')).getTime <= dataFinal.getTime
//this.load();

  }
  valorCerto() {
    var reduced = [];

    this.objetoFiltrado.forEach((item) => {
    var duplicated  = reduced.findIndex(redItem => {
        return item.id == redItem.id;
    }) > -1;

    if(!duplicated) {
        reduced.push(item);
    }
  });
  this.objetosFiltrados= reduced.concat(this.objetosFiltrados);

  console.log("reduzido",reduced);
  }





}
function customizeText(arg: any) {
  throw new Error('Function not implemented.');
}

