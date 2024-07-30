import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { KeHoachBaiDayButtonComponent } from '../../buttons/ke-hoach-bai-day-button/ke-hoach-bai-day-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ke-hoach-bai-day',
  standalone: true,
  imports: [KeHoachBaiDayButtonComponent, FormsModule, CommonModule],
  templateUrl: './ke-hoach-bai-day.component.html',
  styleUrl: './ke-hoach-bai-day.component.css',
})
export class KeHoachBaiDayComponent implements OnInit {
  bookName: string = '';
  bookIconUrl: string = '';
  folderPath: string = '';
  // files: FileData[] = [];

  files: any[] = [];
  selectedSemester = 'hoc-ki-1';
  options = [
    { value: 'hoc-ki-1', label: 'Học kì 1' },
    { value: 'hoc-ki-2', label: 'Học kì 2' },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fileService: FileService
  ) {}

  ngOnInit(): void {
    this.bookName = this.route.snapshot.paramMap.get('bookName')!;
    this.bookIconUrl = `images/images/${this.bookName}-icon.jpg`;
    this.route.pathFromRoot.forEach((route) => {
      route.url.subscribe((urlSegment) => {
        this.folderPath +=
          '/' + urlSegment.map((segment) => segment.path).join('/');

        // this.listFiles();
        this.getListTempFiles();
      });
    });
  }

  onChangeSemester() {
    if (this.selectedSemester == 'hoc-ki-2') {
      this.files = [
        {
          name: 'Tuần 19',
          url: '',
        },
        {
          name: 'Tuần 20',
          url: '',
        },

        {
          name: 'Tuần 21',
          url: '',
        },
        {
          name: 'Tuần 22',
          url: '',
        },
        {
          name: 'Tuần 23',
          url: '',
        },

        {
          name: 'Tuần 24',
          url: '',
        },

        {
          name: 'Tuần 25',
          url: '',
        },

        {
          name: 'Tuần 26',
          url: '',
        },

        {
          name: 'Tuần 27',
          url: '',
        },

        {
          name: 'Tuần 28',
          url: '',
        },

        {
          name: 'Tuần 29',
          url: '',
        },

        {
          name: 'Tuần 30',
          url: '',
        },

        {
          name: 'Tuần 31',
          url: '',
        },

        {
          name: 'Tuần 32',
          url: '',
        },

        {
          name: 'Tuần 33',
          url: '',
        },

        {
          name: 'Tuần 34',
          url: '',
        },

        {
          name: 'Tuần 35',
          url: '',
        },

        {
          name: 'Tuần 36',
          url: '',
        },
      ];
    } else {
      this.files = [
        {
          name: 'Tuần 1',
          url: '',
        },
        {
          name: 'Tuần 2',
          url: '',
        },

        {
          name: 'Tuần 3',
          url: '',
        },
        {
          name: 'Tuần 4',
          url: '',
        },
        {
          name: 'Tuần 5',
          url: '',
        },

        {
          name: 'Tuần 6',
          url: '',
        },

        {
          name: 'Tuần 7',
          url: '',
        },

        {
          name: 'Tuần 8',
          url: '',
        },

        {
          name: 'Tuần 9',
          url: '',
        },

        {
          name: 'Tuần 10',
          url: '',
        },

        {
          name: 'Tuần 11',
          url: '',
        },

        {
          name: 'Tuần 12',
          url: '',
        },

        {
          name: 'Tuần 13',
          url: '',
        },

        {
          name: 'Tuần 14',
          url: '',
        },

        {
          name: 'Tuần 15',
          url: '',
        },

        {
          name: 'Tuần 16',
          url: '',
        },

        {
          name: 'Tuần 17',
          url: '',
        },

        {
          name: 'Tuần 18',
          url: '',
        },
      ];
    }
  }

  getListTempFiles() {
    this.files = [
      {
        name: 'Tuần 1',
        url: '',
      },
      {
        name: 'Tuần 2',
        url: '',
      },

      {
        name: 'Tuần 3',
        url: '',
      },
      {
        name: 'Tuần 4',
        url: '',
      },
      {
        name: 'Tuần 5',
        url: '',
      },

      {
        name: 'Tuần 6',
        url: '',
      },

      {
        name: 'Tuần 7',
        url: '',
      },

      {
        name: 'Tuần 8',
        url: '',
      },

      {
        name: 'Tuần 9',
        url: '',
      },

      {
        name: 'Tuần 10',
        url: '',
      },

      {
        name: 'Tuần 11',
        url: '',
      },

      {
        name: 'Tuần 12',
        url: '',
      },

      {
        name: 'Tuần 13',
        url: '',
      },

      {
        name: 'Tuần 14',
        url: '',
      },

      {
        name: 'Tuần 15',
        url: '',
      },

      {
        name: 'Tuần 16',
        url: '',
      },

      {
        name: 'Tuần 17',
        url: '',
      },

      {
        name: 'Tuần 18',
        url: '',
      },
    ];
  }

  listFiles(): void {
    this.files = [];
    this.fileService.getFilesList(this.folderPath).subscribe((files) => {
      files.forEach((file: any) => {
        this.files.push(file);
      });
    });
  }

  getTitle() {
    if (this.bookName == 'canh-dieu') {
      return 'Cánh Diều';
    } else if (this.bookName == 'chan-troi-sang-tao') {
      return 'Chân trời sáng tạo';
    } else {
      return 'Kết nối tri thức với cuộc sống';
    }
  }
}
