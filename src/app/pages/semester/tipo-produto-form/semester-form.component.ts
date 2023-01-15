/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../shared/message/message.service';
import { AcaoSistema } from '../../../shared/component/acao-sistema.acao';
import { SecurityService } from '../../../shared/security/security.service';
import { SemesterClientService } from '../shared/tipo-amigo-client/tipo-produto-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './semester-form.component.html',
  styleUrls: ['./semester-form.component.scss']
})
export class SemesterFormComponent {

  public acaoSistema: AcaoSistema;

  public semester: any;
  public submitted: boolean;

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formSemester', { static: true }) formSemester: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param semesterClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private semesterClientService: SemesterClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.semester = {};
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.semester = route.snapshot.data.semester;

      this.semester = route.snapshot.data.semester;

      this.semester.initDate = new Date(this.semester.initDate)
      this.semester.finalDate = new Date(this.semester.finalDate)
    }
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param semester
   * @param form
   * @param event
   */
  public salvar(semester: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;

    if (form.valid) {
      this.semesterClientService.salvar(semester).subscribe(() => {
        this.router.navigate(['/administracao/semester']);
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
   * @param semester
   */
  private remover(semester: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.semesterClientService.remover(semester).subscribe(() => {
        this.router.navigate(['/administracao/semester']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        semester.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      semester.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/semester');
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/semester');
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
