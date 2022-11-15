import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DataSourceComponent } from '../list/data-source.component';
import { DataSourceDetailComponent } from '../detail/data-source-detail.component';
import { DataSourceUpdateComponent } from '../update/data-source-update.component';
import { DataSourceRoutingResolveService } from './data-source-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dataSourceRoute: Routes = [
  {
    path: '',
    component: DataSourceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DataSourceDetailComponent,
    resolve: {
      dataSource: DataSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DataSourceUpdateComponent,
    resolve: {
      dataSource: DataSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DataSourceUpdateComponent,
    resolve: {
      dataSource: DataSourceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dataSourceRoute)],
  exports: [RouterModule],
})
export class DataSourceRoutingModule {}
