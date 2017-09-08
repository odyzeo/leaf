
jQuery(function(){
	jQuery(window).load(function(){

    var tTime=false;
    var N=jQuery('#news-posts-list');
    var n=jQuery('.module-news .builder-posts-wrap');
    
    function moveSlideshow(x,needturn,newindex){
      if (tTime) clearTimeout(tTime)
      var Z=1;
      var index=x.data('galleryindex');
      index+=needturn;
      if (needturn==0){
        index=1*newindex+1;
      }
      var pomindex=index;
      var z=jQuery('.builder-posts-wrap-in',x);
      var y=jQuery('article.news-post',z);
      if (index>=y.length-Z) index=0+1;
      if (index<=0) index=y.length-Z-1;
      x.data('galleryindex',index);
      var w=jQuery('li a.act',N).removeClass('act').outerWidth();
      jQuery('li.item'+(index-1)+' a',N).addClass('act');
      var Zl=Math.round(n.outerWidth()/w);
      z.stop(true,true).animate({left:((-pomindex)/Z*100)+'%'},700,function(){
        if (pomindex!=index)
          z.css({left:((-index)/Z*100)+'%'});
      });
      N.stop(true,true).animate({'left':(-(index-1)/Zl*100)+'%'},700,function(){
        N.css({'left':(-(index-1)/Zl*100)+'%'});
      });
      tTime=setTimeout('jQuery(".module-news .right-arrow").click()',10000);
    }

    jQuery(window).resize(function(){
      var T=jQuery('.module-news .builder-posts-wrap');
      var W=T.width();
      var H=T.height();
      jQuery('.module-news .builder-posts-wrap .post-image img').css({width:'auto',height:'auto',margin:0}).each(function(){
        var t=jQuery(this);
        var w=t.width();
        var h=t.height();
        var hx=W*h/w;
        var wx=H*w/h;
        if (hx>H){
          t.css({width:W+'px','height':'auto','margin':((H-hx)/2)+'px 0 0 0'});
        }else{
          t.css({width:'auto',height:H+'px','margin':'0 0 0 '+((W-wx)/2)+'px'});
        }
      });
    }).resize();
    
    if (!n.hasClass('init')){
      n.addClass('init');
      jQuery('li.item0 a',N).addClass('act');
      
      var x=jQuery('.module-news .builder-posts-wrap-out');
      var z=jQuery('.builder-posts-wrap-in',x);
      var y=jQuery('article.news-post',z);
      
      if (y.length==1){ 
        jQuery('.right-arrow,.left-arrow',x).hide();
        return;
      }
      
      var X0=y.eq(0).clone();
      var X1=y.eq(-1).clone();
      X0.appendTo(z);
      X1.prependTo(z);
      x.data('galleryindex',1);
      z.css({left:'-100%'});
      
      jQuery('.right-arrow',x).click(function(){
        moveSlideshow(x,1);
        return false;
      });
      jQuery('.left-arrow',x).click(function(){
        moveSlideshow(x,-1);
        return false;
      });
      
      /**/
      jQuery('li a',N).click(function(){
        var c=jQuery(this).parent().attr('data-item');
        moveSlideshow(x,0,c);
        return false;
        var c=jQuery(this).parent().attr('class');
        var r=RegExp('^([a-z0-9\-\_]+ )*(item([0-9]+))( [a-z0-9\-\_]+)*$');
        var a=r.exec(c);
        if (a.length>3){
          moveSlideshow(x,0,a[3]);
        }
        return false;
      });
      /**/

      tTime=setTimeout('jQuery(".module-news .right-arrow").click()',10000);
    }
    
	});
});
