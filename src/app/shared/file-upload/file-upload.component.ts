import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit {
  uploadFileForm!: FormGroup;
  currentFile!: File;
  currentPath!: string;

  constructor(private fb: FormBuilder, private fileService: FileService) {}

  ngOnInit(): void {
    this.uploadFileForm = this.fb.group({
      type: ['ke-hoach-bai-day', Validators.required], //mặc định là Kế hoạch bài dạy,
      bookName: ['canh-dieu'], //loại sách
      file: [null, Validators.required],
    });
  }

  // Upload file
  onFileSelected(event: any): void {
    this.currentFile = event.target.files[0];
    this.currentPath = `${this.uploadFileForm.get('type')!.value}/${
      this.uploadFileForm.get('bookName')!.value
    }/${this.currentFile.name}`;

    if (this.currentFile) {
      this.uploadFileForm.get('file')?.setValue(this.currentFile.name);
    } else {
      this.uploadFileForm.get('file')?.setValue(null);
    }
  }

  onSubmit() {
    if (
      this.uploadFileForm.invalid ||
      this.uploadFileForm.get('file')?.value == null
    ) {
      return;
    }

    this.fileService
      .uploadFile(this.currentPath, this.currentFile)
      .subscribe((progress: any) => {});
  }
}
