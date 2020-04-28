import { Component, OnInit, Input, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  inputs:['selectedNotes']
})
export class CarouselComponent implements AfterViewInit {

  private swiper;

  @Input() notes:any[];
  constructor(public changeDetectorRef:ChangeDetectorRef ) {}
  ngAfterViewInit(): void {

    
    
  }

  ngOnInit(): void {


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1.19,
      spaceBetween:20,
    centeredSlides: true,
    loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
   
   
  }
}


