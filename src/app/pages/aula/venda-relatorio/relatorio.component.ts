import { ProdutoListResolve } from '../../produto/shared/produto-client/produto-list.resolve';
import { StatusEspera } from '../../../shared/app.constantes';
import { ClienteClientService } from '../../cliente/shared/cliente-client/cliente-client.service';
import { ItemVendaClientService } from '../../../shared/services/item-venda-client/item-venda-client.service';

/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { MessageService } from "../../../shared/message/message.service";
import { AcaoSistema } from "../../../shared/component/acao-sistema.acao";
import { SecurityService } from "../../../shared/security/security.service";
import { VendaClientService } from "../shared/venda-client/venda-client.service";
import { ProdutoClientService } from "../../produto/shared/produto-client/produto-client.service";
import { exit } from 'process';
import { isProtractorLocator } from 'protractor/built/locators';
import { AnimationStyleMetadata } from '@angular/animations';


/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-venda-form",
  templateUrl: "./relatorio.component.html",
  styleUrls: ["./relatorio.component.scss"],
})
export class RelatorioVendaComponent {


  public dataSourceProdutos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild("formVenda", { static: true }) formVenda: NgForm;
  @ViewChild("formProduto", { static: true }) formProduto: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param produtoClientService
   * @param vendaClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private produtoClientService: ProdutoClientService,
    private vendaClientService: VendaClientService,
    public itemVenda: ItemVendaClientService
  ) {


  }

  /**
   * Carrega os Produtos pelo id do Sistema.
   *
   * @param idSistema
   */


}
