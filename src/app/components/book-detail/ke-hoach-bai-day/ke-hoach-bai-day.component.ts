import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceLibraryComponent } from '../../resource-library/resource-library.component';

@Component({
  selector: 'app-ke-hoach-bai-day', standalone: true, imports: [ResourceLibraryComponent],
  template: '<app-resource-library kind="ke-hoach-bai-day" />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeHoachBaiDayComponent {}
