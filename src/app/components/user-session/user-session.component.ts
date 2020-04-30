import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/user.session.service';
import { UserSession } from 'src/app/model/user.session.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss']
})
export class UserSessionComponent implements OnInit {
  sessions: UserSession[] = [];
  page: number = 1;

  constructor(private userSessionService: UserSessionService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.userSessionService.getAllSessions()
      .subscribe(
        data => {
          this.sessions = data.data;
        },
        error => {
          this.toaster.error('ERROR', 'Failed to fetch the session details! \n'+error.statusText);
        });
  }
}