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
import { FiltroVendaDTO } from 'src/app/shared/dto/filtro-venda.dto';
import { VendaClientService } from '../shared/venda-client/venda-client.service';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroVendaDTO;

  public dataSource: MatTableDataSource<any>;

  public statusEsperas:any[];

  public dataVenda: Date = null;

  public clientes: any[];

  public bool:boolean=true;

  public displayedColumns = ['valorTotal', 'dataVenda', 'quantidade','statusEspera','statusVendido', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param vendaClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private vendaClientService: VendaClientService
  ) {
    super();
    const vendas = route.snapshot.data.vendas;
    this.dataSource = new MatTableDataSource<any>(vendas);
    this.clientes= route.snapshot.data.clientes;

    console.log(vendas)

  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroVendaDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Venda conforme o filtro de pesquisa informado.
   *
   * @param filtroVendaDTO
   */
  public pesquisar(filtroVendaDTO: FiltroVendaDTO): void {
    if (this.dataVenda != null) {
      this.filtroDTO.dataVenda = formatDate(this.dataVenda, 'yyyy/MM/dd', 'pt-br');
    }
    this.vendaClientService.getByFiltro(filtroVendaDTO).subscribe(data => {
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
    this.filtroDTO = FiltroVendaDTO.getInstace();
    this.dataSource.data = [];
  }




  public alterarStatusVendaEspera(venda: any): void {
    console.log('alterastatus:', venda);

    if (venda.statusEspera) {
      this.tornarVendaEspera(venda);
    } else {
      this.deixarVendaEspera(venda);
    }
  }

  /**
   * Tornar Venda o Venda informado.
   *
   * @param venda
   */
  private tornarVendaEspera(venda: any): void {
    this.messageService.addConfirmYesNo('MSG046', () => {

      this.vendaClientService.tornarVendaEspera(venda.id).subscribe(() => {
        //this.pesquisar(this.filtroDTO);
          //this.deixarVendaEspera(venda);
          window.location.reload();


        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.statusEspera = false;
        this.messageService.addMsgDanger(error);
      });

      if(venda.StatusVendido){
        this.vendaClientService.deixarVendido(venda.id).subscribe(() => {
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          venda.status = true;
          this.messageService.addMsgDanger(error);
        });}

    }, () => {
      venda.statusEspera = false;

    });
  }




  private deixarVendaEspera(venda: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.vendaClientService.deixarVendaEspera(venda.id).subscribe(() => {
        //this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.statusEspera = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.statusEspera = true;
    });
  }




  public alterarStatusVendido(venda: any): void {
    console.log('alterastatus:', venda);
    if (venda.statusVendido) {
      this.tornarVendido(venda);

      //window.location.reload();
    } else {
      this.deixarVendido(venda);
    }
  }

  /**
   * Tornar Venda o Venda informado.
   *
   * @param venda
   */
  private tornarVendido(venda: any): void {
    this.messageService.addConfirmYesNo('MSG062', () => {
      this.bool=false;
      this.vendaClientService.tornarVendido(venda.id).subscribe(() => {

          this.filtroDTO.statusVendido = this.filtroDTO.statusVendido ? this.filtroDTO.statusVendido : true;
          this.pesquisar(this.filtroDTO);
         // window.location.reload();




        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.statusVendido = false;
        this.messageService.addMsgDanger(error);
      });

      if(venda.StatusEspera){
        this.vendaClientService.deixarVendaEspera(venda.id).subscribe(() => {
          this.messageService.addMsgSuccess('MSG007');
        }, error => {
          venda.status = true;
          this.messageService.addMsgDanger(error);
        });}
    }, () => {
      venda.statusVendido = false;
    });
  }




  private deixarVendido(venda: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.vendaClientService.deixarVendido(venda.id).subscribe(() => {
       // this.pesquisar(this.filtroDTO);

        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.statusVendido = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.statusVendido = true;
    });
  }

  /**
   * remover o Venda informado.
   *
   * @param venda
   */
  private remover(venda: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.vendaClientService.remover(venda).subscribe(() => {
        this.filtroDTO.statusVendido = this.filtroDTO.statusVendido ? this.filtroDTO.statusVendido : true;
          this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.status = false;
    });
  }
}
