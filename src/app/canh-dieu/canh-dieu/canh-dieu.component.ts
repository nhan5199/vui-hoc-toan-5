import { Component, OnInit } from '@angular/core';
import { BackgroundButtonComponent } from '../../components/background-button/background-button.component';
import { ActivatedRoute } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';

@Component({
  selector: 'app-canh-dieu',
  standalone: true,
  imports: [BackgroundButtonComponent, ListFileComponent],
  templateUrl: './canh-dieu.component.html',
  styleUrl: './canh-dieu.component.css',
})
export class CanhDieuComponent implements OnInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {}

  getListFile(event: string) {
    this.listFilePath = '';
    this.currentPath = '/';

    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
      });
    });
    this.listFilePath = this.currentPath + '/' + event;

    this.hiddenMenu = true;
    setTimeout(() => {
      this.appearListFile = true;
    }, 100);
  }
  onBack() {
    this.appearListFile = false;
    setTimeout(() => {
      this.hiddenMenu = false;
    }, 100);
  }
}
