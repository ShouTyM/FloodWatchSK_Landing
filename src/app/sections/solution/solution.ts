import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-solution',
  standalone: true,
  templateUrl: './solution.html',
  styleUrl: './solution.scss'
})
export class Solution implements OnInit {
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;
  @ViewChildren('step') steps!: QueryList<ElementRef>;

  steps_data = [
    {
      number: '01',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-3.6-7-8-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
      title: 'Senzor meria',
      description: 'Nezávislé zariadenie FloodWatch SK sa nainštaluje priamo pri rizikovom mieste — potoku, môstiku, nádrži. Každúch päť minút meria aktuálnu hladinu vody.'
    },
    {
      number: '02',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 8h.01M9 8h6M6 11h.01M9 11h4"/></svg>`,
      title: 'Dáta putujú do cloudu',
      description: 'Namerané hodnoty sa automaticky odosielajú do databázy. Dashboard ich v reálnom čase vizualizuje ako graf histórie, vrátane nastaviteľných varovných hladín.'
    },
    {
      number: '03',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      title: 'Starosta dostane varovanie',
      description: 'Keď hladina vody dosiahne nastavený práh, systém okamžite upozorní zodpovedné osoby. Nie až keď voda dorazí k domóm — ale v predstihu, keď je ešte čas konať.'
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

    this.revealEls?.forEach(ref => observer.observe(ref.nativeElement));
    this.steps?.forEach(ref => observer.observe(ref.nativeElement));
  }
}
