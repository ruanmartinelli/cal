import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn = false;

  constructor(public af: AngularFire) { }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  logout() {
    this.af.auth.logout();
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (!auth) this.login()
      if (auth) this.isLoggedIn = true
    })
  }
}
