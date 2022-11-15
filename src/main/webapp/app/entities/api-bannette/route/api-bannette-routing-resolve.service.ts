import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApiBannette } from '../api-bannette.model';
import { ApiBannetteService } from '../service/api-bannette.service';

@Injectable({ providedIn: 'root' })
export class ApiBannetteRoutingResolveService implements Resolve<IApiBannette | null> {
  constructor(protected service: ApiBannetteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApiBannette | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((apiBannette: HttpResponse<IApiBannette>) => {
          if (apiBannette.body) {
            return of(apiBannette.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
