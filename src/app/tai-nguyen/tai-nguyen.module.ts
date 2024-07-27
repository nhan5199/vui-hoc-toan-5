import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaiNguyenComponent } from './tai-nguyen/tai-nguyen.component';
import { GameTuongTacComponent } from './game-tuong-tac/game-tuong-tac.component';

export const routes: Routes = [
  {
    path: '',
    component: TaiNguyenComponent,
  },
  {
    path: 'van-ban-quy-dinh',
    component: TaiNguyenComponent,
  },
  {
    path: 'video-minh-hoa',
    component: TaiNguyenComponent,
  },
  {
    path: 'cong-cu-ho-tro',
    component: TaiNguyenComponent,
  },

  {
    path: 'stem',
    component: TaiNguyenComponent,
  },
  {
    path: 'phan-mem-toan-hoc',
    component: TaiNguyenComponent,
  },
  {
    path: 'game-tuong-tac',
    component: GameTuongTacComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TaiNguyenModule {}
