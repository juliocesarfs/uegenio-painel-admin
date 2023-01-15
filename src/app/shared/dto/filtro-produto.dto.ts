/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Produto.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroProdutoDTO {

  /**
   * Construtor da classe.
   *
   * @param nome
   * @param idTipoProduto
   * @param preco
   * @param dataCadastro
   * @param quantidade
   */
  constructor(
    public nome?: string,
    public idTipoProduto?: number,
    public preco?: DoubleRange,
    public dataCadastro?: string,
    public quantidade?: number
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroProdutoDTO {
    return Object.assign(new FiltroProdutoDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroProdutoDTO {
    return new FiltroProdutoDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.nome) {
      params = params.append('nome', this.nome);
    }

    if (this.idTipoProduto) {
      params = params.append('idTipoProduto', String(this.idTipoProduto) );
    }

    if (this.dataCadastro) {
      params = params.append('dataCadastro', this.dataCadastro );
    }

    if (this.preco) {
      params = params.append('preco', this.preco.toString() );
    }

    if (this.quantidade) {
      params = params.append('preco', this.quantidade.toString() );
    }
    return params;
  }
}
