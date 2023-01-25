/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../shared/message/message.service';
import { AcaoSistema } from '../../../shared/component/acao-sistema.acao';
import { SecurityService } from '../../../shared/security/security.service';
import { HolidayClientService } from '../shared/tipo-amigo-client/tipo-produto-client.service';
import { SemesterClientService } from '../../semester/shared/semester-client/semester-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent {

  public acaoSistema: AcaoSistema;

  public holiday: any;
  public submitted: boolean;
  public semesters: any[];

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formHoliday', { static: true }) formHoliday: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param holidayClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private holidayClientService: HolidayClientService,
    private semesterClientService: SemesterClientService,
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.holiday = {};


    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.holiday = route.snapshot.data.holiday;

      this.holiday.initDate = new Date(this.holiday.initDate)
      this.holiday.finalDate = new Date(this.holiday.finalDate)

      //this.holiday.initDate.setDate(this.holiday.initDate.getDate() + 1)
      //this.holiday.finalDate.setDate(this.holiday.finalDate.getDate() + 1)


    }

    this.carregarSemesters();
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param holiday
   * @param form
   * @param event
   */
  public salvar(holiday: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;


    holiday.initDate = this.getUTCDate(holiday.initDate);
    holiday.finalDate = this.getUTCDate(holiday.finalDate);
    console.log(holiday)


    if (form.valid) {

      if (holiday.initDate.getTime() > holiday.finalDate.getTime()) {
        this.messageService.addMsgSuccess('MSG071');
      } else {
        this.holidayClientService.salvar(holiday).subscribe(() => {
          this.router.navigate(['/administracao/holiday']);
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          this.messageService.addMsgDanger(error);
        });
      }


    } else {
      this.messageService.addMsgSuccess('MSG001');
    }
  }

  getUTCDate = (date) => {
    const d = new Date(date);
    console.log(d, d.getUTCMonth(), d.getUTCDate());
    const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return utcDate;
  }

  /**
   * Remover o Tipo de Produto informado.
   *
   * @param holiday
   */
  public remover(holiday: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.holidayClientService.remover(holiday).subscribe(() => {
        this.router.navigate(['/administracao/holiday']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        holiday.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      holiday.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/holiday');
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/holiday');
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }

  public carregarSemesters(): void {
    this.semesterClientService.getSemestersAtivos().subscribe(
      (data) => {
        this.semesters = data;
      },
      (error) => {
        this.semesters = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
  }
}
