import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import Constant from '../../shared/constants/Constant';
import { CommonModule } from '@angular/common';
import { VideoMinhHoaButtonComponent } from '../../components/buttons/video-minh-hoa-button/video-minh-hoa-button.component';
import { XemVideoComponent } from '../../components/xem-video/xem-video.component';

@Component({
  selector: 'app-video-minh-hoa',
  standalone: true,
  imports: [CommonModule, VideoMinhHoaButtonComponent, XemVideoComponent],
  templateUrl: './video-minh-hoa.component.html',
  styleUrl: './video-minh-hoa.component.css',
})
export class VideoMinhHoaComponent implements OnInit {
  currentPath: string = '';
  files: FileData[] = [];

  isDisplayVideo: boolean = false;
  slectedVideoUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');
        this.listFiles();
      });
    });
  }

  // List files
  listFiles(): void {
    this.files = [];
    this.fileService
      .getFilesList(this.currentPath.split('//')[1])
      .subscribe((files) => {
        files.forEach((file: any) => {
          this.files.push(file);
        });
      });
  }

  onViewVideo(event: string) {
    this.slectedVideoUrl = event;
    this.isDisplayVideo = true;
  }

  onCloseVideo(event: boolean) {
    if (event) this.isDisplayVideo = false;
  }
}
