import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDashboardItem, NewDashboardItem } from '../dashboard-item.model';

export type PartialUpdateDashboardItem = Partial<IDashboardItem> & Pick<IDashboardItem, 'id'>;

export type EntityResponseType = HttpResponse<IDashboardItem>;
export type EntityArrayResponseType = HttpResponse<IDashboardItem[]>;

@Injectable({ providedIn: 'root' })
export class DashboardItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dashboard-items');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dashboardItem: NewDashboardItem): Observable<EntityResponseType> {
    return this.http.post<IDashboardItem>(this.resourceUrl, dashboardItem, { observe: 'response' });
  }

  update(dashboardItem: IDashboardItem): Observable<EntityResponseType> {
    return this.http.put<IDashboardItem>(`${this.resourceUrl}/${this.getDashboardItemIdentifier(dashboardItem)}`, dashboardItem, {
      observe: 'response',
    });
  }

  partialUpdate(dashboardItem: PartialUpdateDashboardItem): Observable<EntityResponseType> {
    return this.http.patch<IDashboardItem>(`${this.resourceUrl}/${this.getDashboardItemIdentifier(dashboardItem)}`, dashboardItem, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDashboardItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDashboardItemIdentifier(dashboardItem: Pick<IDashboardItem, 'id'>): string {
    return dashboardItem.id;
  }

  compareDashboardItem(o1: Pick<IDashboardItem, 'id'> | null, o2: Pick<IDashboardItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getDashboardItemIdentifier(o1) === this.getDashboardItemIdentifier(o2) : o1 === o2;
  }

  addDashboardItemToCollectionIfMissing<Type extends Pick<IDashboardItem, 'id'>>(
    dashboardItemCollection: Type[],
    ...dashboardItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dashboardItems: Type[] = dashboardItemsToCheck.filter(isPresent);
    if (dashboardItems.length > 0) {
      const dashboardItemCollectionIdentifiers = dashboardItemCollection.map(
        dashboardItemItem => this.getDashboardItemIdentifier(dashboardItemItem)!
      );
      const dashboardItemsToAdd = dashboardItems.filter(dashboardItemItem => {
        const dashboardItemIdentifier = this.getDashboardItemIdentifier(dashboardItemItem);
        if (dashboardItemCollectionIdentifiers.includes(dashboardItemIdentifier)) {
          return false;
        }
        dashboardItemCollectionIdentifiers.push(dashboardItemIdentifier);
        return true;
      });
      return [...dashboardItemsToAdd, ...dashboardItemCollection];
    }
    return dashboardItemCollection;
  }
}
