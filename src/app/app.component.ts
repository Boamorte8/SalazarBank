import { Component } from '@angular/core';

import { environment } from '@env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SalazarBank';

  constructor() {
    console.log(environment.version);
  }
}
