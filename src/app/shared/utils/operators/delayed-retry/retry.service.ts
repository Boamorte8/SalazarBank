import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { retryWhen, mergeMap, delay } from 'rxjs/operators';

/**
 * Custom operator for config retry in a http request
 *
 * @export
 * @class RetryService
 */
@Injectable({
  providedIn: 'root'
})
export class RetryService {

  constructor() { }

  /**
   * Operator for retry after delay
   *
   * @param {number} delayTime
   * @param {number} maxRetry
   * @param {number} backoffTimeMs
   * @returns
   * @memberof RetryService
   */
  delayedRetry(delayTime: number, maxRetry: number, backoffTimeMs: number) {
    let retries = maxRetry;

    return (src: Observable<any>) => src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap((error: any) => {
          if (retries-- > 0) {
            const backoffTime = delayTime + (maxRetry - retries) * backoffTimeMs;
            return of(error).pipe(delay(backoffTime));
          }
          const errorObject = {
            messageIntern: `Sigue fallando despues de ${maxRetry} veces`,
            message: 'Hay problemas conectado con los servidores. Intenta mas tarde',
            code: 500
          };
          return throwError(errorObject);
        })
      ))
    );
  }
}
