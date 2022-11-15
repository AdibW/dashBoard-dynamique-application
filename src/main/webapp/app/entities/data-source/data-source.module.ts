import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DataSourceComponent } from './list/data-source.component';
import { DataSourceDetailComponent } from './detail/data-source-detail.component';
import { DataSourceUpdateComponent } from './update/data-source-update.component';
import { DataSourceDeleteDialogComponent } from './delete/data-source-delete-dialog.component';
import { DataSourceRoutingModule } from './route/data-source-routing.module';

@NgModule({
  imports: [SharedModule, DataSourceRoutingModule],
  declarations: [DataSourceComponent, DataSourceDetailComponent, DataSourceUpdateComponent, DataSourceDeleteDialogComponent],
})
export class DataSourceModule {}
