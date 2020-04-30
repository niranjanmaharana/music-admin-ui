import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Configuration } from '../util/config';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(public authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = Configuration.getUser();
        if (user && Configuration.getToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${Configuration.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}