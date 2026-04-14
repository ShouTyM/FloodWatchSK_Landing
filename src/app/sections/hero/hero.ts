import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  readonly stats = [
    { value: 93, suffix: '%', label: 'obcí zažilo povodeň' },
    { value: 79, suffix: '%', label: 'má rizikové lokality' },
    { value: 28, suffix: '', label: 'starostov v prieskume' },
  ];

  animatedValues = signal<number[]>([0, 0, 0]);
  private animationFrame: number | null = null;

  ngOnInit() {
    setTimeout(() => this.animateStats(), 400);
  }

  ngOnDestroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  private animateStats() {
    const duration = 1800;
    const start = performance.now();
    const targets = this.stats.map(s => s.value);

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      this.animatedValues.set(targets.map(t => Math.round(t * ease)));
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      }
    };
    this.animationFrame = requestAnimationFrame(step);
  }
}
