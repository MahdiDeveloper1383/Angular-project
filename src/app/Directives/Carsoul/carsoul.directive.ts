import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCarsoul]'
})
export class CarsoulDirective implements OnInit{
  private currentIndex = 0
  constructor(private el:ElementRef,private render:Renderer2) { }
  ngOnInit(): void {
    const slides = this.el.nativeElement.querySelectorAll('.slide')
    if (slides.length>0) {
      this.showSlide(slides,this.currentIndex)
    }
    setInterval(() => {
      this.autoSlide()
    }, 3000);
  }
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    const slides = this.el.nativeElement.querySelectorAll('.slide');
    if (target.classList.contains('next')) {
      this.currentIndex = (this.currentIndex + 1) % slides.length;
    } else if (target.classList.contains('prev')) {
      this.currentIndex = (this.currentIndex - 1 + slides.length) % slides.length;
    }
    this.showSlide(slides, this.currentIndex);
  }

  private showSlide(slides: NodeListOf<Element>, index: number) {
    slides.forEach((slide, i) => {
      this.render.setStyle(slide, 'display', i === index ? 'block' : 'none');
    });
  }
  private autoSlide(){
    const slide = this.el.nativeElement.querySelectorAll('.slide')
    if (slide.length >0) {
      this.currentIndex = (this.currentIndex + 1) % slide.length
      this.showSlide(slide,this.currentIndex)
    }
  }
}
