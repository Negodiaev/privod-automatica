import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

import Swiper from 'swiper/dist/js/swiper.js';
import './vendor/wa-mediabox';

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function(totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function(svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(mySVGsToInject, afterAllInjectionsFinishedCallback, perInjectionCallback);

// slick carousel
$('.content-carousel').slick({
  // normal options...
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 300,
      settings: 'unslick' // destroys slick
    }
  ]
});

// tablesaw table plugin
$(function() {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this)
    .parents('.app-dashboard')
    .toggleClass('shrink-medium')
    .toggleClass('shrink-large');
});

document.addEventListener('DOMContentLoaded', function(event) {
  // search menu toggle
  $('.search-form-toggle').on('click', function(e) {
    e.preventDefault();

    var searchForm = $(this).closest('.search-form');

    if (searchForm) searchForm.toggleClass('shown').focus();
  });

  // services menu toggle
  $('.services-menu-toggle').on('click', function(e) {
    e.preventDefault();

    $(this)
      .closest('.services-menu')
      .toggleClass('shown');
  });

  // hero slider
  var heroSwiper = new Swiper('#hero-slider', {
    loop: true,
    pagination: {
      el: '#hero-slider-pagination',
      clickable: true
    },
    lazy: {
      loadPrevNext: true
    },
    effect: 'fade',
    fadeEffect: {
      // crossFade: true
    },
    breakpoints: {
      1199: {
        autoHeight: true
      }
    }
  });
});
