import Adaptive from './components/Adaptive'
import LoadMore from './components/LoadMore'
import SlideMenu from './components/SlideMenu'
import YouTube from './components/YouTube'
import Swipers from './components/Swipers'
import 'lity'

import Vue from 'vue'
import './filters'
import Ped from './components/Ped'

window.$ = jQuery

if ($('#ped').length > 0) {
    new Vue({
        components: {
            Ped,
        },
        el: '#ped',
    })
}

$(document).ready(() => {
    Adaptive.init()
    SlideMenu.init()
    YouTube.init()
    Swipers.init()
    LoadMore.init()

    /**
     * Mobile menu
     */
    $('.menu-mobile .menu-item-has-children > a').on('click', function (e) {
        e.preventDefault()

        const $el = $(this)
        const $submenu = $el.next('.sub-menu')

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
        $newsletterForm.on('submit', e => {
            e.preventDefault()
            return false
        })
    }


    /**
     * Scroll to top
     */
    const SCROLL_TOP_TRESHOLD = 100
    const $top = $('.js-to-top')
    $top.on('click', e => {
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
    let lastScrollTop
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
    const localhost = location.host.indexOf('localhost') > -1
    if (localhost) {
        return
        $('[src^="http://localhost/leaf"]').each(function () {
            const $el = $(this)
            $el.attr('src', $el.attr('src').replace(/\/localhost\/leaf/g, '\/leaf.sk'))
        })

        $('[src^="http://localhost/leaf"]').each(function () {
            const $el = $(this)
            $el.attr('src', $el.attr('src').replace(/\/localhost\/leaf/g, '\/leaf.sk'))
        })

        $('a[href^="/"]:not([href^="//"])').each(function (ev) {
            const $el = $(this)
            $el.attr('href', `/leaf${$el.attr('href')}`)
        })

        $('a[href^="http://leaf"]').each(function (ev) {
            const $el = $(this)
            $el.attr('href', $el.attr('href').replace(/http:\/\/leaf.sk/g, '\/leaf'))
        })

        $('[style*="background-image"]').each(function (ev) {
            const $el = $(this)
            $el.attr('style', $el.attr('style').replace(/http:\/\/localhost\/leaf/g, 'http:\\/\\/leaf.sk'))
        })
    }
})

