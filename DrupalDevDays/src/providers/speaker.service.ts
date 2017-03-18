import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Speaker } from '../shared/speaker';

@Injectable()
export class SpeakerService {

  private readonly drupalUrl = 'https://seville2017.drupaldays.org/api/users';

  constructor(private http: Http) { }

  getSpeakers(speakersIds: string[]): Observable<Speaker[]> {
    return this.http
               .get(`${this.drupalUrl}/${speakersIds.join(',')}`)
               .map(res => res.json())
               .map(rawSpeakers => rawSpeakers.map(rawSpeaker => new Speaker(rawSpeaker)));
  }
}
