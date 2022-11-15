import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWidget } from '../widget.model';
import { WidgetService } from '../service/widget.service';

@Injectable({ providedIn: 'root' })
export class WidgetRoutingResolveService implements Resolve<IWidget | null> {
  constructor(protected service: WidgetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWidget | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((widget: HttpResponse<IWidget>) => {
          if (widget.body) {
            return of(widget.body);
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
