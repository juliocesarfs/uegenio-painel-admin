import { ProdutoListResolve } from './../../produto/shared/produto-client/produto-list.resolve';
import { StatusEspera } from './../../../shared/app.constantes';
import { ClienteClientService } from './../../cliente/shared/cliente-client/cliente-client.service';
import { ItemVendaClientService } from './../../../shared/services/item-venda-client/item-venda-client.service';

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
  templateUrl: "./venda-form.component1.html",
  styleUrls: ["./venda-form.component.scss"],
})
export class VendaFormComponent {
  public acaoSistema: AcaoSistema;
  public valorTotalVenda: Number;
  public venda: any;
  public telefonesVenda: any[];
  public produtoInclusao: any;
  public produtosVinculados: any[];
  public produtos: any[];
  public submittedVenda: boolean;
  public submittedProduto: boolean;
  public valorVenda?: Number;
  public QuantidaParaAlteração?:Number;
  public Number?:String;
  public bool?: Boolean;
  public teste: string;

  public clientes: any[];

  public itemVendas:any[];
  private dialogRef: MatDialogRef<any>;

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

    this.teste = 'aoba';
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceProdutos = new MatTableDataSource<any>();
    this.itemVendas=route.snapshot.data.itemVendas;
    this.clientes = route.snapshot.data.clientes;


    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ["nomeProdutoVinculado","valorProduto","quantidade"];
    } else {
      this.displayedColumns = ["nomeProdutoVinculado", "valorProduto","quantidade", "remover"];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.produtoInclusao = {};
      this.produtosVinculados = [];
      this.dataSourceProdutos.data = this.produtosVinculados;

      this.carregarProdutos();

      // Inicializa o Usuário para Inclusão
      this.venda = {
        itemVendas:[],
        valorTotal: 0
      };


    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.produtoInclusao = {};
      this.carregarProdutos();
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.venda = route.snapshot.data.venda;
      this.produtosVinculados = this.venda.itemVenda;
      this.dataSourceProdutos.data = this.produtosVinculados;
    }
  }

  /**
   * Carrega os Produtos pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarProdutos(): void {
    this.produtoClientService.getProdutosAtivos().subscribe(
      (data) => {
        this.produtos = data;
      },
      (error) => {
        this.produtos = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    delete this.produtoInclusao.produto;
  }

  /**
   * Adicionar o Produto à lista de Produtos do Usuário.
   *
   * @param produtoInclusao
   * @param form
   * @param event
   */
  public adicionarProduto(produtoInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedProduto = true;

    if (form.valid) {
      // Busca o Produto a ser adicionado na lista
      const produtoVinculado = this.produtosVinculados.find(
        (produto) => produto.idProduto === produtoInclusao.produto.id
      );




      // Verifica se o Produto foi encontrado
      if (produtoVinculado === undefined && this.itemVendas<=produtoInclusao.produto.quantidade) {
        this.produtosVinculados.push({



          idVenda: this.venda.id,
          idProduto: produtoInclusao.produto.id,
          preco: produtoInclusao.produto.preco,
          nomeProduto: produtoInclusao.produto.nome,
          quantidadeVendida: this.itemVendas,
          valorTotal:this.venda.valorTotal,
          nomeSistemaProduto: produtoInclusao.produto.nomeSistema,

        });

          this.dataSourceProdutos.data = this.produtosVinculados;

          this.venda.valorTotal += Number(produtoInclusao.produto.preco) * Number(this.itemVendas);

           form.onReset();
           this.produtoInclusao = {};




      } else {
        if(this.itemVendas<=produtoInclusao.produto.quantidade)
        this.messageService.addMsgDanger("MSG063");

        if(this.itemVendas>produtoInclusao.produto.quantidade)
        this.messageService.addMsgDanger("MSG048");
      }
    }
  }

  /**
   * Remove o Produto da lista de produtos do Usuário.
   *
   * @param produto
   *
   * Alterei com adição do service, html
   */
  public removerProduto(produto: any, venda:any ) {

      this.messageService.addConfirmYesNo("MSG006", () => {

      const index = this.produtosVinculados.indexOf(produto);
      this.produtosVinculados.splice(index, 1);
      this.dataSourceProdutos.data = this.produtosVinculados;
      this.vendaClientService.alterarProduto(venda).subscribe(
        () => {

          this.messageService.addMsgSuccess("MSG007");
        },
        (error) => {
          this.messageService.addMsgDanger(error);
        }
      );


      this.venda.valorTotal -= Number(produto.quantidadeVendida) * Number(produto.preco)


    });



  }

  /**
   * Salva a instância de Usuário.
   *
   * @param venda
   * @param form
   * @param event
   */
  public salvar(venda: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedVenda = true;


    if (form.valid) {
      if (this.produtosVinculados.length > 0) {

        venda.itemVenda = this.produtosVinculados;
       console.log("Venda Envio",venda);


        this.vendaClientService.salvar(venda).subscribe(
          () => {
            this.router.navigate(["/administracao/venda"]);
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
      this.router.navigateByUrl("/administracao/venda");
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo("MSG010", () => {
        this.router.navigateByUrl("/administracao/venda");
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
   * Altera o status do Amigo informado.
   *
   * @param venda
   */
   public alterarStatusVendido(venda: any): void {
    if (venda.statusVendido) {
      this.tornarVendido(venda);

    } else {
      this.deixarVendido(venda);
    }
  }

  /**
   * Torna o cadastro um Amigo.
   *
   * @param amigo
   */
  private tornarVendido(venda: any): void {
    this.messageService.addConfirmYesNo('MSG062', () => {
      this.vendaClientService.tornarVendido(venda.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = false;
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
      venda.status = false;
    });
  }

  /**
   * deixar de ser amigo do cadastro
   *
   * @param amigo
   */
  private deixarVendido(venda: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.vendaClientService.deixarVendido(venda.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = true;
        this.messageService.addMsgDanger(error);
      });


    }, () => {
      venda.status = true;
    });
  }



  /**
   * Altera o status do Amigo informado.
   *
   * @param venda
   */
   public alterarStatusEspera(venda: any): void {
    if (venda.statusEspera) {
      this.tornarEspera(venda);
    } else {
      this.deixarEspera(venda);
    }
  }

  /**
   * Torna o cadastro um Amigo.
   *
   * @param amigo
   */
  private tornarEspera(venda: any): void {
    this.messageService.addConfirmYesNo('MSG061', () => {
      this.vendaClientService.tornarVendaEspera(venda.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = false;
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
      venda.status = false;
    });
  }

  /**
   * deixar de ser amigo do cadastro
   *
   * @param amigo
   */
  private deixarEspera(venda: any): void {
    this.messageService.addConfirmYesNo('MSG060', () => {
      this.vendaClientService.deixarVendaEspera(venda.id).subscribe(() => {
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.status = true;
    });
  }


}
