import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDataSource, NewDataSource } from '../data-source.model';

export type PartialUpdateDataSource = Partial<IDataSource> & Pick<IDataSource, 'id'>;

export type EntityResponseType = HttpResponse<IDataSource>;
export type EntityArrayResponseType = HttpResponse<IDataSource[]>;

@Injectable({ providedIn: 'root' })
export class DataSourceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/data-sources');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dataSource: NewDataSource): Observable<EntityResponseType> {
    return this.http.post<IDataSource>(this.resourceUrl, dataSource, { observe: 'response' });
  }

  update(dataSource: IDataSource): Observable<EntityResponseType> {
    return this.http.put<IDataSource>(`${this.resourceUrl}/${this.getDataSourceIdentifier(dataSource)}`, dataSource, {
      observe: 'response',
    });
  }

  partialUpdate(dataSource: PartialUpdateDataSource): Observable<EntityResponseType> {
    return this.http.patch<IDataSource>(`${this.resourceUrl}/${this.getDataSourceIdentifier(dataSource)}`, dataSource, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDataSource>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDataSource[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDataSourceIdentifier(dataSource: Pick<IDataSource, 'id'>): string {
    return dataSource.id;
  }

  compareDataSource(o1: Pick<IDataSource, 'id'> | null, o2: Pick<IDataSource, 'id'> | null): boolean {
    return o1 && o2 ? this.getDataSourceIdentifier(o1) === this.getDataSourceIdentifier(o2) : o1 === o2;
  }

  addDataSourceToCollectionIfMissing<Type extends Pick<IDataSource, 'id'>>(
    dataSourceCollection: Type[],
    ...dataSourcesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dataSources: Type[] = dataSourcesToCheck.filter(isPresent);
    if (dataSources.length > 0) {
      const dataSourceCollectionIdentifiers = dataSourceCollection.map(dataSourceItem => this.getDataSourceIdentifier(dataSourceItem)!);
      const dataSourcesToAdd = dataSources.filter(dataSourceItem => {
        const dataSourceIdentifier = this.getDataSourceIdentifier(dataSourceItem);
        if (dataSourceCollectionIdentifiers.includes(dataSourceIdentifier)) {
          return false;
        }
        dataSourceCollectionIdentifiers.push(dataSourceIdentifier);
        return true;
      });
      return [...dataSourcesToAdd, ...dataSourceCollection];
    }
    return dataSourceCollection;
  }
}
