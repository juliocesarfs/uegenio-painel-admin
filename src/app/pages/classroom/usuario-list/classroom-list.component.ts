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
    "local",
    "subject",
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
    console.log(filtroClassroomDTO);
    this.classroomClientService.getByFiltro(filtroClassroomDTO).subscribe(
      (data) => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data;
        console.log('dados do back', data);
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



}
