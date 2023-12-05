import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayTableComponent } from '../display-table/display-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../../service/data.service';
import { ApiServiceService } from '../../service/api-service.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    DisplayTableComponent,
    MatProgressBarModule,
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
})
export class ImportComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  isFileOver: boolean = false;
  fileUploaded: boolean = false;
  isLoading: boolean = false;
  dataService: DataService = inject(DataService);
  apiService: ApiServiceService = inject(ApiServiceService);

  constructor(private _snackBar: MatSnackBar) {}

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.handleFileInput(event.dataTransfer!.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = true;
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isFileOver = false;
  }

  onFileSelected(input: HTMLInputElement) {
    this.handleFileInput(input.files!);
  }

  private handleFileInput(files: FileList) {
    this.isLoading = true;

    this.apiService
      .post(files[0])
      .pipe(switchMap(() => this.dataService.updateData()))
      .subscribe(() => {
        this.openSnackBar('File uploaded successfully');
        this.fileUploaded = true;
        this.isLoading = false;
      });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }

  showSalarySnackbar(name: string) {
    this.openSnackBar(`${name}'s salary paid.`);
  }
}
