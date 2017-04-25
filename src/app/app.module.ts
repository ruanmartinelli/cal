import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';


const firebaseConfig = {
  apiKey: "AIzaSyAZHTtwgTD1rqIklhkuioBqxNpERM6IFWY",
  authDomain: "cal-app-bb585.firebaseapp.com",
  databaseURL: "https://cal-app-bb585.firebaseio.com",
  projectId: "cal-app-bb585",
  storageBucket: "cal-app-bb585.appspot.com",
  messagingSenderId: "799684561948"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
