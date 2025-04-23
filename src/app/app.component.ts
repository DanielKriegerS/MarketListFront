import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { environment } from '../environment.prod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'market-list';

  ngOnInit(): void {
    console.log('API URL em uso:', environment.apiUrl);
  }
}
