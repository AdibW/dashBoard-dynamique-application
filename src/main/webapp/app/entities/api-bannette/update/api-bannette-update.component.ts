import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ApiBannetteFormService, ApiBannetteFormGroup } from './api-bannette-form.service';
import { IApiBannette } from '../api-bannette.model';
import { ApiBannetteService } from '../service/api-bannette.service';

@Component({
  selector: 'jhi-api-bannette-update',
  templateUrl: './api-bannette-update.component.html',
})
export class ApiBannetteUpdateComponent implements OnInit {
  isSaving = false;
  apiBannette: IApiBannette | null = null;

  editForm: ApiBannetteFormGroup = this.apiBannetteFormService.createApiBannetteFormGroup();

  constructor(
    protected apiBannetteService: ApiBannetteService,
    protected apiBannetteFormService: ApiBannetteFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ apiBannette }) => {
      this.apiBannette = apiBannette;
      if (apiBannette) {
        this.updateForm(apiBannette);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const apiBannette = this.apiBannetteFormService.getApiBannette(this.editForm);
    if (apiBannette.id !== null) {
      this.subscribeToSaveResponse(this.apiBannetteService.update(apiBannette));
    } else {
      this.subscribeToSaveResponse(this.apiBannetteService.create(apiBannette));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApiBannette>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(apiBannette: IApiBannette): void {
    this.apiBannette = apiBannette;
    this.apiBannetteFormService.resetForm(this.editForm, apiBannette);
  }
}
