import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWidget } from '../widget.model';
import { WidgetService } from '../service/widget.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './widget-delete-dialog.component.html',
})
export class WidgetDeleteDialogComponent {
  widget?: IWidget;

  constructor(protected widgetService: WidgetService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.widgetService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
