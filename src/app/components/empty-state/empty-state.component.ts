import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Code-native artwork stays crisp without another image download. */
@Component({
  selector: 'app-empty-state', standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="empty-state" role="status">
      <svg viewBox="0 0 320 210" aria-hidden="true">
        <ellipse cx="160" cy="187" rx="100" ry="12" fill="#c9d7fb" />
        <circle cx="160" cy="100" r="85" fill="#eaf4ff" />
        <g class="book">
          <path d="M79 67Q116 50 160 70Q204 50 241 67V160Q200 143 160 165Q120 143 79 160Z" fill="#fff" stroke="#3e6ccb" stroke-width="6" stroke-linejoin="round" />
          <path d="M160 70V165" stroke="#3e6ccb" stroke-width="4" />
          <path d="M93 79Q117 72 142 82M93 91Q117 84 142 94M179 81H220M179 94H210" fill="none" stroke="#b9d4ff" stroke-width="5" stroke-linecap="round" />
          <circle cx="136" cy="117" r="5" fill="#253d73" /><circle cx="184" cy="117" r="5" fill="#253d73" />
          <ellipse cx="119" cy="129" rx="10" ry="5" fill="#ffbfcc" /><ellipse cx="201" cy="129" rx="10" ry="5" fill="#ffbfcc" />
          <path d="M146 132Q160 147 174 132" fill="none" stroke="#253d73" stroke-width="4" stroke-linecap="round" />
        </g>
        <g class="sparkles" fill="#ffd45b"><path d="m58 38 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" /><path d="m258 111 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" /></g>
        <g transform="rotate(18 260 66)"><rect x="250" y="29" width="17" height="59" rx="5" fill="#ffcb55" stroke="#da9429" stroke-width="3" /><path d="m250 87 8 17 9-17" fill="#ffe9bb" stroke="#da9429" stroke-width="3" /><path d="m255 98 3 6 3-6" fill="#253d73" /><path d="M251 43h15" stroke="#fff" stroke-width="5" /></g>
        <text x="34" y="125" fill="#78a3eb" font-size="25" font-weight="bold">+</text><text x="214" y="40" fill="#a193df" font-size="25" font-weight="bold">×</text>
      </svg>
      <h2>{{ title }}</h2><p>{{ message }}</p>
      <button (click)="retry.emit()">{{ actionLabel }}</button>
    </section>`,
  styles: [`
    :host { display:block; }
    .empty-state { width:min(460px,100%); margin:2rem auto; padding:1.5rem; text-align:center; background:#fffdf5; border:3px solid #ffe2a1; border-radius:30px; box-shadow:0 8px 0 #efcb79; color:#304978; }
    svg { width:min(300px,100%); height:auto; }
    h2 { font-size:clamp(1.3rem,3vw,1.7rem); font-weight:800; margin:.5rem 0; }
    p { line-height:1.7; margin:.5rem 0 1rem; }
    button { border:0; border-radius:18px; padding:.75rem 1.25rem; color:#304978; background:#ffd969; font-weight:700; box-shadow:0 4px 0 #ddb249; transition:transform 180ms ease; }
    button:hover { transform:translateY(-2px); } button:active { transform:translateY(2px); }
    .book { transform-origin:center; animation:bob 3s ease-in-out infinite; }
    @keyframes bob { 50% { transform:translateY(-5px) rotate(-2deg); } }
    @media(prefers-reduced-motion:reduce) { .book { animation:none; } }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'Ối! Chưa có tài liệu ở đây';
  @Input() message = 'Bạn thử chọn học kì hoặc tuần khác nhé. Những bài học mới đang chờ chúng mình khám phá!';
  @Input() actionLabel = 'Thử lại nhé!';
  @Output() retry = new EventEmitter<void>();
}
