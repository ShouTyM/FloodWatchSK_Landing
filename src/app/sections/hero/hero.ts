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
    { value: 42, suffix: '%', label: 'obcí so stredným až vysokým rizikom povodní', static: false },
    { value: 64, suffix: 'M€', label: 'škôd z povodní za roky 2020 – 2024', static: false },
    { value: 0, suffix: '24/7', label: 'monitorovanie v reálnom čase', static: true },
  ];

  animatedValues = signal<(number | string)[]>([0, 0, '24/7']);
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
      this.animatedValues.set(
        this.stats.map((s, i) =>
          s.static ? s.suffix : Math.round(targets[i] * ease)
        )
      );
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      }
    };
    this.animationFrame = requestAnimationFrame(step);
  }
}
