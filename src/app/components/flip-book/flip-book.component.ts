import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import Constant from '../../shared/constants/Constant';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-flip-book', standalone: true, imports: [CommonModule],
  templateUrl: './flip-book.component.html', styleUrl: './flip-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipBookComponent implements OnChanges, OnDestroy {
  @Input() folderPath = '';
  @Input() downloadUrl = '';
  @Output() closeFlipBook = new EventEmitter<boolean>();
  listImgs: string[] = [];
  currentPageIndex = 0;
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
    return this.currentPageIndex === 0 ? [0] : [this.currentPageIndex - 1, this.currentPageIndex].filter(i => i < this.listImgs.length);
  }
  get isLoading(): boolean { return this.visiblePages.some(i => i < this.listImgs.length && !this.readyPages.has(i)); }
  get hasPageError(): boolean { return this.visiblePages.some(i => this.failedPages.has(i)); }
  ngOnChanges(): void {
    clearTimeout(this.turnTimer); this.departing = [];
    this.revision++;
    this.currentPageIndex = 0;
    this.prefetch = false;
    this.readyPages.clear(); this.failedPages.clear();
    this.listImgs = Constant.findImages(this.folderPath).sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }));
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
    const next = this.currentPageIndex + direction * 2;
    if (next < 0 || next > this.listImgs.length || !this.listImgs.length) return;
    clearTimeout(this.turnTimer);
    this.departing = this.visiblePages;
    this.currentPageIndex = next;
    this.prefetch = !this.isLoading;
    this.turnTimer = setTimeout(() => { this.departing = []; this.cd.markForCheck(); }, 450);
  }
  flipPage(index: number): void { this.onClick(index % 2 === 0 ? 1 : -1); }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeFlipBook.emit(true);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); this.onClick(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }
  closeBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeFlipBook.emit(true);
  }
  ngOnDestroy(): void { this.destroyed = true; this.revision++; clearTimeout(this.turnTimer); }
}
