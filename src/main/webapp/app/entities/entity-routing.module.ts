import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        data: { pageTitle: 'dashBoardDynamiqueApp.dashboard.home.title' },
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'dashboard-item',
        data: { pageTitle: 'dashBoardDynamiqueApp.dashboardItem.home.title' },
        loadChildren: () => import('./dashboard-item/dashboard-item.module').then(m => m.DashboardItemModule),
      },
      {
        path: 'widget',
        data: { pageTitle: 'dashBoardDynamiqueApp.widget.home.title' },
        loadChildren: () => import('./widget/widget.module').then(m => m.WidgetModule),
      },
      {
        path: 'widget-type',
        data: { pageTitle: 'dashBoardDynamiqueApp.widgetType.home.title' },
        loadChildren: () => import('./widget-type/widget-type.module').then(m => m.WidgetTypeModule),
      },
      {
        path: 'data-source',
        data: { pageTitle: 'dashBoardDynamiqueApp.dataSource.home.title' },
        loadChildren: () => import('./data-source/data-source.module').then(m => m.DataSourceModule),
      },
      {
        path: 'api',
        data: { pageTitle: 'dashBoardDynamiqueApp.api.home.title' },
        loadChildren: () => import('./api/api.module').then(m => m.ApiModule),
      },
      {
        path: 'api-bannette',
        data: { pageTitle: 'dashBoardDynamiqueApp.apiBannette.home.title' },
        loadChildren: () => import('./api-bannette/api-bannette.module').then(m => m.ApiBannetteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
