import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  constructor() { }

  getEvents() {
    const events = [
      { date: '2017-04-29', name: 'Buy Milk' },
      { date: '2017-04-29', name: 'Take dog for a walk' },
      { date: '2017-04-25', name: 'Water plants' },
    ]
    return Promise.resolve(events)
  }

}
