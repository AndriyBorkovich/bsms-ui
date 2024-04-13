import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {RouterOutlet} from "@angular/router";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    NavBarComponent
  ],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'bsms-ui';
  ngOnInit(): void {
    initFlowbite();
  }
}
