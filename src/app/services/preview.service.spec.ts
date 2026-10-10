import { PreviewService } from './preview.service';

describe('PreviewService', () => {
  it('uses optimized pages and separate small covers without changing source paths', () => {
    const service = new PreviewService();
    service.register({ pages: { 'public/images/Bài 1.jpg': 'previews/page.webp' }, thumbnails: { 'public/images/Bài 1.jpg': 'previews/cover.webp' } });
    expect(service.url('images/B%C3%A0i%201.jpg')).toBe('previews/page.webp');
    expect(service.thumbnail('public/images/Bài 1.jpg')).toBe('previews/cover.webp');
  });
  it('falls back to encoded originals when no variant exists', () => {
    expect(new PreviewService().url('public/images/Bài 1.jpg')).toBe('images/B%C3%A0i%201.jpg');
  });
});
