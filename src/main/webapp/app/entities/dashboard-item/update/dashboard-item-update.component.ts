import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DashboardItemFormService, DashboardItemFormGroup } from './dashboard-item-form.service';
import { IDashboardItem } from '../dashboard-item.model';
import { DashboardItemService } from '../service/dashboard-item.service';
import { IWidget } from 'app/entities/widget/widget.model';
import { WidgetService } from 'app/entities/widget/service/widget.service';
import { IDashboard } from 'app/entities/dashboard/dashboard.model';
import { DashboardService } from 'app/entities/dashboard/service/dashboard.service';

@Component({
  selector: 'jhi-dashboard-item-update',
  templateUrl: './dashboard-item-update.component.html',
})
export class DashboardItemUpdateComponent implements OnInit {
  isSaving = false;
  dashboardItem: IDashboardItem | null = null;

  widgetsSharedCollection: IWidget[] = [];
  dashboardsSharedCollection: IDashboard[] = [];

  editForm: DashboardItemFormGroup = this.dashboardItemFormService.createDashboardItemFormGroup();

  constructor(
    protected dashboardItemService: DashboardItemService,
    protected dashboardItemFormService: DashboardItemFormService,
    protected widgetService: WidgetService,
    protected dashboardService: DashboardService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareWidget = (o1: IWidget | null, o2: IWidget | null): boolean => this.widgetService.compareWidget(o1, o2);

  compareDashboard = (o1: IDashboard | null, o2: IDashboard | null): boolean => this.dashboardService.compareDashboard(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dashboardItem }) => {
      this.dashboardItem = dashboardItem;
      if (dashboardItem) {
        this.updateForm(dashboardItem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dashboardItem = this.dashboardItemFormService.getDashboardItem(this.editForm);
    if (dashboardItem.id !== null) {
      this.subscribeToSaveResponse(this.dashboardItemService.update(dashboardItem));
    } else {
      this.subscribeToSaveResponse(this.dashboardItemService.create(dashboardItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDashboardItem>>): void {
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

  protected updateForm(dashboardItem: IDashboardItem): void {
    this.dashboardItem = dashboardItem;
    this.dashboardItemFormService.resetForm(this.editForm, dashboardItem);

    this.widgetsSharedCollection = this.widgetService.addWidgetToCollectionIfMissing<IWidget>(
      this.widgetsSharedCollection,
      dashboardItem.item
    );
    this.dashboardsSharedCollection = this.dashboardService.addDashboardToCollectionIfMissing<IDashboard>(
      this.dashboardsSharedCollection,
      dashboardItem.items
    );
  }

  protected loadRelationshipsOptions(): void {
    this.widgetService
      .query()
      .pipe(map((res: HttpResponse<IWidget[]>) => res.body ?? []))
      .pipe(map((widgets: IWidget[]) => this.widgetService.addWidgetToCollectionIfMissing<IWidget>(widgets, this.dashboardItem?.item)))
      .subscribe((widgets: IWidget[]) => (this.widgetsSharedCollection = widgets));

    this.dashboardService
      .query()
      .pipe(map((res: HttpResponse<IDashboard[]>) => res.body ?? []))
      .pipe(
        map((dashboards: IDashboard[]) =>
          this.dashboardService.addDashboardToCollectionIfMissing<IDashboard>(dashboards, this.dashboardItem?.items)
        )
      )
      .subscribe((dashboards: IDashboard[]) => (this.dashboardsSharedCollection = dashboards));
  }
}
