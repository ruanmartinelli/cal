import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

@Injectable()
export class EventService {

  events;
  userId: string;

  constructor(public af: AngularFire) {
  }

  setUser(userId) {
    this.userId = userId;
    this.events = this.af.database.list(`/${this.userId}/events`);
  }

  getEvents() {
    return this.events.first().toPromise()
  }

  addEvent(event) {
    return this.events.push(event)
  }

  removeEvent(key: string) {
    return this.events.remove(key)
  }

}
