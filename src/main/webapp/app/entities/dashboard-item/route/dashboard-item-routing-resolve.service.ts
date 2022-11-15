import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDashboardItem } from '../dashboard-item.model';
import { DashboardItemService } from '../service/dashboard-item.service';

@Injectable({ providedIn: 'root' })
export class DashboardItemRoutingResolveService implements Resolve<IDashboardItem | null> {
  constructor(protected service: DashboardItemService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDashboardItem | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dashboardItem: HttpResponse<IDashboardItem>) => {
          if (dashboardItem.body) {
            return of(dashboardItem.body);
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
