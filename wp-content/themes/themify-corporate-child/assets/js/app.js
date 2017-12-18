import Swiper from 'swiper'
import SlideMenu from './components/SlideMenu'

window.$ = jQuery

$(document).ready(() => {

  SlideMenu.init()

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
  const $newsletterInput = $('.footer #es_txt_email_pg')
  if ($newsletterInput.length > 0) {
    $('#es_txt_email_pg').attr('placeholder', 'email@email.com')
    $('.footer .es_shortcode_form').on('submit', function (e) {
      e.preventDefault()
      return false
    })
  }


  /**
   * Swiper news
   */
  const $newsSwiper = $('.js-swiper-news')
  if ($newsSwiper.length > 0) {
    const defaultNewsOptions = {
      slidesPerView: 2,
      loop: true,
    }

    const $swiper = new Swiper($newsSwiper, defaultNewsOptions)
  }


  /**
   * Swiper stories
   */
  const $storiesCirclesSwiper = $('.js-swiper-stories-circles')
  const $storiesSwiper = $('.js-swiper-stories')
  const storiesCount = $storiesSwiper.find('.swiper-slide:not(.swiper-slide-duplicate)').length
  if ($storiesSwiper.length > 0) {
    const defaultCirclesOptions = {
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      loopedSlides: 50,
      loopAdditionalSlides: 50,
      slideToClickedSlide: true,
      on: {
        slideChangeTransitionEnd: transitionEndCircles,
      },
    }

    const defaultOptions = {
      slidesPerView: 1,
      loop: true,
      loopedSlides: 50,
      loopAdditionalSlides: 50,
      navigation: {
        nextEl: '.js-swiper-stories-next',
        prevEl: '.js-swiper-stories-prev',
      },
      pagination: {
        el: '.js-swiper-stories-pagination',
        type: 'bullets',
      },
      on: {
        slideChangeTransitionEnd: transitionEnd,
      },
    }

    const $swiper = new Swiper($storiesSwiper, defaultOptions)
    const $circlesSwiper = new Swiper($storiesCirclesSwiper, defaultCirclesOptions)

    let clicked = false

    function transitionEndCircles() {
      if (clicked) {
        clicked = false
        return
      }

      let clickedIndex = this.clickedIndex
      if ($swiper && typeof clickedIndex !== 'undefined') {
        clickedIndex = clickedIndex % storiesCount// + 1
        clicked = true
        $swiper.slideTo(clickedIndex)
      }
    }

    function transitionEnd() {
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
    const $header = $('.js-header-fixed')

    const hideMenu = scrolledTop > lastScrollTop && scrolledTop > 30
    $header.toggleClass('header--scrolling', hideMenu)
    $header.toggleClass('header--moved', scrolledTop > 30)

    lastScrollTop = scrolledTop
  }


  /**
   * Load remote images on localhost
   * @type {boolean}
   */
  var localhost = location.host.indexOf('localhost') > -1
  console.log('local', localhost)
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

