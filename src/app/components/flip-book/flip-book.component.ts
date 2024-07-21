import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FileService } from '../../services/file.service';
import Constant from '../../shared/constants/Constant';

@Component({
  selector: 'app-flip-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-book.component.html',
  styleUrl: './flip-book.component.css',
})
export class FlipBookComponent implements OnInit {
  @ViewChildren('panelRef') panels: QueryList<ElementRef> =
    new QueryList<ElementRef>();

  imageFolderPath: string = '';
  imageDownloadUrl: string = '';
  listImagePaths: string[] = [];
  content: any[] = [];

  loading: boolean = true;

  constructor(
    private readonly fileService: FileService,
    private cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.imageFolderPath = this.fileService.getImageFolderPath();
    this.imageDownloadUrl = this.fileService.getImageDownloadUrl();
    if (this.imageFolderPath?.length > 0) {
      console.log(Constant.IMAGE_PATHS.images);
      this.listImagePaths = Constant.IMAGE_PATHS.images.filter((x) =>
        x.includes(this.imageFolderPath)
      );

      let path = `${this.imageFolderPath}`;
      let imgPaths = this.listImagePaths.filter((x) => x.includes(path));
      this.sortImagePathsByNumber(imgPaths);

      for (let i = 0; i < imgPaths.length; i += 2) {
        let item = {
          front: imgPaths[i].split('public/')[1],
          back:
            i + 1 >= imgPaths.length
              ? '/assets/imgs/last-page.png'
              : imgPaths[i + 1].split('public/')[1],
        };
        this.content.push(item);
      }
    }
  }

  sortImagePathsByNumber(paths: string[]) {
    paths.sort((a, b) => {
      const numA = this.extractNumber(a);
      const numB = this.extractNumber(b);
      return numA - numB;
    });
  }

  extractNumber(path: string): number {
    const regex = /-images-(\d+)\.jpg$/;
    const match = path.match(regex);
    return match ? parseInt(match[1], 10) : 0;
  }

  ngAfterViewInit(): void {
    this.panels.changes.subscribe(() => {
      // This code will run when the QueryList is updated
      const panelElements: ElementRef[] = this.panels.toArray();

      // You can now access the panel elements and work with them
      const panels: HTMLElement[] = Array.from(
        document.querySelectorAll('.panel')
      );
      const numPanels: number = panels.length;

      // if a panel is open, lower its z-idx
      // otherwise, set zIdx back to the original
      function checkZ(aPanel: HTMLElement) {
        if (aPanel.classList.contains('open')) {
          setTimeout(() => {
            aPanel.style.zIndex = '1';
          }, 800);
        } else {
          // set z-index back to original stored in data
          const zIdx = Number(aPanel.dataset['zIdx']);
          aPanel.style.zIndex = zIdx.toString();
        }
      }

      // loop through all panels and reverse sort via zIdx
      panels.forEach((panel, i) => {
        const zIdx: number = numPanels - i; // Specify the type of zIdx
        panel.style.zIndex = zIdx.toString();
        panel.dataset['zIdx'] = zIdx.toString();
      });

      const imgs: HTMLElement[] = Array.from(
        document.querySelectorAll('.panel img')
      );

      imgs.forEach((img) => {
        img.addEventListener('click', (event) => {
          const target = img.parentElement?.parentElement as HTMLElement;
          const panel = target.closest('.panel') as HTMLElement;
          if (panel) {
            if (
              target.classList.contains('front') ||
              target.classList.contains('back')
            ) {
              panel.classList.toggle('open');
              checkZ(panel);
            }
          }
          event.stopPropagation();
        });
      });
    });

    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 0);
  }

  onBack() {
    this.location.back();
  }
}
