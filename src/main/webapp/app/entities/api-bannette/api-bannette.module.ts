import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApiBannetteComponent } from './list/api-bannette.component';
import { ApiBannetteDetailComponent } from './detail/api-bannette-detail.component';
import { ApiBannetteUpdateComponent } from './update/api-bannette-update.component';
import { ApiBannetteDeleteDialogComponent } from './delete/api-bannette-delete-dialog.component';
import { ApiBannetteRoutingModule } from './route/api-bannette-routing.module';

@NgModule({
  imports: [SharedModule, ApiBannetteRoutingModule],
  declarations: [ApiBannetteComponent, ApiBannetteDetailComponent, ApiBannetteUpdateComponent, ApiBannetteDeleteDialogComponent],
})
export class ApiBannetteModule {}
