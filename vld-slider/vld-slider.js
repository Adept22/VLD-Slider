/* © Developed by Vladislav Terenchuk. Moscow. 2018. */

var window_focused = true;

document.addEventListener('DOMContentLoaded', function() {
     window.onfocus = function() {
         window_focused = true;
     };

     window.onblur = function() {
         window_focused = false;
     };

     var sliders = [];

     if((e = document.querySelector('.slider')) !== null) {
          var doc_sliders = document.getElementsByClassName('slider');
          for(var i = 0; i < doc_sliders.length; i++) {
               var id_increment = 0;
               while(doc_sliders[i].id == "") {
                    if(document.getElementById(("#slider_" + id_increment)) == null) {
                         doc_sliders[i].id = "#slider_" + id_increment;
                    }
                    id_increment++;
               }
               sliders[doc_sliders[i].id] = new Slider(doc_sliders[i].id);
          }
     }
});

function Slider(selector) {
     if (typeof selector === 'function') {
          addEventListener('DOMContentLoaded', selector);
          return;
     }

     if (!(this instanceof Slider)) {
          return new Slider(selector);
     }

     try {
          var element = document.getElementById(selector);
     } catch (e) {}

     this.autorotate = function () {
          var slider = this;
          this.autoplay.timer = setInterval(function() {
               if(window_focused) slider.change(1);
          }, this.autoplay.autoplay_delay);
     };

     this.pause = function () {
          var slider = this;
          if (slider.autoplay.state) {
               clearInterval(slider.autoplay.timer);
               clearTimeout(slider.autoplay.onchange_timeout_timer);
               slider.autoplay.onchange_timeout_timer = setTimeout(function () {
                    slider.autorotate();
               }, 10000);
          }
     }

     this.change = function (next) {
          this.slides.current = this.slides[0];
          this.slides.current_index = 0;

          for(var slide = 0; slide < this.slides.length; slide++) {
               if(this.slides[slide].classList.contains('current')) {
                    this.slides.current = this.slides[slide];
                    this.slides.current_index = slide;
               }
          }

          this.slides.next_index = ((this.slides.current_index + next) < 0 ? this.length - 1 : ((this.slides.current_index + next) > this.length - 1 ? 0 : this.slides.current_index + next));
          this.slides.next = this.slides[this.slides.next_index];


          if(this.animation == 'card') {
               this.slides.current.style.top = this.slides.next.style.top;
               this.slides.next.style.top = "0";

               if(this.direction == 'lr') {
                    this.slides.current.style.left = this.slides.next.style.left;
                    this.slides.next.style.left = "0";
               } else if(this.direction == 'rl') {
                    this.slides.current.style.right = this.slides.next.style.right;
                    this.slides.next.style.right = "0";
               }
          } else if(this.animation == 'gallery') {
               if(this.slides.next_index >= (this.length - this.display + 1)) {
                    this.slides.next_index = 0;
                    this.slides.next = this.slides[this.slides.next_index];
               }

               this.slides_wrapper[0].style.left = '-' + (this.slides.current.offsetWidth * this.slides.next_index) + 'px';
          } else if(this.animation == 'slider') {
               this.slides_wrapper[0].style.left = '-' + (this.slides.next_index * 100) + '%';
          }

          this.slides.current.classList.remove('current');
          this.slides.next.classList.add('current');

          if(this.previews.length > 1) {
               for(var preview = 0; preview < this.previews.length; preview++) {
                    if(this.previews[preview].classList.contains('current')) {
                         this.previews.current = this.previews[preview];
                         this.previews.current_index = preview;
                    }
               }

               this.previews.next_index = ((this.previews.current_index + next) < 0 ? this.previews.length - 1 : ((this.previews.current_index + next) > this.length - 1 ? 0 : this.previews.current_index + next));
               this.previews.next = this.previews[this.previews.next_index];

               for(var preview = 0; preview < this.previews.length; preview++) {
                    if(this.previews[preview].classList.contains('current')) {
                         this.previews.current = this.previews[preview];
                         this.previews.current_index = preview;
                    }
               }

               this.previews.current.classList.remove('current');
               this.previews.next.classList.add('current');
          }
     }

     this.animation = element.getAttribute('data-animation') ? element.getAttribute('data-animation') : 'slideshow';
     this.direction = element.getAttribute('data-direction') ? element.getAttribute('data-direction') : 'lr';
     this.display = element.getAttribute('data-display') ? parseInt(element.getAttribute('data-display')) : 5;
     this.pair = element.getAttribute('data-pair') ? (element.getAttribute('data-pair')) : false;
     this.slides_wrapper = element.getElementsByClassName('slider__wrapper');
     this.slides = element.getElementsByClassName('slider__slide');
     this.controls = element.getElementsByClassName('slider__arrow');
     this.previews = element.getElementsByClassName('slider-item__preview');
     this.length = this.slides.length;

     this.display_count = 100 / this.display;

     for(var control = 0; control < this.controls.length; control++) {
          var slider = this;
          this.controls[control].onclick = function (event) {
               for(var i = 0; i < slider.controls.length; i++)
                    if(slider.controls[i] == this)
                         slider.change(i === 0 ? -1 : 1);

               slider.pause();

               return false;
          };
     }

     for(var preview = 0; preview < this.previews.length; preview++) {
          var slider = this;
          this.previews[preview].onclick = function (event) {
               slider.previews.current = slider.previews[0];
               slider.previews.current_index = 0;

               for(var index = 0; index < slider.previews.length; index++) {
                    if(slider.previews[index].classList.contains('current')) {
                         slider.previews.current = slider.previews[index];
                         slider.previews.current_index = index;
                    }
               }

               for(var index = 0; index < slider.previews.length; index++) {
                    if(slider.previews[index] == this) {
                         slider.change(index - slider.previews.current_index);
                    }
               }

               slider.pause();

               return false;
          };
     }

     if(this.animation == 'card') {
          for(var slide = 0; slide < this.slides.length; slide++) {
               if(!this.slides[slide].classList.contains('current')) {
                    var offset = ((100 - (20 * slide)) * slide) + "%";
                    if(this.direction == 'lr') {
                         this.slides[slide].style.left = offset;
                    } else if(this.direction == 'rl') {
                         this.slides[slide].style.right = offset;
                    }
                    this.slides[slide].style.top =  (slide % 2 * 5) + "%";

               }

               var slider = this;
               this.slides[slide].onclick = function (event) {
                    slider.slides.current = slider.slides[0];
                    slider.slides.current_index = 0;

                    for(var index = 0; index < slider.slides.length; index++) {
                         if(slider.slides[index].classList.contains('current')) {
                              slider.slides.current = slider.slides[index];
                              slider.slides.current_index = index;
                         }
                    }

                    for(var index = 0; index < slider.slides.length; index++) {
                         if(slider.slides[index] == this) {
                              slider.change(index - slider.slides.current_index);
                         }
                    }

                    slider.pause();

                    return false;
               };
          }

          for(var control = 0; control < this.controls.length; control++) {
               this.controls[control].style.display = "none";
          }
     }

     this.autoplay = {};
     this.autoplay.state = typeof element.getAttribute('data-autoplay') !== typeof null && element.getAttribute('data-autoplay') !== false;

     this.autoplay.timer = null;
     this.autoplay.autoplay_delay = element.getAttribute('data-autoplay') != "" ? element.getAttribute('data-autoplay') : 5000;

     this.autoplay.onchange_timeout_timer = null;

     if (this.autoplay.state) {
          this.autorotate();
     }
}
