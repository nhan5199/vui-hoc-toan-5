import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResourceLibraryComponent } from '../../resource-library/resource-library.component';

@Component({
  selector: 'app-ebook', standalone: true, imports: [ResourceLibraryComponent],
  template: '<app-resource-library kind="e-book" />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EBookComponent {}
