import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWidget, NewWidget } from '../widget.model';

export type PartialUpdateWidget = Partial<IWidget> & Pick<IWidget, 'id'>;

export type EntityResponseType = HttpResponse<IWidget>;
export type EntityArrayResponseType = HttpResponse<IWidget[]>;

@Injectable({ providedIn: 'root' })
export class WidgetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/widgets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(widget: NewWidget): Observable<EntityResponseType> {
    return this.http.post<IWidget>(this.resourceUrl, widget, { observe: 'response' });
  }

  update(widget: IWidget): Observable<EntityResponseType> {
    return this.http.put<IWidget>(`${this.resourceUrl}/${this.getWidgetIdentifier(widget)}`, widget, { observe: 'response' });
  }

  partialUpdate(widget: PartialUpdateWidget): Observable<EntityResponseType> {
    return this.http.patch<IWidget>(`${this.resourceUrl}/${this.getWidgetIdentifier(widget)}`, widget, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWidget>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWidget[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWidgetIdentifier(widget: Pick<IWidget, 'id'>): string {
    return widget.id;
  }

  compareWidget(o1: Pick<IWidget, 'id'> | null, o2: Pick<IWidget, 'id'> | null): boolean {
    return o1 && o2 ? this.getWidgetIdentifier(o1) === this.getWidgetIdentifier(o2) : o1 === o2;
  }

  addWidgetToCollectionIfMissing<Type extends Pick<IWidget, 'id'>>(
    widgetCollection: Type[],
    ...widgetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const widgets: Type[] = widgetsToCheck.filter(isPresent);
    if (widgets.length > 0) {
      const widgetCollectionIdentifiers = widgetCollection.map(widgetItem => this.getWidgetIdentifier(widgetItem)!);
      const widgetsToAdd = widgets.filter(widgetItem => {
        const widgetIdentifier = this.getWidgetIdentifier(widgetItem);
        if (widgetCollectionIdentifiers.includes(widgetIdentifier)) {
          return false;
        }
        widgetCollectionIdentifiers.push(widgetIdentifier);
        return true;
      });
      return [...widgetsToAdd, ...widgetCollection];
    }
    return widgetCollection;
  }
}
