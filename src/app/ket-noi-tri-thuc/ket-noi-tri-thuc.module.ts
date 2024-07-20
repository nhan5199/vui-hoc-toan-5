import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EBookComponent } from './ebook/ebook.component';
import { GiaoAnDienTuComponent } from './giao-an-dien-tu/giao-an-dien-tu.component';
import { KeHoachBaiDayComponent } from './ke-hoach-bai-day/ke-hoach-bai-day.component';
import { PhieuBaiTapComponent } from './phieu-bai-tap/phieu-bai-tap.component';
import { KetNoiTriThucComponent } from './ket-noi-tri-thuc/ket-noi-tri-thuc.component';

export const routes: Routes = [
  { path: '', component: KetNoiTriThucComponent },
  { path: 'e-book', component: EBookComponent },
  { path: 'ke-hoach-bai-day', component: KeHoachBaiDayComponent },
  { path: 'giao-an-dien-tu', component: GiaoAnDienTuComponent },
  { path: 'phieu-bai-tap', component: PhieuBaiTapComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class KetNoiTriThucModule {}
