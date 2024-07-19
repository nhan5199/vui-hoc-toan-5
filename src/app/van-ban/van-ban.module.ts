import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VanBAnComponent } from './van-ban/van-ban.component';

export const routes: Routes = [
  {
    path: '',
    component: VanBAnComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class VanBanModule {}
