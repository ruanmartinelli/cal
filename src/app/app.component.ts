import { Component } from '@angular/core';
import * as moment from 'moment';
import { EventService } from './service/event.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService]
})
export class AppComponent {

  private iso = 'YYYY-MM-DD';
  private start = moment().subtract(10, 'days').format(this.iso);
  private stop = moment().add(40, 'days').format(this.iso);

  public calendar = [];
  public events = []

  constructor(
    public eventService: EventService
  ) { }

  createCalendar() {
    let calendar = []
    let now = moment().format(this.iso)

    while (moment(now).isBetween(this.start, this.stop)) {

      const tomorrow = moment(now).add(1, 'days').format(this.iso)
      const yesterday = moment(now).add(-1, 'days').format(this.iso)

      // TODO: change name
      let today = { name: now, date: now, events: [], isFirstDay: false }

      if (moment(now).month() != moment(yesterday).month()) {
        today.isFirstDay = true
      }

      calendar.push(today)

      now = tomorrow
    }
    return Promise.resolve(calendar)
  }

  addToCalendar(events, calendar) {
    console.log(events)

    calendar.forEach((day) => {
      events.forEach((event) => {
        if (day.date === event.date) {
          day.events.push(event.name)
        }
      })
    })
  }

  getMonthText(isoDate) {
    const months = {
      0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May',
      5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October',
      10: 'November', 11: 'December',
    }

    return months[moment(isoDate).month()]
  }

  ngOnInit() {
    this.createCalendar()
      .then(calendar => {
        this.calendar = calendar
        return calendar
      })
      .then((calendar) => Promise.all([this.eventService.getEvents(), calendar]))
      .then(([events, calendar]) => this.addToCalendar(events, calendar))
  }
}
