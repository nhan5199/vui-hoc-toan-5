import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { PreviewService } from '../../services/preview.service';

/** Reserves page space and requests an image only as it approaches the viewport. */
@Component({
  selector: 'app-document-page', standalone: true, imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="document-page" [style.aspect-ratio]="ratio" [attr.aria-busy]="!loaded && visible && !failed">
      <div class="loading-file" *ngIf="visible && !loaded && !failed" role="status" aria-label="Đang tải trang">
        <img src="images/images/file-loading.gif" alt="" />
      </div>
      <img *ngIf="visible && !failed" [src]="previews.url(src)" [alt]="alt" decoding="async"
        [class.loaded]="loaded" (load)="onLoad($event)" (error)="onError()" />
      <button *ngIf="failed" class="page-retry" (click)="retry()">Không tải được trang. Thử lại</button>
    </div>`,
  styles: [`
    :host { display:block; width:100%; margin-bottom:1rem; }
    .document-page { position:relative; width:100%; background:#f2f4f8; border-radius:10px; overflow:hidden; }
    .document-page > img { display:block; width:100%; height:auto; opacity:0; transition:opacity 180ms ease-out; }
    .document-page > img.loaded { opacity:1; }
    .loading-file { width:70px; height:auto; }
    .page-retry { position:absolute; inset:0; border:0; background:#f2f4f8; color:#334155; padding:1rem; }
  `]
})
export class DocumentPageComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() src = '';
  @Input() alt = '';
  @Input() eager = false;
  @Input() ratio = '210 / 297';
  @Output() settled = new EventEmitter<void>();
  visible = false;
  loaded = false;
  failed = false;
  private observer?: IntersectionObserver;
  private destroyed = false;
  private revision = 0;
  constructor(private host: ElementRef<HTMLElement>, private cd: ChangeDetectorRef, public previews: PreviewService) {}

  ngOnChanges(): void {
    this.revision++;
    this.loaded = this.failed = false;
    if (this.eager) this.visible = true;
  }
  ngAfterViewInit(): void {
    if (this.eager || typeof IntersectionObserver === 'undefined') {
      this.visible = true;
      this.cd.detectChanges();
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.visible = true;
        this.observer?.disconnect();
        this.cd.markForCheck();
      }
    }, { rootMargin: '400px' });
    this.observer.observe(this.host.nativeElement);
  }
  async onLoad(event: Event): Promise<void> {
    const revision = this.revision;
    const img = event.target as HTMLImageElement;
    try { await img.decode(); } catch { /* Load already succeeded on older browsers. */ }
    if (this.destroyed || revision !== this.revision) return;
    this.ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    this.loaded = true;
    this.settled.emit();
    this.cd.markForCheck();
  }
  onError(): void { this.failed = true; this.settled.emit(); }
  retry(): void { this.failed = false; this.loaded = false; }
  ngOnDestroy(): void { this.destroyed = true; this.observer?.disconnect(); }
}
