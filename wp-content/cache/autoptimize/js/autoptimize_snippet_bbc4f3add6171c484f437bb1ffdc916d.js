!function(a,b){function c(){function a(){"undefined"!=typeof _wpmejsSettings&&(c=b.extend(!0,{},_wpmejsSettings)),c.classPrefix="mejs-",c.success=c.success||function(a){var b,c;a.rendererName&&-1!==a.rendererName.indexOf("flash")&&(b=a.attributes.autoplay&&"false"!==a.attributes.autoplay,c=a.attributes.loop&&"false"!==a.attributes.loop,b&&a.addEventListener("canplay",function(){a.play()},!1),c&&a.addEventListener("ended",function(){a.play()},!1))},b(".wp-audio-shortcode, .wp-video-shortcode").not(".mejs-container").filter(function(){return!b(this).parent().hasClass("mejs-mediaelement")}).mediaelementplayer(c)}var c={};return{initialize:a}}a.wp=a.wp||{},a.wp.mediaelement=new c,b(a.wp.mediaelement.initialize)}(window,jQuery);