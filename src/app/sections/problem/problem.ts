import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-problem',
  standalone: true,
  templateUrl: './problem.html',
  styleUrl: './problem.scss'
})
export class Problem implements OnInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>;
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  problems = [
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18c2.2-3.2 4.9-4.8 8-4.8s5.8 1.6 8 4.8"/><path d="M5 14c1.6-2.2 3.6-3.3 6-3.3s4.4 1.1 6 3.3"/><path d="M7 10c1-1.2 2.4-1.8 4-1.8s3 .6 4 1.8"/><path d="M12 5.5h.01"/></svg>`,
      stat: '74,3 %',
      statLabel: 'obcí s rizikovou lokalitou',
      title: 'Riziko je reálne',
      description: 'Väčšina obcí v prieskume uviedla aspoň jednu lokalitu náchylnú na prívalové povodne. Problém nie je výnimočný, ale opakujúci sa a lokálne veľmi konkrétny.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
      stat: '48,6 %',
      statLabel: 'nie je spokojných s hlásením',
      title: 'Súčasné hlásenie nestačí',
      description: 'Takmer polovica respondentov nie je spokojná so súčasným systémom hlásenia povodní. Časť obcí sa stále spolieha len na obhliadky, hlásenia občanov alebo všeobecné zdroje.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      stat: '71,4 %',
      statLabel: 'vníma cenu ako bariéru',
      title: 'Najväčšia prekážka je cena',
      description: 'Záujem existuje, no rozhodovanie brzdí najmä rozpočet. Práve preto musí byť riešenie pre malé obce jednoduché, zrozumiteľné a finančne obhájiteľné.'
    }
  ];

  ngOnInit() {
    setTimeout(() => this.initObserver(), 100);
  }

  private initObserver() {
    const options = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.cards?.forEach(ref => observer.observe(ref.nativeElement));
    this.revealEls?.forEach(ref => observer.observe(ref.nativeElement));
  }
}
