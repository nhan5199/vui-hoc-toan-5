import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';
import { BookButtonComponent } from '../../components/book-button/book-button.component';

@Component({
  selector: 'app-tai-nguyen',
  standalone: true,
  imports: [BookButtonComponent],
  templateUrl: './tai-nguyen.component.html',
  styleUrl: './tai-nguyen.component.css',
})
export class TaiNguyenComponent implements OnInit {
  currentPath: string = '/';
  listFilePath: string = '';

  hiddenMenu: boolean = false;
  appearListFile: boolean = false;

  buttonName: string = '';
  routerName: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {}

  getListFile(event: string, buttonName: string, routerName: string) {
    //đưa đến danh sách câu hỏi ôn tập
    if (routerName == 'bai-on-tap') {
      this.router.navigateByUrl('bai-on-tap');
    }

    //đưa đến trang danh sách file
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
