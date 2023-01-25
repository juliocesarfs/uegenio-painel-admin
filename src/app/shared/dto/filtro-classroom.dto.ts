/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from "@angular/common/http";

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroClassroomDTO {
  /**
   * Construtor da classe.
   *
   * @param cpf
   * @param nome
   * @param status
   * @param idTipo
   * @param email
   */
  constructor(
    public local?: string,
    public subject?: string,
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroClassroomDTO {
    return Object.assign(new FiltroClassroomDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroClassroomDTO {
    return new FiltroClassroomDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.local) {
      params = params.append("local", this.local);
    }

    if (this.subject) {
      params = params.append("subject", this.subject);
    }


    return params;
  }
}
