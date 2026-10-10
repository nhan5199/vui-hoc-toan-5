import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-resource-skeleton', standalone: true, imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="status" role="status"><span class="spinner" aria-hidden="true"></span> Đang tìm tài liệu cho bạn…</div>
    <div class="skeleton-grid" [class.catalog]="catalog" aria-hidden="true">
      <div class="skeleton-card" *ngFor="let card of cards">
        <div class="cover shimmer"></div><div class="line shimmer"></div>
        <div class="line short shimmer"></div><div class="actions shimmer"></div>
      </div>
    </div>`,
  styles: [`
    :host { display:block; width:100%; margin:1rem auto; }
    .status { display:flex; align-items:center; justify-content:center; gap:.6rem; color:var(--ui-ink); background:var(--ui-cream); border-radius:16px; padding:.6rem; margin-bottom:1rem; }
    .spinner { width:20px; height:20px; border:3px solid #cce6ff; border-top-color:var(--ui-blue); border-radius:50%; animation:spin .8s linear infinite; }
    .skeleton-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1.25rem; }
    .skeleton-grid.catalog { grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr)); gap:1rem; }
    .skeleton-card { background:var(--ui-cream); border:3px solid #d5e7fb; border-radius:var(--ui-radius); padding:1.2rem; box-shadow:0 5px 0 #d5e7fb; }
    .cover { height:160px; border-radius:14px; margin-bottom:1rem; }
    .line { height:20px; margin:.7rem 0; border-radius:8px; }.short { width:60%; }.actions { height:46px; border-radius:14px; margin-top:1rem; }
    .shimmer { background:linear-gradient(100deg,#e6edf6 30%,#f6f9ff 50%,#e6edf6 70%); background-size:200% 100%; animation:shimmer 1.8s ease-in-out infinite; }
    @keyframes shimmer { from { background-position:100% 0; } to { background-position:-100% 0; } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @media(max-width:800px) { .skeleton-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media(max-width:480px) { .skeleton-grid { grid-template-columns:1fr; } }
    @media(prefers-reduced-motion:reduce) { .shimmer,.spinner { animation:none; } }
  `]
})
export class ResourceSkeletonComponent {
  @Input() count = 6;
  @Input() catalog = false;
  get cards(): number[] { return Array.from({ length: this.count }, (_, i) => i); }
}
