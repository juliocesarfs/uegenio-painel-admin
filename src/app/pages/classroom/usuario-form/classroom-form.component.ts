import { TeachersClassroomsClientService } from '../../../shared/services/teachers-classrooms-client/teachers-classroom-client.service';

/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { MessageService } from "../../../shared/message/message.service";
import { AcaoSistema } from "../../../shared/component/acao-sistema.acao";
import { SecurityService } from "../../../shared/security/security.service";
import { ClassroomClientService } from "../shared/usuario-client/classroom-client.service";
import { TeacherClientService } from "../../teacher/shared/tipo-amigo-client/tipo-produto-client.service";
import { exit } from 'process';
import { isProtractorLocator } from 'protractor/built/locators';
import { AnimationStyleMetadata } from '@angular/animations';
import { SemesterClientService } from '../../semester/shared/semester-client/semester-client.service';
import { SubjectClientService } from '../../tipo-produto/shared/tipo-amigo-client/tipo-produto-client.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-classroom-form",
  templateUrl: "./classroom-form.component.html",
  styleUrls: ["./classroom-form.component.scss"],
})
export class ClassroomFormComponent {
  public acaoSistema: AcaoSistema;
  // public valorTotalClassroom: Number;
  public classroom: any;
  public teacherInclusao: any;
  public teachersVinculados: any[];
  public hourInclusao: any;
  public hoursVinculados: any[];
  public teachers: any[];
  public submittedClassroom: boolean;
  public submittedTeacher: boolean;
  public submittedSemester: boolean;
  public submittedHour: boolean;
  public Number?: String;
  public bool?: Boolean;
  public teste: string;

  public semesters: any[];
  public subjects: any[];
  public weekDays: any[];
  public hours: any[];


  public teachersClassrooms: any[];
  private dialogRef: MatDialogRef<any>;

  public dataSourceTeachers: MatTableDataSource<any>;
  public dataSourceHours: MatTableDataSource<any>;

  public displayedColumns: any;
  public displayedColumns2: any;

