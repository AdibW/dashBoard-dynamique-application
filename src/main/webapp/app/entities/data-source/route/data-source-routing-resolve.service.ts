import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDataSource } from '../data-source.model';
import { DataSourceService } from '../service/data-source.service';

@Injectable({ providedIn: 'root' })
export class DataSourceRoutingResolveService implements Resolve<IDataSource | null> {
  constructor(protected service: DataSourceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDataSource | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dataSource: HttpResponse<IDataSource>) => {
          if (dataSource.body) {
            return of(dataSource.body);
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
