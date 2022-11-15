import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WidgetComponent } from './list/widget.component';
import { WidgetDetailComponent } from './detail/widget-detail.component';
import { WidgetUpdateComponent } from './update/widget-update.component';
import { WidgetDeleteDialogComponent } from './delete/widget-delete-dialog.component';
import { WidgetRoutingModule } from './route/widget-routing.module';

@NgModule({
  imports: [SharedModule, WidgetRoutingModule],
  declarations: [WidgetComponent, WidgetDetailComponent, WidgetUpdateComponent, WidgetDeleteDialogComponent],
})
export class WidgetModule {}
