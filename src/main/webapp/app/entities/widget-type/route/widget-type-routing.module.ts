import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WidgetTypeComponent } from '../list/widget-type.component';
import { WidgetTypeDetailComponent } from '../detail/widget-type-detail.component';
import { WidgetTypeUpdateComponent } from '../update/widget-type-update.component';
import { WidgetTypeRoutingResolveService } from './widget-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const widgetTypeRoute: Routes = [
  {
    path: '',
    component: WidgetTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WidgetTypeDetailComponent,
    resolve: {
      widgetType: WidgetTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WidgetTypeUpdateComponent,
    resolve: {
      widgetType: WidgetTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WidgetTypeUpdateComponent,
    resolve: {
      widgetType: WidgetTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(widgetTypeRoute)],
  exports: [RouterModule],
})
export class WidgetTypeRoutingModule {}
