import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDataSource } from '../data-source.model';
import { DataSourceService } from '../service/data-source.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './data-source-delete-dialog.component.html',
})
export class DataSourceDeleteDialogComponent {
  dataSource?: IDataSource;

  constructor(protected dataSourceService: DataSourceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.dataSourceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
