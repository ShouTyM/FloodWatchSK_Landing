import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-problem',
  standalone: true,
  templateUrl: './problem.html',
  styleUrl: './problem.scss'
})
export class Problem implements OnInit {
  @ViewChildren('impactItem') impactItems!: QueryList<ElementRef>;
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  impacts = [
    {
      value: '108×',
      label: 'vyhlásený 3. stupeň\npovodňovej aktivity',
      sublabel: 'len v 2. polroku 2024'
    },
    {
      value: '>19,5M€',
      label: 'celkové náklady štátu\nna povodne',
      sublabel: 'škody + záchranné práce 2024'
    },
    {
      value: '+7–14%',
      label: 'intenzívnejšie prívalové\nzrážky na každý 1°C',
      sublabel: 'trend podľa SHMÚ'
    }
  ];

  ngOnInit() {
    setTimeout(() => this.initObserver(), 100);
  }

  private initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    this.impactItems?.forEach(ref => observer.observe(ref.nativeElement));
    this.revealEls?.forEach(ref => observer.observe(ref.nativeElement));
  }
}
