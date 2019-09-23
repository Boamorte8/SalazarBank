import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';
import { Moment } from 'moment';

import { User } from '@interfaces/user';
import { ModalService } from '@providers/modal/modal.service';
import { LoadingService } from '@providers/loading/loading.service';
import { UserService } from '@services/user/user.service';

/**
 * Page for show and manage the register
 *
 * @export
 * @class RegisterPage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  maxDate: Moment;
  private loadingRef: any;
  private validatedIdExist = false;
  private idExist = false;

  /**
   * Creates an instance of RegisterPage.
   *
   * @memberof RegisterPage
   */
  constructor(private userService: UserService,
              private modalService: ModalService,
              private loading: LoadingService) {
    this.maxDate = moment().subtract(18, 'years');
    this.registerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('',
        [Validators.required, Validators.max(this.maxDate.valueOf())]
      )
    });
  }

  ngOnInit() {
  }

  /**
   * Function for validate and send data to back
   *
   * @memberof RegisterPage
   */
  async onSubmit() {
    this.loadingRef = this.loading.show();
    // const id = this.registerForm.get('id').value;
    // this.idExist = await this.userService.existUser(id);
    // if (this.validatedIdExist) {
    //   if (!this.idExist) {
    //     const user = {
    //       identification: id,
    //       firstName: this.registerForm.get('firstName').value,
    //       lastName: this.registerForm.get('lastName').value,
    //       birthday: this.registerForm.get('birthday').value.format('DD-MM-YYYY'),
    //     };
    //     this.loadingRef.close();
    //     const modalRef = this.modalService.showReviewModal(user);

    //     modalRef.afterClosed().subscribe((confirm: boolean) => {
    //       this.loadingRef = this.loading.show();
    //       if (confirm) {
    //         this.registerUser(user);
    //       }
    //     });

    //   } else {
    //     this.loadingRef.close();
    //     this.modalService.showErrorAlert('El usuario ya se encuentra registrado');
    //   }
    // } else {
    //   this.onBlur();
    // }
  }

  /**
   * Function for register user
   *
   * @param {User} user
   * @memberof RegisterPage
   */
  async registerUser(user: User) {
    const registered = await this.userService.registerUser(user);
    if (registered) {
      this.loadingRef.close();
      this.modalService.showAlert({
        title: 'Creado',
        message: 'El usuario ha sido creado con éxito.',
        labelButton: 'Listo'
      });
      this.registerForm.reset();
    }
  }

  /**
   * Function for validate if user exist
   *
   * @memberof RegisterPage
   */
  async onBlur() {
    const id = this.registerForm.get('id').value;
    if (id && this.registerForm.get('id').valid) {
      this.idExist = await this.userService.existUser(id);
      this.validatedIdExist = true;
    }
  }

}
