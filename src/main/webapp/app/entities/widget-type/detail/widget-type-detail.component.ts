import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWidgetType } from '../widget-type.model';

@Component({
  selector: 'jhi-widget-type-detail',
  templateUrl: './widget-type-detail.component.html',
})
export class WidgetTypeDetailComponent implements OnInit {
  widgetType: IWidgetType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ widgetType }) => {
      this.widgetType = widgetType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
