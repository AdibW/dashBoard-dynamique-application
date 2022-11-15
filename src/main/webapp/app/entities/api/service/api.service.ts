import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApi, NewApi } from '../api.model';

export type PartialUpdateApi = Partial<IApi> & Pick<IApi, 'id'>;

export type EntityResponseType = HttpResponse<IApi>;
export type EntityArrayResponseType = HttpResponse<IApi[]>;

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/apis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(api: NewApi): Observable<EntityResponseType> {
    return this.http.post<IApi>(this.resourceUrl, api, { observe: 'response' });
  }

  update(api: IApi): Observable<EntityResponseType> {
    return this.http.put<IApi>(`${this.resourceUrl}/${this.getApiIdentifier(api)}`, api, { observe: 'response' });
  }

  partialUpdate(api: PartialUpdateApi): Observable<EntityResponseType> {
    return this.http.patch<IApi>(`${this.resourceUrl}/${this.getApiIdentifier(api)}`, api, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IApi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getApiIdentifier(api: Pick<IApi, 'id'>): string {
    return api.id;
  }

  compareApi(o1: Pick<IApi, 'id'> | null, o2: Pick<IApi, 'id'> | null): boolean {
    return o1 && o2 ? this.getApiIdentifier(o1) === this.getApiIdentifier(o2) : o1 === o2;
  }

  addApiToCollectionIfMissing<Type extends Pick<IApi, 'id'>>(apiCollection: Type[], ...apisToCheck: (Type | null | undefined)[]): Type[] {
    const apis: Type[] = apisToCheck.filter(isPresent);
    if (apis.length > 0) {
      const apiCollectionIdentifiers = apiCollection.map(apiItem => this.getApiIdentifier(apiItem)!);
      const apisToAdd = apis.filter(apiItem => {
        const apiIdentifier = this.getApiIdentifier(apiItem);
        if (apiCollectionIdentifiers.includes(apiIdentifier)) {
          return false;
        }
        apiCollectionIdentifiers.push(apiIdentifier);
        return true;
      });
      return [...apisToAdd, ...apiCollection];
    }
    return apiCollection;
  }
}
