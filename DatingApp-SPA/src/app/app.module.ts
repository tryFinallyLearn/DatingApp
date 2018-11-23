import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ValueComponent } from "./value/value.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./nav/nav.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvide } from "./services/error.interceptor";
import { BsDropdownModule, TabsModule } from "ngx-bootstrap";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { JwtModule } from "@auth0/angular-jwt";
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';

function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    }),
    AppRoutingModule
  ],
  providers: [ErrorInterceptorProvide],
  bootstrap: [AppComponent]
})
export class AppModule {}
