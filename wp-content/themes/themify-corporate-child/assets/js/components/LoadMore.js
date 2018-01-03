const LoadMore = {
  init() {
    /**
     * Ajax load more
     */
    $('[data-action]').on('click', function (e) {
      e.preventDefault()
      var $el = $(this)
      var data = $el.data()

      var wp = {
        'action': data.action,
        'data': data,
      }

      $.get(ajax_object.ajax_url, wp, function (response) {
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