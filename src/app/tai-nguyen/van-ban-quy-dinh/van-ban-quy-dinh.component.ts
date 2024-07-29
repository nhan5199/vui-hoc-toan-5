import { Component, OnInit } from '@angular/core';
import { VanBanButtonComponent } from '../../components/van-ban-button/van-ban-button.component';
import { FileData, FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-van-ban-quy-dinh',
  standalone: true,
  imports: [VanBanButtonComponent, CommonModule],
  templateUrl: './van-ban-quy-dinh.component.html',
  styleUrl: './van-ban-quy-dinh.component.css',
})
export class VanBanQUyDinhComponent implements OnInit {
  folderPath: string = '';
  files: FileData[] = [];
  constructor(
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        this.listFiles();
      });
    });
  }

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });
    });
  }
}
