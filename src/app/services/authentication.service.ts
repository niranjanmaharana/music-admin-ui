import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Configuration } from '../util/config';
import { JwtResponse } from '../model/jwt.response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppConstant } from '../const/app.constant';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    showWarning: boolean = false;
    idleState: string = 'Not started.';
    timedOut: boolean = false;
    lastPing?: Date = null;

    constructor(private http: HttpClient,
        private router: Router,
        private toaster: ToastrService,
        private idle: Idle,
        private keepalive: Keepalive) {
        idle.setIdle(AppConstant.IDLE_TIME);
        idle.setTimeout(AppConstant.TIMEOUT_INTERVAL);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => {
            this.idleState = 'No longer idle.'
            console.log(this.idleState);
            this.reset();
        });

        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.invalidateSession();
            console.log(this.idleState);
            this.router.navigate(['/']);
        });

        idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!'
            console.log(this.idleState);
            this.showWarning = true;
        });

        idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'You will time out in ' + countdown + ' seconds!'
            console.log(this.idleState);
        });

        // sets the ping interval to 15 seconds
        keepalive.interval(AppConstant.PING_INTERVAL);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        if (Configuration.user == null) {
            idle.stop();
        } else if (Configuration.user) {
            idle.watch();
        }
    }

    login(username: string, password: string) {
        return this.http.post<JwtResponse>(Configuration.getApiUrl() + '/' + Configuration.getLoginUrl(), { username, password })
        // return this.http.get<JwtResponse>('../assets/json/login.json')
            .pipe(map(response => {
                Configuration.udpateToken(response);
                this.start();
            }));
    }

    logout() {
        Configuration.clearToken();
        this.stop();
        this.router.navigate(['/login']);
    }

    resetPassword(email: string) {
        return this.http.post<JwtResponse>(Configuration.getApiUrl() + '/noauth/reset-password', { email })
            .pipe(map(response => {
                debugger;
            }));
    }

    checkSessionToken() {
        let token = sessionStorage.getItem('token');
        if (token) {
            let headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            });
            let options = { headers: headers };
            this.http.post<JwtResponse>(Configuration.getApiUrl() + '/' + Configuration.getUpdateTokenUrl(), null, options)
            // return this.http.get<JwtResponse>('../assets/json/login.json')
                .pipe(first())
                .subscribe(
                    data => {
                        Configuration.udpateToken(data);
                        this.start();
                        this.router.navigate(['/home']);
                    },
                    error => {
                        this.stop();
                        this.toaster.error('Authntication Failed', 'Invalid session. Please try again.');
                        this.logout();
                    });
        } else {
            this.logout();
        }
    }

    start() {
        this.idle.watch();
    }

    stop() {
        this.idle.stop();
    }

    invalidateSession() {
        this.logout();
        this.showWarning = false;
    }

    continueSession() {
        this.checkSessionToken();
        this.reset();
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
        this.showWarning = false;
    }

    getUser() {
        return Configuration.getUser();
    }

    getFirstName() {
        return Configuration.getFirstName();
    }
}