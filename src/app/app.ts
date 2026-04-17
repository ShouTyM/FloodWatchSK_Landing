import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { Problem } from './sections/problem/problem';
import { Solution } from './sections/solution/solution';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, Problem, Solution, About, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
