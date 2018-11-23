import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { User } from "../models/model";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userSvc: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> | Promise<User[]> | User[] {
    return this.userSvc.getUsers().pipe(
      catchError(error => {
        this.alertify.error("Problem retrieving users");
        this.router.navigate(["/home"]);
        return of([]);
      })
    );
  }
}
