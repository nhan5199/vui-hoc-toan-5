import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaiNguyenComponent } from './tai-nguyen/tai-nguyen.component';

export const routes: Routes = [
  {
    path: '',
    component: TaiNguyenComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TaiNguyenModule {}
