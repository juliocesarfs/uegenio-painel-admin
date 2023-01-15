
/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { StatusAtivoInativo} from 'src/app/shared/app.constantes';
import { MessageService } from 'src/app/shared/message/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { ProdutoClientService } from '../shared/produto-client/produto-client.service';
import {FiltroProdutoDTO} from '../../../shared/dto/filtro-produto.dto';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {ModuloClientService} from '../../../shared/services/modulo-client/modulo-client.service';

import Funnel from "devextreme/viz/funnel";
import { ProdutoEstoque } from './produto-estoque';



/**
 * Componente de listagem de Produto.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './produto-estoque.component.html',
  styleUrls: ['./produto-estoque-component.scss']
})
export class ProdutoEstoquComponent extends  AbstractComponent implements OnInit {

  public produtoEstoque: ProdutoEstoque[];
  public produto12:any[];
  public i;
  public valorEstoque;
  public valorTotalEstoque;
  public produtoMaisSaida:String[]=[];
  public produto;
  public produto1;
  public produtoMenosSaida:String[]=[];
  public quantidade;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param produtoClientService
   * @param securityService
   * @param moduloService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    private produtoClientService: ProdutoClientService, // TODO ver se vai usar mesmo
    public securityService: SecurityService,
  ) {
    super();
    this.produtoEstoque = route.snapshot.data.produtos;
    this.produto12= route.snapshot.data.produtos;
    let tipo= this.produto12.map(e=>e.tipo);
    console.log('ProdutoEstoooooooooooooque: ', tipo);
    this.valorEstoque=0;
    this.produto=0;
    this.produto1=0;
    //this.produtoMaisSaida=null;
    this.calculoEstoque();
    this.calculoProdutoMaisSaida();
    this.calculaQuantidadeProduto();
  }
  public calculoEstoque(){
    for(this.i=0;this.i<=this.produtoEstoque.length;this.i++){
      const found= this.produtoEstoque.find(el=> el.id===this.i);
      if(found!==undefined)
      this.valorEstoque+= Number(found.quantidade)*Number(found.preco);
    }



    }
    public calculaQuantidadeProduto(){
    const contador= this.produtoEstoque.map(el=>el.id);
    let cont1=0;
    this.quantidade=0;

    for(this.i=1;this.i<=this.produtoEstoque.length;this.i++){
      const found= this.produtoEstoque.find(el=> el.id===contador[cont1]);
      console.log(found.nome);

      if(found!==undefined){


        this.quantidade= this.quantidade+ Number(found.quantidade);

      }
      cont1++;
  }


  }
  public calculoProdutoMaisSaida(){
    let index=1;
    let indexMenos=1;
    const found1=this.produtoEstoque.find(el=> el.id===1);
    this.produto=found1.quantidadeVendida;
    this.produto1=found1.quantidadeVendida;
    const contador= this.produtoEstoque.map(el=>el.id);
    let cont1=0;

    for(this.i=1;this.i<=this.produtoEstoque.length;this.i++){
      const found= this.produtoEstoque.find(el=> el.id===contador[cont1]);
      console.log(found.nome);
      if(found!==undefined){
      if(found.quantidadeVendida>=this.produto){
        console.log(found.nome);
        this.produto=found.quantidadeVendida;
        this.produto1=found.nome;

      }}
      cont1++;
  }
  this.produtoMaisSaida.push(
    this.produto1);
    cont1=0;
    this.produto=found1.quantidadeVendida;
    this.produto1=found1.quantidadeVendida;
    for(this.i=1;this.i<=this.produtoEstoque.length;this.i++){
      const found= this.produtoEstoque.find(el=> el.id===contador[cont1]);
      if(found!==undefined){
      if(found.quantidadeVendida<=this.produto){
        this.produto=found.quantidadeVendida;
        this.produto1=found.nome;
      }}
      cont1++;
    }
    this.produtoMenosSaida.push(
      this.produto1
    )
}

  /**
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


}
