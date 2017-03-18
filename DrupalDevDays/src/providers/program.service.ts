///<reference path="session.service.ts"/>
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { Session } from '../shared/session';
import Moment = moment.Moment;

@Injectable()
export class ProgramService {

  private readonly drupalUrl = 'https://seville2017.drupaldays.org/api/program';

  private readonly dates = {
    '2017-03-21': 126,
    '2017-03-22': 127,
    '2017-03-23': 128,
    '2017-03-24': 129,
    '2017-03-25': 130,
  };

  constructor(private http: Http) {
  }

  getProgram(date: Moment): Observable<Session[]> {
    const programId = this.dates[date.format('YYYY-MM-D')];

    return this.http
               .get(`${this.drupalUrl}/${programId}`)
               .map(res => res.json())
               .map(rawSessions => rawSessions.map(rawSession => new Session(rawSession)))
               .map(sessions => sessions.sort((s1, s2) => s1.startTime.localeCompare(s2.startTime)));
  }
}
