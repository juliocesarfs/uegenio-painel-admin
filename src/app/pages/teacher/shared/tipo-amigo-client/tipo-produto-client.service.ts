/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FiltroTeacherDTO } from '../../../../shared/dto/filtro-teacher.dto';

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class TeacherClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Teacher conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/teacher/${id}`);
  }

  /**
   * Retorna o array de Teacher confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroTeacherDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/teacher/filtro`, {
      params: filtroDTO.toParams()
    });
  }


  /**
   * Salva a instância de teacher.
   *
   * @param teacher
   */
  public salvar(teacher: any): Observable<any> {
    let result: Observable<any> = null;

    if (teacher.id) {
      result = this.http.put(`${environment.urlApi}/teacher/${teacher.id}`, teacher);
    } else {
      result = this.http.post(`${environment.urlApi}/teacher/`, teacher);
    }
    return result;
  }

  /**
   * Torna Teacher o Teacher pelo 'id' informado (é Teacher=true).
   *
   * @param id
   * @return
   */
  public tornarTeacher(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/teacher/${id}/tornar-teacher`, {});
  }


  /**
   * remover a instância de teacher.
   *
   * @param teacher
   */
  public remover(teacher: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(`${environment.urlApi}/teacher/${teacher.id}`, {});

    return result;
  }


  /**
   * Retorna a lista de Grupos Ativos.
   *
   * @param idSistema
   */
  public getTeachersAtivos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/teacher/ativos`);
  }

  /**
 * Retorna a lista de Grupos Ativos.
 *
 * @param idSistema
 */
  public getRanking(): Observable<any> {
    return this.http.get(`${environment.urlApi}/teacher/ranking`);
  }


}
