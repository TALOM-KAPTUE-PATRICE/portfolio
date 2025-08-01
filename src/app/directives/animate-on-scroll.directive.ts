import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: false
})
export class AnimateOnScrollDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'is-visible');
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }
}