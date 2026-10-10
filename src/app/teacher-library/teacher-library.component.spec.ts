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
    localStorage.removeItem('vht5:teacher-filters');
    library = new TeacherLibraryComponent({} as AssetCatalogService, {} as ChangeDetectorRef, {} as ActivatedRoute);
  });
  afterEach(() => localStorage.removeItem('vht5:teacher-filters'));
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
  it('filters unavailable downloads and restores filter preferences after reopening', () => {
    const previewOnly = { ...resource('2', 'Phân số'), downloadUrl: '' };
    library.all = [resource('1', 'Phân số'), previewOnly];
    library.query = 'phan so'; library.downloadableOnly = true; library.applyFilters();
    expect(library.filtered.map(item => item.id)).toEqual(['1']);
    const reopened = new TeacherLibraryComponent({} as AssetCatalogService, {} as ChangeDetectorRef, {} as ActivatedRoute);
    reopened.restoreFilters(); expect(reopened.query).toBe('phan so'); expect(reopened.downloadableOnly).toBeTrue();
    library.reset(); reopened.restoreFilters(); expect(reopened.query).toBe(''); expect(reopened.downloadableOnly).toBeFalse();
  });
  it('ignores malformed or obsolete saved filter values', () => {
    localStorage.setItem('vht5:teacher-filters', JSON.stringify({ book: 'unknown', week: '99', kind: 'unknown', downloadableOnly: 'true' }));
    library.restoreFilters(); expect(library.book).toBe(''); expect(library.week).toBe(''); expect(library.kind).toBe(''); expect(library.downloadableOnly).toBeFalse();
    localStorage.setItem('vht5:teacher-filters', '{broken');
    expect(() => library.restoreFilters()).not.toThrow();
  });
});
