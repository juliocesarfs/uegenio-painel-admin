/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../shared/message/message.service';
import { AcaoSistema } from '../../../shared/component/acao-sistema.acao';
import { SecurityService } from '../../../shared/security/security.service';
import { SubjectClientService } from '../shared/tipo-amigo-client/tipo-produto-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent {

  public acaoSistema: AcaoSistema;

  public subject: any;
  public submitted: boolean;

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formSubject', { static: true }) formSubject: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param subjectClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private subjectClientService: SubjectClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.subject = {};
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.subject = route.snapshot.data.subject;
    }
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param subject
   * @param form
   * @param event
   */
  public salvar(subject: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;

    if (form.valid) {
      this.subjectClientService.salvar(subject).subscribe(() => {
        this.router.navigate(['/administracao/subject']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    } else {
      this.messageService.addMsgSuccess('MSG001');
    }
  }

  /**
   * Remover o Tipo de Produto informado.
   *
   * @param subject
   */
  public remover(subject: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.subjectClientService.remover(subject).subscribe(() => {
        this.router.navigate(['/administracao/subject']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        subject.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      subject.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/subject');
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/subject');
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }
}
