import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertData } from '@interfaces/alert-data';
import { User } from '@interfaces/user';
import { BasicAlertComponent } from '@components/basic-alert/basic-alert.component';
import { ReviewModalComponent } from '@register/components/review-modal/review-modal.component';

/**
 * Service for create and manage modals and alerts
 *
 * @export
 * @class ModalService
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  /**
   * Creates an instance of ModalService.
   * @param {MatDialog} dialog
   * @memberof ModalService
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Functon for open alert
   *
   * @param {string} message
   * @memberof ModalService
   */
  showAlert(data: AlertData) {
    const dialogRef = this.dialog.open(BasicAlertComponent, {
      width: '250px',
      data
    });

    return dialogRef;
  }

  /**
   * Functon for open error alert
   *
   * @param {string} message
   * @memberof ModalService
   */
  showErrorAlert(messageError: string) {
    const dialogRef = this.dialog.open(BasicAlertComponent, {
      width: '250px',
      data: {
        title: 'Error',
        message: messageError,
        labelButton: 'Cerrar'
      }
    });

    return dialogRef;
  }

  /**
   * Functon for open review modal
   *
   * @param {string} message
   * @memberof ModalService
   */
  showReviewModal(user: User) {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      width: '350px',
      data: { user }
    });

    return dialogRef;
  }
}
