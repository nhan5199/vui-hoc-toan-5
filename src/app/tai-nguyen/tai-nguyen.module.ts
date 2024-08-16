import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanCanBietComponent } from './cong-cu-ho-tro/ban-can-biet/ban-can-biet.component';
import { CongCuHoTroComponent } from './cong-cu-ho-tro/cong-cu-ho-tro.component';
import { FlashCardItemComponent } from './cong-cu-ho-tro/flash-card/flash-card-item/flash-card-item.component';
import { FlashCardComponent } from './cong-cu-ho-tro/flash-card/flash-card.component';
import { QuizzComponent } from './cong-cu-ho-tro/quizz/quizz.component';
import { SlideComponent } from './cong-cu-ho-tro/slide/slide.component';
import { ToanDanGianComponent } from './cong-cu-ho-tro/toan-dan-gian/toan-dan-gian.component';
import { CauHoiOnTapItemComponent } from './game-tuong-tac/cau-hoi-on-tap/cau-hoi-on-tap-item/cau-hoi-on-tap-item.component';
import { CauHoiOnTapComponent } from './game-tuong-tac/cau-hoi-on-tap/cau-hoi-on-tap.component';
import { GameTuongTacComponent } from './game-tuong-tac/game-tuong-tac.component';
import { TangramComponent } from './game-tuong-tac/tangram/tangram.component';
import { PhanMemToanHocComponent } from './phan-mem-toan-hoc/phan-mem-toan-hoc.component';
import { StemComponent } from './stem/stem.component';
import { TaiNguyenComponent } from './tai-nguyen/tai-nguyen.component';
import { VanBanQUyDinhComponent } from './van-ban-quy-dinh/van-ban-quy-dinh.component';
import { VideoMinhHoaComponent } from './video-minh-hoa/video-minh-hoa.component';

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
    path: 'game-tuong-tac/tangram',
    component: TangramComponent,
  },
  {
    path: 'game-tuong-tac/cau-hoi-on-tap',
    component: CauHoiOnTapComponent,
  },
  {
    path: 'game-tuong-tac/cau-hoi-on-tap/:topic',
    component: CauHoiOnTapItemComponent,
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
    path: 'cong-cu-ho-tro/flash-card/:item',
    component: FlashCardItemComponent,
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
