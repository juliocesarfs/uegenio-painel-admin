import { StatusEspera, StatusVendido } from './../app.constantes';

import {
  FX_FLEX_GT_XS,
  FX_FLEX_GT_SM,
  FX_FLEX_GT_MD,
  FX_FLEX_GT_LG,
  FX_FLEX_XL,
  PAGINATOR_PAGE_SIZE,
  StatusAtivoInativo, TipoUsuario, TipoTelefone, TipoRevisao, StatusSimNao, TipoRetirada
} from '../app.constantes';

/**
 * Classe abastrada para conter as principais constantes necessárias
 * aos componentes.
 */
export class AbstractComponent {
  public FX_FLEX_GT_XS = FX_FLEX_GT_XS;
  public FX_FLEX_GT_SM = FX_FLEX_GT_SM;
  public FX_FLEX_GT_MD = FX_FLEX_GT_MD;
  public FX_FLEX_GT_LG = FX_FLEX_GT_LG;
  public FX_FLEX_XL = FX_FLEX_XL;
  public PAGINATOR_PAGE_SIZE = PAGINATOR_PAGE_SIZE;

  public listStatusAtivosInativos: Array<StatusAtivoInativo>;
  public listStatusSimNao: Array<StatusSimNao>;
  public listStatusEsperas: Array<StatusEspera>;
  public listStatusVendido: Array<StatusVendido>;
  public listTiposUsuarios: Array<TipoUsuario>;
  public listTiposTelefones: Array<TipoTelefone>;
  public listTiposRevisoes: Array<TipoRevisao>;
  public listTipoRetirada: Array<TipoRetirada>;

  constructor() {
    this.initListStatusAtivosInativos();
    this.initListTiposUsuarios();
    this.initListTiposTelefones();
    this.initListTiposRevisoes();
    this.initListStatusSimNao();
    this.initListStatusEspera();
    this.initListStatusVendido();
    this.initListTipoRetirada();
  }

  /**
   * Inicializa a Lista de Status.
   */
  private initListStatusAtivosInativos() {
    this.listStatusAtivosInativos = [];
    this.listStatusAtivosInativos.push(StatusAtivoInativo.ATIVO);
    this.listStatusAtivosInativos.push(StatusAtivoInativo.INATIVO);
  }

  /**
   * Inicializa a Lista de Status.
   */
  private initListStatusSimNao() {
    this.listStatusSimNao = [];
    this.listStatusSimNao.push(StatusSimNao.SIM);
    this.listStatusSimNao.push(StatusSimNao.NAO);
  }


  /**
   * Inicializa a Lista de Status.
   */
   private initListStatusEspera() {
    this.listStatusEsperas = [];
    this.listStatusEsperas.push(StatusEspera.SIM);
    this.listStatusEsperas.push(StatusEspera.NAO);
  }

   /**
   * Inicializa a Lista de Status.
   */
    private initListStatusVendido() {
      this.listStatusVendido = [];
      this.listStatusVendido.push(StatusVendido.SIM);
      this.listStatusVendido.push(StatusVendido.NAO);
    }

  /**
   * Inicializa a Lista de Tipos de Usuário.
   */
  private initListTiposUsuarios() {
    this.listTiposUsuarios = [];
    this.listTiposUsuarios.push(TipoUsuario.SERVIDOR_INTERNO);
  }

  /**
   * Inicializa a Lista de Tipos de Telefone.
   */
  private initListTiposTelefones() {
    this.listTiposTelefones = [];
    this.listTiposTelefones.push(TipoTelefone.CELULAR);
    this.listTiposTelefones.push(TipoTelefone.COMERCIAL);
    this.listTiposTelefones.push(TipoTelefone.RESIDENCIAL);
  }

  private initListTipoRetirada() {
    this.listTipoRetirada = [];
    this.listTipoRetirada.push(TipoRetirada.PERDA);
    this.listTipoRetirada.push(TipoRetirada.FURTO);
    this.listTipoRetirada.push(TipoRetirada.QUEBRA);
    this.listTipoRetirada.push(TipoRetirada.VALIDADE);
    this.listTipoRetirada.push(TipoRetirada.INCLUSAO);
  }

  /**
   * Inicializa a Lista de Tipos de Revisão.
   */
  private initListTiposRevisoes() {
    this.listTiposRevisoes = [];
    this.listTiposRevisoes.push(TipoRevisao.INCLUSAO);
    this.listTiposRevisoes.push(TipoRevisao.ALTERACAO);
    this.listTiposRevisoes.push(TipoRevisao.EXCLUSAO);
    this.listTiposRevisoes.push(TipoRevisao.CONSULTA);
  }
}
