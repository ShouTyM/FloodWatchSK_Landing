import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Hero } from './sections/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
