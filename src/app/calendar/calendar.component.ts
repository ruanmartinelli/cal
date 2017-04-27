import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as uuid from 'uuid/v1';
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

  public newEvent: { name: string, date: string, id: string }
  public eventInputs = {};
  public calendar = [];
  public events = []

  constructor(
    public eventService: EventService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  createCalendar() {
    let calendar = []
    let now = moment(this.start).add(1, 'days').format(this.iso)

    while (moment(now).isBetween(this.start, this.stop)) {

      const tomorrow = moment(now).add(1, 'days').format(this.iso)
      const yesterday = moment(now).add(-1, 'days').format(this.iso)

      let day = { name: now, date: now, events: [], isFirstDay: false, isToday: false }

      if (moment(now).month() != moment(yesterday).month()) day.isFirstDay = true
      if (moment(now).isSame(moment().format(this.iso))) day.isToday = true
      calendar.push(day)

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

  removeEvent(id, day) {
    if (!id) return

    this.eventService
      .removeEvent(id)
      .then(() => {
        day.events = day.events.filter(e => e.id && e.id != id)
        this.toggleEventInput(null)
      })
  }

  toggleEventInput(key: string) {
    this.newEvent = { name: null, date: null, id: null }
    const toggle = this.eventInputs[key] || false
    this.eventInputs = []
    if (key) this.eventInputs[key] = !toggle
  }

  addEvent(event, dayDate) {
    if (!event.name) return

    const { name } = event
    const date = dayDate
    const id = uuid()

    this.eventService
      .addEvent({ name, date, id })
      .then(() => {
        const events = this.calendar.find(day => day.date === date).events

        events.push({ name, date, id })

        delete this.newEvent.name
        delete this.newEvent.date
        delete this.newEvent.id
      })
  }

  handleKeypress(e, day) {
    const isEsc = e.keyCode && e.keyCode === 27
    const isTab = e.keyCode && e.keyCode === 9

    if (!isEsc && !isTab) return
    if (isEsc) this.toggleEventInput(null)
    if (isTab) {
      const tomorrow = moment(day.date).add(1, 'days').format(this.iso)
      this.toggleEventInput(tomorrow)
    }
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['uid'];
    this.eventService.setUser(this.userId)

    this.createCalendar()
      .then(calendar => {
        this.calendar = calendar
        return calendar
      })
      .then((calendar) => Promise.all([this.eventService.getEvents(), calendar]))
      .then(([events, calendar]) => this.addToCalendar(events, calendar))
  }
}
