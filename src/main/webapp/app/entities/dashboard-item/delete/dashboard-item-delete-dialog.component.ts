import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDashboardItem } from '../dashboard-item.model';
import { DashboardItemService } from '../service/dashboard-item.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './dashboard-item-delete-dialog.component.html',
})
export class DashboardItemDeleteDialogComponent {
  dashboardItem?: IDashboardItem;

  constructor(protected dashboardItemService: DashboardItemService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.dashboardItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
