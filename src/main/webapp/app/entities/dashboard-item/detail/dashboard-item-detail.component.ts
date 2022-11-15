import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDashboardItem } from '../dashboard-item.model';

@Component({
  selector: 'jhi-dashboard-item-detail',
  templateUrl: './dashboard-item-detail.component.html',
})
export class DashboardItemDetailComponent implements OnInit {
  dashboardItem: IDashboardItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dashboardItem }) => {
      this.dashboardItem = dashboardItem;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
