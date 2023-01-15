/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable, SystemJsNgModuleLoader} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {MessageService} from 'src/app/shared/message/message.service';

import { FiltroMensagemDTO } from 'src/app/shared/dto/filtro-mensagem.dto';
import { MensagemClientService } from './mensagem-client.service';


/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class MensagemListResolve implements Resolve<any> {

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
   * Realiza a consulta por id de Usuário.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      const filtro: FiltroMensagemDTO = new FiltroMensagemDTO();
      filtro.dataAlteracao = "2000/01/12";

      this.mensagemClientService.getByFiltro(filtro).subscribe(
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
