import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '@interfaces/user';


@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  /**
   * Function that confirm that the user confirm register
   *
   * @memberof ReviewModalComponent
   */
  registerUser() {
    this.dialogRef.close(true);
  }

}
