/* tslint:disable:no-redundant-jsdoc */
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { MessageService } from "src/app/shared/message/message.service";
import { ClienteClientService } from "./cliente-client.service";

/**
 * Classe resolve responsável pela busca das informações de Cliente conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class ClienteResolve implements Resolve<any> {
  /**
   * Construtor da classe.
   *
   * @param router
   * @param clienteClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private clienteClientService: ClienteClientService,
    private messageService: MessageService
  ) {}

  /**
   * Realiza a consulta por id de Cliente.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable((observer) => {
      this.clienteClientService.getById(id).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          this.router.navigate([""]);
          this.messageService.addMsgDanger(error);
        }
      );
    });
  }
}