  @ViewChild("formClassroom", { static: true }) formClassroom: NgForm;
  @ViewChild("formTeacher", { static: true }) formTeacher: NgForm;
  @ViewChild("formHour", { static: true }) formHour: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param teacherClientService
   * @param classroomClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private teacherClientService: TeacherClientService,
    private classroomClientService: ClassroomClientService,
    public teachersClassroom: TeachersClassroomsClientService,
    public semesterClientService: SemesterClientService,
    public subjectsClientService: SubjectClientService,
    public http: HttpClient
  ) {

    this.teste = 'aoba';
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceTeachers = new MatTableDataSource<any>();
    this.dataSourceHours = new MatTableDataSource<any>();
    this.teachersClassrooms = route.snapshot.data.teachersClassrooms;
    //this.semesters = route.snapshot.data.semesters;
    //this.subjects = route.snapshot.data.subjects;

    this.weekDays = [
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira'
    ]

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ["nomeTeacherVinculado"];
      this.displayedColumns2 = ["initHourVinculado", "finalHourVinculado", "weekDayHourVinculado"]
    } else {
      this.displayedColumns = ["nomeTeacherVinculado", "remover"];
      this.displayedColumns2 = ["initHourVinculado", "finalHourVinculado", "weekDayHourVinculado", "remover"];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.teacherInclusao = {};
      this.teachersVinculados = [];
      this.hourInclusao = {};
      this.hoursVinculados = [];
      this.dataSourceTeachers.data = this.teachersVinculados;

      this.carregarTeachers();
      this.carregarSemesters();
      this.carregarSubjects();

      this.weekDays = [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira'
      ]

      // Inicializa o Usuário para Inclusão
      this.classroom = {
        teachersClassrooms: [],
        hours: []
      };


    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.teacherInclusao = {};
      this.hourInclusao = {};
      this.carregarTeachers();
      this.carregarSemesters();
      this.carregarSubjects();
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.classroom = route.snapshot.data.classroom;
      console.log(this.classroom);
      this.teachersVinculados = this.classroom.teachersClassrooms;
      this.dataSourceTeachers.data = this.teachersVinculados;

      this.hoursVinculados = this.classroom.hours;
      this.dataSourceHours.data = this.hoursVinculados;
    }
  }

  /**
   * Carrega os Teachers pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarTeachers(): void {
    this.teacherClientService.getTeachersAtivos().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        this.teachers = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    delete this.teacherInclusao.teacher;
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

  public carregarSubjects(): void {
    this.getSubjectsAtivos().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        this.subjects = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
  }

  public getSubjectsAtivos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/subject/ativos`);
  }


  /**
   * Adicionar o Teacher à lista de Teachers do Usuário.
   *
   * @param teacherInclusao
   * @param form
   * @param event
   */
  public adicionarTeacher(teacherInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedTeacher = true;

    if (form.valid) {
      // Busca o Teacher a ser adicionado na lista



      const teacherVinculado = this.teachersVinculados.find(
        (teacher) => teacher.idTeacher == teacherInclusao.teacher.id
      );


      // Verifica se o Teacher foi encontrado
      if (teacherVinculado === undefined) {
        this.teachersVinculados.push({
          idClassroom: this.classroom.id,
          idTeacher: teacherInclusao.teacher.id,
          nomeTeacher: teacherInclusao.teacher.nome,
        });

        this.dataSourceTeachers.data = this.teachersVinculados;


        form.onReset();
        this.teacherInclusao = {};

      }
    }
  }

  public adicionarHour(hourInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedHour = true;

    if (form.valid && hourInclusao.initHour != undefined && hourInclusao != undefined) {
      // Busca o Teacher a ser adicionado na lista

      const hourVinculado = this.hoursVinculados.find(
        (hour) => hour.initHour == hourInclusao.initHour && hour.finalHour == hourInclusao.finalHour && hour.weekDay == hourInclusao.weekDay
      );

      console.log(hourVinculado)

      if (hourInclusao.initHour > hourInclusao.finalHour) {
        this.messageService.addMsgSuccess("MSG070");
      } else if (hourVinculado === undefined) {
        this.hoursVinculados.push({
          idClassroom: this.classroom.id,
          initHour: hourInclusao.initHour,
          finalHour: hourInclusao.finalHour,
          weekDay: hourInclusao.weekDay,
        });

        this.dataSourceHours.data = this.hoursVinculados;

        console.log('HOURS VINCULADOS')
        console.log(this.hoursVinculados);

        form.onReset();
        this.hourInclusao = {};
      }

    }
  }

  /**
   * Remove o Teacher da lista de teachers do Usuário.
   *
   * @param teacher
   *
   * Alterei com adição do service, html
   */
  public removerTeacher(teacher: any, classroom: any) {

    this.messageService.addConfirmYesNo("MSG006", () => {

      const index = this.teachersVinculados.indexOf(teacher);
      this.teachersVinculados.splice(index, 1);
      this.dataSourceTeachers.data = this.teachersVinculados;
      this.classroomClientService.alterarTeacher(classroom).subscribe(
        () => {

          this.messageService.addMsgSuccess("MSG007");
        },
        (error) => {
          this.messageService.addMsgDanger(error);
        }
      );




    });



  }

  public removerHour(hour: any, classroom: any) {

    this.messageService.addConfirmYesNo("MSG006", () => {

      const index = this.hoursVinculados.indexOf(hour);
      this.hoursVinculados.splice(index, 1);
      this.dataSourceHours.data = this.hoursVinculados;
      this.classroomClientService.alterarHour(classroom).subscribe(
        () => {

          this.messageService.addMsgSuccess("MSG007");
        },
        (error) => {
          this.messageService.addMsgDanger(error);
        }
      );




    });



  }

  /**
   * Salva a instância de Usuário.
   *
   * @param classroom
   * @param form
   * @param event
   */
  public salvar(classroom: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedClassroom = true;


    if (form.valid && classroom.idSemester != undefined && classroom.idSubject != undefined) {
      if (this.teachersVinculados.length > 0 && this.hoursVinculados.length > 0) {

        classroom.hours = this.hoursVinculados
        classroom.teachersClassrooms = this.teachersVinculados;
        classroom.local = 'Sala 201'
        console.log("Classroom Envio", classroom);


        this.classroomClientService.salvar(classroom).subscribe(
          () => {
            this.router.navigate(["/administracao/classroom"]);
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            this.messageService.addMsgDanger(error);
          }
        );
      } else {
        this.messageService.addMsgSuccess("MSG039");
      }
    } else {
      this.messageService.addMsgSuccess("MSG001");
    }
  }





  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl("/administracao/classroom");
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo("MSG010", () => {
        this.router.navigateByUrl("/administracao/classroom");
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
