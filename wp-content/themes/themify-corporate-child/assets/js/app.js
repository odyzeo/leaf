import Swiper from 'swiper'

window.$ = jQuery

$(document).ready(() => {

  /**
   * Mobile menu
   */
  $('.js-menu-mobile-toggle').on('click', function (e) {
    e.preventDefault()

    var $el = $(this)
    $el.toggleClass('is-active')
    $('.js-header-fixed').toggleClass('header--opened')
    isMobileMenuOpen = !isMobileMenuOpen

    $('.js-menu-mobile').finish()
    $('.js-menu-mobile').slideToggle(300)
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
   * Swiper gallery
   */
  const $galleries = $('.gallery')
  $galleries.each(function () {
    const $swiperElement = $(this).addClass('swiper__container').addClass('swiper__container--gallery')
    const $swiperContainer = $('<div class="swiper-wrapper">')
    const $swiperSlides = $swiperElement.find('.gallery-item').addClass('swiper-slide')
    $swiperContainer.append($swiperSlides)
    $swiperElement.append($swiperContainer)

    $(this).find('a').each(function () {
      const $link = $(this)
      const $img = $link.find('img').attr('src')
      $link.css('background-image', `url(${$img})`)
    })

    const $more = $('<div class="gallery-more">Celá galéria</div>')
    $swiperContainer.append($more)


    const $swiperHelp = $(`
            <div class="swiper__help">
                scroll <span class="icon-new-window"></span>
            </div>
    `)
    $swiperElement.append($swiperHelp)

    const defaultOptions = {
      slidesPerView: 'auto',
    }

    if ($(window).width() <= 768) {
      const $swiper = new Swiper($swiperElement, defaultOptions)
    }

    // For custom gallery
    // const ligthboxOptions = {}
    // const lightbox = $swiperElement.find('a').simpleLightbox(ligthboxOptions)
  })


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

