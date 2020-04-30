import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../util/config';
import { ResponseEntity } from '../model/response.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppPropertyService {
  constructor(private http: HttpClient) { }

  getProperties(): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(Configuration.getApiUrl() + '/property/');
  }
}
