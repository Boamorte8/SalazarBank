import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { SharedModule } from '@shared/shared.module';
import { RegisterPage } from './register.page';
import { ReviewModalComponent } from './components/review-modal/review-modal.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterPage,
  ],
  entryComponents: [
  ]
})
export class RegisterPageModule {}
