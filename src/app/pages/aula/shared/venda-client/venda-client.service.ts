/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {FiltroVendaDTO} from '../../../../shared/dto/filtro-venda.dto';

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class VendaClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Venda conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/venda/${id}`);
  }

  /**
   * Retorna o array de Venda confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroVendaDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/venda/filtro`, {
      params: filtroDTO.toParams()
    });
  }

  /**
   * Retorna o array de Venda confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
   public getCliente(): Observable<any> {
    return this.http.get(`${environment.urlApi}/venda/vendasClientes`, {
    });
  }


  /**
   * Salva a instância de venda.
   *
   * @param venda
   */
  public salvar(venda: any): Observable<any> {
    let result: Observable<any> = null;
    console.log(venda.statusEspera);

    if (venda.id) {

      result = this.http.put(`${environment.urlApi}/venda/${venda.id}`, venda);
    } else {
      result = this.http.post(`${environment.urlApi}/venda/`, venda);

    }
    return result;
  }

  public alterarProduto(venda: any): Observable<any> {
    let result: Observable<any> = null;
      result = this.http.put(`${environment.urlApi}/venda/alterar/${venda.id}`, venda);

    return result;
  }

  /**
   * Torna Venda o Venda pelo 'id' informado (é Venda=true).
   *
   * @param id
   * @return
   */
  public tornarVendido(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/venda/${id}/tornar-vendido`, {});
  }

  /**
   *  Deixa de ser venda pelo 'id' do venda informado.
   *
   * @param id
   * @return
   */
  public deixarVendido(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/venda/${id}/deixar-vendido`, {});
  }

  /**
   * remover a instância de venda.
   *
   * @param venda
   */
  public remover(venda: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(`${environment.urlApi}/venda/${venda.id}`, {});

    return result;
  }


  /**
   * Torna Venda o Venda pelo 'id' informado (é Venda=true).
   *
   * @param id
   * @return
   */
   public tornarVendaEspera(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/venda/${id}/tornar-vendaespera`, {});
  }

  /**
   * Torna Venda o Venda pelo 'id' informado (é Venda=true).
   *
   * @param id
   * @return
   */
   public deixarVendaEspera(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/venda/${id}/deixar-vendaespera`, {});
  }

}
