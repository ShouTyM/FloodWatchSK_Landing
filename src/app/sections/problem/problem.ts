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
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      stat: '79 %',
      statLabel: 'obcí bez systému',
      title: 'Žiadne varovanie',
      description: 'Väčšina slovenských obcí nemá žiadny automatizovaný systém včasného varovania pred povodňami. Starosta sa dozvie o hrozbe neskoro — alebo vôbec nie.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      stat: '3 – 6 h',
      statLabel: 'priemerné meškanie',
      title: 'Reakcia príliš neskoro',
      description: 'Manuálne meranie a telefonické reťazce zdržujú reakciu o hodiny. Evakuácia, záchrana majetku aj ochrana infraštruktúry vyžadujú čas, ktorý jednoducho nie je.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      stat: '€ 40k+',
      statLabel: 'priemerná škoda / udalosť',
      title: 'Obrovské škody',
      description: 'Každá povodeň bez včasného varovania znamená statisíce eur škôd na majetku, infraštruktúre a poľnohospodárstve. Obce s malými rozpočtami tieto náklady nesú roky.'
    }
  ];

  ngOnInit() {
    // Wait for view to render, then observe
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
