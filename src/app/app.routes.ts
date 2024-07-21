import { ChanTroiSangTaoModule } from './chan-troi-sang-tao/chan-troi-sang-tao.module';
import { KetNoiTriThucModule } from './ket-noi-tri-thuc/ket-noi-tri-thuc.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlipBookComponent } from './components/flip-book/flip-book.component';
import { SlideDisplayComponent } from './components/slide-display/slide-display.component';

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
    path: 'flip-book',
    component: FlipBookComponent,
  },
  {
    path: 'slide-display',
    component: SlideDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
