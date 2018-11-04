import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // /values
  private url = environment.apiUrl + "/auth";
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.url + "/login", model).pipe(
      map((x: any) => {
        if (x) {
          localStorage.setItem("token", x.token);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.url + "/register", model);
  }
}
