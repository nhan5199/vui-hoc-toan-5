import { Component, OnInit } from '@angular/core';
import { BackgroundButtonComponent } from '../../components/background-button/background-button.component';
import { ActivatedRoute } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';
import { LeftButtonDetailComponent } from '../../components/left-button-detail/left-button-detail.component';
import { RightButtonDetailComponent } from '../../components/right-button-detail/right-button-detail.component';

@Component({
  selector: 'app-canh-dieu',
  standalone: true,
  imports: [
    ListFileComponent,
    LeftButtonDetailComponent,
    RightButtonDetailComponent,
  ],
  templateUrl: './canh-dieu.component.html',
  styleUrl: './canh-dieu.component.css',
})
export class CanhDieuComponent implements OnInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  buttonName: string = '';
  routerName: string = '';

  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {}

  getListFile(event: any, buttonName: string, routerName: string) {
    this.listFilePath = '';
    this.currentPath = '/';

    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
      });
    });
    this.listFilePath = this.currentPath + '/' + event;

    this.buttonName = buttonName;
    this.routerName = routerName;

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
