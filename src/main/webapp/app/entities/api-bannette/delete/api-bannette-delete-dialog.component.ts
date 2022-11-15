import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IApiBannette } from '../api-bannette.model';
import { ApiBannetteService } from '../service/api-bannette.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './api-bannette-delete-dialog.component.html',
})
export class ApiBannetteDeleteDialogComponent {
  apiBannette?: IApiBannette;

  constructor(protected apiBannetteService: ApiBannetteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.apiBannetteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
