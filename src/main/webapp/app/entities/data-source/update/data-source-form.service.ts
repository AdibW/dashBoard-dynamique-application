import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDataSource, NewDataSource } from '../data-source.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDataSource for edit and NewDataSourceFormGroupInput for create.
 */
type DataSourceFormGroupInput = IDataSource | PartialWithRequiredKeyOf<NewDataSource>;

type DataSourceFormDefaults = Pick<NewDataSource, 'id'>;

type DataSourceFormGroupContent = {
  id: FormControl<IDataSource['id'] | NewDataSource['id']>;
  type: FormControl<IDataSource['type']>;
  dataSource: FormControl<IDataSource['dataSource']>;
};

export type DataSourceFormGroup = FormGroup<DataSourceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DataSourceFormService {
  createDataSourceFormGroup(dataSource: DataSourceFormGroupInput = { id: null }): DataSourceFormGroup {
    const dataSourceRawValue = {
      ...this.getFormDefaults(),
      ...dataSource,
    };
    return new FormGroup<DataSourceFormGroupContent>({
      id: new FormControl(
        { value: dataSourceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      type: new FormControl(dataSourceRawValue.type),
      dataSource: new FormControl(dataSourceRawValue.dataSource),
    });
  }

  getDataSource(form: DataSourceFormGroup): IDataSource | NewDataSource {
    return form.getRawValue() as IDataSource | NewDataSource;
  }

  resetForm(form: DataSourceFormGroup, dataSource: DataSourceFormGroupInput): void {
    const dataSourceRawValue = { ...this.getFormDefaults(), ...dataSource };
    form.reset(
      {
        ...dataSourceRawValue,
        id: { value: dataSourceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DataSourceFormDefaults {
    return {
      id: null,
    };
  }
}
