/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {MessageService} from 'src/app/shared/message/message.service';
import {ProdutoClientService} from './produto-client.service';
import {FiltroProdutoDTO} from '../../../../shared/dto/filtro-produto.dto';

/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class ProdutoRankingResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param produtoClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private produtoClientService: ProdutoClientService,
    private messageService: MessageService
  ) { }

  /**
   * Realiza a consulta por id de Usuário.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {

      this.produtoClientService.getRanking().subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          if (error.status === 404) {
            observer.next();
            observer.complete();
          } else {
            observer.error(error);
            this.router.navigate(['']);
            this.messageService.addMsgDanger(error);
          }
        }
      );
    });
  }
}
