(function () {
    'use strict';
     
    function FluentMenu(options)
    {
        var defaults = {
            menu: '.nav',
            mode: 'default',
            swipeClass: 'swipe',
            responsive: []
        }

        if (options && typeof options === "object") {
            this.options = extend(defaults, options);
        }

        
        this.getMenu()
        this.hideMenu()
        this.init()
        this.responsive(defaults, options)
    };

    
    function extend(defaults, options)
    {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    FluentMenu.prototype.init = function() {
        var options = this.options
        window.addEventListener('unload', function() {
            var menu = document.querySelector(options.menu)
            var event = new Event('blur')
            menu.dispatchEvent(event)
        })
    }

    FluentMenu.prototype.getMenu = function() {
        var menu = document.querySelector(this.options.menu)
        menu.addEventListener('focus', function() {
            this.classList.add('active');
            document.querySelector('body').classList.add('body-static')
            // document.querySelector('html').classList.add('body-static')
        }, true);
    }

    FluentMenu.prototype.hideMenu = function() {
        var menu = document.querySelector(this.options.menu)
        menu.addEventListener('blur', function() {
            this.classList.remove('active');
            document.querySelector('body').classList.remove('body-static')
            // document.querySelector('html').classList.remove('body-static')
        }, true);
    }

    FluentMenu.prototype.responsive = function(defaults, config) {
        var options = this.options
        
        if (options.responsive.length > 0) {
            
            window.addEventListener('resize', function() {
                screenDetected(options, config, defaults)
            })

            screenDetected(options, config, defaults)
        }
    }
    
    function screenDetected(options, config, defaults) {
        var ww = document.documentElement.clientWidth
        for (var i = 0; i < options.responsive.length; i++) {
            if (ww <= options.responsive[i].breakpoint) {
                options.mode = options.responsive[i].mode
                options.swipeClass = 'swipe'
                document.querySelector(options.menu).classList.add(options.swipeClass)
            } else {
                options.mode = config.mode ? config.mode : defaults.mode
                document.querySelector(options.menu).classList.remove(options.swipeClass)
            }
        }
    }


    window.FluentMenu = FluentMenu;
     
})()

$(document).ready(function(){

    var ww = document.documentElement.clientWidth
    if (ww <= 1024) {
        new FluentMenu({
            menu: '.main-nav',
            responsive: [{
                breakpoint: 1024,
                mode: 'mobile'
            }]
        })
    }

    // Banner video
    $('.play-btn').on('click', function(e){
        e.preventDefault()

        var container = $('.banner-layout')

        var loader = `<div class="loader-layout">
            <svg class="spinner spinner--circle" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>`

        var video = `<video id="banner-video" class="video-player" autoplay="" controls="" preload="none">
            <source src="assets/video/video_mmm.mp4" type="video/mp4">
            <source src="assets/video/video_mmm.webm" type="video/webm">
        </video>`;

        $('.banner-body').addClass('loading')
        $(container).append(loader)
        setTimeout(function(){
            $('.banner-body').toggleClass('loaded');
            $('.video-player-layout').html(video)
            $(container).find('.loader-layout').remove()
        },2000)
       
    })

    // Tabs
    $('.tabs-body').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: '.tabs-nav-list',
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon fa fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon fa fa-angle-right"></i></button>',
    });
    $('.tabs-nav-list').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.tabs-body',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });
})