
/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Venda.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroVendaDTO {

  /**
   * Construtor da classe.
   *
   * @param idProduto
   * @param valorTotal
   * @param dataVenda
   *
   *
   */
  constructor(
    public idProduto?: number,
    public valorTotal?: DoubleRange,
    public dataVenda?: string,
    public statusVendido?:boolean,
    public statusEspera?:boolean
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroVendaDTO {
    return Object.assign(new FiltroVendaDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroVendaDTO {
    return new FiltroVendaDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.idProduto) {
      params = params.append('idTipoVenda', String(this.idProduto) );
    }

    if (this.dataVenda) {
      params = params.append('dataVenda', this.dataVenda );
    }

    if (this.valorTotal) {
      params = params.append('valorTotal', this.valorTotal.toString() );
    }


    if (this.statusVendido) {
      params = params.append('statusVendido', this.statusVendido ? 'true' : 'false');
    }

    if (this.statusEspera) {
      params = params.append('statusEspera', this.statusEspera ? 'true' : 'false');
    }

    return params;
  }
}
