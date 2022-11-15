import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDashboard } from '../dashboard.model';

@Component({
  selector: 'jhi-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
})
export class DashboardDetailComponent implements OnInit {
  dashboard: IDashboard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dashboard }) => {
      this.dashboard = dashboard;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
