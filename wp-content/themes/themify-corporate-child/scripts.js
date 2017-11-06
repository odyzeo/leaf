jQuery(function(){
	var startX=startY=-1;
	function getCoord(e, c) {
		return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] : e['page' + c];
	}
	function open_dropdown( $li ) {
		$li.find( '.sub-menu, .children' ).first()
			.show().css( 'visibility', 'visible' );

		$li.addClass( 'dropdown-open' );
		$li.find( '> a .sub-arrow' ).removeClass( 'closed' ).addClass( 'open' );
		$li.trigger( 'dropdown_open' );
	}

	function close_dropdown( $li ) {
		$li.find( '.sub-menu, .children' ).first()
			.hide().css( 'visibility', 'hidden' );

		$li.removeClass( 'dropdown-open' );
		$li.find( '> a .sub-arrow' ).removeClass( 'open' ).addClass( 'closed' );
		$li.trigger( 'dropdown_close' );
	}
	jQuery('body').off('touchstart', '.with-sub-arrow a').on('touchstart', '#mobile-menu li.menu-item-has-children > a', function(e){
		e.stopPropagation();
		startX = getCoord(e, 'X');
		startY = getCoord(e, 'Y');
	}).off( 'touchend', '.with-sub-arrow a').on( 'touchend', '#mobile-menu li.menu-item-has-children > a', function(e){
		if ((Math.abs(getCoord(e, 'X') - startX) < 20 && Math.abs(getCoord(e, 'Y') - startY) < 20)||((startX==-1)&&(startY==-1))) {
			var t=jQuery( this );
      var x=t.children( '.sub-arrow' );
      if( true/*x.length > 0*/ ) {
				e.stopPropagation();

				var url = t.attr('href')
        if (url && url.indexOf('#') > -1) {
          return false
        }

        var menu_item = t.closest( 'li' );
  			if( menu_item.hasClass( 'dropdown-open' ) ) {
  				close_dropdown( menu_item );
  			} else {
  				open_dropdown( menu_item );
  			}
				return false;
			}
		}
	} );
  // jQuery(window).load(function(){
  //   jQuery('#mobile-menu li.current-menu-parent').each(function(){
  //     open_dropdown( jQuery(this) );
  //   });
  // });
});


jQuery(function(){
	jQuery('.module-post.sin-slider').each(function(){
		initSinSliderList(jQuery(this));
	});
	jQuery('.module-text.drop-show').each(function(){
		initSinDropShow(jQuery(this));
	});
	return;
});

function initSinDropShow(modul){
  if (!modul.hasClass('init')){
    modul.append('<a href="" class="drop-show-button"></a>');
    jQuery('.drop-show-button',modul).click(function(){
      modul.toggleClass('is-visible');
      return false;
    });
  }
}

function initSinSliderList(modul){
  function move(x,listOut,z,needturn,xz){
    var index=x.data('galleryindex');
    var y=z.children();
    var Z=Math.round(x.width()/y.eq(0).width());
    if (xz) Z=xz
    index+=needturn;
    if (index>y.length-Z) index=y.length-Z;
    if (index<0) index=0;
    x.data('galleryindex',index);
    listOut.stop(true,true).animate({left:(-index/Z*100)+'%'},700);
  }

  if (!modul.hasClass('init')){
    modul.addClass('init');
	  var list=jQuery('.builder-posts-wrap',modul);
	  var container=jQuery('<div class="builder-posts-wrap-out2"><div class="builder-posts-wrap-out"><div class="builder-posts-wrap-in"><div class="builder-posts-wrap-in2"></div></div><a href="" class="left-arrow"></a><a href="" class="right-arrow"></a></div></div>');
	  var listOut=jQuery('.builder-posts-wrap-in2',container);
	  var N=n=jQuery('.builder-posts-wrap-in',container);
	  container.insertBefore(list);
	  list.appendTo(listOut);
    jQuery(window).resize(function(){
    	var H=0;
    	jQuery('.post-image a',container).css('height','auto').each(function(){
    		var h=jQuery(this).height();
    		if (h>H) H=h;
    	}).css('height',H+'px');
    	move(N,listOut,list,0);
    }).resize();
    N.data('galleryindex',0);
    jQuery('.right-arrow',container).click(function(){
      move(N,listOut,list,1);
      return false;
    });
    jQuery('.left-arrow',container).click(function(){
      move(N,listOut,list,-1);
      return false;
    });
  }
}
