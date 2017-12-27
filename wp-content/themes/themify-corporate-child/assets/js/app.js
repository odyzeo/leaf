import ProgressBar from 'progressbar.js'
import Swiper from 'swiper'
import Adaptive from './components/Adaptive'
import SlideMenu from './components/SlideMenu'
import YouTube from './components/YouTube'
import 'lity'

window.$ = jQuery

$(document).ready(() => {

  Adaptive.init()
  SlideMenu.init()
  YouTube.init()

  /**
   * Mobile menu
   */
  $('.menu-mobile .menu-item-has-children > a').on('click', function (e) {
    e.preventDefault()

    var $el = $(this)
    var $submenu = $el.next('.sub-menu')

    $el.toggleClass('is-active')
    $submenu.slideToggle(300)
  })


  /**
   * Add placeholder to email-subscribers plugin input field
   * @type {*|jQuery|HTMLElement}
   */
  const $newsletterFooterInput = $('.footer #es_txt_email_pg')
  if ($newsletterFooterInput.length > 0) {
    $('.footer #es_txt_email_pg').attr('placeholder', 'email@email.com')
  }
  const $newsletterInput = $('.page-content #es_txt_email_pg')
  if ($newsletterInput.length > 0) {
    $('.page-content #es_txt_email_pg').attr('placeholder', 'Váš e-mail')
  }
  const $newsletterForm = $('.es_shortcode_form')
  if ($newsletterForm.length > 0) {
    $newsletterForm.on('submit', function (e) {
      e.preventDefault()
      return false
    })
  }


  /**
   * Swiper news
   */
  const $newsSwipers = $('.js-swiper-news')
  if ($newsSwipers.length > 0) {
    $newsSwipers.each(function () {
      const $newsSwiper = $(this)
      const newsCount = $newsSwiper.find('.swiper-slide').length
      $newsSwiper.toggleClass('swiper-container--single', newsCount === 1)

      const defaultNewsOptions = {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: '.js-swiper-news-pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: '.js-swiper-news-next',
          prevEl: '.js-swiper-news-prev',
        },
        breakpoints: {
          // when window width is <= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      }

      if (newsCount === 1) {
        defaultNewsOptions.loop = false
        defaultNewsOptions.slidesPerView = 1
        defaultNewsOptions.centeredSlides = true
        defaultNewsOptions.spaceBetween = 0
        defaultNewsOptions.navigation = false
        defaultNewsOptions.pagination = false
      }

      const $swiper = new Swiper($newsSwiper, defaultNewsOptions)
    })
  }


  /**
   * Swiper stories
   */
  const $storiesCirclesSwiper = $('.js-swiper-stories-circles')
  const $storiesSwiper = $('.js-swiper-stories')
  const storiesCount = $storiesSwiper.find('.swiper-slide:not(.swiper-slide-duplicate)').length
  if ($storiesSwiper.length > 0) {
    const defaultCirclesOptions = {
      allowTouchMove: false,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      loopedSlides: 50,
      loopAdditionalSlides: 50,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.js-swiper-circles-next',
        prevEl: '.js-swiper-circles-prev',
      },
      on: {
        slideChangeTransitionEnd: transitionEndCircles,
      },
    }

    const speed = 300
    const autoplayTime = 15000
    const defaultOptions = {
      slidesPerView: 1,
      speed: speed,
      loop: true,
      loopedSlides: 50,
      loopAdditionalSlides: 50,
      autoplay: {
        delay: autoplayTime,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.js-swiper-stories-next',
        prevEl: '.js-swiper-stories-prev',
      },
      on: {
        slideChangeTransitionEnd: transitionEnd,
      },
    }

    let initialized = false
    let clicked = false

    const $swiper = new Swiper($storiesSwiper, defaultOptions)
    const $circlesSwiper = new Swiper($storiesCirclesSwiper, defaultCirclesOptions)

    function transitionEndCircles() {
      /**
       * Progress bar
       */
      const $active = $('.js-swiper-stories-circles .swiper-slide-active .js-swiper-timer')
      let $progress = $('#js-swiper-progress')
      $progress.remove()
      $progress = $('<div id=\'js-swiper-progress\' class=\'swiper__progress\'></div>')

      $progress.appendTo($active)
      const bar = new ProgressBar.Circle('#js-swiper-progress', {
        strokeWidth: 3,
        easing: 'linear',
        duration: autoplayTime - speed,
        color: '#40b153',
        trailColor: '#fff',
        trailWidth: 2,
        svgStyle: null,
      })
      bar.animate(1.0)

      /**
       * Prevent slide from another swiper
       */
      if (clicked) {
        clicked = false
        return
      }

      let clickedIndex = this.realIndex
      if ($swiper && initialized) {
        clickedIndex = clickedIndex % storiesCount// + 1
        clicked = true
        $swiper.slideTo(clickedIndex)
      }
      initialized = true
    }

    function transitionEnd() {
      /**
       * Prevent slide from another swiper
       */
      if (clicked) {
        clicked = false
        return
      }

      let index = this.realIndex
      if ($circlesSwiper) {
        clicked = true
        $circlesSwiper.slideTo(index + storiesCount)
      }
    }
  }


  /**
   * Scroll to top
   */
  var SCROLL_TOP_TRESHOLD = 100
  var $top = $('.js-to-top')
  $top.on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({ scrollTop: '0px' }, 700)
  })

  const scrollFunction = () => {
    const scrolledTop = window.pageYOffset
      || document.body.scrollTop || document.documentElement.scrollTop

    $top.toggleClass('scroll-top--active', scrolledTop > SCROLL_TOP_TRESHOLD)
  }
  window.addEventListener('scroll', scrollFunction)

  /**
   * Hide menu on scrolldown, show on scrollup
   */
  var lastScrollTop
  $(window).on('scroll', scrollDown).trigger('scroll')

  function scrollDown() {
    const scrolledTop = $(window).scrollTop()
    const $header = $('.js-header')

    $header.toggleClass('header--smaller', scrolledTop > 50)

    lastScrollTop = scrolledTop
  }


  /**
   * Load remote images on localhost
   * @type {boolean}
   */
  var localhost = location.host.indexOf('localhost') > -1
  if (localhost) {
    $('[src^="http://localhost/leaf"]').each(function () {
      var $el = $(this)
      $el.attr('src', $el.attr('src').replace(/\/localhost\/leaf/g, '\/leaf.sk'))
    })
    return

    $('[src^="http://localhost/leaf"]').each(function () {
      var $el = $(this)
      $el.attr('src', $el.attr('src').replace(/\/localhost\/leaf/g, '\/leaf.sk'))
    })

    $('a[href^="/"]:not([href^="//"])').each(function (ev) {
      var $el = $(this)
      $el.attr('href', '/leaf' + $el.attr('href'))
    })

    $('a[href^="http://leaf"]').each(function (ev) {
      var $el = $(this)
      $el.attr('href', $el.attr('href').replace(/http:\/\/leaf.sk/g, '\/leaf'))
    })

    $('[style*="background-image"]').each(function (ev) {
      var $el = $(this)
      $el.attr('style', $el.attr('style').replace(/http:\/\/localhost\/leaf/g, 'http:\\/\\/leaf.sk'))
    })
  }
})

