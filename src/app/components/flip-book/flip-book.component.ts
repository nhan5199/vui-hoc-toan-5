import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Constant from '../../shared/constants/Constant';
import { PreviewService } from '../../services/preview.service';
import { readPreference, writePreference } from '../../shared/public-preferences';

@Component({
  selector: 'app-flip-book', standalone: true, imports: [CommonModule],
  templateUrl: './flip-book.component.html', styleUrl: './flip-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipBookComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() folderPath = '';
  @Input() downloadUrl = '';
  @Output() closeFlipBook = new EventEmitter<boolean>();
  listImgs: string[] = [];
  currentPageIndex = 0;
  mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches;
  zoom = 1;
  resumed = false;
  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;
  private previousFocus?: HTMLElement;
  private previousOverflow?: string;
  private touch?: { x: number; y: number; time: number };
  private readyPages = new Set<number>();
  failedPages = new Set<number>();
  private revision = 0;
  private destroyed = false;
  prefetch = false;
  private departing: number[] = [];
  private turnTimer?: ReturnType<typeof setTimeout>;
  constructor(public previews: PreviewService, private cd: ChangeDetectorRef) {}

  // The cover is zero. After turning a leaf the visible spread is i-1, i.
  get visiblePages(): number[] {
    if (this.mobile) return this.listImgs.length ? [this.currentPageIndex] : [];
    return this.currentPageIndex === 0 ? [0] : [this.currentPageIndex - 1, this.currentPageIndex].filter(i => i < this.listImgs.length);
  }
  get lastIndex(): number { return this.mobile ? Math.max(0, this.listImgs.length - 1) : Math.max(0, Math.ceil((this.listImgs.length - 1) / 2) * 2); }
  get pageNumber(): number { return Math.min(this.currentPageIndex + 1, this.listImgs.length); }
  get pageLabel(): string {
    const pages = this.visiblePages.map(i => i + 1);
    return pages.length > 1 ? pages.join('–') : String(pages[0] ?? 0);
  }
  get isLoading(): boolean { return this.visiblePages.some(i => i < this.listImgs.length && !this.readyPages.has(i)); }
  get hasPageError(): boolean { return this.visiblePages.some(i => this.failedPages.has(i)); }
  ngOnChanges(): void {
    clearTimeout(this.turnTimer); this.departing = [];
    this.revision++;
    this.currentPageIndex = 0;
    this.zoom = 1; this.resumed = false;
    this.prefetch = false;
    this.readyPages.clear(); this.failedPages.clear();
    this.listImgs = Constant.findImages(this.folderPath).sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }));
    const saved = readPreference('reader:' + this.folderPath) as { page?: unknown } | null;
    if (saved && Number.isInteger(saved.page) && Number(saved.page) >= 0 && Number(saved.page) < this.listImgs.length) {
      this.currentPageIndex = this.indexForPage(Number(saved.page));
      this.resumed = this.currentPageIndex > 0;
    }
  }
  ngAfterViewInit(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.dialog?.nativeElement.querySelector<HTMLButtonElement>('.close-reader')?.focus();
  }
  shouldLoadPage(index: number): boolean {
    return this.departing.includes(index) || this.visiblePages.includes(index) || (this.prefetch && index > this.currentPageIndex && index <= this.currentPageIndex + 2);
  }
  async pageLoaded(index: number, event: Event): Promise<void> {
    const revision = this.revision;
    try { await (event.target as HTMLImageElement).decode(); } catch { }
    if (this.destroyed || revision !== this.revision) return;
    this.readyPages.add(index);
    if (!this.isLoading) this.prefetch = true;
    this.cd.markForCheck();
  }
  pageFailed(index: number): void {
    this.failedPages.add(index); this.readyPages.add(index);
    if (!this.isLoading) this.prefetch = true;
  }
  retry(): void {
    for (const i of this.visiblePages) { this.failedPages.delete(i); this.readyPages.delete(i); }
  }
  onClick(direction: number): void {
    const next = this.currentPageIndex + direction * (this.mobile ? 1 : 2);
    if (next < 0 || next > this.lastIndex || !this.listImgs.length) return;
    this.turnTo(next);
  }
  private turnTo(next: number): void {
    clearTimeout(this.turnTimer);
    this.departing = this.visiblePages;
    this.currentPageIndex = next;
    this.resumed = false;
    writePreference('reader:' + this.folderPath, { page: Math.min(next, this.listImgs.length - 1) });
    this.prefetch = !this.isLoading;
    this.turnTimer = setTimeout(() => { this.departing = []; this.cd.markForCheck(); }, 450);
  }
  private indexForPage(index: number): number { return this.mobile ? index : Math.ceil(index / 2) * 2; }
  jumpTo(value: string): void {
    const page = Number(value);
    if (!Number.isFinite(page) || !this.listImgs.length) return;
    this.turnTo(this.indexForPage(Math.max(0, Math.min(this.listImgs.length - 1, Math.trunc(page) - 1))));
  }
  changeZoom(direction: number): void { this.zoom = Math.max(1, Math.min(2.5, Math.round((this.zoom + direction * .25) * 100) / 100)); }
  touchStart(event: TouchEvent): void {
    this.touch = event.touches.length === 1 && this.zoom === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY, time: Date.now() } : undefined;
  }
  touchEnd(event: TouchEvent): void {
    const start = this.touch; this.touch = undefined;
    if (!start || this.zoom !== 1 || event.touches.length || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - start.time < 900) this.onClick(dx < 0 ? 1 : -1);
  }
  cancelTouch(): void { this.touch = undefined; }
  @HostListener('window:resize') resize(): void {
    const mobile = window.matchMedia('(max-width: 800px)').matches;
    if (mobile === this.mobile) return;
    const page = Math.min(this.currentPageIndex, this.listImgs.length - 1);
    this.mobile = mobile; this.zoom = 1;
    this.currentPageIndex = this.indexForPage(Math.max(0, page));
    this.prefetch = !this.isLoading;
  }
  flipPage(index: number): void { this.onClick(index % 2 === 0 ? 1 : -1); }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeFlipBook.emit(true);
    if (event.key === 'Tab' && this.dialog) {
      const controls = Array.from(this.dialog.nativeElement.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)'));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    if ((event.target as HTMLElement)?.matches?.('input, textarea, select')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); this.onClick(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }
  closeBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeFlipBook.emit(true);
  }
  ngOnDestroy(): void {
    this.destroyed = true; this.revision++; clearTimeout(this.turnTimer);
    if (this.previousOverflow !== undefined) document.body.style.overflow = this.previousOverflow;
    if (this.previousFocus?.isConnected) this.previousFocus.focus();
  }
}
