import { ClienteClientService } from "./../../cliente/shared/cliente-client/cliente-client.service";
/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "../../../shared/message/message.service";
import { AcaoSistema } from "../../../shared/component/acao-sistema.acao";
import { SecurityService } from "../../../shared/security/security.service";

/**
 * Componente de formulário de Cliente.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-cliente-form",
  templateUrl: "./cliente-form.component.html",
  styleUrls: ["./cliente-form.component.scss"],
})
export class ClienteFormComponent {
  public acaoSistema: AcaoSistema;

  public cliente: any;
  public submittedCliente: boolean;

  public dataSourceGrupos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild("formCliente", { static: true }) formCliente: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param clienteClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private clienteClientService: ClienteClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceGrupos = new MatTableDataSource<any>();

    if (this.acaoSistema.isAcaoIncluir()) {
      // Inicializa o Cliente para Inclusão
      this.cliente = {};
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.cliente = route.snapshot.data.cliente;
      console.log(this.cliente);
    }
  }

  /**
   * Salva a instância de Cliente.
   *
   * @param cliente
   * @param form
   * @param event
   */
  public salvar(cliente: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedCliente = true;

    if (form.valid) {
      this.clienteClientService.salvar(cliente).subscribe(
        () => {
          this.router.navigate(["/administracao/cliente"]);
          this.messageService.addMsgSuccess("MSG007");
        },
        (error) => {
          this.messageService.addMsgDanger(error);
        }
      );
    }
  }

  /**
   * Altera o status do Cliente informado.
   *
   * @param cliente

  public alterarStatusCliente(cliente: any): void {
    if (cliente.cliente) {
      this.tornarCliente(cliente);
    } else {
      this.deixarCliente(cliente);
    }
  }
**/
  /**
   * Torna o cadastro um Cliente.
   *
   * @param cliente
   */
  private tornarCliente(cliente: any): void {
    this.messageService.addConfirmYesNo(
      "MSG046",
      () => {
        this.clienteClientService.tornarCliente(cliente.id).subscribe(
          () => {
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

  /**
   * deixar de ser cliente do cadastro
   *
   * @param cliente

  private deixarCliente(cliente: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.clienteClientService.deixarAmizade(cliente.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        cliente.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      cliente.status = true;
    });
  }
**/
  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl("/administracao/cliente");
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo("MSG010", () => {
        this.router.navigateByUrl("/administracao/cliente");
      });
    }
  }
}
