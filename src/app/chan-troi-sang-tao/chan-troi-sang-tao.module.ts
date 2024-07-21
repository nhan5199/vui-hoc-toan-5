import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChanTroiSangTaoComponent } from './chan-troi-sang-tao/chan-troi-sang-tao.component';

export const routes: Routes = [
  { path: '', component: ChanTroiSangTaoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ChanTroiSangTaoModule {}
