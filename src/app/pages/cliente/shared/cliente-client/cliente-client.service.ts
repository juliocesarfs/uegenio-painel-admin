/* tslint:disable:no-redundant-jsdoc */
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { FiltroClienteDTO } from "../../../../shared/dto/filtro-cliente.dto";

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: "root",
})
export class ClienteClientService {
  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Retorna a instância de Cliente conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/cliente/${id}`);
  }

  /**
   * Retorna o array de Cliente confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroClienteDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/cliente/filtro`, {
      params: filtroDTO.toParams(),
    });
  }

  /**
   * Salva a instância de cliente.
   *
   * @param cliente
   */
  public salvar(cliente: any): Observable<any> {
    let result: Observable<any> = null;
    console.log(cliente.email);

    if (cliente.id) {
      result = this.http.put(
        `${environment.urlApi}/cliente/${cliente.id}`,
        cliente
      );
    } else {
      result = this.http.post(`${environment.urlApi}/cliente/`, cliente);
    }
    return result;
  }

  /**
   * Torna Cliente o Cliente pelo 'id' informado (é Cliente=true).
   *
   * @param id
   * @return
   */
  public tornarCliente(id: number): Observable<any> {
    return this.http.put(
      `${environment.urlApi}/cliente/${id}/tornar-cliente`,
      {}
    );
  }

  /**
   *  Deixa de ser cliente pelo 'id' do cliente informado.
   *
   * @param id
   * @return
   */
  public deixarAmizade(id: number): Observable<any> {
    return this.http.put(
      `${environment.urlApi}/cliente/${id}/deixar-cliente`,
      {}
    );
  }

  /**
   * remover a instância de cliente.
   *
   * @param cliente
   */
  public remover(cliente: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(
      `${environment.urlApi}/cliente/${cliente.id}`,
      {}
    );

    return result;
  }
}
