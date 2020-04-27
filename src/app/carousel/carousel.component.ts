import { Component, OnInit } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import Swiper from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 40,
	  centeredSlides: true,
	  loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });


  }

}


