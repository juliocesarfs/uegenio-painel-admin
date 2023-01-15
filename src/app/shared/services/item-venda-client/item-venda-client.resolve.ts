/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import {MessageService} from '../../message/message.service';
import {ItemVendaClientService} from './item-venda-client.service';


/**
 * Classe resolve responsável pela lista dos Sistemas que o Usuário Logado possui acesso.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class ItemVendaClientResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param itemVendaClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private itemVendaClientService: ItemVendaClientService,
    private messageService: MessageService
  ) { }

  /**
   * Retorna a lista dos Sistemas que o Usuário Logado possui acesso.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return new Observable(observer => {
      this.itemVendaClientService.getAllByAtivosByAcessoUsuario().subscribe(data => {
        observer.next(data);
        observer.complete();
      }, error => {
        if (error.status === 404) {
          observer.next();
          observer.complete();
        } else {
          observer.error(error);
          this.messageService.addMsgDanger(error);
        }
      });
    });
  }
}
