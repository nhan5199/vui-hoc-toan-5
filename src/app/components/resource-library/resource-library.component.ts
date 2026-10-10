import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileData, FileService } from '../../services/file.service';
import { PreviewService } from '../../services/preview.service';
import Constant from '../../shared/constants/Constant';
import { EBookButtonComponent } from '../buttons/ebook-button/ebook-button.component';
import { KeHoachBaiDayButtonComponent } from '../buttons/ke-hoach-bai-day-button/ke-hoach-bai-day-button.component';
import { GiaoAnDienTuButtonComponent } from '../buttons/giao-an-dien-tu-button/giao-an-dien-tu-button.component';
import { PhieuBaiTapButtonComponent } from '../buttons/phieu-bai-tap-button/phieu-bai-tap-button.component';
import { FlipBookComponent } from '../flip-book/flip-book.component';
import { XemPdfComponent } from '../xem-pdf/xem-pdf.component';
import { XemSlideComponent } from '../xem-slide/xem-slide.component';
import { ResourcePreviewComponent } from '../resource-preview/resource-preview.component';
import { Resource } from '../../shared/models/resource';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ResourceSkeletonComponent } from '../resource-skeleton/resource-skeleton.component';

export type ResourceKind = 'e-book' | 'ke-hoach-bai-day' | 'giao-an-dien-tu' | 'phieu-bai-tap';
interface PreviewSelection { name: string; url: string; }
@Component({
  selector: 'app-resource-library', standalone: true,
  imports: [CommonModule, FormsModule, EBookButtonComponent, KeHoachBaiDayButtonComponent, GiaoAnDienTuButtonComponent, PhieuBaiTapButtonComponent, FlipBookComponent, XemPdfComponent, XemSlideComponent, ResourcePreviewComponent, EmptyStateComponent, ResourceSkeletonComponent],
  templateUrl: './resource-library.component.html',
  styleUrl: './resource-library.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceLibraryComponent implements OnInit {
  @Input({ required: true }) kind!: ResourceKind;
  private destroyRef = inject(DestroyRef);
  private requests = new Subject<{ append: boolean; token?: string }>();
  bookName = '';
  path = '';
  files: FileData[] = [];
  semester = 'hoc-ki-1';
  week = 'tuan-1';
  loading = true;
  appending = false;
  error = false;
  unavailable = false;
  localPreview?: Pick<Resource, 'title' | 'downloadUrl' | 'previewFolder'>;
  get availableFiles(): FileData[] { return this.files.filter(file => !!file.url); }
  get unavailableFiles(): FileData[] { return this.files.filter(file => !file.url); }
  nextPageToken?: string;
  selection?: PreviewSelection;
  viewer: 'flip' | 'pdf' | 'slide' = 'pdf';
  trackFile = (_: number, file: FileData) => file.resource?.id ?? (file.url || file.previewFolder || file.name);
  get bookIcon(): string { return `images/images/${this.bookName}-icon.jpg`; }
  get legacyPath(): string { return '//' + this.path; }
  get weeks(): number[] { return Array.from({ length: 18 }, (_, i) => i + (this.semester === 'hoc-ki-1' ? 1 : 19)); }
  get folder(): string { return this.path + (this.kind === 'e-book' ? '' : '/' + this.semester) + (this.kind === 'giao-an-dien-tu' ? '/' + this.week : ''); }
  get title(): string {
    const names: Record<ResourceKind, string> = { 'e-book': 'E-book', 'ke-hoach-bai-day': 'Kế hoạch bài dạy', 'giao-an-dien-tu': 'Thư viện bài giảng điện tử', 'phieu-bai-tap': 'Ngân hàng Phiếu bài tập' };
    const books: Record<string, string> = { 'canh-dieu': 'Cánh Diều', 'chan-troi-sang-tao': 'Chân trời sáng tạo', 'ket-noi-tri-thuc': 'Kết nối tri thức' };
    return names[this.kind] + ' — ' + (books[this.bookName] ?? '');
  }
  constructor(private route: ActivatedRoute, private fileService: FileService, private cd: ChangeDetectorRef, private previews: PreviewService) {}
  ngOnInit(): void {
    this.requests.pipe(
      tap(request => { this.loading = true; this.appending = request.append; this.error = false; if (!request.append) this.files = this.fileService.getLocalPreviewsPage(this.folder).files; this.cd.markForCheck(); }),
      switchMap(request => this.fileService.getFilesPage(this.folder, request.token).pipe(
        tap(page => { this.files = request.append ? [...this.files, ...page.files] : page.files; this.nextPageToken = page.nextPageToken; this.unavailable = !!page.unavailable || this.files.some(file => !file.url); }),
        catchError(() => { this.error = true; return of(null); })
      )), takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => { this.loading = false; this.cd.markForCheck(); });
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.bookName = params.get('bookName') ?? '';
      this.path = this.route.snapshot.pathFromRoot.flatMap(route => route.url.map(segment => segment.path)).join('/');
      this.reload();
    });
  }
  reload(): void { this.nextPageToken = undefined; this.selection = undefined; this.localPreview = undefined; this.unavailable = false; this.requests.next({ append: false }); }
  retryDownloads(): void { this.fileService.refreshFolder(this.folder); this.reload(); }
  changeSemester(): void { this.week = this.semester === 'hoc-ki-1' ? 'tuan-1' : 'tuan-19'; this.reload(); }
  more(): void { if (!this.loading && this.nextPageToken) this.requests.next({ append: true, token: this.nextPageToken }); }
  thumbnail(file: FileData): string {
    const folder = file.previewFolder ?? file.resource?.previewFolder ?? this.folder + '/' + file.name.replace(/\.[^.]+$/, '') + '/';
    const image = Constant.findImages(folder)[0];
    return image ? this.previews.thumbnail(image) : this.bookIcon;
  }
  openLocal(file: FileData): void { this.localPreview = { title: file.name, downloadUrl: '', previewFolder: file.previewFolder ?? null }; }
  open(selection: PreviewSelection): void {
    this.selection = selection;
    this.viewer = this.kind === 'giao-an-dien-tu' ? 'slide' : this.kind === 'e-book' && selection.name.includes('SGK') ? 'flip' : 'pdf';
  }
}
