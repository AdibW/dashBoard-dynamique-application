import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApi } from '../api.model';

@Component({
  selector: 'jhi-api-detail',
  templateUrl: './api-detail.component.html',
})
export class ApiDetailComponent implements OnInit {
  api: IApi | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ api }) => {
      this.api = api;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
