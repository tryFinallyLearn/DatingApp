import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.scss"]
})
export class ValueComponent implements OnInit {
  values;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("http://localhost:5000/api/values")
      .subscribe(x => (this.values = x));
  }
}
