import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApiComponent } from './list/api.component';
import { ApiDetailComponent } from './detail/api-detail.component';
import { ApiUpdateComponent } from './update/api-update.component';
import { ApiDeleteDialogComponent } from './delete/api-delete-dialog.component';
import { ApiRoutingModule } from './route/api-routing.module';

@NgModule({
  imports: [SharedModule, ApiRoutingModule],
  declarations: [ApiComponent, ApiDetailComponent, ApiUpdateComponent, ApiDeleteDialogComponent],
})
export class ApiModule {}
