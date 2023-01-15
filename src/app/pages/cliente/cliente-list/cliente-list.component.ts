/* tslint:disable:no-redundant-jsdoc */
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild } from "@angular/core";

import { MessageService } from "src/app/shared/message/message.service";
import { SecurityService } from "src/app/shared/security/security.service";
import { AbstractComponent } from "../../../shared/component/Abstract.component";
import { formatDate } from "@angular/common";
import { FiltroClienteDTO } from "src/app/shared/dto/filtro-cliente.dto";
import { ClienteClientService } from "./../../cliente/shared/cliente-client/cliente-client.service";

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-usuario-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list-component.scss"],
})
export class ClienteListComponent extends AbstractComponent implements OnInit {
  public filtroDTO: FiltroClienteDTO;

  public dataSource: MatTableDataSource<any>;

  public tipoClientes: any[];

  public dataCadastro: Date = null;

  public displayedColumns = [
    "nome",
    "telefone",
    "email",
    "acoes",
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param clienteClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private clienteClientService: ClienteClientService
  ) {
    super();
    const clientes = route.snapshot.data.clientes;
    this.tipoClientes = route.snapshot.data.tipoClientes;
    this.dataSource = new MatTableDataSource<any>(clientes);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroClienteDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Cliente conforme o filtro de pesquisa informado.
   *
   * @param filtroClienteDTO
   */
  public pesquisar(filtroClienteDTO: FiltroClienteDTO): void {
    if (this.dataCadastro != null) {
      this.filtroDTO.dataCadastro = formatDate(
        this.dataCadastro,
        "yyyy/MM/dd",
        "pt-br"
      );
    }
    this.clienteClientService.getByFiltro(filtroClienteDTO).subscribe(
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
    this.filtroDTO = FiltroClienteDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Altera o status do Cliente informado.
   *
   * @param cliente

  public alterarStatusCliente(cliente: any): void {
    console.log('alterastatus:', cliente);
    if (cliente.cliente) {
      this.tornarCliente(cliente);
    } else {
      this.deixarCliente(cliente);
    }
  }
*/
  /**
   * Tornar Cliente o Cliente informado.
   *
   * @param cliente
   */
  private tornarCliente(cliente: any): void {
    this.messageService.addConfirmYesNo(
      "MSG046",
      () => {
        this.clienteClientService.tornarCliente(cliente.id).subscribe(
          () => {
            this.pesquisar(this.filtroDTO);
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            cliente.cliente = false;
            this.messageService.addMsgDanger(error);
          }
        );
      },
      () => {
        cliente.cliente = false;
      }
    );
  }

  /**
   * Deixar de ser Cliente do cadastro informado.
   *
   * @param cliente

  private deixarCliente(cliente: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.clienteClientService.deixarAmizade(cliente.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        cliente.cliente = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      cliente.cliente = true;
    });
  }
*/
  /**
   * remover o Cliente informado.
   *
   * @param cliente
   */
  private remover(cliente: any): void {
    this.messageService.addConfirmYesNo(
      "MSG045",
      () => {
        this.clienteClientService.remover(cliente).subscribe(
          () => {
            this.filtroDTO.nome = this.filtroDTO.nome
              ? this.filtroDTO.nome
              : "%";
            this.pesquisar(this.filtroDTO);
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            cliente.status = false;
            this.messageService.addMsgDanger(error);
          }
        );
      },
      () => {
        cliente.status = false;
      }
    );
  }
}
