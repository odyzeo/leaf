const LoadMore = {
    init() {
    /**
     * Ajax load more
     */
        $('[data-action]').on('click', function (e) {
            e.preventDefault()
            const $el = $(this)
            const data = $el.data()

            const wp = {
                action: data.action,
                data,
            }

            $.get(ajax_object.ajax_url, wp, response => {
                response = $.parseJSON(response)

                if (response.page < 0) {
                    $el.fadeTo(300, 0)
                }

                $(data.target).append(response.data)
                $el.data('page', response.page)
            })
        })
    },
}

export default LoadMore
