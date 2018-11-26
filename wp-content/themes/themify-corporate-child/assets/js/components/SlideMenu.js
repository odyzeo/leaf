function each(collection, callback) {
    // eslint-disable-next-line
  for (var i = 0; i < collection.length; i++) {
        const item = collection[i]
        callback(item)
    }
}

const SlideMenu = {
    type: 'slide-left',
    wrapperId: '.js-slide-menu__wrapper',
    maskId: '.js-slide-menu__mask',
    menuOpenerClass: '.js-slide-menu',

    wrapper: null,
    menu: null,

    init: function init() {
        this.body = document.body
        this.wrapper = document.querySelector(this.wrapperId)
        this.mask = document.querySelector(this.maskId)
        this.menu = document.querySelector(`.slide-menu--${this.type}`)
        this.menuOpeners = document.querySelectorAll(this.menuOpenerClass)

        if (!this.mask) {
            console.error('Missing mask element for SlideMenu, maybe need to add HTML.')
            return
        }

        this.initEvents()

        $('.js-mobile-submenu-toggle').on('click', function () {
            const $el = $(this)

            $el.parents('.menu-mobile__item').toggleClass('menu-mobile__item--open')
            $el.find('.icon-reveal-more').toggleClass('icon-reveal-more--active')
            $el.next('.js-mobile-submenu').slideToggle()
        })
    },

    initEvents: function initEvents() {
        const _this = this

        // Event for clicks on the open buttons.
        each(this.menuOpeners, item => {
            item.addEventListener('click', e => {
                e.preventDefault()
                _this.open()
            })
        })

        // Event for clicks on the mask.
        this.mask.addEventListener('click', e => {
            e.preventDefault()
            _this.close()
        })
    },

    open: function open() {
        this.body.classList.add('has-active-slide-menu')
        this.wrapper.classList.add(`has-${this.type}`)
        this.menu.classList.add('is-active')
        this.mask.classList.add('is-active')
        each(this.menuOpeners, item => {
            item.classList.add('is-active')
        })
        this.disableMenuOpeners()
    },

    close: function close() {
        this.body.classList.remove('has-active-slide-menu')
        this.wrapper.classList.remove(`has-${this.type}`)
        this.menu.classList.remove('is-active')
        this.mask.classList.remove('is-active')
        each(this.menuOpeners, item => {
            item.classList.remove('is-active')
        })
        this.enableMenuOpeners()
    },

    enableMenuOpeners: function enableMenuOpeners() {
        each(this.menuOpeners, item => {
            item.disabled = false
        })
    },

    disableMenuOpeners: function disableMenuOpeners() {
        each(this.menuOpeners, item => {
            item.disabled = true
        })
    },
}

export default SlideMenu
