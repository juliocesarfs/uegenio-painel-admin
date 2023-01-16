/* tslint:disable:no-redundant-jsdoc */
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { FiltroSemesterDTO } from "../../../../shared/dto/filtro-semester.dto";

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: "root",
})
export class SemesterClientService {
  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Semester conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/semester/${id}`);
  }

  /**
   * Retorna o array de Semester confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroSemesterDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/semester/filtro`, {
      params: filtroDTO.toParams(),
    });
  }

  /**
   * Salva a instância de semester.
   *
   * @param semester
   */
  public salvar(semester: any): Observable<any> {
    let result: Observable<any> = null;
    console.log(semester.email);

    if (semester.id) {
      result = this.http.put(
        `${environment.urlApi}/semester/${semester.id}`,
        semester
      );
    } else {
      result = this.http.post(`${environment.urlApi}/semester/`, semester);
    }
    return result;
  }

  public getSemestersAtivos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/semester/ativos`);
  }

  /**
   * Torna Semester o Semester pelo 'id' informado (é Semester=true).
   *
   * @param id
   * @return
   */
  public tornarSemester(id: number): Observable<any> {
    return this.http.put(
      `${environment.urlApi}/semester/${id}/tornar-semester`,
      {}
    );
  }

  /**
   *  Deixa de ser semester pelo 'id' do semester informado.
   *
   * @param id
   * @return
   */
  public deixarAmizade(id: number): Observable<any> {
    return this.http.put(
      `${environment.urlApi}/semester/${id}/deixar-semester`,
      {}
    );
  }

  /**
   * remover a instância de semester.
   *
   * @param semester
   */
  public remover(semester: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(
      `${environment.urlApi}/semester/${semester.id}`,
      {}
    );

    return result;
  }
}
