'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/******/(function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
/******/module.l=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******//******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******//******/// define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){/******/if(!__webpack_require__.o(exports,name)){/******/Object.defineProperty(exports,name,{/******/configurable:false,/******/enumerable:true,/******/get:getter/******/});/******/}/******/};/******//******/// getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__webpack_require__.d(getter,'a',getter);/******/return getter;/******/};/******//******/// Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******//******/// __webpack_public_path__
/******/__webpack_require__.p="";/******//******/// Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s=4);/******/})(/************************************************************************//******/[/* 0 *//***/function(module,exports){// Utility functions
var PREFIXES='Webkit Moz O ms'.split(' ');var FLOAT_COMPARISON_EPSILON=0.001;// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination,source,recursive){destination=destination||{};source=source||{};recursive=recursive||false;for(var attrName in source){if(source.hasOwnProperty(attrName)){var destVal=destination[attrName];var sourceVal=source[attrName];if(recursive&&isObject(destVal)&&isObject(sourceVal)){destination[attrName]=extend(destVal,sourceVal,recursive);}else{destination[attrName]=sourceVal;}}}return destination;}// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template,vars){var rendered=template;for(var key in vars){if(vars.hasOwnProperty(key)){var val=vars[key];var regExpString='\\{'+key+'\\}';var regExp=new RegExp(regExpString,'g');rendered=rendered.replace(regExp,val);}}return rendered;}function setStyle(element,style,value){var elStyle=element.style;// cache for performance
for(var i=0;i<PREFIXES.length;++i){var prefix=PREFIXES[i];elStyle[prefix+capitalize(style)]=value;}elStyle[style]=value;}function setStyles(element,styles){forEachObject(styles,function(styleValue,styleName){// Allow disabling some individual styles by setting them
// to null or undefined
if(styleValue===null||styleValue===undefined){return;}// If style's value is {prefix: true, value: '50%'},
// Set also browser prefixed styles
if(isObject(styleValue)&&styleValue.prefix===true){setStyle(element,styleName,styleValue.value);}else{element.style[styleName]=styleValue;}});}function capitalize(text){return text.charAt(0).toUpperCase()+text.slice(1);}function isString(obj){return typeof obj==='string'||obj instanceof String;}function isFunction(obj){return typeof obj==='function';}function isArray(obj){return Object.prototype.toString.call(obj)==='[object Array]';}// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj){if(isArray(obj)){return false;}var type=typeof obj==='undefined'?'undefined':_typeof(obj);return type==='object'&&!!obj;}function forEachObject(object,callback){for(var key in object){if(object.hasOwnProperty(key)){var val=object[key];callback(val,key);}}}function floatEquals(a,b){return Math.abs(a-b)<FLOAT_COMPARISON_EPSILON;}// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el){while(el.firstChild){el.removeChild(el.firstChild);}}module.exports={extend:extend,render:render,setStyle:setStyle,setStyles:setStyles,capitalize:capitalize,isString:isString,isFunction:isFunction,isObject:isObject,forEachObject:forEachObject,floatEquals:floatEquals,removeChildren:removeChildren};/***/},/* 1 *//***/function(module,exports,__webpack_require__){// Base object for different progress bar shapes
var Path=__webpack_require__(2);var utils=__webpack_require__(0);var DESTROYED_ERROR='Object is destroyed';var Shape=function Shape(container,opts){// Throw a better error if progress bars are not initialized with `new`
// keyword
if(!(this instanceof Shape)){throw new Error('Constructor was called without new keyword');}// Prevent calling constructor without parameters so inheritance
// works correctly. To understand, this is how Shape is inherited:
//
//   Line.prototype = new Shape();
//
// We just want to set the prototype for Line.
if(arguments.length===0){return;}// Default parameters for progress bar creation
this._opts=utils.extend({color:'#555',strokeWidth:1.0,trailColor:null,trailWidth:null,fill:null,text:{style:{color:null,position:'absolute',left:'50%',top:'50%',padding:0,margin:0,transform:{prefix:true,value:'translate(-50%, -50%)'}},autoStyleContainer:true,alignToBottom:true,value:null,className:'progressbar-text'},svgStyle:{display:'block',width:'100%'},warnings:false},opts,true);// Use recursive extend
// If user specifies e.g. svgStyle or text style, the whole object
// should replace the defaults to make working with styles easier
if(utils.isObject(opts)&&opts.svgStyle!==undefined){this._opts.svgStyle=opts.svgStyle;}if(utils.isObject(opts)&&utils.isObject(opts.text)&&opts.text.style!==undefined){this._opts.text.style=opts.text.style;}var svgView=this._createSvgView(this._opts);var element;if(utils.isString(container)){element=document.querySelector(container);}else{element=container;}if(!element){throw new Error('Container does not exist: '+container);}this._container=element;this._container.appendChild(svgView.svg);if(this._opts.warnings){this._warnContainerAspectRatio(this._container);}if(this._opts.svgStyle){utils.setStyles(svgView.svg,this._opts.svgStyle);}// Expose public attributes before Path initialization
this.svg=svgView.svg;this.path=svgView.path;this.trail=svgView.trail;this.text=null;var newOpts=utils.extend({attachment:undefined,shape:this},this._opts);this._progressPath=new Path(svgView.path,newOpts);if(utils.isObject(this._opts.text)&&this._opts.text.value!==null){this.setText(this._opts.text.value);}};Shape.prototype.animate=function animate(progress,opts,cb){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}this._progressPath.animate(progress,opts,cb);};Shape.prototype.stop=function stop(){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}// Don't crash if stop is called inside step function
if(this._progressPath===undefined){return;}this._progressPath.stop();};Shape.prototype.destroy=function destroy(){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}this.stop();this.svg.parentNode.removeChild(this.svg);this.svg=null;this.path=null;this.trail=null;this._progressPath=null;if(this.text!==null){this.text.parentNode.removeChild(this.text);this.text=null;}};Shape.prototype.set=function set(progress){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}this._progressPath.set(progress);};Shape.prototype.value=function value(){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}if(this._progressPath===undefined){return 0;}return this._progressPath.value();};Shape.prototype.setText=function setText(newText){if(this._progressPath===null){throw new Error(DESTROYED_ERROR);}if(this.text===null){// Create new text node
this.text=this._createTextContainer(this._opts,this._container);this._container.appendChild(this.text);}// Remove previous text and add new
if(utils.isObject(newText)){utils.removeChildren(this.text);this.text.appendChild(newText);}else{this.text.innerHTML=newText;}};Shape.prototype._createSvgView=function _createSvgView(opts){var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');this._initializeSvg(svg,opts);var trailPath=null;// Each option listed in the if condition are 'triggers' for creating
// the trail path
if(opts.trailColor||opts.trailWidth){trailPath=this._createTrail(opts);svg.appendChild(trailPath);}var path=this._createPath(opts);svg.appendChild(path);return{svg:svg,path:path,trail:trailPath};};Shape.prototype._initializeSvg=function _initializeSvg(svg,opts){svg.setAttribute('viewBox','0 0 100 100');};Shape.prototype._createPath=function _createPath(opts){var pathString=this._pathString(opts);return this._createPathElement(pathString,opts);};Shape.prototype._createTrail=function _createTrail(opts){// Create path string with original passed options
var pathString=this._trailString(opts);// Prevent modifying original
var newOpts=utils.extend({},opts);// Defaults for parameters which modify trail path
if(!newOpts.trailColor){newOpts.trailColor='#eee';}if(!newOpts.trailWidth){newOpts.trailWidth=newOpts.strokeWidth;}newOpts.color=newOpts.trailColor;newOpts.strokeWidth=newOpts.trailWidth;// When trail path is set, fill must be set for it instead of the
// actual path to prevent trail stroke from clipping
newOpts.fill=null;return this._createPathElement(pathString,newOpts);};Shape.prototype._createPathElement=function _createPathElement(pathString,opts){var path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',pathString);path.setAttribute('stroke',opts.color);path.setAttribute('stroke-width',opts.strokeWidth);if(opts.fill){path.setAttribute('fill',opts.fill);}else{path.setAttribute('fill-opacity','0');}return path;};Shape.prototype._createTextContainer=function _createTextContainer(opts,container){var textContainer=document.createElement('div');textContainer.className=opts.text.className;var textStyle=opts.text.style;if(textStyle){if(opts.text.autoStyleContainer){container.style.position='relative';}utils.setStyles(textContainer,textStyle);// Default text color to progress bar's color
if(!textStyle.color){textContainer.style.color=opts.color;}}this._initializeTextContainer(opts,container,textContainer);return textContainer;};// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer=function(opts,container,element){// By default, no-op
// Custom shapes should respect API options, such as text.style
};Shape.prototype._pathString=function _pathString(opts){throw new Error('Override this function for each progress bar');};Shape.prototype._trailString=function _trailString(opts){throw new Error('Override this function for each progress bar');};Shape.prototype._warnContainerAspectRatio=function _warnContainerAspectRatio(container){if(!this.containerAspectRatio){return;}var computedStyle=window.getComputedStyle(container,null);var width=parseFloat(computedStyle.getPropertyValue('width'),10);var height=parseFloat(computedStyle.getPropertyValue('height'),10);if(!utils.floatEquals(this.containerAspectRatio,width/height)){console.warn('Incorrect aspect ratio of container','#'+container.id,'detected:',computedStyle.getPropertyValue('width')+'(width)','/',computedStyle.getPropertyValue('height')+'(height)','=',width/height);console.warn('Aspect ratio of should be',this.containerAspectRatio);}};module.exports=Shape;/***/},/* 2 *//***/function(module,exports,__webpack_require__){// Lower level API to animate any kind of svg path
var Tweenable=__webpack_require__(7);var utils=__webpack_require__(0);var EASING_ALIASES={easeIn:'easeInCubic',easeOut:'easeOutCubic',easeInOut:'easeInOutCubic'};var Path=function Path(path,opts){// Throw a better error if not initialized with `new` keyword
if(!(this instanceof Path)){throw new Error('Constructor was called without new keyword');}// Default parameters for animation
opts=utils.extend({duration:800,easing:'linear',from:{},to:{},step:function step(){}},opts);var element;if(utils.isString(path)){element=document.querySelector(path);}else{element=path;}// Reveal .path as public attribute
this.path=element;this._opts=opts;this._tweenable=null;// Set up the starting positions
var length=this.path.getTotalLength();this.path.style.strokeDasharray=length+' '+length;this.set(0);};Path.prototype.value=function value(){var offset=this._getComputedDashOffset();var length=this.path.getTotalLength();var progress=1-offset/length;// Round number to prevent returning very small number like 1e-30, which
// is practically 0
return parseFloat(progress.toFixed(6),10);};Path.prototype.set=function set(progress){this.stop();this.path.style.strokeDashoffset=this._progressToOffset(progress);var step=this._opts.step;if(utils.isFunction(step)){var easing=this._easing(this._opts.easing);var values=this._calculateTo(progress,easing);var reference=this._opts.shape||this;step(values,reference,this._opts.attachment);}};Path.prototype.stop=function stop(){this._stopTween();this.path.style.strokeDashoffset=this._getComputedDashOffset();};// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate=function animate(progress,opts,cb){opts=opts||{};if(utils.isFunction(opts)){cb=opts;opts={};}var passedOpts=utils.extend({},opts);// Copy default opts to new object so defaults are not modified
var defaultOpts=utils.extend({},this._opts);opts=utils.extend(defaultOpts,opts);var shiftyEasing=this._easing(opts.easing);var values=this._resolveFromAndTo(progress,shiftyEasing,passedOpts);this.stop();// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
this.path.getBoundingClientRect();var offset=this._getComputedDashOffset();var newOffset=this._progressToOffset(progress);var self=this;this._tweenable=new Tweenable();this._tweenable.tween({from:utils.extend({offset:offset},values.from),to:utils.extend({offset:newOffset},values.to),duration:opts.duration,easing:shiftyEasing,step:function step(state){self.path.style.strokeDashoffset=state.offset;var reference=opts.shape||self;opts.step(state,reference,opts.attachment);},finish:function finish(state){if(utils.isFunction(cb)){cb();}}});};Path.prototype._getComputedDashOffset=function _getComputedDashOffset(){var computedStyle=window.getComputedStyle(this.path,null);return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'),10);};Path.prototype._progressToOffset=function _progressToOffset(progress){var length=this.path.getTotalLength();return length-progress*length;};// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo=function _resolveFromAndTo(progress,easing,opts){if(opts.from&&opts.to){return{from:opts.from,to:opts.to};}return{from:this._calculateFrom(easing),to:this._calculateTo(progress,easing)};};// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom=function _calculateFrom(easing){return Tweenable.interpolate(this._opts.from,this._opts.to,this.value(),easing);};// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo=function _calculateTo(progress,easing){return Tweenable.interpolate(this._opts.from,this._opts.to,progress,easing);};Path.prototype._stopTween=function _stopTween(){if(this._tweenable!==null){this._tweenable.stop();this._tweenable=null;}};Path.prototype._easing=function _easing(easing){if(EASING_ALIASES.hasOwnProperty(easing)){return EASING_ALIASES[easing];}return easing;};module.exports=Path;/***/},/* 3 *//***/function(module,exports,__webpack_require__){// Circle shaped progress bar
var Shape=__webpack_require__(1);var utils=__webpack_require__(0);var Circle=function Circle(container,options){// Use two arcs to form a circle
// See this answer http://stackoverflow.com/a/10477334/1446092
this._pathTemplate='M 50,50 m 0,-{radius}'+' a {radius},{radius} 0 1 1 0,{2radius}'+' a {radius},{radius} 0 1 1 0,-{2radius}';this.containerAspectRatio=1;Shape.apply(this,arguments);};Circle.prototype=new Shape();Circle.prototype.constructor=Circle;Circle.prototype._pathString=function _pathString(opts){var widthOfWider=opts.strokeWidth;if(opts.trailWidth&&opts.trailWidth>opts.strokeWidth){widthOfWider=opts.trailWidth;}var r=50-widthOfWider/2;return utils.render(this._pathTemplate,{radius:r,'2radius':r*2});};Circle.prototype._trailString=function _trailString(opts){return this._pathString(opts);};module.exports=Circle;/***/},/* 4 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_progressbar_js__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_progressbar_js___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_progressbar_js__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1_swiper__=__webpack_require__(9);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__components_SlideMenu__=__webpack_require__(11);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__components_YouTube__=__webpack_require__(12);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4_lity__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4_lity___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lity__);window.$=jQuery;$(document).ready(function(){__WEBPACK_IMPORTED_MODULE_2__components_SlideMenu__["a"/* default */].init();__WEBPACK_IMPORTED_MODULE_3__components_YouTube__["a"/* default */].init();/**
   * Mobile menu
   */$('.menu-mobile .menu-item-has-children > a').on('click',function(e){e.preventDefault();var $el=$(this);var $submenu=$el.next('.sub-menu');$el.toggleClass('is-active');$submenu.slideToggle(300);});/**
   * Add placeholder to email-subscribers plugin input field
   * @type {*|jQuery|HTMLElement}
   */var $newsletterFooterInput=$('.footer #es_txt_email_pg');if($newsletterFooterInput.length>0){$('.footer #es_txt_email_pg').attr('placeholder','email@email.com');}var $newsletterInput=$('.page-content #es_txt_email_pg');if($newsletterInput.length>0){$('.page-content #es_txt_email_pg').attr('placeholder','Váš e-mail');}var $newsletterForm=$('.es_shortcode_form');if($newsletterForm.length>0){$newsletterForm.on('submit',function(e){e.preventDefault();return false;});}/**
   * Swiper news
   */var $newsSwiper=$('.js-swiper-news');if($newsSwiper.length>0){var slidesPerView=$newsSwiper.find('.swiper-slide').length>1?2:1;$newsSwiper.toggleClass('swiper-container--single',slidesPerView===1);var defaultNewsOptions={centeredSlides:slidesPerView===1,slidesPerView:slidesPerView,spaceBetween:slidesPerView===1?0:10,pagination:{el:'.js-swiper-news-pagination',type:'bullets'},breakpoints:{// when window width is <= 480px
480:{slidesPerView:1,spaceBetween:20}}};var $swiper=new __WEBPACK_IMPORTED_MODULE_1_swiper__["a"/* default */]($newsSwiper,defaultNewsOptions);}/**
   * Swiper stories
   */var $storiesCirclesSwiper=$('.js-swiper-stories-circles');var $storiesSwiper=$('.js-swiper-stories');var storiesCount=$storiesSwiper.find('.swiper-slide:not(.swiper-slide-duplicate)').length;if($storiesSwiper.length>0){var transitionEndCircles=function transitionEndCircles(){/**
       * Progress bar
       */var $active=$('.js-swiper-stories-circles .swiper-slide-active .js-swiper-timer');var $progress=$('#js-swiper-progress');$progress.remove();$progress=$('<div id=\'js-swiper-progress\' class=\'swiper__progress\'></div>');$progress.appendTo($active);var bar=new __WEBPACK_IMPORTED_MODULE_0_progressbar_js___default.a.Circle('#js-swiper-progress',{strokeWidth:6,easing:'linear',duration:autoplayTime-speed,color:'#40b153',trailColor:'#fff',trailWidth:2,svgStyle:null});bar.animate(1.0);/**
       * Prevent slide from another swiper
       */if(clicked){clicked=false;return;}var clickedIndex=this.clickedIndex;if(_$swiper&&typeof clickedIndex!=='undefined'){clickedIndex=clickedIndex%storiesCount;// + 1
clicked=true;_$swiper.slideTo(clickedIndex);}};var transitionEnd=function transitionEnd(){/**
       * Prevent slide from another swiper
       */if(clicked){clicked=false;return;}var index=this.realIndex;if($circlesSwiper){clicked=true;$circlesSwiper.slideTo(index+storiesCount);}};var defaultCirclesOptions={allowTouchMove:false,centeredSlides:true,slidesPerView:'auto',loop:true,loopedSlides:50,loopAdditionalSlides:50,slideToClickedSlide:true,on:{slideChangeTransitionEnd:transitionEndCircles}};var speed=300;var autoplayTime=15000;var defaultOptions={slidesPerView:1,speed:speed,loop:true,loopedSlides:50,loopAdditionalSlides:50,autoplay:{delay:autoplayTime,disableOnInteraction:false},navigation:{nextEl:'.js-swiper-stories-next',prevEl:'.js-swiper-stories-prev'},on:{slideChangeTransitionEnd:transitionEnd}};var _$swiper=new __WEBPACK_IMPORTED_MODULE_1_swiper__["a"/* default */]($storiesSwiper,defaultOptions);var $circlesSwiper=new __WEBPACK_IMPORTED_MODULE_1_swiper__["a"/* default */]($storiesCirclesSwiper,defaultCirclesOptions);var clicked=false;}/**
   * Scroll to top
   */var SCROLL_TOP_TRESHOLD=100;var $top=$('.js-to-top');$top.on('click',function(e){e.preventDefault();$('html, body').animate({scrollTop:'0px'},700);});var scrollFunction=function scrollFunction(){var scrolledTop=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;$top.toggleClass('scroll-top--active',scrolledTop>SCROLL_TOP_TRESHOLD);};window.addEventListener('scroll',scrollFunction);/**
   * Hide menu on scrolldown, show on scrollup
   */var lastScrollTop;$(window).on('scroll',scrollDown).trigger('scroll');function scrollDown(){var scrolledTop=$(window).scrollTop();var $header=$('.js-header');$header.toggleClass('header--smaller',scrolledTop>50);lastScrollTop=scrolledTop;}/**
   * Load remote images on localhost
   * @type {boolean}
   */var localhost=location.host.indexOf('localhost')>-1;if(localhost){console.log('local',localhost);$('[src^="http://localhost/leaf"]').each(function(){var $el=$(this);$el.attr('src',$el.attr('src').replace(/\/localhost\/leaf/g,'\/leaf.sk'));});return;$('[src^="http://localhost/leaf"]').each(function(){var $el=$(this);$el.attr('src',$el.attr('src').replace(/\/localhost\/leaf/g,'\/leaf.sk'));});$('a[href^="/"]:not([href^="//"])').each(function(ev){var $el=$(this);$el.attr('href','/leaf'+$el.attr('href'));});$('a[href^="http://leaf"]').each(function(ev){var $el=$(this);$el.attr('href',$el.attr('href').replace(/http:\/\/leaf.sk/g,'\/leaf'));});$('[style*="background-image"]').each(function(ev){var $el=$(this);$el.attr('style',$el.attr('style').replace(/http:\/\/localhost\/leaf/g,'http:\\/\\/leaf.sk'));});}});/***/},/* 5 *//***/function(module,exports,__webpack_require__){module.exports={// Higher level API, different shaped progress bars
Line:__webpack_require__(6),Circle:__webpack_require__(3),SemiCircle:__webpack_require__(8),// Lower level API to use any SVG path
Path:__webpack_require__(2),// Base-class for creating new custom shapes
// to be in line with the API of built-in shapes
// Undocumented.
Shape:__webpack_require__(1),// Internal utils, undocumented.
utils:__webpack_require__(0)};/***/},/* 6 *//***/function(module,exports,__webpack_require__){// Line shaped progress bar
var Shape=__webpack_require__(1);var utils=__webpack_require__(0);var Line=function Line(container,options){this._pathTemplate='M 0,{center} L 100,{center}';Shape.apply(this,arguments);};Line.prototype=new Shape();Line.prototype.constructor=Line;Line.prototype._initializeSvg=function _initializeSvg(svg,opts){svg.setAttribute('viewBox','0 0 100 '+opts.strokeWidth);svg.setAttribute('preserveAspectRatio','none');};Line.prototype._pathString=function _pathString(opts){return utils.render(this._pathTemplate,{center:opts.strokeWidth/2});};Line.prototype._trailString=function _trailString(opts){return this._pathString(opts);};module.exports=Line;/***/},/* 7 *//***/function(module,exports,__webpack_require__){/* shifty - v1.5.3 - 2016-11-29 - http://jeremyckahn.github.io/shifty */;(function(){var root=this||Function('return this')();/**
 * Shifty Core
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */var Tweenable=function(){'use strict';// Aliases that get defined later in this function
var formula;// CONSTANTS
var DEFAULT_SCHEDULE_FUNCTION;var DEFAULT_EASING='linear';var DEFAULT_DURATION=500;var UPDATE_TIME=1000/60;var _now=Date.now?Date.now:function(){return+new Date();};var now=typeof SHIFTY_DEBUG_NOW!=='undefined'?SHIFTY_DEBUG_NOW:_now;if(typeof window!=='undefined'){// requestAnimationFrame() shim by Paul Irish (modified for Shifty)
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
DEFAULT_SCHEDULE_FUNCTION=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout;}else{DEFAULT_SCHEDULE_FUNCTION=setTimeout;}function noop(){}// NOOP!
/**
   * Handy shortcut for doing a for-in loop. This is not a "normal" each
   * function, it is optimized for Shifty.  The iterator function only receives
   * the property name, not the value.
   * @param {Object} obj
   * @param {Function(string)} fn
   * @private
   */function each(obj,fn){var key;for(key in obj){if(Object.hasOwnProperty.call(obj,key)){fn(key);}}}/**
   * Perform a shallow copy of Object properties.
   * @param {Object} targetObject The object to copy into
   * @param {Object} srcObject The object to copy from
   * @return {Object} A reference to the augmented `targetObj` Object
   * @private
   */function shallowCopy(targetObj,srcObj){each(srcObj,function(prop){targetObj[prop]=srcObj[prop];});return targetObj;}/**
   * Copies each property from src onto target, but only if the property to
   * copy to target is undefined.
   * @param {Object} target Missing properties in this Object are filled in
   * @param {Object} src
   * @private
   */function defaults(target,src){each(src,function(prop){if(typeof target[prop]==='undefined'){target[prop]=src[prop];}});}/**
   * Calculates the interpolated tween values of an Object for a given
   * timestamp.
   * @param {Number} forPosition The position to compute the state for.
   * @param {Object} currentState Current state properties.
   * @param {Object} originalState: The original state properties the Object is
   * tweening from.
   * @param {Object} targetState: The destination state properties the Object
   * is tweening to.
   * @param {number} duration: The length of the tween in milliseconds.
   * @param {number} timestamp: The UNIX epoch time at which the tween began.
   * @param {Object} easing: This Object's keys must correspond to the keys in
   * targetState.
   * @private
   */function tweenProps(forPosition,currentState,originalState,targetState,duration,timestamp,easing){var normalizedPosition=forPosition<timestamp?0:(forPosition-timestamp)/duration;var prop;var easingObjectProp;var easingFn;for(prop in currentState){if(currentState.hasOwnProperty(prop)){easingObjectProp=easing[prop];easingFn=typeof easingObjectProp==='function'?easingObjectProp:formula[easingObjectProp];currentState[prop]=tweenProp(originalState[prop],targetState[prop],easingFn,normalizedPosition);}}return currentState;}/**
   * Tweens a single property.
   * @param {number} start The value that the tween started from.
   * @param {number} end The value that the tween should end at.
   * @param {Function} easingFunc The easing curve to apply to the tween.
   * @param {number} position The normalized position (between 0.0 and 1.0) to
   * calculate the midpoint of 'start' and 'end' against.
   * @return {number} The tweened value.
   * @private
   */function tweenProp(start,end,easingFunc,position){return start+(end-start)*easingFunc(position);}/**
   * Applies a filter to Tweenable instance.
   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
   * upon.
   * @param {String} filterName The name of the filter to apply.
   * @private
   */function applyFilter(tweenable,filterName){var filters=Tweenable.prototype.filter;var args=tweenable._filterArgs;each(filters,function(name){if(typeof filters[name][filterName]!=='undefined'){filters[name][filterName].apply(tweenable,args);}});}var timeoutHandler_endTime;var timeoutHandler_currentTime;var timeoutHandler_isEnded;var timeoutHandler_offset;/**
   * Handles the update logic for one step of a tween.
   * @param {Tweenable} tweenable
   * @param {number} timestamp
   * @param {number} delay
   * @param {number} duration
   * @param {Object} currentState
   * @param {Object} originalState
   * @param {Object} targetState
   * @param {Object} easing
   * @param {Function(Object, *, number)} step
   * @param {Function(Function,number)}} schedule
   * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
   * Tweenable#seek.
   * @private
   */function timeoutHandler(tweenable,timestamp,delay,duration,currentState,originalState,targetState,easing,step,schedule,opt_currentTimeOverride){timeoutHandler_endTime=timestamp+delay+duration;timeoutHandler_currentTime=Math.min(opt_currentTimeOverride||now(),timeoutHandler_endTime);timeoutHandler_isEnded=timeoutHandler_currentTime>=timeoutHandler_endTime;timeoutHandler_offset=duration-(timeoutHandler_endTime-timeoutHandler_currentTime);if(tweenable.isPlaying()){if(timeoutHandler_isEnded){step(targetState,tweenable._attachment,timeoutHandler_offset);tweenable.stop(true);}else{tweenable._scheduleId=schedule(tweenable._timeoutHandler,UPDATE_TIME);applyFilter(tweenable,'beforeTween');// If the animation has not yet reached the start point (e.g., there was
// delay that has not yet completed), just interpolate the starting
// position of the tween.
if(timeoutHandler_currentTime<timestamp+delay){tweenProps(1,currentState,originalState,targetState,1,1,easing);}else{tweenProps(timeoutHandler_currentTime,currentState,originalState,targetState,duration,timestamp+delay,easing);}applyFilter(tweenable,'afterTween');step(currentState,tweenable._attachment,timeoutHandler_offset);}}}/**
   * Creates a usable easing Object from a string, a function or another easing
   * Object.  If `easing` is an Object, then this function clones it and fills
   * in the missing properties with `"linear"`.
   * @param {Object.<string|Function>} fromTweenParams
   * @param {Object|string|Function} easing
   * @return {Object.<string|Function>}
   * @private
   */function composeEasingObject(fromTweenParams,easing){var composedEasing={};var typeofEasing=typeof easing==='undefined'?'undefined':_typeof(easing);if(typeofEasing==='string'||typeofEasing==='function'){each(fromTweenParams,function(prop){composedEasing[prop]=easing;});}else{each(fromTweenParams,function(prop){if(!composedEasing[prop]){composedEasing[prop]=easing[prop]||DEFAULT_EASING;}});}return composedEasing;}/**
   * Tweenable constructor.
   * @class Tweenable
   * @param {Object=} opt_initialState The values that the initial tween should
   * start at if a `from` object is not provided to `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
   * "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @module Tweenable
   * @constructor
   */function Tweenable(opt_initialState,opt_config){this._currentState=opt_initialState||{};this._configured=false;this._scheduleFunction=DEFAULT_SCHEDULE_FUNCTION;// To prevent unnecessary calls to setConfig do not set default
// configuration here.  Only set default configuration immediately before
// tweening if none has been set.
if(typeof opt_config!=='undefined'){this.setConfig(opt_config);}}/**
   * Configure and start a tween.
   * @method tween
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @chainable
   */Tweenable.prototype.tween=function(opt_config){if(this._isTweening){return this;}// Only set default config if no configuration has been set previously and
// none is provided now.
if(opt_config!==undefined||!this._configured){this.setConfig(opt_config);}this._timestamp=now();this._start(this.get(),this._attachment);return this.resume();};/**
   * Configure a tween that will start at some point in the future.
   *
   * @method setConfig
   * @param {Object} config The following values are valid:
   * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
   * - __to__ (_Object=_): Ending position.
   * - __duration__ (_number=_): How many milliseconds to animate for.
   * - __delay__ (_delay=_): How many milliseconds to wait before starting the
   *   tween.
   * - __start__ (_Function(Object, *)_): Function to execute when the tween
   *   begins.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __step__ (_Function(Object, *, number)_): Function to execute on every
   *   tick.  Receives `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
   *   `attachment` as the second parameter, and the time elapsed since the
   *   start of the tween as the third. This function is not called on the
   *   final step of the animation, but `finish` is.
   * - __finish__ (_Function(Object, *)_): Function to execute upon tween
   *   completion.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
   *   name(s) or function(s) to use for the tween.
   * - __attachment__ (_*_): Cached value that is passed to the
   *   `step`/`start`/`finish` methods.
   * @chainable
   */Tweenable.prototype.setConfig=function(config){config=config||{};this._configured=true;// Attach something to this Tweenable instance (e.g.: a DOM element, an
// object, a string, etc.);
this._attachment=config.attachment;// Init the internal state
this._pausedAtTime=null;this._scheduleId=null;this._delay=config.delay||0;this._start=config.start||noop;this._step=config.step||noop;this._finish=config.finish||noop;this._duration=config.duration||DEFAULT_DURATION;this._currentState=shallowCopy({},config.from||this.get());this._originalState=this.get();this._targetState=shallowCopy({},config.to||this.get());var self=this;this._timeoutHandler=function(){timeoutHandler(self,self._timestamp,self._delay,self._duration,self._currentState,self._originalState,self._targetState,self._easing,self._step,self._scheduleFunction);};// Aliases used below
var currentState=this._currentState;var targetState=this._targetState;// Ensure that there is always something to tween to.
defaults(targetState,currentState);this._easing=composeEasingObject(currentState,config.easing||DEFAULT_EASING);this._filterArgs=[currentState,this._originalState,targetState,this._easing];applyFilter(this,'tweenCreated');return this;};/**
   * @method get
   * @return {Object} The current state.
   */Tweenable.prototype.get=function(){return shallowCopy({},this._currentState);};/**
   * @method set
   * @param {Object} state The current state.
   */Tweenable.prototype.set=function(state){this._currentState=state;};/**
   * Pause a tween.  Paused tweens can be resumed from the point at which they
   * were paused.  This is different from `{{#crossLink
   * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
   * causes a tween to start over when it is resumed.
   * @method pause
   * @chainable
   */Tweenable.prototype.pause=function(){this._pausedAtTime=now();this._isPaused=true;return this;};/**
   * Resume a paused tween.
   * @method resume
   * @chainable
   */Tweenable.prototype.resume=function(){if(this._isPaused){this._timestamp+=now()-this._pausedAtTime;}this._isPaused=false;this._isTweening=true;this._timeoutHandler();return this;};/**
   * Move the state of the animation to a specific point in the tween's
   * timeline.  If the animation is not running, this will cause the `step`
   * handlers to be called.
   * @method seek
   * @param {millisecond} millisecond The millisecond of the animation to seek
   * to.  This must not be less than `0`.
   * @chainable
   */Tweenable.prototype.seek=function(millisecond){millisecond=Math.max(millisecond,0);var currentTime=now();if(this._timestamp+millisecond===0){return this;}this._timestamp=currentTime-millisecond;if(!this.isPlaying()){this._isTweening=true;this._isPaused=false;// If the animation is not running, call timeoutHandler to make sure that
// any step handlers are run.
timeoutHandler(this,this._timestamp,this._delay,this._duration,this._currentState,this._originalState,this._targetState,this._easing,this._step,this._scheduleFunction,currentTime);this.pause();}return this;};/**
   * Stops and cancels a tween.
   * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
   * its current state, and the `finish` handler is not invoked.  If `true`,
   * the tweened object's values are instantly set to the target values, and
   * `finish` is invoked.
   * @method stop
   * @chainable
   */Tweenable.prototype.stop=function(gotoEnd){this._isTweening=false;this._isPaused=false;this._timeoutHandler=noop;(root.cancelAnimationFrame||root.webkitCancelAnimationFrame||root.oCancelAnimationFrame||root.msCancelAnimationFrame||root.mozCancelRequestAnimationFrame||root.clearTimeout)(this._scheduleId);if(gotoEnd){applyFilter(this,'beforeTween');tweenProps(1,this._currentState,this._originalState,this._targetState,1,0,this._easing);applyFilter(this,'afterTween');applyFilter(this,'afterTweenEnd');this._finish.call(this,this._currentState,this._attachment);}return this;};/**
   * @method isPlaying
   * @return {boolean} Whether or not a tween is running.
   */Tweenable.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused;};/**
   * Set a custom schedule function.
   *
   * If a custom function is not set,
   * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
   * is used if available, otherwise
   * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
   * is used.
   * @method setScheduleFunction
   * @param {Function(Function,number)} scheduleFunction The function to be
   * used to schedule the next frame to be rendered.
   */Tweenable.prototype.setScheduleFunction=function(scheduleFunction){this._scheduleFunction=scheduleFunction;};/**
   * `delete` all "own" properties.  Call this when the `Tweenable` instance
   * is no longer needed to free memory.
   * @method dispose
   */Tweenable.prototype.dispose=function(){var prop;for(prop in this){if(this.hasOwnProperty(prop)){delete this[prop];}}};/**
   * Filters are used for transforming the properties of a tween at various
   * points in a Tweenable's life cycle.  See the README for more info on this.
   * @private
   */Tweenable.prototype.filter={};/**
   * This object contains all of the tweens available to Shifty.  It is
   * extensible - simply attach properties to the `Tweenable.prototype.formula`
   * Object following the same format as `linear`.
   *
   * `pos` should be a normalized `number` (between 0 and 1).
   * @property formula
   * @type {Object(function)}
   */Tweenable.prototype.formula={linear:function linear(pos){return pos;}};formula=Tweenable.prototype.formula;shallowCopy(Tweenable,{'now':now,'each':each,'tweenProps':tweenProps,'tweenProp':tweenProp,'applyFilter':applyFilter,'shallowCopy':shallowCopy,'defaults':defaults,'composeEasingObject':composeEasingObject});// `root` is provided in the intro/outro files.
// A hook used for unit testing.
if(typeof SHIFTY_DEBUG_NOW==='function'){root.timeoutHandler=timeoutHandler;}// Bootstrap Tweenable appropriately for the environment.
if(true){// CommonJS
module.exports=Tweenable;}else if(typeof define==='function'&&define.amd){// AMD
define(function(){return Tweenable;});}else if(typeof root.Tweenable==='undefined'){// Browser: Make `Tweenable` globally accessible.
root.Tweenable=Tweenable;}return Tweenable;}();/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 *//*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */;(function(){Tweenable.shallowCopy(Tweenable.prototype.formula,{easeInQuad:function easeInQuad(pos){return Math.pow(pos,2);},easeOutQuad:function easeOutQuad(pos){return-(Math.pow(pos-1,2)-1);},easeInOutQuad:function easeInOutQuad(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,2);}return-0.5*((pos-=2)*pos-2);},easeInCubic:function easeInCubic(pos){return Math.pow(pos,3);},easeOutCubic:function easeOutCubic(pos){return Math.pow(pos-1,3)+1;},easeInOutCubic:function easeInOutCubic(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,3);}return 0.5*(Math.pow(pos-2,3)+2);},easeInQuart:function easeInQuart(pos){return Math.pow(pos,4);},easeOutQuart:function easeOutQuart(pos){return-(Math.pow(pos-1,4)-1);},easeInOutQuart:function easeInOutQuart(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,4);}return-0.5*((pos-=2)*Math.pow(pos,3)-2);},easeInQuint:function easeInQuint(pos){return Math.pow(pos,5);},easeOutQuint:function easeOutQuint(pos){return Math.pow(pos-1,5)+1;},easeInOutQuint:function easeInOutQuint(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,5);}return 0.5*(Math.pow(pos-2,5)+2);},easeInSine:function easeInSine(pos){return-Math.cos(pos*(Math.PI/2))+1;},easeOutSine:function easeOutSine(pos){return Math.sin(pos*(Math.PI/2));},easeInOutSine:function easeInOutSine(pos){return-0.5*(Math.cos(Math.PI*pos)-1);},easeInExpo:function easeInExpo(pos){return pos===0?0:Math.pow(2,10*(pos-1));},easeOutExpo:function easeOutExpo(pos){return pos===1?1:-Math.pow(2,-10*pos)+1;},easeInOutExpo:function easeInOutExpo(pos){if(pos===0){return 0;}if(pos===1){return 1;}if((pos/=0.5)<1){return 0.5*Math.pow(2,10*(pos-1));}return 0.5*(-Math.pow(2,-10*--pos)+2);},easeInCirc:function easeInCirc(pos){return-(Math.sqrt(1-pos*pos)-1);},easeOutCirc:function easeOutCirc(pos){return Math.sqrt(1-Math.pow(pos-1,2));},easeInOutCirc:function easeInOutCirc(pos){if((pos/=0.5)<1){return-0.5*(Math.sqrt(1-pos*pos)-1);}return 0.5*(Math.sqrt(1-(pos-=2)*pos)+1);},easeOutBounce:function easeOutBounce(pos){if(pos<1/2.75){return 7.5625*pos*pos;}else if(pos<2/2.75){return 7.5625*(pos-=1.5/2.75)*pos+0.75;}else if(pos<2.5/2.75){return 7.5625*(pos-=2.25/2.75)*pos+0.9375;}else{return 7.5625*(pos-=2.625/2.75)*pos+0.984375;}},easeInBack:function easeInBack(pos){var s=1.70158;return pos*pos*((s+1)*pos-s);},easeOutBack:function easeOutBack(pos){var s=1.70158;return(pos=pos-1)*pos*((s+1)*pos+s)+1;},easeInOutBack:function easeInOutBack(pos){var s=1.70158;if((pos/=0.5)<1){return 0.5*(pos*pos*(((s*=1.525)+1)*pos-s));}return 0.5*((pos-=2)*pos*(((s*=1.525)+1)*pos+s)+2);},elastic:function elastic(pos){// jshint maxlen:90
return-1*Math.pow(4,-8*pos)*Math.sin((pos*6-1)*(2*Math.PI)/2)+1;},swingFromTo:function swingFromTo(pos){var s=1.70158;return(pos/=0.5)<1?0.5*(pos*pos*(((s*=1.525)+1)*pos-s)):0.5*((pos-=2)*pos*(((s*=1.525)+1)*pos+s)+2);},swingFrom:function swingFrom(pos){var s=1.70158;return pos*pos*((s+1)*pos-s);},swingTo:function swingTo(pos){var s=1.70158;return(pos-=1)*pos*((s+1)*pos+s)+1;},bounce:function bounce(pos){if(pos<1/2.75){return 7.5625*pos*pos;}else if(pos<2/2.75){return 7.5625*(pos-=1.5/2.75)*pos+0.75;}else if(pos<2.5/2.75){return 7.5625*(pos-=2.25/2.75)*pos+0.9375;}else{return 7.5625*(pos-=2.625/2.75)*pos+0.984375;}},bouncePast:function bouncePast(pos){if(pos<1/2.75){return 7.5625*pos*pos;}else if(pos<2/2.75){return 2-(7.5625*(pos-=1.5/2.75)*pos+0.75);}else if(pos<2.5/2.75){return 2-(7.5625*(pos-=2.25/2.75)*pos+0.9375);}else{return 2-(7.5625*(pos-=2.625/2.75)*pos+0.984375);}},easeFromTo:function easeFromTo(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,4);}return-0.5*((pos-=2)*Math.pow(pos,3)-2);},easeFrom:function easeFrom(pos){return Math.pow(pos,4);},easeTo:function easeTo(pos){return Math.pow(pos,0.25);}});})();// jshint maxlen:100
/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 *//**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */;(function(){// port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration){var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;function sampleCurveX(t){return((ax*t+bx)*t+cx)*t;}function sampleCurveY(t){return((ay*t+by)*t+cy)*t;}function sampleCurveDerivativeX(t){return(3.0*ax*t+2.0*bx)*t+cx;}function solveEpsilon(duration){return 1.0/(200.0*duration);}function solve(x,epsilon){return sampleCurveY(solveCurveX(x,epsilon));}function fabs(n){if(n>=0){return n;}else{return 0-n;}}function solveCurveX(x,epsilon){var t0,t1,t2,x2,d2,i;for(t2=x,i=0;i<8;i++){x2=sampleCurveX(t2)-x;if(fabs(x2)<epsilon){return t2;}d2=sampleCurveDerivativeX(t2);if(fabs(d2)<1e-6){break;}t2=t2-x2/d2;}t0=0.0;t1=1.0;t2=x;if(t2<t0){return t0;}if(t2>t1){return t1;}while(t0<t1){x2=sampleCurveX(t2);if(fabs(x2-x)<epsilon){return t2;}if(x>x2){t0=t2;}else{t1=t2;}t2=(t1-t0)*0.5+t0;}return t2;// Failure.
}cx=3.0*p1x;bx=3.0*(p2x-p1x)-cx;ax=1.0-cx-bx;cy=3.0*p1y;by=3.0*(p2y-p1y)-cy;ay=1.0-cy-by;return solve(t,solveEpsilon(duration));}/**
   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
   *
   *  Generates a transition easing function that is compatible
   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
   *  CSS property.
   *
   *  The W3C has more information about CSS3 transition timing functions:
   *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
   *
   *  @param {number} x1
   *  @param {number} y1
   *  @param {number} x2
   *  @param {number} y2
   *  @return {function}
   *  @private
   */function getCubicBezierTransition(x1,y1,x2,y2){return function(pos){return cubicBezierAtTime(pos,x1,y1,x2,y2,1);};}// End ported code
/**
   * Create a Bezier easing function and attach it to `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
   * function gives you total control over the easing curve.  Matthew Lein's
   * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
   * the curves you can make with this function.
   * @method setBezierFunction
   * @param {string} name The name of the easing curve.  Overwrites the old
   * easing function on `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
   * exists.
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {function} The easing function that was attached to
   * Tweenable.prototype.formula.
   */Tweenable.setBezierFunction=function(name,x1,y1,x2,y2){var cubicBezierTransition=getCubicBezierTransition(x1,y1,x2,y2);cubicBezierTransition.displayName=name;cubicBezierTransition.x1=x1;cubicBezierTransition.y1=y1;cubicBezierTransition.x2=x2;cubicBezierTransition.y2=y2;return Tweenable.prototype.formula[name]=cubicBezierTransition;};/**
   * `delete` an easing function from `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
   * careful with this method, as it `delete`s whatever easing formula matches
   * `name` (which means you can delete standard Shifty easing functions).
   * @method unsetBezierFunction
   * @param {string} name The name of the easing function to delete.
   * @return {function}
   */Tweenable.unsetBezierFunction=function(name){delete Tweenable.prototype.formula[name];};})();;(function(){function getInterpolatedValues(from,current,targetState,position,easing,delay){return Tweenable.tweenProps(position,current,from,targetState,1,delay,easing);}// Fake a Tweenable and patch some internals.  This approach allows us to
// skip uneccessary processing and object recreation, cutting down on garbage
// collection pauses.
var mockTweenable=new Tweenable();mockTweenable._filterArgs=[];/**
   * Compute the midpoint of two Objects.  This method effectively calculates a
   * specific frame of animation that `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
   * of a full tween.
   *
   *     var interpolatedValues = Tweenable.interpolate({
   *       width: '100px',
   *       opacity: 0,
   *       color: '#fff'
   *     }, {
   *       width: '200px',
   *       opacity: 1,
   *       color: '#000'
   *     }, 0.5);
   *
   *     console.log(interpolatedValues);
   *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
   *
   * @static
   * @method interpolate
   * @param {Object} from The starting values to tween from.
   * @param {Object} targetState The ending values to tween to.
   * @param {number} position The normalized position value (between `0.0` and
   * `1.0`) to interpolate the values between `from` and `to` for.  `from`
   * represents `0` and `to` represents `1`.
   * @param {Object.<string|Function>|string|Function} easing The easing
   * curve(s) to calculate the midpoint against.  You can reference any easing
   * function attached to `Tweenable.prototype.formula`, or provide the easing
   * function(s) directly.  If omitted, this defaults to "linear".
   * @param {number=} opt_delay Optional delay to pad the beginning of the
   * interpolated tween with.  This increases the range of `position` from (`0`
   * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
   * increase all valid values of `position` to numbers between `0` and `1.5`.
   * @return {Object}
   */Tweenable.interpolate=function(from,targetState,position,easing,opt_delay){var current=Tweenable.shallowCopy({},from);var delay=opt_delay||0;var easingObject=Tweenable.composeEasingObject(from,easing||'linear');mockTweenable.set({});// Alias and reuse the _filterArgs array instead of recreating it.
var filterArgs=mockTweenable._filterArgs;filterArgs.length=0;filterArgs[0]=current;filterArgs[1]=from;filterArgs[2]=targetState;filterArgs[3]=easingObject;// Any defined value transformation must be applied
Tweenable.applyFilter(mockTweenable,'tweenCreated');Tweenable.applyFilter(mockTweenable,'beforeTween');var interpolatedValues=getInterpolatedValues(from,current,targetState,position,easingObject,delay);// Transform values back into their original format
Tweenable.applyFilter(mockTweenable,'afterTween');return interpolatedValues;};})();/**
 * This module adds string interpolation support to Shifty.
 *
 * The Token extension allows Shifty to tween numbers inside of strings.  Among
 * other things, this allows you to animate CSS properties.  For example, you
 * can do this:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90xp)' }
 *     });
 *
 * `translateX(45)` will be tweened to `translateX(90)`.  To demonstrate:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90px)' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will log something like this in the console:
 *
 *     translateX(60.3px)
 *     ...
 *     translateX(76.05px)
 *     ...
 *     translateX(90px)
 *
 * Another use for this is animating colors:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: 'rgb(0,255,0)' },
 *       to: { color: 'rgb(255,0,255)' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * The above snippet will log something like this:
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * This extension also supports hexadecimal colors, in both long (`#ff00ff`)
 * and short (`#f0f`) forms.  Be aware that hexadecimal input values will be
 * converted into the equivalent RGB output values.  This is done to optimize
 * for performance.
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: '#0f0' },
 *       to: { color: '#f0f' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * This snippet will generate the same output as the one before it because
 * equivalent values were supplied (just in hexadecimal form rather than RGB):
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * ## Easing support
 *
 * Easing works somewhat differently in the Token extension.  This is because
 * some CSS properties have multiple values in them, and you might need to
 * tween each value along its own easing curve.  A basic example:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(11.56px) translateY(11.56px)
 *     ...
 *     translateX(46.24px) translateY(46.24px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * In this case, the values for `translateX` and `translateY` are always the
 * same for each step of the tween, because they have the same start and end
 * points and both use the same easing curve.  We can also tween `translateX`
 * and `translateY` along independent curves:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad bounce' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(10.89px) translateY(82.35px)
 *     ...
 *     translateX(44.89px) translateY(86.73px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * `translateX` and `translateY` are not in sync anymore, because `easeInQuad`
 * was specified for `translateX` and `bounce` for `translateY`.  Mixing and
 * matching easing curves can make for some interesting motion in your
 * animations.
 *
 * The order of the space-separated easing curves correspond the token values
 * they apply to.  If there are more token values than easing curves listed,
 * the last easing curve listed is used.
 * @submodule Tweenable.token
 */// token function is defined above only so that dox-foundation sees it as
// documentation and renders it.  It is never used, and is optimized away at
// build time.
;(function(Tweenable){/**
   * @typedef {{
   *   formatString: string
   *   chunkNames: Array.<string>
   * }}
   * @private
   */var formatManifest;// CONSTANTS
var R_NUMBER_COMPONENT=/(\d|\-|\.)/;var R_FORMAT_CHUNKS=/([^\-0-9\.]+)/g;var R_UNFORMATTED_VALUES=/[0-9.\-]+/g;var R_RGB=new RegExp('rgb\\('+R_UNFORMATTED_VALUES.source+/,\s*/.source+R_UNFORMATTED_VALUES.source+/,\s*/.source+R_UNFORMATTED_VALUES.source+'\\)','g');var R_RGB_PREFIX=/^.*\(/;var R_HEX=/#([0-9]|[a-f]){3,6}/gi;var VALUE_PLACEHOLDER='VAL';// HELPERS
/**
   * @param {Array.number} rawValues
   * @param {string} prefix
   *
   * @return {Array.<string>}
   * @private
   */function getFormatChunksFrom(rawValues,prefix){var accumulator=[];var rawValuesLength=rawValues.length;var i;for(i=0;i<rawValuesLength;i++){accumulator.push('_'+prefix+'_'+i);}return accumulator;}/**
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */function getFormatStringFrom(formattedString){var chunks=formattedString.match(R_FORMAT_CHUNKS);if(!chunks){// chunks will be null if there were no tokens to parse in
// formattedString (for example, if formattedString is '2').  Coerce
// chunks to be useful here.
chunks=['',''];// If there is only one chunk, assume that the string is a number
// followed by a token...
// NOTE: This may be an unwise assumption.
}else if(chunks.length===1||// ...or if the string starts with a number component (".", "-", or a
// digit)...
formattedString.charAt(0).match(R_NUMBER_COMPONENT)){// ...prepend an empty string here to make sure that the formatted number
// is properly replaced by VALUE_PLACEHOLDER
chunks.unshift('');}return chunks.join(VALUE_PLACEHOLDER);}/**
   * Convert all hex color values within a string to an rgb string.
   *
   * @param {Object} stateObject
   *
   * @return {Object} The modified obj
   * @private
   */function sanitizeObjectForHexProps(stateObject){Tweenable.each(stateObject,function(prop){var currentProp=stateObject[prop];if(typeof currentProp==='string'&&currentProp.match(R_HEX)){stateObject[prop]=sanitizeHexChunksToRGB(currentProp);}});}/**
   * @param {string} str
   *
   * @return {string}
   * @private
   */function sanitizeHexChunksToRGB(str){return filterStringChunks(R_HEX,str,convertHexToRGB);}/**
   * @param {string} hexString
   *
   * @return {string}
   * @private
   */function convertHexToRGB(hexString){var rgbArr=hexToRGBArray(hexString);return'rgb('+rgbArr[0]+','+rgbArr[1]+','+rgbArr[2]+')';}var hexToRGBArray_returnArray=[];/**
   * Convert a hexadecimal string to an array with three items, one each for
   * the red, blue, and green decimal values.
   *
   * @param {string} hex A hexadecimal string.
   *
   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
   * valid string, or an Array of three 0's.
   * @private
   */function hexToRGBArray(hex){hex=hex.replace(/#/,'');// If the string is a shorthand three digit hex notation, normalize it to
// the standard six digit notation
if(hex.length===3){hex=hex.split('');hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];}hexToRGBArray_returnArray[0]=hexToDec(hex.substr(0,2));hexToRGBArray_returnArray[1]=hexToDec(hex.substr(2,2));hexToRGBArray_returnArray[2]=hexToDec(hex.substr(4,2));return hexToRGBArray_returnArray;}/**
   * Convert a base-16 number to base-10.
   *
   * @param {Number|String} hex The value to convert
   *
   * @returns {Number} The base-10 equivalent of `hex`.
   * @private
   */function hexToDec(hex){return parseInt(hex,16);}/**
   * Runs a filter operation on all chunks of a string that match a RegExp
   *
   * @param {RegExp} pattern
   * @param {string} unfilteredString
   * @param {function(string)} filter
   *
   * @return {string}
   * @private
   */function filterStringChunks(pattern,unfilteredString,filter){var pattenMatches=unfilteredString.match(pattern);var filteredString=unfilteredString.replace(pattern,VALUE_PLACEHOLDER);if(pattenMatches){var pattenMatchesLength=pattenMatches.length;var currentChunk;for(var i=0;i<pattenMatchesLength;i++){currentChunk=pattenMatches.shift();filteredString=filteredString.replace(VALUE_PLACEHOLDER,filter(currentChunk));}}return filteredString;}/**
   * Check for floating point values within rgb strings and rounds them.
   *
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */function sanitizeRGBChunks(formattedString){return filterStringChunks(R_RGB,formattedString,sanitizeRGBChunk);}/**
   * @param {string} rgbChunk
   *
   * @return {string}
   * @private
   */function sanitizeRGBChunk(rgbChunk){var numbers=rgbChunk.match(R_UNFORMATTED_VALUES);var numbersLength=numbers.length;var sanitizedString=rgbChunk.match(R_RGB_PREFIX)[0];for(var i=0;i<numbersLength;i++){sanitizedString+=parseInt(numbers[i],10)+',';}sanitizedString=sanitizedString.slice(0,-1)+')';return sanitizedString;}/**
   * @param {Object} stateObject
   *
   * @return {Object} An Object of formatManifests that correspond to
   * the string properties of stateObject
   * @private
   */function getFormatManifests(stateObject){var manifestAccumulator={};Tweenable.each(stateObject,function(prop){var currentProp=stateObject[prop];if(typeof currentProp==='string'){var rawValues=getValuesFrom(currentProp);manifestAccumulator[prop]={'formatString':getFormatStringFrom(currentProp),'chunkNames':getFormatChunksFrom(rawValues,prop)};}});return manifestAccumulator;}/**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */function expandFormattedProperties(stateObject,formatManifests){Tweenable.each(formatManifests,function(prop){var currentProp=stateObject[prop];var rawValues=getValuesFrom(currentProp);var rawValuesLength=rawValues.length;for(var i=0;i<rawValuesLength;i++){stateObject[formatManifests[prop].chunkNames[i]]=+rawValues[i];}delete stateObject[prop];});}/**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */function collapseFormattedProperties(stateObject,formatManifests){Tweenable.each(formatManifests,function(prop){var currentProp=stateObject[prop];var formatChunks=extractPropertyChunks(stateObject,formatManifests[prop].chunkNames);var valuesList=getValuesList(formatChunks,formatManifests[prop].chunkNames);currentProp=getFormattedValues(formatManifests[prop].formatString,valuesList);stateObject[prop]=sanitizeRGBChunks(currentProp);});}/**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Object} The extracted value chunks.
   * @private
   */function extractPropertyChunks(stateObject,chunkNames){var extractedValues={};var currentChunkName,chunkNamesLength=chunkNames.length;for(var i=0;i<chunkNamesLength;i++){currentChunkName=chunkNames[i];extractedValues[currentChunkName]=stateObject[currentChunkName];delete stateObject[currentChunkName];}return extractedValues;}var getValuesList_accumulator=[];/**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Array.<number>}
   * @private
   */function getValuesList(stateObject,chunkNames){getValuesList_accumulator.length=0;var chunkNamesLength=chunkNames.length;for(var i=0;i<chunkNamesLength;i++){getValuesList_accumulator.push(stateObject[chunkNames[i]]);}return getValuesList_accumulator;}/**
   * @param {string} formatString
   * @param {Array.<number>} rawValues
   *
   * @return {string}
   * @private
   */function getFormattedValues(formatString,rawValues){var formattedValueString=formatString;var rawValuesLength=rawValues.length;for(var i=0;i<rawValuesLength;i++){formattedValueString=formattedValueString.replace(VALUE_PLACEHOLDER,+rawValues[i].toFixed(4));}return formattedValueString;}/**
   * Note: It's the duty of the caller to convert the Array elements of the
   * return value into numbers.  This is a performance optimization.
   *
   * @param {string} formattedString
   *
   * @return {Array.<string>|null}
   * @private
   */function getValuesFrom(formattedString){return formattedString.match(R_UNFORMATTED_VALUES);}/**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */function expandEasingObject(easingObject,tokenData){Tweenable.each(tokenData,function(prop){var currentProp=tokenData[prop];var chunkNames=currentProp.chunkNames;var chunkLength=chunkNames.length;var easing=easingObject[prop];var i;if(typeof easing==='string'){var easingChunks=easing.split(' ');var lastEasingChunk=easingChunks[easingChunks.length-1];for(i=0;i<chunkLength;i++){easingObject[chunkNames[i]]=easingChunks[i]||lastEasingChunk;}}else{for(i=0;i<chunkLength;i++){easingObject[chunkNames[i]]=easing;}}delete easingObject[prop];});}/**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */function collapseEasingObject(easingObject,tokenData){Tweenable.each(tokenData,function(prop){var currentProp=tokenData[prop];var chunkNames=currentProp.chunkNames;var chunkLength=chunkNames.length;var firstEasing=easingObject[chunkNames[0]];var typeofEasings=typeof firstEasing==='undefined'?'undefined':_typeof(firstEasing);if(typeofEasings==='string'){var composedEasingString='';for(var i=0;i<chunkLength;i++){composedEasingString+=' '+easingObject[chunkNames[i]];delete easingObject[chunkNames[i]];}easingObject[prop]=composedEasingString.substr(1);}else{easingObject[prop]=firstEasing;}});}Tweenable.prototype.filter.token={'tweenCreated':function tweenCreated(currentState,fromState,toState,easingObject){sanitizeObjectForHexProps(currentState);sanitizeObjectForHexProps(fromState);sanitizeObjectForHexProps(toState);this._tokenData=getFormatManifests(currentState);},'beforeTween':function beforeTween(currentState,fromState,toState,easingObject){expandEasingObject(easingObject,this._tokenData);expandFormattedProperties(currentState,this._tokenData);expandFormattedProperties(fromState,this._tokenData);expandFormattedProperties(toState,this._tokenData);},'afterTween':function afterTween(currentState,fromState,toState,easingObject){collapseFormattedProperties(currentState,this._tokenData);collapseFormattedProperties(fromState,this._tokenData);collapseFormattedProperties(toState,this._tokenData);collapseEasingObject(easingObject,this._tokenData);}};})(Tweenable);}).call(null);/***/},/* 8 *//***/function(module,exports,__webpack_require__){// Semi-SemiCircle shaped progress bar
var Shape=__webpack_require__(1);var Circle=__webpack_require__(3);var utils=__webpack_require__(0);var SemiCircle=function SemiCircle(container,options){// Use one arc to form a SemiCircle
// See this answer http://stackoverflow.com/a/10477334/1446092
this._pathTemplate='M 50,50 m -{radius},0'+' a {radius},{radius} 0 1 1 {2radius},0';this.containerAspectRatio=2;Shape.apply(this,arguments);};SemiCircle.prototype=new Shape();SemiCircle.prototype.constructor=SemiCircle;SemiCircle.prototype._initializeSvg=function _initializeSvg(svg,opts){svg.setAttribute('viewBox','0 0 100 50');};SemiCircle.prototype._initializeTextContainer=function _initializeTextContainer(opts,container,textContainer){if(opts.text.style){// Reset top style
textContainer.style.top='auto';textContainer.style.bottom='0';if(opts.text.alignToBottom){utils.setStyle(textContainer,'transform','translate(-50%, 0)');}else{utils.setStyle(textContainer,'transform','translate(-50%, 50%)');}}};// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString=Circle.prototype._pathString;SemiCircle.prototype._trailString=Circle.prototype._trailString;module.exports=SemiCircle;/***/},/* 9 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__=__webpack_require__(10);/**
 * Swiper 4.0.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 28, 2017
 */var w=void 0;if(typeof window==='undefined'){w={navigator:{userAgent:''},location:{},history:{},addEventListener:function addEventListener(){},removeEventListener:function removeEventListener(){},getComputedStyle:function getComputedStyle(){return{};},Image:function Image(){},Date:function Date(){},screen:{}};}else{w=window;}var win=w;var Methods={addClass:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["c"/* addClass */],removeClass:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["E"/* removeClass */],hasClass:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["m"/* hasClass */],toggleClass:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["H"/* toggleClass */],attr:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["e"/* attr */],removeAttr:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["D"/* removeAttr */],data:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["i"/* data */],transform:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["I"/* transform */],transition:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["J"/* transition */],on:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["u"/* on */],off:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["s"/* off */],trigger:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["L"/* trigger */],transitionEnd:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["K"/* transitionEnd */],outerWidth:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["w"/* outerWidth */],outerHeight:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["v"/* outerHeight */],offset:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["t"/* offset */],css:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["h"/* css */],each:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["j"/* each */],html:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["n"/* html */],text:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["G"/* text */],is:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["p"/* is */],index:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["o"/* index */],eq:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["k"/* eq */],append:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["d"/* append */],prepend:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["z"/* prepend */],next:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["q"/* next */],nextAll:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["r"/* nextAll */],prev:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["A"/* prev */],prevAll:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["B"/* prevAll */],parent:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["x"/* parent */],parents:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["y"/* parents */],closest:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["g"/* closest */],find:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["l"/* find */],children:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["f"/* children */],remove:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["C"/* remove */],add:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["b"/* add */],styles:__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["F"/* styles */]};Object.keys(Methods).forEach(function(methodName){__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */].fn[methodName]=Methods[methodName];});var Utils={deleteProps:function deleteProps(obj){var object=obj;Object.keys(object).forEach(function(key){try{object[key]=null;}catch(e){// no getter for object
}try{delete object[key];}catch(e){// something got wrong
}});},nextTick:function nextTick(callback){var delay=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return setTimeout(callback,delay);},now:function now(){return Date.now();},getTranslate:function getTranslate(el){var axis=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'x';var matrix=void 0;var curTransform=void 0;var transformMatrix=void 0;var curStyle=win.getComputedStyle(el,null);if(win.WebKitCSSMatrix){curTransform=curStyle.transform||curStyle.webkitTransform;if(curTransform.split(',').length>6){curTransform=curTransform.split(', ').map(function(a){return a.replace(',','.');}).join(', ');}// Some old versions of Webkit choke when 'none' is passed; pass
// empty string instead in this case
transformMatrix=new win.WebKitCSSMatrix(curTransform==='none'?'':curTransform);}else{transformMatrix=curStyle.MozTransform||curStyle.OTransform||curStyle.MsTransform||curStyle.msTransform||curStyle.transform||curStyle.getPropertyValue('transform').replace('translate(','matrix(1, 0, 0, 1,');matrix=transformMatrix.toString().split(',');}if(axis==='x'){// Latest Chrome and webkits Fix
if(win.WebKitCSSMatrix)curTransform=transformMatrix.m41;// Crazy IE10 Matrix
else if(matrix.length===16)curTransform=parseFloat(matrix[12]);// Normal Browsers
else curTransform=parseFloat(matrix[4]);}if(axis==='y'){// Latest Chrome and webkits Fix
if(win.WebKitCSSMatrix)curTransform=transformMatrix.m42;// Crazy IE10 Matrix
else if(matrix.length===16)curTransform=parseFloat(matrix[13]);// Normal Browsers
else curTransform=parseFloat(matrix[5]);}return curTransform||0;},parseUrlQuery:function parseUrlQuery(url){var query={};var urlToParse=url||win.location.href;var i=void 0;var params=void 0;var param=void 0;var length=void 0;if(typeof urlToParse==='string'&&urlToParse.length){urlToParse=urlToParse.indexOf('?')>-1?urlToParse.replace(/\S*\?/,''):'';params=urlToParse.split('&').filter(function(paramsPart){return paramsPart!=='';});length=params.length;for(i=0;i<length;i+=1){param=params[i].replace(/#\S+/g,'').split('=');query[decodeURIComponent(param[0])]=typeof param[1]==='undefined'?undefined:decodeURIComponent(param[1])||'';}}return query;},isObject:function isObject(o){return(typeof o==='undefined'?'undefined':_typeof(o))==='object'&&o!==null&&o.constructor&&o.constructor===Object;},extend:function extend(){var to=Object(arguments.length<=0?undefined:arguments[0]);for(var i=1;i<arguments.length;i+=1){var nextSource=arguments.length<=i?undefined:arguments[i];if(nextSource!==undefined&&nextSource!==null){var keysArray=Object.keys(Object(nextSource));for(var nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex+=1){var nextKey=keysArray[nextIndex];var desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);if(desc!==undefined&&desc.enumerable){if(Utils.isObject(to[nextKey])&&Utils.isObject(nextSource[nextKey])){Utils.extend(to[nextKey],nextSource[nextKey]);}else if(!Utils.isObject(to[nextKey])&&Utils.isObject(nextSource[nextKey])){to[nextKey]={};Utils.extend(to[nextKey],nextSource[nextKey]);}else{to[nextKey]=nextSource[nextKey];}}}}}return to;}};var d=void 0;if(typeof document==='undefined'){d={addEventListener:function addEventListener(){},removeEventListener:function removeEventListener(){},activeElement:{blur:function blur(){},nodeName:''},querySelector:function querySelector(){return{};},querySelectorAll:function querySelectorAll(){return[];},createElement:function createElement(){return{style:{},setAttribute:function setAttribute(){},getElementsByTagName:function getElementsByTagName(){return[];}};},location:{hash:''}};}else{d=document;}var doc=d;var Support=function Support(){return{touch:win.Modernizr&&win.Modernizr.touch===true||function checkTouch(){return!!('ontouchstart'in win||win.DocumentTouch&&doc instanceof win.DocumentTouch);}(),transforms3d:win.Modernizr&&win.Modernizr.csstransforms3d===true||function checkTransforms3d(){var div=doc.createElement('div').style;return'webkitPerspective'in div||'MozPerspective'in div||'OPerspective'in div||'MsPerspective'in div||'perspective'in div;}(),flexbox:function checkFlexbox(){var div=doc.createElement('div').style;var styles$$1='alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');for(var i=0;i<styles$$1.length;i+=1){if(styles$$1[i]in div)return true;}return false;}(),observer:function checkObserver(){return'MutationObserver'in win||'WebkitMutationObserver'in win;}(),passiveListener:function checkPassiveListener(){var supportsPassive=false;try{var opts=Object.defineProperty({},'passive',{get:function get(){supportsPassive=true;}});win.addEventListener('testPassiveListener',null,opts);}catch(e){// No support
}return supportsPassive;}(),gestures:function checkGestures(){return'ongesturestart'in win;}()};}();var SwiperClass=function(){function SwiperClass(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SwiperClass);var self=this;self.params=params;// Events
self.eventsListeners={};if(self.params&&self.params.on){Object.keys(self.params.on).forEach(function(eventName){self.on(eventName,self.params.on[eventName]);});}}_createClass(SwiperClass,[{key:'on',value:function on(events,handler){var self=this;if(typeof handler!=='function')return self;events.split(' ').forEach(function(event){if(!self.eventsListeners[event])self.eventsListeners[event]=[];self.eventsListeners[event].push(handler);});return self;}},{key:'once',value:function once(events,handler){var self=this;if(typeof handler!=='function')return self;function onceHandler(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}handler.apply(self,args);self.off(events,onceHandler);}return self.on(events,onceHandler);}},{key:'off',value:function off(events,handler){var self=this;events.split(' ').forEach(function(event){if(typeof handler==='undefined'){self.eventsListeners[event]=[];}else{self.eventsListeners[event].forEach(function(eventHandler,index$$1){if(eventHandler===handler){self.eventsListeners[event].splice(index$$1,1);}});}});return self;}},{key:'emit',value:function emit(){var self=this;if(!self.eventsListeners)return self;var events=void 0;var data$$1=void 0;var context=void 0;for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}if(typeof args[0]==='string'||Array.isArray(args[0])){events=args[0];data$$1=args.slice(1,args.length);context=self;}else{events=args[0].events;data$$1=args[0].data;context=args[0].context||self;}var eventsArray=Array.isArray(events)?events:events.split(' ');eventsArray.forEach(function(event){if(self.eventsListeners[event]){var handlers=[];self.eventsListeners[event].forEach(function(eventHandler){handlers.push(eventHandler);});handlers.forEach(function(eventHandler){eventHandler.apply(context,data$$1);});}});return self;}},{key:'useModulesParams',value:function useModulesParams(instanceParams){var instance=this;if(!instance.modules)return;Object.keys(instance.modules).forEach(function(moduleName){var module=instance.modules[moduleName];// Extend params
if(module.params){Utils.extend(instanceParams,module.params);}});}},{key:'useModules',value:function useModules(){var modulesParams=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var instance=this;if(!instance.modules)return;Object.keys(instance.modules).forEach(function(moduleName){var module=instance.modules[moduleName];var moduleParams=modulesParams[moduleName]||{};// Extend instance methods and props
if(module.instance){Object.keys(module.instance).forEach(function(modulePropName){var moduleProp=module.instance[modulePropName];if(typeof moduleProp==='function'){instance[modulePropName]=moduleProp.bind(instance);}else{instance[modulePropName]=moduleProp;}});}// Add event listeners
if(module.on&&instance.on){Object.keys(module.on).forEach(function(moduleEventName){instance.on(moduleEventName,module.on[moduleEventName]);});}// Module create callback
if(module.create){module.create.bind(instance)(moduleParams);}});}}],[{key:'installModule',value:function installModule(module){var Class=this;if(!Class.prototype.modules)Class.prototype.modules={};var name=module.name||Object.keys(Class.prototype.modules).length+'_'+Utils.now();Class.prototype.modules[name]=module;// Prototype
if(module.proto){Object.keys(module.proto).forEach(function(key){Class.prototype[key]=module.proto[key];});}// Class
if(module.static){Object.keys(module.static).forEach(function(key){Class[key]=module.static[key];});}// Callback
if(module.install){for(var _len3=arguments.length,params=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){params[_key3-1]=arguments[_key3];}module.install.apply(Class,params);}return Class;}},{key:'use',value:function use(module){var Class=this;if(Array.isArray(module)){module.forEach(function(m){return Class.installModule(m);});return Class;}for(var _len4=arguments.length,params=Array(_len4>1?_len4-1:0),_key4=1;_key4<_len4;_key4++){params[_key4-1]=arguments[_key4];}return Class.installModule.apply(Class,[module].concat(params));}},{key:'components',set:function set(components){var Class=this;if(!Class.use)return;Class.use(components);}}]);return SwiperClass;}();var updateSize=function updateSize(){var swiper=this;var width=void 0;var height=void 0;var $el=swiper.$el;if(typeof swiper.params.width!=='undefined'){width=swiper.params.width;}else{width=$el[0].clientWidth;}if(typeof swiper.params.height!=='undefined'){height=swiper.params.height;}else{height=$el[0].clientHeight;}if(width===0&&swiper.isHorizontal()||height===0&&swiper.isVertical()){return;}// Subtract paddings
width=width-parseInt($el.css('padding-left'),10)-parseInt($el.css('padding-right'),10);height=height-parseInt($el.css('padding-top'),10)-parseInt($el.css('padding-bottom'),10);Utils.extend(swiper,{width:width,height:height,size:swiper.isHorizontal()?width:height});};var updateSlides=function updateSlides(){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl,swiperSize=swiper.size,rtl=swiper.rtl,wrongRTL=swiper.wrongRTL;var slides=$wrapperEl.children('.'+swiper.params.slideClass);var isVirtual=swiper.virtual&&params.virtual.enabled;var slidesLength=isVirtual?swiper.virtual.slides.length:slides.length;var snapGrid=[];var slidesGrid=[];var slidesSizesGrid=[];var offsetBefore=params.slidesOffsetBefore;if(typeof offsetBefore==='function'){offsetBefore=params.slidesOffsetBefore.call(swiper);}var offsetAfter=params.slidesOffsetAfter;if(typeof offsetAfter==='function'){offsetAfter=params.slidesOffsetAfter.call(swiper);}var previousSlidesLength=slidesLength;var previousSnapGridLength=swiper.snapGrid.length;var previousSlidesGridLength=swiper.snapGrid.length;var spaceBetween=params.spaceBetween;var slidePosition=-offsetBefore;var prevSlideSize=0;var index$$1=0;if(typeof swiperSize==='undefined'){return;}if(typeof spaceBetween==='string'&&spaceBetween.indexOf('%')>=0){spaceBetween=parseFloat(spaceBetween.replace('%',''))/100*swiperSize;}swiper.virtualSize=-spaceBetween;// reset margins
if(rtl)slides.css({marginLeft:'',marginTop:''});else slides.css({marginRight:'',marginBottom:''});var slidesNumberEvenToRows=void 0;if(params.slidesPerColumn>1){if(Math.floor(slidesLength/params.slidesPerColumn)===slidesLength/swiper.params.slidesPerColumn){slidesNumberEvenToRows=slidesLength;}else{slidesNumberEvenToRows=Math.ceil(slidesLength/params.slidesPerColumn)*params.slidesPerColumn;}if(params.slidesPerView!=='auto'&&params.slidesPerColumnFill==='row'){slidesNumberEvenToRows=Math.max(slidesNumberEvenToRows,params.slidesPerView*params.slidesPerColumn);}}// Calc slides
var slideSize=void 0;var slidesPerColumn=params.slidesPerColumn;var slidesPerRow=slidesNumberEvenToRows/slidesPerColumn;var numFullColumns=slidesPerRow-(params.slidesPerColumn*slidesPerRow-slidesLength);for(var i=0;i<slidesLength;i+=1){slideSize=0;var _slide=slides.eq(i);if(params.slidesPerColumn>1){// Set slides order
var newSlideOrderIndex=void 0;var column=void 0;var row=void 0;if(params.slidesPerColumnFill==='column'){column=Math.floor(i/slidesPerColumn);row=i-column*slidesPerColumn;if(column>numFullColumns||column===numFullColumns&&row===slidesPerColumn-1){row+=1;if(row>=slidesPerColumn){row=0;column+=1;}}newSlideOrderIndex=column+row*slidesNumberEvenToRows/slidesPerColumn;_slide.css({'-webkit-box-ordinal-group':newSlideOrderIndex,'-moz-box-ordinal-group':newSlideOrderIndex,'-ms-flex-order':newSlideOrderIndex,'-webkit-order':newSlideOrderIndex,order:newSlideOrderIndex});}else{row=Math.floor(i/slidesPerRow);column=i-row*slidesPerRow;}_slide.css('margin-'+(swiper.isHorizontal()?'top':'left'),row!==0&&params.spaceBetween&&params.spaceBetween+'px').attr('data-swiper-column',column).attr('data-swiper-row',row);}if(_slide.css('display')==='none')continue;// eslint-disable-line
if(params.slidesPerView==='auto'){slideSize=swiper.isHorizontal()?_slide.outerWidth(true):_slide.outerHeight(true);if(params.roundLengths)slideSize=Math.floor(slideSize);}else{slideSize=(swiperSize-(params.slidesPerView-1)*spaceBetween)/params.slidesPerView;if(params.roundLengths)slideSize=Math.floor(slideSize);if(slides[i]){if(swiper.isHorizontal()){slides[i].style.width=slideSize+'px';}else{slides[i].style.height=slideSize+'px';}}}if(slides[i]){slides[i].swiperSlideSize=slideSize;}slidesSizesGrid.push(slideSize);if(params.centeredSlides){slidePosition=slidePosition+slideSize/2+prevSlideSize/2+spaceBetween;if(prevSlideSize===0&&i!==0)slidePosition=slidePosition-swiperSize/2-spaceBetween;if(i===0)slidePosition=slidePosition-swiperSize/2-spaceBetween;if(Math.abs(slidePosition)<1/1000)slidePosition=0;if(index$$1%params.slidesPerGroup===0)snapGrid.push(slidePosition);slidesGrid.push(slidePosition);}else{if(index$$1%params.slidesPerGroup===0)snapGrid.push(slidePosition);slidesGrid.push(slidePosition);slidePosition=slidePosition+slideSize+spaceBetween;}swiper.virtualSize+=slideSize+spaceBetween;prevSlideSize=slideSize;index$$1+=1;}swiper.virtualSize=Math.max(swiper.virtualSize,swiperSize)+offsetAfter;var newSlidesGrid=void 0;if(rtl&&wrongRTL&&(params.effect==='slide'||params.effect==='coverflow')){$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+'px'});}if(!Support.flexbox||params.setWrapperSize){if(swiper.isHorizontal())$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+'px'});else $wrapperEl.css({height:swiper.virtualSize+params.spaceBetween+'px'});}if(params.slidesPerColumn>1){swiper.virtualSize=(slideSize+params.spaceBetween)*slidesNumberEvenToRows;swiper.virtualSize=Math.ceil(swiper.virtualSize/params.slidesPerColumn)-params.spaceBetween;if(swiper.isHorizontal())$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+'px'});else $wrapperEl.css({height:swiper.virtualSize+params.spaceBetween+'px'});if(params.centeredSlides){newSlidesGrid=[];for(var _i=0;_i<snapGrid.length;_i+=1){if(snapGrid[_i]<swiper.virtualSize+snapGrid[0])newSlidesGrid.push(snapGrid[_i]);}snapGrid=newSlidesGrid;}}// Remove last grid elements depending on width
if(!params.centeredSlides){newSlidesGrid=[];for(var _i2=0;_i2<snapGrid.length;_i2+=1){if(snapGrid[_i2]<=swiper.virtualSize-swiperSize){newSlidesGrid.push(snapGrid[_i2]);}}snapGrid=newSlidesGrid;if(Math.floor(swiper.virtualSize-swiperSize)-Math.floor(snapGrid[snapGrid.length-1])>1){snapGrid.push(swiper.virtualSize-swiperSize);}}if(snapGrid.length===0)snapGrid=[0];if(params.spaceBetween!==0){if(swiper.isHorizontal()){if(rtl)slides.css({marginLeft:spaceBetween+'px'});else slides.css({marginRight:spaceBetween+'px'});}else slides.css({marginBottom:spaceBetween+'px'});}Utils.extend(swiper,{slides:slides,snapGrid:snapGrid,slidesGrid:slidesGrid,slidesSizesGrid:slidesSizesGrid});if(slidesLength!==previousSlidesLength){swiper.emit('slidesLengthChange');}if(snapGrid.length!==previousSnapGridLength){swiper.emit('snapGridLengthChange');}if(slidesGrid.length!==previousSlidesGridLength){swiper.emit('slidesGridLengthChange');}if(params.watchSlidesProgress||params.watchSlidesVisibility){swiper.updateSlidesOffset();}};var updateAutoHeight=function updateAutoHeight(){var swiper=this;var activeSlides=[];var newHeight=0;var i=void 0;// Find slides currently in view
if(swiper.params.slidesPerView!=='auto'&&swiper.params.slidesPerView>1){for(i=0;i<Math.ceil(swiper.params.slidesPerView);i+=1){var index$$1=swiper.activeIndex+i;if(index$$1>swiper.slides.length)break;activeSlides.push(swiper.slides.eq(index$$1)[0]);}}else{activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);}// Find new height from highest slide in view
for(i=0;i<activeSlides.length;i+=1){if(typeof activeSlides[i]!=='undefined'){var height=activeSlides[i].offsetHeight;newHeight=height>newHeight?height:newHeight;}}// Update Height
if(newHeight)swiper.$wrapperEl.css('height',newHeight+'px');};var updateSlidesOffset=function updateSlidesOffset(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){slides[i].swiperSlideOffset=swiper.isHorizontal()?slides[i].offsetLeft:slides[i].offsetTop;}};var updateSlidesProgress=function updateSlidesProgress(){var translate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.translate||0;var swiper=this;var params=swiper.params;var slides=swiper.slides,rtl=swiper.rtl;if(slides.length===0)return;if(typeof slides[0].swiperSlideOffset==='undefined')swiper.updateSlidesOffset();var offsetCenter=-translate;if(rtl)offsetCenter=translate;// Visible Slides
slides.removeClass(params.slideVisibleClass);for(var i=0;i<slides.length;i+=1){var _slide2=slides[i];var slideProgress=(offsetCenter+(params.centeredSlides?swiper.minTranslate():0)-_slide2.swiperSlideOffset)/(_slide2.swiperSlideSize+params.spaceBetween);if(params.watchSlidesVisibility){var slideBefore=-(offsetCenter-_slide2.swiperSlideOffset);var slideAfter=slideBefore+swiper.slidesSizesGrid[i];var isVisible=slideBefore>=0&&slideBefore<swiper.size||slideAfter>0&&slideAfter<=swiper.size||slideBefore<=0&&slideAfter>=swiper.size;if(isVisible){slides.eq(i).addClass(params.slideVisibleClass);}}_slide2.progress=rtl?-slideProgress:slideProgress;}};var updateProgress=function updateProgress(){var translate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.translate||0;var swiper=this;var params=swiper.params;var translatesDiff=swiper.maxTranslate()-swiper.minTranslate();var progress=swiper.progress,isBeginning=swiper.isBeginning,isEnd=swiper.isEnd;var wasBeginning=isBeginning;var wasEnd=isEnd;if(translatesDiff===0){progress=0;isBeginning=true;isEnd=true;}else{progress=(translate-swiper.minTranslate())/translatesDiff;isBeginning=progress<=0;isEnd=progress>=1;}Utils.extend(swiper,{progress:progress,isBeginning:isBeginning,isEnd:isEnd});if(params.watchSlidesProgress||params.watchSlidesVisibility)swiper.updateSlidesProgress(translate);if(isBeginning&&!wasBeginning){swiper.emit('reachBeginning toEdge');}if(isEnd&&!wasEnd){swiper.emit('reachEnd toEdge');}if(wasBeginning&&!isBeginning||wasEnd&&!isEnd){swiper.emit('fromEdge');}swiper.emit('progress',progress);};var updateSlidesClasses=function updateSlidesClasses(){var swiper=this;var slides=swiper.slides,params=swiper.params,$wrapperEl=swiper.$wrapperEl,activeIndex=swiper.activeIndex,realIndex=swiper.realIndex;var isVirtual=swiper.virtual&&params.virtual.enabled;slides.removeClass(params.slideActiveClass+' '+params.slideNextClass+' '+params.slidePrevClass+' '+params.slideDuplicateActiveClass+' '+params.slideDuplicateNextClass+' '+params.slideDuplicatePrevClass);var activeSlide=void 0;if(isVirtual){activeSlide=swiper.$wrapperEl.find('.'+params.slideClass+'[data-swiper-slide-index="'+activeIndex+'"]');}else{activeSlide=slides.eq(activeIndex);}// Active classes
activeSlide.addClass(params.slideActiveClass);if(params.loop){// Duplicate to all looped slides
if(activeSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children('.'+params.slideClass+':not(.'+params.slideDuplicateClass+')[data-swiper-slide-index="'+realIndex+'"]').addClass(params.slideDuplicateActiveClass);}else{$wrapperEl.children('.'+params.slideClass+'.'+params.slideDuplicateClass+'[data-swiper-slide-index="'+realIndex+'"]').addClass(params.slideDuplicateActiveClass);}}// Next Slide
var nextSlide=activeSlide.nextAll('.'+params.slideClass).eq(0).addClass(params.slideNextClass);if(params.loop&&nextSlide.length===0){nextSlide=slides.eq(0);nextSlide.addClass(params.slideNextClass);}// Prev Slide
var prevSlide=activeSlide.prevAll('.'+params.slideClass).eq(0).addClass(params.slidePrevClass);if(params.loop&&prevSlide.length===0){prevSlide=slides.eq(-1);prevSlide.addClass(params.slidePrevClass);}if(params.loop){// Duplicate to all looped slides
if(nextSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children('.'+params.slideClass+':not(.'+params.slideDuplicateClass+')[data-swiper-slide-index="'+nextSlide.attr('data-swiper-slide-index')+'"]').addClass(params.slideDuplicateNextClass);}else{$wrapperEl.children('.'+params.slideClass+'.'+params.slideDuplicateClass+'[data-swiper-slide-index="'+nextSlide.attr('data-swiper-slide-index')+'"]').addClass(params.slideDuplicateNextClass);}if(prevSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children('.'+params.slideClass+':not(.'+params.slideDuplicateClass+')[data-swiper-slide-index="'+prevSlide.attr('data-swiper-slide-index')+'"]').addClass(params.slideDuplicatePrevClass);}else{$wrapperEl.children('.'+params.slideClass+'.'+params.slideDuplicateClass+'[data-swiper-slide-index="'+prevSlide.attr('data-swiper-slide-index')+'"]').addClass(params.slideDuplicatePrevClass);}}};var updateActiveIndex=function updateActiveIndex(newActiveIndex){var swiper=this;var translate=swiper.rtl?swiper.translate:-swiper.translate;var slidesGrid=swiper.slidesGrid,snapGrid=swiper.snapGrid,params=swiper.params,previousIndex=swiper.activeIndex,previousRealIndex=swiper.realIndex,previousSnapIndex=swiper.snapIndex;var activeIndex=newActiveIndex;var snapIndex=void 0;if(typeof activeIndex==='undefined'){for(var i=0;i<slidesGrid.length;i+=1){if(typeof slidesGrid[i+1]!=='undefined'){if(translate>=slidesGrid[i]&&translate<slidesGrid[i+1]-(slidesGrid[i+1]-slidesGrid[i])/2){activeIndex=i;}else if(translate>=slidesGrid[i]&&translate<slidesGrid[i+1]){activeIndex=i+1;}}else if(translate>=slidesGrid[i]){activeIndex=i;}}// Normalize slideIndex
if(params.normalizeSlideIndex){if(activeIndex<0||typeof activeIndex==='undefined')activeIndex=0;}}if(snapGrid.indexOf(translate)>=0){snapIndex=snapGrid.indexOf(translate);}else{snapIndex=Math.floor(activeIndex/params.slidesPerGroup);}if(snapIndex>=snapGrid.length)snapIndex=snapGrid.length-1;if(activeIndex===previousIndex){if(snapIndex!==previousSnapIndex){swiper.snapIndex=snapIndex;swiper.emit('snapIndexChange');}return;}// Get real index
var realIndex=parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index')||activeIndex,10);Utils.extend(swiper,{snapIndex:snapIndex,realIndex:realIndex,previousIndex:previousIndex,activeIndex:activeIndex});swiper.emit('activeIndexChange');swiper.emit('snapIndexChange');if(previousRealIndex!==realIndex){swiper.emit('realIndexChange');}swiper.emit('slideChange');};var updateClickedSlide=function updateClickedSlide(e){var swiper=this;var params=swiper.params;var slide=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).closest('.'+params.slideClass)[0];var slideFound=false;if(slide){for(var i=0;i<swiper.slides.length;i+=1){if(swiper.slides[i]===slide)slideFound=true;}}if(slide&&slideFound){swiper.clickedSlide=slide;if(swiper.virtual&&swiper.params.virtual.enabled){swiper.clickedIndex=parseInt(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slide).attr('data-swiper-slide-index'),10);}else{swiper.clickedIndex=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slide).index();}}else{swiper.clickedSlide=undefined;swiper.clickedIndex=undefined;return;}if(params.slideToClickedSlide&&swiper.clickedIndex!==undefined&&swiper.clickedIndex!==swiper.activeIndex){swiper.slideToClickedSlide();}};var update={updateSize:updateSize,updateSlides:updateSlides,updateAutoHeight:updateAutoHeight,updateSlidesOffset:updateSlidesOffset,updateSlidesProgress:updateSlidesProgress,updateProgress:updateProgress,updateSlidesClasses:updateSlidesClasses,updateActiveIndex:updateActiveIndex,updateClickedSlide:updateClickedSlide};var getTranslate=function getTranslate(){var axis=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.isHorizontal()?'x':'y';var swiper=this;var params=swiper.params,rtl=swiper.rtl,translate=swiper.translate,$wrapperEl=swiper.$wrapperEl;if(params.virtualTranslate){return rtl?-translate:translate;}var currentTranslate=Utils.getTranslate($wrapperEl[0],axis);if(rtl)currentTranslate=-currentTranslate;return currentTranslate||0;};var setTranslate=function setTranslate(translate,byController){var swiper=this;var rtl=swiper.rtl,params=swiper.params,$wrapperEl=swiper.$wrapperEl,progress=swiper.progress;var x=0;var y=0;var z=0;if(swiper.isHorizontal()){x=rtl?-translate:translate;}else{y=translate;}if(params.roundLengths){x=Math.floor(x);y=Math.floor(y);}if(!params.virtualTranslate){if(Support.transforms3d)$wrapperEl.transform('translate3d('+x+'px, '+y+'px, '+z+'px)');else $wrapperEl.transform('translate('+x+'px, '+y+'px)');}swiper.translate=swiper.isHorizontal()?x:y;// Check if we need to update progress
var newProgress=void 0;var translatesDiff=swiper.maxTranslate()-swiper.minTranslate();if(translatesDiff===0){newProgress=0;}else{newProgress=(translate-swiper.minTranslate())/translatesDiff;}if(newProgress!==progress){swiper.updateProgress(translate);}swiper.emit('setTranslate',swiper.translate,byController);};var minTranslate=function minTranslate(){return-this.snapGrid[0];};var maxTranslate=function maxTranslate(){return-this.snapGrid[this.snapGrid.length-1];};var translate={getTranslate:getTranslate,setTranslate:setTranslate,minTranslate:minTranslate,maxTranslate:maxTranslate};var setTransition=function setTransition(duration,byController){var swiper=this;swiper.$wrapperEl.transition(duration);swiper.emit('setTransition',duration,byController);};var transitionStart=function transitionStart(){var runCallbacks=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var swiper=this;var activeIndex=swiper.activeIndex,params=swiper.params,previousIndex=swiper.previousIndex;if(params.autoHeight){swiper.updateAutoHeight();}swiper.emit('transitionStart');if(!runCallbacks)return;if(activeIndex!==previousIndex){swiper.emit('slideChangeTransitionStart');if(activeIndex>previousIndex){swiper.emit('slideNextTransitionStart');}else{swiper.emit('slidePrevTransitionStart');}}};var transitionEnd$1=function transitionEnd$1(){var runCallbacks=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var swiper=this;var activeIndex=swiper.activeIndex,previousIndex=swiper.previousIndex;swiper.animating=false;swiper.setTransition(0);swiper.emit('transitionEnd');if(runCallbacks){if(activeIndex!==previousIndex){swiper.emit('slideChangeTransitionEnd');if(activeIndex>previousIndex){swiper.emit('slideNextTransitionEnd');}else{swiper.emit('slidePrevTransitionEnd');}}}};var transition$1={setTransition:setTransition,transitionStart:transitionStart,transitionEnd:transitionEnd$1};var Browser=function Browser(){function isIE9(){// create temporary DIV
var div=doc.createElement('div');// add content to tmp DIV which is wrapped into the IE HTML conditional statement
div.innerHTML='<!--[if lte IE 9]><i></i><![endif]-->';// return true / false value based on what will browser render
return div.getElementsByTagName('i').length===1;}function isSafari(){var ua=win.navigator.userAgent.toLowerCase();return ua.indexOf('safari')>=0&&ua.indexOf('chrome')<0&&ua.indexOf('android')<0;}return{isSafari:isSafari(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),ie:win.navigator.pointerEnabled||win.navigator.msPointerEnabled,ieTouch:win.navigator.msPointerEnabled&&win.navigator.msMaxTouchPoints>1||win.navigator.pointerEnabled&&win.navigator.maxTouchPoints>1,lteIE9:isIE9()};}();var slideTo=function slideTo(){var index$$1=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var speed=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.params.speed;var runCallbacks=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var internal=arguments[3];var swiper=this;var slideIndex=index$$1;if(slideIndex<0)slideIndex=0;var params=swiper.params,snapGrid=swiper.snapGrid,slidesGrid=swiper.slidesGrid,previousIndex=swiper.previousIndex,activeIndex=swiper.activeIndex,rtl=swiper.rtl,$wrapperEl=swiper.$wrapperEl;var snapIndex=Math.floor(slideIndex/params.slidesPerGroup);if(snapIndex>=snapGrid.length)snapIndex=snapGrid.length-1;if((activeIndex||params.initialSlide||0)===(previousIndex||0)&&runCallbacks){swiper.emit('beforeSlideChangeStart');}var translate=-snapGrid[snapIndex];// Update progress
swiper.updateProgress(translate);// Normalize slideIndex
if(params.normalizeSlideIndex){for(var i=0;i<slidesGrid.length;i+=1){if(-Math.floor(translate*100)>=Math.floor(slidesGrid[i]*100)){slideIndex=i;}}}// Directions locks
if(!swiper.allowSlideNext&&translate<swiper.translate&&translate<swiper.minTranslate()){return false;}if(!swiper.allowSlidePrev&&translate>swiper.translate&&translate>swiper.maxTranslate()){if((activeIndex||0)!==slideIndex)return false;}// Update Index
if(rtl&&-translate===swiper.translate||!rtl&&translate===swiper.translate){swiper.updateActiveIndex(slideIndex);// Update Height
if(params.autoHeight){swiper.updateAutoHeight();}swiper.updateSlidesClasses();if(params.effect!=='slide'){swiper.setTranslate(translate);}return false;}if(speed===0||Browser.lteIE9){swiper.setTransition(0);swiper.setTranslate(translate);swiper.updateActiveIndex(slideIndex);swiper.updateSlidesClasses();swiper.emit('beforeTransitionStart',speed,internal);swiper.transitionStart(runCallbacks);swiper.transitionEnd(runCallbacks);}else{swiper.setTransition(speed);swiper.setTranslate(translate);swiper.updateActiveIndex(slideIndex);swiper.updateSlidesClasses();swiper.emit('beforeTransitionStart',speed,internal);swiper.transitionStart(runCallbacks);if(!swiper.animating){swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed)return;swiper.transitionEnd(runCallbacks);});}}return true;};/* eslint no-unused-vars: "off" */var slideNext=function slideNext(){var speed=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.params.speed;var runCallbacks=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var internal=arguments[2];var swiper=this;var params=swiper.params,animating=swiper.animating;if(params.loop){if(animating)return false;swiper.loopFix();// eslint-disable-next-line
swiper._clientLeft=swiper.$wrapperEl[0].clientLeft;return swiper.slideTo(swiper.activeIndex+params.slidesPerGroup,speed,runCallbacks,internal);}return swiper.slideTo(swiper.activeIndex+params.slidesPerGroup,speed,runCallbacks,internal);};/* eslint no-unused-vars: "off" */var slidePrev=function slidePrev(){var speed=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.params.speed;var runCallbacks=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var internal=arguments[2];var swiper=this;var params=swiper.params,animating=swiper.animating;if(params.loop){if(animating)return false;swiper.loopFix();// eslint-disable-next-line
swiper._clientLeft=swiper.$wrapperEl[0].clientLeft;return swiper.slideTo(swiper.activeIndex-1,speed,runCallbacks,internal);}return swiper.slideTo(swiper.activeIndex-1,speed,runCallbacks,internal);};/* eslint no-unused-vars: "off" */var slideReset=function slideReset(){var speed=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.params.speed;var runCallbacks=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var internal=arguments[2];var swiper=this;return swiper.slideTo(swiper.activeIndex,speed,runCallbacks,internal);};var slideToClickedSlide=function slideToClickedSlide(){var swiper=this;var params=swiper.params,$wrapperEl=swiper.$wrapperEl;var slidesPerView=params.slidesPerView==='auto'?swiper.slidesPerViewDynamic():params.slidesPerView;var slideToIndex=swiper.clickedIndex;var realIndex=void 0;if(params.loop){if(swiper.animating)return;realIndex=parseInt(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.clickedSlide).attr('data-swiper-slide-index'),10);if(params.centeredSlides){if(slideToIndex<swiper.loopedSlides-slidesPerView/2||slideToIndex>swiper.slides.length-swiper.loopedSlides+slidesPerView/2){swiper.loopFix();slideToIndex=$wrapperEl.children('.'+params.slideClass+'[data-swiper-slide-index="'+realIndex+'"]:not(.'+params.slideDuplicateClass+')').eq(0).index();Utils.nextTick(function(){swiper.slideTo(slideToIndex);});}else{swiper.slideTo(slideToIndex);}}else if(slideToIndex>swiper.slides.length-slidesPerView){swiper.loopFix();slideToIndex=$wrapperEl.children('.'+params.slideClass+'[data-swiper-slide-index="'+realIndex+'"]:not(.'+params.slideDuplicateClass+')').eq(0).index();Utils.nextTick(function(){swiper.slideTo(slideToIndex);});}else{swiper.slideTo(slideToIndex);}}else{swiper.slideTo(slideToIndex);}};var slide={slideTo:slideTo,slideNext:slideNext,slidePrev:slidePrev,slideReset:slideReset,slideToClickedSlide:slideToClickedSlide};var loopCreate=function loopCreate(){var swiper=this;var params=swiper.params,$wrapperEl=swiper.$wrapperEl;// Remove duplicated slides
$wrapperEl.children('.'+params.slideClass+'.'+params.slideDuplicateClass).remove();var slides=$wrapperEl.children('.'+params.slideClass);if(params.loopFillGroupWithBlank){var blankSlidesNum=params.slidesPerGroup-slides.length%params.slidesPerGroup;if(blankSlidesNum!==params.slidesPerGroup){for(var i=0;i<blankSlidesNum;i+=1){var blankNode=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(doc.createElement('div')).addClass(params.slideClass+' '+params.slideBlankClass);$wrapperEl.append(blankNode);}slides=$wrapperEl.children('.'+params.slideClass);}}if(params.slidesPerView==='auto'&&!params.loopedSlides)params.loopedSlides=slides.length;swiper.loopedSlides=parseInt(params.loopedSlides||params.slidesPerView,10);swiper.loopedSlides+=params.loopAdditionalSlides;if(swiper.loopedSlides>slides.length){swiper.loopedSlides=slides.length;}var prependSlides=[];var appendSlides=[];slides.each(function(index$$1,el){var slide=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(el);if(index$$1<swiper.loopedSlides)appendSlides.push(el);if(index$$1<slides.length&&index$$1>=slides.length-swiper.loopedSlides)prependSlides.push(el);slide.attr('data-swiper-slide-index',index$$1);});for(var _i3=0;_i3<appendSlides.length;_i3+=1){$wrapperEl.append(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(appendSlides[_i3].cloneNode(true)).addClass(params.slideDuplicateClass));}for(var _i4=prependSlides.length-1;_i4>=0;_i4-=1){$wrapperEl.prepend(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(prependSlides[_i4].cloneNode(true)).addClass(params.slideDuplicateClass));}};var loopFix=function loopFix(){var swiper=this;var params=swiper.params,activeIndex=swiper.activeIndex,slides=swiper.slides,loopedSlides=swiper.loopedSlides,allowSlidePrev=swiper.allowSlidePrev,allowSlideNext=swiper.allowSlideNext;var newIndex=void 0;swiper.allowSlidePrev=true;swiper.allowSlideNext=true;// Fix For Negative Oversliding
if(activeIndex<loopedSlides){newIndex=slides.length-loopedSlides*3+activeIndex;newIndex+=loopedSlides;swiper.slideTo(newIndex,0,false,true);}else if(params.slidesPerView==='auto'&&activeIndex>=loopedSlides*2||activeIndex>slides.length-params.slidesPerView*2){// Fix For Positive Oversliding
newIndex=-slides.length+activeIndex+loopedSlides;newIndex+=loopedSlides;swiper.slideTo(newIndex,0,false,true);}swiper.allowSlidePrev=allowSlidePrev;swiper.allowSlideNext=allowSlideNext;};var loopDestroy=function loopDestroy(){var swiper=this;var $wrapperEl=swiper.$wrapperEl,params=swiper.params,slides=swiper.slides;$wrapperEl.children('.'+params.slideClass+'.'+params.slideDuplicateClass).remove();slides.removeAttr('data-swiper-slide-index');};var loop={loopCreate:loopCreate,loopFix:loopFix,loopDestroy:loopDestroy};var setGrabCursor=function setGrabCursor(moving){var swiper=this;if(Support.touch||!swiper.params.simulateTouch)return;var el=swiper.el;el.style.cursor='move';el.style.cursor=moving?'-webkit-grabbing':'-webkit-grab';el.style.cursor=moving?'-moz-grabbin':'-moz-grab';el.style.cursor=moving?'grabbing':'grab';};var unsetGrabCursor=function unsetGrabCursor(){var swiper=this;if(Support.touch)return;swiper.el.style.cursor='';};var grabCursor={setGrabCursor:setGrabCursor,unsetGrabCursor:unsetGrabCursor};var appendSlide=function appendSlide(slides){var swiper=this;var $wrapperEl=swiper.$wrapperEl,params=swiper.params;if(params.loop){swiper.loopDestroy();}if((typeof slides==='undefined'?'undefined':_typeof(slides))==='object'&&'length'in slides){for(var i=0;i<slides.length;i+=1){if(slides[i])$wrapperEl.append(slides[i]);}}else{$wrapperEl.append(slides);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}};var prependSlide=function prependSlide(slides){var swiper=this;var params=swiper.params,$wrapperEl=swiper.$wrapperEl,activeIndex=swiper.activeIndex;if(params.loop){swiper.loopDestroy();}var newActiveIndex=activeIndex+1;if((typeof slides==='undefined'?'undefined':_typeof(slides))==='object'&&'length'in slides){for(var i=0;i<slides.length;i+=1){if(slides[i])$wrapperEl.prepend(slides[i]);}newActiveIndex=activeIndex+slides.length;}else{$wrapperEl.prepend(slides);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}swiper.slideTo(newActiveIndex,0,false);};var removeSlide=function removeSlide(slidesIndexes){var swiper=this;var params=swiper.params,$wrapperEl=swiper.$wrapperEl,activeIndex=swiper.activeIndex;if(params.loop){swiper.loopDestroy();swiper.slides=$wrapperEl.children('.'+params.slideClass);}var newActiveIndex=activeIndex;var indexToRemove=void 0;if((typeof slidesIndexes==='undefined'?'undefined':_typeof(slidesIndexes))==='object'&&'length'in slidesIndexes){for(var i=0;i<slidesIndexes.length;i+=1){indexToRemove=slidesIndexes[i];if(swiper.slides[indexToRemove])swiper.slides.eq(indexToRemove).remove();if(indexToRemove<newActiveIndex)newActiveIndex-=1;}newActiveIndex=Math.max(newActiveIndex,0);}else{indexToRemove=slidesIndexes;if(swiper.slides[indexToRemove])swiper.slides.eq(indexToRemove).remove();if(indexToRemove<newActiveIndex)newActiveIndex-=1;newActiveIndex=Math.max(newActiveIndex,0);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}if(params.loop){swiper.slideTo(newActiveIndex+swiper.loopedSlides,0,false);}else{swiper.slideTo(newActiveIndex,0,false);}};var removeAllSlides=function removeAllSlides(){var swiper=this;var slidesIndexes=[];for(var i=0;i<swiper.slides.length;i+=1){slidesIndexes.push(i);}swiper.removeSlide(slidesIndexes);};var manipulation={appendSlide:appendSlide,prependSlide:prependSlide,removeSlide:removeSlide,removeAllSlides:removeAllSlides};var Device=function Device(){var ua=win.navigator.userAgent;var device={ios:false,android:false,androidChrome:false,desktop:false,windows:false,iphone:false,ipod:false,ipad:false,cordova:win.cordova||win.phonegap,phonegap:win.cordova||win.phonegap};var windows=ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);// eslint-disable-line
var android=ua.match(/(Android);?[\s\/]+([\d.]+)?/);// eslint-disable-line
var ipad=ua.match(/(iPad).*OS\s([\d_]+)/);var ipod=ua.match(/(iPod)(.*OS\s([\d_]+))?/);var iphone=!ipad&&ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);// Windows
if(windows){device.os='windows';device.osVersion=windows[2];device.windows=true;}// Android
if(android&&!windows){device.os='android';device.osVersion=android[2];device.android=true;device.androidChrome=ua.toLowerCase().indexOf('chrome')>=0;}if(ipad||iphone||ipod){device.os='ios';device.ios=true;}// iOS
if(iphone&&!ipod){device.osVersion=iphone[2].replace(/_/g,'.');device.iphone=true;}if(ipad){device.osVersion=ipad[2].replace(/_/g,'.');device.ipad=true;}if(ipod){device.osVersion=ipod[3]?ipod[3].replace(/_/g,'.'):null;device.iphone=true;}// iOS 8+ changed UA
if(device.ios&&device.osVersion&&ua.indexOf('Version/')>=0){if(device.osVersion.split('.')[0]==='10'){device.osVersion=ua.toLowerCase().split('version/')[1].split(' ')[0];}}// Desktop
device.desktop=!(device.os||device.android||device.webView);// Webview
device.webView=(iphone||ipad||ipod)&&ua.match(/.*AppleWebKit(?!.*Safari)/i);// Minimal UI
if(device.os&&device.os==='ios'){var osVersionArr=device.osVersion.split('.');var metaViewport=doc.querySelector('meta[name="viewport"]');device.minimalUi=!device.webView&&(ipod||iphone)&&(osVersionArr[0]*1===7?osVersionArr[1]*1>=1:osVersionArr[0]*1>7)&&metaViewport&&metaViewport.getAttribute('content').indexOf('minimal-ui')>=0;}// Pixel Ratio
device.pixelRatio=win.devicePixelRatio||1;// Export object
return device;}();var onTouchStart=function onTouchStart(event){var swiper=this;var data$$1=swiper.touchEventsData;var params=swiper.params,touches=swiper.touches;var e=event;if(e.originalEvent)e=e.originalEvent;data$$1.isTouchEvent=e.type==='touchstart';if(!data$$1.isTouchEvent&&'which'in e&&e.which===3)return;if(data$$1.isTouched&&data$$1.isMoved)return;if(params.noSwiping&&Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).closest('.'+params.noSwipingClass)[0]){swiper.allowClick=true;return;}if(params.swipeHandler){if(!Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e).closest(params.swipeHandler)[0])return;}touches.currentX=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;touches.currentY=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;var startX=touches.currentX;var startY=touches.currentY;// Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
if(Device.ios&&!Device.cordova&&params.iOSEdgeSwipeDetection&&startX<=params.iOSEdgeSwipeThreshold&&startX>=window.screen.width-params.iOSEdgeSwipeThreshold){return;}Utils.extend(data$$1,{isTouched:true,isMoved:false,allowTouchCallbacks:true,isScrolling:undefined,startMoving:undefined});touches.startX=startX;touches.startY=startY;data$$1.touchStartTime=Utils.now();swiper.allowClick=true;swiper.updateSize();swiper.swipeDirection=undefined;if(params.threshold>0)data$$1.allowThresholdMove=false;if(e.type!=='touchstart'){var preventDefault=true;if(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).is(data$$1.formElements))preventDefault=false;if(doc.activeElement&&Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(doc.activeElement).is(data$$1.formElements)){doc.activeElement.blur();}if(preventDefault&&swiper.allowTouchMove){e.preventDefault();}}swiper.emit('touchStart',e);};var onTouchMove=function onTouchMove(event){var swiper=this;var data$$1=swiper.touchEventsData;var params=swiper.params,touches=swiper.touches,rtl=swiper.rtl;var e=event;if(e.originalEvent)e=e.originalEvent;if(data$$1.isTouchEvent&&e.type==='mousemove')return;var pageX=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;var pageY=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(e.preventedByNestedSwiper){touches.startX=pageX;touches.startY=pageY;return;}if(!swiper.allowTouchMove){// isMoved = true;
swiper.allowClick=false;if(data$$1.isTouched){Utils.extend(touches,{startX:pageX,startY:pageY,currentX:pageX,currentY:pageY});data$$1.touchStartTime=Utils.now();}return;}if(data$$1.isTouchEvent&&params.touchReleaseOnEdges&&!params.loop){if(swiper.isVertical()){// Vertical
if(pageY<touches.startY&&swiper.translate<=swiper.maxTranslate()||pageY>touches.startY&&swiper.translate>=swiper.minTranslate()){data$$1.isTouched=false;data$$1.isMoved=false;return;}}else if(pageX<touches.startX&&swiper.translate<=swiper.maxTranslate()||pageX>touches.startX&&swiper.translate>=swiper.minTranslate()){return;}}if(data$$1.isTouchEvent&&doc.activeElement){if(e.target===doc.activeElement&&Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).is(data$$1.formElements)){data$$1.isMoved=true;swiper.allowClick=false;return;}}if(data$$1.allowTouchCallbacks){swiper.emit('touchMove',e);}if(e.targetTouches&&e.targetTouches.length>1)return;touches.currentX=pageX;touches.currentY=pageY;var diffX=touches.currentX-touches.startX;var diffY=touches.currentY-touches.startY;if(typeof data$$1.isScrolling==='undefined'){var touchAngle=void 0;if(swiper.isHorizontal()&&touches.currentY===touches.startY||swiper.isVertical()&&touches.currentX===touches.startX){data$$1.isScrolling=false;}else{// eslint-disable-next-line
if(diffX*diffX+diffY*diffY>=25){touchAngle=Math.atan2(Math.abs(diffY),Math.abs(diffX))*180/Math.PI;data$$1.isScrolling=swiper.isHorizontal()?touchAngle>params.touchAngle:90-touchAngle>params.touchAngle;}}}if(data$$1.isScrolling){swiper.emit('touchMoveOpposite',e);}if(typeof startMoving==='undefined'){if(touches.currentX!==touches.startX||touches.currentY!==touches.startY){data$$1.startMoving=true;}}if(!data$$1.isTouched)return;if(data$$1.isScrolling){data$$1.isTouched=false;return;}if(!data$$1.startMoving){return;}swiper.allowClick=false;e.preventDefault();if(params.touchMoveStopPropagation&&!params.nested){e.stopPropagation();}if(!data$$1.isMoved){if(params.loop){swiper.loopFix();}data$$1.startTranslate=swiper.getTranslate();swiper.setTransition(0);if(swiper.animating){swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');}data$$1.allowMomentumBounce=false;// Grab Cursor
if(params.grabCursor&&(swiper.allowSlideNext===true||swiper.allowSlidePrev===true)){swiper.setGrabCursor(true);}swiper.emit('sliderFirstMove',e);}swiper.emit('sliderMove',e);data$$1.isMoved=true;var diff=swiper.isHorizontal()?diffX:diffY;touches.diff=diff;diff*=params.touchRatio;if(rtl)diff=-diff;swiper.swipeDirection=diff>0?'prev':'next';data$$1.currentTranslate=diff+data$$1.startTranslate;var disableParentSwiper=true;var resistanceRatio=params.resistanceRatio;if(params.touchReleaseOnEdges){resistanceRatio=0;}if(diff>0&&data$$1.currentTranslate>swiper.minTranslate()){disableParentSwiper=false;if(params.resistance)data$$1.currentTranslate=swiper.minTranslate()-1+Math.pow(-swiper.minTranslate()+data$$1.startTranslate+diff,resistanceRatio);}else if(diff<0&&data$$1.currentTranslate<swiper.maxTranslate()){disableParentSwiper=false;if(params.resistance)data$$1.currentTranslate=swiper.maxTranslate()+1-Math.pow(swiper.maxTranslate()-data$$1.startTranslate-diff,resistanceRatio);}if(disableParentSwiper){e.preventedByNestedSwiper=true;}// Directions locks
if(!swiper.allowSlideNext&&swiper.swipeDirection==='next'&&data$$1.currentTranslate<data$$1.startTranslate){data$$1.currentTranslate=data$$1.startTranslate;}if(!swiper.allowSlidePrev&&swiper.swipeDirection==='prev'&&data$$1.currentTranslate>data$$1.startTranslate){data$$1.currentTranslate=data$$1.startTranslate;}// Threshold
if(params.threshold>0){if(Math.abs(diff)>params.threshold||data$$1.allowThresholdMove){if(!data$$1.allowThresholdMove){data$$1.allowThresholdMove=true;touches.startX=touches.currentX;touches.startY=touches.currentY;data$$1.currentTranslate=data$$1.startTranslate;touches.diff=swiper.isHorizontal()?touches.currentX-touches.startX:touches.currentY-touches.startY;return;}}else{data$$1.currentTranslate=data$$1.startTranslate;return;}}if(!params.followFinger)return;// Update active index in free mode
if(params.freeMode||params.watchSlidesProgress||params.watchSlidesVisibility){swiper.updateActiveIndex();swiper.updateSlidesClasses();}if(params.freeMode){// Velocity
if(data$$1.velocities.length===0){data$$1.velocities.push({position:touches[swiper.isHorizontal()?'startX':'startY'],time:data$$1.touchStartTime});}data$$1.velocities.push({position:touches[swiper.isHorizontal()?'currentX':'currentY'],time:Utils.now()});}// Update progress
swiper.updateProgress(data$$1.currentTranslate);// Update translate
swiper.setTranslate(data$$1.currentTranslate);};var onTouchEnd=function onTouchEnd(event){var swiper=this;var data$$1=swiper.touchEventsData;var params=swiper.params,touches=swiper.touches,rtl=swiper.rtl,$wrapperEl=swiper.$wrapperEl,slidesGrid=swiper.slidesGrid,snapGrid=swiper.snapGrid;var e=event;if(e.originalEvent)e=e.originalEvent;if(data$$1.allowTouchCallbacks){swiper.emit('touchEnd',e);}data$$1.allowTouchCallbacks=false;if(!data$$1.isTouched)return;// Return Grab Cursor
if(params.grabCursor&&data$$1.isMoved&&data$$1.isTouched&&(swiper.allowSlideNext===true||swiper.allowSlidePrev===true)){swiper.setGrabCursor(false);}// Time diff
var touchEndTime=Utils.now();var timeDiff=touchEndTime-data$$1.touchStartTime;// Tap, doubleTap, Click
if(swiper.allowClick){swiper.updateClickedSlide(e);swiper.emit('tap',e);if(timeDiff<300&&touchEndTime-data$$1.lastClickTime>300){if(data$$1.clickTimeout)clearTimeout(data$$1.clickTimeout);data$$1.clickTimeout=Utils.nextTick(function(){if(!swiper||swiper.destroyed)return;swiper.emit('click',e);},300);}if(timeDiff<300&&touchEndTime-data$$1.lastClickTime<300){if(data$$1.clickTimeout)clearTimeout(data$$1.clickTimeout);swiper.emit('doubleTap',e);}}data$$1.lastClickTime=Utils.now();Utils.nextTick(function(){if(!swiper.destroyed)swiper.allowClick=true;});if(!data$$1.isTouched||!data$$1.isMoved||!swiper.swipeDirection||touches.diff===0||data$$1.currentTranslate===data$$1.startTranslate){data$$1.isTouched=false;data$$1.isMoved=false;return;}data$$1.isTouched=false;data$$1.isMoved=false;var currentPos=void 0;if(params.followFinger){currentPos=rtl?swiper.translate:-swiper.translate;}else{currentPos=-data$$1.currentTranslate;}if(params.freeMode){if(currentPos<-swiper.minTranslate()){swiper.slideTo(swiper.activeIndex);return;}else if(currentPos>-swiper.maxTranslate()){if(swiper.slides.length<snapGrid.length){swiper.slideTo(snapGrid.length-1);}else{swiper.slideTo(swiper.slides.length-1);}return;}if(params.freeModeMomentum){if(data$$1.velocities.length>1){var lastMoveEvent=data$$1.velocities.pop();var velocityEvent=data$$1.velocities.pop();var distance=lastMoveEvent.position-velocityEvent.position;var time=lastMoveEvent.time-velocityEvent.time;swiper.velocity=distance/time;swiper.velocity/=2;if(Math.abs(swiper.velocity)<params.freeModeMinimumVelocity){swiper.velocity=0;}// this implies that the user stopped moving a finger then released.
// There would be no events with distance zero, so the last event is stale.
if(time>150||Utils.now()-lastMoveEvent.time>300){swiper.velocity=0;}}else{swiper.velocity=0;}swiper.velocity*=params.freeModeMomentumVelocityRatio;data$$1.velocities.length=0;var momentumDuration=1000*params.freeModeMomentumRatio;var momentumDistance=swiper.velocity*momentumDuration;var newPosition=swiper.translate+momentumDistance;if(rtl)newPosition=-newPosition;var doBounce=false;var afterBouncePosition=void 0;var bounceAmount=Math.abs(swiper.velocity)*20*params.freeModeMomentumBounceRatio;if(newPosition<swiper.maxTranslate()){if(params.freeModeMomentumBounce){if(newPosition+swiper.maxTranslate()<-bounceAmount){newPosition=swiper.maxTranslate()-bounceAmount;}afterBouncePosition=swiper.maxTranslate();doBounce=true;data$$1.allowMomentumBounce=true;}else{newPosition=swiper.maxTranslate();}}else if(newPosition>swiper.minTranslate()){if(params.freeModeMomentumBounce){if(newPosition-swiper.minTranslate()>bounceAmount){newPosition=swiper.minTranslate()+bounceAmount;}afterBouncePosition=swiper.minTranslate();doBounce=true;data$$1.allowMomentumBounce=true;}else{newPosition=swiper.minTranslate();}}else if(params.freeModeSticky){var nextSlide=void 0;for(var j=0;j<snapGrid.length;j+=1){if(snapGrid[j]>-newPosition){nextSlide=j;break;}}if(Math.abs(snapGrid[nextSlide]-newPosition)<Math.abs(snapGrid[nextSlide-1]-newPosition)||swiper.swipeDirection==='next'){newPosition=snapGrid[nextSlide];}else{newPosition=snapGrid[nextSlide-1];}newPosition=-newPosition;}// Fix duration
if(swiper.velocity!==0){if(rtl){momentumDuration=Math.abs((-newPosition-swiper.translate)/swiper.velocity);}else{momentumDuration=Math.abs((newPosition-swiper.translate)/swiper.velocity);}}else if(params.freeModeSticky){swiper.slideReset();return;}if(params.freeModeMomentumBounce&&doBounce){swiper.updateProgress(afterBouncePosition);swiper.setTransition(momentumDuration);swiper.setTranslate(newPosition);swiper.transitionStart();swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed||!data$$1.allowMomentumBounce)return;swiper.emit('momentumBounce');swiper.setTransition(params.speed);swiper.setTranslate(afterBouncePosition);$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed)return;swiper.transitionEnd();});});}else if(swiper.velocity){swiper.updateProgress(newPosition);swiper.setTransition(momentumDuration);swiper.setTranslate(newPosition);swiper.transitionStart();if(!swiper.animating){swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed)return;swiper.transitionEnd();});}}else{swiper.updateProgress(newPosition);}swiper.updateActiveIndex();swiper.updateSlidesClasses();}if(!params.freeModeMomentum||timeDiff>=params.longSwipesMs){swiper.updateProgress();swiper.updateActiveIndex();swiper.updateSlidesClasses();}return;}// Find current slide
var stopIndex=0;var groupSize=swiper.slidesSizesGrid[0];for(var i=0;i<slidesGrid.length;i+=params.slidesPerGroup){if(typeof slidesGrid[i+params.slidesPerGroup]!=='undefined'){if(currentPos>=slidesGrid[i]&&currentPos<slidesGrid[i+params.slidesPerGroup]){stopIndex=i;groupSize=slidesGrid[i+params.slidesPerGroup]-slidesGrid[i];}}else if(currentPos>=slidesGrid[i]){stopIndex=i;groupSize=slidesGrid[slidesGrid.length-1]-slidesGrid[slidesGrid.length-2];}}// Find current slide size
var ratio=(currentPos-slidesGrid[stopIndex])/groupSize;if(timeDiff>params.longSwipesMs){// Long touches
if(!params.longSwipes){swiper.slideTo(swiper.activeIndex);return;}if(swiper.swipeDirection==='next'){if(ratio>=params.longSwipesRatio)swiper.slideTo(stopIndex+params.slidesPerGroup);else swiper.slideTo(stopIndex);}if(swiper.swipeDirection==='prev'){if(ratio>1-params.longSwipesRatio)swiper.slideTo(stopIndex+params.slidesPerGroup);else swiper.slideTo(stopIndex);}}else{// Short swipes
if(!params.shortSwipes){swiper.slideTo(swiper.activeIndex);return;}if(swiper.swipeDirection==='next'){swiper.slideTo(stopIndex+params.slidesPerGroup);}if(swiper.swipeDirection==='prev'){swiper.slideTo(stopIndex);}}};var onResize=function onResize(){var swiper=this;var params=swiper.params,el=swiper.el;if(el&&el.offsetWidth===0)return;// Breakpoints
if(params.breakpoints){swiper.setBreakpoint();}// Save locks
var allowSlideNext=swiper.allowSlideNext,allowSlidePrev=swiper.allowSlidePrev;// Disable locks on resize
swiper.allowSlideNext=true;swiper.allowSlidePrev=true;swiper.updateSize();swiper.updateSlides();if(params.freeMode){var newTranslate=Math.min(Math.max(swiper.translate,swiper.maxTranslate()),swiper.minTranslate());swiper.setTranslate(newTranslate);swiper.updateActiveIndex();swiper.updateSlidesClasses();if(params.autoHeight){swiper.updateAutoHeight();}}else{swiper.updateSlidesClasses();if((params.slidesPerView==='auto'||params.slidesPerView>1)&&swiper.isEnd&&!swiper.params.centeredSlides){swiper.slideTo(swiper.slides.length-1,0,false,true);}else{swiper.slideTo(swiper.activeIndex,0,false,true);}}// Return locks after resize
swiper.allowSlidePrev=allowSlidePrev;swiper.allowSlideNext=allowSlideNext;};var onClick=function onClick(e){var swiper=this;if(!swiper.allowClick){if(swiper.params.preventClicks)e.preventDefault();if(swiper.params.preventClicksPropagation&&swiper.animating){e.stopPropagation();e.stopImmediatePropagation();}}};function attachEvents(){var swiper=this;var params=swiper.params,touchEvents=swiper.touchEvents,el=swiper.el,wrapperEl=swiper.wrapperEl;{swiper.onTouchStart=onTouchStart.bind(swiper);swiper.onTouchMove=onTouchMove.bind(swiper);swiper.onTouchEnd=onTouchEnd.bind(swiper);}swiper.onClick=onClick.bind(swiper);var target=params.touchEventsTarget==='container'?el:wrapperEl;var capture=!!params.nested;// Touch Events
{if(Browser.ie){target.addEventListener(touchEvents.start,swiper.onTouchStart,false);(Support.touch?target:doc).addEventListener(touchEvents.move,swiper.onTouchMove,capture);(Support.touch?target:doc).addEventListener(touchEvents.end,swiper.onTouchEnd,false);}else{if(Support.touch){var passiveListener=touchEvents.start==='touchstart'&&Support.passiveListener&&params.passiveListeners?{passive:true,capture:false}:false;target.addEventListener(touchEvents.start,swiper.onTouchStart,passiveListener);target.addEventListener(touchEvents.move,swiper.onTouchMove,Support.passiveListener?{passive:false,capture:capture}:capture);target.addEventListener(touchEvents.end,swiper.onTouchEnd,passiveListener);}if(params.simulateTouch&&!Device.ios&&!Device.android||params.simulateTouch&&!Support.touch&&Device.ios){target.addEventListener('mousedown',swiper.onTouchStart,false);doc.addEventListener('mousemove',swiper.onTouchMove,capture);doc.addEventListener('mouseup',swiper.onTouchEnd,false);}}// Prevent Links Clicks
if(params.preventClicks||params.preventClicksPropagation){target.addEventListener('click',swiper.onClick,true);}}// Resize handler
swiper.on('resize observerUpdate',onResize);}function detachEvents(){var swiper=this;var params=swiper.params,touchEvents=swiper.touchEvents,el=swiper.el,wrapperEl=swiper.wrapperEl;var target=params.touchEventsTarget==='container'?el:wrapperEl;var capture=!!params.nested;// Touch Events
{if(Browser.ie){target.removeEventListener(touchEvents.start,swiper.onTouchStart,false);(Support.touch?target:doc).removeEventListener(touchEvents.move,swiper.onTouchMove,capture);(Support.touch?target:doc).removeEventListener(touchEvents.end,swiper.onTouchEnd,false);}else{if(Support.touch){var passiveListener=touchEvents.start==='onTouchStart'&&Support.passiveListener&&params.passiveListeners?{passive:true,capture:false}:false;target.removeEventListener(touchEvents.start,swiper.onTouchStart,passiveListener);target.removeEventListener(touchEvents.move,swiper.onTouchMove,capture);target.removeEventListener(touchEvents.end,swiper.onTouchEnd,passiveListener);}if(params.simulateTouch&&!Device.ios&&!Device.android||params.simulateTouch&&!Support.touch&&Device.ios){target.removeEventListener('mousedown',swiper.onTouchStart,false);doc.removeEventListener('mousemove',swiper.onTouchMove,capture);doc.removeEventListener('mouseup',swiper.onTouchEnd,false);}}// Prevent Links Clicks
if(params.preventClicks||params.preventClicksPropagation){target.removeEventListener('click',swiper.onClick,true);}}// Resize handler
swiper.off('resize observerUpdate',onResize);}var events={attachEvents:attachEvents,detachEvents:detachEvents};var setBreakpoint=function setBreakpoint(){var swiper=this;var activeIndex=swiper.activeIndex,_swiper$loopedSlides=swiper.loopedSlides,loopedSlides=_swiper$loopedSlides===undefined?0:_swiper$loopedSlides,params=swiper.params;var breakpoints=params.breakpoints;if(!breakpoints||breakpoints&&Object.keys(breakpoints).length===0)return;// Set breakpoint for window width and update parameters
var breakpoint=swiper.getBreakpoint(breakpoints);if(breakpoint&&swiper.currentBreakpoint!==breakpoint){var breakPointsParams=breakpoint in breakpoints?breakpoints[breakpoint]:swiper.originalParams;var needsReLoop=params.loop&&breakPointsParams.slidesPerView!==params.slidesPerView;Utils.extend(swiper.params,breakPointsParams);Utils.extend(swiper,{allowTouchMove:swiper.params.allowTouchMove,allowSlideNext:swiper.params.allowSlideNext,allowSlidePrev:swiper.params.allowSlidePrev});swiper.currentBreakpoint=breakpoint;if(needsReLoop){swiper.loopDestroy();swiper.loopCreate();swiper.updateSlides();swiper.slideTo(activeIndex-loopedSlides+swiper.loopedSlides,0,false);}swiper.emit('breakpoint',breakPointsParams);}};var getBreakpoint=function getBreakpoint(breakpoints){// Get breakpoint for window width
if(!breakpoints)return undefined;var breakpoint=false;var points=[];Object.keys(breakpoints).forEach(function(point){points.push(point);});points.sort(function(a,b){return parseInt(a,10)-parseInt(b,10);});for(var i=0;i<points.length;i+=1){var point=points[i];if(point>=win.innerWidth&&!breakpoint){breakpoint=point;}}return breakpoint||'max';};var breakpoints={setBreakpoint:setBreakpoint,getBreakpoint:getBreakpoint};var addClasses=function addClasses(){var swiper=this;var classNames=swiper.classNames,params=swiper.params,rtl=swiper.rtl,$el=swiper.$el;var suffixes=[];suffixes.push(params.direction);if(params.freeMode){suffixes.push('free-mode');}if(!Support.flexbox){suffixes.push('no-flexbox');}if(params.autoHeight){suffixes.push('autoheight');}if(rtl){suffixes.push('rtl');}if(params.slidesPerColumn>1){suffixes.push('multirow');}if(Device.android){suffixes.push('android');}if(Device.ios){suffixes.push('ios');}// WP8 Touch Events Fix
if(win.navigator.pointerEnabled||win.navigator.msPointerEnabled){suffixes.push('wp8-'+params.direction);}suffixes.forEach(function(suffix){classNames.push(params.containerModifierClass+suffix);});$el.addClass(classNames.join(' '));};var removeClasses=function removeClasses(){var swiper=this;var $el=swiper.$el,classNames=swiper.classNames;$el.removeClass(classNames.join(' '));};var classes={addClasses:addClasses,removeClasses:removeClasses};var loadImage=function loadImage(imageEl,src,srcset,sizes,checkForComplete,callback){var image=void 0;function onReady(){if(callback)callback();}if(!imageEl.complete||!checkForComplete){if(src){image=new win.Image();image.onload=onReady;image.onerror=onReady;if(sizes){image.sizes=sizes;}if(srcset){image.srcset=srcset;}if(src){image.src=src;}}else{onReady();}}else{// image already loaded...
onReady();}};var preloadImages=function preloadImages(){var swiper=this;swiper.imagesToLoad=swiper.$el.find('img');function onReady(){if(typeof swiper==='undefined'||swiper===null||!swiper||swiper.destroyed)return;if(swiper.imagesLoaded!==undefined)swiper.imagesLoaded+=1;if(swiper.imagesLoaded===swiper.imagesToLoad.length){if(swiper.params.updateOnImagesReady)swiper.update();swiper.emit('imagesReady');}}for(var i=0;i<swiper.imagesToLoad.length;i+=1){var imageEl=swiper.imagesToLoad[i];swiper.loadImage(imageEl,imageEl.currentSrc||imageEl.getAttribute('src'),imageEl.srcset||imageEl.getAttribute('srcset'),imageEl.sizes||imageEl.getAttribute('sizes'),true,onReady);}};var images={loadImage:loadImage,preloadImages:preloadImages};var defaults={init:true,direction:'horizontal',touchEventsTarget:'container',initialSlide:0,speed:300,// To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
iOSEdgeSwipeDetection:false,iOSEdgeSwipeThreshold:20,// Free mode
freeMode:false,freeModeMomentum:true,freeModeMomentumRatio:1,freeModeMomentumBounce:true,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:false,freeModeMinimumVelocity:0.02,// Autoheight
autoHeight:false,// Set wrapper width
setWrapperSize:false,// Virtual Translate
virtualTranslate:false,// Effects
effect:'slide',// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
// Breakpoints
breakpoints:undefined,// Slides grid
spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:'column',slidesPerGroup:1,centeredSlides:false,slidesOffsetBefore:0,// in px
slidesOffsetAfter:0,// in px
normalizeSlideIndex:true,// Round length
roundLengths:false,// Touches
touchRatio:1,touchAngle:45,simulateTouch:true,shortSwipes:true,longSwipes:true,longSwipesRatio:0.5,longSwipesMs:300,followFinger:true,allowTouchMove:true,threshold:0,touchMoveStopPropagation:true,touchReleaseOnEdges:false,// Unique Navigation Elements
uniqueNavElements:true,// Resistance
resistance:true,resistanceRatio:0.85,// Progress
watchSlidesProgress:false,watchSlidesVisibility:false,// Cursor
grabCursor:false,// Clicks
preventClicks:true,preventClicksPropagation:true,slideToClickedSlide:false,// Images
preloadImages:true,updateOnImagesReady:true,// loop
loop:false,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:false,// Swiping/no swiping
allowSlidePrev:true,allowSlideNext:true,swipeHandler:null,// '.swipe-handler',
noSwiping:true,noSwipingClass:'swiper-no-swiping',// Passive Listeners
passiveListeners:true,// NS
containerModifierClass:'swiper-container-',// NEW
slideClass:'swiper-slide',slideBlankClass:'swiper-slide-invisible-blank',slideActiveClass:'swiper-slide-active',slideDuplicateActiveClass:'swiper-slide-duplicate-active',slideVisibleClass:'swiper-slide-visible',slideDuplicateClass:'swiper-slide-duplicate',slideNextClass:'swiper-slide-next',slideDuplicateNextClass:'swiper-slide-duplicate-next',slidePrevClass:'swiper-slide-prev',slideDuplicatePrevClass:'swiper-slide-duplicate-prev',wrapperClass:'swiper-wrapper',// Callbacks
runCallbacksOnInit:true};var prototypes={update:update,translate:translate,transition:transition$1,slide:slide,loop:loop,grabCursor:grabCursor,manipulation:manipulation,events:events,breakpoints:breakpoints,classes:classes,images:images};var extendedDefaults={};var Swiper$1=function(_SwiperClass){_inherits(Swiper$1,_SwiperClass);function Swiper$1(){var _ret3;_classCallCheck(this,Swiper$1);var el=void 0;var params=void 0;for(var _len5=arguments.length,args=Array(_len5),_key5=0;_key5<_len5;_key5++){args[_key5]=arguments[_key5];}if(args.length===1&&args[0].constructor&&args[0].constructor===Object){params=args[0];}else{el=args[0];params=args[1];}if(!params)params={};params=Utils.extend({},params);if(el&&!params.el)params.el=el;var _this2=_possibleConstructorReturn(this,(Swiper$1.__proto__||Object.getPrototypeOf(Swiper$1)).call(this,params));Object.keys(prototypes).forEach(function(prototypeGroup){Object.keys(prototypes[prototypeGroup]).forEach(function(protoMethod){if(!Swiper$1.prototype[protoMethod]){Swiper$1.prototype[protoMethod]=prototypes[prototypeGroup][protoMethod];}});});// Swiper Instance
var swiper=_this2;if(typeof swiper.modules==='undefined'){swiper.modules={};}Object.keys(swiper.modules).forEach(function(moduleName){var module=swiper.modules[moduleName];if(module.params){var moduleParamName=Object.keys(module.params)[0];var moduleParams=module.params[moduleParamName];if((typeof moduleParams==='undefined'?'undefined':_typeof(moduleParams))!=='object')return;if(!(moduleParamName in params&&'enabled'in moduleParams))return;if(params[moduleParamName]===true){params[moduleParamName]={enabled:true};}if(_typeof(params[moduleParamName])==='object'&&!('enabled'in params[moduleParamName])){params[moduleParamName].enabled=true;}if(!params[moduleParamName])params[moduleParamName]={enabled:false};}});// Extend defaults with modules params
var swiperParams=Utils.extend({},defaults);swiper.useModulesParams(swiperParams);// Extend defaults with passed params
swiper.params=Utils.extend({},swiperParams,extendedDefaults,params);swiper.originalParams=Utils.extend({},swiper.params);swiper.passedParams=Utils.extend({},params);// Find el
var $el=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.params.el);el=$el[0];if(!el){var _ret;return _ret=undefined,_possibleConstructorReturn(_this2,_ret);}if($el.length>1){var _ret2;var swipers=[];$el.each(function(index$$1,containerEl){var newParams=Utils.extend({},params,{el:containerEl});swipers.push(new Swiper$1(newParams));});return _ret2=swipers,_possibleConstructorReturn(_this2,_ret2);}el.swiper=swiper;$el.data('swiper',swiper);// Find Wrapper
var $wrapperEl=$el.children('.'+swiper.params.wrapperClass);// Extend Swiper
Utils.extend(swiper,{$el:$el,el:el,$wrapperEl:$wrapperEl,wrapperEl:$wrapperEl[0],// Classes
classNames:[],// Slides
slides:Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],// isDirection
isHorizontal:function isHorizontal(){return swiper.params.direction==='horizontal';},isVertical:function isVertical(){return swiper.params.direction==='vertical';},// RTL
rtl:swiper.params.direction==='horizontal'&&(el.dir.toLowerCase()==='rtl'||$el.css('direction')==='rtl'),wrongRTL:$wrapperEl.css('display')==='-webkit-box',// Indexes
activeIndex:0,realIndex:0,//
isBeginning:true,isEnd:false,// Props
translate:0,progress:0,velocity:0,animating:false,// Locks
allowSlideNext:swiper.params.allowSlideNext,allowSlidePrev:swiper.params.allowSlidePrev,// Touch Events
touchEvents:function touchEvents(){var touch=['touchstart','touchmove','touchend'];var desktop=['mousedown','mousemove','mouseup'];if(win.navigator.pointerEnabled){desktop=['pointerdown','pointermove','pointerup'];}else if(win.navigator.msPointerEnabled){desktop=['MSPointerDown','MsPointerMove','MsPointerUp'];}return{start:Support.touch||!swiper.params.simulateTouch?touch[0]:desktop[0],move:Support.touch||!swiper.params.simulateTouch?touch[1]:desktop[1],end:Support.touch||!swiper.params.simulateTouch?touch[2]:desktop[2]};}(),touchEventsData:{isTouched:undefined,isMoved:undefined,allowTouchCallbacks:undefined,touchStartTime:undefined,isScrolling:undefined,currentTranslate:undefined,startTranslate:undefined,allowThresholdMove:undefined,// Form elements to match
formElements:'input, select, option, textarea, button, video',// Last click time
lastClickTime:Utils.now(),clickTimeout:undefined,// Velocities
velocities:[],allowMomentumBounce:undefined,isTouchEvent:undefined,startMoving:undefined},// Clicks
allowClick:true,// Touches
allowTouchMove:swiper.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},// Images
imagesToLoad:[],imagesLoaded:0});// Install Modules
swiper.useModules();// Init
if(swiper.params.init){swiper.init();}// Return app instance
return _ret3=swiper,_possibleConstructorReturn(_this2,_ret3);}_createClass(Swiper$1,[{key:'slidesPerViewDynamic',value:function slidesPerViewDynamic(){var swiper=this;var params=swiper.params,slides=swiper.slides,slidesGrid=swiper.slidesGrid,swiperSize=swiper.size,activeIndex=swiper.activeIndex;var spv=1;if(params.centeredSlides){var slideSize=slides[activeIndex].swiperSlideSize;var breakLoop=void 0;for(var i=activeIndex+1;i<slides.length;i+=1){if(slides[i]&&!breakLoop){slideSize+=slides[i].swiperSlideSize;spv+=1;if(slideSize>swiperSize)breakLoop=true;}}for(var _i5=activeIndex-1;_i5>=0;_i5-=1){if(slides[_i5]&&!breakLoop){slideSize+=slides[_i5].swiperSlideSize;spv+=1;if(slideSize>swiperSize)breakLoop=true;}}}else{for(var _i6=activeIndex+1;_i6<slides.length;_i6+=1){if(slidesGrid[_i6]-slidesGrid[activeIndex]<swiperSize){spv+=1;}}}return spv;}},{key:'update',value:function update(){var swiper=this;if(!swiper||swiper.destroyed)return;swiper.updateSize();swiper.updateSlides();swiper.updateProgress();swiper.updateSlidesClasses();var newTranslate=void 0;function setTranslate(){newTranslate=Math.min(Math.max(swiper.translate,swiper.maxTranslate()),swiper.minTranslate());swiper.setTranslate(newTranslate);swiper.updateActiveIndex();swiper.updateSlidesClasses();}var translated=void 0;if(swiper.params.freeMode){setTranslate();if(swiper.params.autoHeight){swiper.updateAutoHeight();}}else{if((swiper.params.slidesPerView==='auto'||swiper.params.slidesPerView>1)&&swiper.isEnd&&!swiper.params.centeredSlides){translated=swiper.slideTo(swiper.slides.length-1,0,false,true);}else{translated=swiper.slideTo(swiper.activeIndex,0,false,true);}if(!translated){setTranslate();}}swiper.emit('update');}},{key:'init',value:function init(){var swiper=this;if(swiper.initialized)return;swiper.emit('beforeInit');// Set breakpoint
if(swiper.params.breakpoints){swiper.setBreakpoint();}// Add Classes
swiper.addClasses();// Create loop
if(swiper.params.loop){swiper.loopCreate();}// Update size
swiper.updateSize();// Update slides
swiper.updateSlides();// Set Grab Cursor
if(swiper.params.grabCursor){swiper.setGrabCursor();}if(swiper.params.preloadImages){swiper.preloadImages();}// Slide To Initial Slide
if(swiper.params.loop){swiper.slideTo(swiper.params.initialSlide+swiper.loopedSlides,0,swiper.params.runCallbacksOnInit);}else{swiper.slideTo(swiper.params.initialSlide,0,swiper.params.runCallbacksOnInit);}// Attach events
swiper.attachEvents();// Init Flag
swiper.initialized=true;// Emit
swiper.emit('init');}},{key:'destroy',value:function destroy(){var deleteInstance=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var cleanStyles=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var swiper=this;var params=swiper.params,$el=swiper.$el,$wrapperEl=swiper.$wrapperEl,slides=swiper.slides;swiper.emit('beforeDestroy');// Init Flag
swiper.initialized=false;// Detach events
swiper.detachEvents();// Destroy loop
if(params.loop){swiper.loopDestroy();}// Cleanup styles
if(cleanStyles){swiper.removeClasses();$el.removeAttr('style');$wrapperEl.removeAttr('style');if(slides&&slides.length){slides.removeClass([params.slideVisibleClass,params.slideActiveClass,params.slideNextClass,params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');}}swiper.emit('destroy');// Detach emitter events
Object.keys(swiper.eventsListeners).forEach(function(eventName){swiper.off(eventName);});if(deleteInstance!==false){swiper.$el[0].swiper=null;swiper.$el.data('swiper',null);Utils.deleteProps(swiper);}swiper.destroyed=true;}}],[{key:'extendDefaults',value:function extendDefaults(newDefaults){Utils.extend(extendedDefaults,newDefaults);}},{key:'extendedDefaults',get:function get(){return extendedDefaults;}},{key:'defaults',get:function get(){return defaults;}},{key:'Class',get:function get(){return SwiperClass;}},{key:'$',get:function get(){return __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */];}}]);return Swiper$1;}(SwiperClass);var Device$2={name:'device',proto:{device:Device},static:{device:Device}};var Support$2={name:'support',proto:{support:Support},static:{support:Support}};var Browser$2={name:'browser',proto:{browser:Browser},static:{browser:Browser}};var Resize={name:'resize',create:function create(){var swiper=this;Utils.extend(swiper,{resize:{resizeHandler:function resizeHandler(){if(!swiper||swiper.destroyed||!swiper.initialized)return;swiper.emit('beforeResize');swiper.emit('resize');},orientationChangeHandler:function orientationChangeHandler(){if(!swiper||swiper.destroyed||!swiper.initialized)return;swiper.emit('orientationchange');}}});},on:{init:function init(){var swiper=this;// Emit resize
win.addEventListener('resize',swiper.resize.resizeHandler);// Emit orientationchange
win.addEventListener('orientationchange',swiper.resize.orientationChangeHandler);},destroy:function destroy(){var swiper=this;win.removeEventListener('resize',swiper.resize.resizeHandler);win.removeEventListener('orientationchange',swiper.resize.orientationChangeHandler);}}};var Observer={func:win.MutationObserver||win.WebkitMutationObserver,attach:function attach(target){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var swiper=this;var ObserverFunc=Observer.func;var observer=new ObserverFunc(function(mutations){mutations.forEach(function(mutation){swiper.emit('observerUpdate',mutation);});});observer.observe(target,{attributes:typeof options.attributes==='undefined'?true:options.attributes,childList:typeof options.childList==='undefined'?true:options.childList,characterData:typeof options.characterData==='undefined'?true:options.characterData});swiper.observer.observers.push(observer);},init:function init(){var swiper=this;if(!Support.observer||!swiper.params.observer)return;if(swiper.params.observeParents){var containerParents=swiper.$el.parents();for(var i=0;i<containerParents.length;i+=1){swiper.observer.attach(containerParents[i]);}}// Observe container
swiper.observer.attach(swiper.$el[0],{childList:false});// Observe wrapper
swiper.observer.attach(swiper.$wrapperEl[0],{attributes:false});},destroy:function destroy(){var swiper=this;swiper.observer.observers.forEach(function(observer){observer.disconnect();});swiper.observer.observers=[];}};var Observer$1={name:'observer',params:{observer:false,observeParents:false},create:function create(){var swiper=this;Utils.extend(swiper,{observer:{init:Observer.init.bind(swiper),attach:Observer.attach.bind(swiper),destroy:Observer.destroy.bind(swiper),observers:[]}});},on:{init:function init(){var swiper=this;swiper.observer.init();},destroy:function destroy(){var swiper=this;swiper.observer.destroy();}}};var Virtual={update:function update(force){var swiper=this;var _swiper$params=swiper.params,slidesPerView=_swiper$params.slidesPerView,slidesPerGroup=_swiper$params.slidesPerGroup,centeredSlides=_swiper$params.centeredSlides;var _swiper$virtual=swiper.virtual,previousFrom=_swiper$virtual.from,previousTo=_swiper$virtual.to,slides=_swiper$virtual.slides,previousSlidesGrid=_swiper$virtual.slidesGrid,renderSlide=_swiper$virtual.renderSlide,previousOffset=_swiper$virtual.offset;swiper.updateActiveIndex();var activeIndex=swiper.activeIndex||0;var offsetProp=void 0;if(swiper.rtl&&swiper.isHorizontal())offsetProp='right';else offsetProp=swiper.isHorizontal()?'left':'top';var slidesAfter=void 0;var slidesBefore=void 0;if(centeredSlides){slidesAfter=Math.floor(slidesPerView/2)+slidesPerGroup;slidesBefore=Math.floor(slidesPerView/2)+slidesPerGroup;}else{slidesAfter=slidesPerView+(slidesPerGroup-1);slidesBefore=slidesPerGroup;}var from=Math.max((activeIndex||0)-slidesBefore,0);var to=Math.min((activeIndex||0)+slidesAfter,slides.length-1);var offset$$1=(swiper.slidesGrid[from]||0)-(swiper.slidesGrid[0]||0);Utils.extend(swiper.virtual,{from:from,to:to,offset:offset$$1,slidesGrid:swiper.slidesGrid});function onRendered(){swiper.updateSlides();swiper.updateProgress();swiper.updateSlidesClasses();if(swiper.lazy&&swiper.params.lazy.enabled){swiper.lazy.load();}}if(previousFrom===from&&previousTo===to&&!force){if(swiper.slidesGrid!==previousSlidesGrid&&offset$$1!==previousOffset){swiper.slides.css(offsetProp,offset$$1+'px');}swiper.updateProgress();return;}if(swiper.params.virtual.renderExternal){swiper.params.virtual.renderExternal.call(swiper,{offset:offset$$1,from:from,to:to,slides:function getSlides(){var slidesToRender=[];for(var i=from;i<=to;i+=1){slidesToRender.push(slides[i]);}return slidesToRender;}()});onRendered();return;}var prependIndexes=[];var appendIndexes=[];if(force){swiper.$wrapperEl.find('.'+swiper.params.slideClass).remove();}else{for(var i=previousFrom;i<=previousTo;i+=1){if(i<from||i>to){swiper.$wrapperEl.find('.'+swiper.params.slideClass+'[data-swiper-slide-index="'+i+'"]').remove();}}}for(var _i7=0;_i7<slides.length;_i7+=1){if(_i7>=from&&_i7<=to){if(typeof previousTo==='undefined'||force){appendIndexes.push(_i7);}else{if(_i7>previousTo)appendIndexes.push(_i7);if(_i7<previousFrom)prependIndexes.push(_i7);}}}appendIndexes.forEach(function(index$$1){swiper.$wrapperEl.append(renderSlide(slides[index$$1],index$$1));});prependIndexes.sort(function(a,b){return a<b;}).forEach(function(index$$1){swiper.$wrapperEl.prepend(renderSlide(slides[index$$1],index$$1));});swiper.$wrapperEl.children('.swiper-slide').css(offsetProp,offset$$1+'px');onRendered();},renderSlide:function renderSlide(slide,index$$1){var swiper=this;var params=swiper.params.virtual;if(params.cache&&swiper.virtual.cache[index$$1]){return swiper.virtual.cache[index$$1];}var $slideEl=params.renderSlide?Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(params.renderSlide.call(swiper,slide,index$$1)):Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="'+swiper.params.slideClass+'" data-swiper-slide-index="'+index$$1+'">'+slide+'</div>');if(!$slideEl.attr('data-swiper-slide-index'))$slideEl.attr('data-swiper-slide-index',index$$1);if(params.cache)swiper.virtual.cache[index$$1]=$slideEl;return $slideEl;},appendSlide:function appendSlide(slide){var swiper=this;swiper.virtual.slides.push(slide);swiper.virtual.update(true);},prependSlide:function prependSlide(slide){var swiper=this;swiper.virtual.slides.unshift(slide);if(swiper.params.virtual.cache){var cache=swiper.virtual.cache;var newCache={};Object.keys(cache).forEach(function(cachedIndex){newCache[cachedIndex+1]=cache[cachedIndex];});swiper.virtual.cache=newCache;}swiper.virtual.update(true);swiper.slideNext(0);}};var Virtual$1={name:'virtual',params:{virtual:{enabled:false,slides:[],cache:true,renderSlide:null,renderExternal:null}},create:function create(){var swiper=this;Utils.extend(swiper,{virtual:{update:Virtual.update.bind(swiper),appendSlide:Virtual.appendSlide.bind(swiper),prependSlide:Virtual.prependSlide.bind(swiper),renderSlide:Virtual.renderSlide.bind(swiper),slides:swiper.params.virtual.slides,cache:{}}});},on:{beforeInit:function beforeInit(){var swiper=this;if(!swiper.params.virtual.enabled)return;swiper.classNames.push(swiper.params.containerModifierClass+'virtual');var overwriteParams={watchSlidesProgress:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);swiper.virtual.update();},setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.virtual.enabled)return;swiper.virtual.update();}}};var Keyboard={handle:function handle(event){var swiper=this;var e=event;if(e.originalEvent)e=e.originalEvent;// jquery fix
var kc=e.keyCode||e.charCode;// Directions locks
if(!swiper.allowSlideNext&&(swiper.isHorizontal()&&kc===39||swiper.isVertical()&&kc===40)){return false;}if(!swiper.allowSlidePrev&&(swiper.isHorizontal()&&kc===37||swiper.isVertical()&&kc===38)){return false;}if(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey){return undefined;}if(doc.activeElement&&doc.activeElement.nodeName&&(doc.activeElement.nodeName.toLowerCase()==='input'||doc.activeElement.nodeName.toLowerCase()==='textarea')){return undefined;}if(kc===37||kc===39||kc===38||kc===40){var inView=false;// Check that swiper should be inside of visible area of window
if(swiper.$el.parents('.'+swiper.params.slideClass).length>0&&swiper.$el.parents('.'+swiper.params.slideActiveClass).length===0){return undefined;}var windowScroll={left:win.pageXOffset,top:win.pageYOffset};var windowWidth=win.innerWidth;var windowHeight=win.innerHeight;var swiperOffset=swiper.$el.offset();if(swiper.rtl)swiperOffset.left-=swiper.$el[0].scrollLeft;var swiperCoord=[[swiperOffset.left,swiperOffset.top],[swiperOffset.left+swiper.width,swiperOffset.top],[swiperOffset.left,swiperOffset.top+swiper.height],[swiperOffset.left+swiper.width,swiperOffset.top+swiper.height]];for(var i=0;i<swiperCoord.length;i+=1){var point=swiperCoord[i];if(point[0]>=windowScroll.left&&point[0]<=windowScroll.left+windowWidth&&point[1]>=windowScroll.top&&point[1]<=windowScroll.top+windowHeight){inView=true;}}if(!inView)return undefined;}if(swiper.isHorizontal()){if(kc===37||kc===39){if(e.preventDefault)e.preventDefault();else e.returnValue=false;}if(kc===39&&!swiper.rtl||kc===37&&swiper.rtl)swiper.slideNext();if(kc===37&&!swiper.rtl||kc===39&&swiper.rtl)swiper.slidePrev();}else{if(kc===38||kc===40){if(e.preventDefault)e.preventDefault();else e.returnValue=false;}if(kc===40)swiper.slideNext();if(kc===38)swiper.slidePrev();}swiper.emit('keyPress',kc);return undefined;},enable:function enable(){var swiper=this;if(swiper.keyboard.enabled)return;Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(doc).on('keydown',swiper.keyboard.handle);swiper.keyboard.enabled=true;},disable:function disable(){var swiper=this;if(!swiper.keyboard.enabled)return;Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(doc).off('keydown',swiper.keyboard.handle);swiper.keyboard.enabled=false;}};var Keyboard$1={name:'keyboard',params:{keyboard:{enabled:false}},create:function create(){var swiper=this;Utils.extend(swiper,{keyboard:{enabled:false,enable:Keyboard.enable.bind(swiper),disable:Keyboard.disable.bind(swiper),handle:Keyboard.handle.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.keyboard.enabled){swiper.keyboard.enable();}},destroy:function destroy(){var swiper=this;if(swiper.keyboard.enabled){swiper.keyboard.disable();}}}};function isEventSupported(){var eventName='onwheel';var isSupported=eventName in doc;if(!isSupported){var element=doc.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}if(!isSupported&&doc.implementation&&doc.implementation.hasFeature&&// always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
doc.implementation.hasFeature('','')!==true){// This is the only way to test support for the `wheel` event in IE9+.
isSupported=doc.implementation.hasFeature('Events.wheel','3.0');}return isSupported;}var Mousewheel={lastScrollTime:Utils.now(),event:function getEvent(){if(win.navigator.userAgent.indexOf('firefox')>-1)return'DOMMouseScroll';return isEventSupported()?'wheel':'mousewheel';}(),normalize:function normalize(e){// Reasonable defaults
var PIXEL_STEP=10;var LINE_HEIGHT=40;var PAGE_HEIGHT=800;var sX=0;var sY=0;// spinX, spinY
var pX=0;var pY=0;// pixelX, pixelY
// Legacy
if('detail'in e){sY=e.detail;}if('wheelDelta'in e){sY=-e.wheelDelta/120;}if('wheelDeltaY'in e){sY=-e.wheelDeltaY/120;}if('wheelDeltaX'in e){sX=-e.wheelDeltaX/120;}// side scrolling on FF with DOMMouseScroll
if('axis'in e&&e.axis===e.HORIZONTAL_AXIS){sX=sY;sY=0;}pX=sX*PIXEL_STEP;pY=sY*PIXEL_STEP;if('deltaY'in e){pY=e.deltaY;}if('deltaX'in e){pX=e.deltaX;}if((pX||pY)&&e.deltaMode){if(e.deltaMode===1){// delta in LINE units
pX*=LINE_HEIGHT;pY*=LINE_HEIGHT;}else{// delta in PAGE units
pX*=PAGE_HEIGHT;pY*=PAGE_HEIGHT;}}// Fall-back if spin cannot be determined
if(pX&&!sX){sX=pX<1?-1:1;}if(pY&&!sY){sY=pY<1?-1:1;}return{spinX:sX,spinY:sY,pixelX:pX,pixelY:pY};},handle:function handle(event){var e=event;var swiper=this;var params=swiper.params.mousewheel;if(e.originalEvent)e=e.originalEvent;// jquery fix
var delta=0;var rtlFactor=swiper.rtl?-1:1;var data$$1=Mousewheel.normalize(e);if(params.forceToAxis){if(swiper.isHorizontal()){if(Math.abs(data$$1.pixelX)>Math.abs(data$$1.pixelY))delta=data$$1.pixelX*rtlFactor;else return true;}else if(Math.abs(data$$1.pixelY)>Math.abs(data$$1.pixelX))delta=data$$1.pixelY;else return true;}else{delta=Math.abs(data$$1.pixelX)>Math.abs(data$$1.pixelY)?-data$$1.pixelX*rtlFactor:-data$$1.pixelY;}if(delta===0)return true;if(params.invert)delta=-delta;if(!swiper.params.freeMode){if(Utils.now()-swiper.mousewheel.lastScrollTime>60){if(delta<0){if((!swiper.isEnd||swiper.params.loop)&&!swiper.animating){swiper.slideNext();swiper.emit('scroll',e);}else if(params.releaseOnEdges)return true;}else if((!swiper.isBeginning||swiper.params.loop)&&!swiper.animating){swiper.slidePrev();swiper.emit('scroll',e);}else if(params.releaseOnEdges)return true;}swiper.mousewheel.lastScrollTime=new win.Date().getTime();}else{// Freemode or scrollContainer:
var position=swiper.getTranslate()+delta*params.sensitivity;var wasBeginning=swiper.isBeginning;var wasEnd=swiper.isEnd;if(position>=swiper.minTranslate())position=swiper.minTranslate();if(position<=swiper.maxTranslate())position=swiper.maxTranslate();swiper.setTransition(0);swiper.setTranslate(position);swiper.updateProgress();swiper.updateActiveIndex();swiper.updateSlidesClasses();if(!wasBeginning&&swiper.isBeginning||!wasEnd&&swiper.isEnd){swiper.updateSlidesClasses();}if(swiper.params.freeModeSticky){clearTimeout(swiper.mousewheel.timeout);swiper.mousewheel.timeout=Utils.nextTick(function(){swiper.slideReset();},300);}// Emit event
swiper.emit('scroll',e);// Stop autoplay
if(swiper.params.autoplay&&swiper.params.autoplayDisableOnInteraction)swiper.stopAutoplay();// Return page scroll on edge positions
if(position===0||position===swiper.maxTranslate())return true;}if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;},enable:function enable(){var swiper=this;if(!Mousewheel.event)return false;if(swiper.mousewheel.enabled)return false;var target=swiper.$el;if(swiper.params.mousewheel.eventsTarged!=='container'){target=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.params.mousewheel.eventsTarged);}target.on(Mousewheel.event,swiper.mousewheel.handle);swiper.mousewheel.enabled=true;return true;},disable:function disable(){var swiper=this;if(!Mousewheel.event)return false;if(!swiper.mousewheel.enabled)return false;var target=swiper.$el;if(swiper.params.mousewheel.eventsTarged!=='container'){target=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.params.mousewheel.eventsTarged);}target.off(Mousewheel.event,swiper.mousewheel.handle);swiper.mousewheel.enabled=false;return true;}};var Mousewheel$1={name:'mousewheel',params:{mousewheel:{enabled:false,releaseOnEdges:false,invert:false,forceToAxis:false,sensitivity:1,eventsTarged:'container'}},create:function create(){var swiper=this;Utils.extend(swiper,{mousewheel:{enabled:false,enable:Mousewheel.enable.bind(swiper),disable:Mousewheel.disable.bind(swiper),handle:Mousewheel.handle.bind(swiper),lastScrollTime:Utils.now()}});},on:{init:function init(){var swiper=this;if(swiper.params.mousewheel.enabled)swiper.mousewheel.enable();},destroy:function destroy(){var swiper=this;if(swiper.mousewheel.enabled)swiper.mousewheel.disable();}}};var Navigation={update:function update(){// Update Navigation Buttons
var swiper=this;var params=swiper.params.navigation;if(swiper.params.loop)return;var _swiper$navigation=swiper.navigation,$nextEl=_swiper$navigation.$nextEl,$prevEl=_swiper$navigation.$prevEl;if($prevEl&&$prevEl.length>0){if(swiper.isBeginning){$prevEl.addClass(params.disabledClass);}else{$prevEl.removeClass(params.disabledClass);}}if($nextEl&&$nextEl.length>0){if(swiper.isEnd){$nextEl.addClass(params.disabledClass);}else{$nextEl.removeClass(params.disabledClass);}}},init:function init(){var swiper=this;var params=swiper.params.navigation;if(!(params.nextEl||params.prevEl))return;var $nextEl=void 0;var $prevEl=void 0;if(params.nextEl){$nextEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(params.nextEl);if(swiper.params.uniqueNavElements&&typeof params.nextEl==='string'&&$nextEl.length>1&&swiper.$el.find(params.nextEl).length===1){$nextEl=swiper.$el.find(params.nextEl);}}if(params.prevEl){$prevEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(params.prevEl);if(swiper.params.uniqueNavElements&&typeof params.prevEl==='string'&&$prevEl.length>1&&swiper.$el.find(params.prevEl).length===1){$prevEl=swiper.$el.find(params.prevEl);}}if($nextEl&&$nextEl.length>0){$nextEl.on('click',function(e){e.preventDefault();if(swiper.isEnd&&!swiper.params.loop)return;swiper.slideNext();});}if($prevEl&&$prevEl.length>0){$prevEl.on('click',function(e){e.preventDefault();if(swiper.isBeginning&&!swiper.params.loop)return;swiper.slidePrev();});}Utils.extend(swiper.navigation,{$nextEl:$nextEl,nextEl:$nextEl&&$nextEl[0],$prevEl:$prevEl,prevEl:$prevEl&&$prevEl[0]});},destroy:function destroy(){var swiper=this;var _swiper$navigation2=swiper.navigation,$nextEl=_swiper$navigation2.$nextEl,$prevEl=_swiper$navigation2.$prevEl;if($nextEl&&$nextEl.length){$nextEl.off('click');$nextEl.removeClass(swiper.params.navigation.disabledClass);}if($prevEl&&$prevEl.length){$prevEl.off('click');$prevEl.removeClass(swiper.params.navigation.disabledClass);}}};var Navigation$1={name:'navigation',params:{navigation:{nextEl:null,prevEl:null,hideOnClick:false,disabledClass:'swiper-button-disabled',hiddenClass:'swiper-button-hidden'}},create:function create(){var swiper=this;Utils.extend(swiper,{navigation:{init:Navigation.init.bind(swiper),update:Navigation.update.bind(swiper),destroy:Navigation.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;swiper.navigation.init();swiper.navigation.update();},toEdge:function toEdge(){var swiper=this;swiper.navigation.update();},fromEdge:function fromEdge(){var swiper=this;swiper.navigation.update();},destroy:function destroy(){var swiper=this;swiper.navigation.destroy();},click:function click(e){var swiper=this;var _swiper$navigation3=swiper.navigation,$nextEl=_swiper$navigation3.$nextEl,$prevEl=_swiper$navigation3.$prevEl;if(swiper.params.navigation.hideOnClick&&!Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).is($prevEl)&&!Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).is($nextEl)){if($nextEl)$nextEl.toggleClass(swiper.params.navigation.hiddenClass);if($prevEl)$prevEl.toggleClass(swiper.params.navigation.hiddenClass);}}}};var Pagination={update:function update(){// Render || Update Pagination bullets/items
var swiper=this;var rtl=swiper.rtl;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0)return;var slidesLength=swiper.virtual&&swiper.params.virtual.enabled?swiper.virtual.slides.length:swiper.slides.length;var $el=swiper.pagination.$el;// Current/Total
var current=void 0;var total=swiper.params.loop?Math.ceil((slidesLength-swiper.loopedSlides*2)/swiper.params.slidesPerGroup):swiper.snapGrid.length;if(swiper.params.loop){current=Math.ceil((swiper.activeIndex-swiper.loopedSlides)/swiper.params.slidesPerGroup);if(current>slidesLength-1-swiper.loopedSlides*2){current-=slidesLength-swiper.loopedSlides*2;}if(current>total-1)current-=total;if(current<0&&swiper.params.paginationType!=='bullets')current=total+current;}else if(typeof swiper.snapIndex!=='undefined'){current=swiper.snapIndex;}else{current=swiper.activeIndex||0;}// Types
if(params.type==='bullets'&&swiper.pagination.bullets&&swiper.pagination.bullets.length>0){var bullets=swiper.pagination.bullets;if(params.dynamicBullets){swiper.pagination.bulletSize=bullets.eq(0)[swiper.isHorizontal()?'outerWidth':'outerHeight'](true);$el.css(swiper.isHorizontal()?'width':'height',swiper.pagination.bulletSize*5+'px');}bullets.removeClass(params.bulletActiveClass+' '+params.bulletActiveClass+'-next '+params.bulletActiveClass+'-next-next '+params.bulletActiveClass+'-prev '+params.bulletActiveClass+'-prev-prev');if($el.length>1){bullets.each(function(index$$1,bullet){var $bullet=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(bullet);if($bullet.index()===current){$bullet.addClass(params.bulletActiveClass);if(params.dynamicBullets){$bullet.prev().addClass(params.bulletActiveClass+'-prev').prev().addClass(params.bulletActiveClass+'-prev-prev');$bullet.next().addClass(params.bulletActiveClass+'-next').next().addClass(params.bulletActiveClass+'-next-next');}}});}else{var $bullet=bullets.eq(current);$bullet.addClass(params.bulletActiveClass);if(params.dynamicBullets){$bullet.prev().addClass(params.bulletActiveClass+'-prev').prev().addClass(params.bulletActiveClass+'-prev-prev');$bullet.next().addClass(params.bulletActiveClass+'-next').next().addClass(params.bulletActiveClass+'-next-next');}}if(params.dynamicBullets){var dynamicBulletsLength=Math.min(bullets.length,5);var bulletsOffset=(swiper.pagination.bulletSize*dynamicBulletsLength-swiper.pagination.bulletSize)/2-current*swiper.pagination.bulletSize;var offsetProp=rtl?'right':'left';bullets.css(swiper.isHorizontal()?offsetProp:'top',bulletsOffset+'px');}}if(params.type==='fraction'){$el.find('.'+params.currentClass).text(current+1);$el.find('.'+params.totalClass).text(total);}if(params.type==='progressbar'){var scale=(current+1)/total;var scaleX=scale;var scaleY=1;if(!swiper.isHorizontal()){scaleY=scale;scaleX=1;}$el.find('.'+params.progressbarFillClass).transform('translate3d(0,0,0) scaleX('+scaleX+') scaleY('+scaleY+')').transition(swiper.params.speed);}if(params.type==='custom'&&params.renderCustom){$el.html(params.renderCustom(swiper,current+1,total));swiper.emit('paginationRender',swiper,$el[0]);}else{swiper.emit('paginationUpdate',swiper,$el[0]);}},render:function render(){// Render Container
var swiper=this;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0)return;var slidesLength=swiper.virtual&&swiper.params.virtual.enabled?swiper.virtual.slides.length:swiper.slides.length;var $el=swiper.pagination.$el;var paginationHTML='';if(params.type==='bullets'){var numberOfBullets=swiper.params.loop?Math.ceil((slidesLength-swiper.loopedSlides*2)/swiper.params.slidesPerGroup):swiper.snapGrid.length;for(var i=0;i<numberOfBullets;i+=1){if(params.renderBullet){paginationHTML+=params.renderBullet.call(swiper,i,params.bulletClass);}else{paginationHTML+='<'+params.bulletElement+' class="'+params.bulletClass+'"></'+params.bulletElement+'>';}}$el.html(paginationHTML);swiper.pagination.bullets=$el.find('.'+params.bulletClass);}if(params.type==='fraction'){if(params.renderFraction){paginationHTML=params.renderFraction.call(swiper,params.currentClass,params.totalClass);}else{paginationHTML='<span class="'+params.currentClass+'"></span>'+' / '+('<span class="'+params.totalClass+'"></span>');}$el.html(paginationHTML);}if(params.type==='progressbar'){if(params.renderProgressbar){paginationHTML=params.renderProgressbar.call(swiper,params.progressbarFillClass);}else{paginationHTML='<span class="'+params.progressbarFillClass+'"></span>';}$el.html(paginationHTML);}if(params.type!=='custom'){swiper.emit('paginationRender',swiper.pagination.$el[0]);}},init:function init(){var swiper=this;var params=swiper.params.pagination;if(!params.el)return;var $el=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(params.el);if($el.length===0)return;if(swiper.params.uniqueNavElements&&typeof params.el==='string'&&$el.length>1&&swiper.$el.find(params.el).length===1){$el=swiper.$el.find(params.el);}if(params.type==='bullets'&&params.clickable){$el.addClass(params.clickableClass);}$el.addClass(params.modifierClass+params.type);if(params.type==='bullets'&&params.dynamicBullets){$el.addClass(''+params.modifierClass+params.type+'-dynamic');}if(params.clickable){$el.on('click','.'+params.bulletClass,function onClick(e){e.preventDefault();var index$$1=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(this).index()*swiper.params.slidesPerGroup;if(swiper.params.loop)index$$1+=swiper.loopedSlides;swiper.slideTo(index$$1);});}Utils.extend(swiper.pagination,{$el:$el,el:$el[0]});},destroy:function destroy(){var swiper=this;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0)return;var $el=swiper.pagination.$el;$el.removeClass(params.hiddenClass);$el.removeClass(params.modifierClass+params.type);if(swiper.pagination.bullets)swiper.pagination.bullets.removeClass(params.bulletActiveClass);if(params.clickable){$el.off('click','.'+params.bulletClass);}}};var Pagination$1={name:'pagination',params:{pagination:{el:null,bulletElement:'span',clickable:false,hideOnClick:false,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,type:'bullets',// 'bullets' or 'progressbar' or 'fraction' or 'custom'
dynamicBullets:false,bulletClass:'swiper-pagination-bullet',bulletActiveClass:'swiper-pagination-bullet-active',modifierClass:'swiper-pagination-',// NEW
currentClass:'swiper-pagination-current',totalClass:'swiper-pagination-total',hiddenClass:'swiper-pagination-hidden',progressbarFillClass:'swiper-pagination-progressbar-fill',clickableClass:'swiper-pagination-clickable'// NEW
}},create:function create(){var swiper=this;Utils.extend(swiper,{pagination:{init:Pagination.init.bind(swiper),render:Pagination.render.bind(swiper),update:Pagination.update.bind(swiper),destroy:Pagination.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;swiper.pagination.init();swiper.pagination.render();swiper.pagination.update();},activeIndexChange:function activeIndexChange(){var swiper=this;if(swiper.params.loop){swiper.pagination.update();}else if(typeof swiper.snapIndex==='undefined'){swiper.pagination.update();}},snapIndexChange:function snapIndexChange(){var swiper=this;if(!swiper.params.loop){swiper.pagination.update();}},slidesLengthChange:function slidesLengthChange(){var swiper=this;if(swiper.params.loop){swiper.pagination.render();swiper.pagination.update();}},snapGridLengthChange:function snapGridLengthChange(){var swiper=this;if(!swiper.params.loop){swiper.pagination.render();swiper.pagination.update();}},destroy:function destroy(){var swiper=this;swiper.pagination.destroy();},click:function click(e){var swiper=this;if(swiper.params.pagination.el&&swiper.params.pagination.hideOnClick&&swiper.pagination.$el.length>0&&!Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target).hasClass(swiper.params.pagination.bulletClass)){swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);}}}};var Scrollbar={setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el)return;var scrollbar=swiper.scrollbar,rtl=swiper.rtl,progress=swiper.progress;var dragSize=scrollbar.dragSize,trackSize=scrollbar.trackSize,$dragEl=scrollbar.$dragEl,$el=scrollbar.$el;var params=swiper.params.scrollbar;var newSize=dragSize;var newPos=(trackSize-dragSize)*progress;if(rtl&&swiper.isHorizontal()){newPos=-newPos;if(newPos>0){newSize=dragSize-newPos;newPos=0;}else if(-newPos+dragSize>trackSize){newSize=trackSize+newPos;}}else if(newPos<0){newSize=dragSize+newPos;newPos=0;}else if(newPos+dragSize>trackSize){newSize=trackSize-newPos;}if(swiper.isHorizontal()){if(Support.transforms3d){$dragEl.transform('translate3d('+newPos+'px, 0, 0)');}else{$dragEl.transform('translateX('+newPos+'px)');}$dragEl[0].style.width=newSize+'px';}else{if(Support.transforms3d){$dragEl.transform('translate3d(0px, '+newPos+'px, 0)');}else{$dragEl.transform('translateY('+newPos+'px)');}$dragEl[0].style.height=newSize+'px';}if(params.hide){clearTimeout(swiper.scrollbar.timeout);$el[0].style.opacity=1;swiper.scrollbar.timeout=setTimeout(function(){$el[0].style.opacity=0;$el.transition(400);},1000);}},setTransition:function setTransition(duration){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el)return;swiper.scrollbar.$dragEl.transition(duration);},updateSize:function updateSize(){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el)return;var scrollbar=swiper.scrollbar;var $dragEl=scrollbar.$dragEl,$el=scrollbar.$el;$dragEl[0].style.width='';$dragEl[0].style.height='';var trackSize=swiper.isHorizontal()?$el[0].offsetWidth:$el[0].offsetHeight;var divider=swiper.size/swiper.virtualSize;var moveDivider=divider*(trackSize/swiper.size);var dragSize=void 0;if(swiper.params.scrollbar.dragSize==='auto'){dragSize=trackSize*divider;}else{dragSize=parseInt(swiper.params.scrollbar.dragSize,10);}if(swiper.isHorizontal()){$dragEl[0].style.width=dragSize+'px';}else{$dragEl[0].style.height=dragSize+'px';}if(divider>=1){$el[0].style.display='none';}else{$el[0].style.display='';}if(swiper.params.scrollbarHide){$el[0].style.opacity=0;}Utils.extend(scrollbar,{trackSize:trackSize,divider:divider,moveDivider:moveDivider,dragSize:dragSize});},setDragPosition:function setDragPosition(e){var swiper=this;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el,dragSize=scrollbar.dragSize,trackSize=scrollbar.trackSize;var pointerPosition=void 0;if(swiper.isHorizontal()){pointerPosition=e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX||e.clientX;}else{pointerPosition=e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY||e.clientY;}var positionRatio=void 0;positionRatio=(pointerPosition-$el.offset()[swiper.isHorizontal()?'left':'top']-dragSize/2)/(trackSize-dragSize);positionRatio=Math.max(Math.min(positionRatio,1),0);if(swiper.rtl){positionRatio=1-positionRatio;}var position=swiper.minTranslate()+(swiper.maxTranslate()-swiper.minTranslate())*positionRatio;swiper.updateProgress(position);swiper.setTranslate(position);swiper.updateActiveIndex();swiper.updateSlidesClasses();},onDragStart:function onDragStart(e){var swiper=this;var params=swiper.params.scrollbar;var scrollbar=swiper.scrollbar,$wrapperEl=swiper.$wrapperEl;var $el=scrollbar.$el,$dragEl=scrollbar.$dragEl;swiper.scrollbar.isTouched=true;e.preventDefault();e.stopPropagation();$wrapperEl.transition(100);$dragEl.transition(100);scrollbar.setDragPosition(e);clearTimeout(swiper.scrollbar.dragTimeout);$el.transition(0);if(params.hide){$el.css('opacity',1);}swiper.emit('scrollbarDragStart',e);},onDragMove:function onDragMove(e){var swiper=this;var scrollbar=swiper.scrollbar,$wrapperEl=swiper.$wrapperEl;var $el=scrollbar.$el,$dragEl=scrollbar.$dragEl;if(!swiper.scrollbar.isTouched)return;if(e.preventDefault)e.preventDefault();else e.returnValue=false;scrollbar.setDragPosition(e);$wrapperEl.transition(0);$el.transition(0);$dragEl.transition(0);swiper.emit('scrollbarDragMove',e);},onDragEnd:function onDragEnd(e){var swiper=this;var params=swiper.params.scrollbar;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;if(!swiper.scrollbar.isTouched)return;swiper.scrollbar.isTouched=false;if(params.hide){clearTimeout(swiper.scrollbar.dragTimeout);swiper.scrollbar.dragTimeout=Utils.nextTick(function(){$el.css('opacity',0);$el.transition(400);},1000);}swiper.emit('scrollbarDragEnd',e);if(params.snapOnRelease){swiper.slideReset();}},enableDraggable:function enableDraggable(){var swiper=this;if(!swiper.params.scrollbar.el)return;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;var target=Support.touch?$el[0]:document;$el.on(swiper.scrollbar.dragEvents.start,swiper.scrollbar.onDragStart);Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(target).on(swiper.scrollbar.dragEvents.move,swiper.scrollbar.onDragMove);Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(target).on(swiper.scrollbar.dragEvents.end,swiper.scrollbar.onDragEnd);},disableDraggable:function disableDraggable(){var swiper=this;if(!swiper.params.scrollbar.el)return;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;var target=Support.touch?$el[0]:document;$el.off(swiper.scrollbar.dragEvents.start);Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(target).off(swiper.scrollbar.dragEvents.move);Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(target).off(swiper.scrollbar.dragEvents.end);},init:function init(){var swiper=this;if(!swiper.params.scrollbar.el)return;var scrollbar=swiper.scrollbar,$swiperEl=swiper.$el,touchEvents=swiper.touchEvents;var params=swiper.params.scrollbar;var $el=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(params.el);if(swiper.params.uniqueNavElements&&typeof params.el==='string'&&$el.length>1&&$swiperEl.find(params.el).length===1){$el=$swiperEl.find(params.el);}var $dragEl=$el.find('.swiper-scrollbar-drag');if($dragEl.length===0){$dragEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-scrollbar-drag"></div>');$el.append($dragEl);}swiper.scrollbar.dragEvents=function dragEvents(){if(swiper.params.simulateTouch===false&&!Support.touch){return{start:'mousedown',move:'mousemove',end:'mouseup'};}return touchEvents;}();Utils.extend(scrollbar,{$el:$el,el:$el[0],$dragEl:$dragEl,dragEl:$dragEl[0]});if(params.draggable){scrollbar.enableDraggable();}},destroy:function destroy(){var swiper=this;swiper.scrollbar.disableDraggable();}};var Scrollbar$1={name:'scrollbar',params:{scrollbar:{el:null,dragSize:'auto',hide:false,draggable:false,snapOnRelease:true}},create:function create(){var swiper=this;Utils.extend(swiper,{scrollbar:{init:Scrollbar.init.bind(swiper),destroy:Scrollbar.destroy.bind(swiper),updateSize:Scrollbar.updateSize.bind(swiper),setTranslate:Scrollbar.setTranslate.bind(swiper),setTransition:Scrollbar.setTransition.bind(swiper),enableDraggable:Scrollbar.enableDraggable.bind(swiper),disableDraggable:Scrollbar.disableDraggable.bind(swiper),setDragPosition:Scrollbar.setDragPosition.bind(swiper),onDragStart:Scrollbar.onDragStart.bind(swiper),onDragMove:Scrollbar.onDragMove.bind(swiper),onDragEnd:Scrollbar.onDragEnd.bind(swiper),isTouched:false,timeout:null,dragTimeout:null}});},on:{init:function init(){var swiper=this;swiper.scrollbar.init();swiper.scrollbar.updateSize();swiper.scrollbar.setTranslate();},update:function update(){var swiper=this;swiper.scrollbar.updateSize();},resize:function resize(){var swiper=this;swiper.scrollbar.updateSize();},observerUpdate:function observerUpdate(){var swiper=this;swiper.scrollbar.updateSize();},setTranslate:function setTranslate(){var swiper=this;swiper.scrollbar.setTranslate();},setTransition:function setTransition(duration){var swiper=this;swiper.scrollbar.setTransition(duration);},destroy:function destroy(){var swiper=this;swiper.scrollbar.destroy();}}};var Parallax={setTransform:function setTransform(el,progress){var swiper=this;var rtl=swiper.rtl;var $el=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(el);var rtlFactor=rtl?-1:1;var p=$el.attr('data-swiper-parallax')||'0';var x=$el.attr('data-swiper-parallax-x');var y=$el.attr('data-swiper-parallax-y');var scale=$el.attr('data-swiper-parallax-scale');var opacity=$el.attr('data-swiper-parallax-opacity');if(x||y){x=x||'0';y=y||'0';}else if(swiper.isHorizontal()){x=p;y='0';}else{y=p;x='0';}if(x.indexOf('%')>=0){x=parseInt(x,10)*progress*rtlFactor+'%';}else{x=x*progress*rtlFactor+'px';}if(y.indexOf('%')>=0){y=parseInt(y,10)*progress+'%';}else{y=y*progress+'px';}if(typeof opacity!=='undefined'&&opacity!==null){var currentOpacity=opacity-(opacity-1)*(1-Math.abs(progress));$el[0].style.opacity=currentOpacity;}if(typeof scale==='undefined'||scale===null){$el.transform('translate3d('+x+', '+y+', 0px)');}else{var currentScale=scale-(scale-1)*(1-Math.abs(progress));$el.transform('translate3d('+x+', '+y+', 0px) scale('+currentScale+')');}},setTranslate:function setTranslate(){var swiper=this;var $el=swiper.$el,slides=swiper.slides,progress=swiper.progress,snapGrid=swiper.snapGrid;$el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index$$1,el){swiper.parallax.setTransform(el,progress);});slides.each(function(slideIndex,slideEl){var slideProgress=slideEl.progress;if(swiper.params.slidesPerGroup>1&&swiper.params.slidesPerView!=='auto'){slideProgress+=Math.ceil(slideIndex/2)-progress*(snapGrid.length-1);}slideProgress=Math.min(Math.max(slideProgress,-1),1);Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index$$1,el){swiper.parallax.setTransform(el,slideProgress);});});},setTransition:function setTransition(){var duration=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.params.speed;var swiper=this;var $el=swiper.$el;$el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index$$1,parallaxEl){var $parallaxEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(parallaxEl);var parallaxDuration=parseInt($parallaxEl.attr('data-swiper-parallax-duration'),10)||duration;if(duration===0)parallaxDuration=0;$parallaxEl.transition(parallaxDuration);});}};var Parallax$1={name:'parallax',params:{parallax:{enabled:false}},create:function create(){var swiper=this;Utils.extend(swiper,{parallax:{setTransform:Parallax.setTransform.bind(swiper),setTranslate:Parallax.setTranslate.bind(swiper),setTransition:Parallax.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;swiper.params.watchSlidesProgress=true;},init:function init(){var swiper=this;if(!swiper.params.parallax)return;swiper.parallax.setTranslate();},setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.parallax)return;swiper.parallax.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(!swiper.params.parallax)return;swiper.parallax.setTransition(duration);}}};var Zoom={// Calc Scale From Multi-touches
getDistanceBetweenTouches:function getDistanceBetweenTouches(e){if(e.targetTouches.length<2)return 1;var x1=e.targetTouches[0].pageX;var y1=e.targetTouches[0].pageY;var x2=e.targetTouches[1].pageX;var y2=e.targetTouches[1].pageY;var distance=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));return distance;},// Events
onGestureStart:function onGestureStart(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;zoom.fakeGestureTouched=false;zoom.fakeGestureMoved=false;if(!Support.gestures){if(e.type!=='touchstart'||e.type==='touchstart'&&e.targetTouches.length<2){return;}zoom.fakeGestureTouched=true;gesture.scaleStart=Zoom.getDistanceBetweenTouches(e);}if(!gesture.$slideEl||!gesture.$slideEl.length){gesture.$slideEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(this);if(gesture.$slideEl.length===0)gesture.$slideEl=swiper.slides.eq(swiper.activeIndex);gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent('.'+params.containerClass);gesture.maxRatio=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;if(gesture.$imageWrapEl.length===0){gesture.$imageEl=undefined;return;}}gesture.$imageEl.transition(0);swiper.zoom.isScaling=true;},onGestureChange:function onGestureChange(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;if(!Support.gestures){if(e.type!=='touchmove'||e.type==='touchmove'&&e.targetTouches.length<2){return;}zoom.fakeGestureMoved=true;gesture.scaleMove=Zoom.getDistanceBetweenTouches(e);}if(!gesture.$imageEl||gesture.$imageEl.length===0)return;if(Support.gestures){swiper.zoom.scale=e.scale*zoom.currentScale;}else{zoom.scale=gesture.scaleMove/gesture.scaleStart*zoom.currentScale;}if(zoom.scale>gesture.maxRatio){zoom.scale=gesture.maxRatio-1+Math.pow(zoom.scale-gesture.maxRatio+1,0.5);}if(zoom.scale<params.minRatio){zoom.scale=params.minRatio+1-Math.pow(params.minRatio-zoom.scale+1,0.5);}gesture.$imageEl.transform('translate3d(0,0,0) scale('+zoom.scale+')');},onGestureEnd:function onGestureEnd(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;if(!Support.gestures){if(!zoom.fakeGestureTouched||!zoom.fakeGestureMoved){return;}if(e.type!=='touchend'||e.type==='touchend'&&e.changedTouches.length<2&&!Device.android){return;}zoom.fakeGestureTouched=false;zoom.fakeGestureMoved=false;}if(!gesture.$imageEl||gesture.$imageEl.length===0)return;zoom.scale=Math.max(Math.min(zoom.scale,gesture.maxRatio),params.minRatio);gesture.$imageEl.transition(swiper.params.speed).transform('translate3d(0,0,0) scale('+zoom.scale+')');zoom.currentScale=zoom.scale;zoom.isScaling=false;if(zoom.scale===1)gesture.$slideEl=undefined;},onTouchStart:function onTouchStart(e){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture,image=zoom.image;if(!gesture.$imageEl||gesture.$imageEl.length===0)return;if(image.isTouched)return;if(Device.android)e.preventDefault();image.isTouched=true;image.touchesStart.x=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;image.touchesStart.y=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;},onTouchMove:function onTouchMove(e){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture,image=zoom.image,velocity=zoom.velocity;if(!gesture.$imageEl||gesture.$imageEl.length===0)return;swiper.allowClick=false;if(!image.isTouched||!gesture.$slideEl)return;if(!image.isMoved){image.width=gesture.$imageEl[0].offsetWidth;image.height=gesture.$imageEl[0].offsetHeight;image.startX=Utils.getTranslate(gesture.$imageWrapEl[0],'x')||0;image.startY=Utils.getTranslate(gesture.$imageWrapEl[0],'y')||0;gesture.slideWidth=gesture.$slideEl[0].offsetWidth;gesture.slideHeight=gesture.$slideEl[0].offsetHeight;gesture.$imageWrapEl.transition(0);if(swiper.rtl)image.startX=-image.startX;if(swiper.rtl)image.startY=-image.startY;}// Define if we need image drag
var scaledWidth=image.width*zoom.scale;var scaledHeight=image.height*zoom.scale;if(scaledWidth<gesture.slideWidth&&scaledHeight<gesture.slideHeight)return;image.minX=Math.min(gesture.slideWidth/2-scaledWidth/2,0);image.maxX=-image.minX;image.minY=Math.min(gesture.slideHeight/2-scaledHeight/2,0);image.maxY=-image.minY;image.touchesCurrent.x=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;image.touchesCurrent.y=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(!image.isMoved&&!zoom.isScaling){if(swiper.isHorizontal()&&(Math.floor(image.minX)===Math.floor(image.startX)&&image.touchesCurrent.x<image.touchesStart.x||Math.floor(image.maxX)===Math.floor(image.startX)&&image.touchesCurrent.x>image.touchesStart.x)){image.isTouched=false;return;}else if(!swiper.isHorizontal()&&(Math.floor(image.minY)===Math.floor(image.startY)&&image.touchesCurrent.y<image.touchesStart.y||Math.floor(image.maxY)===Math.floor(image.startY)&&image.touchesCurrent.y>image.touchesStart.y)){image.isTouched=false;return;}}e.preventDefault();e.stopPropagation();image.isMoved=true;image.currentX=image.touchesCurrent.x-image.touchesStart.x+image.startX;image.currentY=image.touchesCurrent.y-image.touchesStart.y+image.startY;if(image.currentX<image.minX){image.currentX=image.minX+1-Math.pow(image.minX-image.currentX+1,0.8);}if(image.currentX>image.maxX){image.currentX=image.maxX-1+Math.pow(image.currentX-image.maxX+1,0.8);}if(image.currentY<image.minY){image.currentY=image.minY+1-Math.pow(image.minY-image.currentY+1,0.8);}if(image.currentY>image.maxY){image.currentY=image.maxY-1+Math.pow(image.currentY-image.maxY+1,0.8);}// Velocity
if(!velocity.prevPositionX)velocity.prevPositionX=image.touchesCurrent.x;if(!velocity.prevPositionY)velocity.prevPositionY=image.touchesCurrent.y;if(!velocity.prevTime)velocity.prevTime=Date.now();velocity.x=(image.touchesCurrent.x-velocity.prevPositionX)/(Date.now()-velocity.prevTime)/2;velocity.y=(image.touchesCurrent.y-velocity.prevPositionY)/(Date.now()-velocity.prevTime)/2;if(Math.abs(image.touchesCurrent.x-velocity.prevPositionX)<2)velocity.x=0;if(Math.abs(image.touchesCurrent.y-velocity.prevPositionY)<2)velocity.y=0;velocity.prevPositionX=image.touchesCurrent.x;velocity.prevPositionY=image.touchesCurrent.y;velocity.prevTime=Date.now();gesture.$imageWrapEl.transform('translate3d('+image.currentX+'px, '+image.currentY+'px,0)');},onTouchEnd:function onTouchEnd(){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture,image=zoom.image,velocity=zoom.velocity;if(!gesture.$imageEl||gesture.$imageEl.length===0)return;if(!image.isTouched||!image.isMoved){image.isTouched=false;image.isMoved=false;return;}image.isTouched=false;image.isMoved=false;var momentumDurationX=300;var momentumDurationY=300;var momentumDistanceX=velocity.x*momentumDurationX;var newPositionX=image.currentX+momentumDistanceX;var momentumDistanceY=velocity.y*momentumDurationY;var newPositionY=image.currentY+momentumDistanceY;// Fix duration
if(velocity.x!==0)momentumDurationX=Math.abs((newPositionX-image.currentX)/velocity.x);if(velocity.y!==0)momentumDurationY=Math.abs((newPositionY-image.currentY)/velocity.y);var momentumDuration=Math.max(momentumDurationX,momentumDurationY);image.currentX=newPositionX;image.currentY=newPositionY;// Define if we need image drag
var scaledWidth=image.width*zoom.scale;var scaledHeight=image.height*zoom.scale;image.minX=Math.min(gesture.slideWidth/2-scaledWidth/2,0);image.maxX=-image.minX;image.minY=Math.min(gesture.slideHeight/2-scaledHeight/2,0);image.maxY=-image.minY;image.currentX=Math.max(Math.min(image.currentX,image.maxX),image.minX);image.currentY=Math.max(Math.min(image.currentY,image.maxY),image.minY);gesture.$imageWrapEl.transition(momentumDuration).transform('translate3d('+image.currentX+'px, '+image.currentY+'px,0)');},onTransitionEnd:function onTransitionEnd(){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture;if(gesture.$slideEl&&swiper.previousIndex!==swiper.activeIndex){gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');gesture.$imageWrapEl.transform('translate3d(0,0,0)');gesture.$slideEl=undefined;gesture.$imageEl=undefined;gesture.$imageWrapEl=undefined;zoom.scale=1;zoom.currentScale=1;}},// Toggle Zoom
toggle:function toggle(e){var swiper=this;var zoom=swiper.zoom;if(zoom.scale&&zoom.scale!==1){// Zoom Out
zoom.out();}else{// Zoom In
zoom.in(e);}},in:function _in(e){var swiper=this;var zoom=swiper.zoom;var params=swiper.params.zoom;var gesture=zoom.gesture,image=zoom.image;if(!gesture.$slideEl){gesture.$slideEl=swiper.clickedSlide?Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.clickedSlide):swiper.slides.eq(swiper.activeIndex);gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent('.'+params.containerClass);}if(!gesture.$imageEl||gesture.$imageEl.length===0)return;gesture.$slideEl.addClass(''+params.zoomedSlideClass);var touchX=void 0;var touchY=void 0;var offsetX=void 0;var offsetY=void 0;var diffX=void 0;var diffY=void 0;var translateX=void 0;var translateY=void 0;var imageWidth=void 0;var imageHeight=void 0;var scaledWidth=void 0;var scaledHeight=void 0;var translateMinX=void 0;var translateMinY=void 0;var translateMaxX=void 0;var translateMaxY=void 0;var slideWidth=void 0;var slideHeight=void 0;if(typeof image.touchesStart.x==='undefined'&&e){touchX=e.type==='touchend'?e.changedTouches[0].pageX:e.pageX;touchY=e.type==='touchend'?e.changedTouches[0].pageY:e.pageY;}else{touchX=image.touchesStart.x;touchY=image.touchesStart.y;}zoom.scale=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;zoom.currentScale=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;if(e){slideWidth=gesture.$slideEl[0].offsetWidth;slideHeight=gesture.$slideEl[0].offsetHeight;offsetX=gesture.$slideEl.offset().left;offsetY=gesture.$slideEl.offset().top;diffX=offsetX+slideWidth/2-touchX;diffY=offsetY+slideHeight/2-touchY;imageWidth=gesture.$imageEl[0].offsetWidth;imageHeight=gesture.$imageEl[0].offsetHeight;scaledWidth=imageWidth*zoom.scale;scaledHeight=imageHeight*zoom.scale;translateMinX=Math.min(slideWidth/2-scaledWidth/2,0);translateMinY=Math.min(slideHeight/2-scaledHeight/2,0);translateMaxX=-translateMinX;translateMaxY=-translateMinY;translateX=diffX*zoom.scale;translateY=diffY*zoom.scale;if(translateX<translateMinX){translateX=translateMinX;}if(translateX>translateMaxX){translateX=translateMaxX;}if(translateY<translateMinY){translateY=translateMinY;}if(translateY>translateMaxY){translateY=translateMaxY;}}else{translateX=0;translateY=0;}gesture.$imageWrapEl.transition(300).transform('translate3d('+translateX+'px, '+translateY+'px,0)');gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale('+zoom.scale+')');},out:function out(){var swiper=this;var zoom=swiper.zoom;var params=swiper.params.zoom;var gesture=zoom.gesture;if(!gesture.$slideEl){gesture.$slideEl=swiper.clickedSlide?Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(swiper.clickedSlide):swiper.slides.eq(swiper.activeIndex);gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent('.'+params.containerClass);}if(!gesture.$imageEl||gesture.$imageEl.length===0)return;zoom.scale=1;zoom.currentScale=1;gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');gesture.$slideEl.removeClass(''+params.zoomedSlideClass);gesture.$slideEl=undefined;},// Attach/Detach Events
enable:function enable(){var swiper=this;var zoom=swiper.zoom;if(zoom.enabled)return;zoom.enabled=true;var slides=swiper.slides;var passiveListener=swiper.touchEvents.start==='touchstart'&&Support.passiveListener&&swiper.params.passiveListeners?{passive:true,capture:false}:false;// Scale image
if(Support.gestures){slides.on('gesturestart',zoom.onGestureStart,passiveListener);slides.on('gesturechange',zoom.onGestureChange,passiveListener);slides.on('gestureend',zoom.onGestureEnd,passiveListener);}else if(swiper.touchEvents.start==='touchstart'){slides.on(swiper.touchEvents.start,zoom.onGestureStart,passiveListener);slides.on(swiper.touchEvents.move,zoom.onGestureChange,passiveListener);slides.on(swiper.touchEvents.end,zoom.onGestureEnd,passiveListener);}// Move image
swiper.slides.each(function(index$$1,slideEl){var $slideEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl);if($slideEl.find('.'+swiper.params.zoom.containerClass).length>0){$slideEl.on(swiper.touchEvents.move,zoom.onTouchMove);}});},disable:function disable(){var swiper=this;var zoom=swiper.zoom;if(!zoom.enabled)return;swiper.zoom.enabled=false;var slides=swiper.slides;var passiveListener=swiper.touchEvents.start==='touchstart'&&Support.passiveListener&&swiper.params.passiveListeners?{passive:true,capture:false}:false;// Scale image
if(Support.gestures){slides.off('gesturestart',zoom.onGestureStart,passiveListener);slides.off('gesturechange',zoom.onGestureChange,passiveListener);slides.off('gestureend',zoom.onGestureEnd,passiveListener);}else if(swiper.touchEvents.start==='touchstart'){slides.off(swiper.touchEvents.start,zoom.onGestureStart,passiveListener);slides.off(swiper.touchEvents.move,zoom.onGestureChange,passiveListener);slides.off(swiper.touchEvents.end,zoom.onGestureEnd,passiveListener);}// Move image
swiper.slides.each(function(index$$1,slideEl){var $slideEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl);if($slideEl.find('.'+swiper.params.zoom.containerClass).length>0){$slideEl.off(swiper.touchEvents.move,zoom.onTouchMove);}});}};var Zoom$1={name:'zoom',params:{zoom:{enabled:false,maxRatio:3,minRatio:1,toggle:true,containerClass:'swiper-zoom-container',zoomedSlideClass:'swiper-slide-zoomed'}},create:function create(){var swiper=this;var zoom={enabled:false,scale:1,currentScale:1,isScaling:false,gesture:{$slideEl:undefined,slideWidth:undefined,slideHeight:undefined,$imageEl:undefined,$imageWrapEl:undefined,maxRatio:3},image:{isTouched:undefined,isMoved:undefined,currentX:undefined,currentY:undefined,minX:undefined,minY:undefined,maxX:undefined,maxY:undefined,width:undefined,height:undefined,startX:undefined,startY:undefined,touchesStart:{},touchesCurrent:{}},velocity:{x:undefined,y:undefined,prevPositionX:undefined,prevPositionY:undefined,prevTime:undefined}};'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function(methodName){zoom[methodName]=Zoom[methodName].bind(swiper);});Utils.extend(swiper,{zoom:zoom});},on:{init:function init(){var swiper=this;if(swiper.params.zoom.enabled){swiper.zoom.enable();}},destroy:function destroy(){var swiper=this;swiper.zoom.disable();},touchStart:function touchStart(e){var swiper=this;if(!swiper.zoom.enabled)return;swiper.zoom.onTouchStart(e);},touchEnd:function touchEnd(e){var swiper=this;if(!swiper.zoom.enabled)return;swiper.zoom.onTouchEnd(e);},doubleTap:function doubleTap(e){var swiper=this;if(swiper.params.zoom.enabled&&swiper.zoom.enabled&&swiper.params.zoom.toggle){swiper.zoom.toggle(e);}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.zoom.enabled&&swiper.params.zoom.enabled){swiper.zoom.onTransitionEnd();}}}};var Lazy={loadInSlide:function loadInSlide(index$$1){var loadInDuplicate=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var swiper=this;var params=swiper.params.lazy;if(typeof index$$1==='undefined')return;if(swiper.slides.length===0)return;var isVirtual=swiper.virtual&&swiper.params.virtual.enabled;var $slideEl=isVirtual?swiper.$wrapperEl.children('.'+swiper.params.slideClass+'[data-swiper-slide-index="'+index$$1+'"]'):swiper.slides.eq(index$$1);var $images=$slideEl.find('.'+params.elementClass+':not(.'+params.loadedClass+'):not(.'+params.loadingClass+')');if($slideEl.hasClass(params.elementClass)&&!$slideEl.hasClass(params.loadedClass)&&!$slideEl.hasClass(params.loadingClass)){$images=$images.add($slideEl[0]);}if($images.length===0)return;$images.each(function(imageIndex,imageEl){var $imageEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(imageEl);$imageEl.addClass(params.loadingClass);var background=$imageEl.attr('data-background');var src=$imageEl.attr('data-src');var srcset=$imageEl.attr('data-srcset');var sizes=$imageEl.attr('data-sizes');swiper.loadImage($imageEl[0],src||background,srcset,sizes,false,function(){if(typeof swiper==='undefined'||swiper===null||!swiper||swiper&&!swiper.params||swiper.destroyed)return;if(background){$imageEl.css('background-image','url("'+background+'")');$imageEl.removeAttr('data-background');}else{if(srcset){$imageEl.attr('srcset',srcset);$imageEl.removeAttr('data-srcset');}if(sizes){$imageEl.attr('sizes',sizes);$imageEl.removeAttr('data-sizes');}if(src){$imageEl.attr('src',src);$imageEl.removeAttr('data-src');}}$imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);$slideEl.find('.'+params.preloaderClass).remove();if(swiper.params.loop&&loadInDuplicate){var slideOriginalIndex=$slideEl.attr('data-swiper-slide-index');if($slideEl.hasClass(swiper.params.slideDuplicateClass)){var originalSlide=swiper.$wrapperEl.children('[data-swiper-slide-index="'+slideOriginalIndex+'"]:not(.'+swiper.params.slideDuplicateClass+')');swiper.lazy.loadInSlide(originalSlide.index(),false);}else{var duplicatedSlide=swiper.$wrapperEl.children('.'+swiper.params.slideDuplicateClass+'[data-swiper-slide-index="'+slideOriginalIndex+'"]');swiper.lazy.loadInSlide(duplicatedSlide.index(),false);}}swiper.emit('lazyImageReady',$slideEl[0],$imageEl[0]);});swiper.emit('lazyImageLoad',$slideEl[0],$imageEl[0]);});},load:function load(){var swiper=this;var $wrapperEl=swiper.$wrapperEl,swiperParams=swiper.params,slides=swiper.slides,activeIndex=swiper.activeIndex;var isVirtual=swiper.virtual&&swiperParams.virtual.enabled;var params=swiperParams.lazy;var slidesPerView=swiperParams.slidesPerView;if(slidesPerView==='auto'){slidesPerView=0;}function slideExist(index$$1){if(isVirtual){if($wrapperEl.children('.'+swiperParams.slideClass+'[data-swiper-slide-index="'+index$$1+'"]').length){return true;}}else if(slides[index$$1])return true;return false;}function slideIndex(slideEl){if(isVirtual){return Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl).attr('data-swiper-slide-index');}return Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl).index();}if(!swiper.lazy.initialImageLoaded)swiper.lazy.initialImageLoaded=true;if(swiper.params.watchSlidesVisibility){$wrapperEl.children('.'+swiperParams.slideVisibleClass).each(function(elIndex,slideEl){var index$$1=isVirtual?Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl).attr('data-swiper-slide-index'):Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(slideEl).index();swiper.lazy.loadInSlide(index$$1);});}else if(slidesPerView>1){for(var i=activeIndex;i<activeIndex+slidesPerView;i+=1){if(slideExist(i))swiper.lazy.loadInSlide(i);}}else{swiper.lazy.loadInSlide(activeIndex);}if(params.loadPrevNext){if(slidesPerView>1||params.loadPrevNextAmount&&params.loadPrevNextAmount>1){var amount=params.loadPrevNextAmount;var spv=slidesPerView;var maxIndex=Math.min(activeIndex+spv+Math.max(amount,spv),slides.length);var minIndex=Math.max(activeIndex-Math.max(spv,amount),0);// Next Slides
for(var _i8=activeIndex+slidesPerView;_i8<maxIndex;_i8+=1){if(slideExist(_i8))swiper.lazy.loadInSlide(_i8);}// Prev Slides
for(var _i9=minIndex;_i9<activeIndex;_i9+=1){if(slideExist(_i9))swiper.lazy.loadInSlide(_i9);}}else{var nextSlide=$wrapperEl.children('.'+swiperParams.slideNextClass);if(nextSlide.length>0)swiper.lazy.loadInSlide(slideIndex(nextSlide));var prevSlide=$wrapperEl.children('.'+swiperParams.slidePrevClass);if(prevSlide.length>0)swiper.lazy.loadInSlide(slideIndex(prevSlide));}}}};var Lazy$1={name:'lazy',params:{lazy:{enabled:false,loadPrevNext:false,loadPrevNextAmount:1,loadOnTransitionStart:false,elementClass:'swiper-lazy',loadingClass:'swiper-lazy-loading',loadedClass:'swiper-lazy-loaded',preloaderClass:'swiper-lazy-preloader'}},create:function create(){var swiper=this;Utils.extend(swiper,{lazy:{initialImageLoaded:false,load:Lazy.load.bind(swiper),loadInSlide:Lazy.loadInSlide.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.lazy.enabled&&swiper.params.preloadImages){swiper.params.preloadImages=false;}},init:function init(){var swiper=this;if(swiper.params.lazy.enabled&&!swiper.params.loop&&swiper.params.initialSlide===0){swiper.lazy.load();}},scroll:function scroll(){var swiper=this;if(swiper.params.freeMode&&!swiper.params.freeModeSticky){swiper.lazy.load();}},resize:function resize(){var swiper=this;if(swiper.params.lazy.enabled){swiper.lazy.load();}},scrollbarDragMove:function scrollbarDragMove(){var swiper=this;if(swiper.params.lazy.enabled){swiper.lazy.load();}},transitionStart:function transitionStart(){var swiper=this;if(swiper.params.lazy.enabled){if(swiper.params.lazy.loadOnTransitionStart||!swiper.params.lazy.loadOnTransitionStart&&!swiper.lazy.initialImageLoaded){swiper.lazy.load();}}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.params.lazy.enabled&&!swiper.params.lazy.loadOnTransitionStart){swiper.lazy.load();}}}};/* eslint no-bitwise: ["error", { "allow": [">>"] }] */var Controller={LinearSpline:function LinearSpline(x,y){var binarySearch=function search(){var maxIndex=void 0;var minIndex=void 0;var guess=void 0;return function(array,val){minIndex=-1;maxIndex=array.length;while(maxIndex-minIndex>1){guess=maxIndex+minIndex>>1;if(array[guess]<=val){minIndex=guess;}else{maxIndex=guess;}}return maxIndex;};}();this.x=x;this.y=y;this.lastIndex=x.length-1;// Given an x value (x2), return the expected y2 value:
// (x1,y1) is the known point before given value,
// (x3,y3) is the known point after given value.
var i1=void 0;var i3=void 0;this.interpolate=function interpolate(x2){if(!x2)return 0;// Get the indexes of x1 and x3 (the array indexes before and after given x2):
i3=binarySearch(this.x,x2);i1=i3-1;// We have our indexes i1 & i3, so we can calculate already:
// y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
return(x2-this.x[i1])*(this.y[i3]-this.y[i1])/(this.x[i3]-this.x[i1])+this.y[i1];};return this;},// xxx: for now i will just save one spline function to to
getInterpolateFunction:function getInterpolateFunction(c){var swiper=this;if(!swiper.controller.spline){swiper.controller.spline=swiper.params.loop?new Controller.LinearSpline(swiper.slidesGrid,c.slidesGrid):new Controller.LinearSpline(swiper.snapGrid,c.snapGrid);}},setTranslate:function setTranslate(_setTranslate,byController){var swiper=this;var controlled=swiper.controller.control;var multiplier=void 0;var controlledTranslate=void 0;function setControlledTranslate(c){// this will create an Interpolate function based on the snapGrids
// x is the Grid of the scrolled scroller and y will be the controlled scroller
// it makes sense to create this only once and recall it for the interpolation
// the function does a lot of value caching for performance
var translate=c.rtl&&c.params.direction==='horizontal'?-swiper.translate:swiper.translate;if(swiper.params.controller.by==='slide'){swiper.controller.getInterpolateFunction(c);// i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
// but it did not work out
controlledTranslate=-swiper.controller.spline.interpolate(-translate);}if(!controlledTranslate||swiper.params.controller.by==='container'){multiplier=(c.maxTranslate()-c.minTranslate())/(swiper.maxTranslate()-swiper.minTranslate());controlledTranslate=(translate-swiper.minTranslate())*multiplier+c.minTranslate();}if(swiper.params.controller.inverse){controlledTranslate=c.maxTranslate()-controlledTranslate;}c.updateProgress(controlledTranslate);c.setTranslate(controlledTranslate,swiper);c.updateActiveIndex();c.updateSlidesClasses();}if(Array.isArray(controlled)){for(var i=0;i<controlled.length;i+=1){if(controlled[i]!==byController&&controlled[i]instanceof Swiper$1){setControlledTranslate(controlled[i]);}}}else if(controlled instanceof Swiper$1&&byController!==controlled){setControlledTranslate(controlled);}},setTransition:function setTransition(duration,byController){var swiper=this;var controlled=swiper.controller.control;var i=void 0;function setControlledTransition(c){c.setTransition(duration,swiper);if(duration!==0){c.transitionStart();c.$wrapperEl.transitionEnd(function(){if(!controlled)return;if(c.params.loop&&swiper.params.controller.by==='slide'){c.loopFix();}c.transitionEnd();});}}if(Array.isArray(controlled)){for(i=0;i<controlled.length;i+=1){if(controlled[i]!==byController&&controlled[i]instanceof Swiper$1){setControlledTransition(controlled[i]);}}}else if(controlled instanceof Swiper$1&&byController!==controlled){setControlledTransition(controlled);}}};var Controller$1={name:'controller',params:{controller:{control:undefined,inverse:false,by:'slide'// or 'container'
}},create:function create(){var swiper=this;Utils.extend(swiper,{controller:{control:swiper.params.controller.control,getInterpolateFunction:Controller.getInterpolateFunction.bind(swiper),setTranslate:Controller.setTranslate.bind(swiper),setTransition:Controller.setTransition.bind(swiper)}});},on:{update:function update(){var swiper=this;if(!swiper.controller.control)return;if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},resize:function resize(){var swiper=this;if(!swiper.controller.control)return;if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},observerUpdate:function observerUpdate(){var swiper=this;if(!swiper.controller.control)return;if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},setTranslate:function setTranslate(translate,byController){var swiper=this;if(!swiper.controller.control)return;swiper.controller.setTranslate(translate,byController);},setTransition:function setTransition(duration,byController){var swiper=this;if(!swiper.controller.control)return;swiper.controller.setTransition(duration,byController);}}};var a11y={makeElFocusable:function makeElFocusable($el){$el.attr('tabIndex','0');return $el;},addElRole:function addElRole($el,role){$el.attr('role',role);return $el;},addElLabel:function addElLabel($el,label){$el.attr('aria-label',label);return $el;},disableEl:function disableEl($el){$el.attr('aria-disabled',true);return $el;},enableEl:function enableEl($el){$el.attr('aria-disabled',false);return $el;},onEnterKey:function onEnterKey(e){var swiper=this;var params=swiper.params.a11y;if(e.keyCode!==13)return;var $targetEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(e.target);if(swiper.navigation&&swiper.navigation.$nextEl&&$targetEl.is(swiper.navigation.$nextEl)){if(!(swiper.isEnd&&!swiper.params.loop)){swiper.slideNext();}if(swiper.isEnd){swiper.a11y.notify(params.lastSlideMessage);}else{swiper.a11y.notify(params.nextSlideMessage);}}if(swiper.navigation&&swiper.navigation.$prevEl&&$targetEl.is(swiper.navigation.$prevEl)){if(!(swiper.isBeginning&&!swiper.params.loop)){swiper.slidePrev();}if(swiper.isBeginning){swiper.a11y.notify(params.firstSlideMessage);}else{swiper.a11y.notify(params.prevSlideMessage);}}if(swiper.pagination&&$targetEl.is('.'+swiper.params.pagination.bulletClass)){$targetEl[0].click();}},notify:function notify(message){var swiper=this;var notification=swiper.a11y.liveRegion;if(notification.length===0)return;notification.html('');notification.html(message);},updateNavigation:function updateNavigation(){var swiper=this;if(swiper.params.loop)return;var _swiper$navigation4=swiper.navigation,$nextEl=_swiper$navigation4.$nextEl,$prevEl=_swiper$navigation4.$prevEl;if($prevEl&&$prevEl.length>0){if(swiper.isBeginning){swiper.a11y.disableEl($prevEl);}else{swiper.a11y.enableEl($prevEl);}}if($nextEl&&$nextEl.length>0){if(swiper.isEnd){swiper.a11y.disableEl($nextEl);}else{swiper.a11y.enableEl($nextEl);}}},updatePagination:function updatePagination(){var swiper=this;var params=swiper.params.a11y;if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.bullets.each(function(bulletIndex,bulletEl){var $bulletEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(bulletEl);swiper.a11y.makeElFocusable($bulletEl);swiper.a11y.addElRole($bulletEl,'button');swiper.a11y.addElLabel($bulletEl,params.paginationBulletMessage.replace(/{{index}}/,$bulletEl.index()+1));});}},init:function init(){var swiper=this;swiper.$el.append(swiper.a11y.liveRegion);// Navigation
var params=swiper.params.a11y;var $nextEl=void 0;var $prevEl=void 0;if(swiper.navigation&&swiper.navigation.$nextEl){$nextEl=swiper.navigation.$nextEl;}if(swiper.navigation&&swiper.navigation.$prevEl){$prevEl=swiper.navigation.$prevEl;}if($nextEl){swiper.a11y.makeElFocusable($nextEl);swiper.a11y.addElRole($nextEl,'button');swiper.a11y.addElLabel($nextEl,params.nextSlideMessage);$nextEl.on('keydown',swiper.a11y.onEnterKey);}if($prevEl){swiper.a11y.makeElFocusable($prevEl);swiper.a11y.addElRole($prevEl,'button');swiper.a11y.addElLabel($prevEl,params.prevSlideMessage);$prevEl.on('keydown',swiper.a11y.onEnterKey);}// Pagination
if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.$el.on('keydown','.'+swiper.params.pagination.bulletClass,swiper.a11y.onEnterKey);}},destroy:function destroy(){var swiper=this;if(swiper.a11y.liveRegion&&swiper.a11y.liveRegion.length>0)swiper.a11y.liveRegion.remove();var $nextEl=void 0;var $prevEl=void 0;if(swiper.navigation&&swiper.navigation.$nextEl){$nextEl=swiper.navigation.$nextEl;}if(swiper.navigation&&swiper.navigation.$prevEl){$prevEl=swiper.navigation.$prevEl;}if($nextEl){$nextEl.off('keydown',swiper.a11y.onEnterKey);}if($prevEl){$prevEl.off('keydown',swiper.a11y.onEnterKey);}// Pagination
if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.$el.off('keydown','.'+swiper.params.pagination.bulletClass,swiper.a11y.onEnterKey);}}};var A11y={name:'a11y',params:{a11y:{enabled:false,notificationClass:'swiper-notification',prevSlideMessage:'Previous slide',nextSlideMessage:'Next slide',firstSlideMessage:'This is the first slide',lastSlideMessage:'This is the last slide',paginationBulletMessage:'Go to slide {{index}}'}},create:function create(){var swiper=this;Utils.extend(swiper,{a11y:{liveRegion:Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<span class="'+swiper.params.a11y.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>')}});Object.keys(a11y).forEach(function(methodName){swiper.a11y[methodName]=a11y[methodName].bind(swiper);});},on:{init:function init(){var swiper=this;if(!swiper.params.a11y.enabled)return;swiper.a11y.init();swiper.a11y.updateNavigation();},toEdge:function toEdge(){var swiper=this;if(!swiper.params.a11y.enabled)return;swiper.a11y.updateNavigation();},fromEdge:function fromEdge(){var swiper=this;if(!swiper.params.a11y.enabled)return;swiper.a11y.updateNavigation();},paginationUpdate:function paginationUpdate(){var swiper=this;if(!swiper.params.a11y.enabled)return;swiper.a11y.updatePagination();},destroy:function destroy(){var swiper=this;if(!swiper.params.a11y.enabled)return;swiper.a11y.destroy();}}};var History={init:function init(){var swiper=this;if(!swiper.params.history)return;if(!win.history||!win.history.pushState){swiper.params.history.enabled=false;swiper.params.hashNavigation.enabled=true;return;}var history=swiper.history;history.initialized=true;history.paths=History.getPathValues();if(!history.paths.key&&!history.paths.value)return;history.scrollToSlide(0,history.paths.value,swiper.params.runCallbacksOnInit);if(!swiper.params.history.replaceState){win.addEventListener('popstate',swiper.history.setHistoryPopState);}},destroy:function destroy(){var swiper=this;if(!swiper.params.history.replaceState){win.removeEventListener('popstate',swiper.history.setHistoryPopState);}},setHistoryPopState:function setHistoryPopState(){var swiper=this;swiper.history.paths=History.getPathValues();swiper.history.scrollToSlide(swiper.params.speed,swiper.history.paths.value,false);},getPathValues:function getPathValues(){var pathArray=win.location.pathname.slice(1).split('/').filter(function(part){return part!=='';});var total=pathArray.length;var key=pathArray[total-2];var value=pathArray[total-1];return{key:key,value:value};},setHistory:function setHistory(key,index$$1){var swiper=this;if(!swiper.history.initialized||!swiper.params.history.enabled)return;var slide=swiper.slides.eq(index$$1);var value=History.slugify(slide.attr('data-history'));if(!win.location.pathname.includes(key)){value=key+'/'+value;}var currentState=win.history.state;if(currentState&&currentState.value===value){return;}if(swiper.params.history.replaceState){win.history.replaceState({value:value},null,value);}else{win.history.pushState({value:value},null,value);}},slugify:function slugify(text$$1){return text$$1.toString().toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'').replace(/--+/g,'-').replace(/^-+/,'').replace(/-+$/,'');},scrollToSlide:function scrollToSlide(speed,value,runCallbacks){var swiper=this;if(value){for(var i=0,length=swiper.slides.length;i<length;i+=1){var _slide3=swiper.slides.eq(i);var slideHistory=History.slugify(_slide3.attr('data-history'));if(slideHistory===value&&!_slide3.hasClass(swiper.params.slideDuplicateClass)){var index$$1=_slide3.index();swiper.slideTo(index$$1,speed,runCallbacks);}}}else{swiper.slideTo(0,speed,runCallbacks);}}};var History$1={name:'history',params:{history:{enabled:false,replaceState:false,key:'slides'}},create:function create(){var swiper=this;Utils.extend(swiper,{history:{init:History.init.bind(swiper),setHistory:History.setHistory.bind(swiper),setHistoryPopState:History.setHistoryPopState.bind(swiper),scrollToSlide:History.scrollToSlide.bind(swiper),destroy:History.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.history.enabled){swiper.history.init();}},destroy:function destroy(){var swiper=this;if(swiper.params.history.enabled){swiper.history.destroy();}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.history.initialized){swiper.history.setHistory(swiper.params.history.key,swiper.activeIndex);}}}};var HashNavigation={onHashCange:function onHashCange(){var swiper=this;var newHash=doc.location.hash.replace('#','');var activeSlideHash=swiper.slides.eq(swiper.activeIndex).attr('data-hash');if(newHash!==activeSlideHash){swiper.slideTo(swiper.$wrapperEl.children('.'+swiper.params.slideClass+'[data-hash="'+newHash+'"]').index());}},setHash:function setHash(){var swiper=this;if(!swiper.hashNavigation.initialized||!swiper.params.hashNavigation.enabled)return;if(swiper.params.hashNavigation.replaceState&&win.history&&win.history.replaceState){win.history.replaceState(null,null,'#'+swiper.slides.eq(swiper.activeIndex).attr('data-hash')||'');}else{var _slide4=swiper.slides.eq(swiper.activeIndex);var hash=_slide4.attr('data-hash')||_slide4.attr('data-history');doc.location.hash=hash||'';}},init:function init(){var swiper=this;if(!swiper.params.hashNavigation.enabled||swiper.params.history&&swiper.params.history.enabled)return;swiper.hashNavigation.initialized=true;var hash=doc.location.hash.replace('#','');if(hash){var speed=0;for(var i=0,length=swiper.slides.length;i<length;i+=1){var _slide5=swiper.slides.eq(i);var slideHash=_slide5.attr('data-hash')||_slide5.attr('data-history');if(slideHash===hash&&!_slide5.hasClass(swiper.params.slideDuplicateClass)){var index$$1=_slide5.index();swiper.slideTo(index$$1,speed,swiper.params.runCallbacksOnInit,true);}}}if(swiper.params.hashNavigation.watchState){Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(win).on('hashchange',swiper.hashNavigation.onHashCange);}},destroy:function destroy(){var swiper=this;if(swiper.params.hashNavigation.watchState){Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])(win).off('hashchange',swiper.hashNavigation.onHashCange);}}};var HashNavigation$1={name:'hash-navigation',params:{hashNavigation:{enabled:false,replaceState:false,watchState:false}},create:function create(){var swiper=this;Utils.extend(swiper,{hashNavigation:{initialized:false,init:HashNavigation.init.bind(swiper),destroy:HashNavigation.destroy.bind(swiper),setHash:HashNavigation.setHash.bind(swiper),onHashCange:HashNavigation.onHashCange.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.hashNavigation.enabled){swiper.hashNavigation.init();}},destroy:function destroy(){var swiper=this;if(swiper.params.hashNavigation.enabled){swiper.hashNavigation.destroy();}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.hashNavigation.initialized){swiper.hashNavigation.setHash();}}}};var Autoplay={run:function run(){var swiper=this;var $activeSlideEl=swiper.slides.eq(swiper.activeIndex);var delay=swiper.params.autoplay.delay;if($activeSlideEl.attr('data-swiper-autoplay')){delay=$activeSlideEl.attr('data-swiper-autoplay')||swiper.params.autoplay.delay;}swiper.autoplay.timeout=Utils.nextTick(function(){if(swiper.params.loop){swiper.loopFix();swiper.slideNext(swiper.params.speed,true,true);swiper.emit('autoplay');}else if(!swiper.isEnd){swiper.slideNext(swiper.params.speed,true,true);swiper.emit('autoplay');}else if(!swiper.params.autoplay.stopOnLastSlide){swiper.slideTo(0,swiper.params.speed,true,true);swiper.emit('autoplay');}else{swiper.autoplay.stop();}},delay);},start:function start(){var swiper=this;if(typeof swiper.autoplay.timeout!=='undefined')return false;if(swiper.autoplay.running)return false;swiper.autoplay.running=true;swiper.emit('autoplayStart');swiper.autoplay.run();return true;},stop:function stop(){var swiper=this;if(!swiper.autoplay.running)return false;if(typeof swiper.autoplay.timeout==='undefined')return false;if(swiper.autoplay.timeout){clearTimeout(swiper.autoplay.timeout);swiper.autoplay.timeout=undefined;}swiper.autoplay.running=false;swiper.emit('autoplayStop');return true;},pause:function pause(speed){var swiper=this;if(!swiper.autoplay.running)return;if(swiper.autoplay.paused)return;if(swiper.autoplay.timeout)clearTimeout(swiper.autoplay.timeout);swiper.autoplay.paused=true;if(speed===0){swiper.autoplay.paused=false;swiper.autoplay.run();}else{swiper.$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed)return;swiper.autoplay.paused=false;if(!swiper.autoplay.running){swiper.autoplay.stop();}else{swiper.autoplay.run();}});}}};var Autoplay$1={name:'autoplay',params:{autoplay:{enabled:false,delay:3000,disableOnInteraction:true,stopOnLastSlide:false}},create:function create(){var swiper=this;Utils.extend(swiper,{autoplay:{running:false,paused:false,run:Autoplay.run.bind(swiper),start:Autoplay.start.bind(swiper),stop:Autoplay.stop.bind(swiper),pause:Autoplay.pause.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.autoplay.enabled){swiper.autoplay.start();}},beforeTransitionStart:function beforeTransitionStart(speed,internal){var swiper=this;if(swiper.autoplay.running){if(internal||!swiper.params.autoplay.disableOnInteraction){swiper.autoplay.pause(speed);}else{swiper.autoplay.stop();}}},sliderFirstMove:function sliderFirstMove(){var swiper=this;if(swiper.autoplay.running){if(swiper.params.autoplay.disableOnInteraction){swiper.autoplay.stop();}else{swiper.autoplay.pause();}}},destroy:function destroy(){var swiper=this;if(swiper.autoplay.running){swiper.autoplay.stop();}}}};var Fade={setTranslate:function setTranslate(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){var $slideEl=swiper.slides.eq(i);var offset$$1=$slideEl[0].swiperSlideOffset;var tx=-offset$$1;if(!swiper.params.virtualTranslate)tx-=swiper.translate;var ty=0;if(!swiper.isHorizontal()){ty=tx;tx=0;}var slideOpacity=swiper.params.fadeEffect.crossFade?Math.max(1-Math.abs($slideEl[0].progress),0):1+Math.min(Math.max($slideEl[0].progress,-1),0);$slideEl.css({opacity:slideOpacity}).transform('translate3d('+tx+'px, '+ty+'px, 0px)');}},setTransition:function setTransition(duration){var swiper=this;var slides=swiper.slides,$wrapperEl=swiper.$wrapperEl;slides.transition(duration);if(swiper.params.virtualTranslate&&duration!==0){var eventTriggered=false;slides.transitionEnd(function(){if(eventTriggered)return;if(!swiper||swiper.destroyed)return;eventTriggered=true;swiper.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend'];for(var i=0;i<triggerEvents.length;i+=1){$wrapperEl.trigger(triggerEvents[i]);}});}}};var EffectFade={name:'effect-fade',params:{fadeEffect:{crossFade:false}},create:function create(){var swiper=this;Utils.extend(swiper,{fadeEffect:{setTranslate:Fade.setTranslate.bind(swiper),setTransition:Fade.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='fade')return;swiper.classNames.push(swiper.params.containerModifierClass+'fade');var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,spaceBetween:0,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='fade')return;swiper.fadeEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='fade')return;swiper.fadeEffect.setTransition(duration);}}};var Cube={setTranslate:function setTranslate(){var swiper=this;var $el=swiper.$el,$wrapperEl=swiper.$wrapperEl,slides=swiper.slides,swiperWidth=swiper.width,swiperHeight=swiper.height,rtl=swiper.rtl,swiperSize=swiper.size;var params=swiper.params.cubeEffect;var isHorizontal=swiper.isHorizontal();var isVirtual=swiper.virtual&&swiper.params.virtual.enabled;var wrapperRotate=0;var $cubeShadowEl=void 0;if(params.shadow){if(isHorizontal){$cubeShadowEl=$wrapperEl.find('.swiper-cube-shadow');if($cubeShadowEl.length===0){$cubeShadowEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-cube-shadow"></div>');$wrapperEl.append($cubeShadowEl);}$cubeShadowEl.css({height:swiperWidth+'px'});}else{$cubeShadowEl=$el.find('.swiper-cube-shadow');if($cubeShadowEl.length===0){$cubeShadowEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-cube-shadow"></div>');$el.append($cubeShadowEl);}}}for(var i=0;i<slides.length;i+=1){var $slideEl=slides.eq(i);var slideIndex=i;if(isVirtual){slideIndex=parseInt($slideEl.attr('data-swiper-slide-index'),10);}var slideAngle=slideIndex*90;var round=Math.floor(slideAngle/360);if(rtl){slideAngle=-slideAngle;round=Math.floor(-slideAngle/360);}var progress=Math.max(Math.min($slideEl[0].progress,1),-1);var tx=0;var ty=0;var tz=0;if(slideIndex%4===0){tx=-round*4*swiperSize;tz=0;}else if((slideIndex-1)%4===0){tx=0;tz=-round*4*swiperSize;}else if((slideIndex-2)%4===0){tx=swiperSize+round*4*swiperSize;tz=swiperSize;}else if((slideIndex-3)%4===0){tx=-swiperSize;tz=3*swiperSize+swiperSize*4*round;}if(rtl){tx=-tx;}if(!isHorizontal){ty=tx;tx=0;}var transform$$1='rotateX('+(isHorizontal?0:-slideAngle)+'deg) rotateY('+(isHorizontal?slideAngle:0)+'deg) translate3d('+tx+'px, '+ty+'px, '+tz+'px)';if(progress<=1&&progress>-1){wrapperRotate=slideIndex*90+progress*90;if(rtl)wrapperRotate=-slideIndex*90-progress*90;}$slideEl.transform(transform$$1);if(params.slideShadows){// Set shadows
var shadowBefore=isHorizontal?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var shadowAfter=isHorizontal?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(isHorizontal?'left':'top')+'"></div>');$slideEl.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(isHorizontal?'right':'bottom')+'"></div>');$slideEl.append(shadowAfter);}if(shadowBefore.length)shadowBefore[0].style.opacity=Math.max(-progress,0);if(shadowAfter.length)shadowAfter[0].style.opacity=Math.max(progress,0);}}$wrapperEl.css({'-webkit-transform-origin':'50% 50% -'+swiperSize/2+'px','-moz-transform-origin':'50% 50% -'+swiperSize/2+'px','-ms-transform-origin':'50% 50% -'+swiperSize/2+'px','transform-origin':'50% 50% -'+swiperSize/2+'px'});if(params.shadow){if(isHorizontal){$cubeShadowEl.transform('translate3d(0px, '+(swiperWidth/2+params.shadowOffset)+'px, '+-swiperWidth/2+'px) rotateX(90deg) rotateZ(0deg) scale('+params.shadowScale+')');}else{var shadowAngle=Math.abs(wrapperRotate)-Math.floor(Math.abs(wrapperRotate)/90)*90;var multiplier=1.5-(Math.sin(shadowAngle*2*Math.PI/360)/2+Math.cos(shadowAngle*2*Math.PI/360)/2);var scale1=params.shadowScale;var scale2=params.shadowScale/multiplier;var offset$$1=params.shadowOffset;$cubeShadowEl.transform('scale3d('+scale1+', 1, '+scale2+') translate3d(0px, '+(swiperHeight/2+offset$$1)+'px, '+-swiperHeight/2/scale2+'px) rotateX(-90deg)');}}var zFactor=Browser.isSafari||Browser.isUiWebView?-swiperSize/2:0;$wrapperEl.transform('translate3d(0px,0,'+zFactor+'px) rotateX('+(swiper.isHorizontal()?0:wrapperRotate)+'deg) rotateY('+(swiper.isHorizontal()?-wrapperRotate:0)+'deg)');},setTransition:function setTransition(duration){var swiper=this;var $el=swiper.$el,slides=swiper.slides;slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(swiper.params.cubeEffect.shadow&&!swiper.isHorizontal()){$el.find('.swiper-cube-shadow').transition(duration);}}};var EffectCube={name:'effect-cube',params:{cubeEffect:{slideShadows:true,shadow:true,shadowOffset:20,shadowScale:0.94}},create:function create(){var swiper=this;Utils.extend(swiper,{cubeEffect:{setTranslate:Cube.setTranslate.bind(swiper),setTransition:Cube.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='cube')return;swiper.classNames.push(swiper.params.containerModifierClass+'cube');swiper.classNames.push(swiper.params.containerModifierClass+'3d');var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,resistanceRatio:0,spaceBetween:0,centeredSlides:false,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='cube')return;swiper.cubeEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='cube')return;swiper.cubeEffect.setTransition(duration);}}};var Flip={setTranslate:function setTranslate(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){var $slideEl=slides.eq(i);var progress=$slideEl[0].progress;if(swiper.params.flipEffect.limitRotation){progress=Math.max(Math.min($slideEl[0].progress,1),-1);}var offset$$1=$slideEl[0].swiperSlideOffset;var rotate=-180*progress;var rotateY=rotate;var rotateX=0;var tx=-offset$$1;var ty=0;if(!swiper.isHorizontal()){ty=tx;tx=0;rotateX=-rotateY;rotateY=0;}else if(swiper.rtl){rotateY=-rotateY;}$slideEl[0].style.zIndex=-Math.abs(Math.round(progress))+slides.length;if(swiper.params.flipEffect.slideShadows){// Set shadows
var shadowBefore=swiper.isHorizontal()?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var shadowAfter=swiper.isHorizontal()?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(swiper.isHorizontal()?'left':'top')+'"></div>');$slideEl.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(swiper.isHorizontal()?'right':'bottom')+'"></div>');$slideEl.append(shadowAfter);}if(shadowBefore.length)shadowBefore[0].style.opacity=Math.max(-progress,0);if(shadowAfter.length)shadowAfter[0].style.opacity=Math.max(progress,0);}$slideEl.transform('translate3d('+tx+'px, '+ty+'px, 0px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');}},setTransition:function setTransition(duration){var swiper=this;var slides=swiper.slides,activeIndex=swiper.activeIndex,$wrapperEl=swiper.$wrapperEl;slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(swiper.params.virtualTranslate&&duration!==0){var eventTriggered=false;// eslint-disable-next-line
slides.eq(activeIndex).transitionEnd(function onTransitionEnd(){if(eventTriggered)return;if(!swiper||swiper.destroyed)return;// if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
eventTriggered=true;swiper.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend'];for(var i=0;i<triggerEvents.length;i+=1){$wrapperEl.trigger(triggerEvents[i]);}});}}};var EffectFlip={name:'effect-flip',params:{flipEffect:{slideShadows:true,limitRotation:true}},create:function create(){var swiper=this;Utils.extend(swiper,{flipEffect:{setTranslate:Flip.setTranslate.bind(swiper),setTransition:Flip.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='flip')return;swiper.classNames.push(swiper.params.containerModifierClass+'flip');swiper.classNames.push(swiper.params.containerModifierClass+'3d');var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,spaceBetween:0,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='flip')return;swiper.flipEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='flip')return;swiper.flipEffect.setTransition(duration);}}};var Coverflow={setTranslate:function setTranslate(){var swiper=this;var swiperWidth=swiper.width,swiperHeight=swiper.height,slides=swiper.slides,$wrapperEl=swiper.$wrapperEl,slidesSizesGrid=swiper.slidesSizesGrid;var params=swiper.params.coverflowEffect;var isHorizontal=swiper.isHorizontal();var transform$$1=swiper.translate;var center=isHorizontal?-transform$$1+swiperWidth/2:-transform$$1+swiperHeight/2;var rotate=isHorizontal?params.rotate:-params.rotate;var translate=params.depth;// Each slide offset from center
for(var i=0,length=slides.length;i<length;i+=1){var $slideEl=slides.eq(i);var slideSize=slidesSizesGrid[i];var slideOffset=$slideEl[0].swiperSlideOffset;var offsetMultiplier=(center-slideOffset-slideSize/2)/slideSize*params.modifier;var rotateY=isHorizontal?rotate*offsetMultiplier:0;var rotateX=isHorizontal?0:rotate*offsetMultiplier;// var rotateZ = 0
var translateZ=-translate*Math.abs(offsetMultiplier);var translateY=isHorizontal?0:params.stretch*offsetMultiplier;var translateX=isHorizontal?params.stretch*offsetMultiplier:0;// Fix for ultra small values
if(Math.abs(translateX)<0.001)translateX=0;if(Math.abs(translateY)<0.001)translateY=0;if(Math.abs(translateZ)<0.001)translateZ=0;if(Math.abs(rotateY)<0.001)rotateY=0;if(Math.abs(rotateX)<0.001)rotateX=0;var slideTransform='translate3d('+translateX+'px,'+translateY+'px,'+translateZ+'px)  rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';$slideEl.transform(slideTransform);$slideEl[0].style.zIndex=-Math.abs(Math.round(offsetMultiplier))+1;if(params.slideShadows){// Set shadows
var $shadowBeforeEl=isHorizontal?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var $shadowAfterEl=isHorizontal?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if($shadowBeforeEl.length===0){$shadowBeforeEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(isHorizontal?'left':'top')+'"></div>');$slideEl.append($shadowBeforeEl);}if($shadowAfterEl.length===0){$shadowAfterEl=Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a"/* $ */])('<div class="swiper-slide-shadow-'+(isHorizontal?'right':'bottom')+'"></div>');$slideEl.append($shadowAfterEl);}if($shadowBeforeEl.length)$shadowBeforeEl[0].style.opacity=offsetMultiplier>0?offsetMultiplier:0;if($shadowAfterEl.length)$shadowAfterEl[0].style.opacity=-offsetMultiplier>0?-offsetMultiplier:0;}}// Set correct perspective for IE10
if(Browser.ie){var ws=$wrapperEl[0].style;ws.perspectiveOrigin=center+'px 50%';}},setTransition:function setTransition(duration){var swiper=this;swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);}};var EffectCoverflow={name:'effect-coverflow',params:{coverflowEffect:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:true}},create:function create(){var swiper=this;Utils.extend(swiper,{coverflowEffect:{setTranslate:Coverflow.setTranslate.bind(swiper),setTransition:Coverflow.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='coverflow')return;swiper.classNames.push(swiper.params.containerModifierClass+'coverflow');swiper.classNames.push(swiper.params.containerModifierClass+'3d');swiper.params.watchSlidesProgress=true;swiper.originalParams.watchSlidesProgress=true;},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='coverflow')return;swiper.coverflowEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='coverflow')return;swiper.coverflowEffect.setTransition(duration);}}};// Swiper Class
// Core Modules
Swiper$1.use([Device$2,Support$2,Browser$2,Resize,Observer$1,Virtual$1,Keyboard$1,Mousewheel$1,Navigation$1,Pagination$1,Scrollbar$1,Parallax$1,Zoom$1,Lazy$1,Controller$1,A11y,History$1,HashNavigation$1,Autoplay$1,EffectFade,EffectCube,EffectFlip,EffectCoverflow]);/* harmony default export */__webpack_exports__["a"]=Swiper$1;/***/},/* 10 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return $;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"c",function(){return addClass;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"E",function(){return removeClass;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"m",function(){return hasClass;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"H",function(){return toggleClass;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"e",function(){return attr;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"D",function(){return removeAttr;});/* unused harmony export prop *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"i",function(){return data;});/* unused harmony export removeData *//* unused harmony export dataset *//* unused harmony export val *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"I",function(){return transform;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"J",function(){return transition;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"u",function(){return on;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"s",function(){return off;});/* unused harmony export once *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"L",function(){return trigger;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"K",function(){return transitionEnd;});/* unused harmony export animationEnd *//* unused harmony export width *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"w",function(){return outerWidth;});/* unused harmony export height *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"v",function(){return outerHeight;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"t",function(){return offset;});/* unused harmony export hide *//* unused harmony export show *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"F",function(){return styles;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"h",function(){return css;});/* unused harmony export toArray *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"j",function(){return each;});/* unused harmony export forEach *//* unused harmony export filter *//* unused harmony export map *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"n",function(){return html;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"G",function(){return text;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"p",function(){return is;});/* unused harmony export indexOf *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"o",function(){return index;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"k",function(){return eq;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"d",function(){return append;});/* unused harmony export appendTo *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"z",function(){return prepend;});/* unused harmony export prependTo *//* unused harmony export insertBefore *//* unused harmony export insertAfter *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"q",function(){return next;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"r",function(){return nextAll;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"A",function(){return prev;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"B",function(){return prevAll;});/* unused harmony export siblings *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"x",function(){return parent;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"y",function(){return parents;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"g",function(){return closest;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"l",function(){return find;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"f",function(){return children;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"C",function(){return remove;});/* unused harmony export detach *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"b",function(){return add;});/* unused harmony export empty *//* unused harmony export scrollTo *//* unused harmony export scrollTop *//* unused harmony export scrollLeft *//* unused harmony export animate *//* unused harmony export stop *//* unused harmony export click *//* unused harmony export blur *//* unused harmony export focus *//* unused harmony export focusin *//* unused harmony export focusout *//* unused harmony export keyup *//* unused harmony export keydown *//* unused harmony export keypress *//* unused harmony export submit *//* unused harmony export change *//* unused harmony export mousedown *//* unused harmony export mousemove *//* unused harmony export mouseup *//* unused harmony export mouseenter *//* unused harmony export mouseleave *//* unused harmony export mouseout *//* unused harmony export mouseover *//* unused harmony export touchstart *//* unused harmony export touchend *//* unused harmony export touchmove *//* unused harmony export resize *//* unused harmony export scroll *//**
 * Dom7 2.0.1
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 2, 2017
 */var Dom7=function Dom7(arr){_classCallCheck(this,Dom7);var self=this;// Create array-like object
for(var i=0;i<arr.length;i+=1){self[i]=arr[i];}self.length=arr.length;// Return collection with methods
return this;};function $(selector,context){var arr=[];var i=0;if(selector&&!context){if(selector instanceof Dom7){return selector;}}if(selector){// String
if(typeof selector==='string'){var els=void 0;var tempParent=void 0;var _html2=selector.trim();if(_html2.indexOf('<')>=0&&_html2.indexOf('>')>=0){var toCreate='div';if(_html2.indexOf('<li')===0)toCreate='ul';if(_html2.indexOf('<tr')===0)toCreate='tbody';if(_html2.indexOf('<td')===0||_html2.indexOf('<th')===0)toCreate='tr';if(_html2.indexOf('<tbody')===0)toCreate='table';if(_html2.indexOf('<option')===0)toCreate='select';tempParent=document.createElement(toCreate);tempParent.innerHTML=_html2;for(i=0;i<tempParent.childNodes.length;i+=1){arr.push(tempParent.childNodes[i]);}}else{if(!context&&selector[0]==='#'&&!selector.match(/[ .<>:~]/)){// Pure ID selector
els=[document.getElementById(selector.trim().split('#')[1])];}else{// Other selectors
els=(context||document).querySelectorAll(selector.trim());}for(i=0;i<els.length;i+=1){if(els[i])arr.push(els[i]);}}}else if(selector.nodeType||selector===window||selector===document){// Node/element
arr.push(selector);}else if(selector.length>0&&selector[0].nodeType){// Array of elements or instance of Dom
for(i=0;i<selector.length;i+=1){arr.push(selector[i]);}}}return new Dom7(arr);}$.fn=Dom7.prototype;$.Class=Dom7;$.Dom7=Dom7;function unique(arr){var uniqueArray=[];for(var i=0;i<arr.length;i+=1){if(uniqueArray.indexOf(arr[i])===-1)uniqueArray.push(arr[i]);}return uniqueArray;}function toCamelCase(string){return string.toLowerCase().replace(/-(.)/g,function(match,group1){return group1.toUpperCase();});}function requestAnimationFrame(callback){if(window.requestAnimationFrame)return window.requestAnimationFrame(callback);else if(window.webkitRequestAnimationFrame)return window.webkitRequestAnimationFrame(callback);return window.setTimeout(callback,1000/60);}function cancelAnimationFrame(id){if(window.cancelAnimationFrame)return window.cancelAnimationFrame(id);else if(window.webkitCancelAnimationFrame)return window.webkitCancelAnimationFrame(id);return window.clearTimeout(id);}// Classes and attributes
function addClass(className){if(typeof className==='undefined'){return this;}var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this[j].classList!=='undefined')this[j].classList.add(classes[i]);}}return this;}function removeClass(className){var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this[j].classList!=='undefined')this[j].classList.remove(classes[i]);}}return this;}function hasClass(className){if(!this[0])return false;return this[0].classList.contains(className);}function toggleClass(className){var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this[j].classList!=='undefined')this[j].classList.toggle(classes[i]);}}return this;}function attr(attrs,value){if(arguments.length===1&&typeof attrs==='string'){// Get attr
if(this[0])return this[0].getAttribute(attrs);return undefined;}// Set attrs
for(var i=0;i<this.length;i+=1){if(arguments.length===2){// String
this[i].setAttribute(attrs,value);}else{// Object
// eslint-disable-next-line
for(var attrName in attrs){this[i][attrName]=attrs[attrName];this[i].setAttribute(attrName,attrs[attrName]);}}}return this;}// eslint-disable-next-line
function removeAttr(attr){for(var i=0;i<this.length;i+=1){this[i].removeAttribute(attr);}return this;}// eslint-disable-next-line
function prop(props,value){if(arguments.length===1&&typeof props==='string'){// Get prop
if(this[0])return this[0][props];}else{// Set props
for(var i=0;i<this.length;i+=1){if(arguments.length===2){// String
this[i][props]=value;}else{// Object
// eslint-disable-next-line
for(var propName in props){this[i][propName]=props[propName];}}}return this;}}function data(key,value){var el=void 0;if(typeof value==='undefined'){el=this[0];// Get value
if(el){if(el.dom7ElementDataStorage&&key in el.dom7ElementDataStorage){return el.dom7ElementDataStorage[key];}var dataKey=el.getAttribute('data-'+key);if(dataKey){return dataKey;}return undefined;}return undefined;}// Set value
for(var i=0;i<this.length;i+=1){el=this[i];if(!el.dom7ElementDataStorage)el.dom7ElementDataStorage={};el.dom7ElementDataStorage[key]=value;}return this;}function removeData(key){for(var i=0;i<this.length;i+=1){var el=this[i];if(el.dom7ElementDataStorage&&el.dom7ElementDataStorage[key]){el.dom7ElementDataStorage[key]=null;delete el.dom7ElementDataStorage[key];}}}function dataset(){var el=this[0];if(!el)return undefined;var dataset={};// eslint-disable-line
if(el.dataset){// eslint-disable-next-line
for(var dataKey in el.dataset){dataset[dataKey]=el.dataset[dataKey];}}else{for(var i=0;i<el.attributes.length;i+=1){// eslint-disable-next-line
var _attr=el.attributes[i];if(_attr.name.indexOf('data-')>=0){dataset[toCamelCase(_attr.name.split('data-')[1])]=_attr.value;}}}// eslint-disable-next-line
for(var key in dataset){if(dataset[key]==='false')dataset[key]=false;else if(dataset[key]==='true')dataset[key]=true;else if(parseFloat(dataset[key])===dataset[key]*1)dataset[key]*=1;}return dataset;}function val(value){if(typeof value==='undefined'){if(this[0]){if(this[0].multiple&&this[0].nodeName.toLowerCase()==='select'){var values=[];for(var i=0;i<this[0].selectedOptions.length;i+=1){values.push(this[0].selectedOptions[i].value);}return values;}return this[0].value;}return undefined;}for(var _i10=0;_i10<this.length;_i10+=1){this[_i10].value=value;}return this;}// Transforms
// eslint-disable-next-line
function transform(transform){for(var i=0;i<this.length;i+=1){var elStyle=this[i].style;elStyle.webkitTransform=transform;elStyle.transform=transform;}return this;}function transition(duration){if(typeof duration!=='string'){duration=duration+'ms';// eslint-disable-line
}for(var i=0;i<this.length;i+=1){var elStyle=this[i].style;elStyle.webkitTransitionDuration=duration;elStyle.transitionDuration=duration;}return this;}// Events
function on(){for(var _len6=arguments.length,args=Array(_len6),_key6=0;_key6<_len6;_key6++){args[_key6]=arguments[_key6];}var eventType=args[0],targetSelector=args[1],listener=args[2],capture=args[3];if(typeof args[1]==='function'){eventType=args[0];listener=args[1];capture=args[2];targetSelector=undefined;}if(!capture)capture=false;function handleLiveEvent(e){var target=e.target;if(!target)return;var eventData=e.target.dom7EventData||[];eventData.unshift(e);if($(target).is(targetSelector))listener.apply(target,eventData);else{var _parents=$(target).parents();// eslint-disable-line
for(var k=0;k<_parents.length;k+=1){if($(_parents[k]).is(targetSelector))listener.apply(_parents[k],eventData);}}}function handleEvent(e){var eventData=e&&e.target?e.target.dom7EventData||[]:[];eventData.unshift(e);listener.apply(this,eventData);}var events=eventType.split(' ');var j=void 0;for(var i=0;i<this.length;i+=1){var el=this[i];if(!targetSelector){for(j=0;j<events.length;j+=1){if(!el.dom7Listeners)el.dom7Listeners=[];el.dom7Listeners.push({type:eventType,listener:listener,proxyListener:handleEvent});el.addEventListener(events[j],handleEvent,capture);}}else{// Live events
for(j=0;j<events.length;j+=1){if(!el.dom7LiveListeners)el.dom7LiveListeners=[];el.dom7LiveListeners.push({type:eventType,listener:listener,proxyListener:handleLiveEvent});el.addEventListener(events[j],handleLiveEvent,capture);}}}return this;}function off(){for(var _len7=arguments.length,args=Array(_len7),_key7=0;_key7<_len7;_key7++){args[_key7]=arguments[_key7];}var eventType=args[0],targetSelector=args[1],listener=args[2],capture=args[3];if(typeof args[1]==='function'){eventType=args[0];listener=args[1];capture=args[2];targetSelector=undefined;}if(!capture)capture=false;var events=eventType.split(' ');for(var i=0;i<events.length;i+=1){for(var j=0;j<this.length;j+=1){var el=this[j];if(!targetSelector){if(el.dom7Listeners){for(var k=0;k<el.dom7Listeners.length;k+=1){if(listener){if(el.dom7Listeners[k].listener===listener){el.removeEventListener(events[i],el.dom7Listeners[k].proxyListener,capture);}}else if(el.dom7Listeners[k].type===events[i]){el.removeEventListener(events[i],el.dom7Listeners[k].proxyListener,capture);}}}}else if(el.dom7LiveListeners){for(var _k=0;_k<el.dom7LiveListeners.length;_k+=1){if(listener){if(el.dom7LiveListeners[_k].listener===listener){el.removeEventListener(events[i],el.dom7LiveListeners[_k].proxyListener,capture);}}else if(el.dom7LiveListeners[_k].type===events[i]){el.removeEventListener(events[i],el.dom7LiveListeners[_k].proxyListener,capture);}}}}}return this;}function once(){var dom=this;for(var _len8=arguments.length,args=Array(_len8),_key8=0;_key8<_len8;_key8++){args[_key8]=arguments[_key8];}var eventName=args[0],targetSelector=args[1],listener=args[2],capture=args[3];if(typeof args[1]==='function'){eventName=args[0];listener=args[1];capture=args[2];targetSelector=undefined;}function proxy(e){var eventData=e.target.dom7EventData||[];listener.apply(this,eventData);dom.off(eventName,targetSelector,proxy,capture);}return dom.on(eventName,targetSelector,proxy,capture);}function trigger(){for(var _len9=arguments.length,args=Array(_len9),_key9=0;_key9<_len9;_key9++){args[_key9]=arguments[_key9];}var events=args[0].split(' ');var eventData=args[1];for(var i=0;i<events.length;i+=1){for(var j=0;j<this.length;j+=1){var evt=void 0;try{evt=new window.CustomEvent(events[i],{detail:eventData,bubbles:true,cancelable:true});}catch(e){evt=document.createEvent('Event');evt.initEvent(events[i],true,true);evt.detail=eventData;}// eslint-disable-next-line
this[j].dom7EventData=args.filter(function(data,dataIndex){return dataIndex>0;});this[j].dispatchEvent(evt);this[j].dom7EventData=[];delete this[j].dom7EventData;}}return this;}function transitionEnd(callback){var events=['webkitTransitionEnd','transitionend'];var dom=this;var i=void 0;function fireCallBack(e){/* jshint validthis:true */if(e.target!==this)return;callback.call(this,e);for(i=0;i<events.length;i+=1){dom.off(events[i],fireCallBack);}}if(callback){for(i=0;i<events.length;i+=1){dom.on(events[i],fireCallBack);}}return this;}function animationEnd(callback){var events=['webkitAnimationEnd','animationend'];var dom=this;var i=void 0;function fireCallBack(e){if(e.target!==this)return;callback.call(this,e);for(i=0;i<events.length;i+=1){dom.off(events[i],fireCallBack);}}if(callback){for(i=0;i<events.length;i+=1){dom.on(events[i],fireCallBack);}}return this;}// Sizing/Styles
function width(){if(this[0]===window){return window.innerWidth;}if(this.length>0){return parseFloat(this.css('width'));}return null;}function outerWidth(includeMargins){if(this.length>0){if(includeMargins){// eslint-disable-next-line
var _styles=this.styles();return this[0].offsetWidth+parseFloat(_styles.getPropertyValue('margin-right'))+parseFloat(_styles.getPropertyValue('margin-left'));}return this[0].offsetWidth;}return null;}function height(){if(this[0]===window){return window.innerHeight;}if(this.length>0){return parseFloat(this.css('height'));}return null;}function outerHeight(includeMargins){if(this.length>0){if(includeMargins){// eslint-disable-next-line
var _styles2=this.styles();return this[0].offsetHeight+parseFloat(_styles2.getPropertyValue('margin-top'))+parseFloat(_styles2.getPropertyValue('margin-bottom'));}return this[0].offsetHeight;}return null;}function offset(){if(this.length>0){var el=this[0];var box=el.getBoundingClientRect();var body=document.body;var clientTop=el.clientTop||body.clientTop||0;var clientLeft=el.clientLeft||body.clientLeft||0;var _scrollTop=el===window?window.scrollY:el.scrollTop;var _scrollLeft=el===window?window.scrollX:el.scrollLeft;return{top:box.top+_scrollTop-clientTop,left:box.left+_scrollLeft-clientLeft};}return null;}function hide(){for(var i=0;i<this.length;i+=1){this[i].style.display='none';}return this;}function show(){for(var i=0;i<this.length;i+=1){var el=this[i];if(el.style.display==='none'){el.style.display='';}if(window.getComputedStyle(el,null).getPropertyValue('display')==='none'){// Still not visible
el.style.display='block';}}return this;}function styles(){if(this[0])return window.getComputedStyle(this[0],null);return{};}function css(props,value){var i=void 0;if(arguments.length===1){if(typeof props==='string'){if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(props);}else{for(i=0;i<this.length;i+=1){// eslint-disable-next-line
for(var _prop in props){this[i].style[_prop]=props[_prop];}}return this;}}if(arguments.length===2&&typeof props==='string'){for(i=0;i<this.length;i+=1){this[i].style[props]=value;}return this;}return this;}// Dom manipulation
function toArray(){var arr=[];for(var i=0;i<this.length;i+=1){arr.push(this[i]);}return arr;}// Iterate over the collection passing elements to `callback`
function each(callback){// Don't bother continuing without a callback
if(!callback)return this;// Iterate over the current collection
for(var i=0;i<this.length;i+=1){// If the callback returns false
if(callback.call(this[i],i,this[i])===false){// End the loop early
return this;}}// Return `this` to allow chained DOM operations
return this;}function forEach(callback){// Don't bother continuing without a callback
if(!callback)return this;// Iterate over the current collection
for(var i=0;i<this.length;i+=1){// If the callback returns false
if(callback.call(this[i],this[i],i)===false){// End the loop early
return this;}}// Return `this` to allow chained DOM operations
return this;}function filter(callback){var matchedItems=[];var dom=this;for(var i=0;i<dom.length;i+=1){if(callback.call(dom[i],i,dom[i]))matchedItems.push(dom[i]);}return new Dom7(matchedItems);}function map(callback){var modifiedItems=[];var dom=this;for(var i=0;i<dom.length;i+=1){modifiedItems.push(callback.call(dom[i],i,dom[i]));}return new Dom7(modifiedItems);}// eslint-disable-next-line
function html(html){if(typeof html==='undefined'){return this[0]?this[0].innerHTML:undefined;}for(var i=0;i<this.length;i+=1){this[i].innerHTML=html;}return this;}// eslint-disable-next-line
function text(text){if(typeof text==='undefined'){if(this[0]){return this[0].textContent.trim();}return null;}for(var i=0;i<this.length;i+=1){this[i].textContent=text;}return this;}function is(selector){var el=this[0];var compareWith=void 0;var i=void 0;if(!el||typeof selector==='undefined')return false;if(typeof selector==='string'){if(el.matches)return el.matches(selector);else if(el.webkitMatchesSelector)return el.webkitMatchesSelector(selector);else if(el.msMatchesSelector)return el.msMatchesSelector(selector);compareWith=$(selector);for(i=0;i<compareWith.length;i+=1){if(compareWith[i]===el)return true;}return false;}else if(selector===document)return el===document;else if(selector===window)return el===window;if(selector.nodeType||selector instanceof Dom7){compareWith=selector.nodeType?[selector]:selector;for(i=0;i<compareWith.length;i+=1){if(compareWith[i]===el)return true;}return false;}return false;}function indexOf(el){for(var i=0;i<this.length;i+=1){if(this[i]===el)return i;}return-1;}function index(){var child=this[0];var i=void 0;if(child){i=0;// eslint-disable-next-line
while((child=child.previousSibling)!==null){if(child.nodeType===1)i+=1;}return i;}return undefined;}// eslint-disable-next-line
function eq(index){if(typeof index==='undefined')return this;var length=this.length;var returnIndex=void 0;if(index>length-1){return new Dom7([]);}if(index<0){returnIndex=length+index;if(returnIndex<0)return new Dom7([]);return new Dom7([this[returnIndex]]);}return new Dom7([this[index]]);}function append(){var newChild=void 0;for(var k=0;k<arguments.length;k+=1){newChild=arguments.length<=k?undefined:arguments[k];for(var i=0;i<this.length;i+=1){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;while(tempDiv.firstChild){this[i].appendChild(tempDiv.firstChild);}}else if(newChild instanceof Dom7){for(var j=0;j<newChild.length;j+=1){this[i].appendChild(newChild[j]);}}else{this[i].appendChild(newChild);}}}return this;}// eslint-disable-next-line
function appendTo(parent){$(parent).append(this);return this;}function prepend(newChild){var i=void 0;var j=void 0;for(i=0;i<this.length;i+=1){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;for(j=tempDiv.childNodes.length-1;j>=0;j-=1){this[i].insertBefore(tempDiv.childNodes[j],this[i].childNodes[0]);}}else if(newChild instanceof Dom7){for(j=0;j<newChild.length;j+=1){this[i].insertBefore(newChild[j],this[i].childNodes[0]);}}else{this[i].insertBefore(newChild,this[i].childNodes[0]);}}return this;}// eslint-disable-next-line
function prependTo(parent){$(parent).prepend(this);return this;}function insertBefore(selector){var before=$(selector);for(var i=0;i<this.length;i+=1){if(before.length===1){before[0].parentNode.insertBefore(this[i],before[0]);}else if(before.length>1){for(var j=0;j<before.length;j+=1){before[j].parentNode.insertBefore(this[i].cloneNode(true),before[j]);}}}}function insertAfter(selector){var after=$(selector);for(var i=0;i<this.length;i+=1){if(after.length===1){after[0].parentNode.insertBefore(this[i],after[0].nextSibling);}else if(after.length>1){for(var j=0;j<after.length;j+=1){after[j].parentNode.insertBefore(this[i].cloneNode(true),after[j].nextSibling);}}}}function next(selector){if(this.length>0){if(selector){if(this[0].nextElementSibling&&$(this[0].nextElementSibling).is(selector)){return new Dom7([this[0].nextElementSibling]);}return new Dom7([]);}if(this[0].nextElementSibling)return new Dom7([this[0].nextElementSibling]);return new Dom7([]);}return new Dom7([]);}function nextAll(selector){var nextEls=[];var el=this[0];if(!el)return new Dom7([]);while(el.nextElementSibling){var _next=el.nextElementSibling;// eslint-disable-line
if(selector){if($(_next).is(selector))nextEls.push(_next);}else nextEls.push(_next);el=_next;}return new Dom7(nextEls);}function prev(selector){if(this.length>0){var el=this[0];if(selector){if(el.previousElementSibling&&$(el.previousElementSibling).is(selector)){return new Dom7([el.previousElementSibling]);}return new Dom7([]);}if(el.previousElementSibling)return new Dom7([el.previousElementSibling]);return new Dom7([]);}return new Dom7([]);}function prevAll(selector){var prevEls=[];var el=this[0];if(!el)return new Dom7([]);while(el.previousElementSibling){var _prev=el.previousElementSibling;// eslint-disable-line
if(selector){if($(_prev).is(selector))prevEls.push(_prev);}else prevEls.push(_prev);el=_prev;}return new Dom7(prevEls);}function siblings(selector){return this.nextAll(selector).add(this.prevAll(selector));}function parent(selector){var parents=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){if(this[i].parentNode!==null){if(selector){if($(this[i].parentNode).is(selector))parents.push(this[i].parentNode);}else{parents.push(this[i].parentNode);}}}return $(unique(parents));}function parents(selector){var parents=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){var _parent=this[i].parentNode;// eslint-disable-line
while(_parent){if(selector){if($(_parent).is(selector))parents.push(_parent);}else{parents.push(_parent);}_parent=_parent.parentNode;}}return $(unique(parents));}function closest(selector){var closest=this;// eslint-disable-line
if(typeof selector==='undefined'){return new Dom7([]);}if(!closest.is(selector)){closest=closest.parents(selector).eq(0);}return closest;}function find(selector){var foundElements=[];for(var i=0;i<this.length;i+=1){var found=this[i].querySelectorAll(selector);for(var j=0;j<found.length;j+=1){foundElements.push(found[j]);}}return new Dom7(foundElements);}function children(selector){var children=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){var childNodes=this[i].childNodes;for(var j=0;j<childNodes.length;j+=1){if(!selector){if(childNodes[j].nodeType===1)children.push(childNodes[j]);}else if(childNodes[j].nodeType===1&&$(childNodes[j]).is(selector)){children.push(childNodes[j]);}}}return new Dom7(unique(children));}function remove(){for(var i=0;i<this.length;i+=1){if(this[i].parentNode)this[i].parentNode.removeChild(this[i]);}return this;}function detach(){return this.remove();}function add(){var dom=this;var i=void 0;var j=void 0;for(var _len10=arguments.length,args=Array(_len10),_key10=0;_key10<_len10;_key10++){args[_key10]=arguments[_key10];}for(i=0;i<args.length;i+=1){var toAdd=$(args[i]);for(j=0;j<toAdd.length;j+=1){dom[dom.length]=toAdd[j];dom.length+=1;}}return dom;}function empty(){for(var i=0;i<this.length;i+=1){var el=this[i];if(el.nodeType===1){for(var j=0;j<el.childNodes.length;j+=1){if(el.childNodes[j].parentNode){el.childNodes[j].parentNode.removeChild(el.childNodes[j]);}}el.textContent='';}}return this;}function scrollTo(){for(var _len11=arguments.length,args=Array(_len11),_key11=0;_key11<_len11;_key11++){args[_key11]=arguments[_key11];}var left=args[0],top=args[1],duration=args[2],easing=args[3],callback=args[4];if(args.length===4&&typeof easing==='function'){callback=easing;left=args[0];top=args[1];duration=args[2];callback=args[3];easing=args[4];}if(typeof easing==='undefined')easing='swing';return this.each(function animate(){var el=this;var currentTop=void 0;var currentLeft=void 0;var maxTop=void 0;var maxLeft=void 0;var newTop=void 0;var newLeft=void 0;var scrollTop=void 0;// eslint-disable-line
var scrollLeft=void 0;// eslint-disable-line
var animateTop=top>0||top===0;var animateLeft=left>0||left===0;if(typeof easing==='undefined'){easing='swing';}if(animateTop){currentTop=el.scrollTop;if(!duration){el.scrollTop=top;}}if(animateLeft){currentLeft=el.scrollLeft;if(!duration){el.scrollLeft=left;}}if(!duration)return;if(animateTop){maxTop=el.scrollHeight-el.offsetHeight;newTop=Math.max(Math.min(top,maxTop),0);}if(animateLeft){maxLeft=el.scrollWidth-el.offsetWidth;newLeft=Math.max(Math.min(left,maxLeft),0);}var startTime=null;if(animateTop&&newTop===currentTop)animateTop=false;if(animateLeft&&newLeft===currentLeft)animateLeft=false;function render(){var time=arguments.length>0&&arguments[0]!==undefined?arguments[0]:new Date().getTime();if(startTime===null){startTime=time;}var progress=Math.max(Math.min((time-startTime)/duration,1),0);var easeProgress=easing==='linear'?progress:0.5-Math.cos(progress*Math.PI)/2;var done=void 0;if(animateTop)scrollTop=currentTop+easeProgress*(newTop-currentTop);if(animateLeft)scrollLeft=currentLeft+easeProgress*(newLeft-currentLeft);if(animateTop&&newTop>currentTop&&scrollTop>=newTop){el.scrollTop=newTop;done=true;}if(animateTop&&newTop<currentTop&&scrollTop<=newTop){el.scrollTop=newTop;done=true;}if(animateLeft&&newLeft>currentLeft&&scrollLeft>=newLeft){el.scrollLeft=newLeft;done=true;}if(animateLeft&&newLeft<currentLeft&&scrollLeft<=newLeft){el.scrollLeft=newLeft;done=true;}if(done){if(callback)callback();return;}if(animateTop)el.scrollTop=scrollTop;if(animateLeft)el.scrollLeft=scrollLeft;requestAnimationFrame(render);}requestAnimationFrame(render);});}// scrollTop(top, duration, easing, callback) {
function scrollTop(){for(var _len12=arguments.length,args=Array(_len12),_key12=0;_key12<_len12;_key12++){args[_key12]=arguments[_key12];}var top=args[0],duration=args[1],easing=args[2],callback=args[3];if(args.length===3&&typeof easing==='function'){top=args[0];duration=args[1];callback=args[2];easing=args[3];}var dom=this;if(typeof top==='undefined'){if(dom.length>0)return dom[0].scrollTop;return null;}return dom.scrollTo(undefined,top,duration,easing,callback);}function scrollLeft(){for(var _len13=arguments.length,args=Array(_len13),_key13=0;_key13<_len13;_key13++){args[_key13]=arguments[_key13];}var left=args[0],duration=args[1],easing=args[2],callback=args[3];if(args.length===3&&typeof easing==='function'){left=args[0];duration=args[1];callback=args[2];easing=args[3];}var dom=this;if(typeof left==='undefined'){if(dom.length>0)return dom[0].scrollLeft;return null;}return dom.scrollTo(left,undefined,duration,easing,callback);}function animate(initialProps,initialParams){var els=this;var a={props:$.extend({},initialProps),params:$.extend({duration:300,easing:'swing'// or 'linear'
/* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */},initialParams),elements:els,animating:false,que:[],easingProgress:function easingProgress(easing,progress){if(easing==='swing'){return 0.5-Math.cos(progress*Math.PI)/2;}if(typeof easing==='function'){return easing(progress);}return progress;},stop:function stop(){if(a.frameId){cancelAnimationFrame(a.frameId);}a.animating=false;a.elements.each(function(index,el){var element=el;delete element.dom7AnimateInstance;});a.que=[];},done:function done(complete){a.animating=false;a.elements.each(function(index,el){var element=el;delete element.dom7AnimateInstance;});if(complete)complete(els);if(a.que.length>0){var que=a.que.shift();a.animate(que[0],que[1]);}},animate:function animate(props,params){if(a.animating){a.que.push([props,params]);return a;}var elements=[];// Define & Cache Initials & Units
a.elements.each(function(index,el){var initialFullValue=void 0;var initialValue=void 0;var unit=void 0;var finalValue=void 0;var finalFullValue=void 0;if(!el.dom7AnimateInstance)a.elements[index].dom7AnimateInstance=a;elements[index]={container:el};Object.keys(props).forEach(function(prop){initialFullValue=window.getComputedStyle(el,null).getPropertyValue(prop).replace(',','.');initialValue=parseFloat(initialFullValue);unit=initialFullValue.replace(initialValue,'');finalValue=parseFloat(props[prop]);finalFullValue=props[prop]+unit;elements[index][prop]={initialFullValue:initialFullValue,initialValue:initialValue,unit:unit,finalValue:finalValue,finalFullValue:finalFullValue,currentValue:initialValue};});});var startTime=null;var time=void 0;var elementsDone=0;var propsDone=0;var done=void 0;var began=false;a.animating=true;function render(){time=new Date().getTime();var progress=void 0;var easeProgress=void 0;// let el;
if(!began){began=true;if(params.begin)params.begin(els);}if(startTime===null){startTime=time;}if(params.progress){// eslint-disable-next-line
params.progress(els,Math.max(Math.min((time-startTime)/params.duration,1),0),startTime+params.duration-time<0?0:startTime+params.duration-time,startTime);}elements.forEach(function(element){var el=element;if(done||el.done)return;Object.keys(props).forEach(function(prop){if(done||el.done)return;progress=Math.max(Math.min((time-startTime)/params.duration,1),0);easeProgress=a.easingProgress(params.easing,progress);var _el$prop=el[prop],initialValue=_el$prop.initialValue,finalValue=_el$prop.finalValue,unit=_el$prop.unit;el[prop].currentValue=initialValue+easeProgress*(finalValue-initialValue);var currentValue=el[prop].currentValue;if(finalValue>initialValue&&currentValue>=finalValue||finalValue<initialValue&&currentValue<=finalValue){el.container.style[prop]=finalValue+unit;propsDone+=1;if(propsDone===Object.keys(props).length){el.done=true;elementsDone+=1;}if(elementsDone===elements.length){done=true;}}if(done){a.done(params.complete);return;}el.container.style[prop]=currentValue+unit;});});if(done)return;// Then call
a.frameId=requestAnimationFrame(render);}a.frameId=requestAnimationFrame(render);return a;}};if(a.elements.length===0){return els;}var animateInstance=void 0;for(var i=0;i<a.elements.length;i+=1){if(a.elements[i].dom7AnimateInstance){animateInstance=a.elements[i].dom7AnimateInstance;}else a.elements[i].dom7AnimateInstance=a;}if(!animateInstance){animateInstance=a;}if(initialProps==='stop'){animateInstance.stop();}else{animateInstance.animate(a.props,a.params);}return els;}function stop(){var els=this;for(var i=0;i<els.length;i+=1){if(els[i].dom7AnimateInstance){els[i].dom7AnimateInstance.stop();}}}var noTrigger='resize scroll'.split(' ');function eventShortcut(name){for(var _len14=arguments.length,args=Array(_len14>1?_len14-1:0),_key14=1;_key14<_len14;_key14++){args[_key14-1]=arguments[_key14];}if(typeof args[0]==='undefined'){for(var i=0;i<this.length;i+=1){if(noTrigger.indexOf(name)<0){if(name in this[i])this[i][name]();else{$(this[i]).trigger(name);}}}return this;}return this.on.apply(this,[name].concat(args));}function click(){for(var _len15=arguments.length,args=Array(_len15),_key15=0;_key15<_len15;_key15++){args[_key15]=arguments[_key15];}return eventShortcut.bind(this).apply(undefined,['click'].concat(args));}function blur(){for(var _len16=arguments.length,args=Array(_len16),_key16=0;_key16<_len16;_key16++){args[_key16]=arguments[_key16];}return eventShortcut.bind(this).apply(undefined,['blur'].concat(args));}function focus(){for(var _len17=arguments.length,args=Array(_len17),_key17=0;_key17<_len17;_key17++){args[_key17]=arguments[_key17];}return eventShortcut.bind(this).apply(undefined,['focus'].concat(args));}function focusin(){for(var _len18=arguments.length,args=Array(_len18),_key18=0;_key18<_len18;_key18++){args[_key18]=arguments[_key18];}return eventShortcut.bind(this).apply(undefined,['focusin'].concat(args));}function focusout(){for(var _len19=arguments.length,args=Array(_len19),_key19=0;_key19<_len19;_key19++){args[_key19]=arguments[_key19];}return eventShortcut.bind(this).apply(undefined,['focusout'].concat(args));}function keyup(){for(var _len20=arguments.length,args=Array(_len20),_key20=0;_key20<_len20;_key20++){args[_key20]=arguments[_key20];}return eventShortcut.bind(this).apply(undefined,['keyup'].concat(args));}function keydown(){for(var _len21=arguments.length,args=Array(_len21),_key21=0;_key21<_len21;_key21++){args[_key21]=arguments[_key21];}return eventShortcut.bind(this).apply(undefined,['keydown'].concat(args));}function keypress(){for(var _len22=arguments.length,args=Array(_len22),_key22=0;_key22<_len22;_key22++){args[_key22]=arguments[_key22];}return eventShortcut.bind(this).apply(undefined,['keypress'].concat(args));}function submit(){for(var _len23=arguments.length,args=Array(_len23),_key23=0;_key23<_len23;_key23++){args[_key23]=arguments[_key23];}return eventShortcut.bind(this).apply(undefined,['submit'].concat(args));}function change(){for(var _len24=arguments.length,args=Array(_len24),_key24=0;_key24<_len24;_key24++){args[_key24]=arguments[_key24];}return eventShortcut.bind(this).apply(undefined,['change'].concat(args));}function mousedown(){for(var _len25=arguments.length,args=Array(_len25),_key25=0;_key25<_len25;_key25++){args[_key25]=arguments[_key25];}return eventShortcut.bind(this).apply(undefined,['mousedown'].concat(args));}function mousemove(){for(var _len26=arguments.length,args=Array(_len26),_key26=0;_key26<_len26;_key26++){args[_key26]=arguments[_key26];}return eventShortcut.bind(this).apply(undefined,['mousemove'].concat(args));}function mouseup(){for(var _len27=arguments.length,args=Array(_len27),_key27=0;_key27<_len27;_key27++){args[_key27]=arguments[_key27];}return eventShortcut.bind(this).apply(undefined,['mouseup'].concat(args));}function mouseenter(){for(var _len28=arguments.length,args=Array(_len28),_key28=0;_key28<_len28;_key28++){args[_key28]=arguments[_key28];}return eventShortcut.bind(this).apply(undefined,['mouseenter'].concat(args));}function mouseleave(){for(var _len29=arguments.length,args=Array(_len29),_key29=0;_key29<_len29;_key29++){args[_key29]=arguments[_key29];}return eventShortcut.bind(this).apply(undefined,['mouseleave'].concat(args));}function mouseout(){for(var _len30=arguments.length,args=Array(_len30),_key30=0;_key30<_len30;_key30++){args[_key30]=arguments[_key30];}return eventShortcut.bind(this).apply(undefined,['mouseout'].concat(args));}function mouseover(){for(var _len31=arguments.length,args=Array(_len31),_key31=0;_key31<_len31;_key31++){args[_key31]=arguments[_key31];}return eventShortcut.bind(this).apply(undefined,['mouseover'].concat(args));}function touchstart(){for(var _len32=arguments.length,args=Array(_len32),_key32=0;_key32<_len32;_key32++){args[_key32]=arguments[_key32];}return eventShortcut.bind(this).apply(undefined,['touchstart'].concat(args));}function touchend(){for(var _len33=arguments.length,args=Array(_len33),_key33=0;_key33<_len33;_key33++){args[_key33]=arguments[_key33];}return eventShortcut.bind(this).apply(undefined,['touchend'].concat(args));}function touchmove(){for(var _len34=arguments.length,args=Array(_len34),_key34=0;_key34<_len34;_key34++){args[_key34]=arguments[_key34];}return eventShortcut.bind(this).apply(undefined,['touchmove'].concat(args));}function resize(){for(var _len35=arguments.length,args=Array(_len35),_key35=0;_key35<_len35;_key35++){args[_key35]=arguments[_key35];}return eventShortcut.bind(this).apply(undefined,['resize'].concat(args));}function scroll(){for(var _len36=arguments.length,args=Array(_len36),_key36=0;_key36<_len36;_key36++){args[_key36]=arguments[_key36];}return eventShortcut.bind(this).apply(undefined,['scroll'].concat(args));}/***/},/* 11 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function each(collection,callback){// eslint-disable-next-line
for(var i=0;i<collection.length;i++){var item=collection[i];callback(item);}}var SlideMenu={type:'slide-left',wrapperId:'.js-slide-menu__wrapper',maskId:'.js-slide-menu__mask',menuOpenerClass:'.js-slide-menu',wrapper:null,menu:null,init:function init(){this.body=document.body;this.wrapper=document.querySelector(this.wrapperId);this.mask=document.querySelector(this.maskId);this.menu=document.querySelector('.slide-menu--'+this.type);this.menuOpeners=document.querySelectorAll(this.menuOpenerClass);if(!this.mask){console.error('Missing mask element for SlideMenu, maybe need to add HTML.');return;}this.initEvents();$('.js-mobile-submenu-toggle').on('click',function(){var $el=$(this);$el.parents('.menu-mobile__item').toggleClass('menu-mobile__item--open');$el.find('.icon-reveal-more').toggleClass('icon-reveal-more--active');$el.next('.js-mobile-submenu').slideToggle();});},initEvents:function initEvents(){var _this=this;// Event for clicks on the open buttons.
each(this.menuOpeners,function(item){item.addEventListener('click',function(e){e.preventDefault();_this.open();});});// Event for clicks on the mask.
this.mask.addEventListener('click',function(e){e.preventDefault();_this.close();});},open:function open(){this.body.classList.add('has-active-slide-menu');this.wrapper.classList.add('has-'+this.type);this.menu.classList.add('is-active');this.mask.classList.add('is-active');each(this.menuOpeners,function(item){item.classList.add('is-active');});this.disableMenuOpeners();},close:function close(){this.body.classList.remove('has-active-slide-menu');this.wrapper.classList.remove('has-'+this.type);this.menu.classList.remove('is-active');this.mask.classList.remove('is-active');each(this.menuOpeners,function(item){item.classList.remove('is-active');});this.enableMenuOpeners();},enableMenuOpeners:function enableMenuOpeners(){each(this.menuOpeners,function(item){item.disabled=false;});},disableMenuOpeners:function disableMenuOpeners(){each(this.menuOpeners,function(item){item.disabled=true;});}/* harmony default export */};__webpack_exports__["a"]=SlideMenu;/***/},/* 12 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";var YouTube={init:function init(){var $yt=$('[data-youtube]');if($yt.length===0)return;var tag=document.createElement('script');tag.src='https://www.youtube.com/iframe_api';var firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);function onYouTubeIframeAPIReady(){$yt.each(function(){var $el=$(this);var videoId=$el.data('youtube');new YT.Player('youtube-'+videoId,{height:'100%',width:'100%',videoId:videoId,playerVars:{controls:0,// Show pause/play buttons in player
showinfo:0,// Hide the video title
modestbranding:1,// Hide the Youtube Logo
fs:0,// Hide the full screen button
cc_load_policy:0,// Hide closed captions
iv_load_policy:3,// Hide the Video Annotations
autohide:0// Hide video controls when playing
}});});}window.onYouTubeIframeAPIReady=onYouTubeIframeAPIReady;}/* harmony default export */};__webpack_exports__["a"]=YouTube;/***/},/* 13 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*! Lity - v2.2.2 - 2017-07-17
* http://sorgalla.com/lity/
* Copyright (c) 2015-2017 Jan Sorgalla; Licensed MIT */(function(window,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(14)],__WEBPACK_AMD_DEFINE_RESULT__=function($){return factory(window,$);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof module==='undefined'?'undefined':_typeof(module))==='object'&&_typeof(module.exports)==='object'){module.exports=factory(window,require('jquery'));}else{window.lity=factory(window,window.jQuery||window.Zepto);}})(typeof window!=="undefined"?window:this,function(window,$){'use strict';var document=window.document;var _win=$(window);var _deferred=$.Deferred;var _html=$('html');var _instances=[];var _attrAriaHidden='aria-hidden';var _dataAriaHidden='lity-'+_attrAriaHidden;var _focusableElementsSelector='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';var _defaultOptions={esc:true,handler:null,handlers:{image:imageHandler,inline:inlineHandler,youtube:youtubeHandler,vimeo:vimeoHandler,googlemaps:googlemapsHandler,facebookvideo:facebookvideoHandler,iframe:iframeHandler},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'};var _imageRegexp=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;var _youtubeRegex=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;var _vimeoRegex=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;var _googlemapsRegex=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;var _facebookvideoRegex=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;var _transitionEndEvent=function(){var el=document.createElement('div');var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'};for(var name in transEndEventNames){if(el.style[name]!==undefined){return transEndEventNames[name];}}return false;}();function transitionEnd(element){var deferred=_deferred();if(!_transitionEndEvent||!element.length){deferred.resolve();}else{element.one(_transitionEndEvent,deferred.resolve);setTimeout(deferred.resolve,500);}return deferred.promise();}function settings(currSettings,key,value){if(arguments.length===1){return $.extend({},currSettings);}if(typeof key==='string'){if(typeof value==='undefined'){return typeof currSettings[key]==='undefined'?null:currSettings[key];}currSettings[key]=value;}else{$.extend(currSettings,key);}return this;}function parseQueryParams(params){var pairs=decodeURI(params.split('#')[0]).split('&');var obj={},p;for(var i=0,n=pairs.length;i<n;i++){if(!pairs[i]){continue;}p=pairs[i].split('=');obj[p[0]]=p[1];}return obj;}function appendQueryParams(url,params){return url+(url.indexOf('?')>-1?'&':'?')+$.param(params);}function transferHash(originalUrl,newUrl){var pos=originalUrl.indexOf('#');if(-1===pos){return newUrl;}if(pos>0){originalUrl=originalUrl.substr(pos);}return newUrl+originalUrl;}function error(msg){return $('<span class="lity-error"/>').append(msg);}function imageHandler(target,instance){var desc=instance.opener()&&instance.opener().data('lity-desc')||'Image with no description';var img=$('<img src="'+target+'" alt="'+desc+'"/>');var deferred=_deferred();var failed=function failed(){deferred.reject(error('Failed loading image'));};img.on('load',function(){if(this.naturalWidth===0){return failed();}deferred.resolve(img);}).on('error',failed);return deferred.promise();}imageHandler.test=function(target){return _imageRegexp.test(target);};function inlineHandler(target,instance){var el,placeholder,hasHideClass;try{el=$(target);}catch(e){return false;}if(!el.length){return false;}placeholder=$('<i style="display:none !important"/>');hasHideClass=el.hasClass('lity-hide');instance.element().one('lity:remove',function(){placeholder.before(el).remove();if(hasHideClass&&!el.closest('.lity-content').length){el.addClass('lity-hide');}});return el.removeClass('lity-hide').after(placeholder);}function youtubeHandler(target){var matches=_youtubeRegex.exec(target);if(!matches){return false;}return iframeHandler(transferHash(target,appendQueryParams('https://www.youtube'+(matches[2]||'')+'.com/embed/'+matches[4],$.extend({autoplay:1},parseQueryParams(matches[5]||'')))));}function vimeoHandler(target){var matches=_vimeoRegex.exec(target);if(!matches){return false;}return iframeHandler(transferHash(target,appendQueryParams('https://player.vimeo.com/video/'+matches[3],$.extend({autoplay:1},parseQueryParams(matches[4]||'')))));}function facebookvideoHandler(target){var matches=_facebookvideoRegex.exec(target);if(!matches){return false;}if(0!==target.indexOf('http')){target='https:'+target;}return iframeHandler(transferHash(target,appendQueryParams('https://www.facebook.com/plugins/video.php?href='+target,$.extend({autoplay:1},parseQueryParams(matches[4]||'')))));}function googlemapsHandler(target){var matches=_googlemapsRegex.exec(target);if(!matches){return false;}return iframeHandler(transferHash(target,appendQueryParams('https://www.google.'+matches[3]+'/maps?'+matches[6],{output:matches[6].indexOf('layer=c')>0?'svembed':'embed'})));}function iframeHandler(target){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+target+'"/></div>';}function winHeight(){return document.documentElement.clientHeight?document.documentElement.clientHeight:Math.round(_win.height());}function keydown(e){var current=currentInstance();if(!current){return;}// ESC key
if(e.keyCode===27&&!!current.options('esc')){current.close();}// TAB key
if(e.keyCode===9){handleTabKey(e,current);}}function handleTabKey(e,instance){var focusableElements=instance.element().find(_focusableElementsSelector);var focusedIndex=focusableElements.index(document.activeElement);if(e.shiftKey&&focusedIndex<=0){focusableElements.get(focusableElements.length-1).focus();e.preventDefault();}else if(!e.shiftKey&&focusedIndex===focusableElements.length-1){focusableElements.get(0).focus();e.preventDefault();}}function resize(){$.each(_instances,function(i,instance){instance.resize();});}function registerInstance(instanceToRegister){if(1===_instances.unshift(instanceToRegister)){_html.addClass('lity-active');_win.on({resize:resize,keydown:keydown});}$('body > *').not(instanceToRegister.element()).addClass('lity-hidden').each(function(){var el=$(this);if(undefined!==el.data(_dataAriaHidden)){return;}el.data(_dataAriaHidden,el.attr(_attrAriaHidden)||null);}).attr(_attrAriaHidden,'true');}function removeInstance(instanceToRemove){var show;instanceToRemove.element().attr(_attrAriaHidden,'true');if(1===_instances.length){_html.removeClass('lity-active');_win.off({resize:resize,keydown:keydown});}_instances=$.grep(_instances,function(instance){return instanceToRemove!==instance;});if(!!_instances.length){show=_instances[0].element();}else{show=$('.lity-hidden');}show.removeClass('lity-hidden').each(function(){var el=$(this),oldAttr=el.data(_dataAriaHidden);if(!oldAttr){el.removeAttr(_attrAriaHidden);}else{el.attr(_attrAriaHidden,oldAttr);}el.removeData(_dataAriaHidden);});}function currentInstance(){if(0===_instances.length){return null;}return _instances[0];}function factory(target,instance,handlers,preferredHandler){var handler='inline',content;var currentHandlers=$.extend({},handlers);if(preferredHandler&&currentHandlers[preferredHandler]){content=currentHandlers[preferredHandler](target,instance);handler=preferredHandler;}else{// Run inline and iframe handlers after all other handlers
$.each(['inline','iframe'],function(i,name){delete currentHandlers[name];currentHandlers[name]=handlers[name];});$.each(currentHandlers,function(name,currentHandler){// Handler might be "removed" by setting callback to null
if(!currentHandler){return true;}if(currentHandler.test&&!currentHandler.test(target,instance)){return true;}content=currentHandler(target,instance);if(false!==content){handler=name;return false;}});}return{handler:handler,content:content||''};}function Lity(target,options,opener,activeElement){var self=this;var result;var isReady=false;var isClosed=false;var element;var content;options=$.extend({},_defaultOptions,options);element=$(options.template);// -- API --
self.element=function(){return element;};self.opener=function(){return opener;};self.options=$.proxy(settings,self,options);self.handlers=$.proxy(settings,self,options.handlers);self.resize=function(){if(!isReady||isClosed){return;}content.css('max-height',winHeight()+'px').trigger('lity:resize',[self]);};self.close=function(){if(!isReady||isClosed){return;}isClosed=true;removeInstance(self);var deferred=_deferred();// We return focus only if the current focus is inside this instance
if(activeElement&&(document.activeElement===element[0]||$.contains(element[0],document.activeElement))){try{activeElement.focus();}catch(e){// Ignore exceptions, eg. for SVG elements which can't be
// focused in IE11
}}content.trigger('lity:close',[self]);element.removeClass('lity-opened').addClass('lity-closed');transitionEnd(content.add(element)).always(function(){content.trigger('lity:remove',[self]);element.remove();element=undefined;deferred.resolve();});return deferred.promise();};// -- Initialization --
result=factory(target,self,options.handlers,options.handler);element.attr(_attrAriaHidden,'false').addClass('lity-loading lity-opened lity-'+result.handler).appendTo('body').focus().on('click','[data-lity-close]',function(e){if($(e.target).is('[data-lity-close]')){self.close();}}).trigger('lity:open',[self]);registerInstance(self);$.when(result.content).always(ready);function ready(result){content=$(result).css('max-height',winHeight()+'px');element.find('.lity-loader').each(function(){var loader=$(this);transitionEnd(loader).always(function(){loader.remove();});});element.removeClass('lity-loading').find('.lity-content').empty().append(content);isReady=true;content.trigger('lity:ready',[self]);}}function lity(target,options,opener){if(!target.preventDefault){opener=$(opener);}else{target.preventDefault();opener=$(this);target=opener.data('lity-target')||opener.attr('href')||opener.attr('src');}var instance=new Lity(target,$.extend({},opener.data('lity-options')||opener.data('lity'),options),opener,document.activeElement);if(!target.preventDefault){return instance;}}lity.version='2.2.2';lity.options=$.proxy(settings,lity,_defaultOptions);lity.handlers=$.proxy(settings,lity,_defaultOptions.handlers);lity.current=currentInstance;$(document).on('click.lity','[data-lity]',lity);return lity;});/***/},/* 14 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */(function(global,factory){"use strict";if((typeof module==='undefined'?'undefined':_typeof(module))==="object"&&_typeof(module.exports)==="object"){// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else{factory(global);}// Pass this if window is not defined yet
})(typeof window!=="undefined"?window:this,function(window,noGlobal){// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";var arr=[];var document=window.document;var getProto=Object.getPrototypeOf;var _slice=arr.slice;var concat=arr.concat;var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var fnToString=hasOwn.toString;var ObjectFunctionString=fnToString.call(Object);var support={};function DOMEval(code,doc){doc=doc||document;var script=doc.createElement("script");script.text=code;doc.head.appendChild(script).parentNode.removeChild(script);}/* global Symbol */// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var version="3.2.1",// Define a local copy of jQuery
jQuery=function jQuery(selector,context){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);},// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,// Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g,// Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();};jQuery.fn=jQuery.prototype={// The current version of jQuery being used
jquery:version,constructor:jQuery,// The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){// Return all the elements in a clean array
if(num==null){return _slice.call(this);}// Return just the one element from the set
return num<0?this[num+this.length]:this[num];},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){// Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems);// Add the old object onto the stack (as a reference)
ret.prevObject=this;// Return the newly-formed element set
return ret;},// Execute a callback for every element in the matched set.
each:function each(callback){return jQuery.each(this,callback);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},eq:function eq(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function end(){return this.prevObject||this.constructor();},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;// Handle a deep copy situation
if(typeof target==="boolean"){deep=target;// Skip the boolean and the target
target=arguments[i]||{};i++;}// Handle case when target is a string or something (possible in deep copy)
if((typeof target==='undefined'?'undefined':_typeof(target))!=="object"&&!jQuery.isFunction(target)){target={};}// Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){// Only deal with non-null/undefined values
if((options=arguments[i])!=null){// Extend the base object
for(name in options){src=target[name];copy=options[name];// Prevent never-ending loop
if(target===copy){continue;}// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=Array.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&Array.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy);// Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}}// Return the modified object
return target;};jQuery.extend({// Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),// Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isFunction:function isFunction(obj){return jQuery.type(obj)==="function";},isWindow:function isWindow(obj){return obj!=null&&obj===obj.window;},isNumeric:function isNumeric(obj){// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type=jQuery.type(obj);return(type==="number"||type==="string")&&// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
!isNaN(obj-parseFloat(obj));},isPlainObject:function isPlainObject(obj){var proto,Ctor;// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
if(!obj||toString.call(obj)!=="[object Object]"){return false;}proto=getProto(obj);// Objects with no prototype (e.g., `Object.create( null )`) are plain
if(!proto){return true;}// Objects with prototype are plain iff they were constructed by a global Object function
Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;},isEmptyObject:function isEmptyObject(obj){/* eslint-disable no-unused-vars */// See https://github.com/eslint/eslint/issues/6125
var name;for(name in obj){return false;}return true;},type:function type(obj){if(obj==null){return obj+"";}// Support: Android <=2.3 only (functionish RegExp)
return(typeof obj==='undefined'?'undefined':_typeof(obj))==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj==='undefined'?'undefined':_typeof(obj);},// Evaluates a script in a global context
globalEval:function globalEval(code){DOMEval(code);},// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 13
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},each:function each(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;},// Support: Android <=4.0 only
trim:function trim(text){return text==null?"":(text+"").replace(rtrim,"");},// results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else{push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;// Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;},// arg is for internal usage only
map:function map(elems,callback,arg){var length,value,i=0,ret=[];// Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}// Go through every key on the object,
}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}// Flatten any nested arrays
return concat.apply([],ret);},// A global GUID counter for objects
guid:1,// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;}// Simulated bind
args=_slice.call(arguments,2);proxy=function proxy(){return fn.apply(context||this,args.concat(_slice.call(arguments)));};// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},now:Date.now,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];}// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length"in obj&&obj.length,type=jQuery.type(obj);if(type==="function"||jQuery.isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle=/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,// Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,// Instance-specific data
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;}return 0;},// Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]",// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+// Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+// 3. anything else (capture 2)
".*"+")\\)|)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),// For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function funescape(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000;// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high!==high||escapedWhitespace?escaped:high<0?// BMP codepoint
String.fromCharCode(high+0x10000):// Supplemental Plane codepoint (surrogate pair)
String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function fcssescape(ch,asCodePoint){if(asCodePoint){// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){return'\uFFFD';}// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}// Other potentially-special ASCII characters get backslash-escaped
return"\\"+ch;},// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();},disabledAncestor=addCombinator(function(elem){return elem.disabled===true&&("form"in elem||"label"in elem);},{dir:"parentNode",next:"legend"});// Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes);// Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?// Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els));}:// Support: IE<9
// Otherwise append directly
function(target,els){var j=target.length,i=0;// Can't trust NodeList.length
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,// nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[];// Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}context=context||document;if(documentIsHTML){// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){// ID selector
if(m=match[1]){// Document context
if(nodeType===9){if(elem=context.getElementById(m)){// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m){results.push(elem);return results;}}else{return results;}// Element context
}else{// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}// Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;// Class selector
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}// Take advantage of querySelectorAll
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(nodeType!==1){newContext=context;newSelector=selector;// qSA looks outside Element context, which is not what we want
// Thanks to Andrew Dupont for this workaround technique
// Support: IE <=8
// Exclude object elements
}else if(context.nodeName.toLowerCase()!=="object"){// Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=nid.replace(rcssescape,fcssescape);}else{context.setAttribute("id",nid=expando);}// Prefix every selector in the list
groups=tokenize(selector);i=groups.length;while(i--){groups[i]="#"+nid+" "+toSelector(groups[i]);}newSelector=groups.join(",");// Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(nid===expando){context.removeAttribute("id");}}}}}}// All others
return select(selector.replace(rtrim,"$1"),context,results,seed);}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key+" ")>Expr.cacheLength){// Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{// Remove from its parent by default
if(el.parentNode){el.parentNode.removeChild(el);}// release memory in IE
el=null;}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&a.sourceIndex-b.sourceIndex;// Use IE sourceIndex if available on both nodes
if(diff){return diff;}// Check if b follows a
if(cur){while(cur=cur.nextSibling){if(cur===b){return-1;}}}return a?1:-1;}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */function createDisabledPseudo(disabled){// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(elem){// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
if("form"in elem){// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
if(elem.parentNode&&elem.disabled===false){// Option elements defer to a parent optgroup if present
if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}// Support: IE 6 - 11
// Use the isDisabled shortcut property to check for disabled fieldset ancestors
return elem.isDisabled===disabled||// Where there is no isDisabled, check manually
/* jshint -W018 */elem.isDisabled!==!disabled&&disabledAncestor(elem)===disabled;}return elem.disabled===disabled;// Try to winnow out elements that can't be disabled before trusting the disabled property.
// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
// even exist on them, let alone have a boolean value.
}else if("label"in elem){return elem.disabled===disabled;}// Remaining elements are neither :enabled nor :disabled
return false;};}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;// Match elements found at the specified indexes
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;}// Expose support vars for convenience
support=Sizzle.support={};/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML=Sizzle.isXML=function(elem){// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;// Return early if doc is invalid or already selected
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;}// Update global variables
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document);// Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
if(preferredDoc!==document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){// Support: IE 11, Edge
if(subWindow.addEventListener){subWindow.addEventListener("unload",unloadHandler,false);// Support: IE 9 - 10 only
}else if(subWindow.attachEvent){subWindow.attachEvent("onunload",unloadHandler);}}/* Attributes
	---------------------------------------------------------------------- */// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes=assert(function(el){el.className="i";return!el.getAttribute("className");});/* getElement(s)By*
	---------------------------------------------------------------------- */// Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName=assert(function(el){el.appendChild(document.createComment(""));return!el.getElementsByTagName("*").length;});// Support: IE<9
support.getElementsByClassName=rnative.test(document.getElementsByClassName);// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(el){docElem.appendChild(el).id=expando;return!document.getElementsByName||!document.getElementsByName(expando).length;});// ID filter and find
if(support.getById){Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){// Verify the id attribute
node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}// Fall back on getElementsByName
elems=context.getElementsByName(id);i=0;while(elem=elems[i++]){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}return[];}};}// Tag
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);// DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0,// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag);// Filter out possible comments
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;};// Class
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}};/* QSA/matchesSelector
	---------------------------------------------------------------------- */// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches=[];// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See https://bugs.jquery.com/ticket/13378
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){// Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(el){// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>";// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(el.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}// Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}});assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a>"+"<select disabled='disabled'><option/></select>";// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");// Support: IE8
// Enforce case-sensitivity of name attribute
if(el.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(el.querySelectorAll(":enabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
docElem.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Opera 10-11 does not throw on post-comma invalid pseudos
el.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(el){// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(el,"*");// This should fail with an exception
// Gecko does not error, returns false instead
matches.call(el,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));/* Contains
	---------------------------------------------------------------------- */hasCompare=rnative.test(docElem.compareDocumentPosition);// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;};/* Sorting
	---------------------------------------------------------------------- */// Document order sorting
sortOrder=hasCompare?function(a,b){// Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;}// Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}// Calculate position if both inputs belong to the same document
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):// Otherwise we know they are disconnected
1;// Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){// Choose the first element that is related to our preferred document
if(a===document||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return-1;}if(b===document||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;}// Maintain original order
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){// Exit early if the nodes are identical
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];// Parentless nodes are either documents or disconnected
if(!aup||!bup){return a===document?-1:b===document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;// If the nodes are siblings, we can do a quick check
}else if(aup===bup){return siblingCheck(a,b);}// Otherwise we need full lists of their ancestors for comparison
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);}// Walk down the tree looking for a discrepancy
while(ap[i]===bp[i]){i++;}return i?// Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]):// Otherwise nodes in our document sort first
ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){// Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}// Make sure that attribute selectors are quoted
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&!compilerCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);// IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){// Set document vars if needed
if((context.ownerDocument||context)!==document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){// Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()],// Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape);};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;// Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}}// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;};/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){// If no nodeType, this is expected to be an array
while(node=elem[i++]){// Do not traverse comment nodes
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent==="string"){return elem.textContent;}else{// Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}// Do not include comment or processing instruction nodes
return ret;};Expr=Sizzle.selectors={// Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1]=match[1].replace(runescape,funescape);// Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function CHILD(match){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){// nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);}// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd");// other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}// Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||"";// Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&(// Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&(// advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){// excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}// Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function CHILD(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?// Shortcut for :nth-*(n)
function(elem){return!!elem.parentNode;}:function(elem,context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){// :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}// Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild];// non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){// Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||(// Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){// When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else{// Use previously-cached element index if available
if(useCache){// ...in a gzip-friendly way
node=elem;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){// Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){// Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}}// Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function PSEUDO(pseudo,argument){// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);}// But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{// Potentially complex pseudos
"not":markFunction(function(selector){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;// Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);// Don't keep the element (issue #299)
input[0]=null;return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){// lang value must be a valid identifier
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),// Miscellaneous
"target":function target(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function root(elem){return elem===docElem;},"focus":function focus(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},// Boolean properties
"enabled":createDisabledPseudo(false),"disabled":createDisabledPseudo(true),"checked":function checked(elem){// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function selected(elem){// Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected===true;},// Contents
"empty":function empty(elem){// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function parent(elem){return!Expr.pseudos["empty"](elem);},// Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&(// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},// Position-in-collection
"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];// Add button/input type pseudos
for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}// Easy API for creating new setFilters
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){// Comma and first run
if(!matched||(match=rcomma.exec(soFar))){if(match){// Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false;// Combinators
if(match=rcombinators.exec(soFar)){matched=match.shift();tokens.push({value:matched,// Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}// Filters
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}}// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector):// Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?// Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}return false;}:// Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if(skip&&skip===elem.nodeName.toLowerCase()){elem=elem[dir]||elem;}else if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){// Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else{// Reuse newcache so results back-propagate to previous elements
uniqueCache[key]=newCache;// A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}return false;};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,// Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),// Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)?// ...intermediate processing is necessary
[]:// ...otherwise use results directly
results:matcherIn;// Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);}// Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);// Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){// Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){// Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);}// Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}// Add elements to results, through postFinder if defined
}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,// The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));// Avoid hanging onto element (issue #299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);// Return special upon seeing a positional matcher
if(matcher[expando]){// Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,// We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find["TAG"]("*",outermost),// Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){outermostContext=context===document||context||outermost;}// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;if(!context&&elem.ownerDocument!==document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}}// Track unmatched elements for set filters
if(bySet){// They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;}// Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}}// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i;// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){// Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}// Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);}// Add matches to results
push.apply(results,setMatched);// Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}}// Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match/* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){// Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}// Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));// Save selector and tokenization
cached.selector=selector;}return cached;};/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[];// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){// Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;// Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);}// Fetch a seed set for right-to-left matching
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];// Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){// Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){// If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}}// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};// One-time assignments
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates=!!hasDuplicate;// Initialize against the default document
setDocument();// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(el){// Should return 1, but returns 4 (following)
return el.compareDocumentPosition(document.createElement("fieldset"))&1;});// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(el){el.innerHTML="<a href='#'></a>";return el.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes||!assert(function(el){el.innerHTML="<input/>";el.firstChild.setAttribute("value","");return el.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(el){return el.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;// Deprecated
jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;jQuery.escapeSelector=Sizzle.escape;var dir=function dir(elem,_dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[_dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var _siblings=function _siblings(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();};var rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;var risSimple=/^.[^:#\[\.,]*$/;// Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}// Single element
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}// Arraylike of elements (jQuery, arguments, Array)
if(typeof qualifier!=="string"){return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}// Simple selector that can be filtered directly, removing non-Elements
if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}// Complex selector, compare the two sets, removing non-Elements
qualifier=jQuery.filter(qualifier,elements);return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not&&elem.nodeType===1;});}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}if(elems.length===1&&elem.nodeType===1){return jQuery.find.matchesSelector(elem,expr)?[elem]:[];}return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function find(selector){var i,ret,len=this.length,self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}ret=this.pushStack([]);for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}return len>1?jQuery.uniqueSort(ret):ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector||[],false));},not:function not(selector){return this.pushStack(winnow(this,selector||[],true));},is:function is(selector){return!!winnow(this,// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;}// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery;// Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){// Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else{match=rquickExpr.exec(selector);}// Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){// HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context;// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));// HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){// Properties of context are called as methods if possible
if(jQuery.isFunction(this[match])){this[match](context[match]);// ...and otherwise set as attributes
}else{this.attr(match,context[match]);}}}return this;// HANDLE: $(#id)
}else{elem=document.getElementById(match[2]);if(elem){// Inject the element directly into the jQuery object
this[0]=elem;this.length=1;}return this;}// HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return(context||root).find(selector);// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else{return this.constructor(context).find(selector);}// HANDLE: $(DOMElement)
}else if(selector.nodeType){this[0]=selector;this.length=1;return this;// HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return root.ready!==undefined?root.ready(selector):// Execute immediately if ready is not present
selector(jQuery);}return jQuery.makeArray(selector,this);};// Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn;// Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,// Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],targets=typeof selectors!=="string"&&jQuery(selectors);// Positional selectors never match, since there's no _selection_ context
if(!rneedsContext.test(selectors)){for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){// Always skip document fragments
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:// Don't pass non-elements to Sizzle
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);},// Determine the position of an element within the set
index:function index(elem){// No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;}// Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);}// Locate the position of the desired element
return indexOf.call(this,// If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return dir(elem,"nextSibling");},prevAll:function prevAll(elem){return dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return dir(elem,"previousSibling",until);},siblings:function siblings(elem){return _siblings((elem.parentNode||{}).firstChild,elem);},children:function children(elem){return _siblings(elem.firstChild);},contents:function contents(elem){if(nodeName(elem,"iframe")){return elem.contentDocument;}// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
if(nodeName(elem,"template")){elem=elem.content||elem;}return jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){// Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);}// Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;// Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=true;});return object;}/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var// Flag to know if list is currently firing
firing,// Last fire value for non-forgettable lists
memory,// Flag to know if list was already fired
_fired,// Flag to prevent firing
_locked,// Actual callback list
list=[],// Queue of execution data for repeatable lists
queue=[],// Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1,// Fire callbacks
fire=function fire(){// Enforce single-firing
_locked=_locked||options.once;// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
_fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){// Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){// Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}}// Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false;// Clean up if we're done firing for good
if(_locked){// Keep an empty list if we have data for future add calls
if(memory){list=[];// Otherwise, this object is spent
}else{list="";}}},// Actual Callbacks object
self={// Add a callback or a collection of callbacks to the list
add:function add(){if(list){// If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(jQuery.isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&jQuery.type(arg)!=="string"){// Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;},// Remove a callback from the list
remove:function remove(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);// Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;},// Remove all callbacks from the list
empty:function empty(){if(list){list=[];}return this;},// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function disable(){_locked=queue=[];list=memory="";return this;},disabled:function disabled(){return!list;},// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function lock(){_locked=queue=[];if(!memory&&!firing){list=memory="";}return this;},locked:function locked(){return!!_locked;},// Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(!_locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;},// Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;},// To know if the callbacks have already been called at least once
fired:function fired(){return!!_fired;}};return self;};function Identity(v){return v;}function Thrower(ex){throw ex;}function adoptValue(value,resolve,reject,noValue){var method;try{// Check for promise aspect first to privilege synchronous behavior
if(value&&jQuery.isFunction(method=value.promise)){method.call(value).done(resolve).fail(reject);// Other thenables
}else if(value&&jQuery.isFunction(method=value.then)){method.call(value,resolve,reject);// Other non-thenables
}else{// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
resolve.apply(undefined,[value].slice(noValue));}// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
// Deferred#then to conditionally suppress rejection.
}catch(value){// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
reject.apply(undefined,[value]);}}jQuery.extend({Deferred:function Deferred(func){var tuples=[// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},"catch":function _catch(fn){return _promise.then(null,fn);},// Keep pipe for back-compat
pipe:function pipe()/* fnDone, fnFail, fnProgress */{var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var fn=jQuery.isFunction(fns[tuple[4]])&&fns[tuple[4]];// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else{newDefer[tuple[0]+"With"](this,fn?[returned]:arguments);}});});fns=null;}).promise();},then:function then(onFulfilled,onRejected,onProgress){var maxDepth=0;function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function mightThrow(){var returned,then;// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(depth<maxDepth){return;}returned=handler.apply(that,args);// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(returned===deferred.promise()){throw new TypeError("Thenable self-resolution");}// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
then=returned&&(// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
(typeof returned==='undefined'?'undefined':_typeof(returned))==="object"||typeof returned==="function")&&returned.then;// Handle a returned thenable
if(jQuery.isFunction(then)){// Special processors (notify) just wait for resolution
if(special){then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special));// Normal processors (resolve) also hook into progress
}else{// ...and disregard older resolution values
maxDepth++;then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith));}// Handle all other returned values
}else{// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Identity){that=undefined;args=[returned];}// Process the value(s)
// Default process is resolve
(special||deferred.resolveWith)(that,args);}},// Only normal processors (resolve) catch and reject exceptions
process=special?mightThrow:function(){try{mightThrow();}catch(e){if(jQuery.Deferred.exceptionHook){jQuery.Deferred.exceptionHook(e,process.stackTrace);}// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
if(depth+1>=maxDepth){// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Thrower){that=undefined;args=[e];}deferred.rejectWith(that,args);}}};// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
if(depth){process();}else{// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
if(jQuery.Deferred.getStackHook){process.stackTrace=jQuery.Deferred.getStackHook();}window.setTimeout(process);}};}return jQuery.Deferred(function(newDefer){// progress_handlers.add( ... )
tuples[0][3].add(resolve(0,newDefer,jQuery.isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith));// fulfilled_handlers.add( ... )
tuples[1][3].add(resolve(0,newDefer,jQuery.isFunction(onFulfilled)?onFulfilled:Identity));// rejected_handlers.add( ... )
tuples[2][3].add(resolve(0,newDefer,jQuery.isFunction(onRejected)?onRejected:Thrower));}).promise();},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj!=null?jQuery.extend(obj,_promise):_promise;}},deferred={};// Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
_promise[tuple[1]]=list.add;// Handle state
if(stateString){list.add(function(){// state = "resolved" (i.e., fulfilled)
// state = "rejected"
_state=stateString;},// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[3-i][2].disable,// progress_callbacks.lock
tuples[0][2].lock);}// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add(tuple[3].fire);// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?undefined:this,arguments);return this;};// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[tuple[0]+"With"]=list.fireWith;});// Make the deferred a promise
_promise.promise(deferred);// Call given func if any
if(func){func.call(deferred,deferred);}// All done!
return deferred;},// Deferred helper
when:function when(singleValue){var// count of uncompleted subordinates
remaining=arguments.length,// count of unprocessed arguments
i=remaining,// subordinate fulfillment data
resolveContexts=Array(i),resolveValues=_slice.call(arguments),// the master Deferred
master=jQuery.Deferred(),// subordinate callback factory
updateFunc=function updateFunc(i){return function(value){resolveContexts[i]=this;resolveValues[i]=arguments.length>1?_slice.call(arguments):value;if(! --remaining){master.resolveWith(resolveContexts,resolveValues);}};};// Single- and empty arguments are adopted like Promise.resolve
if(remaining<=1){adoptValue(singleValue,master.done(updateFunc(i)).resolve,master.reject,!remaining);// Use .then() to unwrap secondary thenables (cf. gh-3000)
if(master.state()==="pending"||jQuery.isFunction(resolveValues[i]&&resolveValues[i].then)){return master.then();}}// Multiple arguments are aggregated like Promise.all array elements
while(i--){adoptValue(resolveValues[i],updateFunc(i),master.reject);}return master.promise();}});// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook=function(error,stack){// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
if(window.console&&window.console.warn&&error&&rerrorNames.test(error.name)){window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,stack);}};jQuery.readyException=function(error){window.setTimeout(function(){throw error;});};// The deferred used on DOM ready
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){readyList.then(fn)// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
.catch(function(error){jQuery.readyException(error);});return this;};jQuery.extend({// Is the DOM ready to be used? Set to true once it occurs.
isReady:false,// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,// Handle when the DOM is ready
ready:function ready(wait){// Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}// Remember that the DOM is ready
jQuery.isReady=true;// If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;}// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]);}});jQuery.ready.then=readyList.then;// The ready event handler and self cleanup method
function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){// Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else{// Use the handy event callback
document.addEventListener("DOMContentLoaded",completed);// A fallback to window.onload, that will always work
window.addEventListener("load",completed);}// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function access(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;// Sets many values
if(jQuery.type(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);}// Sets one value
}else if(value!==undefined){chainable=true;if(!jQuery.isFunction(value)){raw=true;}if(bulk){// Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null;// ...except when executing function values
}else{bulk=fn;fn=function fn(elem,key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}if(chainable){return elems;}// Gets
if(bulk){return fn.call(elems);}return len?fn(elems[0],key):emptyGet;};var acceptData=function acceptData(owner){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return owner.nodeType===1||owner.nodeType===9||!+owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={cache:function cache(owner){// Check if the owner object already has a cache
var value=owner[this.expando];// If not, create one
if(!value){value={};// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(acceptData(owner)){// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value;// Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else{Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function set(owner,data,value){var prop,cache=this.cache(owner);// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if(typeof data==="string"){cache[jQuery.camelCase(data)]=value;// Handle: [ owner, { properties } ] args
}else{// Copy the properties one-by-one to the cache object
for(prop in data){cache[jQuery.camelCase(prop)]=data[prop];}}return cache;},get:function get(owner,key){return key===undefined?this.cache(owner):// Always use camelCase key (gh-2257)
owner[this.expando]&&owner[this.expando][jQuery.camelCase(key)];},access:function access(owner,key,value){// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){return this.get(owner,key);}// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value);// Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function remove(owner,key){var i,cache=owner[this.expando];if(cache===undefined){return;}if(key!==undefined){// Support array or space separated string of keys
if(Array.isArray(key)){// If key is an array of keys...
// We always set camelCase keys, so remove that.
key=key.map(jQuery.camelCase);}else{key=jQuery.camelCase(key);// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
key=key in cache?[key]:key.match(rnothtmlwhite)||[];}i=key.length;while(i--){delete cache[key[i]];}}// Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
if(owner.nodeType){owner[this.expando]=undefined;}else{delete owner[this.expando];}}},hasData:function hasData(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data();//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function getData(data){if(data==="true"){return true;}if(data==="false"){return false;}if(data==="null"){return null;}// Only convert to a number if it doesn't change the string
if(data===+data+""){return+data;}if(rbrace.test(data)){return JSON.parse(data);}return data;}function dataAttr(elem,key,data){var name;// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=getData(data);}catch(e){}// Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data);}else{data=undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function data(elem,name,_data){return dataUser.access(elem,name,_data);},removeData:function removeData(elem,name){dataUser.remove(elem,name);},// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function _data(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function _removeData(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;// Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){// Support: IE 11 only
// The attrs elements can be null (#14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;}// Sets multiple values
if((typeof key==='undefined'?'undefined':_typeof(key))==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data;// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){// Attempt to get data from the cache
// The key will always be camelCased in Data
data=dataUser.get(elem,key);if(data!==undefined){return data;}// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,key);if(data!==undefined){return data;}// We tried really hard, but the data doesn't exist.
return;}// Set the data...
this.each(function(){// We always store the camelCased key
dataUser.set(this,key,value);});},null,value,arguments.length>1,null,true);},removeData:function removeData(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type);// Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||Array.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}return queue||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);};// If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");}// Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}},// Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);// Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var isHiddenWithinTree=function isHiddenWithinTree(elem,el){// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;// Inline style trumps all
return elem.style.display==="none"||elem.style.display===""&&// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
jQuery.contains(elem.ownerDocument,elem)&&jQuery.css(elem,"display")==="none";};var swap=function swap(elem,options,callback,args){var ret,name,old={};// Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.apply(elem,args||[]);// Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale=1,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),// Starting value computation is required for potential unit mismatches
initialInUnit=(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){// Trust units reported by jQuery.css
unit=unit||initialInUnit[3];// Make sure we update the tween properties later on
valueParts=valueParts||[];// Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;do{// If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale=scale||".5";// Adjust and apply
initialInUnit=initialInUnit/scale;jQuery.style(elem,prop,initialInUnit+unit);// Update scale, tolerating zero or NaN from tween.cur()
// Break the loop if scale is unchanged or perfect, or if we've just had enough.
}while(scale!==(scale=currentValue()/initial)&&scale!==1&&--maxIterations);}if(valueParts){initialInUnit=+initialInUnit||+initial||0;// Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var defaultDisplayMap={};function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];if(display){return display;}temp=doc.body.appendChild(doc.createElement(nodeName));display=jQuery.css(temp,"display");temp.parentNode.removeChild(temp);if(display==="none"){display="block";}defaultDisplayMap[nodeName]=display;return display;}function showHide(elements,show){var display,elem,values=[],index=0,length=elements.length;// Determine new display value for elements that need to change
for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}display=elem.style.display;if(show){// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
if(display==="none"){values[index]=dataPriv.get(elem,"display")||null;if(!values[index]){elem.style.display="";}}if(elem.style.display===""&&isHiddenWithinTree(elem)){values[index]=getDefaultDisplay(elem);}}else{if(display!=="none"){values[index]="none";// Remember what we're overwriting
dataPriv.set(elem,"display",display);}}}// Set the display of the elements in a second loop to avoid constant reflow
for(index=0;index<length;index++){if(values[index]!=null){elements[index].style.display=values[index];}}return elements;}jQuery.fn.extend({show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHiddenWithinTree(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i;var rscriptType=/^$|\/(?:java|ecma)script/i;// We have to close these tags to support XHTML (#13200)
var wrapMap={// Support: IE <=9 only
option:[1,"<select multiple='multiple'>","</select>"],// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};// Support: IE <=9 only
wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;function getAll(context,tag){// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var ret;if(typeof context.getElementsByTagName!=="undefined"){ret=context.getElementsByTagName(tag||"*");}else if(typeof context.querySelectorAll!=="undefined"){ret=context.querySelectorAll(tag||"*");}else{ret=[];}if(tag===undefined||tag&&nodeName(context,tag)){return jQuery.merge([context],ret);}return ret;}// Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){// Add nodes directly
if(jQuery.type(elem)==="object"){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem);// Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));// Convert html into DOM nodes
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));// Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2];// Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;}// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes);// Remember the top-level container
tmp=fragment.firstChild;// Ensure the created nodes are orphaned (#12392)
tmp.textContent="";}}}// Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){// Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}contains=jQuery.contains(elem.ownerDocument,elem);// Append to fragment
tmp=getAll(fragment.appendChild(elem),"script");// Preserve script evaluation history
if(contains){setGlobalEval(tmp);}// Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;})();var documentElement=document.documentElement;var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;}// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function _on(elem,types,selector,data,fn,one){var origFn,type;// Types can be a map of types/handlers
if((typeof types==='undefined'?'undefined':_typeof(types))==="object"){// ( types-Object, selector, data )
if(typeof selector!=="string"){// ( types-Object, data )
data=data||selector;selector=undefined;}for(type in types){_on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){// ( types, fn )
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){// ( types, selector, fn )
fn=data;data=undefined;}else{// ( types, data, fn )
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function fn(event){// Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);};// Use same guid so caller can remove using origFn
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});}/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem);// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(!elemData){return;}// Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
if(selector){jQuery.find.matchesSelector(documentElement,selector);}// Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid=jQuery.guid++;}// Init the element's event structure and main handler, if this is the first
if(!(events=elemData.events)){events=elemData.events={};}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};}// Handle multiple events separated by a space
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// There *must* be a type, no attaching namespace-only handlers
if(!type){continue;}// If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{};// If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type;// Update special based on newly reset type
special=jQuery.event.special[type]||{};// handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);// Init the event handler queue if we're the first
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0;// Only use addEventListener if the special events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}// Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}// Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=true;}},// Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;}// Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");// Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}}// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}}// Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function dispatch(nativeEvent){// Make a writable jQuery.Event from the native event object
var event=jQuery.event.fix(nativeEvent);var i,j,ret,matched,handleObj,handlerQueue,args=new Array(arguments.length),handlers=(dataPriv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{};// Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;for(i=1;i<arguments.length;i++){args[i]=arguments[i];}event.delegateTarget=this;// Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}// Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers);// Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){// Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
if(!event.rnamespace||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}// Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target;// Find delegate handlers
if(delegateCount&&// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
cur.nodeType&&// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!(event.type==="click"&&event.button>=1)){for(;cur!==this;cur=cur.parentNode||this){// Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(cur.nodeType===1&&!(event.type==="click"&&cur.disabled===true)){matchedHandlers=[];matchedSelectors={};for(i=0;i<delegateCount;i++){handleObj=_handlers[i];// Don't conflict with Object.prototype properties (#13203)
sel=handleObj.selector+" ";if(matchedSelectors[sel]===undefined){matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matchedSelectors[sel]){matchedHandlers.push(handleObj);}}if(matchedHandlers.length){handlerQueue.push({elem:cur,handlers:matchedHandlers});}}}}// Add the remaining (directly-bound) handlers
cur=this;if(delegateCount<_handlers.length){handlerQueue.push({elem:cur,handlers:_handlers.slice(delegateCount)});}return handlerQueue;},addProp:function addProp(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:true,configurable:true,get:jQuery.isFunction(hook)?function(){if(this.originalEvent){return hook(this.originalEvent);}}:function(){if(this.originalEvent){return this.originalEvent[name];}},set:function set(value){Object.defineProperty(this,name,{enumerable:true,configurable:true,writable:true,value:value});}});},fix:function fix(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent);},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:true},focus:{// Fire native event if possible so blur/focus sequence is correct
trigger:function trigger(){if(this!==safeActiveElement()&&this.focus){this.focus();return false;}},delegateType:"focusin"},blur:{trigger:function trigger(){if(this===safeActiveElement()&&this.blur){this.blur();return false;}},delegateType:"focusout"},click:{// For checkbox, fire native event so checked state will be right
trigger:function trigger(){if(this.type==="checkbox"&&this.click&&nodeName(this,"input")){this.click();return false;}},// For cross-browser consistency, don't fire native .click() on links
_default:function _default(event){return nodeName(event.target,"a");}},beforeunload:{postDispatch:function postDispatch(event){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};jQuery.removeEvent=function(elem,type,handle){// This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){// Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}// Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type;// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&// Support: Android <=2.3 only
src.returnValue===false?returnTrue:returnFalse;// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (#504, #13143)
this.target=src.target&&src.target.nodeType===3?src.target.parentNode:src.target;this.currentTarget=src.currentTarget;this.relatedTarget=src.relatedTarget;// Event type
}else{this.type=src;}// Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);}// Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||jQuery.now();// Mark it as fixed
this[jQuery.expando]=true;};// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:false,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e&&!this.isSimulated){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopImmediatePropagation();}this.stopPropagation();}};// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each({altKey:true,bubbles:true,cancelable:true,changedTouches:true,ctrlKey:true,detail:true,eventPhase:true,metaKey:true,pageX:true,pageY:true,shiftKey:true,view:true,"char":true,charCode:true,key:true,keyCode:true,button:true,buttons:true,clientX:true,clientY:true,offsetX:true,offsetY:true,pointerId:true,pointerType:true,screenX:true,screenY:true,targetTouches:true,toElement:true,touches:true,which:function which(event){var button=event.button;// Add which for key events
if(event.which==null&&rkeyEvent.test(event.type)){return event.charCode!=null?event.charCode:event.keyCode;}// Add which for click: 1 === left; 2 === middle; 3 === right
if(!event.which&&button!==undefined&&rmouseEvent.test(event.type)){if(button&1){return 1;}if(button&2){return 3;}if(button&4){return 2;}return 0;}return event.which;}},jQuery.event.addProp);// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function on(types,selector,data,fn){return _on(this,types,selector,data,fn);},one:function one(types,selector,data,fn){return _on(this,types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){// ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if((typeof types==='undefined'?'undefined':_typeof(types))==="object"){// ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){// ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var/* eslint-disable max-len */// See https://github.com/eslint/eslint/issues/3229
rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,/* eslint-enable */// Support: IE <=10 - 11, Edge 12 - 13
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i,// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;// Prefer a tbody over its parent table for containing new rows
function manipulationTarget(elem,content){if(nodeName(elem,"table")&&nodeName(content.nodeType!==11?content:content.firstChild,"tr")){return jQuery(">tbody",elem)[0]||elem;}return elem;}// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type=match[1];}else{elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(dest.nodeType!==1){return;}// 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.access(src);pdataCur=dataPriv.set(dest,pdataOld);events=pdataOld.events;if(events){delete pdataCur.handle;pdataCur.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}}// 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}}// Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked;// Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){// Flatten any nested arrays
args=concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value);// We can't cloneNode fragments that contain checked, in WebKit
if(isFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(isFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}// Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);// Keep references to cloned scripts for later restoration
if(hasScripts){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;// Reenable scripts
jQuery.map(scripts,restoreScript);// Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){// Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl){jQuery._evalUrl(node.src);}}else{DOMEval(node.textContent.replace(rcleanScript,""),doc);}}}}}}return collection;}function _remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&jQuery.contains(node.ownerDocument,node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function htmlPrefilter(html){return html.replace(rxhtmlTag,"<$1></$2>");},clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem);// Fix IE cloning issues
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}}// Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else{cloneCopyEvent(elem,clone);}}// Preserve script evaluation history
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));}// Return the cloned set
return clone;},cleanData:function cleanData(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);// This is a shortcut to avoid jQuery.event.remove's overhead
}else{jQuery.removeEvent(elem,type,data.handle);}}}// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({detach:function detach(selector){return _remove(this,selector,true);},remove:function remove(selector){return _remove(this,selector);},text:function text(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function append(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function empty(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){// Prevent memory leaks
jQuery.cleanData(getAll(elem,false));// Remove any remaining nodes
elem.textContent="";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;}// See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{};// Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0;// If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var ignored=[];// Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}}// Force callback invocation
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
push.apply(ret,elems.get());}return this.pushStack(ret);};});var rmargin=/^margin/;var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var getStyles=function getStyles(elem){// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};(function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){// This is a singleton, we need to execute it only once
if(!div){return;}div.style.cssText="box-sizing:border-box;"+"position:relative;display:block;"+"margin:auto;border:1px;padding:1px;"+"top:1%;width:50%";div.innerHTML="";documentElement.appendChild(container);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
reliableMarginLeftVal=divStyle.marginLeft==="2px";boxSizingReliableVal=divStyle.width==="4px";// Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
div.style.marginRight="50%";pixelMarginRightVal=divStyle.marginRight==="4px";documentElement.removeChild(container);// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
div=null;}var pixelPositionVal,boxSizingReliableVal,pixelMarginRightVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");// Finish early in limited (non-browser) environments
if(!div.style){return;}// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";container.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;"+"padding:0;margin-top:1px;position:absolute";container.appendChild(div);jQuery.extend(support,{pixelPosition:function pixelPosition(){computeStyleTests();return pixelPositionVal;},boxSizingReliable:function boxSizingReliable(){computeStyleTests();return boxSizingReliableVal;},pixelMarginRight:function pixelMarginRight(){computeStyleTests();return pixelMarginRightVal;},reliableMarginLeft:function reliableMarginLeft(){computeStyleTests();return reliableMarginLeftVal;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,// Support: Firefox 51+
// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
style=elem.style;computed=computed||getStyles(elem);// getPropertyValue is needed for:
//   .css('filter') (IE 9 only, #12537)
//   .css('--customProperty) (#3144)
if(computed){ret=computed.getPropertyValue(name)||computed[name];if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);}// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
if(!support.pixelMarginRight()&&rnumnonpx.test(ret)&&rmargin.test(name)){// Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;// Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;// Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined?// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){// Define the hook, we'll check on the first run if it's really needed.
return{get:function get(){if(conditionFn()){// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;}// Hook needed; redefine it so that the support test is not executed again.
return(this.get=hookFn).apply(this,arguments);}};}var// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,rcustomProp=/^--/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style;// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(name){// Shortcut for names that are not vendor prefixed
if(name in emptyStyle){return name;}// Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName(name){var ret=jQuery.cssProps[name];if(!ret){ret=jQuery.cssProps[name]=vendorPropName(name)||name;}return ret;}function setPositiveNumber(elem,value,subtract){// Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches?// Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i,val=0;// If we already have the right measurement, avoid augmentation
if(extra===(isBorderBox?"border":"content")){i=4;// Otherwise initialize for horizontal or vertical properties
}else{i=name==="width"?1:0;}for(;i<4;i+=2){// Both box models exclude margin, so add it if we want it
if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles);}if(isBorderBox){// border-box includes padding, so remove it if we want content
if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}// At this point, extra isn't border nor margin, so remove border
if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}else{// At this point, extra isn't content, so add padding
val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);// At this point, extra isn't content nor padding, so add border
if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}return val;}function getWidthOrHeight(elem,name,extra){// Start with computed style
var valueIsBorderBox,styles=getStyles(elem),val=curCSS(elem,name,styles),isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";// Computed unit is not pixels. Stop here and return.
if(rnumnonpx.test(val)){return val;}// Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]);// Fall back to offsetWidth/Height when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
if(val==="auto"){val=elem["offset"+name[0].toUpperCase()+name.slice(1)];}// Normalize "", auto, and prepare for extra
val=parseFloat(val)||0;// Use the active box-sizing model to add/subtract irrelevant styles
return val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles)+"px";}jQuery.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){// We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"},// Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){// Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}// Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),isCustomProp=rcustomProp.test(name),style=elem.style;// Make sure that we're working with the right name. We don't
// want to query the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Gets hook for the prefixed version, then unprefixed version
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// Check if we're setting a value
if(value!==undefined){type=typeof value==='undefined'?'undefined':_typeof(value);// Convert "+=" or "-=" to relative numbers (#7345)
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret);// Fixes bug #9237
type="number";}// Make sure that null and NaN values aren't set (#7116)
if(value==null||value!==value){return;}// If a number was passed in, add the unit (except for certain CSS properties)
if(type==="number"){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");}// background-* props affect original clone's values
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";}// If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){if(isCustomProp){style.setProperty(name,value);}else{style[name]=value;}}}else{// If a hook was provided get the non-computed value from there
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}// Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name),isCustomProp=rcustomProp.test(name);// Make sure that we're working with the right name. We don't
// want to modify the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Try prefixed name followed by the unprefixed name
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// If a hook was provided get the computed value from there
if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}// Otherwise, if a way to get the computed value exists, use that
if(val===undefined){val=curCSS(elem,name,styles);}// Convert "normal" to computed value
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}// Make numeric if forced or a qualifier was provided and val looks numeric
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function get(elem,computed,extra){if(computed){// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display"))&&(// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
!elem.getClientRects().length||!elem.getBoundingClientRect().width)?swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function set(elem,value,extra){var matches,styles=extra&&getStyles(elem),subtract=extra&&augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles);// Convert to pixels if value adjustment is needed
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[name]=value;value=jQuery.css(elem,name);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}});// These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function expand(value){var i=0,expanded={},// Assumes a single number if not a string
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(Array.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function get(tween){var result;// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];}// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,"");// Empty strings, null, undefined and "auto" are converted to 0.
return!result||result==="auto"?0:result;},set:function set(tween){// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init;// Back compat <1.8 extension point
jQuery.fx.step={};var fxNow,inProgress,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;function schedule(){if(inProgress){if(document.hidden===false&&window.requestAnimationFrame){window.requestAnimationFrame(schedule);}else{window.setTimeout(schedule,jQuery.fx.interval);}jQuery.fx.tick();}}// Animations created synchronously will run synchronously
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=jQuery.now();}// Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type};// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){// We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");// Queue-skipping animations hijack the fx hooks
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){// Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}// Detect show/hide animations
for(prop in props){value=props[prop];if(rfxtypes.test(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;// Ignore all other no-op show/hide data
}else{continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}// Bail out if this is a no-op like .hide().hide()
propTween=!jQuery.isEmptyObject(props);if(!propTween&&jQuery.isEmptyObject(orig)){return;}// Restrict "overflow" and "display" styles during box animations
if(isBox&&elem.nodeType===1){// Support: IE <=9 - 11, Edge 12 - 13
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY
opts.overflow=[style.overflow,style.overflowX,style.overflowY];// Identify a display type, preferring old show/hide data over the CSS cascade
restoreDisplay=dataShow&&dataShow.display;if(restoreDisplay==null){restoreDisplay=dataPriv.get(elem,"display");}display=jQuery.css(elem,"display");if(display==="none"){if(restoreDisplay){display=restoreDisplay;}else{// Get nonempty value(s) by temporarily forcing visibility
showHide([elem],true);restoreDisplay=elem.style.display||restoreDisplay;display=jQuery.css(elem,"display");showHide([elem]);}}// Animate inline elements as inline-block
if(display==="inline"||display==="inline-block"&&restoreDisplay!=null){if(jQuery.css(elem,"float")==="none"){// Restore the original display value at the end of pure show/hide animations
if(!propTween){anim.done(function(){style.display=restoreDisplay;});if(restoreDisplay==null){display=style.display;restoreDisplay=display==="none"?"":display;}}style.display="inline-block";}}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}// Implement show/hide animations
propTween=false;for(prop in orig){// General show/hide setup for this element animation
if(!propTween){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=dataPriv.access(elem,"fxshow",{display:restoreDisplay});}// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
if(toggle){dataShow.hidden=!hidden;}// Show elements before animating them
if(hidden){showHide([elem],true);}/* eslint-disable no-loop-func */anim.done(function(){/* eslint-enable no-loop-func */// The final step of a "hide" animation is actually hiding the element
if(!hidden){showHide([elem]);}dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});}// Per-property setup
propTween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=propTween.start;if(hidden){propTween.end=propTween.start;propTween.start=0;}}}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;// camelCase, specialEasing and expand cssHook pass
for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(Array.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){// Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);// If there's more to do, yield
if(percent<1&&length){return remaining;}// If this was an empty animation, synthesize a final progress notification
if(!length){deferred.notifyWith(elem,[animation,1,0]);}// Resolve the animation and report its conclusion
deferred.resolveWith(elem,[animation]);return false;},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0,// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}// Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(jQuery.isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=jQuery.proxy(result.stop,result);}return result;}}jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}// Attach callbacks from options
animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));return animation;}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function tweener(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else{props=props.match(rnothtmlwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function prefilter(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else{Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&(typeof speed==='undefined'?'undefined':_typeof(speed))==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};// Go to the end state if fx are off
if(jQuery.fx.off){opt.duration=0;}else{if(typeof opt.duration!=="number"){if(opt.duration in jQuery.fx.speeds){opt.duration=jQuery.fx.speeds[opt.duration];}else{opt.duration=jQuery.fx.speeds._default;}}}// Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";}// Queueing
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){// Show any hidden elements after setting opacity to 0
return this.filter(isHiddenWithinTree).css("opacity",0).show()// Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){// Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall);// Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue&&type!==false){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;// Enable finishing flag on private data
data.finish=true;// Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}// Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}// Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}// Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});// Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=jQuery.now();for(;i<timers.length;i++){timer=timers[i];// Run the timer and safely remove it when done (allowing for external removal)
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);jQuery.fx.start();};jQuery.fx.interval=13;jQuery.fx.start=function(){if(inProgress){return;}inProgress=true;schedule();};jQuery.fx.stop=function(){inProgress=null;};jQuery.fx.speeds={slow:600,fast:200,// Default speed
_default:400};// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox";// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
support.checkOn=input.value!=="";// Support: IE <=11 only
// Must access selectedIndex to make default options select
support.optSelected=opt.selected;// Support: IE <=11 only
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}// Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name);// Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue&&value==="radio"&&nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function removeAttr(elem,value){var name,i=0,// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
attrNames=value&&value.match(rnothtmlwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){elem.removeAttribute(name);}}}});// Hooks for boolean attributes
boolHook={set:function set(elem,value,name){if(value===false){// Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else{elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();if(!isXML){// Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[lowercaseName];attrHandle[lowercaseName]=ret;ret=getter(elem,name,isXML)!=null?lowercaseName:null;attrHandle[lowercaseName]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function prop(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){// Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function get(elem){// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var tabindex=jQuery.find.attr(elem,"tabindex");if(tabindex){return parseInt(tabindex,10);}if(rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href){return 0;}return-1;}}},propFix:{"for":"htmlFor","class":"className"}});// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if(!support.optSelected){jQuery.propHooks.selected={get:function get(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;},set:function set(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});// Strip and collapse whitespace according to HTML spec
// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
function stripAndCollapse(value){var tokens=value.match(rnothtmlwhite)||[];return tokens.join(" ");}function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}jQuery.fn.extend({addClass:function addClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}if(typeof value==="string"&&value){classes=value.match(rnothtmlwhite)||[];while(elem=this[i++]){curValue=getClass(elem);cur=elem.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){j=0;while(clazz=classes[j++]){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" ";}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},removeClass:function removeClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}if(typeof value==="string"&&value){classes=value.match(rnothtmlwhite)||[];while(elem=this[i++]){curValue=getClass(elem);// This expression is here for better compressibility (see addClass)
cur=elem.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){j=0;while(clazz=classes[j++]){// Remove *all* instances
while(cur.indexOf(" "+clazz+" ")>-1){cur=cur.replace(" "+clazz+" "," ");}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value==='undefined'?'undefined':_typeof(value);if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value);}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}return this.each(function(){var className,i,self,classNames;if(type==="string"){// Toggle individual class names
i=0;self=jQuery(this);classNames=value.match(rnothtmlwhite)||[];while(className=classNames[i++]){// Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else{self.addClass(className);}}// Toggle whole class name
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){// Store className if set
dataPriv.set(this,"__className__",className);}// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function hasClass(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+stripAndCollapse(getClass(elem))+" ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function val(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;// Handle most common string cases
if(typeof ret==="string"){return ret.replace(rreturn,"");}// Handle cases where value is null/undef or number
return ret==null?"":ret;}return;}isFunction=jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(isFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}// Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(Array.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];// If set returns undefined, fall back to normal setting
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:// Support: IE <=10 - 11 only
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
stripAndCollapse(jQuery.text(elem));}},select:{get:function get(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one",values=one?null:[],max=one?index+1:options.length;if(index<0){i=max;}else{i=one?index:0;}// Loop through all the selected options
for(;i<max;i++){option=options[i];// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (#2551)
if((option.selected||i===index)&&// Don't return options that are disabled or in a disabled optgroup
!option.disabled&&(!option.parentNode.disabled||!nodeName(option.parentNode,"optgroup"))){// Get the specific value for the option
value=jQuery(option).val();// We don't need an array for one selects
if(one){return value;}// Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];/* eslint-disable no-cond-assign */if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}/* eslint-enable no-cond-assign */}// Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}});// Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function set(elem,value){if(Array.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});// Return jQuery for attributes-only inclusion
var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/;jQuery.extend(jQuery.event,{trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=tmp=elem=elem||document;// Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}// focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type;// Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,(typeof event==='undefined'?'undefined':_typeof(event))==="object"&&event);// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;// Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;}// Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]);// Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}// Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}// Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type;// jQuery handler
handle=(dataPriv.get(cur,"events")||{})[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);}// Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type;// If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
if(ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)){// Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;}// Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;},// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function simulate(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true});jQuery.event.trigger(e,null,elem);}});jQuery.fn.extend({trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});jQuery.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(i,name){// Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});support.focusin="onfocusin"in window;// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){// Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function setup(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function teardown(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else{dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce=jQuery.now();var rquery=/\?/;// Cross-browser xml parsing
jQuery.parseXML=function(data){var xml;if(!data||typeof data!=="string"){return null;}// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){xml=undefined;}if(!xml||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}return xml;};var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(Array.isArray(obj)){// Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){// Treat each array item as a scalar.
add(prefix,v);}else{// Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+((typeof v==='undefined'?'undefined':_typeof(v))==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){// Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{// Serialize scalar item.
add(prefix,obj);}}// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function add(key,valueOrFunction){// If value is a function, invoke it and use its return value
var value=jQuery.isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value==null?"":value);};// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else{// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}// Return the resulting serialization
return s.join("&");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();if(val==null){return null;}if(Array.isArray(val)){return jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};});}return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,// #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={},// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"),// Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href;// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(jQuery.isFunction(func)){// For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){// Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);// Otherwise append
}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;// Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}// Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}// Or just use first one
finalDataType=finalDataType||firstDataType;}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},// Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice();// Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift();// Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}// Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){// There's only work to do if current dataType is non-auto
if(current==="*"){current=prev;// Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){// Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current];// If none found, seek a pair
if(!conv){for(conv2 in converters){// If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){// If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){// Condense equivalence converters
if(conv===true){conv=converters[conv2];// Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}}// Apply converter (if not an equivalence)
if(conv!==true){// Unless errors are allowed to bubble, catch and return them
if(conv&&s.throws){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return{state:"success",data:response};}jQuery.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
"* text":String,// Text to html (true = no transformation)
"text html":true,// Evaluate text as a json expression
"text json":JSON.parse,// Parse text as xml
"text xml":jQuery.parseXML},// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings?// Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):// Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),// Main method
ajax:function ajax(url,options){// If url is an object, simulate pre-1.5 signature
if((typeof url==='undefined'?'undefined':_typeof(url))==="object"){options=url;url=undefined;}// Force options to be an object
options=options||{};var transport,// URL without anti-cache param
cacheURL,// Response headers
responseHeadersString,responseHeaders,// timeout handle
timeoutTimer,// Url cleanup var
urlAnchor,// Request state (becomes false upon send and true upon completion)
completed,// To know if global events are to be dispatched
fireGlobals,// Loop variable
i,// uncached part of the url
uncached,// Create the final options object
s=jQuery.ajaxSetup({},options),// Callbacks context
callbackContext=s.context||s,// Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),// Status-dependent callbacks
_statusCode=s.statusCode||{},// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},// Default abort message
strAbort="canceled",// Fake xhr
jqXHR={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(completed){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()]=match[2];}}match=responseHeaders[key.toLowerCase()];}return match==null?null:match;},// Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return completed?responseHeadersString:null;},// Caches the header
setRequestHeader:function setRequestHeader(name,value){if(completed==null){name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name;requestHeaders[name]=value;}return this;},// Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(completed==null){s.mimeType=type;}return this;},// Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(completed){// Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}else{// Lazy-add the new callbacks in a way that preserves old ones
for(code in map){_statusCode[code]=[_statusCode[code],map[code]];}}}return this;},// Cancel the request
abort:function abort(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}};// Attach deferreds
deferred.promise(jqXHR);// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//");// Alias method option to type as per ticket #12004
s.type=options.method||options.type||s.method||s.type;// Extract dataTypes list
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""];// A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a");// Support: IE <=8 - 11, Edge 12 - 13
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{urlAnchor.href=s.url;// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}}// Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);// If request was aborted inside a prefilter, stop there
if(completed){return jqXHR;}// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals=jQuery.event&&s.global;// Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}// Uppercase the type
s.type=s.type.toUpperCase();// Determine if request has content
s.hasContent=!rnoContent.test(s.type);// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
cacheURL=s.url.replace(rhash,"");// More options handling for requests with no content
if(!s.hasContent){// Remember the hash so we can put it back
uncached=s.url.slice(cacheURL.length);// If data is available, append data to url
if(s.data){cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data;// #9682: remove data so that it's not used in an eventual retry
delete s.data;}// Add or update anti-cache param if needed
if(s.cache===false){cacheURL=cacheURL.replace(rantiCache,"$1");uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce++ +uncached;}// Put hash and anti-cache on the URL that will be requested (gh-1732)
s.url=cacheURL+uncached;// Change '%20' to '+' if this is encoded form body content (gh-2658)
}else if(s.data&&s.processData&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0){s.data=s.data.replace(r20,"+");}// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}// Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);// Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||completed)){// Abort if not done already and return
return jqXHR.abort();}// Aborting is no longer a cancellation
strAbort="abort";// Install callbacks on deferreds
completeDeferred.add(s.complete);jqXHR.done(s.success);jqXHR.fail(s.error);// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);// If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;// Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}// If request was aborted inside ajaxSend, stop there
if(completed){return jqXHR;}// Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{completed=false;transport.send(requestHeaders,done);}catch(e){// Rethrow post-completion exceptions
if(completed){throw e;}// Propagate others as results
done(-1,e);}}// Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;// Ignore repeat invocations
if(completed){return;}completed=true;// Clear timeout if it exists
if(timeoutTimer){window.clearTimeout(timeoutTimer);}// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined;// Cache response headers
responseHeadersString=headers||"";// Set readyState
jqXHR.readyState=status>0?4:0;// Determine if successful
isSuccess=status>=200&&status<300||status===304;// Get response data
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}// Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess);// If successful, handle type chaining
if(isSuccess){// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}}// if no content
if(status===204||s.type==="HEAD"){statusText="nocontent";// if not modified
}else if(status===304){statusText="notmodified";// If we have data, let's convert it
}else{statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else{// Extract error from statusText and normalize for non-aborts
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}}// Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";// Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}// Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);}// Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);// Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){// Shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}// The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery._evalUrl=function(url){return jQuery.ajax({url:url,// Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",cache:true,async:false,global:false,"throws":true});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(this[0]){if(jQuery.isFunction(html)){html=html.call(this[0]);}// The elements to wrap the target around
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function wrap(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function unwrap(selector){this.parent(selector).not("body").each(function(){jQuery(this).replaceWith(this.childNodes);});return this;}});jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem);};jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={// File protocol always yields status code 0, assume 200
0:200,// Support: IE <=9 only
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var _callback,errorCallback;// Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function send(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password);// Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}}// Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);}// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}// Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);}// Callback
_callback=function callback(type){return function(){if(_callback){_callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else{complete(// File: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText);}}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};};// Listen to events
xhr.onload=_callback();errorCallback=xhr.onerror=_callback("error");// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else{xhr.onreadystatechange=function(){// Check readyState before timeout as it changes
if(xhr.readyState===4){// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(_callback){errorCallback();}});}};}// Create the abort callback
_callback=_callback("abort");try{// Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){// #14683: Only rethrow if this hasn't been notified as an error yet
if(_callback){throw e;}}},abort:function abort(){if(_callback){_callback();}}};}});// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});// Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}});// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}});// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){// This transport only deals with cross domain requests
if(s.crossDomain){var script,_callback2;return{send:function send(_,complete){script=jQuery("<script>").prop({charset:s.scriptCharset,src:s.url}).on("load error",_callback2=function callback(evt){script.remove();_callback2=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}});// Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0]);},abort:function abort(){if(_callback2){_callback2();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce++;this[callback]=true;return callback;}});// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){// Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;// Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}// Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];};// Force json dataType
s.dataTypes[0]="json";// Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};// Clean-up function (fires after converters)
jqXHR.always(function(){// If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName);// Otherwise restore preexisting value
}else{window[callbackName]=overwritten;}// Save back as free
if(s[callbackName]){// Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback;// Save the callback name for future use
oldCallbacks.push(callbackName);}// Call if it was a function and we have a response
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;});// Delegate to script
return"script";}});// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}();// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(typeof data!=="string"){return[];}if(typeof context==="boolean"){keepScripts=context;context=false;}var base,parsed,scripts;if(!context){// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
if(support.createHTMLDocument){context=document.implementation.createHTMLDocument("");// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
base=context.createElement("base");base.href=document.location.href;context.head.appendChild(base);}else{context=document;}}parsed=rsingleTag.exec(data);scripts=!keepScripts&&[];// Single tag
if(parsed){return[context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);};/**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=stripAndCollapse(url.slice(off));url=url.slice(0,off);}// If it's a function
if(jQuery.isFunction(params)){// We assume that it's the callback
callback=params;params=undefined;// Otherwise, build a param string
}else if(params&&(typeof params==='undefined'?'undefined':_typeof(params))==="object"){type="POST";}// If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({url:url,// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){// Save response for use in complete callback
response=arguments;self.html(selector?// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):// Otherwise use the full result
responseText);// If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;};// Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.offset={setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};// Set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1;// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(jQuery.isFunction(options)){// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({offset:function offset(options){// Preserve chaining for setter
if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var doc,docElem,rect,win,elem=this[0];if(!elem){return;}// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
if(!elem.getClientRects().length){return{top:0,left:0};}rect=elem.getBoundingClientRect();doc=elem.ownerDocument;docElem=doc.documentElement;win=doc.defaultView;return{top:rect.top+win.pageYOffset-docElem.clientTop,left:rect.left+win.pageXOffset-docElem.clientLeft};},position:function position(){if(!this[0]){return;}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0};// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
if(jQuery.css(elem,"position")==="fixed"){// Assume getBoundingClientRect is there when computed position is fixed
offset=elem.getBoundingClientRect();}else{// Get *real* offsetParent
offsetParent=this.offsetParent();// Get correct offsets
offset=this.offset();if(!nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset();}// Add offsetParent borders
parentOffset={top:parentOffset.top+jQuery.css(offsetParent[0],"borderTopWidth",true),left:parentOffset.left+jQuery.css(offsetParent[0],"borderLeftWidth",true)};}// Subtract parent offsets and element margins
return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};},// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}});// Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){// Coalesce documents and windows
var win;if(jQuery.isWindow(elem)){win=elem;}else if(elem.nodeType===9){win=elem.defaultView;}if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else{elem[method]=val;}},method,val,arguments.length);};});// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);// If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});});// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){// Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
return funcName.indexOf("outer")===0?elem["inner"+name]:elem.document.documentElement["client"+name];}// Get document width or height
if(elem.nodeType===9){doc=elem.documentElement;// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined?// Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra):// Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable);};});});jQuery.fn.extend({bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){// ( namespace ) or ( selector, types [, fn] )
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);}});jQuery.holdReady=function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}};jQuery.isArray=Array.isArray;jQuery.parseJSON=JSON.parse;jQuery.nodeName=nodeName;// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return jQuery;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}var// Map over jQuery in case of overwrite
_jQuery=window.jQuery,// Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;};// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(!noGlobal){window.jQuery=window.$=jQuery;}return jQuery;});/***/}]/******/);