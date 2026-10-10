import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DocumentPageComponent } from './document-page.component';
import { PreviewService } from '../../services/preview.service';

describe('DocumentPageComponent readiness', () => {
  let page: DocumentPageComponent;
  beforeEach(() => {
    page = new DocumentPageComponent(new ElementRef(document.createElement('div')),
      { markForCheck: () => {}, detectChanges: () => {} } as ChangeDetectorRef, new PreviewService());
    page.src = 'page.jpg';
  });
  afterEach(() => page.ngOnDestroy());

  it('does not request a distant page before it approaches the viewport', () => {
    page.ngOnChanges();
    page.ngAfterViewInit();
    expect(page.visible).toBeFalse();
    expect(page.loaded).toBeFalse();
  });

  it('keeps loading active until image decoding finishes', async () => {
    let finish!: () => void;
    const decoded = new Promise<void>(resolve => { finish = resolve; });
    page.eager = true;
    page.ngOnChanges();
    page.ngAfterViewInit();
    const settled = spyOn(page.settled, 'emit');
    const work = page.onLoad({ target: { decode: () => decoded, naturalWidth: 1600, naturalHeight: 900 } } as unknown as Event);
    expect(page.loaded).toBeFalse();
    expect(settled).not.toHaveBeenCalled();
    finish();
    await work;
    expect(page.loaded).toBeTrue();
    expect(page.ratio).toBe('1600 / 900');
    expect(settled).toHaveBeenCalledTimes(1);
  });

  it('ignores decoding results from a previous source', async () => {
    let finish!: () => void;
    const decoded = new Promise<void>(resolve => { finish = resolve; });
    page.ngOnChanges();
    const work = page.onLoad({ target: { decode: () => decoded, naturalWidth: 1600, naturalHeight: 900 } } as unknown as Event);
    page.src = 'new-page.jpg';
    page.ngOnChanges();
    finish();
    await work;
    expect(page.loaded).toBeFalse();
  });
});
