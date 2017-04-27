import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

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

  addEvent({ name, date, id }) {
    return this.events.push({ name, date, id })
  }

  removeEvent(id: string) {

    return this.getEvents()
      .then(events => {
        const eventToRemove = events.find(e => e.id == id)

        return this.af.database.list(`/${this.userId}/events/${eventToRemove.$key}`).remove()
      })
  }

}
