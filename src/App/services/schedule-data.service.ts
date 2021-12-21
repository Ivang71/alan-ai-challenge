import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable()
export class ScheduleDataService {

  constructor(private http: HttpClient) { }
  getSchedule(idGroup):Observable<any>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let params = new HttpParams().set("idGroup",idGroup)
    return this.http.get('api/student/schedule', {headers:header, params:params});
  }
}
