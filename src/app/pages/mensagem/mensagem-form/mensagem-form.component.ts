import { TipoRetirada } from './../../../shared/app.constantes';
/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from '../../../shared/message/message.service';
import {AcaoSistema} from '../../../shared/component/acao-sistema.acao';
import {SecurityService} from '../../../shared/security/security.service';
import { MensagemClientService } from '../shared/mensagem-client.service';
import { AbstractComponent } from '../../../shared/component/Abstract.component';



/**
 * Componente de formulário de Mensagem.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-produto-form',
  templateUrl: './mensagem-form.component1.html',
  styleUrls: ['./mensagem-form.component.scss']
})
export class MensagemFormComponent extends AbstractComponent  {

  public acaoSistema: AcaoSistema;

  public mensagem: any;
  public produtos: any[];
  public submittedMensagem: boolean;

  public dataSourceTipoRetirada: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild('formMensagem', { static: true }) formMensagem: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param mensagemClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private mensagemClientService: MensagemClientService
  ) {
    super();
    this.acaoSistema = new AcaoSistema(route);


    this.produtos = route.snapshot.data.produto;






    if (this.acaoSistema.isAcaoIncluir()) {

      // Inicializa o Mensagem para Inclusão
      this.mensagem = {
      };
    }




    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {

      this.mensagem = route.snapshot.data.mensagem;

    }
  }







  /**
   * Salva a instância de Mensagem.
   *
   * @param mensagem
   * @param form
   * @param event
   */
  public salvar(mensagem: any, form: NgForm, event: any) {

    form.onSubmit(event);
    this.submittedMensagem = true;


    if (form.valid) {

      mensagem = {
        ...mensagem,
        tipo: mensagem.tipo,
        idProduto: mensagem.produto.id,
        nomeProduto: mensagem.produto.nome
      }

      console.log(mensagem);
      if(mensagem.quantidade<=mensagem.produto.quantidade || mensagem.tipo==5){
      this.mensagemClientService.salvar(mensagem).subscribe(() => {

          this.router.navigate(['/administracao/mensagem']);
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          this.messageService.addMsgDanger(error);
        });

  }

  else
  this.messageService.addMsgDanger("MSG048");
}

  }

  /**
   * Altera o status do Mensagem informado.
   *
   * @param mensagem

  public alterarStatusMensagem(produto: any): void {
    if (produto.produto) {
      this.tornarMensagem(produto);
    } else {
      this.deixarMensagem(produto);
    }
  }
**/
  /**


  /**
   * deixar de ser produto do cadastro
   *
   * @param produto

  private deixarMensagem(produto: any): void {
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
      this.router.navigateByUrl('/administracao/mensagem');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/mensagem');
      });
    }
  }

}
