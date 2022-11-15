import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WidgetFormService, WidgetFormGroup } from './widget-form.service';
import { IWidget } from '../widget.model';
import { WidgetService } from '../service/widget.service';
import { IWidgetType } from 'app/entities/widget-type/widget-type.model';
import { WidgetTypeService } from 'app/entities/widget-type/service/widget-type.service';

@Component({
  selector: 'jhi-widget-update',
  templateUrl: './widget-update.component.html',
})
export class WidgetUpdateComponent implements OnInit {
  isSaving = false;
  widget: IWidget | null = null;

  widgetTypesSharedCollection: IWidgetType[] = [];

  editForm: WidgetFormGroup = this.widgetFormService.createWidgetFormGroup();

  constructor(
    protected widgetService: WidgetService,
    protected widgetFormService: WidgetFormService,
    protected widgetTypeService: WidgetTypeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareWidgetType = (o1: IWidgetType | null, o2: IWidgetType | null): boolean => this.widgetTypeService.compareWidgetType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ widget }) => {
      this.widget = widget;
      if (widget) {
        this.updateForm(widget);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const widget = this.widgetFormService.getWidget(this.editForm);
    if (widget.id !== null) {
      this.subscribeToSaveResponse(this.widgetService.update(widget));
    } else {
      this.subscribeToSaveResponse(this.widgetService.create(widget));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWidget>>): void {
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

  protected updateForm(widget: IWidget): void {
    this.widget = widget;
    this.widgetFormService.resetForm(this.editForm, widget);

    this.widgetTypesSharedCollection = this.widgetTypeService.addWidgetTypeToCollectionIfMissing<IWidgetType>(
      this.widgetTypesSharedCollection,
      widget.widget
    );
  }

  protected loadRelationshipsOptions(): void {
    this.widgetTypeService
      .query()
      .pipe(map((res: HttpResponse<IWidgetType[]>) => res.body ?? []))
      .pipe(
        map((widgetTypes: IWidgetType[]) =>
          this.widgetTypeService.addWidgetTypeToCollectionIfMissing<IWidgetType>(widgetTypes, this.widget?.widget)
        )
      )
      .subscribe((widgetTypes: IWidgetType[]) => (this.widgetTypesSharedCollection = widgetTypes));
  }
}
