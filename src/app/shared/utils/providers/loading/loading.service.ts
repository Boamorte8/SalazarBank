import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoadingComponent } from '@components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public dialog: MatDialog) { }

  /**
   * Function for show loading
   *
   * @memberof LoadingService
   */
  show() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      width: '250px'
    });

    return dialogRef;
  }
}
