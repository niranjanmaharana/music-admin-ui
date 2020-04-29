import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'music';

  constructor(
    public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.checkSessionToken();
  }

  onContinueSessionClick() {
    this.authService.continueSession();
  }

  onLogoutSessionClick() {
    this.authService.invalidateSession();
  }
}