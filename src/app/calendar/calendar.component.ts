import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [EventService]
})
export class CalendarComponent implements OnInit {

  private iso = 'YYYY-MM-DD';
  private start = moment().subtract(10, 'days').format(this.iso);
  private stop = moment().add(40, 'days').format(this.iso);
  private userId: string;

  public eventInputs = {};
  public newEvent = {};
  public calendar = [];
  public events = []

  constructor(
    public eventService: EventService,
    public router: Router,
    private route: ActivatedRoute
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
    calendar.forEach((day) => {
      events.forEach((event) => {
        if (day.date === event.date) {
          day.events.push(event)
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

  removeEvent(key, day) {
    this.eventService
      .removeEvent(key)
      .then(() => {
        day.events = day.events.filter(e => e.$key && e.$key != key)
      })
  }

  toggleEventInput(key: string) {
    this.newEvent = ''
    const toggle = this.eventInputs[key] || false
    this.eventInputs = []
    if (key) this.eventInputs[key] = !toggle
  }

  addEvent(event, date) {
    if (!event.name) return

    event.date = date

    this.eventService.addEvent(event)
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['uid'];

    this.eventService.setUser(this.userId)

    this.eventService.addEvent({ name: 'Teste', date: '2017-04-28' })

    this.createCalendar()
      .then(calendar => {
        this.calendar = calendar
        return calendar
      })
      .then((calendar) => Promise.all([this.eventService.getEvents(), calendar]))
      .then(([events, calendar]) => this.addToCalendar(events, calendar))
  }
}
