import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaiNguyenComponent } from './tai-nguyen/tai-nguyen.component';
import { GameTuongTacComponent } from './game-tuong-tac/game-tuong-tac.component';
import { VanBanQUyDinhComponent } from './van-ban-quy-dinh/van-ban-quy-dinh.component';
import { CongCuHoTroComponent } from './cong-cu-ho-tro/cong-cu-ho-tro.component';
import { VideoMinhHoaComponent } from './video-minh-hoa/video-minh-hoa.component';
import { StemComponent } from './stem/stem.component';
import { PhanMemToanHocComponent } from './phan-mem-toan-hoc/phan-mem-toan-hoc.component';
import { FlashCardComponent } from './cong-cu-ho-tro/flash-card/flash-card.component';
import { SlideComponent } from './cong-cu-ho-tro/slide/slide.component';
import { QuizzComponent } from './cong-cu-ho-tro/quizz/quizz.component';
import { ToanDanGianComponent } from './cong-cu-ho-tro/toan-dan-gian/toan-dan-gian.component';
import { BanCanBietComponent } from './cong-cu-ho-tro/ban-can-biet/ban-can-biet.component';

export const routes: Routes = [
  {
    path: '',
    component: TaiNguyenComponent,
  },
  {
    path: 'van-ban-quy-dinh',
    component: VanBanQUyDinhComponent,
  },
  {
    path: 'video-minh-hoa',
    component: VideoMinhHoaComponent,
  },

  {
    path: 'stem',
    component: StemComponent,
  },
  {
    path: 'phan-mem-toan-hoc',
    component: PhanMemToanHocComponent,
  },
  {
    path: 'game-tuong-tac',
    component: GameTuongTacComponent,
  },
  {
    path: 'cong-cu-ho-tro',
    component: CongCuHoTroComponent,
  },
  {
    path: 'cong-cu-ho-tro/ban-can-biet',
    component: BanCanBietComponent,
  },
  {
    path: 'cong-cu-ho-tro/flash-card',
    component: FlashCardComponent,
  },
  {
    path: 'cong-cu-ho-tro/slide',
    component: SlideComponent,
  },
  {
    path: 'cong-cu-ho-tro/quizz',
    component: QuizzComponent,
  },
  {
    path: 'cong-cu-ho-tro/toan-dan-gian',
    component: ToanDanGianComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TaiNguyenModule {}
