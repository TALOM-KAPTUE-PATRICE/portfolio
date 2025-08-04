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
      // L'animation se déclenchera dès que 10% de l'élément est visible
      threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Si l'élément entre dans la vue, on ajoute la classe 'is-visible'
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'is-visible');
        } else {
          // Si l'élément sort de la vue, on retire la classe pour pouvoir ré-animer
          this.renderer.removeClass(this.el.nativeElement, 'is-visible');
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }
}