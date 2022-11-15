import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApiComponent } from '../list/api.component';
import { ApiDetailComponent } from '../detail/api-detail.component';
import { ApiUpdateComponent } from '../update/api-update.component';
import { ApiRoutingResolveService } from './api-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const apiRoute: Routes = [
  {
    path: '',
    component: ApiComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApiDetailComponent,
    resolve: {
      api: ApiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApiUpdateComponent,
    resolve: {
      api: ApiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApiUpdateComponent,
    resolve: {
      api: ApiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(apiRoute)],
  exports: [RouterModule],
})
export class ApiRoutingModule {}
