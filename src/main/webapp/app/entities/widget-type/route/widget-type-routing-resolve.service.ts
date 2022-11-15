import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWidgetType } from '../widget-type.model';
import { WidgetTypeService } from '../service/widget-type.service';

@Injectable({ providedIn: 'root' })
export class WidgetTypeRoutingResolveService implements Resolve<IWidgetType | null> {
  constructor(protected service: WidgetTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWidgetType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((widgetType: HttpResponse<IWidgetType>) => {
          if (widgetType.body) {
            return of(widgetType.body);
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
