import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
  selector: "app-menu"
})
export class MenuComponent {
  constructor(private router: Router) {}

  isActive(compare: string) {
    return this.router.url.split("/").some(token => token === compare);
  }
}
