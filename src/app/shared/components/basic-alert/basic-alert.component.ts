import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertData } from '@interfaces/alert-data';

/**
 * Component for basic alert (Title, message and a button)
 *
 * @export
 * @class BasicAlertComponent
 */
@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss']
})
export class BasicAlertComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertData) { }

}
