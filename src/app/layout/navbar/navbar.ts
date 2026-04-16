import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isDark = signal(false);
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDark.set(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleTheme() {
    const next = !this.isDark();
    this.isDark.set(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMobileMenu();
  }

  navLinks = [
    { label: 'Problém', anchor: '#problem' },
    { label: 'Riešenie & funkcie', anchor: '#solution' },
    { label: 'Kontakt', anchor: '#contact' },
  ];
}
