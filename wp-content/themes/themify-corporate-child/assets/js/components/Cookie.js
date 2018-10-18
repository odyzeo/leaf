const leafCookie = {
    lang: '',
    cookieName: 'Agreement',
    element: document.getElementById('cookie-agreement'),
    elementBtn: document.getElementById('cookie-agreement-btn'),
    storage: window.localStorage,

    init: function init() {
        this.lang = document.documentElement.lang || 'sk'
        this.cookieName = `cookie-agreement-${this.lang}`

        if (this.storage.getItem(this.cookieName) === null) {
            this.showMessage()
        }
    },
    showMessage: function showMessage() {
        const self = this

        console.log('joz')
        this.element.classList.add('cookie-agreement--show')
        this.elementBtn.addEventListener('click', e => {
            e.preventDefault()
            self.agree()
        })
    },
    agree: function agree() {
        this.storage.setItem(this.cookieName, 'checked')
        this.element.classList.remove('cookie-agreement--show')
    },

}

export default leafCookie
