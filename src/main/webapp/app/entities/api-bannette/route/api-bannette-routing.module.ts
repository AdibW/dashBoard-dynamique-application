import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApiBannetteComponent } from '../list/api-bannette.component';
import { ApiBannetteDetailComponent } from '../detail/api-bannette-detail.component';
import { ApiBannetteUpdateComponent } from '../update/api-bannette-update.component';
import { ApiBannetteRoutingResolveService } from './api-bannette-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const apiBannetteRoute: Routes = [
  {
    path: '',
    component: ApiBannetteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApiBannetteDetailComponent,
    resolve: {
      apiBannette: ApiBannetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApiBannetteUpdateComponent,
    resolve: {
      apiBannette: ApiBannetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApiBannetteUpdateComponent,
    resolve: {
      apiBannette: ApiBannetteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(apiBannetteRoute)],
  exports: [RouterModule],
})
export class ApiBannetteRoutingModule {}
