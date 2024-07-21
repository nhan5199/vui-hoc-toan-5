import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KetNoiTriThucComponent } from './ket-noi-tri-thuc/ket-noi-tri-thuc.component';

export const routes: Routes = [{ path: '', component: KetNoiTriThucComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class KetNoiTriThucModule {}
