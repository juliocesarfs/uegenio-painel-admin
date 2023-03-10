/* tslint:disable:no-redundant-jsdoc */
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";

import { MessageService } from "src/app/shared/message/message.service";
import { SemesterClientService } from "./semester-client.service";
import { FiltroSemesterDTO } from "../../../../shared/dto/filtro-semester.dto";

/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class SemesterListResolve implements Resolve<any> {
    /**
     * Construtor da classe.
     *
     * @param router
     * @param semesterClientService
     * @param messageService
     */
    constructor(
        private router: Router,
        private semesterClientService: SemesterClientService,
        private messageService: MessageService
    ) { }

    /**
     * Realiza a consulta por id de Usuário.
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params.id;

        return new Observable((observer) => {
            const filtro: FiltroSemesterDTO = new FiltroSemesterDTO();
            filtro.nome = "%%%%";
            this.semesterClientService.getByFiltro(filtro).subscribe(
                (data) => {
                    observer.next(data);
                    observer.complete();
                },
                (error) => {
                    if (error.status === 404) {
                        observer.next();
                        observer.complete();
                    } else {
                        observer.error(error);
                        this.router.navigate([""]);
                        this.messageService.addMsgDanger(error);
                    }
                }
            );
        });
    }
}
