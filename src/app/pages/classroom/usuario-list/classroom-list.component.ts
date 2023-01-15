/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild } from "@angular/core";

import { MessageService } from "src/app/shared/message/message.service";
import { FiltroClassroomDTO } from "../../../shared/dto/filtro-classroom.dto";
import { SecurityService } from "src/app/shared/security/security.service";
import { AbstractComponent } from "../../../shared/component/Abstract.component";
import { ClassroomClientService } from "../shared/usuario-client/classroom-client.service";

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-classroom-list",
  templateUrl: "./classroom-list.component.html",
  styleUrls: ["./classroom-list-component.scss"],
})
export class ClassroomListComponent extends AbstractComponent implements OnInit {
  public filtroDTO: FiltroClassroomDTO;

  public dataSource: MatTableDataSource<any>;

  public tiposCadastro: any[];

  public displayedColumns = [
    "cpf",
    "nome",
    "email",
    "ultimoAcesso",
    "statusPortal",
    "acoes",
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param classroomClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private classroomClientService: ClassroomClientService
  ) {
    super();
    const classrooms = route.snapshot.data.classrooms;
    this.tiposCadastro = route.snapshot.data.tiposCadastro;
    this.dataSource = new MatTableDataSource<any>(classrooms);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroClassroomDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Usuário conforme o filtro de pesquisa informado.
   *
   * @param filtroClassroomDTO
   */
  public pesquisar(filtroClassroomDTO: FiltroClassroomDTO): void {
    console.log(filtroClassroomDTO.email);
    this.classroomClientService.getByFiltro(filtroClassroomDTO).subscribe(
      (data) => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data;
      },
      (data) => {
        this.messageService.addMsgDanger(data);
        this.dataSource.data = [];
      }
    );
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroClassroomDTO.getInstace();
    this.dataSource.data = [];
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
            this.pesquisar(this.filtroDTO);
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
            this.pesquisar(this.filtroDTO);
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
}
