import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-home', standalone: true, imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main><nav><a routerLink="/">Trang chủ</a><a routerLink="/giao-vien">Góc giáo viên</a></nav>
      <h1>Hôm nay mình học Toán nhé!</h1><p>Chọn bộ sách đang học và bắt đầu từng bước.</p>
      <section><h2>1. Ôn bài trong sách</h2><p>Mở sách, tìm bài đang học và đọc lại ví dụ.</p><div class="books"><a *ngFor="let book of books" [routerLink]="['/',book.path,'e-book']"><img [src]="'images/images/' + book.path + '-icon.jpg'" [alt]="book.name" loading="lazy" /><span>{{ book.name }}</span></a></div></section>
      <section><h2>2. Thử sức với bài tập</h2><p>Làm từng câu, kiểm tra đáp án và thử lại câu chưa đúng.</p><a class="action" routerLink="/bai-kiem-tra">Làm bài tập</a><a class="action" routerLink="/tai-nguyen/game-tuong-tac/cau-hoi-on-tap">Câu hỏi ôn tập</a></section>
      <section><h2>3. Học qua trò chơi</h2><p>Khám phá các trò chơi và công cụ học Toán cùng thầy cô.</p><a class="action" routerLink="/tai-nguyen">Khám phá tài nguyên</a></section>
    </main>`,
  styles: [`
    :host { display:block; min-height:100svh; background:linear-gradient(#1748aa 0 96px,#f4f8ff 96px); color:#243451; }
    main { max-width:1000px; margin:auto; padding:6rem 1rem 2rem; } nav { display:flex; gap:1rem; }
    h1 { margin-top:2rem; font-size:clamp(1.8rem,5vw,2.6rem); } section { background:white; border-radius:20px; padding:1.5rem; margin:1.5rem 0; } h2 { font-size:1.4rem; }
    .books { display:flex; flex-wrap:wrap; gap:1rem; } .books a { flex:1 1 180px; display:flex; align-items:center; gap:1rem; padding:1rem; background:#eaf1ff; border-radius:14px; text-decoration:none; } .books img { width:64px; height:64px; object-fit:contain; }
    .action { display:inline-block; margin:.5rem .5rem 0 0; padding:.8rem 1rem; border-radius:12px; background:#1748aa; color:white; text-decoration:none; } .books a,.action { transition:transform 180ms ease; } .books a:hover,.action:hover { transform:translateY(-2px); }
  `]
})
export class StudentHomeComponent {
  books = [{ path: 'canh-dieu', name: 'Cánh Diều' }, { path: 'chan-troi-sang-tao', name: 'Chân trời sáng tạo' }, { path: 'ket-noi-tri-thuc', name: 'Kết nối tri thức' }];
}
