/* tslint:disable:no-redundant-jsdoc */
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { FiltroClassroomDTO } from "../../../../shared/dto/filtro-classroom.dto";
import { FiltroUserKeycloakDTO } from "../../../../shared/dto/filtro-user-keycloak.dto";

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: "root",
})
export class ClassroomClientService {
  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Usuário conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/${id}`);
  }

  /**
   * Retorna o array de Usuários confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroClassroomDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/filtro`, {
      params: filtroDTO.toParams(),
    });
  }

  /**
   * Retorna o array de Usuários do AD confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getClassroomsADByFiltro(
    filtroDTO: FiltroUserKeycloakDTO
  ): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/ad/filtro`, {
      params: filtroDTO.toParams(),
    });
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param classroom
   */
  public salvar(classroom: any): Observable<any> {
    let result: Observable<any> = null;

    if (classroom.id) {
      result = this.http.put(
        `${environment.urlApi}/classroom/${classroom.id}`,
        classroom
      );
    } else {
      result = this.http.post(`${environment.urlApi}/classroom/`, classroom);
    }
    return result;
  }

  /**
   * Ativa o Usuário pelo 'id' informado.
   *
   * @param id
   * @return
   */
  public ativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/classroom/${id}/ativo`, {});
  }

  /**
   *  Inativa Usuário pelo 'id' informado.
   *
   * @param id
   * @return
   */
  public inativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/classroom/${id}/inativo`, {});
  }

  /**
   * Retorna se o CPF informado é válido e se está em uso.
   *
   * @param cpf
   * @param id
   */
  public validarCpf(cpf: string, id: number): Observable<any> {
    let observable: Observable<any>;

    if (id === undefined) {
      observable = this.http.get(
        `${environment.urlApi}/classroom/cpf/valido/${cpf}`
      );
    } else {
      observable = this.http.get(
        `${environment.urlApi}/classroom/${id}/cpf/valido/${cpf}`
      );
    }
    return observable;
  }
}
