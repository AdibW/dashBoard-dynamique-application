import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DashboardItemComponent } from '../list/dashboard-item.component';
import { DashboardItemDetailComponent } from '../detail/dashboard-item-detail.component';
import { DashboardItemUpdateComponent } from '../update/dashboard-item-update.component';
import { DashboardItemRoutingResolveService } from './dashboard-item-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dashboardItemRoute: Routes = [
  {
    path: '',
    component: DashboardItemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DashboardItemDetailComponent,
    resolve: {
      dashboardItem: DashboardItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DashboardItemUpdateComponent,
    resolve: {
      dashboardItem: DashboardItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DashboardItemUpdateComponent,
    resolve: {
      dashboardItem: DashboardItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardItemRoute)],
  exports: [RouterModule],
})
export class DashboardItemRoutingModule {}
