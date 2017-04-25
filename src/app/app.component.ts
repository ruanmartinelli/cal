import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn = false;

  constructor(public af: AngularFire, public router: Router) { }

  logout() {
    this.af.auth.logout();
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (!auth) {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
      if (auth) {
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      }
    })
  }
}
