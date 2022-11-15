import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DataSourceFormService, DataSourceFormGroup } from './data-source-form.service';
import { IDataSource } from '../data-source.model';
import { DataSourceService } from '../service/data-source.service';
import { IApi } from 'app/entities/api/api.model';
import { ApiService } from 'app/entities/api/service/api.service';

@Component({
  selector: 'jhi-data-source-update',
  templateUrl: './data-source-update.component.html',
})
export class DataSourceUpdateComponent implements OnInit {
  isSaving = false;
  dataSource: IDataSource | null = null;

  apisSharedCollection: IApi[] = [];

  editForm: DataSourceFormGroup = this.dataSourceFormService.createDataSourceFormGroup();

  constructor(
    protected dataSourceService: DataSourceService,
    protected dataSourceFormService: DataSourceFormService,
    protected apiService: ApiService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApi = (o1: IApi | null, o2: IApi | null): boolean => this.apiService.compareApi(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataSource }) => {
      this.dataSource = dataSource;
      if (dataSource) {
        this.updateForm(dataSource);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dataSource = this.dataSourceFormService.getDataSource(this.editForm);
    if (dataSource.id !== null) {
      this.subscribeToSaveResponse(this.dataSourceService.update(dataSource));
    } else {
      this.subscribeToSaveResponse(this.dataSourceService.create(dataSource));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDataSource>>): void {
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

  protected updateForm(dataSource: IDataSource): void {
    this.dataSource = dataSource;
    this.dataSourceFormService.resetForm(this.editForm, dataSource);

    this.apisSharedCollection = this.apiService.addApiToCollectionIfMissing<IApi>(this.apisSharedCollection, dataSource.dataSource);
  }

  protected loadRelationshipsOptions(): void {
    this.apiService
      .query()
      .pipe(map((res: HttpResponse<IApi[]>) => res.body ?? []))
      .pipe(map((apis: IApi[]) => this.apiService.addApiToCollectionIfMissing<IApi>(apis, this.dataSource?.dataSource)))
      .subscribe((apis: IApi[]) => (this.apisSharedCollection = apis));
  }
}
