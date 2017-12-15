'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_swiper__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_SlideMenu__ = __webpack_require__(3);

  window.$ = jQuery;

  $(document).ready(function () {

    __WEBPACK_IMPORTED_MODULE_1__components_SlideMenu__["a" /* default */].init();

    /**
     * Mobile menu
     */
    $('.menu-mobile .menu-item-has-children > a').on('click', function (e) {
      e.preventDefault();

      var $el = $(this);
      var $submenu = $el.next('.sub-menu');

      $el.toggleClass('is-active');
      $submenu.slideToggle(300);
    });

    /**
     * Add placeholder to email-subscribers plugin input field
     * @type {*|jQuery|HTMLElement}
     */
    var $newsletterInput = $('.footer #es_txt_email_pg');
    if ($newsletterInput.length > 0) {
      $('#es_txt_email_pg').attr('placeholder', 'email@email.com');
      $('.footer .es_shortcode_form').on('submit', function (e) {
        e.preventDefault();
        return false;
      });
    }

    /**
     * Swiper gallery
     */
    var $galleries = $('.gallery');
    $galleries.each(function () {
      var $swiperElement = $(this).addClass('swiper__container').addClass('swiper__container--gallery');
      var $swiperContainer = $('<div class="swiper-wrapper">');
      var $swiperSlides = $swiperElement.find('.gallery-item').addClass('swiper-slide');
      $swiperContainer.append($swiperSlides);
      $swiperElement.append($swiperContainer);

      $(this).find('a').each(function () {
        var $link = $(this);
        var $img = $link.find('img').attr('src');
        $link.css('background-image', 'url(' + $img + ')');
      });

      var $more = $('<div class="gallery-more">Celá galéria</div>');
      $swiperContainer.append($more);

      var $swiperHelp = $('\n            <div class="swiper__help">\n                scroll <span class="icon-new-window"></span>\n            </div>\n    ');
      $swiperElement.append($swiperHelp);

      var defaultOptions = {
        slidesPerView: 'auto'
      };

      if ($(window).width() <= 768) {
        var $swiper = new __WEBPACK_IMPORTED_MODULE_0_swiper__["a" /* default */]($swiperElement, defaultOptions);
      }

      // For custom gallery
      // const ligthboxOptions = {}
      // const lightbox = $swiperElement.find('a').simpleLightbox(ligthboxOptions)
    });

    /**
     * Scroll to top
     */
    var SCROLL_TOP_TRESHOLD = 100;
    var $top = $('.js-to-top');
    $top.on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: '0px' }, 700);
    });

    var scrollFunction = function scrollFunction() {
      var scrolledTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

      $top.toggleClass('scroll-top--active', scrolledTop > SCROLL_TOP_TRESHOLD);
    };
    window.addEventListener('scroll', scrollFunction);

    /**
     * Hide menu on scrolldown, show on scrollup
     */
    var lastScrollTop;
    $(window).on('scroll', scrollDown).trigger('scroll');

    function scrollDown() {
      var scrolledTop = $(window).scrollTop();
      var $header = $('.js-header-fixed');

      var hideMenu = scrolledTop > lastScrollTop && scrolledTop > 30;
      $header.toggleClass('header--scrolling', hideMenu);
      $header.toggleClass('header--moved', scrolledTop > 30);

      lastScrollTop = scrolledTop;
    }

    /**
     * Load remote images on localhost
     * @type {boolean}
     */
    var localhost = location.host.indexOf('localhost') > -1;
    console.log('local', localhost);
    if (localhost) {
      return;

      $('[src^="http://localhost/leaf"]').each(function () {
        var $el = $(this);
        $el.attr('src', $el.attr('src').replace(/\/localhost\/leaf/g, '\/leaf.sk'));
      });

      $('a[href^="/"]:not([href^="//"])').each(function (ev) {
        var $el = $(this);
        $el.attr('href', '/leaf' + $el.attr('href'));
      });

      $('a[href^="http://leaf"]').each(function (ev) {
        var $el = $(this);
        $el.attr('href', $el.attr('href').replace(/http:\/\/leaf.sk/g, '\/leaf'));
      });

      $('[style*="background-image"]').each(function (ev) {
        var $el = $(this);
        $el.attr('style', $el.attr('style').replace(/http:\/\/localhost\/leaf/g, 'http:\\/\\/leaf.sk'));
      });
    }
  });

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__ = __webpack_require__(2);
  /**
   * Swiper 4.0.7
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * http://www.idangero.us/swiper/
   *
   * Copyright 2014-2017 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: November 28, 2017
   */

  var w = void 0;
  if (typeof window === 'undefined') {
    w = {
      navigator: {
        userAgent: ''
      },
      location: {},
      history: {},
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      getComputedStyle: function getComputedStyle() {
        return {};
      },
      Image: function Image() {},
      Date: function Date() {},

      screen: {}
    };
  } else {
    w = window;
  }

  var win = w;

  var Methods = {
    addClass: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["c" /* addClass */],
    removeClass: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["E" /* removeClass */],
    hasClass: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["m" /* hasClass */],
    toggleClass: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["H" /* toggleClass */],
    attr: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["e" /* attr */],
    removeAttr: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["D" /* removeAttr */],
    data: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["i" /* data */],
    transform: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["I" /* transform */],
    transition: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["J" /* transition */],
    on: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["u" /* on */],
    off: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["s" /* off */],
    trigger: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["L" /* trigger */],
    transitionEnd: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["K" /* transitionEnd */],
    outerWidth: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["w" /* outerWidth */],
    outerHeight: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["v" /* outerHeight */],
    offset: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["t" /* offset */],
    css: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["h" /* css */],
    each: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["j" /* each */],
    html: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["n" /* html */],
    text: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["G" /* text */],
    is: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["p" /* is */],
    index: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["o" /* index */],
    eq: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["k" /* eq */],
    append: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["d" /* append */],
    prepend: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["z" /* prepend */],
    next: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["q" /* next */],
    nextAll: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["r" /* nextAll */],
    prev: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["A" /* prev */],
    prevAll: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["B" /* prevAll */],
    parent: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["x" /* parent */],
    parents: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["y" /* parents */],
    closest: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["g" /* closest */],
    find: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["l" /* find */],
    children: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["f" /* children */],
    remove: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["C" /* remove */],
    add: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["b" /* add */],
    styles: __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["F" /* styles */]
  };

  Object.keys(Methods).forEach(function (methodName) {
    __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */].fn[methodName] = Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el) {
      var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';

      var matrix = void 0;
      var curTransform = void 0;
      var transformMatrix = void 0;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) curTransform = transformMatrix.m41;
        // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
          // Normal Browsers
          else curTransform = parseFloat(matrix[4]);
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) curTransform = transformMatrix.m42;
        // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
          // Normal Browsers
          else curTransform = parseFloat(matrix[5]);
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i = void 0;
      var params = void 0;
      var param = void 0;
      var length = void 0;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) {
          return paramsPart !== '';
        });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
      for (var i = 1; i < arguments.length; i += 1) {
        var nextSource = arguments.length <= i ? undefined : arguments[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    }
  };

  var d = void 0;
  if (typeof document === 'undefined') {
    d = {
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},

      activeElement: {
        blur: function blur() {},

        nodeName: ''
      },
      querySelector: function querySelector() {
        return {};
      },
      querySelectorAll: function querySelectorAll() {
        return [];
      },
      createElement: function createElement() {
        return {
          style: {},
          setAttribute: function setAttribute() {},
          getElementsByTagName: function getElementsByTagName() {
            return [];
          }
        };
      },

      location: { hash: '' }
    };
  } else {
    d = document;
  }

  var doc = d;

  var Support = function Support() {
    return {
      touch: win.Modernizr && win.Modernizr.touch === true || function checkTouch() {
        return !!('ontouchstart' in win || win.DocumentTouch && doc instanceof win.DocumentTouch);
      }(),

      transforms3d: win.Modernizr && win.Modernizr.csstransforms3d === true || function checkTransforms3d() {
        var div = doc.createElement('div').style;
        return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
      }(),

      flexbox: function checkFlexbox() {
        var div = doc.createElement('div').style;
        var styles$$1 = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
        for (var i = 0; i < styles$$1.length; i += 1) {
          if (styles$$1[i] in div) return true;
        }
        return false;
      }(),

      observer: function checkObserver() {
        return 'MutationObserver' in win || 'WebkitMutationObserver' in win;
      }(),

      passiveListener: function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
              supportsPassive = true;
            }
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }(),

      gestures: function checkGestures() {
        return 'ongesturestart' in win;
      }()
    };
  }();

  var SwiperClass = function () {
    function SwiperClass() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SwiperClass);

      var self = this;
      self.params = params;

      // Events
      self.eventsListeners = {};

      if (self.params && self.params.on) {
        Object.keys(self.params.on).forEach(function (eventName) {
          self.on(eventName, self.params.on[eventName]);
        });
      }
    }

    _createClass(SwiperClass, [{
      key: 'on',
      value: function on(events, handler) {
        var self = this;
        if (typeof handler !== 'function') return self;
        events.split(' ').forEach(function (event) {
          if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
          self.eventsListeners[event].push(handler);
        });
        return self;
      }
    }, {
      key: 'once',
      value: function once(events, handler) {
        var self = this;
        if (typeof handler !== 'function') return self;
        function onceHandler() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(self, args);
          self.off(events, onceHandler);
        }
        return self.on(events, onceHandler);
      }
    }, {
      key: 'off',
      value: function off(events, handler) {
        var self = this;
        events.split(' ').forEach(function (event) {
          if (typeof handler === 'undefined') {
            self.eventsListeners[event] = [];
          } else {
            self.eventsListeners[event].forEach(function (eventHandler, index$$1) {
              if (eventHandler === handler) {
                self.eventsListeners[event].splice(index$$1, 1);
              }
            });
          }
        });
        return self;
      }
    }, {
      key: 'emit',
      value: function emit() {
        var self = this;
        if (!self.eventsListeners) return self;
        var events = void 0;
        var data$$1 = void 0;
        var context = void 0;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
          events = args[0];
          data$$1 = args.slice(1, args.length);
          context = self;
        } else {
          events = args[0].events;
          data$$1 = args[0].data;
          context = args[0].context || self;
        }
        var eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach(function (event) {
          if (self.eventsListeners[event]) {
            var handlers = [];
            self.eventsListeners[event].forEach(function (eventHandler) {
              handlers.push(eventHandler);
            });
            handlers.forEach(function (eventHandler) {
              eventHandler.apply(context, data$$1);
            });
          }
        });
        return self;
      }
    }, {
      key: 'useModulesParams',
      value: function useModulesParams(instanceParams) {
        var instance = this;
        if (!instance.modules) return;
        Object.keys(instance.modules).forEach(function (moduleName) {
          var module = instance.modules[moduleName];
          // Extend params
          if (module.params) {
            Utils.extend(instanceParams, module.params);
          }
        });
      }
    }, {
      key: 'useModules',
      value: function useModules() {
        var modulesParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var instance = this;
        if (!instance.modules) return;
        Object.keys(instance.modules).forEach(function (moduleName) {
          var module = instance.modules[moduleName];
          var moduleParams = modulesParams[moduleName] || {};
          // Extend instance methods and props
          if (module.instance) {
            Object.keys(module.instance).forEach(function (modulePropName) {
              var moduleProp = module.instance[modulePropName];
              if (typeof moduleProp === 'function') {
                instance[modulePropName] = moduleProp.bind(instance);
              } else {
                instance[modulePropName] = moduleProp;
              }
            });
          }
          // Add event listeners
          if (module.on && instance.on) {
            Object.keys(module.on).forEach(function (moduleEventName) {
              instance.on(moduleEventName, module.on[moduleEventName]);
            });
          }

          // Module create callback
          if (module.create) {
            module.create.bind(instance)(moduleParams);
          }
        });
      }
    }], [{
      key: 'installModule',
      value: function installModule(module) {
        var Class = this;
        if (!Class.prototype.modules) Class.prototype.modules = {};
        var name = module.name || Object.keys(Class.prototype.modules).length + '_' + Utils.now();
        Class.prototype.modules[name] = module;
        // Prototype
        if (module.proto) {
          Object.keys(module.proto).forEach(function (key) {
            Class.prototype[key] = module.proto[key];
          });
        }
        // Class
        if (module.static) {
          Object.keys(module.static).forEach(function (key) {
            Class[key] = module.static[key];
          });
        }
        // Callback
        if (module.install) {
          for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            params[_key3 - 1] = arguments[_key3];
          }

          module.install.apply(Class, params);
        }
        return Class;
      }
    }, {
      key: 'use',
      value: function use(module) {
        var Class = this;
        if (Array.isArray(module)) {
          module.forEach(function (m) {
            return Class.installModule(m);
          });
          return Class;
        }

        for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          params[_key4 - 1] = arguments[_key4];
        }

        return Class.installModule.apply(Class, [module].concat(params));
      }
    }, {
      key: 'components',
      set: function set(components) {
        var Class = this;
        if (!Class.use) return;
        Class.use(components);
      }
    }]);

    return SwiperClass;
  }();

  var updateSize = function updateSize() {
    var swiper = this;
    var width = void 0;
    var height = void 0;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height
    });
  };

  var updateSlides = function updateSlides() {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl,
        swiperSize = swiper.size,
        rtl = swiper.rtl,
        wrongRTL = swiper.wrongRTL;

    var slides = $wrapperEl.children('.' + swiper.params.slideClass);
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSlidesLength = slidesLength;
    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index$$1 = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) slides.css({ marginLeft: '', marginTop: '' });else slides.css({ marginRight: '', marginBottom: '' });

    var slidesNumberEvenToRows = void 0;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize = void 0;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = slidesPerRow - (params.slidesPerColumn * slidesPerRow - slidesLength);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var _slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = void 0;
        var column = void 0;
        var row = void 0;
        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;
          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;
            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
          newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
          _slide.css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }
        _slide.css('margin-' + (swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && params.spaceBetween + 'px').attr('data-swiper-column', column).attr('data-swiper-row', row);
      }
      if (_slide.css('display') === 'none') continue; // eslint-disable-line
      if (params.slidesPerView === 'auto') {
        slideSize = swiper.isHorizontal() ? _slide.outerWidth(true) : _slide.outerHeight(true);
        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + 'px';
          } else {
            slides[i].style.height = slideSize + 'px';
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (index$$1 % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (index$$1 % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index$$1 += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid = void 0;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + 'px' });
    }
    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + 'px' });else $wrapperEl.css({ height: swiper.virtualSize + params.spaceBetween + 'px' });
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + 'px' });else $wrapperEl.css({ height: swiper.virtualSize + params.spaceBetween + 'px' });
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var _i = 0; _i < snapGrid.length; _i += 1) {
          if (snapGrid[_i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(snapGrid[_i]);
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var _i2 = 0; _i2 < snapGrid.length; _i2 += 1) {
        if (snapGrid[_i2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(snapGrid[_i2]);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) snapGrid = [0];

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) slides.css({ marginLeft: spaceBetween + 'px' });else slides.css({ marginRight: spaceBetween + 'px' });
      } else slides.css({ marginBottom: spaceBetween + 'px' });
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  };

  var updateAutoHeight = function updateAutoHeight() {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i = void 0;

    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index$$1 = swiper.activeIndex + i;
        if (index$$1 > swiper.slides.length) break;
        activeSlides.push(swiper.slides.eq(index$$1)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) swiper.$wrapperEl.css('height', newHeight + 'px');
  };

  var updateSlidesOffset = function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  };

  var updateSlidesProgress = function updateSlidesProgress() {
    var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.translate || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides,
        rtl = swiper.rtl;


    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();

    var offsetCenter = -translate;
    if (rtl) offsetCenter = translate;

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    for (var i = 0; i < slides.length; i += 1) {
      var _slide2 = slides[i];
      var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - _slide2.swiperSlideOffset) / (_slide2.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - _slide2.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = slideBefore >= 0 && slideBefore < swiper.size || slideAfter > 0 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
        if (isVisible) {
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      _slide2.progress = rtl ? -slideProgress : slideProgress;
    }
  };

  var updateProgress = function updateProgress() {
    var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.translate || 0;

    var swiper = this;
    var params = swiper.params;

    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress,
        isBeginning = swiper.isBeginning,
        isEnd = swiper.isEnd;

    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  };

  var updateSlidesClasses = function updateSlidesClasses() {
    var swiper = this;

    var slides = swiper.slides,
        params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex,
        realIndex = swiper.realIndex;

    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(params.slideActiveClass + ' ' + params.slideNextClass + ' ' + params.slidePrevClass + ' ' + params.slideDuplicateActiveClass + ' ' + params.slideDuplicateNextClass + ' ' + params.slideDuplicatePrevClass);

    var activeSlide = void 0;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find('.' + params.slideClass + '[data-swiper-slide-index="' + activeIndex + '"]');
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children('.' + params.slideClass + ':not(.' + params.slideDuplicateClass + ')[data-swiper-slide-index="' + realIndex + '"]').addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass + '[data-swiper-slide-index="' + realIndex + '"]').addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll('.' + params.slideClass).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll('.' + params.slideClass).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children('.' + params.slideClass + ':not(.' + params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children('.' + params.slideClass + ':not(.' + params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(params.slideDuplicatePrevClass);
      }
    }
  };

  var updateActiveIndex = function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtl ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid,
        snapGrid = swiper.snapGrid,
        params = swiper.params,
        previousIndex = swiper.activeIndex,
        previousRealIndex = swiper.realIndex,
        previousSnapIndex = swiper.snapIndex;

    var activeIndex = newActiveIndex;
    var snapIndex = void 0;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  };

  var updateClickedSlide = function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).closest('.' + params.slideClass)[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) slideFound = true;
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  };

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };

  var getTranslate = function getTranslate() {
    var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params,
        rtl = swiper.rtl,
        translate = swiper.translate,
        $wrapperEl = swiper.$wrapperEl;


    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) currentTranslate = -currentTranslate;

    return currentTranslate || 0;
  };

  var setTranslate = function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtl,
        params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        progress = swiper.progress;

    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) $wrapperEl.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');else $wrapperEl.transform('translate(' + x + 'px, ' + y + 'px)');
    }

    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress = void 0;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  };

  var minTranslate = function minTranslate() {
    return -this.snapGrid[0];
  };

  var maxTranslate = function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  };

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate
  };

  var setTransition = function setTransition(duration, byController) {
    var swiper = this;

    swiper.$wrapperEl.transition(duration);

    swiper.emit('setTransition', duration, byController);
  };

  var transitionStart = function transitionStart() {
    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var swiper = this;
    var activeIndex = swiper.activeIndex,
        params = swiper.params,
        previousIndex = swiper.previousIndex;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.emit('transitionStart');

    if (!runCallbacks) return;
    if (activeIndex !== previousIndex) {
      swiper.emit('slideChangeTransitionStart');
      if (activeIndex > previousIndex) {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  };

  var transitionEnd$1 = function transitionEnd$1() {
    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var swiper = this;
    var activeIndex = swiper.activeIndex,
        previousIndex = swiper.previousIndex;

    swiper.animating = false;
    swiper.setTransition(0);

    swiper.emit('transitionEnd');
    if (runCallbacks) {
      if (activeIndex !== previousIndex) {
        swiper.emit('slideChangeTransitionEnd');
        if (activeIndex > previousIndex) {
          swiper.emit('slideNextTransitionEnd');
        } else {
          swiper.emit('slidePrevTransitionEnd');
        }
      }
    }
  };

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1
  };

  var Browser = function Browser() {
    function isIE9() {
      // create temporary DIV
      var div = doc.createElement('div');
      // add content to tmp DIV which is wrapped into the IE HTML conditional statement
      div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
      // return true / false value based on what will browser render
      return div.getElementsByTagName('i').length === 1;
    }
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }
    return {
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
      ie: win.navigator.pointerEnabled || win.navigator.msPointerEnabled,
      ieTouch: win.navigator.msPointerEnabled && win.navigator.msMaxTouchPoints > 1 || win.navigator.pointerEnabled && win.navigator.maxTouchPoints > 1,
      lteIE9: isIE9()
    };
  }();

  var slideTo = function slideTo() {
    var index$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
    var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var internal = arguments[3];

    var swiper = this;
    var slideIndex = index$$1;
    if (slideIndex < 0) slideIndex = 0;

    var params = swiper.params,
        snapGrid = swiper.snapGrid,
        slidesGrid = swiper.slidesGrid,
        previousIndex = swiper.previousIndex,
        activeIndex = swiper.activeIndex,
        rtl = swiper.rtl,
        $wrapperEl = swiper.$wrapperEl;


    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }

    // Directions locks
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }

    // Update Index
    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      return false;
    }

    if (speed === 0 || Browser.lteIE9) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks);
      swiper.transitionEnd(runCallbacks);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks);
      if (!swiper.animating) {
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed) return;
          swiper.transitionEnd(runCallbacks);
        });
      }
    }

    return true;
  };

  /* eslint no-unused-vars: "off" */
  var slideNext = function slideNext() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments[2];

    var swiper = this;
    var params = swiper.params,
        animating = swiper.animating;

    if (params.loop) {
      if (animating) return false;
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  };

  /* eslint no-unused-vars: "off" */
  var slidePrev = function slidePrev() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments[2];

    var swiper = this;
    var params = swiper.params,
        animating = swiper.animating;


    if (params.loop) {
      if (animating) return false;
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
  };

  /* eslint no-unused-vars: "off" */
  var slideReset = function slideReset() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
    var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var internal = arguments[2];

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  };

  var slideToClickedSlide = function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl;


    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex = void 0;
    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + params.slideDuplicateClass + ')').eq(0).index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + params.slideDuplicateClass + ')').eq(0).index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  };

  var slide = {
    slideTo: slideTo,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClickedSlide: slideToClickedSlide
  };

  var loopCreate = function loopCreate() {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides

    $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass).remove();

    var slides = $wrapperEl.children('.' + params.slideClass);

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(doc.createElement('div')).addClass(params.slideClass + ' ' + params.slideBlankClass);
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children('.' + params.slideClass);
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index$$1, el) {
      var slide = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(el);
      if (index$$1 < swiper.loopedSlides) appendSlides.push(el);
      if (index$$1 < slides.length && index$$1 >= slides.length - swiper.loopedSlides) prependSlides.push(el);
      slide.attr('data-swiper-slide-index', index$$1);
    });
    for (var _i3 = 0; _i3 < appendSlides.length; _i3 += 1) {
      $wrapperEl.append(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(appendSlides[_i3].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var _i4 = prependSlides.length - 1; _i4 >= 0; _i4 -= 1) {
      $wrapperEl.prepend(Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(prependSlides[_i4].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  };

  var loopFix = function loopFix() {
    var swiper = this;
    var params = swiper.params,
        activeIndex = swiper.activeIndex,
        slides = swiper.slides,
        loopedSlides = swiper.loopedSlides,
        allowSlidePrev = swiper.allowSlidePrev,
        allowSlideNext = swiper.allowSlideNext;

    var newIndex = void 0;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      swiper.slideTo(newIndex, 0, false, true);
    } else if (params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2 || activeIndex > slides.length - params.slidesPerView * 2) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      swiper.slideTo(newIndex, 0, false, true);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  };

  var loopDestroy = function loopDestroy() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
        params = swiper.params,
        slides = swiper.slides;

    $wrapperEl.children('.' + params.slideClass + '.' + params.slideDuplicateClass).remove();
    slides.removeAttr('data-swiper-slide-index');
  };

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };

  var setGrabCursor = function setGrabCursor(moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch) return;
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  };

  var unsetGrabCursor = function unsetGrabCursor() {
    var swiper = this;
    if (Support.touch) return;
    swiper.el.style.cursor = '';
  };

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };

  var appendSlide = function appendSlide(slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
        params = swiper.params;

    if (params.loop) {
      swiper.loopDestroy();
    }
    if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.append(slides[i]);
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  };

  var prependSlide = function prependSlide(slides) {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex;


    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.prepend(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  };

  var removeSlide = function removeSlide(slidesIndexes) {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex;


    if (params.loop) {
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children('.' + params.slideClass);
    }
    var newActiveIndex = activeIndex;
    var indexToRemove = void 0;

    if ((typeof slidesIndexes === 'undefined' ? 'undefined' : _typeof(slidesIndexes)) === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  };

  var removeAllSlides = function removeAllSlides() {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  };

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides
  };

  var Device = function Device() {
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap
    };

    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);

    // Windows
    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    }
    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Desktop
    device.desktop = !(device.os || device.android || device.webView);

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }();

  var onTouchStart = function onTouchStart(event) {
    var swiper = this;
    var data$$1 = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches;

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    data$$1.isTouchEvent = e.type === 'touchstart';
    if (!data$$1.isTouchEvent && 'which' in e && e.which === 3) return;
    if (data$$1.isTouched && data$$1.isMoved) return;
    if (params.noSwiping && Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).closest('.' + params.noSwipingClass)[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e).closest(params.swipeHandler)[0]) return;
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    if (Device.ios && !Device.cordova && params.iOSEdgeSwipeDetection && startX <= params.iOSEdgeSwipeThreshold && startX >= window.screen.width - params.iOSEdgeSwipeThreshold) {
      return;
    }

    Utils.extend(data$$1, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });

    touches.startX = startX;
    touches.startY = startY;
    data$$1.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data$$1.allowThresholdMove = false;
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if (Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).is(data$$1.formElements)) preventDefault = false;
      if (doc.activeElement && Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(doc.activeElement).is(data$$1.formElements)) {
        doc.activeElement.blur();
      }
      if (preventDefault && swiper.allowTouchMove) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  };

  var onTouchMove = function onTouchMove(event) {
    var swiper = this;
    var data$$1 = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtl;

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    if (data$$1.isTouchEvent && e.type === 'mousemove') return;
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data$$1.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data$$1.touchStartTime = Utils.now();
      }
      return;
    }
    if (data$$1.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data$$1.isTouched = false;
          data$$1.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }
    if (data$$1.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).is(data$$1.formElements)) {
        data$$1.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data$$1.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) return;

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;

    if (typeof data$$1.isScrolling === 'undefined') {
      var touchAngle = void 0;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data$$1.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data$$1.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data$$1.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data$$1.startMoving = true;
      }
    }
    if (!data$$1.isTouched) return;
    if (data$$1.isScrolling) {
      data$$1.isTouched = false;
      return;
    }
    if (!data$$1.startMoving) {
      return;
    }
    swiper.allowClick = false;
    e.preventDefault();
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data$$1.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data$$1.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data$$1.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data$$1.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) diff = -diff;

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data$$1.currentTranslate = diff + data$$1.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0 && data$$1.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data$$1.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data$$1.startTranslate + diff, resistanceRatio);
    } else if (diff < 0 && data$$1.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data$$1.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data$$1.startTranslate - diff, resistanceRatio);
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data$$1.currentTranslate < data$$1.startTranslate) {
      data$$1.currentTranslate = data$$1.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data$$1.currentTranslate > data$$1.startTranslate) {
      data$$1.currentTranslate = data$$1.startTranslate;
    }

    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data$$1.allowThresholdMove) {
        if (!data$$1.allowThresholdMove) {
          data$$1.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data$$1.currentTranslate = data$$1.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data$$1.currentTranslate = data$$1.startTranslate;
        return;
      }
    }

    if (!params.followFinger) return;

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data$$1.velocities.length === 0) {
        data$$1.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data$$1.touchStartTime
        });
      }
      data$$1.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now()
      });
    }
    // Update progress
    swiper.updateProgress(data$$1.currentTranslate);
    // Update translate
    swiper.setTranslate(data$$1.currentTranslate);
  };

  var onTouchEnd = function onTouchEnd(event) {
    var swiper = this;
    var data$$1 = swiper.touchEventsData;

    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtl,
        $wrapperEl = swiper.$wrapperEl,
        slidesGrid = swiper.slidesGrid,
        snapGrid = swiper.snapGrid;

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    if (data$$1.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data$$1.allowTouchCallbacks = false;
    if (!data$$1.isTouched) return;
    // Return Grab Cursor
    if (params.grabCursor && data$$1.isMoved && data$$1.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data$$1.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);
      if (timeDiff < 300 && touchEndTime - data$$1.lastClickTime > 300) {
        if (data$$1.clickTimeout) clearTimeout(data$$1.clickTimeout);
        data$$1.clickTimeout = Utils.nextTick(function () {
          if (!swiper || swiper.destroyed) return;
          swiper.emit('click', e);
        }, 300);
      }
      if (timeDiff < 300 && touchEndTime - data$$1.lastClickTime < 300) {
        if (data$$1.clickTimeout) clearTimeout(data$$1.clickTimeout);
        swiper.emit('doubleTap', e);
      }
    }

    data$$1.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (!data$$1.isTouched || !data$$1.isMoved || !swiper.swipeDirection || touches.diff === 0 || data$$1.currentTranslate === data$$1.startTranslate) {
      data$$1.isTouched = false;
      data$$1.isMoved = false;
      return;
    }
    data$$1.isTouched = false;
    data$$1.isMoved = false;

    var currentPos = void 0;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data$$1.currentTranslate;
    }
    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      } else if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data$$1.velocities.length > 1) {
          var lastMoveEvent = data$$1.velocities.pop();
          var velocityEvent = data$$1.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data$$1.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        var doBounce = false;
        var afterBouncePosition = void 0;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data$$1.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data$$1.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
        } else if (params.freeModeSticky) {
          var nextSlide = void 0;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }
          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideReset();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart();
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data$$1.allowMomentumBounce) return;
            swiper.emit('momentumBounce');

            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart();
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + params.slidesPerGroup);else swiper.slideTo(stopIndex);
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  };

  var onResize = function onResize() {
    var swiper = this;

    var params = swiper.params,
        el = swiper.el;


    if (el && el.offsetWidth === 0) return;

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext,
        allowSlidePrev = swiper.allowSlidePrev;

    // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  };

  var onClick = function onClick(e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  };

  function attachEvents() {
    var swiper = this;

    var params = swiper.params,
        touchEvents = swiper.touchEvents,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl;


    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (Browser.ie) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        (Support.touch ? target : doc).addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        (Support.touch ? target : doc).addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.on('resize observerUpdate', onResize);
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params,
        touchEvents = swiper.touchEvents,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl;


    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (Browser.ie) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        (Support.touch ? target : doc).removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        (Support.touch ? target : doc).removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.off('resize observerUpdate', onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };

  var setBreakpoint = function setBreakpoint() {
    var swiper = this;
    var activeIndex = swiper.activeIndex,
        _swiper$loopedSlides = swiper.loopedSlides,
        loopedSlides = _swiper$loopedSlides === undefined ? 0 : _swiper$loopedSlides,
        params = swiper.params;

    var breakpoints = params.breakpoints;
    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
    // Set breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);
    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
      var needsReLoop = params.loop && breakPointsParams.slidesPerView !== params.slidesPerView;

      Utils.extend(swiper.params, breakPointsParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }
      swiper.emit('breakpoint', breakPointsParams);
    }
  };

  var getBreakpoint = function getBreakpoint(breakpoints) {
    // Get breakpoint for window width
    if (!breakpoints) return undefined;
    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];
      if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  };

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  var addClasses = function addClasses() {
    var swiper = this;
    var classNames = swiper.classNames,
        params = swiper.params,
        rtl = swiper.rtl,
        $el = swiper.$el;

    var suffixes = [];

    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }
    // WP8 Touch Events Fix
    if (win.navigator.pointerEnabled || win.navigator.msPointerEnabled) {
      suffixes.push('wp8-' + params.direction);
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  };

  var removeClasses = function removeClasses() {
    var swiper = this;
    var $el = swiper.$el,
        classNames = swiper.classNames;


    $el.removeClass(classNames.join(' '));
  };

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  var loadImage = function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image = void 0;
    function onReady() {
      if (callback) callback();
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  };

  var preloadImages = function preloadImages() {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
      if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) swiper.update();
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
    }
  };

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages
  };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    iOSEdgeSwipeDetection: false,
    iOSEdgeSwipeThreshold: 20,

    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,

    // Autoheight
    autoHeight: false,

    // Set wrapper width
    setWrapperSize: false,

    // Virtual Translate
    virtualTranslate: false,

    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

    // Breakpoints
    breakpoints: undefined,

    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    normalizeSlideIndex: true,

    // Round length
    roundLengths: false,

    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',

    // Callbacks
    runCallbacksOnInit: true
  };

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    classes: classes,
    images: images
  };

  var extendedDefaults = {};

  var Swiper$1 = function (_SwiperClass) {
    _inherits(Swiper$1, _SwiperClass);

    function Swiper$1() {
      var _ret3;

      _classCallCheck(this, Swiper$1);

      var el = void 0;
      var params = void 0;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        el = args[0];
        params = args[1];
      }
      if (!params) params = {};

      params = Utils.extend({}, params);
      if (el && !params.el) params.el = el;

      var _this2 = _possibleConstructorReturn(this, (Swiper$1.__proto__ || Object.getPrototypeOf(Swiper$1)).call(this, params));

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper$1.prototype[protoMethod]) {
            Swiper$1.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = _this2;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if ((typeof moduleParams === 'undefined' ? 'undefined' : _typeof(moduleParams)) !== 'object') return;
          if (!(moduleParamName in params && 'enabled' in moduleParams)) return;
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) params[moduleParamName] = { enabled: false };
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Find el
      var $el = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.params.el);
      el = $el[0];

      if (!el) {
        var _ret;

        return _ret = undefined, _possibleConstructorReturn(_this2, _ret);
      }

      if ($el.length > 1) {
        var _ret2;

        var swipers = [];
        $el.each(function (index$$1, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper$1(newParams));
        });
        return _ret2 = swipers, _possibleConstructorReturn(_this2, _ret2);
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl = $el.children('.' + swiper.params.wrapperClass);

      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },

        // RTL
        rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (win.navigator.pointerEnabled) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (win.navigator.msPointerEnabled) {
            desktop = ['MSPointerDown', 'MsPointerMove', 'MsPointerUp'];
          }

          return {
            start: Support.touch || !swiper.params.simulateTouch ? touch[0] : desktop[0],
            move: Support.touch || !swiper.params.simulateTouch ? touch[1] : desktop[1],
            end: Support.touch || !swiper.params.simulateTouch ? touch[2] : desktop[2]
          };
        }(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return _ret3 = swiper, _possibleConstructorReturn(_this2, _ret3);
    }

    _createClass(Swiper$1, [{
      key: 'slidesPerViewDynamic',
      value: function slidesPerViewDynamic() {
        var swiper = this;
        var params = swiper.params,
            slides = swiper.slides,
            slidesGrid = swiper.slidesGrid,
            swiperSize = swiper.size,
            activeIndex = swiper.activeIndex;

        var spv = 1;
        if (params.centeredSlides) {
          var slideSize = slides[activeIndex].swiperSlideSize;
          var breakLoop = void 0;
          for (var i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
          for (var _i5 = activeIndex - 1; _i5 >= 0; _i5 -= 1) {
            if (slides[_i5] && !breakLoop) {
              slideSize += slides[_i5].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
        } else {
          for (var _i6 = activeIndex + 1; _i6 < slides.length; _i6 += 1) {
            if (slidesGrid[_i6] - slidesGrid[activeIndex] < swiperSize) {
              spv += 1;
            }
          }
        }
        return spv;
      }
    }, {
      key: 'update',
      value: function update() {
        var swiper = this;
        if (!swiper || swiper.destroyed) return;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        var newTranslate = void 0;
        function setTranslate() {
          newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        var translated = void 0;
        if (swiper.params.freeMode) {
          setTranslate();
          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }
          if (!translated) {
            setTranslate();
          }
        }
        swiper.emit('update');
      }
    }, {
      key: 'init',
      value: function init() {
        var swiper = this;
        if (swiper.initialized) return;

        swiper.emit('beforeInit');

        // Set breakpoint
        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        }

        // Add Classes
        swiper.addClasses();

        // Create loop
        if (swiper.params.loop) {
          swiper.loopCreate();
        }

        // Update size
        swiper.updateSize();

        // Update slides
        swiper.updateSlides();

        // Set Grab Cursor
        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        }

        // Slide To Initial Slide
        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
        }

        // Attach events
        swiper.attachEvents();

        // Init Flag
        swiper.initialized = true;

        // Emit
        swiper.emit('init');
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var swiper = this;
        var params = swiper.params,
            $el = swiper.$el,
            $wrapperEl = swiper.$wrapperEl,
            slides = swiper.slides;

        swiper.emit('beforeDestroy');

        // Init Flag
        swiper.initialized = false;

        // Detach events
        swiper.detachEvents();

        // Destroy loop
        if (params.loop) {
          swiper.loopDestroy();
        }

        // Cleanup styles
        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');
          if (slides && slides.length) {
            slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
          }
        }

        swiper.emit('destroy');

        // Detach emitter events
        Object.keys(swiper.eventsListeners).forEach(function (eventName) {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          swiper.$el.data('swiper', null);
          Utils.deleteProps(swiper);
        }
        swiper.destroyed = true;
      }
    }], [{
      key: 'extendDefaults',
      value: function extendDefaults(newDefaults) {
        Utils.extend(extendedDefaults, newDefaults);
      }
    }, {
      key: 'extendedDefaults',
      get: function get() {
        return extendedDefaults;
      }
    }, {
      key: 'defaults',
      get: function get() {
        return defaults;
      }
    }, {
      key: 'Class',
      get: function get() {
        return SwiperClass;
      }
    }, {
      key: '$',
      get: function get() {
        return __WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */];
      }
    }]);

    return Swiper$1;
  }(SwiperClass);

  var Device$2 = {
    name: 'device',
    proto: {
      device: Device
    },
    static: {
      device: Device
    }
  };

  var Support$2 = {
    name: 'support',
    proto: {
      support: Support
    },
    static: {
      support: Support
    }
  };

  var Browser$2 = {
    name: 'browser',
    proto: {
      browser: Browser
    },
    static: {
      browser: Browser
    }
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('orientationchange');
          }
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      }
    }
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        mutations.forEach(function (mutation) {
          swiper.emit('observerUpdate', mutation);
        });
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) return;
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: false });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    }
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: []
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      }
    }
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var _swiper$params = swiper.params,
          slidesPerView = _swiper$params.slidesPerView,
          slidesPerGroup = _swiper$params.slidesPerGroup,
          centeredSlides = _swiper$params.centeredSlides;
      var _swiper$virtual = swiper.virtual,
          previousFrom = _swiper$virtual.from,
          previousTo = _swiper$virtual.to,
          slides = _swiper$virtual.slides,
          previousSlidesGrid = _swiper$virtual.slidesGrid,
          renderSlide = _swiper$virtual.renderSlide,
          previousOffset = _swiper$virtual.offset;

      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp = void 0;
      if (swiper.rtl && swiper.isHorizontal()) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';

      var slidesAfter = void 0;
      var slidesBefore = void 0;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1);
        slidesBefore = slidesPerGroup;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset$$1 = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset$$1,
        slidesGrid: swiper.slidesGrid
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset$$1 !== previousOffset) {
          swiper.slides.css(offsetProp, offset$$1 + 'px');
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset$$1,
          from: from,
          to: to,
          slides: function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find('.' + swiper.params.slideClass).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find('.' + swiper.params.slideClass + '[data-swiper-slide-index="' + i + '"]').remove();
          }
        }
      }
      for (var _i7 = 0; _i7 < slides.length; _i7 += 1) {
        if (_i7 >= from && _i7 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(_i7);
          } else {
            if (_i7 > previousTo) appendIndexes.push(_i7);
            if (_i7 < previousFrom) prependIndexes.push(_i7);
          }
        }
      }
      appendIndexes.forEach(function (index$$1) {
        swiper.$wrapperEl.append(renderSlide(slides[index$$1], index$$1));
      });
      prependIndexes.sort(function (a, b) {
        return a < b;
      }).forEach(function (index$$1) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index$$1], index$$1));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, offset$$1 + 'px');
      onRendered();
    },
    renderSlide: function renderSlide(slide, index$$1) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index$$1]) {
        return swiper.virtual.cache[index$$1];
      }
      var $slideEl = params.renderSlide ? Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(params.renderSlide.call(swiper, slide, index$$1)) : Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="' + swiper.params.slideClass + '" data-swiper-slide-index="' + index$$1 + '">' + slide + '</div>');
      if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index$$1);
      if (params.cache) swiper.virtual.cache[index$$1] = $slideEl;
      return $slideEl;
    },
    appendSlide: function appendSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.push(slide);
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.unshift(slide);
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          newCache[cachedIndex + 1] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideNext(0);
    }
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {}
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) return;
        swiper.classNames.push(swiper.params.containerModifierClass + 'virtual');
        var overwriteParams = {
          watchSlidesProgress: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        swiper.virtual.update();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) return;
        swiper.virtual.update();
      }
    }
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var e = event;
      if (e.originalEvent) e = e.originalEvent; // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40)) {
        return false;
      }
      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents('.' + swiper.params.slideClass).length > 0 && swiper.$el.parents('.' + swiper.params.slideActiveClass).length === 0) {
          return undefined;
        }
        var windowScroll = {
          left: win.pageXOffset,
          top: win.pageYOffset
        };
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (swiper.rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
        var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
            inView = true;
          }
        }
        if (!inView) return undefined;
      }
      if (swiper.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }
        if (kc === 39 && !swiper.rtl || kc === 37 && swiper.rtl) swiper.slideNext();
        if (kc === 37 && !swiper.rtl || kc === 39 && swiper.rtl) swiper.slidePrev();
      } else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }
        if (kc === 40) swiper.slideNext();
        if (kc === 38) swiper.slidePrev();
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) return;
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) return;
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    }
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      }
    }
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && doc.implementation && doc.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    doc.implementation.hasFeature('', '') !== true) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) return 'DOMMouseScroll';
      return isEventSupported() ? 'wheel' : 'mousewheel';
    }(),
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }
      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;
      if (e.originalEvent) e = e.originalEvent; // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtl ? -1 : 1;

      var data$$1 = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data$$1.pixelX) > Math.abs(data$$1.pixelY)) delta = data$$1.pixelX * rtlFactor;else return true;
        } else if (Math.abs(data$$1.pixelY) > Math.abs(data$$1.pixelX)) delta = data$$1.pixelY;else return true;
      } else {
        delta = Math.abs(data$$1.pixelX) > Math.abs(data$$1.pixelY) ? -data$$1.pixelX * rtlFactor : -data$$1.pixelY;
      }

      if (delta === 0) return true;

      if (params.invert) delta = -delta;

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) return true;
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) return true;
        }
        swiper.mousewheel.lastScrollTime = new win.Date().getTime();
      } else {
        // Freemode or scrollContainer:
        var position = swiper.getTranslate() + delta * params.sensitivity;
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideReset();
          }, 300);
        }
        // Emit event
        swiper.emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.stopAutoplay();

        // Return page scroll on edge positions
        if (position === 0 || position === swiper.maxTranslate()) return true;
      }

      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      return false;
    },
    enable: function enable() {
      var swiper = this;
      if (!Mousewheel.event) return false;
      if (swiper.mousewheel.enabled) return false;
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.params.mousewheel.eventsTarged);
      }
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      if (!Mousewheel.event) return false;
      if (!swiper.mousewheel.enabled) return false;
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.params.mousewheel.eventsTarged);
      }
      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    }
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          lastScrollTime: Utils.now()
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.mousewheel.enabled) swiper.mousewheel.enable();
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.mousewheel.enabled) swiper.mousewheel.disable();
      }
    }
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) return;
      var _swiper$navigation = swiper.navigation,
          $nextEl = _swiper$navigation.$nextEl,
          $prevEl = _swiper$navigation.$prevEl;


      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) return;

      var $nextEl = void 0;
      var $prevEl = void 0;
      if (params.nextEl) {
        $nextEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(params.nextEl);
        if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(params.prevEl);
        if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', function (e) {
          e.preventDefault();
          if (swiper.isEnd && !swiper.params.loop) return;
          swiper.slideNext();
        });
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', function (e) {
          e.preventDefault();
          if (swiper.isBeginning && !swiper.params.loop) return;
          swiper.slidePrev();
        });
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var _swiper$navigation2 = swiper.navigation,
          $nextEl = _swiper$navigation2.$nextEl,
          $prevEl = _swiper$navigation2.$prevEl;

      if ($nextEl && $nextEl.length) {
        $nextEl.off('click');
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click');
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var _swiper$navigation3 = swiper.navigation,
            $nextEl = _swiper$navigation3.$nextEl,
            $prevEl = _swiper$navigation3.$prevEl;

        if (swiper.params.navigation.hideOnClick && !Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).is($prevEl) && !Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).is($nextEl)) {
          if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
        }
      }
    }
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current = void 0;
      var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }
        if (current > total - 1) current -= total;
        if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', swiper.pagination.bulletSize * 5 + 'px');
        }
        bullets.removeClass(params.bulletActiveClass + ' ' + params.bulletActiveClass + '-next ' + params.bulletActiveClass + '-next-next ' + params.bulletActiveClass + '-prev ' + params.bulletActiveClass + '-prev-prev');
        if ($el.length > 1) {
          bullets.each(function (index$$1, bullet) {
            var $bullet = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(bullet);
            if ($bullet.index() === current) {
              $bullet.addClass(params.bulletActiveClass);
              if (params.dynamicBullets) {
                $bullet.prev().addClass(params.bulletActiveClass + '-prev').prev().addClass(params.bulletActiveClass + '-prev-prev');
                $bullet.next().addClass(params.bulletActiveClass + '-next').next().addClass(params.bulletActiveClass + '-next-next');
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            $bullet.prev().addClass(params.bulletActiveClass + '-prev').prev().addClass(params.bulletActiveClass + '-prev-prev');
            $bullet.next().addClass(params.bulletActiveClass + '-next').next().addClass(params.bulletActiveClass + '-next-next');
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, 5);
          var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - current * swiper.pagination.bulletSize;
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', bulletsOffset + 'px');
        }
      }
      if (params.type === 'fraction') {
        $el.find('.' + params.currentClass).text(current + 1);
        $el.find('.' + params.totalClass).text(total);
      }
      if (params.type === 'progressbar') {
        var scale = (current + 1) / total;
        var scaleX = scale;
        var scaleY = 1;
        if (!swiper.isHorizontal()) {
          scaleY = scale;
          scaleX = 1;
        }
        $el.find('.' + params.progressbarFillClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += '<' + params.bulletElement + ' class="' + params.bulletClass + '"></' + params.bulletElement + '>';
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find('.' + params.bulletClass);
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = '<span class="' + params.currentClass + '"></span>' + ' / ' + ('<span class="' + params.totalClass + '"></span>');
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = '<span class="' + params.progressbarFillClass + '"></span>';
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) return;

      var $el = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(params.el);
      if ($el.length === 0) return;

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && swiper.$el.find(params.el).length === 1) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass('' + params.modifierClass + params.type + '-dynamic');
      }

      if (params.clickable) {
        $el.on('click', '.' + params.bulletClass, function onClick(e) {
          e.preventDefault();
          var index$$1 = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) index$$1 += swiper.loopedSlides;
          swiper.slideTo(index$$1);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
      if (params.clickable) {
        $el.off('click', '.' + params.bulletClass);
      }
    }
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,

        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        clickableClass: 'swiper-pagination-clickable' // NEW
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target).hasClass(swiper.params.pagination.bulletClass)) {
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      }
    }
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      var scrollbar = swiper.scrollbar,
          rtl = swiper.rtl,
          progress = swiper.progress;
      var dragSize = scrollbar.dragSize,
          trackSize = scrollbar.trackSize,
          $dragEl = scrollbar.$dragEl,
          $el = scrollbar.$el;

      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl && swiper.isHorizontal()) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform('translate3d(' + newPos + 'px, 0, 0)');
        } else {
          $dragEl.transform('translateX(' + newPos + 'px)');
        }
        $dragEl[0].style.width = newSize + 'px';
      } else {
        if (Support.transforms3d) {
          $dragEl.transform('translate3d(0px, ' + newPos + 'px, 0)');
        } else {
          $dragEl.transform('translateY(' + newPos + 'px)');
        }
        $dragEl[0].style.height = newSize + 'px';
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl,
          $el = scrollbar.$el;


      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize = void 0;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + 'px';
      } else {
        $dragEl[0].style.height = dragSize + 'px';
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbarHide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize
      });
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el,
          dragSize = scrollbar.dragSize,
          trackSize = scrollbar.trackSize;


      var pointerPosition = void 0;
      if (swiper.isHorizontal()) {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
      } else {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
      }
      var positionRatio = void 0;
      positionRatio = (pointerPosition - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - dragSize / 2) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (swiper.rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar,
          $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el,
          $dragEl = scrollbar.$dragEl;

      swiper.scrollbar.isTouched = true;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar,
          $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el,
          $dragEl = scrollbar.$dragEl;


      if (!swiper.scrollbar.isTouched) return;
      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el;


      if (!swiper.scrollbar.isTouched) return;
      swiper.scrollbar.isTouched = false;
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideReset();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var scrollbar = swiper.scrollbar;

      var $el = scrollbar.$el;
      var target = Support.touch ? $el[0] : document;
      $el.on(swiper.scrollbar.dragEvents.start, swiper.scrollbar.onDragStart);
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(target).on(swiper.scrollbar.dragEvents.move, swiper.scrollbar.onDragMove);
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(target).on(swiper.scrollbar.dragEvents.end, swiper.scrollbar.onDragEnd);
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var scrollbar = swiper.scrollbar;

      var $el = scrollbar.$el;
      var target = Support.touch ? $el[0] : document;
      $el.off(swiper.scrollbar.dragEvents.start);
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(target).off(swiper.scrollbar.dragEvents.move);
      Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(target).off(swiper.scrollbar.dragEvents.end);
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var scrollbar = swiper.scrollbar,
          $swiperEl = swiper.$el,
          touchEvents = swiper.touchEvents;

      var params = swiper.params.scrollbar;

      var $el = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find('.swiper-scrollbar-drag');
      if ($dragEl.length === 0) {
        $dragEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-scrollbar-drag"></div>');
        $el.append($dragEl);
      }

      swiper.scrollbar.dragEvents = function dragEvents() {
        if (swiper.params.simulateTouch === false && !Support.touch) {
          return {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
          };
        }
        return touchEvents;
      }();

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0]
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    }
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      }
    }
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;


      var $el = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if (x.indexOf('%') >= 0) {
        x = parseInt(x, 10) * progress * rtlFactor + '%';
      } else {
        x = x * progress * rtlFactor + 'px';
      }
      if (y.indexOf('%') >= 0) {
        y = parseInt(y, 10) * progress + '%';
      } else {
        y = y * progress + 'px';
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform('translate3d(' + x + ', ' + y + ', 0px)');
      } else {
        var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        $el.transform('translate3d(' + x + ', ' + y + ', 0px) scale(' + currentScale + ')');
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el,
          slides = swiper.slides,
          progress = swiper.progress,
          snapGrid = swiper.snapGrid;

      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index$$1, el) {
        swiper.parallax.setTransform(el, progress);
      });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index$$1, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
      });
    },
    setTransition: function setTransition() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;

      var swiper = this;
      var $el = swiper.$el;

      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index$$1, parallaxEl) {
        var $parallaxEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        $parallaxEl.transition(parallaxDuration);
      });
    }
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        swiper.params.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax) return;
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax) return;
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax) return;
        swiper.parallax.setTransition(duration);
      }
    }
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) return 1;
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance;
    },

    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(this);
        if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent('.' + params.containerClass);
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      if (Support.gestures) {
        swiper.zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
      }
      gesture.$imageEl.transform('translate3d(0,0,0) scale(' + zoom.scale + ')');
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform('translate3d(0,0,0) scale(' + zoom.scale + ')');
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) gesture.$slideEl = undefined;
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      if (image.isTouched) return;
      if (Device.android) e.preventDefault();
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image,
          velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) return;

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) image.startX = -image.startX;
        if (swiper.rtl) image.startY = -image.startY;
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;

      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        } else if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
      }
      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
      }

      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
      }
      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
      }

      // Velocity
      if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
      if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
      if (!velocity.prevTime) velocity.prevTime = Date.now();
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform('translate3d(' + image.currentX + 'px, ' + image.currentY + 'px,0)');
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image,
          velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform('translate3d(' + image.currentX + 'px, ' + image.currentY + 'px,0)');
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;

        zoom.scale = 1;
        zoom.currentScale = 1;
      }
    },

    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function _in(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture,
          image = zoom.image;


      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent('.' + params.containerClass);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

      gesture.$slideEl.addClass('' + params.zoomedSlideClass);

      var touchX = void 0;
      var touchY = void 0;
      var offsetX = void 0;
      var offsetY = void 0;
      var diffX = void 0;
      var diffY = void 0;
      var translateX = void 0;
      var translateY = void 0;
      var imageWidth = void 0;
      var imageHeight = void 0;
      var scaledWidth = void 0;
      var scaledHeight = void 0;
      var translateMinX = void 0;
      var translateMinY = void 0;
      var translateMaxX = void 0;
      var translateMaxY = void 0;
      var slideWidth = void 0;
      var slideHeight = void 0;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(' + zoom.scale + ')');
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;


      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent('.' + params.containerClass);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass('' + params.zoomedSlideClass);
      gesture.$slideEl = undefined;
    },

    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) return;
      zoom.enabled = true;

      var slides = swiper.slides;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        slides.on('gesturestart', zoom.onGestureStart, passiveListener);
        slides.on('gesturechange', zoom.onGestureChange, passiveListener);
        slides.on('gestureend', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        slides.on(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
        slides.on(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
        slides.on(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.slides.each(function (index$$1, slideEl) {
        var $slideEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl);
        if ($slideEl.find('.' + swiper.params.zoom.containerClass).length > 0) {
          $slideEl.on(swiper.touchEvents.move, zoom.onTouchMove);
        }
      });
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) return;

      swiper.zoom.enabled = false;

      var slides = swiper.slides;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        slides.off('gesturestart', zoom.onGestureStart, passiveListener);
        slides.off('gesturechange', zoom.onGestureChange, passiveListener);
        slides.off('gestureend', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        slides.off(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
        slides.off(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
        slides.off(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.slides.each(function (index$$1, slideEl) {
        var $slideEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl);
        if ($slideEl.find('.' + swiper.params.zoom.containerClass).length > 0) {
          $slideEl.off(swiper.touchEvents.move, zoom.onTouchMove);
        }
      });
    }
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed'
      }
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {}
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined
        }
      };
      'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) return;
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) return;
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      }
    }
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index$$1) {
      var loadInDuplicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index$$1 === 'undefined') return;
      if (swiper.slides.length === 0) return;
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual ? swiper.$wrapperEl.children('.' + swiper.params.slideClass + '[data-swiper-slide-index="' + index$$1 + '"]') : swiper.slides.eq(index$$1);

      var $images = $slideEl.find('.' + params.elementClass + ':not(.' + params.loadedClass + '):not(.' + params.loadingClass + ')');
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) return;

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;
          if (background) {
            $imageEl.css('background-image', 'url("' + background + '")');
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find('.' + params.preloaderClass).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + swiper.params.slideDuplicateClass + ')');
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children('.' + swiper.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl,
          swiperParams = swiper.params,
          slides = swiper.slides,
          activeIndex = swiper.activeIndex;

      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index$$1) {
        if (isVirtual) {
          if ($wrapperEl.children('.' + swiperParams.slideClass + '[data-swiper-slide-index="' + index$$1 + '"]').length) {
            return true;
          }
        } else if (slides[index$$1]) return true;
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl).attr('data-swiper-slide-index');
        }
        return Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) swiper.lazy.initialImageLoaded = true;
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children('.' + swiperParams.slideVisibleClass).each(function (elIndex, slideEl) {
          var index$$1 = isVirtual ? Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl).attr('data-swiper-slide-index') : Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(slideEl).index();
          swiper.lazy.loadInSlide(index$$1);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) swiper.lazy.loadInSlide(i);
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var _i8 = activeIndex + slidesPerView; _i8 < maxIndex; _i8 += 1) {
            if (slideExist(_i8)) swiper.lazy.loadInSlide(_i8);
          }
          // Prev Slides
          for (var _i9 = minIndex; _i9 < activeIndex; _i9 += 1) {
            if (slideExist(_i9)) swiper.lazy.loadInSlide(_i9);
          }
        } else {
          var nextSlide = $wrapperEl.children('.' + swiperParams.slideNextClass);
          if (nextSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(nextSlide));

          var prevSlide = $wrapperEl.children('.' + swiperParams.slidePrevClass);
          if (prevSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(prevSlide));
        }
      }
    }
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      }
    }
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = function search() {
        var maxIndex = void 0;
        var minIndex = void 0;
        var guess = void 0;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }();
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1 = void 0;
      var i3 = void 0;

      this.interpolate = function interpolate(x2) {
        if (!x2) return 0;

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
      };
      return this;
    },

    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(_setTranslate, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier = void 0;
      var controlledTranslate = void 0;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = c.rtl && c.params.direction === 'horizontal' ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper$1 && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i = void 0;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) return;
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper$1 && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide' // or 'container'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper)
        }
      });
    },

    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) return;
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) return;
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) return;
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) return;
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) return;
        swiper.controller.setTransition(duration, byController);
      }
    }
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) return;
      var $targetEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is('.' + swiper.params.pagination.bulletClass)) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) return;
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) return;
      var _swiper$navigation4 = swiper.navigation,
          $nextEl = _swiper$navigation4.$nextEl,
          $prevEl = _swiper$navigation4.$prevEl;


      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl = void 0;
      var $prevEl = void 0;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', '.' + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) swiper.a11y.liveRegion.remove();

      var $nextEl = void 0;
      var $prevEl = void 0;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', '.' + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    }
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: false,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<span class="' + swiper.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
        }
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.destroy();
      }
    }
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) return;
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) return;
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) {
        return part !== '';
      });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index$$1) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) return;
      var slide = swiper.slides.eq(index$$1);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + '/' + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text$$1) {
      return text$$1.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var _slide3 = swiper.slides.eq(i);
          var slideHistory = History.slugify(_slide3.attr('data-history'));
          if (slideHistory === value && !_slide3.hasClass(swiper.params.slideDuplicateClass)) {
            var index$$1 = _slide3.index();
            swiper.slideTo(index$$1, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    }
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      }
    }
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        swiper.slideTo(swiper.$wrapperEl.children('.' + swiper.params.slideClass + '[data-hash="' + newHash + '"]').index());
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) return;
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, '#' + swiper.slides.eq(swiper.activeIndex).attr('data-hash') || '');
      } else {
        var _slide4 = swiper.slides.eq(swiper.activeIndex);
        var hash = _slide4.attr('data-hash') || _slide4.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var _slide5 = swiper.slides.eq(i);
          var slideHash = _slide5.attr('data-hash') || _slide5.attr('data-history');
          if (slideHash === hash && !_slide5.hasClass(swiper.params.slideDuplicateClass)) {
            var index$$1 = _slide5.index();
            swiper.slideTo(index$$1, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    }
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      }
    }
  };

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') return false;
      if (swiper.autoplay.running) return false;
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) return false;
      if (typeof swiper.autoplay.timeout === 'undefined') return false;

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) return;
      if (swiper.autoplay.paused) return;
      if (swiper.autoplay.timeout) clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.paused = true;
      if (speed === 0) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed) return;
          swiper.autoplay.paused = false;
          if (!swiper.autoplay.running) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.run();
          }
        });
      }
    }
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        disableOnInteraction: true,
        stopOnLastSlide: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper)
        }
      });
    },

    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      }
    }
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset$$1 = $slideEl[0].swiperSlideOffset;
        var tx = -offset$$1;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl.css({
          opacity: slideOpacity
        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides,
          $wrapperEl = swiper.$wrapperEl;

      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.classNames.push(swiper.params.containerModifierClass + 'fade');
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTransition(duration);
      }
    }
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el,
          $wrapperEl = swiper.$wrapperEl,
          slides = swiper.slides,
          swiperWidth = swiper.width,
          swiperHeight = swiper.height,
          rtl = swiper.rtl,
          swiperSize = swiper.size;

      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl = void 0;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: swiperWidth + 'px' });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform$$1 = 'rotateX(' + (isHorizontal ? 0 : -slideAngle) + 'deg) rotateY(' + (isHorizontal ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;
          if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
        }
        $slideEl.transform(transform$$1);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (isHorizontal ? 'left' : 'top') + '"></div>');
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (isHorizontal ? 'right' : 'bottom') + '"></div>');
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': '50% 50% -' + swiperSize / 2 + 'px',
        '-moz-transform-origin': '50% 50% -' + swiperSize / 2 + 'px',
        '-ms-transform-origin': '50% 50% -' + swiperSize / 2 + 'px',
        'transform-origin': '50% 50% -' + swiperSize / 2 + 'px'
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform('translate3d(0px, ' + (swiperWidth / 2 + params.shadowOffset) + 'px, ' + -swiperWidth / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + params.shadowScale + ')');
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset$$1 = params.shadowOffset;
          $cubeShadowEl.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (swiperHeight / 2 + offset$$1) + 'px, ' + -swiperHeight / 2 / scale2 + 'px) rotateX(-90deg)');
        }
      }
      var zFactor = Browser.isSafari || Browser.isUiWebView ? -swiperSize / 2 : 0;
      $wrapperEl.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (swiper.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (swiper.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el,
          slides = swiper.slides;

      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    }
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') return;
        swiper.classNames.push(swiper.params.containerModifierClass + 'cube');
        swiper.classNames.push(swiper.params.containerModifierClass + '3d');
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') return;
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') return;
        swiper.cubeEffect.setTransition(duration);
      }
    }
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset$$1 = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset$$1;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (swiper.rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (swiper.isHorizontal() ? 'left' : 'top') + '"></div>');
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (swiper.isHorizontal() ? 'right' : 'bottom') + '"></div>');
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
        $slideEl.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides,
          activeIndex = swiper.activeIndex,
          $wrapperEl = swiper.$wrapperEl;

      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') return;
        swiper.classNames.push(swiper.params.containerModifierClass + 'flip');
        swiper.classNames.push(swiper.params.containerModifierClass + '3d');
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') return;
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') return;
        swiper.flipEffect.setTransition(duration);
      }
    }
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width,
          swiperHeight = swiper.height,
          slides = swiper.slides,
          $wrapperEl = swiper.$wrapperEl,
          slidesSizesGrid = swiper.slidesSizesGrid;

      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform$$1 = swiper.translate;
      var center = isHorizontal ? -transform$$1 + swiperWidth / 2 : -transform$$1 + swiperHeight / 2;
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
        var translateX = isHorizontal ? params.stretch * offsetMultiplier : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;

        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (isHorizontal ? 'left' : 'top') + '"></div>');
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = Object(__WEBPACK_IMPORTED_MODULE_0_dom7_dist_dom7_modular__["a" /* $ */])('<div class="swiper-slide-shadow-' + (isHorizontal ? 'right' : 'bottom') + '"></div>');
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
        }
      }

      // Set correct perspective for IE10
      if (Browser.ie) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + 'px 50%';
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
    }
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper)
        }
      });
    },

    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') return;

        swiper.classNames.push(swiper.params.containerModifierClass + 'coverflow');
        swiper.classNames.push(swiper.params.containerModifierClass + '3d');

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') return;
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') return;
        swiper.coverflowEffect.setTransition(duration);
      }
    }
  };

  // Swiper Class
  // Core Modules
  Swiper$1.use([Device$2, Support$2, Browser$2, Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow]);

  /* harmony default export */__webpack_exports__["a"] = Swiper$1;

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (binding) */
  __webpack_require__.d(__webpack_exports__, "a", function () {
    return $;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "c", function () {
    return addClass;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "E", function () {
    return removeClass;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "m", function () {
    return hasClass;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "H", function () {
    return toggleClass;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "e", function () {
    return attr;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "D", function () {
    return removeAttr;
  });
  /* unused harmony export prop */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "i", function () {
    return data;
  });
  /* unused harmony export removeData */
  /* unused harmony export dataset */
  /* unused harmony export val */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "I", function () {
    return transform;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "J", function () {
    return transition;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "u", function () {
    return on;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "s", function () {
    return off;
  });
  /* unused harmony export once */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "L", function () {
    return trigger;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "K", function () {
    return transitionEnd;
  });
  /* unused harmony export animationEnd */
  /* unused harmony export width */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "w", function () {
    return outerWidth;
  });
  /* unused harmony export height */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "v", function () {
    return outerHeight;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "t", function () {
    return offset;
  });
  /* unused harmony export hide */
  /* unused harmony export show */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "F", function () {
    return styles;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "h", function () {
    return css;
  });
  /* unused harmony export toArray */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "j", function () {
    return each;
  });
  /* unused harmony export forEach */
  /* unused harmony export filter */
  /* unused harmony export map */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "n", function () {
    return html;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "G", function () {
    return text;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "p", function () {
    return is;
  });
  /* unused harmony export indexOf */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "o", function () {
    return index;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "k", function () {
    return eq;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "d", function () {
    return append;
  });
  /* unused harmony export appendTo */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "z", function () {
    return prepend;
  });
  /* unused harmony export prependTo */
  /* unused harmony export insertBefore */
  /* unused harmony export insertAfter */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "q", function () {
    return next;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "r", function () {
    return nextAll;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "A", function () {
    return prev;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "B", function () {
    return prevAll;
  });
  /* unused harmony export siblings */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "x", function () {
    return parent;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "y", function () {
    return parents;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "g", function () {
    return closest;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "l", function () {
    return find;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "f", function () {
    return children;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "C", function () {
    return remove;
  });
  /* unused harmony export detach */
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
    return add;
  });
  /* unused harmony export empty */
  /* unused harmony export scrollTo */
  /* unused harmony export scrollTop */
  /* unused harmony export scrollLeft */
  /* unused harmony export animate */
  /* unused harmony export stop */
  /* unused harmony export click */
  /* unused harmony export blur */
  /* unused harmony export focus */
  /* unused harmony export focusin */
  /* unused harmony export focusout */
  /* unused harmony export keyup */
  /* unused harmony export keydown */
  /* unused harmony export keypress */
  /* unused harmony export submit */
  /* unused harmony export change */
  /* unused harmony export mousedown */
  /* unused harmony export mousemove */
  /* unused harmony export mouseup */
  /* unused harmony export mouseenter */
  /* unused harmony export mouseleave */
  /* unused harmony export mouseout */
  /* unused harmony export mouseover */
  /* unused harmony export touchstart */
  /* unused harmony export touchend */
  /* unused harmony export touchmove */
  /* unused harmony export resize */
  /* unused harmony export scroll */
  /**
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
   */

  var Dom7 = function Dom7(arr) {
    _classCallCheck(this, Dom7);

    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
      // String
      if (typeof selector === 'string') {
        var els = void 0;
        var tempParent = void 0;
        var _html = selector.trim();
        if (_html.indexOf('<') >= 0 && _html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (_html.indexOf('<li') === 0) toCreate = 'ul';
          if (_html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (_html.indexOf('<td') === 0 || _html.indexOf('<th') === 0) toCreate = 'tr';
          if (_html.indexOf('<tbody') === 0) toCreate = 'table';
          if (_html.indexOf('<option') === 0) toCreate = 'select';
          tempParent = document.createElement(toCreate);
          tempParent.innerHTML = _html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [document.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || document).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) arr.push(els[i]);
          }
        }
      } else if (selector.nodeType || selector === window || selector === document) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }
    return uniqueArray;
  }
  function toCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
      return group1.toUpperCase();
    });
  }

  function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    return window.setTimeout(callback, 1000 / 60);
  }
  function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    return window.clearTimeout(id);
  }

  // Classes and attributes
  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
      }
    }
    return this;
  }
  function removeClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) return false;
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
      }
    }
    return this;
  }
  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  // eslint-disable-next-line
  function prop(props, value) {
    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) return this[0][props];
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          // eslint-disable-next-line
          for (var propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  }
  function data(key, value) {
    var el = void 0;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute('data-' + key);
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  function removeData(key) {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  }
  function dataset() {
    var el = this[0];
    if (!el) return undefined;
    var dataset = {}; // eslint-disable-line
    if (el.dataset) {
      // eslint-disable-next-line
      for (var dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        // eslint-disable-next-line
        var _attr = el.attributes[i];
        if (_attr.name.indexOf('data-') >= 0) {
          dataset[toCamelCase(_attr.name.split('data-')[1])] = _attr.value;
        }
      }
    }
    // eslint-disable-next-line
    for (var key in dataset) {
      if (dataset[key] === 'false') dataset[key] = false;else if (dataset[key] === 'true') dataset[key] = true;else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
    }
    return dataset;
  }
  function val(value) {
    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          var values = [];
          for (var i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (var _i10 = 0; _i10 < this.length; _i10 += 1) {
      this[_i10].value = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms'; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var eventType = args[0],
        targetSelector = args[1],
        listener = args[2],
        capture = args[3];

    if (typeof args[1] === 'function') {
      eventType = args[0];
      listener = args[1];
      capture = args[2];

      targetSelector = undefined;
    }
    if (!capture) capture = false;

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) return;
      var eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
        var _parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < _parents.length; k += 1) {
          if ($(_parents[k]).is(targetSelector)) listener.apply(_parents[k], eventData);
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      eventData.unshift(e);
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j = void 0;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7Listeners) el.dom7Listeners = [];
          el.dom7Listeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleEvent
          });
          el.addEventListener(events[j], handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7LiveListeners) el.dom7LiveListeners = [];
          el.dom7LiveListeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    var eventType = args[0],
        targetSelector = args[1],
        listener = args[2],
        capture = args[3];

    if (typeof args[1] === 'function') {
      eventType = args[0];
      listener = args[1];
      capture = args[2];

      targetSelector = undefined;
    }
    if (!capture) capture = false;

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        if (!targetSelector) {
          if (el.dom7Listeners) {
            for (var k = 0; k < el.dom7Listeners.length; k += 1) {
              if (listener) {
                if (el.dom7Listeners[k].listener === listener) {
                  el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
                }
              } else if (el.dom7Listeners[k].type === events[i]) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            }
          }
        } else if (el.dom7LiveListeners) {
          for (var _k = 0; _k < el.dom7LiveListeners.length; _k += 1) {
            if (listener) {
              if (el.dom7LiveListeners[_k].listener === listener) {
                el.removeEventListener(events[i], el.dom7LiveListeners[_k].proxyListener, capture);
              }
            } else if (el.dom7LiveListeners[_k].type === events[i]) {
              el.removeEventListener(events[i], el.dom7LiveListeners[_k].proxyListener, capture);
            }
          }
        }
      }
    }
    return this;
  }
  function once() {
    var dom = this;

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    var eventName = args[0],
        targetSelector = args[1],
        listener = args[2],
        capture = args[3];

    if (typeof args[1] === 'function') {
      eventName = args[0];
      listener = args[1];
      capture = args[2];

      targetSelector = undefined;
    }
    function proxy(e) {
      var eventData = e.target.dom7EventData || [];
      listener.apply(this, eventData);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  }
  function trigger() {
    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var evt = void 0;
        try {
          evt = new window.CustomEvent(events[i], {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        this[j].dom7EventData = args.filter(function (data, dataIndex) {
          return dataIndex > 0;
        });
        this[j].dispatchEvent(evt);
        this[j].dom7EventData = [];
        delete this[j].dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i = void 0;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function animationEnd(callback) {
    var events = ['webkitAnimationEnd', 'animationend'];
    var dom = this;
    var i = void 0;
    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  // Sizing/Styles
  function width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var _styles = this.styles();
        return this[0].offsetWidth + parseFloat(_styles.getPropertyValue('margin-right')) + parseFloat(_styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var _styles2 = this.styles();
        return this[0].offsetHeight + parseFloat(_styles2.getPropertyValue('margin-top')) + parseFloat(_styles2.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var _scrollTop = el === window ? window.scrollY : el.scrollTop;
      var _scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: box.top + _scrollTop - clientTop,
        left: box.left + _scrollLeft - clientLeft
      };
    }

    return null;
  }
  function hide() {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.display = 'none';
    }
    return this;
  }
  function show() {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this;
  }
  function styles() {
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  }
  function css(props, value) {
    var i = void 0;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var _prop in props) {
            this[i].style[_prop] = props[_prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }

  // Dom manipulation
  function toArray() {
    var arr = [];
    for (var i = 0; i < this.length; i += 1) {
      arr.push(this[i]);
    }
    return arr;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) return this;
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  function forEach(callback) {
    // Don't bother continuing without a callback
    if (!callback) return this;
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], this[i], i) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
    }
    return new Dom7(matchedItems);
  }
  function map(callback) {
    var modifiedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      modifiedItems.push(callback.call(dom[i], i, dom[i]));
    }
    return new Dom7(modifiedItems);
  }
  // eslint-disable-next-line
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith = void 0;
    var i = void 0;
    if (!el || typeof selector === 'undefined') return false;
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    } else if (selector === document) return el === document;else if (selector === window) return el === window;

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    }
    return false;
  }
  function indexOf(el) {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i] === el) return i;
    }
    return -1;
  }
  function index() {
    var child = this[0];
    var i = void 0;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') return this;
    var length = this.length;
    var returnIndex = void 0;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) return new Dom7([]);
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var newChild = void 0;

    for (var k = 0; k < arguments.length; k += 1) {
      newChild = arguments.length <= k ? undefined : arguments[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  // eslint-disable-next-line
  function appendTo(parent) {
    $(parent).append(this);
    return this;
  }
  function prepend(newChild) {
    var i = void 0;
    var j = void 0;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function prependTo(parent) {
    $(parent).prepend(this);
    return this;
  }
  function insertBefore(selector) {
    var before = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  }
  function insertAfter(selector) {
    var after = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return new Dom7([]);
    while (el.nextElementSibling) {
      var _next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(_next).is(selector)) nextEls.push(_next);
      } else nextEls.push(_next);
      el = _next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) return new Dom7([el.previousElementSibling]);
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) return new Dom7([]);
    while (el.previousElementSibling) {
      var _prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(_prev).is(selector)) prevEls.push(_prev);
      } else prevEls.push(_prev);
      el = _prev;
    }
    return new Dom7(prevEls);
  }
  function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var _parent = this[i].parentNode; // eslint-disable-line
      while (_parent) {
        if (selector) {
          if ($(_parent).is(selector)) parents.push(_parent);
        } else {
          parents.push(_parent);
        }
        _parent = _parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }
    return this;
  }
  function detach() {
    return this.remove();
  }
  function add() {
    var dom = this;
    var i = void 0;
    var j = void 0;

    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }
  function empty() {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  }

  function scrollTo() {
    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    var left = args[0],
        top = args[1],
        duration = args[2],
        easing = args[3],
        callback = args[4];

    if (args.length === 4 && typeof easing === 'function') {
      callback = easing;
      left = args[0];
      top = args[1];
      duration = args[2];
      callback = args[3];
      easing = args[4];
    }
    if (typeof easing === 'undefined') easing = 'swing';

    return this.each(function animate() {
      var el = this;
      var currentTop = void 0;
      var currentLeft = void 0;
      var maxTop = void 0;
      var maxLeft = void 0;
      var newTop = void 0;
      var newLeft = void 0;
      var scrollTop = void 0; // eslint-disable-line
      var scrollLeft = void 0; // eslint-disable-line
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
        easing = 'swing';
      }
      if (animateTop) {
        currentTop = el.scrollTop;
        if (!duration) {
          el.scrollTop = top;
        }
      }
      if (animateLeft) {
        currentLeft = el.scrollLeft;
        if (!duration) {
          el.scrollLeft = left;
        }
      }
      if (!duration) return;
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) animateTop = false;
      if (animateLeft && newLeft === currentLeft) animateLeft = false;
      function render() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
        var done = void 0;
        if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);
        if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) callback();
          return;
        }
        if (animateTop) el.scrollTop = scrollTop;
        if (animateLeft) el.scrollLeft = scrollLeft;
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    });
  }
  // scrollTop(top, duration, easing, callback) {
  function scrollTop() {
    for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }

    var top = args[0],
        duration = args[1],
        easing = args[2],
        callback = args[3];

    if (args.length === 3 && typeof easing === 'function') {
      top = args[0];
      duration = args[1];
      callback = args[2];
      easing = args[3];
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) return dom[0].scrollTop;
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  }
  function scrollLeft() {
    for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      args[_key13] = arguments[_key13];
    }

    var left = args[0],
        duration = args[1],
        easing = args[2],
        callback = args[3];

    if (args.length === 3 && typeof easing === 'function') {
      left = args[0];
      duration = args[1];
      callback = args[2];
      easing = args[3];
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) return dom[0].scrollLeft;
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  }

  function animate(initialProps, initialParams) {
    var els = this;
    var a = {
      props: $.extend({}, initialProps),
      params: $.extend({
        duration: 300,
        easing: 'swing' // or 'linear'
        /* Callbacks
        begin(elements)
        complete(elements)
        progress(elements, complete, remaining, start, tweenValue)
        */
      }, initialParams),

      elements: els,
      animating: false,
      que: [],

      easingProgress: function easingProgress(easing, progress) {
        if (easing === 'swing') {
          return 0.5 - Math.cos(progress * Math.PI) / 2;
        }
        if (typeof easing === 'function') {
          return easing(progress);
        }
        return progress;
      },
      stop: function stop() {
        if (a.frameId) {
          cancelAnimationFrame(a.frameId);
        }
        a.animating = false;
        a.elements.each(function (index, el) {
          var element = el;
          delete element.dom7AnimateInstance;
        });
        a.que = [];
      },
      done: function done(complete) {
        a.animating = false;
        a.elements.each(function (index, el) {
          var element = el;
          delete element.dom7AnimateInstance;
        });
        if (complete) complete(els);
        if (a.que.length > 0) {
          var que = a.que.shift();
          a.animate(que[0], que[1]);
        }
      },
      animate: function animate(props, params) {
        if (a.animating) {
          a.que.push([props, params]);
          return a;
        }
        var elements = [];

        // Define & Cache Initials & Units
        a.elements.each(function (index, el) {
          var initialFullValue = void 0;
          var initialValue = void 0;
          var unit = void 0;
          var finalValue = void 0;
          var finalFullValue = void 0;

          if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;

          elements[index] = {
            container: el
          };
          Object.keys(props).forEach(function (prop) {
            initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
            initialValue = parseFloat(initialFullValue);
            unit = initialFullValue.replace(initialValue, '');
            finalValue = parseFloat(props[prop]);
            finalFullValue = props[prop] + unit;
            elements[index][prop] = {
              initialFullValue: initialFullValue,
              initialValue: initialValue,
              unit: unit,
              finalValue: finalValue,
              finalFullValue: finalFullValue,
              currentValue: initialValue
            };
          });
        });

        var startTime = null;
        var time = void 0;
        var elementsDone = 0;
        var propsDone = 0;
        var done = void 0;
        var began = false;

        a.animating = true;

        function render() {
          time = new Date().getTime();
          var progress = void 0;
          var easeProgress = void 0;
          // let el;
          if (!began) {
            began = true;
            if (params.begin) params.begin(els);
          }
          if (startTime === null) {
            startTime = time;
          }
          if (params.progress) {
            // eslint-disable-next-line
            params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time, startTime);
          }

          elements.forEach(function (element) {
            var el = element;
            if (done || el.done) return;
            Object.keys(props).forEach(function (prop) {
              if (done || el.done) return;
              progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
              easeProgress = a.easingProgress(params.easing, progress);
              var _el$prop = el[prop],
                  initialValue = _el$prop.initialValue,
                  finalValue = _el$prop.finalValue,
                  unit = _el$prop.unit;

              el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);
              var currentValue = el[prop].currentValue;

              if (finalValue > initialValue && currentValue >= finalValue || finalValue < initialValue && currentValue <= finalValue) {
                el.container.style[prop] = finalValue + unit;
                propsDone += 1;
                if (propsDone === Object.keys(props).length) {
                  el.done = true;
                  elementsDone += 1;
                }
                if (elementsDone === elements.length) {
                  done = true;
                }
              }
              if (done) {
                a.done(params.complete);
                return;
              }
              el.container.style[prop] = currentValue + unit;
            });
          });
          if (done) return;
          // Then call
          a.frameId = requestAnimationFrame(render);
        }
        a.frameId = requestAnimationFrame(render);
        return a;
      }
    };

    if (a.elements.length === 0) {
      return els;
    }

    var animateInstance = void 0;
    for (var i = 0; i < a.elements.length; i += 1) {
      if (a.elements[i].dom7AnimateInstance) {
        animateInstance = a.elements[i].dom7AnimateInstance;
      } else a.elements[i].dom7AnimateInstance = a;
    }
    if (!animateInstance) {
      animateInstance = a;
    }

    if (initialProps === 'stop') {
      animateInstance.stop();
    } else {
      animateInstance.animate(a.props, a.params);
    }

    return els;
  }

  function stop() {
    var els = this;
    for (var i = 0; i < els.length; i += 1) {
      if (els[i].dom7AnimateInstance) {
        els[i].dom7AnimateInstance.stop();
      }
    }
  }

  var noTrigger = 'resize scroll'.split(' ');
  function eventShortcut(name) {
    for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
      args[_key14 - 1] = arguments[_key14];
    }

    if (typeof args[0] === 'undefined') {
      for (var i = 0; i < this.length; i += 1) {
        if (noTrigger.indexOf(name) < 0) {
          if (name in this[i]) this[i][name]();else {
            $(this[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on.apply(this, [name].concat(args));
  }

  function click() {
    for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
      args[_key15] = arguments[_key15];
    }

    return eventShortcut.bind(this).apply(undefined, ['click'].concat(args));
  }
  function blur() {
    for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
      args[_key16] = arguments[_key16];
    }

    return eventShortcut.bind(this).apply(undefined, ['blur'].concat(args));
  }
  function focus() {
    for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
      args[_key17] = arguments[_key17];
    }

    return eventShortcut.bind(this).apply(undefined, ['focus'].concat(args));
  }
  function focusin() {
    for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
      args[_key18] = arguments[_key18];
    }

    return eventShortcut.bind(this).apply(undefined, ['focusin'].concat(args));
  }
  function focusout() {
    for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
      args[_key19] = arguments[_key19];
    }

    return eventShortcut.bind(this).apply(undefined, ['focusout'].concat(args));
  }
  function keyup() {
    for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
      args[_key20] = arguments[_key20];
    }

    return eventShortcut.bind(this).apply(undefined, ['keyup'].concat(args));
  }
  function keydown() {
    for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
      args[_key21] = arguments[_key21];
    }

    return eventShortcut.bind(this).apply(undefined, ['keydown'].concat(args));
  }
  function keypress() {
    for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
      args[_key22] = arguments[_key22];
    }

    return eventShortcut.bind(this).apply(undefined, ['keypress'].concat(args));
  }
  function submit() {
    for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
      args[_key23] = arguments[_key23];
    }

    return eventShortcut.bind(this).apply(undefined, ['submit'].concat(args));
  }
  function change() {
    for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
      args[_key24] = arguments[_key24];
    }

    return eventShortcut.bind(this).apply(undefined, ['change'].concat(args));
  }
  function mousedown() {
    for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
      args[_key25] = arguments[_key25];
    }

    return eventShortcut.bind(this).apply(undefined, ['mousedown'].concat(args));
  }
  function mousemove() {
    for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
      args[_key26] = arguments[_key26];
    }

    return eventShortcut.bind(this).apply(undefined, ['mousemove'].concat(args));
  }
  function mouseup() {
    for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
      args[_key27] = arguments[_key27];
    }

    return eventShortcut.bind(this).apply(undefined, ['mouseup'].concat(args));
  }
  function mouseenter() {
    for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
      args[_key28] = arguments[_key28];
    }

    return eventShortcut.bind(this).apply(undefined, ['mouseenter'].concat(args));
  }
  function mouseleave() {
    for (var _len29 = arguments.length, args = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
      args[_key29] = arguments[_key29];
    }

    return eventShortcut.bind(this).apply(undefined, ['mouseleave'].concat(args));
  }
  function mouseout() {
    for (var _len30 = arguments.length, args = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
      args[_key30] = arguments[_key30];
    }

    return eventShortcut.bind(this).apply(undefined, ['mouseout'].concat(args));
  }
  function mouseover() {
    for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
      args[_key31] = arguments[_key31];
    }

    return eventShortcut.bind(this).apply(undefined, ['mouseover'].concat(args));
  }
  function touchstart() {
    for (var _len32 = arguments.length, args = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
      args[_key32] = arguments[_key32];
    }

    return eventShortcut.bind(this).apply(undefined, ['touchstart'].concat(args));
  }
  function touchend() {
    for (var _len33 = arguments.length, args = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
      args[_key33] = arguments[_key33];
    }

    return eventShortcut.bind(this).apply(undefined, ['touchend'].concat(args));
  }
  function touchmove() {
    for (var _len34 = arguments.length, args = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
      args[_key34] = arguments[_key34];
    }

    return eventShortcut.bind(this).apply(undefined, ['touchmove'].concat(args));
  }
  function resize() {
    for (var _len35 = arguments.length, args = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
      args[_key35] = arguments[_key35];
    }

    return eventShortcut.bind(this).apply(undefined, ['resize'].concat(args));
  }
  function scroll() {
    for (var _len36 = arguments.length, args = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
      args[_key36] = arguments[_key36];
    }

    return eventShortcut.bind(this).apply(undefined, ['scroll'].concat(args));
  }

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  function each(collection, callback) {
    // eslint-disable-next-line
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }

  var SlideMenu = {
    type: 'slide-left',
    wrapperId: '.js-slide-menu__wrapper',
    maskId: '.js-slide-menu__mask',
    menuOpenerClass: '.js-slide-menu',

    wrapper: null,
    menu: null,

    init: function init() {
      this.body = document.body;
      this.wrapper = document.querySelector(this.wrapperId);
      this.mask = document.querySelector(this.maskId);
      this.menu = document.querySelector('.slide-menu--' + this.type);
      this.menuOpeners = document.querySelectorAll(this.menuOpenerClass);

      if (!this.mask) {
        console.error('Missing mask element for SlideMenu, maybe need to add HTML.');
        return;
      }

      this.initEvents();

      $('.js-mobile-submenu-toggle').on('click', function () {
        var $el = $(this);

        $el.parents('.menu-mobile__item').toggleClass('menu-mobile__item--open');
        $el.find('.icon-reveal-more').toggleClass('icon-reveal-more--active');
        $el.next('.js-mobile-submenu').slideToggle();
      });
    },

    initEvents: function initEvents() {
      var _this = this;

      // Event for clicks on the open buttons.
      each(this.menuOpeners, function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          _this.open();
        });
      });

      // Event for clicks on the mask.
      this.mask.addEventListener('click', function (e) {
        e.preventDefault();
        _this.close();
      });
    },

    open: function open() {
      this.body.classList.add('has-active-slide-menu');
      this.wrapper.classList.add('has-' + this.type);
      this.menu.classList.add('is-active');
      this.mask.classList.add('is-active');
      each(this.menuOpeners, function (item) {
        item.classList.add('is-active');
      });
      this.disableMenuOpeners();
    },

    close: function close() {
      this.body.classList.remove('has-active-slide-menu');
      this.wrapper.classList.remove('has-' + this.type);
      this.menu.classList.remove('is-active');
      this.mask.classList.remove('is-active');
      each(this.menuOpeners, function (item) {
        item.classList.remove('is-active');
      });
      this.enableMenuOpeners();
    },

    enableMenuOpeners: function enableMenuOpeners() {
      each(this.menuOpeners, function (item) {
        item.disabled = false;
      });
    },

    disableMenuOpeners: function disableMenuOpeners() {
      each(this.menuOpeners, function (item) {
        item.disabled = true;
      });
    }

    /* harmony default export */ };__webpack_exports__["a"] = SlideMenu;

  /***/
}]
/******/);