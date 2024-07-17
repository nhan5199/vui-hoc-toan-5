import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LessionPlanComponent } from './lession-plan/lession-plan.component';
import { ELessionPlanComponent } from './e-lession-plan/e-lession-plan.component';
import { ResourceComponent } from './resource/resource.component';
import { TestAndReviewComponent } from './test-and-review/test-and-review.component';
import { ParagraphComponent } from './test-and-review/paragraph/paragraph.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'ke-hoach-bai-day', component: LessionPlanComponent },
  {
    path: 'giao-an-dien-tu',
    component: ELessionPlanComponent,
  },
  {
    path: 'tai-nguyen',
    component: ResourceComponent,
  },
  {
    path: 'kiem-tra-danh-gia',
    component: TestAndReviewComponent,
  },
  {
    path: 'kiem-tra-danh-gia/van-ban',
    component: ParagraphComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
