import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDataSource } from '../data-source.model';

@Component({
  selector: 'jhi-data-source-detail',
  templateUrl: './data-source-detail.component.html',
})
export class DataSourceDetailComponent implements OnInit {
  dataSource: IDataSource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dataSource }) => {
      this.dataSource = dataSource;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
