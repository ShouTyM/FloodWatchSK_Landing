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
    { value: 42, suffix: '%', label: 'obcí so stredným až vysokým rizikom povodní' },
    { value: 64, suffix: 'M€', label: 'škôd z povodní za roky 2020 – 2024' },
    { value: 0, suffix: '', label: '— placeholder —' }, // TODO: doplniť 3. údaj
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
