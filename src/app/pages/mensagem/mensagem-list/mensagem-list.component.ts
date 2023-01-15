import { StatusEspera, StatusVendido } from './../../../shared/app.constantes';
/* tslint:disable:no-redundant-jsdoc */
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';

import {MessageService} from 'src/app/shared/message/message.service';
import {SecurityService} from 'src/app/shared/security/security.service';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {formatDate} from '@angular/common';
import { FiltroMensagemDTO } from 'src/app/shared/dto/filtro-mensagem.dto';

import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { MensagemClientService } from '../shared/mensagem-client.service';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './mensagem-list.component.html',
  styleUrls: ['./mensagem-list.component.scss']
})
export class MensagemListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroMensagemDTO;

  public m: any[];

  public dataSource: MatTableDataSource<any>;

  public dataAlteracao: Date = null;

  public produtos: any[];

  public bool:boolean=true;

  public displayedColumns = [ 'descricao','quantidade','nomeProduto','dataAlteracao', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param mensagemClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private mensagemClientService: MensagemClientService
  ) {
    super();
    this.m = route.snapshot.data.mensagem;
    let m= route.snapshot.data.mensagem1;
    console.log(m);
    this.dataSource = new MatTableDataSource<any>(m);
    this.produtos= route.snapshot.data.produtos;
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroMensagemDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Mensagem conforme o filtro de pesquisa informado.
   *
   * @param filtroMensagemDTO
   */
  public pesquisar(filtroMensagemDTO: FiltroMensagemDTO): void {
    if (this.dataAlteracao != null) {
      this.filtroDTO.dataAlteracao = formatDate(this.dataAlteracao, 'yyyy/MM/dd', 'pt-br');
    }
    this.mensagemClientService.getByFiltro(filtroMensagemDTO).subscribe(data => {
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
    this.filtroDTO = FiltroMensagemDTO.getInstace();
    this.dataSource.data = [];
  }






  /**
   * remover o Mensagem informado.
   *
   * @param mensagem
   */
  private remover(mensagem: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.mensagemClientService.remover(mensagem).subscribe(() => {
        this.filtroDTO.dataAlteracao = this.filtroDTO.dataAlteracao ? this.filtroDTO.dataAlteracao : '%';
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        mensagem.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      mensagem.status = false;
    });
  }
}
