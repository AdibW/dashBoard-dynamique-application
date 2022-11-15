import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApiBannette, NewApiBannette } from '../api-bannette.model';

export type PartialUpdateApiBannette = Partial<IApiBannette> & Pick<IApiBannette, 'id'>;

export type EntityResponseType = HttpResponse<IApiBannette>;
export type EntityArrayResponseType = HttpResponse<IApiBannette[]>;

@Injectable({ providedIn: 'root' })
export class ApiBannetteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/api-bannettes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(apiBannette: NewApiBannette): Observable<EntityResponseType> {
    return this.http.post<IApiBannette>(this.resourceUrl, apiBannette, { observe: 'response' });
  }

  update(apiBannette: IApiBannette): Observable<EntityResponseType> {
    return this.http.put<IApiBannette>(`${this.resourceUrl}/${this.getApiBannetteIdentifier(apiBannette)}`, apiBannette, {
      observe: 'response',
    });
  }

  partialUpdate(apiBannette: PartialUpdateApiBannette): Observable<EntityResponseType> {
    return this.http.patch<IApiBannette>(`${this.resourceUrl}/${this.getApiBannetteIdentifier(apiBannette)}`, apiBannette, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IApiBannette>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IApiBannette[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getApiBannetteIdentifier(apiBannette: Pick<IApiBannette, 'id'>): string {
    return apiBannette.id;
  }

  compareApiBannette(o1: Pick<IApiBannette, 'id'> | null, o2: Pick<IApiBannette, 'id'> | null): boolean {
    return o1 && o2 ? this.getApiBannetteIdentifier(o1) === this.getApiBannetteIdentifier(o2) : o1 === o2;
  }

  addApiBannetteToCollectionIfMissing<Type extends Pick<IApiBannette, 'id'>>(
    apiBannetteCollection: Type[],
    ...apiBannettesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const apiBannettes: Type[] = apiBannettesToCheck.filter(isPresent);
    if (apiBannettes.length > 0) {
      const apiBannetteCollectionIdentifiers = apiBannetteCollection.map(
        apiBannetteItem => this.getApiBannetteIdentifier(apiBannetteItem)!
      );
      const apiBannettesToAdd = apiBannettes.filter(apiBannetteItem => {
        const apiBannetteIdentifier = this.getApiBannetteIdentifier(apiBannetteItem);
        if (apiBannetteCollectionIdentifiers.includes(apiBannetteIdentifier)) {
          return false;
        }
        apiBannetteCollectionIdentifiers.push(apiBannetteIdentifier);
        return true;
      });
      return [...apiBannettesToAdd, ...apiBannetteCollection];
    }
    return apiBannetteCollection;
  }
}
