;// Themify Theme Scripts - https://themify.me/

// Initialize object literals
var EntryFilter = {};

/////////////////////////////////////////////
// jQuery functions					
/////////////////////////////////////////////
(function($){

/////////////////////////////////////////////
// jQuery functions
/////////////////////////////////////////////
$.fn.fixedHeader = function(options){
	var defaults = {
			fixedClass: 'fixed-header'
		},
		settings = $.extend({}, defaults, options);

	return this.each(function(){
		var $this = $(this),
			$parent = $this.parent(),
			thisHeight = $this.height(),
			$window = $(window),
			$body = $('body');

		if(themifyScript.sticky_header){
			var img = '<img id="sticky_header_logo" src="' + themifyScript.sticky_header.src + '"';
				img+='/>';
			$('#site-logo a').prepend(img);
		}

		function onScroll(){
			var scrollTop = $window.scrollTop();

			if(scrollTop > thisHeight) {
				$this.addClass(settings.fixedClass);
				$body.addClass('fixed-header-on');
			} else {
				$this.removeClass(settings.fixedClass);
				$body.removeClass('fixed-header-on');
			}
		};

		$window.on( 'scroll.fixedHeader touchstart.touchScroll touchmove.touchScroll', onScroll );
	});
};

// Initialize carousels //////////////////////////////
function createCarousel(obj) {
	obj.each(function() {
		var $this = $(this);
		$this.carouFredSel({
			responsive : true,
			prev : '#' + $this.data('id') + ' .carousel-prev',
			next : '#' + $this.data('id') + ' .carousel-next',
			pagination : {
				container : '#' + $this.data('id') + ' .carousel-pager'
			},
			circular : true,
			infinite : true,
			swipe: true,
			scroll : {
				items : 1,
				fx : $this.data('effect'),
				duration : parseInt($this.data('speed'))
			},
			auto : {
				play : !!('off' != $this.data('autoplay')),
				timeoutDuration : 'off' != $this.data('autoplay') ? parseInt($this.data('autoplay')) : 0
			},
			items : {
				visible : {
					min : 1,
					max : 1
				},
				width : 222
			},
			onCreate : function() {
				$this.closest('.slideshow-wrap').css({
					'visibility' : 'visible',
					'height' : 'auto'
				});
				var $testimonialSlider = $this.closest('.testimonial.slider');
				if( $testimonialSlider.length > 0 ) {
					$testimonialSlider.css({
						'visibility' : 'visible',
						'height' : 'auto'
					});
				}
				$(window).resize();
			}
		});
	});
}

// Scroll to Element //////////////////////////////
function themeScrollTo(offset) {
	$('body,html').animate({ scrollTop: offset }, 800);
}

// Entry Filter /////////////////////////
EntryFilter = {
	filter: function(){
		var $filter = $('.post-filter');
		if ( $filter.find('a').length > 0 && 'undefined' !== typeof $.fn.isotope ){
                        $filter.next('.portfolio').addClass('masonry');
			$filter.find('li').each(function(){
				var $li = $(this),
					$entries = $li.parent().next(),
					cat = $li.attr('class').replace( /(current-cat)|(cat-item)|(-)|(active)/g, '' ).replace( ' ', '' );
				if ( $entries.find('.portfolio-post.cat-' + cat).length <= 0 ) {
					$li.remove();
				}
			});

			$filter.show().on('click', 'a', function(e) {
				e.preventDefault();
				var $li = $(this).parent(),
					$entries = $li.parent().next();
				if ( $li.hasClass('active') ) {
					$li.removeClass('active');
					$entries.isotope( {
						filter: '.portfolio-post',
						isOriginLeft : ! $( 'body' ).hasClass( 'rtl' )
					} );
				} else {
					$li.siblings('.active').removeClass('active');
					$li.addClass('active');
					$entries.isotope( {
						filter: '.cat-' + $li.attr('class').replace( /(current-cat)|(cat-item)|(-)|(active)/g, '' ).replace( ' ', '' ),
						isOriginLeft : ! $( 'body' ).hasClass( 'rtl' )
					} );
				}
			} );
		}
	},
	layout: function(){
		var $entries = $('.loops-wrapper.portfolio.masonry:not(.fullwidth)');

		if($entries.find( '.grid-sizer' ).length===0) {
                    $entries.prepend('<div class="grid-sizer"></div><div class="gutter-sizer"></div>');
		}

		$entries.addClass( 'masonry-done' ).isotope({
			masonry: {
				columnWidth:  '.grid-sizer',
				gutter:  '.gutter-sizer'
			},
			transformsEnabled: false,
			itemSelector : '.portfolio-post',
			isOriginLeft : ! $( 'body' ).hasClass( 'rtl' )
		});
	}
};

// DOCUMENT READY
$(document).ready(function() {

	var $body = $('body'),$skills = $('.progress-bar');

	// make portfolio overlay clickable
	$body.on( 'click', '.loops-wrapper.grid4.portfolio.overlay .post-image + .post-content, .loops-wrapper.grid3.portfolio.overlay .post-image + .post-content, .loops-wrapper.grid2.portfolio.overlay .post-image + .post-content', function(e){
		if( $( e.target ).is( 'a' ) || $( e.target ).parent().is( 'a' ) ) return;
		var $link = $( this ).closest( '.post' ).find( 'a[data-post-permalink]' );
		if( $link.length > 0 && ! $link.hasClass( 'themify_lightbox' ) ) {
			window.location = $link.attr( 'href' );
		}
	});

	/////////////////////////////////////////////
	// Fixed header
	/////////////////////////////////////////////
	var headerHeight = $('#headerwrap').outerHeight(true);
	$('#pagewrap').css('paddingTop', Math.floor( headerHeight ));
	if('undefined' !== $.fn.fixedHeader && '' != themifyScript.fixedHeader){
		$('#headerwrap').fixedHeader();
	}

	/////////////////////////////////////////////
	// Scroll to row when a menu item is clicked.
	/////////////////////////////////////////////
	if ( 'undefined' !== typeof $.fn.themifyScrollHighlight ) {
		$body.themifyScrollHighlight();
	}

	/////////////////////////////////////////////
	// Entry Filter
	/////////////////////////////////////////////
	EntryFilter.filter();

	/////////////////////////////////////////////
	// Skillset Animation
	/////////////////////////////////////////////
	if(themifyScript.scrollingEffectOn && $skills.length>0) {
            if(!$.fn.waypoint){
                Themify.LoadAsync(themify_vars.url+'/js/waypoints.min.js',ThemifySkils);
            }
            else{
                ThemifySkils();
            }
	}
        function ThemifySkils(){
            $skills.each(function(){
                var $self = $(this).find('span'),
                    percent = $self.data('percent');
                $self.width(0);
                $self.waypoint(function(direction){
                        $self.animate({width: percent}, 800,function(){
                                $(this).addClass('animated');
                        });
                }, {offset: '80%'});
            });
        }

	/////////////////////////////////////////////
	// Scroll to top
	/////////////////////////////////////////////
	$('.back-top a').on('click', function(e){
		e.preventDefault();
		themeScrollTo(0);
	});

	/////////////////////////////////////////////
	// Toggle main nav on mobile
	/////////////////////////////////////////////
	if( $body.hasClass( 'touch' ) && typeof jQuery.fn.themifyDropdown != 'function' ) {
		Themify.LoadAsync(themify_vars.url + '/js/themify.dropdown.js', function(){
			$( '#main-nav' ).themifyDropdown();
		});
	}

	$('#menu-icon').themifySideMenu({
		close: '#menu-icon-close'
	});
        var $overlay = $( '<div class="body-overlay">' );
        $body.append( $overlay ).on( 'sidemenushow.themify', function () {
            $overlay.addClass( 'body-overlay-on' );
        } ).on( 'sidemenuhide.themify', function () {
            $overlay.removeClass( 'body-overlay-on' );
        } ).on( 'click.themify touchend.themify', '.body-overlay', function () {
            $( '#menu-icon' ).themifySideMenu( 'hide' );
        } ); 
        $(window).resize(function(){
            if( $( '#menu-icon' ).is(':visible') && $('#mobile-menu').hasClass('sidemenu-on')){
                $overlay.addClass( 'body-overlay-on' );
            }
            else{
                 $overlay.removeClass( 'body-overlay-on' );
            }
        });
	/////////////////////////////////////////////
	// Add class "first" to first elements
	/////////////////////////////////////////////
	$('.highlight-post:odd').addClass('odd');
});

// WINDOW LOAD
$(window).load(function() {

	/////////////////////////////////////////////
	// Carousel initialization
	/////////////////////////////////////////////
        if($('.slideshow').length>0){
            if(!$.fn.carouFredSel){
                Themify.LoadAsync(themify_vars.url+'/js/carousel.min.js',function(){
                    createCarousel($('.slideshow'));
                });
            }
            else{
               createCarousel($('.slideshow'));
            }
        }
	/////////////////////////////////////////////
	// Entry Filter Layout
	/////////////////////////////////////////////
	EntryFilter.layout();

});
	
})(jQuery);