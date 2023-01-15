import { ProdutoListResolve } from '../shared/produto-client/produto-list.resolve';
import { ProdutoListComponent } from '../produto-list/produto-list.component';
/* tslint:disable:no-redundant-jsdoc */
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {MessageService} from 'src/app/shared/message/message.service';
import {SecurityService} from 'src/app/shared/security/security.service';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {formatDate} from '@angular/common';
import { FiltroProdutoDTO } from 'src/app/shared/dto/filtro-produto.dto';
import { ProdutoClientService } from '../shared/produto-client/produto-client.service';

import { Chart } from 'chart.js';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './produto-ranking.component.html',
  styleUrls: ['./produto-ranking-component.scss']
})
export class ProdutoRankingComponent extends AbstractComponent implements OnInit {

  public dataSource: MatTableDataSource<any>;
  public produtoRankingLista: [2342,23];
  public lista:["100","200"];
  public StringVariavel: any ;

  /**
   * Construtor da classe.
   *
   * @param route
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private produtoClientService: ProdutoClientService,

  ) {
    super();
    const produtos = route.snapshot.data.produtos;
    console.log(produtos);

  }


  @ViewChild('grafico', { static: true }) element: ElementRef;
  ngOnInit() {

  const produtoRanking= this.produtoClientService.getRanking();
  this.produtoClientService.getRanking().subscribe(produtoRankingLista => this.produtoRankingLista = produtoRankingLista.nome);
  //this.produtoRanking1= produtoRanking;
  //const produtos1=this.getRanking();
  console.log(this.produtoRankingLista);
  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};


    const data = {
      labels: this.lista,
      datasets: [
        {

          label: 'Quantidade vendida',
          data: [ { x: "test", y: 55 },
          { x: "hi", y: 20 }],
          fill: true,
        }
      ]
    }

    new Chart(this.element.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: [this.produtoRankingLista],
        datasets: [
          {

            label: 'Quantidade vendida',
            data: [ this.lista],
            fill: true,
          }
        ]
      },

      options: {
        scales: {
          y: {
            grid: {
              offset: false
            }
          }
        }
      },
    });
  }
}
