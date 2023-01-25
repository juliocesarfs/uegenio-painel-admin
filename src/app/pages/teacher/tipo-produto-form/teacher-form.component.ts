/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../shared/message/message.service';
import { AcaoSistema } from '../../../shared/component/acao-sistema.acao';
import { SecurityService } from '../../../shared/security/security.service';
import { TeacherClientService } from '../shared/tipo-amigo-client/tipo-produto-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent {

  public acaoSistema: AcaoSistema;

  public teacher: any;
  public submitted: boolean;

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formTeacher', { static: true }) formTeacher: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param teacherClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private teacherClientService: TeacherClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.teacher = {};
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.teacher = route.snapshot.data.teacher;
    }
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param teacher
   * @param form
   * @param event
   */
  public salvar(teacher: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;

    if (form.valid) {
      this.teacherClientService.salvar(teacher).subscribe(() => {
        this.router.navigate(['/administracao/teacher']);
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
   * @param teacher
   */
  public remover(teacher: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.teacherClientService.remover(teacher).subscribe(() => {
        this.router.navigate(['/administracao/teacher']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        teacher.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      teacher.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/teacher');
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/teacher');
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
