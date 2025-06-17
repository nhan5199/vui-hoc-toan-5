import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EBookComponent } from './components/book-detail/ebook/ebook.component';
import { GiaoAnDienTuComponent } from './components/book-detail/giao-an-dien-tu/giao-an-dien-tu.component';
import { KeHoachBaiDayComponent } from './components/book-detail/ke-hoach-bai-day/ke-hoach-bai-day.component';
import { PhieuBaiTapComponent } from './components/book-detail/phieu-bai-tap/phieu-bai-tap.component';
import { SlideDisplayComponent } from './components/slide-display/slide-display.component';
import { HomeComponent } from './home/home.component';
import { CacMonKhacComponent } from './components/book-detail/cac-mon-khac/cac-mon-khac.component';
import { PhanPhoiChuongTrinhComponent } from './components/book-detail/phan-phoi-chuong-trinh/phan-phoi-chuong-trinh.component';
import { GiaoAnDienTuCacMonKhacComponent } from './components/book-detail/cac-mon-khac/giao-an-dien-tu-cac-mon-khac/giao-an-dien-tu-cac-mon-khac.component';
import { BaiKiemTraComponent } from './bai-kiem-tra/bai-kiem-tra.component';
import { BaiDocComponent } from './danh-sach-bai-doc/bai-doc/bai-doc.component';
import { DanhSachBaiDocComponent } from './danh-sach-bai-doc/danh-sach-bai-doc.component';
import { DanhSachCauHoiComponent } from './bai-kiem-tra/danh-sach-cau-hoi/danh-sach-cau-hoi.component';
export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'canh-dieu',
    loadChildren: () =>
      import('./canh-dieu/canh-dieu.module').then((m) => m.CanhDieuModule),
  },
  {
    path: 'ket-noi-tri-thuc',
    loadChildren: () =>
      import('./ket-noi-tri-thuc/ket-noi-tri-thuc.module').then(
        (m) => m.KetNoiTriThucModule
      ),
  },
  {
    path: 'chan-troi-sang-tao',
    loadChildren: () =>
      import('./chan-troi-sang-tao/chan-troi-sang-tao.module').then(
        (m) => m.ChanTroiSangTaoModule
      ),
  },
  {
    path: 'van-ban',
    loadChildren: () =>
      import('./van-ban/van-ban.module').then((m) => m.VanBanModule),
  },
  {
    path: 'tai-nguyen',
    loadChildren: () =>
      import('./tai-nguyen/tai-nguyen.module').then((m) => m.TaiNguyenModule),
  },
  {
    path: 'doc-slide',
    component: SlideDisplayComponent,
  },
  {
    path: ':bookName/e-book',
    component: EBookComponent,
  },

  {
    path: ':bookName/ke-hoach-bai-day',
    component: KeHoachBaiDayComponent,
  },
  {
    path: ':bookName/giao-an-dien-tu',
    component: GiaoAnDienTuComponent,
  },
  {
    path: ':bookName/phieu-bai-tap',
    component: PhieuBaiTapComponent,
  },

  {
    path: ':bookName/phan-phoi-chuong-trinh',
    component: PhanPhoiChuongTrinhComponent,
  },

  {
    path: ':bookName/cac-mon-khac',
    component: CacMonKhacComponent,
  },

  {
    path: ':bookName/cac-mon-khac/:subject',
    component: GiaoAnDienTuCacMonKhacComponent,
  },
  {
    path: 'bai-kiem-tra',
    component: BaiKiemTraComponent,
  },
  {
    path: 'bai-kiem-tra/danh-sach-cau-hoi',
    component: DanhSachCauHoiComponent,
  },
  {
    path: 'danh-sach-bai-doc',
    component: DanhSachBaiDocComponent,
  },
  {
    path: 'danh-sach-bai-doc/:bai-doc',
    component: BaiDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
