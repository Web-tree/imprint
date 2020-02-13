import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  success(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000
    });
  }
}
