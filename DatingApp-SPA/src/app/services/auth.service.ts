import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // /values
  private url = environment.apiUrl + "/auth";
  jwtHelper = new JwtHelperService();
  decodedToken:any;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.url + "/login", model).pipe(
      map((x: any) => {
        if (x) {
          localStorage.setItem("token", x.token);
          this.decodedToken = this.jwtHelper.decodeToken(x.token);
          // console.log(this.decodedToken);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.url + "/register", model);
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  onStart(){
    const token = localStorage.getItem("token");
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
