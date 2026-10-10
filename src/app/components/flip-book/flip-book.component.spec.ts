import { ChangeDetectorRef } from '@angular/core';
import { FlipBookComponent } from './flip-book.component';
import { PreviewService } from '../../services/preview.service';
import Constant from '../../shared/constants/Constant';

describe('Flip book visible-page loading', () => {
  let book: FlipBookComponent;
  beforeEach(() => {
    book = new FlipBookComponent(new PreviewService(), { markForCheck: () => {} } as ChangeDetectorRef);
    book.mobile = false;
    book.folderPath = '__reader-test__';
    book.listImgs = ['cover.jpg', 'page1.jpg', 'page2.jpg', 'page3.jpg', 'page4.jpg'];
  });
  afterEach(() => { book.ngOnDestroy(); localStorage.removeItem('vht5:reader:__reader-test__'); });
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
  it('moves one page on mobile, ignores vertical swipes and does not turn while zoomed', () => {
    book.mobile = true;
    const start = { touches: [{ clientX: 250, clientY: 100 }] } as unknown as TouchEvent;
    const end = (x: number, y: number) => ({ touches: [], changedTouches: [{ clientX: x, clientY: y }] } as unknown as TouchEvent);
    book.touchStart(start); book.touchEnd(end(80, 105));
    expect(book.visiblePages).toEqual([1]);
    book.touchStart(start); book.touchEnd(end(240, 300));
    expect(book.currentPageIndex).toBe(1);
    book.changeZoom(1); book.touchStart(start); book.touchEnd(end(80, 105));
    expect(book.currentPageIndex).toBe(1);
    book.jumpTo('999'); expect(book.currentPageIndex).toBe(4);
    book.onClick(1); expect(book.currentPageIndex).toBe(4);
  });
  it('restores a valid reading position and ignores positions outside the current book', () => {
    const images = [...book.listImgs];
    spyOn(Constant, 'findImages').and.returnValue(images);
    book.mobile = true; book.jumpTo('4'); book.ngOnChanges();
    expect(book.currentPageIndex).toBe(3); expect(book.resumed).toBeTrue();
    expect(book.shouldLoadPage(0)).toBeFalse();
    localStorage.setItem('vht5:reader:__reader-test__', JSON.stringify({ page: 1000 }));
    book.ngOnChanges(); expect(book.currentPageIndex).toBe(0);
    localStorage.setItem('vht5:reader:__reader-test__', '{broken');
    expect(() => book.ngOnChanges()).not.toThrow();
  });
  it('keeps navigation usable when browser storage is blocked', () => {
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    book.onClick(1); expect(book.currentPageIndex).toBe(2);
  });
});
