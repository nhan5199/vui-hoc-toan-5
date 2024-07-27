import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';
import { BookButtonComponent } from '../../components/book-button/book-button.component';

@Component({
  selector: 'app-canh-dieu',
  standalone: true,
  imports: [ListFileComponent, BookButtonComponent],
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
  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath += urlSegment.map((segment) => segment.path).join('/');
        console.log(this.currentPath);
      });
    });
  }

  getListFile(event: any, buttonName: string, routerName: string) {
    this.listFilePath = '';
    this.currentPath = '/';

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

  getBookLogo() {
    if (this.currentPath.includes('canh-dieu')) {
      return 'images/images/canh-dieu-icon.jpg';
    } else if (this.currentPath.includes('chan-troi-sang-tao')) {
      return 'images/images/chan-troi-sang-tao-icon.jpg';
    } else {
      return 'images/images/ket-noi-tri-thuc-icon.jpg';
    }
  }
}
