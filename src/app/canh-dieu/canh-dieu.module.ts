import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanhDieuComponent } from './canh-dieu/canh-dieu.component';

export const routes: Routes = [{ path: '', component: CanhDieuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class CanhDieuModule {}
