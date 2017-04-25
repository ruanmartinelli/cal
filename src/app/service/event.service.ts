import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
@Injectable()
export class EventService {

  events;

  constructor(af: AngularFire) {
    this.events = af.database.list('events');
  }
  getEvents() {
    return this.events
      .first()
      .toPromise()
  }

}
