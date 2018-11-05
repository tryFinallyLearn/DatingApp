import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AlertifyService } from "../services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output()
  cancelRegister = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private alertifySvc: AlertifyService
  ) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      x => {
        this.alertifySvc.success("registeration succeeded");
      },
      error => {
        debugger;
        this.alertifySvc.error(error.error);
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
