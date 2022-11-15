import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWidgetType, NewWidgetType } from '../widget-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWidgetType for edit and NewWidgetTypeFormGroupInput for create.
 */
type WidgetTypeFormGroupInput = IWidgetType | PartialWithRequiredKeyOf<NewWidgetType>;

type WidgetTypeFormDefaults = Pick<NewWidgetType, 'id'>;

type WidgetTypeFormGroupContent = {
  id: FormControl<IWidgetType['id'] | NewWidgetType['id']>;
  name: FormControl<IWidgetType['name']>;
  widgetType: FormControl<IWidgetType['widgetType']>;
};

export type WidgetTypeFormGroup = FormGroup<WidgetTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WidgetTypeFormService {
  createWidgetTypeFormGroup(widgetType: WidgetTypeFormGroupInput = { id: null }): WidgetTypeFormGroup {
    const widgetTypeRawValue = {
      ...this.getFormDefaults(),
      ...widgetType,
    };
    return new FormGroup<WidgetTypeFormGroupContent>({
      id: new FormControl(
        { value: widgetTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(widgetTypeRawValue.name),
      widgetType: new FormControl(widgetTypeRawValue.widgetType),
    });
  }

  getWidgetType(form: WidgetTypeFormGroup): IWidgetType | NewWidgetType {
    return form.getRawValue() as IWidgetType | NewWidgetType;
  }

  resetForm(form: WidgetTypeFormGroup, widgetType: WidgetTypeFormGroupInput): void {
    const widgetTypeRawValue = { ...this.getFormDefaults(), ...widgetType };
    form.reset(
      {
        ...widgetTypeRawValue,
        id: { value: widgetTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WidgetTypeFormDefaults {
    return {
      id: null,
    };
  }
}
