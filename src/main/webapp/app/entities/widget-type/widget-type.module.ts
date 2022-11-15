import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WidgetTypeComponent } from './list/widget-type.component';
import { WidgetTypeDetailComponent } from './detail/widget-type-detail.component';
import { WidgetTypeUpdateComponent } from './update/widget-type-update.component';
import { WidgetTypeDeleteDialogComponent } from './delete/widget-type-delete-dialog.component';
import { WidgetTypeRoutingModule } from './route/widget-type-routing.module';

@NgModule({
  imports: [SharedModule, WidgetTypeRoutingModule],
  declarations: [WidgetTypeComponent, WidgetTypeDetailComponent, WidgetTypeUpdateComponent, WidgetTypeDeleteDialogComponent],
})
export class WidgetTypeModule {}
