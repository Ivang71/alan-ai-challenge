import { Injectable } from '@angular/core';
import {ScheduleDataService} from './schedule-data.service';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
    addDays,
    startOfHour,
    addHours,
    subHours,
    setHours,
    subMinutes,
    addMinutes
} from 'date-fns';
@Injectable()
export class AppService {
  constructor(private schedule:ScheduleDataService) {
  }
  private Url = 'api/base/students';
  getEvents(actions: CalendarSchedulerEventAction[]): Promise<CalendarSchedulerEvent[]> {
      this.schedule.getSchedule('БИВТ-191');
      let events: CalendarSchedulerEvent[]=[];
        events.push(
            <CalendarSchedulerEvent>{
                id: '',
                start: addDays(startOfHour(new Date()), 1),
                end: addDays(addHours(startOfHour(new Date()), 1), 1),
                title: '',
                content: '(л/р) Современные технологии программирования 1п 4,8,12,16 нед. 2п 6,10,14,18 нед. [324/3] [КОВАЛЕНКО С.А.]',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                isClickable: true
            });
        return new Promise(resolve => setTimeout(() => resolve(events), 3000));
    }
}
