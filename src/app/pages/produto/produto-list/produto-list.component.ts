/* tslint:disable:no-redundant-jsdoc */
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';

import {MessageService} from 'src/app/shared/message/message.service';
import {SecurityService} from 'src/app/shared/security/security.service';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {formatDate} from '@angular/common';
import { FiltroProdutoDTO } from 'src/app/shared/dto/filtro-produto.dto';
import { ProdutoClientService } from '../shared/produto-client/produto-client.service';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list-component.scss']
})
export class ProdutoListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroProdutoDTO;

  public dataSource: MatTableDataSource<any>;

  public tipoProdutos: any[];

  public dataCadastro: Date = null;

  public displayedColumns = ['nome', 'nomeTipoProduto', 'preco', 'dataCadastro', 'quantidade', 'quantidadeVendida', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param produtoClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private produtoClientService: ProdutoClientService
  ) {
    super();
    const produtos = route.snapshot.data.produtos;
    this.tipoProdutos = route.snapshot.data.tipoProdutos;
    this.dataSource = new MatTableDataSource<any>(produtos);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroProdutoDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Produto conforme o filtro de pesquisa informado.
   *
   * @param filtroProdutoDTO
   */
  public pesquisar(filtroProdutoDTO: FiltroProdutoDTO): void {
    if (this.dataCadastro != null) {
      this.filtroDTO.dataCadastro = formatDate(this.dataCadastro, 'yyyy/MM/dd', 'pt-br');
    }
    this.produtoClientService.getByFiltro(filtroProdutoDTO).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    }, data => {
      this.messageService.addMsgDanger(data);
      this.dataSource.data = [];
    });
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroProdutoDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Altera o status do Produto informado.
   *
   * @param produto

  public alterarStatusProduto(produto: any): void {
    console.log('alterastatus:', produto);
    if (produto.produto) {
      this.tornarProduto(produto);
    } else {
      this.deixarProduto(produto);
    }
  }
*/
  /**
   * Tornar Produto o Produto informado.
   *
   * @param produto
   */
  private tornarProduto(produto: any): void {
    this.messageService.addConfirmYesNo('MSG046', () => {
      this.produtoClientService.tornarProduto(produto.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        produto.produto = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      produto.produto = false;
    });
  }

  /**
   * Deixar de ser Produto do cadastro informado.
   *
   * @param produto

  private deixarProduto(produto: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.produtoClientService.deixarAmizade(produto.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        produto.produto = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      produto.produto = true;
    });
  }
*/
  /**
   * remover o Produto informado.
   *
   * @param produto
   */
  private remover(produto: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.produtoClientService.remover(produto).subscribe(() => {
        this.filtroDTO.nome = this.filtroDTO.nome ? this.filtroDTO.nome : '%';
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        produto.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      produto.status = false;
    });
  }
}
