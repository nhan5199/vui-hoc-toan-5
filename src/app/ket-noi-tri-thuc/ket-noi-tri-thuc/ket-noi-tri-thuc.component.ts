import { Component, OnInit } from '@angular/core';
import { BackgroundButtonComponent } from '../../components/background-button/background-button.component';
import { ListFileComponent } from '../../components/list-file/list-file.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ket-noi-tri-thuc',
  standalone: true,
  imports: [BackgroundButtonComponent, ListFileComponent],
  templateUrl: './ket-noi-tri-thuc.component.html',
  styleUrl: './ket-noi-tri-thuc.component.css',
})
export class KetNoiTriThucComponent implements OnInit {
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
