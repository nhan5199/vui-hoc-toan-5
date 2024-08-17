import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from '../../../services/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cac-mon-khac',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cac-mon-khac.component.html',
  styleUrl: './cac-mon-khac.component.css',
})
export class CacMonKhacComponent implements OnInit {
  folderPath: string = '';
  bookIconUrl: string = '';
  titleName: string = '';

  files: FileData[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath += urlSegment.map((segment) => segment.path).join('/');
      });

      if (this.folderPath.includes('canh-dieu')) {
        this.titleName = 'Cánh diều';
        this.bookIconUrl = 'images/images/canh-dieu-icon.jpg';
      } else if (this.folderPath.includes('ket-noi-tri-thuc')) {
        this.titleName = 'Kết nối tri thức với cuộc sống';
        this.bookIconUrl = 'images/images/ket-noi-tri-thuc-icon.jpg';
      } else {
        this.titleName = 'Chân trời sáng tạo';
        this.bookIconUrl = 'images/images/chan-troi-sang-tao-icon.jpg';
      }
    });
  }
}
