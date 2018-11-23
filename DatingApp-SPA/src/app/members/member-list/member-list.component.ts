import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AlertifyService } from "src/app/services/alertify.service";
import { User } from "src/app/models/model";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private userSvc: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users = data['users'];
    });
  }

  // loadUsers() {
  //   this.userSvc.getUsers().subscribe(
  //     x => {
  //       this.users = x;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
