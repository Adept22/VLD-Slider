# Very responsive VLD Slider

### Made with :heart:
I created this for myself. And in process creating I added all my love of programming for perfect work of the slider. Because I'm use him in my another projects. I'm hope what my creation can supports you too.

### So fast!
While creating, one of the criterion was the working speed. You can check this! Size of JS file is contain 8.7 kB and stylesheet file is 2.3 kB! Another loading speed depends of your content.

### Adaptive
My creation really adaptive. You don't need to create media queries for different screen sizes! I did do it for you. All what you need it's include two files and do some HTML markup.


## INSTALLATION

### Include CSS and JS
Include CSS and JS files in your project (Make shure what slider doesn't need another libruaries)
```
<link href="path/to/vld-slider.min.css" rel="stylesheet" />
<script src="path/to/vld-slider.min.js" type="text/javascript"></script>
```

### Create HTML markup
The slider has a fairly simple layout, the main thing is to make sure that the necessary classes are present:
* .slider
* .slider__wrapper
* .slider__slide
* .slider__arrow

```
<div class="slider">
     <div class="slider__wrapper">
          <div class="slider__slide current">...</div>
          <div class="slider__slide">...</div>
          ...
     </div>
     <div class="slider-nav__wrapper">
          <div class="slider-nav__content">
               <a href="#" class="slider__arrow left-arrow">...</a>
               <a href="#" class="slider__arrow right-arrow">...</a>
          </div>
     </div>
</div>
```


## SETTINGS

### Autorotate
Slider supports autorotate (autoplay). Default rotate delay is 5000ms and when user change slide using navs, slider will stop on 10000ms. To enable the feature - add attribute for the .slider block.

```
<div class="slider" data-autoplay="5000">
     ...
</div>
```

### Bottom navigation
You can add a bottom navigation for your slider by including this code in the end of .slider block.

```
<ul class="slider-items__preview">
     <li><a class="slider-item__preview current" href="#" >...</a></li>
     <li><a class="slider-item__preview" href="#" >...</a></li>
     ...
</ul>
```

### Slides animation
Slider support 2 types of animation (More in the future). Default type is 'slideshow' (like in example on top of the page). You can change animation to 'gallery' (default items count equals 5) by adding data attribute for the .slider block.

```
<div class="slider" data-animation="items" data-display="5">
     ...
</div>
```

### For more information visit my [website](https://slider.vld-dev.com/)
