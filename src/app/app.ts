import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { Problem } from './sections/problem/problem';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, Problem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
