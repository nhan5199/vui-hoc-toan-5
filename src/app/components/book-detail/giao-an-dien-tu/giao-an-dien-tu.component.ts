import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceLibraryComponent } from '../../resource-library/resource-library.component';

@Component({
  selector: 'app-giao-an-dien-tu', standalone: true, imports: [ResourceLibraryComponent],
  template: '<app-resource-library kind="giao-an-dien-tu" />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiaoAnDienTuComponent {}
