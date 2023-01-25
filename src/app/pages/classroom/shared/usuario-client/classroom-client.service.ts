/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FiltroClassroomDTO } from '../../../../shared/dto/filtro-classroom.dto';

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class ClassroomClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Classroom conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/${id}`);
  }

  /**
   * Retorna o array de Classroom confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroClassroomDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/filtro`, {
      params: filtroDTO.toParams()
    });
  }

  /**
   * Retorna o array de Classroom confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getCliente(): Observable<any> {
    return this.http.get(`${environment.urlApi}/classroom/classroomsClientes`, {
    });
  }


  /**
   * Salva a instância de classroom.
   *
   * @param classroom
   */
  public salvar(classroom: any): Observable<any> {
    let result: Observable<any> = null;

    if (classroom.id) {

      result = this.http.put(`${environment.urlApi}/classroom/${classroom.id}`, classroom);
    } else {
      result = this.http.post(`${environment.urlApi}/classroom/`, classroom);

    }
    return result;
  }

  public alterarTeacher(classroom: any): Observable<any> {
    let result: Observable<any> = null;
    result = this.http.put(`${environment.urlApi}/classroom/alterar/${classroom.id}`, classroom);

    return result;
  }

  public alterarHour(classroom: any): Observable<any> {
    let result: Observable<any> = null;
    result = this.http.put(`${environment.urlApi}/classroom/alterar/${classroom.id}`, classroom);

    return result;
  }



  /**
   * remover a instância de classroom.
   *
   * @param classroom
   */
  public remover(classroom: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(`${environment.urlApi}/classroom/${classroom.id}`, {});

    return result;
  }


}
