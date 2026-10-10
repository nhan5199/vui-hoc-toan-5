import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceLibraryComponent } from '../../resource-library/resource-library.component';

@Component({
  selector: 'app-phieu-bai-tap', standalone: true, imports: [ResourceLibraryComponent],
  template: '<app-resource-library kind="phieu-bai-tap" />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhieuBaiTapComponent {}
