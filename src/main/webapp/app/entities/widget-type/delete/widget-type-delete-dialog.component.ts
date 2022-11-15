import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWidgetType } from '../widget-type.model';
import { WidgetTypeService } from '../service/widget-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './widget-type-delete-dialog.component.html',
})
export class WidgetTypeDeleteDialogComponent {
  widgetType?: IWidgetType;

  constructor(protected widgetTypeService: WidgetTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.widgetTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
