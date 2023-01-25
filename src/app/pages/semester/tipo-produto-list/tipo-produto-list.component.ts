/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'src/app/shared/message/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { AbstractComponent } from '../../../shared/component/Abstract.component';

import { FiltroSemesterDTO } from '../../../shared/dto/filtro-semester.dto';
import { SemesterClientService } from '../shared/semester-client/semester-client.service';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-tipoproduto-list',
  templateUrl: './tipo-produto-list.component.html',
  styleUrls: ['./tipo-produto-list-component.scss']
})
export class SemesterListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroSemesterDTO;

  public dataSource: MatTableDataSource<any>;

  public displayedColumns = ['nome', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param semesterClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private semesterClientService: SemesterClientService
  ) {
    super();
    const tipoprodutos = route.snapshot.data.tipoprodutos;
    this.dataSource = new MatTableDataSource<any>(tipoprodutos);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroSemesterDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Tipo Produto conforme o filtro de pesquisa informado.
   *
   * @param filtroSemesterDTO
   */
  public pesquisar(filtroSemesterDTO: FiltroSemesterDTO): void {
    this.semesterClientService.getByFiltro(filtroSemesterDTO).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    }, data => {
      this.messageService.addMsgDanger(data);
      this.dataSource.data = [];
    });
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroSemesterDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Ativa o Usuário informado.
   *
   * @param usuario
   */
  public remover(usuario: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.semesterClientService.remover(usuario).subscribe(() => {
        this.filtroDTO.nome = this.filtroDTO.nome ? this.filtroDTO.nome : '%';
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        usuario.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = false;
    });
  }

}
