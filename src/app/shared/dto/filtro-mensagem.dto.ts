
/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Venda.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroMensagemDTO {

  /**
   * Construtor da classe.
   *
   *
   * @param dataAlteracao
   *
   *
   */
  constructor(

    public dataAlteracao?: string,

  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroMensagemDTO {
    return Object.assign(new FiltroMensagemDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroMensagemDTO {
    return new FiltroMensagemDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();


    if (this.dataAlteracao) {
      params = params.append('dataAlteracao', this.dataAlteracao );
    }


    return params;
  }
}
