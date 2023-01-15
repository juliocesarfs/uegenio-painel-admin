/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../../shared/message/message.service';
import {AcaoSistema} from '../../../shared/component/acao-sistema.acao';
import {SecurityService} from '../../../shared/security/security.service';
import { ProdutoClientService } from '../shared/produto-client/produto-client.service';


/**
 * Componente de formulário de Produto.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {

  public acaoSistema: AcaoSistema;

  public produto: any;
  public tipoProdutos: any[];
  public submittedProduto: boolean;

  public dataSourceGrupos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild('formProduto', { static: true }) formProduto: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param produtoClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private produtoClientService: ProdutoClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceGrupos = new MatTableDataSource<any>();

    this.tipoProdutos = route.snapshot.data.tipoProdutos;


    if (this.acaoSistema.isAcaoIncluir()) {

      // Inicializa o Produto para Inclusão
      this.produto = {
      };
    }


    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {

      this.produto = route.snapshot.data.produto;
      console.log(this.produto);
    }
  }


  /**
   * Salva a instância de Produto.
   *
   * @param produto
   * @param form
   * @param event
   */
  public salvar(produto: any, form: NgForm, event: any) {

    form.onSubmit(event);
    this.submittedProduto = true;

    if (form.valid) {

      this.produtoClientService.salvar(produto).subscribe(() => {
          this.router.navigate(['/administracao/produto']);
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          this.messageService.addMsgDanger(error);
        });
    }
  }

  /**
   * Altera o status do Produto informado.
   *
   * @param produto

  public alterarStatusProduto(produto: any): void {
    if (produto.produto) {
      this.tornarProduto(produto);
    } else {
      this.deixarProduto(produto);
    }
  }
**/
  /**
   * Torna o cadastro um Produto.
   *
   * @param produto
   */
  private tornarProduto(produto: any): void {
    this.messageService.addConfirmYesNo('MSG046', () => {
      this.produtoClientService.tornarProduto(produto.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        produto.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      produto.status = false;
    });
  }

  /**
   * deixar de ser produto do cadastro
   *
   * @param produto

  private deixarProduto(produto: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.produtoClientService.deixarAmizade(produto.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        produto.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      produto.status = true;
    });
  }
**/
  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/produto');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/produto');
      });
    }
  }

}
