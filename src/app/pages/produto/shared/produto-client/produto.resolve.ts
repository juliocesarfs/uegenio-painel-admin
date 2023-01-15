/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { MessageService } from 'src/app/shared/message/message.service';
import { ProdutoClientService } from './produto-client.service';

/**
 * Classe resolve responsável pela busca das informações de Produto conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class ProdutoResolve implements Resolve<any> {

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
   * Realiza a consulta por id de Produto.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      this.produtoClientService.getById(id).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          observer.error(error);
          this.router.navigate(['']);
          this.messageService.addMsgDanger(error);
        }
      );
    });
  }
}
