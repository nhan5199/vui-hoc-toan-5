import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData, FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { ListFileComponent } from '../../components/list-file/list-file.component';

@Component({
  selector: 'app-van-ban',
  standalone: true,
  imports: [CommonModule, ListFileComponent],
  templateUrl: './van-ban.component.html',
  styleUrl: './van-ban.component.css',
})
export class VanBAnComponent implements OnInit {
  currentPath: string = '';
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
        console.log('data: ', this.currentPath);
      });
    });
  }
}
