import { Component, OnInit } from '@angular/core';
import { FileData, FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phan-mem-toan-hoc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phan-mem-toan-hoc.component.html',
  styleUrl: './phan-mem-toan-hoc.component.css',
})
export class PhanMemToanHocComponent implements OnInit {
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
