import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, timeout } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { environment } from '@env';

import { RetryService } from '@operators/delayed-retry/retry.service';
import { ModalService } from '@providers/modal/modal.service';

/**
 * Service for manage Http Requests
 *
 * @export
 * @class HttpCustomService
 */
@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {
  private TIMEOUT_TIME = environment.GENERAL.CONFIG.TIMEOUT_REQUEST;
  private DEFAULT_MAX_RETRIES = environment.GENERAL.CONFIG.DEFAULT_MAX_RETRIES;
  private DEFAULT_BACKOFF = environment.GENERAL.CONFIG.DEFAULT_BACKOFF;
  private DEFAULT_TIME_RETRY = environment.GENERAL.CONFIG.DEFAULT_TIME_RETRY;

  /**
   * Creates an instance of HttpCustomService.
   * @param {HttpClient} http
   * @param {RetryService} delayedRetry
   * @memberof HttpCustomService
   */
  constructor(private http: HttpClient,
              private delayedRetry: RetryService,
              private modal: ModalService) {
  }

  /**
   * Function to get default headers for requests
   *
   * @returns Default headers for requests
   * @memberof HttpCustomService
   */
  getDefaultHeadersRequest() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  /**
   * Function to do http Get requests
   *
   * @param {string} url
   * @param {*} [parameters={}]
   * @param {*} [options]
   * @returns
   * @memberof HttpCustomService
   */
  get(url: string, parameters: any = {}, options?: any) {
    const httpOptions = {
      headers: this.getDefaultHeadersRequest(),
      params: parameters
    };

    const delayTime: number = options && options.delayTime ? options.delayTime : this.DEFAULT_TIME_RETRY;
    const maxRetry: number = options && options.maxRetry ? options.maxRetry : this.DEFAULT_MAX_RETRIES;
    const backoffTimeMs: number = options && options.backoffTimeMs ? options.backoffTimeMs : this.DEFAULT_BACKOFF;

    return this.http.get<any>(url, httpOptions).pipe(
      timeout(this.TIMEOUT_TIME),
      this.delayedRetry.delayedRetry(delayTime, maxRetry, backoffTimeMs),
      catchError(err => {
        return this.handleError(err);
      }),
      map(response => {
        return response;
      })
    );
  }

  /**
   * Function to do Post http requests
   *
   * @param {string} url
   * @param {*} data
   * @param {*} [customHeaders=this.getDefaultHeadersRequest()]
   * @param {*} [options]
   * @returns
   * @memberof HttpCustomService
   */
  post(url: string, data: any, customHeaders: any = this.getDefaultHeadersRequest(), options?: any) {
    const httpOptions = {
      headers: customHeaders
    };

    const delayTime: number = options && options.delayTime ? options.delayTime : this.DEFAULT_TIME_RETRY;
    const maxRetry: number = options && options.maxRetry ? options.maxRetry : this.DEFAULT_MAX_RETRIES;
    const backoffTimeMs: number = options && options.backoffTimeMs ? options.backoffTimeMs : this.DEFAULT_BACKOFF;

    return this.http.post<any>(url, data, httpOptions).pipe(
      timeout(this.TIMEOUT_TIME),
      this.delayedRetry.delayedRetry(delayTime, maxRetry, backoffTimeMs),
      catchError(err => {
        return this.handleError(err);
      }),
      map(response => {
        return response;
      })
    );
  }

  /**
   * Function to validate if error is timeout
   *
   * @param {*} error
   * @returns {boolean}
   * @memberof HttpCustomService
   */
  isTimeoutError(error: any): boolean {
    return error.name && error.name === 'TimeoutError' ? true : false;
  }

  /**
   * Function for manage errors
   *
   * @param {*} error
   * @param {*} [action]
   * @returns
   * @memberof HttpCustomService
   */
  handleError(error: any, action ?: any) {
    const defaultMessage = 'Hay problemas conectando con los servidores. Intenta mas tarde';
    let messageError = '';
    let codeError = '';
    if (this.isTimeoutError(error)) {
      messageError = defaultMessage;
      codeError = '500';
    } else {
      messageError = error.message ? error.message : defaultMessage;
      codeError = error.error ? error.error : error.code;
    }
    const extras = {
      codeError
    };
    this.modal.showErrorAlert(messageError);

    return EMPTY;
  }
}
