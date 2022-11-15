import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWidget, NewWidget } from '../widget.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWidget for edit and NewWidgetFormGroupInput for create.
 */
type WidgetFormGroupInput = IWidget | PartialWithRequiredKeyOf<NewWidget>;

type WidgetFormDefaults = Pick<NewWidget, 'id'>;

type WidgetFormGroupContent = {
  id: FormControl<IWidget['id'] | NewWidget['id']>;
  name: FormControl<IWidget['name']>;
  title: FormControl<IWidget['title']>;
  componentName: FormControl<IWidget['componentName']>;
  componentType: FormControl<IWidget['componentType']>;
  widget: FormControl<IWidget['widget']>;
};

export type WidgetFormGroup = FormGroup<WidgetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WidgetFormService {
  createWidgetFormGroup(widget: WidgetFormGroupInput = { id: null }): WidgetFormGroup {
    const widgetRawValue = {
      ...this.getFormDefaults(),
      ...widget,
    };
    return new FormGroup<WidgetFormGroupContent>({
      id: new FormControl(
        { value: widgetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(widgetRawValue.name),
      title: new FormControl(widgetRawValue.title),
      componentName: new FormControl(widgetRawValue.componentName),
      componentType: new FormControl(widgetRawValue.componentType),
      widget: new FormControl(widgetRawValue.widget),
    });
  }

  getWidget(form: WidgetFormGroup): IWidget | NewWidget {
    return form.getRawValue() as IWidget | NewWidget;
  }

  resetForm(form: WidgetFormGroup, widget: WidgetFormGroupInput): void {
    const widgetRawValue = { ...this.getFormDefaults(), ...widget };
    form.reset(
      {
        ...widgetRawValue,
        id: { value: widgetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WidgetFormDefaults {
    return {
      id: null,
    };
  }
}
