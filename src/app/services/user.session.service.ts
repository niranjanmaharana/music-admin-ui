import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../util/config';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../model/response.entity';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  constructor(private http: HttpClient) { }

  getAllSessions(): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/session/' + Configuration.user.username);
  }
}