/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {FiltroProdutoDTO} from '../../../../shared/dto/filtro-produto.dto';

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class ProdutoClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Produto conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/produto/${id}`);
  }

  /**
   * Retorna o array de Produto confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroProdutoDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/produto/filtro`, {
      params: filtroDTO.toParams()
    });
  }


  /**
   * Salva a instância de produto.
   *
   * @param produto
   */
  public salvar(produto: any): Observable<any> {
    let result: Observable<any> = null;

    if (produto.id) {
      result = this.http.put(`${environment.urlApi}/produto/${produto.id}`, produto);
    } else {
      result = this.http.post(`${environment.urlApi}/produto/`, produto);
    }
    return result;
  }

  /**
   * Torna Produto o Produto pelo 'id' informado (é Produto=true).
   *
   * @param id
   * @return
   */
  public tornarProduto(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/produto/${id}/tornar-produto`, {});
  }

  /**
   *  Deixa de ser produto pelo 'id' do produto informado.
   *
   * @param id
   * @return
   */
  public deixarAmizade(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/produto/${id}/deixar-produto`, {});
  }

  /**
   * remover a instância de produto.
   *
   * @param produto
   */
  public remover(produto: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(`${environment.urlApi}/produto/${produto.id}`, {});

    return result;
  }


  /**
   * Retorna a lista de Grupos Ativos.
   *
   * @param idSistema
   */
   public getProdutosAtivos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/produto/ativos`);
  }

    /**
   * Retorna a lista de Grupos Ativos.
   *
   * @param idSistema
   */
     public getRanking(): Observable<any> {
      return this.http.get(`${environment.urlApi}/produto/ranking`);
    }


}
