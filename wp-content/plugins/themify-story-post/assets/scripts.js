/*
function setShowClassToElement(){
	var x=jQuery('.module-story .loops-wrapper.grid7 .post:not(.show-image)');
	if (x.length>0){
		var y=Math.floor((Math.random() * x.length));
		x.eq(y).addClass('show-image');
	}
	if (x.length>1){
		setTimeout('setShowClassToElement()',750);
	}else{
		jQuery(".module-story .module-title-anim").hide();
	}
}
*/

function setShowClassToElement(){
	var x=jQuery('.module-story .loops-wrapper.grid7 .post:not(.randomdefined)').mouseenter(function(){jQuery(this).addClass('hover')}).mouseleave(function(){jQuery(this).removeClass('hover')});
	var i=0;
	while (x.length>0){
		var y=x.eq(Math.floor(Math.random() * x.length));
		y.addClass('randomdefined');
		setTimeout('jQuery("#'+y.attr('id')+'").addClass("show-image")',i*150);
		i++;
		x=jQuery('.module-story .loops-wrapper.grid7 .post:not(.randomdefined)');
	}
	/*
	.each(function(){
		setTimeout('jQuery("#'+jQuery(this).attr('id')+'").addClass("show-image")',Math.floor((Math.random() * 5000)));
	});
	*/
}

function setShowTextToElement(){
	var x=jQuery('.module-story .module-title-anim span:not(.show-char)');
	if (x.length>0){
		x.eq(0).addClass('show-char');
		if (x.length>1){
			setTimeout('setShowTextToElement()',50);
		}else
			setShowClassToElement();
	}
}


jQuery(function(){

  function setCookie(cname, cvalue, exdays) {
      var expires = "";
      if (exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires = ";expires="+ d.toUTCString();
      }
      document.cookie = cname + "=" + cvalue + expires + ";path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = document.cookie; /*decodeURIComponent(document.cookie);*/
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

	var X=jQuery('.module-story');
  var x=jQuery('.module-title',X);
	/*
  var y=x.text();
	x.after('<div class="module-title-anim"><div class="module-title-anim-in"><div class="module-title-anim-in2"><span class="show-char">'+y+'</span></div></div></div>');
  */
  if (getCookie('noanim')==1) jQuery('.module-story').addClass('noanim');

	jQuery(window).load(function(){
		var X=jQuery('.module-story');
    if (X.hasClass('noanim')){
    	jQuery('.module-story .loops-wrapper.grid7 .post').mouseenter(function(){jQuery(this).addClass('hover')}).mouseleave(function(){jQuery(this).removeClass('hover')});
      return;
    }
    setShowClassToElement();
    setCookie('noanim', 1);
		/*
    var x=jQuery('.module-title',X);
		var y=x.text();
		y=y.split('');
		y=y.join('</span><span>');
		x.after('<div class="module-title-anim"><div class="module-title-anim-in"><div class="module-title-anim-in2"><span>'+y+'</span></div></div></div>');
		setShowTextToElement();
    */
	});
});