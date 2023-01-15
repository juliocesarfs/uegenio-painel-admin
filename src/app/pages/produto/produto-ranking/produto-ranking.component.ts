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
import { ProdutoRanking } from './produto-ranking';
import Funnel from "devextreme/viz/funnel";


/**
 * Componente de listagem de Produto.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './produto-ranking.component.html',
  styleUrls: ['./produto-ranking-component.scss']
})
export class ProdutoRankingComponent extends  AbstractComponent implements OnInit {

  public produtoRanking: ProdutoRanking[];

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
    this.produtoRanking = route.snapshot.data.produtos;
    console.log('ProdutoRanking: ', this.produtoRanking);
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
