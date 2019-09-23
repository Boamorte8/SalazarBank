import { Injectable } from '@angular/core';

import { environment } from '@env';

import { User } from '@interfaces/user';
import { HttpCustomService } from '@providers/http/http-custom.service';

/**
 * Service for get and set información about user
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Creates an instance of UserService.
   * @param {HttpCustomService} http
   * @memberof UserService
   */
  constructor(private http: HttpCustomService) { }

  /**
   * Function for to do http request for register user
   *
   * @param {User} user
   * @returns
   * @memberof UserService
   */
  registerUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url.API_CLIENTS, user).subscribe(result => {
        console.log('[UserService] - Register User - Result', result);
        resolve(true);
      });
    });
  }

  /**
   * Function for validate if a user existe
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof UserService
   */
  existUser(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const users: User[] = await this.getUsers();
      const exist = users.some((userElement) => {
        return userElement.identification === id;
      });
      resolve(exist);
    });
  }

  /**
   * Function for get the userlist from back
   *
   * @returns {Promise<User[]>}
   * @memberof UserService
   */
  getUsers(): Promise<User[]> {
    const users = [];
    return new Promise((resolve, reject) => {
      this.http.get(environment.url.API_CLIENTS).subscribe((data) => {
        for (const [key, value] of Object.entries(data)) {
          users.push(value);
        }
        resolve(users);
      });
    });
  }
}
