/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { MessageService } from 'src/app/shared/message/message.service';
import { MensagemClientService } from './mensagem-client.service';


/**
 * Classe resolve responsável pela busca das informações de Mensagem conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class MensagemResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param mensagemClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private mensagemClientService: MensagemClientService,
    private messageService: MessageService
  ) { }

  /**
   * Realiza a consulta por id de Mensagem.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      this.mensagemClientService.getById(id).subscribe(
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
