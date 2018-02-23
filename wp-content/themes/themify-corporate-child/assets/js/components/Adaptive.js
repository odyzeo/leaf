import Cookies from 'js-cookie'

const Adaptive = {
    leafUser: false,
    init() {
        this.leafUser = Cookies.get('LeafUser')

        if (this.leafUser === 'true') {
            $('.js-new-user').hide()
            $('.js-returning-user').show()
        }

        Cookies.set('LeafUser', 'true')
    },
}

export default Adaptive
