
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
