import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Configuration } from '../util/config';
import { TokenStorage } from '../util/token.storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        let currentUser = Configuration.getUser();
        if (currentUser && TokenStorage.getToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${TokenStorage.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}