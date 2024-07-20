import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListFileComponent } from '../../components/list-file/list-file.component';

@Component({
  selector: 'app-ebook',
  standalone: true,
  imports: [ListFileComponent],
  templateUrl: './ebook.component.html',
  styleUrl: './ebook.component.css',
})
export class EBookComponent implements OnInit {
  currentPath: string = '';

  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.currentPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');
      });
    });
  }
}
