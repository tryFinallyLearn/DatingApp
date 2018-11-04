import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output()
  cancelRegister = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(x => {}, error => {});
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
