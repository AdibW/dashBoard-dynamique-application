import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WidgetComponent } from '../list/widget.component';
import { WidgetDetailComponent } from '../detail/widget-detail.component';
import { WidgetUpdateComponent } from '../update/widget-update.component';
import { WidgetRoutingResolveService } from './widget-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const widgetRoute: Routes = [
  {
    path: '',
    component: WidgetComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WidgetDetailComponent,
    resolve: {
      widget: WidgetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WidgetUpdateComponent,
    resolve: {
      widget: WidgetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WidgetUpdateComponent,
    resolve: {
      widget: WidgetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(widgetRoute)],
  exports: [RouterModule],
})
export class WidgetRoutingModule {}
