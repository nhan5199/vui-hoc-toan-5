import { ChangeDetectorRef } from '@angular/core';
import { FlipBookComponent } from './flip-book.component';
import { PreviewService } from '../../services/preview.service';

describe('Flip book visible-page loading', () => {
  let book: FlipBookComponent;
  beforeEach(() => {
    book = new FlipBookComponent(new PreviewService(), { markForCheck: () => {} } as ChangeDetectorRef);
    book.listImgs = ['cover.jpg', 'page1.jpg', 'page2.jpg', 'page3.jpg', 'page4.jpg'];
  });
  afterEach(() => book.ngOnDestroy());
  const loaded = { target: { decode: () => Promise.resolve() } } as unknown as Event;
  it('shows the cover without waiting for hidden pages and then prefetches only the next spread', async () => {
    expect(book.shouldLoadPage(0)).toBeTrue();
    expect(book.shouldLoadPage(1)).toBeFalse();
    await book.pageLoaded(0, loaded);
    expect(book.isLoading).toBeFalse();
    expect(book.shouldLoadPage(1)).toBeTrue();
    expect(book.shouldLoadPage(2)).toBeTrue();
    expect(book.shouldLoadPage(3)).toBeFalse();
  });
  it('waits for exactly the visible spread after turning', async () => {
    book.onClick(1);
    expect(book.visiblePages).toEqual([1, 2]);
    await book.pageLoaded(1, loaded);
    expect(book.isLoading).toBeTrue();
    await book.pageLoaded(2, loaded);
    expect(book.isLoading).toBeFalse();
    expect(book.shouldLoadPage(0)).toBeTrue(); // Keep the outgoing cover during the turn animation.
  });
  it('bounds repeated forward and backward navigation', () => {
    for (let i = 0; i < 10; i++) book.onClick(1);
    expect(book.currentPageIndex).toBe(4);
    for (let i = 0; i < 10; i++) book.onClick(-1);
    expect(book.currentPageIndex).toBe(0);
  });
});
