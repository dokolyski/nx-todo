import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  open(error: HttpErrorResponse) {
    if (error != null) {
      this._snackBar.open(error.message, 'close', {
        duration: 2000,
      });
    }
  }
}
