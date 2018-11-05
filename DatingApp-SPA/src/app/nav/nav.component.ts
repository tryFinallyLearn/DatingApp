import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AlertifyService } from "../services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertifySvc: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}
  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertifySvc.success("Logged in successfully");
        this.router.navigate(["/members"]);
      },
      error => {
        this.alertifySvc.error(error);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertifySvc.message("logged out");
    this.router.navigate(["/home"]);
  }
}
