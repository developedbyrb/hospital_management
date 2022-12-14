import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  messageText!: string [];
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, type: string, duration: number) {
    const _snackType = type !== undefined ? type : 'success';
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: duration || 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: { message: message, snackType: _snackType, snackBar: this.snackBar }
    });
  }
}
