import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IApiBannette, NewApiBannette } from '../api-bannette.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApiBannette for edit and NewApiBannetteFormGroupInput for create.
 */
type ApiBannetteFormGroupInput = IApiBannette | PartialWithRequiredKeyOf<NewApiBannette>;

type ApiBannetteFormDefaults = Pick<NewApiBannette, 'id'>;

type ApiBannetteFormGroupContent = {
  id: FormControl<IApiBannette['id'] | NewApiBannette['id']>;
  apiInitialLoad: FormControl<IApiBannette['apiInitialLoad']>;
  apiSearch: FormControl<IApiBannette['apiSearch']>;
};

export type ApiBannetteFormGroup = FormGroup<ApiBannetteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApiBannetteFormService {
  createApiBannetteFormGroup(apiBannette: ApiBannetteFormGroupInput = { id: null }): ApiBannetteFormGroup {
    const apiBannetteRawValue = {
      ...this.getFormDefaults(),
      ...apiBannette,
    };
    return new FormGroup<ApiBannetteFormGroupContent>({
      id: new FormControl(
        { value: apiBannetteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      apiInitialLoad: new FormControl(apiBannetteRawValue.apiInitialLoad),
      apiSearch: new FormControl(apiBannetteRawValue.apiSearch),
    });
  }

  getApiBannette(form: ApiBannetteFormGroup): IApiBannette | NewApiBannette {
    return form.getRawValue() as IApiBannette | NewApiBannette;
  }

  resetForm(form: ApiBannetteFormGroup, apiBannette: ApiBannetteFormGroupInput): void {
    const apiBannetteRawValue = { ...this.getFormDefaults(), ...apiBannette };
    form.reset(
      {
        ...apiBannetteRawValue,
        id: { value: apiBannetteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApiBannetteFormDefaults {
    return {
      id: null,
    };
  }
}
