import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Resource } from '../shared/models/resource';
import { AssetCatalogService } from '../services/asset-catalog.service';
import { ResourcePreviewComponent } from '../components/resource-preview/resource-preview.component';
import { EmptyStateComponent } from '../components/empty-state/empty-state.component';

@Component({
  selector: 'app-teacher-library', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ResourcePreviewComponent, EmptyStateComponent],
  templateUrl: './teacher-library.component.html', styleUrl: './teacher-library.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherLibraryComponent implements OnInit {
  all: Resource[] = [];
  filtered: Resource[] = [];
  visible: Resource[] = [];
  query = '';
  book = '';
  kind = '';
  semester = '';
  week = '';
  extension = '';
  loading = false;
  error = false;
  selected?: Resource;
  books = [{ value: 'canh-dieu', label: 'Cánh Diều' }, { value: 'chan-troi-sang-tao', label: 'Chân trời sáng tạo' }, { value: 'ket-noi-tri-thuc', label: 'Kết nối tri thức' }];
  kinds = [{ value: 'e-book', label: 'Sách điện tử' }, { value: 'ke-hoach-bai-day', label: 'Kế hoạch bài dạy' }, { value: 'giao-an-dien-tu', label: 'Bài giảng điện tử' }, { value: 'phieu-bai-tap', label: 'Phiếu bài tập' }];
  extensions: string[] = [];
  weeks = Array.from({ length: 36 }, (_, i) => i + 1);
  trackResource = (_: number, resource: Resource) => resource.id;
  constructor(private catalog: AssetCatalogService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {}
  async ngOnInit(): Promise<void> {
    this.book = this.route.snapshot.queryParamMap.get('book') ?? '';
    await this.loadCatalog();
  }
  async loadCatalog(): Promise<void> {
    this.loading = true;
    this.error = false;
    try { await this.catalog.loadResources(); } catch { this.error = true; }
    this.all = Array.from(this.catalog.resources.values()).flat().filter(resource => resource.status === 'published');
    this.extensions = [...new Set(this.all.map(resource => resource.extension))].sort();
    this.applyFilters();
    this.loading = false; this.cd.markForCheck();
  }
  applyFilters(): void {
    const query = this.normalize(this.query);
    this.filtered = this.all.filter(resource => (!query || this.normalize(resource.title).includes(query))
      && (!this.book || resource.textbook === this.book)
      && (!this.kind || resource.kind === this.kind)
      && (!this.semester || resource.semester === this.semester)
      && (!this.week || resource.week === Number(this.week))
      && (!this.extension || resource.extension === this.extension));
    this.visible = this.filtered.slice(0, 24);
  }
  more(): void { this.visible = this.filtered.slice(0, this.visible.length + 24); }
  reset(): void { this.query = this.book = this.kind = this.semester = this.week = this.extension = ''; this.applyFilters(); }
  size(bytes: number): string { return bytes < 1024 * 1024 ? Math.ceil(bytes / 1024) + ' KB' : (bytes / (1024 * 1024)).toFixed(1) + ' MB'; }
  async preview(resource: Resource): Promise<void> {
    this.loading = true; this.error = false;
    try {
      const section = resource.previewFolder?.split('/')[3];
      if (section && ['canh-dieu', 'chan-troi-sang-tao', 'ket-noi-tri-thuc', 'tai-nguyen', 'bai-doc', 'slide'].includes(section)) await this.catalog.load(section);
      this.selected = resource;
    } catch { this.error = true; }
    finally { this.loading = false; this.cd.markForCheck(); }
  }
  private normalize(value: string): string { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd'); }
}
