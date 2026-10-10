import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { Resource } from '../../shared/models/resource';
import Constant from '../../shared/constants/Constant';
import { DocumentPageComponent } from '../document-page/document-page.component';

/** One scrolling viewer for all catalog documents, using the exact preview folder. */
@Component({
  selector: 'app-resource-preview', standalone: true, imports: [CommonModule, DocumentPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="backdrop($event)" role="dialog" aria-modal="true" [attr.aria-label]="resource.title">
      <section class="preview ui-card">
        <header><h2>{{ resource.title }}</h2><a class="ui-button" *ngIf="resource.downloadUrl" [href]="resource.downloadUrl" download>Tải tài liệu</a><button class="ui-button secondary" (click)="close.emit()" aria-label="Đóng bản xem trước">Đóng ✕</button></header>
        <div class="pages">
          <p *ngIf="!pages.length">Chưa có bản xem trước. Bạn có thể tải tài liệu để mở trên thiết bị.</p>
          <app-document-page *ngFor="let page of pages; let i = index; trackBy: trackPage" [src]="page" [alt]="'Trang ' + (i + 1)" [eager]="i === 0" />
        </div>
      </section>
    </div>`,
  styles: [`
    .backdrop { position:fixed; inset:0; z-index:300; background:#101828cc; padding:2vh 4vw; }
    .preview { max-width:960px; margin:auto; height:96vh; background:white; border-radius:16px; display:flex; flex-direction:column; overflow:hidden; }
    header { display:flex; align-items:center; gap:1rem; padding:1rem; border-bottom:3px solid #c5e3ff; background:#edf6ff; }
    h2 { flex:1; font-size:1.1rem; margin:0; font-family:var(--ui-font); }
    a,button { border:0; padding:.6rem; border-radius:8px; background:#e8efff; color:#1748aa; text-decoration:none; }
    .pages { flex:1; min-height:0; overflow:auto; padding:1rem; }
    @media(max-width:600px) { header { flex-wrap:wrap; } h2 { flex-basis:100%; } }
  `]
})
export class ResourcePreviewComponent implements OnChanges {
  @Input({ required: true }) resource!: Pick<Resource, 'title' | 'downloadUrl' | 'previewFolder'>;
  @Output() close = new EventEmitter<void>();
  pages: string[] = [];
  trackPage = (_: number, page: string) => page;
  ngOnChanges(): void {
    this.pages = this.resource.previewFolder ? Constant.findImages(this.resource.previewFolder + '/').sort((a, b) => a.localeCompare(b, 'vi', { numeric: true })) : [];
  }
  backdrop(event: MouseEvent): void { if (event.target === event.currentTarget) this.close.emit(); }
  @HostListener('document:keydown.escape') escape(): void { this.close.emit(); }
}

