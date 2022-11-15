import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApi } from '../api.model';
import { ApiService } from '../service/api.service';

@Injectable({ providedIn: 'root' })
export class ApiRoutingResolveService implements Resolve<IApi | null> {
  constructor(protected service: ApiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApi | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((api: HttpResponse<IApi>) => {
          if (api.body) {
            return of(api.body);
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
