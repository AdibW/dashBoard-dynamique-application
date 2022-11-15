import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WidgetTypeFormService, WidgetTypeFormGroup } from './widget-type-form.service';
import { IWidgetType } from '../widget-type.model';
import { WidgetTypeService } from '../service/widget-type.service';
import { IDataSource } from 'app/entities/data-source/data-source.model';
import { DataSourceService } from 'app/entities/data-source/service/data-source.service';

@Component({
  selector: 'jhi-widget-type-update',
  templateUrl: './widget-type-update.component.html',
})
export class WidgetTypeUpdateComponent implements OnInit {
  isSaving = false;
  widgetType: IWidgetType | null = null;

  dataSourcesSharedCollection: IDataSource[] = [];

  editForm: WidgetTypeFormGroup = this.widgetTypeFormService.createWidgetTypeFormGroup();

  constructor(
    protected widgetTypeService: WidgetTypeService,
    protected widgetTypeFormService: WidgetTypeFormService,
    protected dataSourceService: DataSourceService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDataSource = (o1: IDataSource | null, o2: IDataSource | null): boolean => this.dataSourceService.compareDataSource(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ widgetType }) => {
      this.widgetType = widgetType;
      if (widgetType) {
        this.updateForm(widgetType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const widgetType = this.widgetTypeFormService.getWidgetType(this.editForm);
    if (widgetType.id !== null) {
      this.subscribeToSaveResponse(this.widgetTypeService.update(widgetType));
    } else {
      this.subscribeToSaveResponse(this.widgetTypeService.create(widgetType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWidgetType>>): void {
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

  protected updateForm(widgetType: IWidgetType): void {
    this.widgetType = widgetType;
    this.widgetTypeFormService.resetForm(this.editForm, widgetType);

    this.dataSourcesSharedCollection = this.dataSourceService.addDataSourceToCollectionIfMissing<IDataSource>(
      this.dataSourcesSharedCollection,
      widgetType.widgetType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dataSourceService
      .query()
      .pipe(map((res: HttpResponse<IDataSource[]>) => res.body ?? []))
      .pipe(
        map((dataSources: IDataSource[]) =>
          this.dataSourceService.addDataSourceToCollectionIfMissing<IDataSource>(dataSources, this.widgetType?.widgetType)
        )
      )
      .subscribe((dataSources: IDataSource[]) => (this.dataSourcesSharedCollection = dataSources));
  }
}
