/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FiltroMensagemDTO } from 'src/app/shared/dto/filtro-mensagem.dto';
import { environment } from 'src/environments/environment';


/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class MensagemClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Mensagem conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/mensagem/${id}`);
  }

  /**
   * Retorna o array de Mensagem confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroMensagemDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/mensagem/filtro`, {
      params: filtroDTO.toParams()
    });
  }


  /**
   * Salva a instância de mensagem.
   *
   * @param mensagem
   */
  public salvar(mensagem: any): Observable<any> {
    let result: Observable<any> = null;

      console.log(mensagem);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      result = this.http.post(`${environment.urlApi}/mensagem/`, mensagem);


    return result;
  }

  public alterarProduto(mensagem: any): Observable<any> {
    let result: Observable<any> = null;
      result = this.http.put(`${environment.urlApi}/mensagem/alterar/${mensagem.id}`, mensagem);

    return result;
  }

  /**


  /**
   * remover a instância de mensagem.
   *
   * @param mensagem
   */
  public remover(mensagem: any): Observable<any> {
    let result: Observable<any> = null;

    result = this.http.delete(`${environment.urlApi}/mensagem/${mensagem.id}`, {});

    return result;
  }


  /**
   * Torna Mensagem o Mensagem pelo 'id' informado (é Mensagem=true).
   *
   * @param id
   * @return
   */
   public tornarMensagemEspera(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/mensagem/${id}/tornar-mensagemespera`, {});
  }

  /**
   * Torna Mensagem o Mensagem pelo 'id' informado (é Mensagem=true).
   *
   * @param id
   * @return
   */
   public deixarMensagemEspera(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/mensagem/${id}/deixar-mensagemespera`, {});
  }



    /**
   * Retorna a lista de Grupos Ativos.
   *
   * @param idSistema
   */
     public getTodos(): Observable<any> {
      return this.http.get(`${environment.urlApi}/mensagem/mensagemClientes`);
    }


}
