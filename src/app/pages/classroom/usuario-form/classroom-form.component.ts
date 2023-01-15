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
import { GrupoClientService } from "../../grupo/shared/grupo-client/grupo-client.service";
import { SubjectClientService } from "../../tipo-produto/shared/tipo-amigo-client/tipo-produto-client.service";
import { SemesterClientService } from "../../semester/shared/tipo-amigo-client/tipo-produto-client.service";
import { TeacherClientService } from "../../teacher/shared/tipo-amigo-client/tipo-produto-client.service";

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

  public classroom: any;
  public telefonesClassroom: any[];
  public teacherInclusao: any;
  public teachersVinculados: any[];
  public subjects: any[];
  public semesters: any[];
  public teachers: any[];
  public submittedClassroom: boolean;
  public submittedGrupo: boolean;

  private dialogRef: MatDialogRef<any>;

  public dataSourceTeachers: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild("formClassroom", { static: true }) formClassroom: NgForm;
  @ViewChild("formGrupo", { static: true }) formGrupo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param grupoClientService
   * @param classroomClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private subjectClientService: SubjectClientService,
    private semesterClientService: SemesterClientService,
    private teacherClientService: TeacherClientService,
    private classroomClientService: ClassroomClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceTeachers = new MatTableDataSource<any>();

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ["nomeTeacherVinculado"];
    } else {
      this.displayedColumns = ["nomeTeacherVinculado", "remover"];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.teacherInclusao = {};
      this.teachersVinculados = [];
      this.dataSourceTeachers.data = this.teachersVinculados;
      this.carregarTeachers();
      this.carregarSubjects();
      this.carregarSemestres();

      // Inicializa o Usuário para Inclusão
      this.classroom = {
        teachersClassrooms: [],
        idSemester: null,
        idSubject: null,
        nomeSubject: null,
        idTeacher: [],
        local: 'Sala 201'
      };
    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.teacherInclusao = {};
      this.carregarSubjects();
      this.carregarSemestres();
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.classroom = route.snapshot.data.classroom;
      this.telefonesClassroom = this.classroom.telefones;
      this.teachersVinculados = this.classroom.teachers;
      this.dataSourceTeachers.data = this.teachersVinculados;
    }
  }

  /**
   * Carrega os Grupos pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarSubjects(): void {
    this.subjectClientService.getAll().subscribe(
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

  public carregarSemestres(): void {
    this.semesterClientService.getAll().subscribe(
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

  public carregarTeachers(): void {
    this.teacherClientService.getAll().subscribe(
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
  }

  /**
   * Adicionar o Grupo à lista de Grupos do Usuário.
   *
   * @param grupoInclusao
   * @param form
   * @param event
   */
  public adicionarTeacher(teacherInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedGrupo = true;

    if (form.valid) {
      // Busca o Grupo a ser adicionado na lista
      const teacherVinculado = this.teachersVinculados.find(
        (teacher) => teacher.idTeacher === teacherInclusao.teacher.id
      );

      // Verifica se o Grupo foi encontrado
      if (teacherVinculado === undefined) {
        this.teachersVinculados.push({
          idClassroom: this.classroom.id,
          idTeacher: teacherInclusao.teacher.id,
          nome: teacherInclusao.teacher.nome,
          email: teacherInclusao.teacher.email
        });
        this.dataSourceTeachers.data = this.teachersVinculados;

        console.log(this.dataSourceTeachers.data);
        form.onReset();
        this.teacherInclusao = {};
      } else {
        this.messageService.addMsgDanger("MSG011");
      }
    }
  }

  /**
   * Remove o Grupo da lista de grupos do Usuário.
   *
   * @param grupo
   */
  public removerTeacher(grupo: any) {
    this.messageService.addConfirmYesNo("MSG006", () => {
      const index = this.teachersVinculados.indexOf(grupo);
      this.teachersVinculados.splice(index, 1);
      this.dataSourceTeachers.data = this.teachersVinculados;
      this.messageService.addMsgSuccess("MSG007");
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

    if (form.valid) {
      if (this.teachersVinculados.length > 0) {
        classroom.teachersClassrooms = this.teachersVinculados;
        // classroom.telefones = this.telefonesClassroom;


        classroom.idSemester = classroom.semester.id
        classroom.nomeSubject = classroom.subject.nome
        classroom.idSubject = classroom.subject.id

        for (let teacher of this.teachersVinculados) {
          classroom.idTeacher.push(teacher.idTeacher)
        }

        console.log(classroom);




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
   * Atualiza o Tipo de Usuário.
   *
   * @param event
   */
  public atualizarTipoClassroom(event: any): void {
    this.classroom.tipo = event.value;
  }

  /**
   * Altera o status do Usuário informado.
   *
   * @param classroom
   */
  public alterarStatusClassroom(classroom: any): void {
    if (!classroom.status) {
      this.inativar(classroom);
    } else {
      this.ativar(classroom);
    }
  }

  /**
   * Ativa o Usuário informado.
   *
   * @param classroom
   */
  private ativar(classroom: any): void {
    this.messageService.addConfirmYesNo(
      "MSG034",
      () => {
        this.classroomClientService.ativar(classroom.id).subscribe(
          () => {
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            classroom.status = false;
            this.messageService.addMsgDanger(error);
          }
        );
      },
      () => {
        classroom.status = false;
      }
    );
  }

  /**
   * Inativa o Usuário informado.
   *
   * @param classroom
   */
  private inativar(classroom: any): void {
    this.messageService.addConfirmYesNo(
      "MSG033",
      () => {
        this.classroomClientService.inativar(classroom.id).subscribe(
          () => {
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            classroom.status = true;
            this.messageService.addMsgDanger(error);
          }
        );
      },
      () => {
        classroom.status = true;
      }
    );
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

  /**
   * Verifica se o CPF informado é válido.
   */
  public validarCpf(): void {
    if (this.classroom.cpf === undefined || this.classroom.cpf.length !== 11) {
      delete this.classroom.cpf;
    } else {
      // Verifica se o CPF informado é válido e se está em uso
      this.classroomClientService
        .validarCpf(this.classroom.cpf, this.classroom.id)
        .subscribe(
          () => { },
          (error) => {
            delete this.classroom.cpf;
            this.messageService.addMsgDanger(error);
          }
        );
    }
  }
}
