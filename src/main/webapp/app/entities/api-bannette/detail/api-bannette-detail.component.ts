import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApiBannette } from '../api-bannette.model';

@Component({
  selector: 'jhi-api-bannette-detail',
  templateUrl: './api-bannette-detail.component.html',
})
export class ApiBannetteDetailComponent implements OnInit {
  apiBannette: IApiBannette | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apiBannette }) => {
      this.apiBannette = apiBannette;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
