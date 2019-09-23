import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ErrorAlertComponent } from '@components/error-alert/error-alert.component';
import { ReviewModalComponent } from '@register/components/review-modal/review-modal.component';
import { BasicAlertComponent } from './components/basic-alert/basic-alert.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    ErrorAlertComponent,
    ReviewModalComponent,
    BasicAlertComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    BasicAlertComponent,
    ErrorAlertComponent,
    LoadingComponent,
    ReviewModalComponent,
  ],
  exports: [
    MatDialogModule,
  ]
})
export class SharedModule { }
