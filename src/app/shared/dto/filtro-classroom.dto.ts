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
    public cpf?: string,
    public nome?: string,
    public status?: string,
    public idTipo?: string,
    public email?: string
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

    if (this.cpf) {
      params = params.append("cpf", this.cpf);
    }

    if (this.nome) {
      params = params.append("nome", this.nome);
    }

    if (this.status !== undefined) {
      params = params.append("idStatus", this.status ? "A" : "I");
    }

    if (this.idTipo) {
      params = params.append("idTipo", this.idTipo);
    }

    if (this.email) {
      params = params.append("email", this.email);
    }

    return params;
  }
}
