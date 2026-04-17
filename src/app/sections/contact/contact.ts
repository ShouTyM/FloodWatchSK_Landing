import { Component, signal, ElementRef, QueryList, ViewChildren, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  private analytics = inject(AnalyticsService);

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  submitState = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    this.revealEls.forEach(el => observer.observe(el.nativeElement));
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    this.submitState.set('loading');

    this.analytics.trackEvent('contact_form_submit', { section: 'contact' });

    try {
      const response = await fetch('https://formspree.io/f/xdayejnb', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        this.submitState.set('success');
        form.reset();
        this.analytics.trackEvent('contact_form_success', { section: 'contact' });
      } else {
        this.submitState.set('error');
      }
    } catch {
      this.submitState.set('error');
    }
  }
}
