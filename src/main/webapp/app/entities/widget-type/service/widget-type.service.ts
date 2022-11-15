import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWidgetType, NewWidgetType } from '../widget-type.model';

export type PartialUpdateWidgetType = Partial<IWidgetType> & Pick<IWidgetType, 'id'>;

export type EntityResponseType = HttpResponse<IWidgetType>;
export type EntityArrayResponseType = HttpResponse<IWidgetType[]>;

@Injectable({ providedIn: 'root' })
export class WidgetTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/widget-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(widgetType: NewWidgetType): Observable<EntityResponseType> {
    return this.http.post<IWidgetType>(this.resourceUrl, widgetType, { observe: 'response' });
  }

  update(widgetType: IWidgetType): Observable<EntityResponseType> {
    return this.http.put<IWidgetType>(`${this.resourceUrl}/${this.getWidgetTypeIdentifier(widgetType)}`, widgetType, {
      observe: 'response',
    });
  }

  partialUpdate(widgetType: PartialUpdateWidgetType): Observable<EntityResponseType> {
    return this.http.patch<IWidgetType>(`${this.resourceUrl}/${this.getWidgetTypeIdentifier(widgetType)}`, widgetType, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWidgetType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWidgetType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWidgetTypeIdentifier(widgetType: Pick<IWidgetType, 'id'>): string {
    return widgetType.id;
  }

  compareWidgetType(o1: Pick<IWidgetType, 'id'> | null, o2: Pick<IWidgetType, 'id'> | null): boolean {
    return o1 && o2 ? this.getWidgetTypeIdentifier(o1) === this.getWidgetTypeIdentifier(o2) : o1 === o2;
  }

  addWidgetTypeToCollectionIfMissing<Type extends Pick<IWidgetType, 'id'>>(
    widgetTypeCollection: Type[],
    ...widgetTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const widgetTypes: Type[] = widgetTypesToCheck.filter(isPresent);
    if (widgetTypes.length > 0) {
      const widgetTypeCollectionIdentifiers = widgetTypeCollection.map(widgetTypeItem => this.getWidgetTypeIdentifier(widgetTypeItem)!);
      const widgetTypesToAdd = widgetTypes.filter(widgetTypeItem => {
        const widgetTypeIdentifier = this.getWidgetTypeIdentifier(widgetTypeItem);
        if (widgetTypeCollectionIdentifiers.includes(widgetTypeIdentifier)) {
          return false;
        }
        widgetTypeCollectionIdentifiers.push(widgetTypeIdentifier);
        return true;
      });
      return [...widgetTypesToAdd, ...widgetTypeCollection];
    }
    return widgetTypeCollection;
  }
}
