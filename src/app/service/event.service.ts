import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

@Injectable()
export class EventService {

  events;

  constructor(public af: AngularFire) {
    this.events = af.database.list('/events');
  }
  getEvents() {
    return this.events.first().toPromise()
  }

  addEvent(event){
    return this.events.push(event)
  }

  removeEvent(key: string){
    return this.events.remove(key)
  }

}
