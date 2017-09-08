var Themify_Tiles;
/**
 * The array holds the interval objects set for auto-flip functionality
 */
var flip_inervals = [];

(function($){

	var Themify_Carousel_Tools = {

		intervals: [],

		highlight: function( item ) {
			item.addClass('current');
		},
		unhighlight: function($context) {
			$('li', $context).removeClass('current');
		},

		timer: function($timer, intervalID, timeout, step) {
			var progress = 0,
				increment = 0;

			this.resetTimer($timer, intervalID);

			this.intervals[intervalID] = setInterval(function() {
				progress += step;
				increment = ( progress * 100 ) / timeout;
				$timer.css('width', increment + '%');
			}, step);
		},

		resetTimer: function($timer, intervalID) {
			if ( null !== this.intervals[intervalID] ) {
				clearInterval( this.intervals[intervalID] );
			}
			$timer.width('width', '0%');
		},

		getCenter: function($context) {
			var visible = $context.triggerHandler('currentVisible');
			return Math.floor(visible.length / 2 );
		},

		getDirection: function($context, $element) {
			var visible = $context.triggerHandler( 'currentVisible' ),
				center = Math.floor(visible.length / 2 ),
				index = $element.index();
			if ( index >= center ) {
				return 'next';
			}
			return 'prev';
		},

		adjustCarousel: function($context) {
			if ( $context.closest('.twg-wrap' ).length > 0 ) {
				var visible = $context.triggerHandler('currentVisible').length,
					liWidth = $('li:first-child', $context).width();

				$context.triggerHandler('configuration', { width: ''+liWidth * visible, responsive: false });
				$context.parent().css('width', ( liWidth * visible ) + 'px');
			}
		}
	};

	function createCarousel(obj) {
		obj.each(function() {
			var $this = $(this),
				autoSpeed = 'off' != $this.data('autoplay') ? parseInt($this.data('autoplay'), 10) : 0,
				sliderArgs = {
					responsive : true,
					circular :  !!('yes' == $this.data('wrap')),
					infinite : true,
					height: 'auto',
					swipe: true,
					scroll : {
						items : $this.data('scroll') ? parseInt( $this.data('scroll'), 10 ) : 1,
						fx : $this.data('effect'),
						duration : parseInt($this.data('speed')),
						onBefore : function(items) {
							var $twgWrap = $this.closest('.twg-wrap'),
								$timer = $('.timer-bar', $twgWrap);
							if ( $timer.length > 0 ) {
								Themify_Carousel_Tools.timer($timer, $this.data('id'), autoSpeed, 20);
								Themify_Carousel_Tools.unhighlight( $this );
							}
						},
						onAfter : function(items) {
							var newItems = items.items.visible;
							var $twgWrap = $this.closest('.twg-wrap' );
							if ( $twgWrap.length > 0 ) {
								var $center = newItems.filter(':eq(' + Themify_Carousel_Tools.getCenter($this) + ')');
								$('.twg-link', $center).trigger('click');
								Themify_Carousel_Tools.highlight( $center );
							}
						}
					},
					auto : {
						play : !!('off' != $this.data('autoplay')),
						timeoutDuration : autoSpeed
					},
					items : {
						visible : {
							min : 1,
							max : $this.data('visible') ? parseInt( $this.data('visible'), 10 ) : 1
						},
						width : $this.data('width') ? parseInt( $this.data('width'), 10 ) : 222
					},
					prev : {
						button: 'yes' == $this.data('slidernav') ? '#' + $this.data('id') + ' .carousel-prev' : null
					},
					next : {
						button: 'yes' == $this.data('slidernav') ? '#' + $this.data('id') + ' .carousel-next' : null
					},
					pagination : {
						container : 'yes' == $this.data('pager') ? '#' + $this.data('id') + ' .carousel-pager' : null,
						anchorBuilder: function() {
							if ( $this.closest('.testimonial.slider').length > 0 ) {
								var thumb = $('.testimonial-post', this).data('thumb'),
									thumbw = $('.testimonial-post', this).data('thumbw'),
									thumbh = $('.testimonial-post', this).data('thumbh');
								return '<span><a href="#"><img src="' + thumb + '" width="' + thumbw + '" height="' + thumbh + '" /></a></span>';
							}
							if ( ( $this.closest('.portfolio-multiple.slider').length > 0 ) || ( $this.closest('.team-multiple.slider').length > 0 ) ) {
								return '<a href="#"></a>';
							}
							return false;
						}
					},
					onCreate : function() {
						var $slideshowWrap = $this.closest('.slideshow-wrap' ),
							$teamSliderWrap = $this.closest('.team-multiple.slider' ),
							$portfolioSliderWrap = $this.closest('.portfolio-multiple.slider' ),
							$testimonialSlider = $this.closest('.testimonial.slider' ),
							$twgWrap = $this.closest('.twg-wrap');

						$this.closest('.slider').prevAll('.slideshow-slider-loader').first().remove(); // remove slider loader

						$slideshowWrap.css({
							'visibility' : 'visible',
							'height' : 'auto'
						}).addClass('carousel-ready');

						if( $testimonialSlider.length > 0 ) {
							$testimonialSlider.css({
								'visibility' : 'visible',
								'height' : 'auto'
							});
							$('.carousel-pager', $slideshowWrap).addClass('testimonial-pager');
						}

						if ( $teamSliderWrap.length > 0 ) {
							$teamSliderWrap.css({
								'visibility' : 'visible',
								'height' : 'auto'
							});
							$('.carousel-prev, .carousel-next', $teamSliderWrap ).text('');
						}
						if ( $portfolioSliderWrap.length > 0 ) {
							$portfolioSliderWrap.css({
								'visibility' : 'visible',
								'height' : 'auto'
							});
							$('.carousel-prev, .carousel-next', $portfolioSliderWrap ).text('');
						}

						if ( 'no' == $this.data('slidernav') ) {
							$('.carousel-prev', $slideshowWrap).remove();
							$('.carousel-next', $slideshowWrap).remove();
						}

						if ( $twgWrap.length > 0 ) {

							var center = Themify_Carousel_Tools.getCenter($this),
								$center = $('li', $this).filter(':eq(' + center + ')');

							Themify_Carousel_Tools.highlight( $center );

							$this.trigger( 'slideTo', [ -center, { duration: 0 } ] );

							$('.carousel-pager', $twgWrap).remove();
							$('.carousel-prev', $twgWrap).addClass('gallery-slider-prev').text('');
							$('.carousel-next', $twgWrap).addClass('gallery-slider-next').text('');
						}

						$(window).resize();

						Themify_Carousel_Tools.adjustCarousel($this);
					}
				};

			// Fix unresponsive js script when there are only one slider item
			if ( $this.children().length < 2 ) {
				sliderArgs.onCreate();
				return true; // skip initialize carousel on this element
			}

			$this.carouFredSel( sliderArgs ).find('li').on(ThemifyTiles.galleryEvent, function(){
				if ( $this.closest('.twg-wrap').length > 0 ) {
					var $thisli = $(this);
					$('li', $this).removeClass('current');
					$thisli.addClass('current');
					$thisli.trigger('slideTo', [
						$thisli,
						- Themify_Carousel_Tools.getCenter($this),
						false,
						{
							items: 1,
							duration: 300,
							onBefore : function(items) {
								var $twgWrap = $this.closest('.twg-wrap' ),
									$timer = $('.timer-bar', $twgWrap);
								if ( $timer.length > 0 ) {
									Themify_Carousel_Tools.timer($timer, $this.data('id'), autoSpeed, 20);
									Themify_Carousel_Tools.unhighlight( $this );
								}
							},
							onAfter	: function(items) { }
						},
						null,
						Themify_Carousel_Tools.getDirection($this, $thisli)]
					);
				}
			});

			/////////////////////////////////////////////
			// Resize thumbnail strip on window resize
			/////////////////////////////////////////////
			$(window).on('debouncedresize', Themify_Carousel_Tools.adjustCarousel($this) );

		});
	}

	Themify_Tiles = {

		init : function(){
			$( window ).on( 'load', Themify_Tiles.do_tiles );
			$( 'body' ).on( 'builder_load_module_partial', Themify_Tiles.do_tiles )
			.on( 'builder_toggle_frontend', Themify_Tiles.do_tiles );

			// Flip Effect
			$( 'body' )
			.on( 'mouseenter', '.tf-tile.has-flip', function(){
				Themify_Tiles.flip_tile( $( this ), 'back' );
				window.clearInterval( flip_inervals[$( this ).attr( 'id' )] );
			} )
			.on( 'mouseleave', '.tf-tile.has-flip', function(){
				Themify_Tiles.flip_tile( $( this ), 'front' );
			} );

			$( 'body' ).on( 'click', '.tf-tile .tile-flip-back-button', function(){
				Themify_Tiles.flip_tile( $( this ).closest( '.tf-tile' ) );
				return false;
			} );
		},

		add_tiles_loader : function() {
			$( '.tf-tiles-wrap' ).append( '<div class="tile-loader"></div>' );
		},

		do_masonry : function ( container ) {
			// create a dummy tile to get the base tile size
			var dummy = $( '<div class="tf-tile size-square-small" style="display: none !important; visibility: hidden; opacity: 0;" />' ).appendTo( 'body' );
			container.masonry({
				itemSelector : '.tf-tile',
				columnWidth: dummy.width(),
				isResizeBound : false,
				gutter : 0,
				isOriginLeft : 1 /* @todo: support RTL */
			});
			dummy.remove();
		},

		do_tiles : function(){
			$( '.tf-tiles-wrap' ).each( function(){
				// apply masonry effect to each tile group
				var masonry_container = $( this );
				Themify_Tiles.do_masonry( masonry_container );
				// re-layout the tiles on debouncedresize
				$( window ).on( 'debouncedresize', function(){
					Themify_Tiles.do_masonry( masonry_container );
				} );

				masonry_container
					.find( '.tile-loader' ).remove().end()
					.find( '.tf-tile' ).css( 'visibility', 'visible' );
			} );

			// Auto Flip
			$( '.tf-tile.has-flip' ).each(function(){
				if( $( this ).data( 'auto-flip' ) > 0 ) {
					var el = $( this ),
						sec = el.data( 'auto-flip' ) * 1000;
					flip_inervals[el.attr( 'id' )] = window.setInterval(function(){
						Themify_Tiles.flip_tile( el );
					}, sec );
				}
			});

			if ( 'undefined' !== typeof $.fn.ThemifyWideGallery ) {
				$('.tf-tile .twg-wrap').ThemifyWideGallery({
					speed: parseInt(ThemifyTiles.galleryFadeSpeed, 10),
					event: ThemifyTiles.galleryEvent,
					ajax_url: ThemifyTiles.ajax_url,
					ajax_nonce: ThemifyTiles.ajax_nonce,
					networkError: ThemifyTiles.networkError,
					termSeparator: ThemifyTiles.termSeparator
				});
			}

			createCarousel( $('.tf-tile .slideshow') );
		},

		flip_tile : function( el, side ) {
			side = side || ( el.hasClass( 'tile-flip' ) ? 'front' : 'back' );
			if( side == 'front' ) {
				el.removeClass( 'tile-flip' )
					.find( '.tile-back' ).removeClass( el.data( 'in-effect' ) ).addClass( 'wow animated ' + el.data( 'out-effect' ) );

				window.setTimeout( function(){ el.removeClass( 'tile-flipped' ); }, ThemifyTiles.transition_duration );
			} else {
				el.addClass( 'tile-flip' )
					.find( '.tile-back' ).removeClass( el.data( 'out-effect' ) ).addClass( 'wow animated ' + el.data( 'in-effect' ) );

				window.setTimeout( function(){ el.addClass( 'tile-flipped' ); }, ThemifyTiles.transition_duration );
			}
		},

		request: 0,
		init_map : function( address, num, zoom, type, scroll, drag ){
			var delay = this.request++ * 500;
			setTimeout( function(){
				var geo = new google.maps.Geocoder(),
					latlng = new google.maps.LatLng(-34.397, 150.644),
					mapOptions = {
						'zoom': zoom,
						center: latlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						scrollwheel: scroll,
						draggable: drag
					};
				switch( type.toUpperCase() ) {
					case 'ROADMAP':
						mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
						break;
					case 'SATELLITE':
						mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
						break;
					case 'HYBRID':
						mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
						break;
					case 'TERRAIN':
						mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
						break;
				}
				var node = document.getElementById( 'themify_map_canvas_' + num );
				var	map = new google.maps.Map( node, mapOptions ),
					revGeocoding = $( node ).data('reverse-geocoding') ? true: false;

				/* store a copy of the map object in the dom node, for future reference */
				$( node ).data( 'gmap_object', map );

				if ( revGeocoding ) {
					var latlngStr = address.split(',', 2),
						lat = parseFloat(latlngStr[0]),
						lng = parseFloat(latlngStr[1]),
						geolatlng = new google.maps.LatLng(lat, lng),
						geoParams = { 'latLng': geolatlng };
				} else {
					var geoParams = { 'address': address };
				}

				geo.geocode( geoParams, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var position = revGeocoding ? geolatlng : results[0].geometry.location;
						map.setCenter(position);
						var marker = new google.maps.Marker({
							map: map,
							position: position
						}),

						info = $('#themify_map_canvas_' + num).data('info-window');
						if( undefined !== info ) {
							var contentString = '<div class="themify_builder_map_info_window">'+ info +'</div>',

							infowindow = new google.maps.InfoWindow({
								content: contentString
							});

							google.maps.event.addListener( marker, 'click', function() {
								infowindow.open( map, marker );
							});
						}
					}
				});
			}, delay );
		}

	};

	Themify_Tiles.init();
})( jQuery );