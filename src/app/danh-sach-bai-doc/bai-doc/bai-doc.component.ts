import { ContentData } from './../../shared/bai-doc.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BaiDocService, InterPreterData } from '../../shared/bai-doc.service';
import { BaiDoc360PopupComponent } from './popup/bai-doc-360-popup/bai-doc-360-popup.component';
import { BaiDocPopupComponent } from './popup/bai-doc-popup/bai-doc-popup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bai-doc',
  standalone: true,
  imports: [BaiDoc360PopupComponent, BaiDocPopupComponent, CommonModule],
  templateUrl: './bai-doc.component.html',
  styleUrl: './bai-doc.component.css',
})
export class BaiDocComponent implements OnInit {
  @ViewChild('contentContainer', { static: false })
  contentContainer!: ElementRef;
  displayPopup: boolean = false;

  is360Img: boolean = false;
  popupImgUrl: string = '';
  popupTitle: string = '';
  popupDescription: string = '';

  isLoading = true;
  readingUrl: string = '';
  listInterpreterData: InterPreterData[] = [];
  contentData!: ContentData;

  constructor(
    private baiDocService: BaiDocService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.baiDocService.getAllContentData().subscribe((data: any) => {
      data.forEach((item: any) => {
        if (item.url == this.readingUrl) {
          this.contentData = item;
          this.isLoading = false;

          const content = this.contentData.content;
          this.contentContainer.nativeElement.innerHTML = content;

          // ✅ Find ALL clickable spans
          const clickableEls =
            this.contentContainer.nativeElement.querySelectorAll('.clickable');

          clickableEls.forEach((el: Element) => {
            const text = el.textContent?.trim();
            if (text) {
              el.addEventListener('click', () => this.onClick(text));
            }
          });
        }
      });
    });
    this.route.paramMap.subscribe((params) => {
      this.readingUrl = params.get('bai-doc') ?? '';
    });

    this.baiDocService
      .getAllInterpreterData(this.readingUrl)
      .subscribe((data) => {
        //lấy dât tù db theo tên bài đọc
        this.listInterpreterData = data;
      });
  }

  onClick(text: any) {
    this.displayPopup = true;

    //Tìm kiếm trên DB
    let interpreterData: InterPreterData | undefined =
      this.listInterpreterData.find(
        (x) => x.text.toLowerCase() == text.toLowerCase()
      );

    this.is360Img = interpreterData?.is360Img == 1;
    this.popupImgUrl =
      'images/images/bai-doc/' +
      this.readingUrl +
      '/' +
      interpreterData?.imgUrl;
    this.popupTitle = interpreterData?.title ?? '';
    this.popupDescription = interpreterData?.description ?? '';
  }

  onClosePopup() {
    this.displayPopup = false;
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Close only if clicked directly on the backdrop
    if (target.classList.contains('backdrop')) {
      this.onClosePopup();
    }
  }

  ngAfterViewInit() {}
}
