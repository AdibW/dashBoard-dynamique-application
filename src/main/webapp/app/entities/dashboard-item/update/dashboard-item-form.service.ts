import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDashboardItem, NewDashboardItem } from '../dashboard-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDashboardItem for edit and NewDashboardItemFormGroupInput for create.
 */
type DashboardItemFormGroupInput = IDashboardItem | PartialWithRequiredKeyOf<NewDashboardItem>;

type DashboardItemFormDefaults = Pick<NewDashboardItem, 'id'>;

type DashboardItemFormGroupContent = {
  id: FormControl<IDashboardItem['id'] | NewDashboardItem['id']>;
  x: FormControl<IDashboardItem['x']>;
  y: FormControl<IDashboardItem['y']>;
  rows: FormControl<IDashboardItem['rows']>;
  col: FormControl<IDashboardItem['col']>;
  item: FormControl<IDashboardItem['item']>;
  items: FormControl<IDashboardItem['items']>;
};

export type DashboardItemFormGroup = FormGroup<DashboardItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DashboardItemFormService {
  createDashboardItemFormGroup(dashboardItem: DashboardItemFormGroupInput = { id: null }): DashboardItemFormGroup {
    const dashboardItemRawValue = {
      ...this.getFormDefaults(),
      ...dashboardItem,
    };
    return new FormGroup<DashboardItemFormGroupContent>({
      id: new FormControl(
        { value: dashboardItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      x: new FormControl(dashboardItemRawValue.x),
      y: new FormControl(dashboardItemRawValue.y),
      rows: new FormControl(dashboardItemRawValue.rows),
      col: new FormControl(dashboardItemRawValue.col),
      item: new FormControl(dashboardItemRawValue.item),
      items: new FormControl(dashboardItemRawValue.items),
    });
  }

  getDashboardItem(form: DashboardItemFormGroup): IDashboardItem | NewDashboardItem {
    return form.getRawValue() as IDashboardItem | NewDashboardItem;
  }

  resetForm(form: DashboardItemFormGroup, dashboardItem: DashboardItemFormGroupInput): void {
    const dashboardItemRawValue = { ...this.getFormDefaults(), ...dashboardItem };
    form.reset(
      {
        ...dashboardItemRawValue,
        id: { value: dashboardItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DashboardItemFormDefaults {
    return {
      id: null,
    };
  }
}
