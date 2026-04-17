import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private analytics = inject(AnalyticsService);

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

  onContactClick() {
    this.analytics.trackEvent('cta_click', { label: 'kontaktuj-nas', section: 'navbar' });
    this.closeMobileMenu();
  }

  navLinks = [
    { label: 'Probl\u00e9m', anchor: '#problem' },
    { label: 'Rie\u0161enie & funkcie', anchor: '#solution' },
    { label: 'O n\u00e1s', anchor: '#about' },
    { label: 'Kontakt', anchor: '#contact' },
  ];
}
