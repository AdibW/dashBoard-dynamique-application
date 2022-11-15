import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ApiFormService, ApiFormGroup } from './api-form.service';
import { IApi } from '../api.model';
import { ApiService } from '../service/api.service';
import { IApiBannette } from 'app/entities/api-bannette/api-bannette.model';
import { ApiBannetteService } from 'app/entities/api-bannette/service/api-bannette.service';

@Component({
  selector: 'jhi-api-update',
  templateUrl: './api-update.component.html',
})
export class ApiUpdateComponent implements OnInit {
  isSaving = false;
  api: IApi | null = null;

  apiBannettesSharedCollection: IApiBannette[] = [];

  editForm: ApiFormGroup = this.apiFormService.createApiFormGroup();

  constructor(
    protected apiService: ApiService,
    protected apiFormService: ApiFormService,
    protected apiBannetteService: ApiBannetteService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApiBannette = (o1: IApiBannette | null, o2: IApiBannette | null): boolean => this.apiBannetteService.compareApiBannette(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ api }) => {
      this.api = api;
      if (api) {
        this.updateForm(api);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const api = this.apiFormService.getApi(this.editForm);
    if (api.id !== null) {
      this.subscribeToSaveResponse(this.apiService.update(api));
    } else {
      this.subscribeToSaveResponse(this.apiService.create(api));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(api: IApi): void {
    this.api = api;
    this.apiFormService.resetForm(this.editForm, api);

    this.apiBannettesSharedCollection = this.apiBannetteService.addApiBannetteToCollectionIfMissing<IApiBannette>(
      this.apiBannettesSharedCollection,
      api.api
    );
  }

  protected loadRelationshipsOptions(): void {
    this.apiBannetteService
      .query()
      .pipe(map((res: HttpResponse<IApiBannette[]>) => res.body ?? []))
      .pipe(
        map((apiBannettes: IApiBannette[]) =>
          this.apiBannetteService.addApiBannetteToCollectionIfMissing<IApiBannette>(apiBannettes, this.api?.api)
        )
      )
      .subscribe((apiBannettes: IApiBannette[]) => (this.apiBannettesSharedCollection = apiBannettes));
  }
}
