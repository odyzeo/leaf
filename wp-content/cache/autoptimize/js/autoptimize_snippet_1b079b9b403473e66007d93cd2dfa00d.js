var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(b,t,n){b instanceof String&&(b=String(b));for(var p=b.length,q=0;q<p;q++){var B=b[q];if(t.call(n,B,q,b))return{i:q,v:B}}return{i:-1,v:void 0}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,t,n){b!=Array.prototype&&b!=Object.prototype&&(b[t]=n.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};
$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(b,t,n,p){if(t){n=$jscomp.global;b=b.split(".");for(p=0;p<b.length-1;p++){var q=b[p];q in n||(n[q]={});n=n[q]}b=b[b.length-1];p=n[b];t=t(p);t!=p&&null!=t&&$jscomp.defineProperty(n,b,{configurable:!0,writable:!0,value:t})}};$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(b,n){return $jscomp.findInternal(this,b,n).v}},"es6-impl","es3");
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):"object"===typeof exports?module.exports=b(require("jquery")):b(jQuery)})(function(b){function t(a,c){var d=b('<div class="minicolors" />'),k=b.minicolors.defaults,e;if(!a.data("minicolors-initialized")){c=b.extend(!0,{},k,c);d.addClass("minicolors-theme-"+c.theme).toggleClass("minicolors-with-opacity",c.opacity);void 0!==c.position&&b.each(c.position.split(" "),function(){d.addClass("minicolors-position-"+this)});k="rgb"===
c.format?c.opacity?"25":"20":c.keywords?"11":"7";a.addClass("minicolors-input").data("minicolors-initialized",!1).data("minicolors-settings",c).prop("size",k).wrap(d).after('<div class="minicolors-panel minicolors-slider-'+c.control+'"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>');
c.inline||(a.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'),a.next(".minicolors-input-swatch").on("click",function(c){c.preventDefault();a.focus()}));k=a.parent().find(".minicolors-panel");k.on("selectstart",function(){return!1}).end();if(c.swatches&&0!==c.swatches.length)for(k.addClass("minicolors-with-swatches"),k=b('<ul class="minicolors-swatches"></ul>').appendTo(k),e=0;e<c.swatches.length;++e){var g=c.swatches[e];
g=w(g)?x(g,!0):u(y(g,!0));b('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').appendTo(k).data("swatch-color",c.swatches[e]).find(".minicolors-swatch-color").css({backgroundColor:D(g),opacity:g.a});c.swatches[e]=g}c.inline&&a.parent().addClass("minicolors-inline");z(a,!1);a.data("minicolors-initialized",!0)}}function n(a){var c=a.parent();a.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input");
c.before(a).remove()}function p(a){var c=a.parent(),d=c.find(".minicolors-panel"),b=a.data("minicolors-settings");!a.data("minicolors-initialized")||a.prop("disabled")||c.hasClass("minicolors-inline")||c.hasClass("minicolors-focus")||(q(),c.addClass("minicolors-focus"),b.beforeShow&&b.beforeShow.call(a.get(0)),d.stop(!0,!0).fadeIn(b.showSpeed,function(){b.show&&b.show.call(a.get(0))}))}function q(){b(".minicolors-focus",top.document).each(function(){var a=b(this),c=a.find(".minicolors-input"),d=a.find(".minicolors-panel"),
k=c.data("minicolors-settings");d.fadeOut(k.hideSpeed,function(){k.hide&&k.hide.call(c.get(0));a.removeClass("minicolors-focus")})})}function B(a,c,d){var b=a.parents(".minicolors").find(".minicolors-input"),e=b.data("minicolors-settings"),g=a.find("[class$=-picker]"),m=a.offset().left,l=a.offset().top,h=Math.round(c.pageX-m),f=Math.round(c.pageY-l);d=d?e.animationSpeed:0;c.originalEvent.changedTouches&&(h=c.originalEvent.changedTouches[0].pageX-m,f=c.originalEvent.changedTouches[0].pageY-l);0>h&&
(h=0);0>f&&(f=0);h>a.width()&&(h=a.width());f>a.height()&&(f=a.height());a.parent().is(".minicolors-slider-wheel")&&g.parent().is(".minicolors-grid")&&(m=75-h,l=75-f,c=Math.sqrt(m*m+l*l),m=Math.atan2(l,m),0>m&&(m+=2*Math.PI),75<c&&(c=75,h=75-75*Math.cos(m),f=75-75*Math.sin(m)),h=Math.round(h),f=Math.round(f));a.is(".minicolors-grid")?g.stop(!0).animate({top:f+"px",left:h+"px"},d,e.animationEasing,function(){F(b,a)}):g.stop(!0).animate({top:f+"px"},d,e.animationEasing,function(){F(b,a)})}function F(a,
c){function d(a,c){if(!a.length||!c)return null;var b=a.offset().left;var d=a.offset().top;return{x:b-c.offset().left+a.outerWidth()/2,y:d-c.offset().top+a.outerHeight()/2}}var b=a.val();var e=a.attr("data-opacity");var g=a.parent();var m=a.data("minicolors-settings");var l=g.find(".minicolors-input-swatch");var h=g.find(".minicolors-grid");var n=g.find(".minicolors-slider"),q=g.find(".minicolors-opacity-slider");var r=h.find("[class$=-picker]");var A=n.find("[class$=-picker]"),p=q.find("[class$=-picker]");
r=d(r,h);A=d(A,n);p=d(p,q);if(c.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")){switch(m.control){case "wheel":b=h.width()/2-r.x;g=h.height()/2-r.y;h=Math.sqrt(b*b+g*g);b=Math.atan2(g,b);0>b&&(b+=2*Math.PI);75<h&&(h=75,r.x=69-75*Math.cos(b),r.y=69-75*Math.sin(b));e=f(h/.75,0,100);l=f(180*b/Math.PI,0,360);r=f(100-Math.floor(A.y*(100/n.height())),0,100);b=v({h:l,s:e,b:r});n.css("backgroundColor",v({h:l,s:e,b:100}));break;case "saturation":l=f(parseInt(r.x*(360/h.width()),10),
0,360);e=f(100-Math.floor(A.y*(100/n.height())),0,100);r=f(100-Math.floor(r.y*(100/h.height())),0,100);b=v({h:l,s:e,b:r});n.css("backgroundColor",v({h:l,s:100,b:r}));g.find(".minicolors-grid-inner").css("opacity",e/100);break;case "brightness":l=f(parseInt(r.x*(360/h.width()),10),0,360);e=f(100-Math.floor(r.y*(100/h.height())),0,100);r=f(100-Math.floor(A.y*(100/n.height())),0,100);b=v({h:l,s:e,b:r});n.css("backgroundColor",v({h:l,s:e,b:100}));g.find(".minicolors-grid-inner").css("opacity",1-r/100);
break;default:l=f(360-parseInt(A.y*(360/n.height()),10),0,360),e=f(Math.floor(r.x*(100/h.width())),0,100),r=f(100-Math.floor(r.y*(100/h.height())),0,100),b=v({h:l,s:e,b:r}),h.css("backgroundColor",v({h:l,s:100,b:100}))}e=m.opacity?parseFloat(1-p.y/q.height()).toFixed(2):1;G(a,b,e)}else l.find("span").css({backgroundColor:b,opacity:e}),E(a,b,e)}function G(a,c,b){var d=a.parent(),e=a.data("minicolors-settings"),d=d.find(".minicolors-input-swatch");e.opacity&&a.attr("data-opacity",b);if("rgb"===e.format){c=
w(c)?x(c,!0):u(y(c,!0));b=""===a.attr("data-opacity")?1:f(parseFloat(a.attr("data-opacity")).toFixed(2),0,1);if(isNaN(b)||!e.opacity)b=1;c=1>=a.minicolors("rgbObject").a&&c&&e.opacity?"rgba("+c.r+", "+c.g+", "+c.b+", "+parseFloat(b)+")":"rgb("+c.r+", "+c.g+", "+c.b+")"}else w(c)&&(c=H(c)),c=C(c,e.letterCase);a.val(c);d.find("span").css({backgroundColor:c,opacity:b});E(a,c,b)}function z(a,c){var d;var k=a.parent();var e=a.data("minicolors-settings");var g=k.find(".minicolors-input-swatch");var m=k.find(".minicolors-grid"),
l=k.find(".minicolors-slider");var h=k.find(".minicolors-opacity-slider");var n=m.find("[class$=-picker]"),q=l.find("[class$=-picker]"),r=h.find("[class$=-picker]");if(w(a.val())){var p=H(a.val());(d=f(parseFloat(I(a.val())).toFixed(2),0,1))&&a.attr("data-opacity",d)}else p=C(y(a.val(),!0),e.letterCase);p||(p=C(J(e.defaultValue,!0),e.letterCase));d=K(p);var t=e.keywords?b.map(e.keywords.split(","),function(a){return b.trim(a.toLowerCase())}):[];t=""!==a.val()&&-1<b.inArray(a.val().toLowerCase(),t)?
C(a.val()):w(a.val())?x(a.val()):p;c||a.val(t);if(e.opacity){var u=""===a.attr("data-opacity")?1:f(parseFloat(a.attr("data-opacity")).toFixed(2),0,1);isNaN(u)&&(u=1);a.attr("data-opacity",u);g.find("span").css("opacity",u);h=f(h.height()-h.height()*u,0,h.height());r.css("top",h+"px")}"transparent"===a.val().toLowerCase()&&g.find("span").css("opacity",0);g.find("span").css("backgroundColor",p);switch(e.control){case "wheel":k=f(Math.ceil(.75*d.s),0,m.height()/2);g=d.h*Math.PI/180;e=f(75-Math.cos(g)*
k,0,m.width());h=f(75-Math.sin(g)*k,0,m.height());n.css({top:h+"px",left:e+"px"});h=150-d.b/(100/m.height());""===p&&(h=0);q.css("top",h+"px");l.css("backgroundColor",v({h:d.h,s:d.s,b:100}));break;case "saturation":e=f(5*d.h/12,0,150);h=f(m.height()-Math.ceil(d.b/(100/m.height())),0,m.height());n.css({top:h+"px",left:e+"px"});h=f(l.height()-d.s*(l.height()/100),0,l.height());q.css("top",h+"px");l.css("backgroundColor",v({h:d.h,s:100,b:d.b}));k.find(".minicolors-grid-inner").css("opacity",d.s/100);
break;case "brightness":e=f(5*d.h/12,0,150);h=f(m.height()-Math.ceil(d.s/(100/m.height())),0,m.height());n.css({top:h+"px",left:e+"px"});h=f(l.height()-d.b*(l.height()/100),0,l.height());q.css("top",h+"px");l.css("backgroundColor",v({h:d.h,s:d.s,b:100}));k.find(".minicolors-grid-inner").css("opacity",1-d.b/100);break;default:e=f(Math.ceil(d.s/(100/m.width())),0,m.width()),h=f(m.height()-Math.ceil(d.b/(100/m.height())),0,m.height()),n.css({top:h+"px",left:e+"px"}),h=f(l.height()-d.h/(360/l.height()),
0,l.height()),q.css("top",h+"px"),m.css("backgroundColor",v({h:d.h,s:100,b:100}))}a.data("minicolors-initialized")&&E(a,t,u)}function E(a,c,b){var d=a.data("minicolors-settings"),e=a.data("minicolors-lastChange"),g;if(!e||e.value!==c||e.opacity!==b){a.data("minicolors-lastChange",{value:c,opacity:b});if(d.swatches&&0!==d.swatches.length){e=w(c)?x(c,!0):u(c);var f=-1;for(g=0;g<d.swatches.length;++g)if(e.r===d.swatches[g].r&&e.g===d.swatches[g].g&&e.b===d.swatches[g].b&&e.a===d.swatches[g].a){f=g;break}a.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected");
-1!==f&&a.parent().find(".minicolors-swatches .minicolors-swatch").eq(g).addClass("selected")}d.change&&(d.changeDelay?(clearTimeout(a.data("minicolors-changeTimeout")),a.data("minicolors-changeTimeout",setTimeout(function(){d.change.call(a.get(0),c,b)},d.changeDelay))):d.change.call(a.get(0),c,b));a.trigger("change").trigger("input")}}function L(a){var c=b(a).attr("data-opacity");w(b(a).val())?a=x(b(a).val(),!0):(a=y(b(a).val(),!0),a=u(a));if(!a)return null;void 0!==c&&b.extend(a,{a:parseFloat(c)});
return a}function M(a,c){var d=b(a).attr("data-opacity");if(w(b(a).val()))var k=x(b(a).val(),!0);else k=y(b(a).val(),!0),k=u(k);if(!k)return null;void 0===d&&(d=1);return c?"rgba("+k.r+", "+k.g+", "+k.b+", "+parseFloat(d)+")":"rgb("+k.r+", "+k.g+", "+k.b+")"}function C(a,c){return"uppercase"===c?a.toUpperCase():a.toLowerCase()}function y(a,c){a=a.replace(/^#/g,"");if(!a.match(/^[A-F0-9]{3,6}/ig)||3!==a.length&&6!==a.length)return"";3===a.length&&c&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]);return"#"+a}function x(a,
c){var b=a.replace(/[^\d,.]/g,"").split(",");b[0]=f(parseInt(b[0],10),0,255);b[1]=f(parseInt(b[1],10),0,255);b[2]=f(parseInt(b[2],10),0,255);b[3]&&(b[3]=f(parseFloat(b[3],10),0,1));return c?b[3]?{r:b[0],g:b[1],b:b[2],a:b[3]}:{r:b[0],g:b[1],b:b[2]}:"undefined"!==typeof b[3]&&1>=b[3]?"rgba("+b[0]+", "+b[1]+", "+b[2]+", "+b[3]+")":"rgb("+b[0]+", "+b[1]+", "+b[2]+")"}function J(a,b){return w(a)?x(a):y(a,b)}function f(a,b,d){a<b&&(a=b);a>d&&(a=d);return a}function w(a){return(a=a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&
4===a.length?!0:!1}function I(a){return(a=a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i))&&6===a.length?a[4]:"1"}function H(a){return(a=a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===a.length?"#"+("0"+parseInt(a[1],10).toString(16)).slice(-2)+("0"+parseInt(a[2],10).toString(16)).slice(-2)+("0"+parseInt(a[3],10).toString(16)).slice(-2):""}function D(a){var c=[a.r.toString(16),a.g.toString(16),
a.b.toString(16)];b.each(c,function(a,b){1===b.length&&(c[a]="0"+b)});return"#"+c.join("")}function v(a){var b=D,d,k;var e=Math.round(a.h);var g=Math.round(255*a.s/100);a=Math.round(255*a.b/100);if(0===g)e=d=k=a;else{var g=(255-g)*a/255,f=e%60*(a-g)/60;360===e&&(e=0);60>e?(e=a,k=g,d=g+f):120>e?(d=a,k=g,e=a-f):180>e?(d=a,e=g,k=g+f):240>e?(k=a,e=g,d=a-f):300>e?(k=a,d=g,e=g+f):360>e?(e=a,d=g,k=a-f):k=d=e=0}return b({r:Math.round(e),g:Math.round(d),b:Math.round(k)})}function K(a){a=u(a);var b={h:0,s:0,
b:0},d=Math.max(a.r,a.g,a.b),f=d-Math.min(a.r,a.g,a.b);b.b=d;b.s=0!==d?255*f/d:0;b.h=0!==b.s?a.r===d?(a.g-a.b)/f:a.g===d?2+(a.b-a.r)/f:4+(a.r-a.g)/f:-1;b.h*=60;0>b.h&&(b.h+=360);b.s*=100/255;b.b*=100/255;0===b.s&&(b.h=360);return b}function u(a){a=parseInt(-1<a.indexOf("#")?a.substring(1):a,16);return{r:a>>16,g:(a&65280)>>8,b:a&255}}b.minicolors={defaults:{animationSpeed:50,animationEasing:"swing",change:null,changeDelay:0,control:"hue",defaultValue:"",format:"hex",hide:null,hideSpeed:100,inline:!1,
keywords:"",letterCase:"lowercase",opacity:!1,position:"bottom left",beforeShow:null,show:null,showSpeed:100,theme:"default",swatches:[]}};b.extend(b.fn,{minicolors:function(a,c){switch(a){case "destroy":return b(this).each(function(){n(b(this))}),b(this);case "hide":return q(),b(this);case "opacity":if(void 0===c)return b(this).attr("data-opacity");b(this).each(function(){z(b(this).attr("data-opacity",c))});return b(this);case "rgbObject":return L(b(this),"rgbaObject"===a);case "rgbString":case "rgbaString":return M(b(this),
"rgbaString"===a);case "settings":if(void 0===c)return b(this).data("minicolors-settings");b(this).each(function(){var a=b(this).data("minicolors-settings")||{};n(b(this));b(this).minicolors(b.extend(!0,a,c))});return b(this);case "show":return p(b(this).eq(0)),b(this);case "value":if(void 0===c)return b(this).val();b(this).each(function(){"object"===typeof c&&"null"!==c?(c.opacity&&b(this).attr("data-opacity",f(c.opacity,0,1)),c.color&&b(this).val(c.color)):b(this).val(c);z(b(this))});return b(this);
default:return"create"!==a&&(c=a),b(this).each(function(){t(b(this),c)}),b(this)}}});b(top.document).on("mousedown.minicolors touchstart.minicolors",function(a){b(a.target).parents().add(a.target).hasClass("minicolors")||q()}).on("mousedown.minicolors touchstart.minicolors",".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider",function(a){var c=b(this);a.preventDefault();b(a.delegateTarget).data("minicolors-target",c);B(c,a,!0)}).on("mousemove.minicolors touchmove.minicolors",function(a){var c=
b(a.delegateTarget).data("minicolors-target");c&&B(c,a)}).on("mouseup.minicolors touchend.minicolors",function(){b(this).removeData("minicolors-target")}).on("click.minicolors",".minicolors-swatches li",function(a){a.preventDefault();var c=b(this);a=c.parents(".minicolors").find(".minicolors-input");c=c.data("swatch-color");G(a,c,I(c));z(a)}).on("mousedown.minicolors touchstart.minicolors",".minicolors-input-swatch",function(a){var c=b(this).parent().find(".minicolors-input");a.preventDefault();p(c)}).on("focus.minicolors",
".minicolors-input",function(){var a=b(this);a.data("minicolors-initialized")&&p(a)}).on("blur.minicolors",".minicolors-input",function(){var a=b(this),c=a.data("minicolors-settings");if(a.data("minicolors-initialized")){var d=c.keywords?b.map(c.keywords.split(","),function(a){return b.trim(a.toLowerCase())}):[];if(""!==a.val()&&-1<b.inArray(a.val().toLowerCase(),d))var f=a.val();else d=w(a.val())?x(a.val(),!0):(d=y(a.val(),!0))?u(d):null,f=null===d?c.defaultValue:"rgb"===c.format?c.opacity?x("rgba("+
d.r+","+d.g+","+d.b+","+a.attr("data-opacity")+")"):x("rgb("+d.r+","+d.g+","+d.b+")"):D(d);d=c.opacity?a.attr("data-opacity"):1;"transparent"===f.toLowerCase()&&(d=0);a.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity",d);a.val(f);""===a.val()&&a.val(J(c.defaultValue,!0));a.val(C(a.val(),c.letterCase))}}).on("keydown.minicolors",".minicolors-input",function(a){var c=b(this);if(c.data("minicolors-initialized"))switch(a.keyCode){case 9:q();break;case 13:case 27:q(),c.blur()}}).on("keyup.minicolors",
".minicolors-input",function(){var a=b(this);a.data("minicolors-initialized")&&z(a,!0)}).on("paste.minicolors",".minicolors-input",function(){var a=b(this);a.data("minicolors-initialized")&&setTimeout(function(){z(a,!0)},1)})});