import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LyricComponent } from './components/lyric/lyric.component';
import { ErrorComponent } from './components/error/error.component';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { ListPropertyComponent } from './components/list-property/list-property.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'properties', component: ListPropertyComponent, canActivate: [AuthGuard] },
  { path: 'sessions', component: UserSessionComponent, canActivate: [AuthGuard] },
  { path: 'lyric', component: LyricComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }