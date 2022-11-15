import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWidget } from '../widget.model';

@Component({
  selector: 'jhi-widget-detail',
  templateUrl: './widget-detail.component.html',
})
export class WidgetDetailComponent implements OnInit {
  widget: IWidget | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ widget }) => {
      this.widget = widget;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
