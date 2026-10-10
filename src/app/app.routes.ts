import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { assetCatalogResolver } from './services/asset-catalog.service';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'giao-vien', loadComponent: () => import('./teacher-library/teacher-library.component').then(m => m.TeacherLibraryComponent) },
  { path: 'hoc-sinh', loadComponent: () => import('./student-home/student-home.component').then(m => m.StudentHomeComponent) },
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
    loadComponent: () => import('./components/slide-display/slide-display.component').then(m => m.SlideDisplayComponent),
  },
  {
    path: ':bookName/e-book',
    loadComponent: () => import('./components/book-detail/ebook/ebook.component').then(m => m.EBookComponent),
  },

  {
    path: ':bookName/ke-hoach-bai-day',
    loadComponent: () => import('./components/book-detail/ke-hoach-bai-day/ke-hoach-bai-day.component').then(m => m.KeHoachBaiDayComponent),
  },
  {
    path: ':bookName/giao-an-dien-tu',
    loadComponent: () => import('./components/book-detail/giao-an-dien-tu/giao-an-dien-tu.component').then(m => m.GiaoAnDienTuComponent),
  },
  {
    path: ':bookName/phieu-bai-tap',
    loadComponent: () => import('./components/book-detail/phieu-bai-tap/phieu-bai-tap.component').then(m => m.PhieuBaiTapComponent),
  },

  {
    path: ':bookName/phan-phoi-chuong-trinh',
    loadComponent: () => import('./components/book-detail/phan-phoi-chuong-trinh/phan-phoi-chuong-trinh.component').then(m => m.PhanPhoiChuongTrinhComponent),
  },

  {
    path: ':bookName/cac-mon-khac',
    loadComponent: () => import('./components/book-detail/cac-mon-khac/cac-mon-khac.component').then(m => m.CacMonKhacComponent),
  },

  {
    path: ':bookName/cac-mon-khac/:subject',
    loadComponent: () => import('./components/book-detail/cac-mon-khac/giao-an-dien-tu-cac-mon-khac/giao-an-dien-tu-cac-mon-khac.component').then(m => m.GiaoAnDienTuCacMonKhacComponent),
  },
  {
    path: 'bai-kiem-tra',
    loadComponent: () => import('./bai-kiem-tra/bai-kiem-tra.component').then(m => m.BaiKiemTraComponent),
  },
  {
    path: 'bai-kiem-tra/danh-sach-cau-hoi',
    loadComponent: () => import('./bai-kiem-tra/danh-sach-cau-hoi/danh-sach-cau-hoi.component').then(m => m.DanhSachCauHoiComponent),
  },
  {
    path: 'danh-sach-bai-doc',
    loadComponent: () => import('./danh-sach-bai-doc/danh-sach-bai-doc.component').then(m => m.DanhSachBaiDocComponent),
  },
  {
    path: 'danh-sach-bai-doc/:bai-doc',
    loadComponent: () => import('./danh-sach-bai-doc/bai-doc/bai-doc.component').then(m => m.BaiDocComponent),
  },
];

for (const route of routes) {
  route.resolve = { ...route.resolve, assets: assetCatalogResolver };
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
