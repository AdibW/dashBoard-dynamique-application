import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardItemComponent } from './list/dashboard-item.component';
import { DashboardItemDetailComponent } from './detail/dashboard-item-detail.component';
import { DashboardItemUpdateComponent } from './update/dashboard-item-update.component';
import { DashboardItemDeleteDialogComponent } from './delete/dashboard-item-delete-dialog.component';
import { DashboardItemRoutingModule } from './route/dashboard-item-routing.module';

@NgModule({
  imports: [SharedModule, DashboardItemRoutingModule],
  declarations: [DashboardItemComponent, DashboardItemDetailComponent, DashboardItemUpdateComponent, DashboardItemDeleteDialogComponent],
})
export class DashboardItemModule {}
