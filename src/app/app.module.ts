import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { AppTooltipOptions } from './const/AppTooltipOptions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LyricComponent } from './components/lyric/lyric.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { HttpLoaderComponent } from './components/http-loader/http-loader.component';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ListPropertyComponent } from './components/list-property/list-property.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ContentComponent,
		ErrorComponent,
		HomeComponent,
		BannerComponent,
		LyricComponent,
		ControlMessagesComponent,
		LoginComponent,
		ResetPasswordComponent,
		PropertiesComponent,
		HttpLoaderComponent,
		UserSessionComponent,
		ListPropertyComponent
	],
	imports: [
		NgIdleKeepaliveModule.forRoot(),
		MomentModule,
		NgxPaginationModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		TooltipModule.forRoot(AppTooltipOptions as TooltipOptions),
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true
		})
	],
	providers: [
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }