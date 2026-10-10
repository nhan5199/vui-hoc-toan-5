import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AssetCatalogService } from '../services/asset-catalog.service';
import { Resource } from '../shared/models/resource';
import { TeacherLibraryComponent } from './teacher-library.component';

describe('Teacher resource filtering', () => {
  let library: TeacherLibraryComponent;
  const resource = (id: string, title: string, extension = 'pdf'): Resource => ({
    id, name: title + '.' + extension, title, folder: 'canh-dieu/phieu-bai-tap/hoc-ki-1', textbook: 'canh-dieu',
    kind: 'phieu-bai-tap', semester: 'hoc-ki-1', week: null, extension, sizeBytes: 100, version: 'v1',
    downloadUrl: '/example.pdf', previewFolder: null, thumbnailUrl: null, status: 'published'
  });
  beforeEach(() => {
    library = new TeacherLibraryComponent({} as AssetCatalogService, {} as ChangeDetectorRef, {} as ActivatedRoute);
  });
  it('matches Vietnamese titles without requiring accents and combines type filters', () => {
    library.all = [resource('1', 'Phân số'), resource('2', 'Hình học'), resource('3', 'Phân số', 'pptx')];
    library.query = 'phan so'; library.extension = 'pdf'; library.book = 'canh-dieu';
    library.applyFilters();
    expect(library.filtered.map(resource => resource.id)).toEqual(['1']);
    library.semester = 'hoc-ki-2'; library.applyFilters();
    expect(library.filtered).toEqual([]);
  });
  it('shows 24 matching resources initially and adds cards only on request', () => {
    library.all = Array.from({ length: 60 }, (_, i) => resource(String(i), 'Bài ' + i));
    library.applyFilters(); expect(library.visible.length).toBe(24);
    library.more(); expect(library.visible.length).toBe(48);
    library.more(); expect(library.visible.length).toBe(60);
  });
});
