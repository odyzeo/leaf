const YouTube = {
  init: function init() {
    const $yt = $('[data-youtube]')

    if ($yt.length === 0) return

    const tag = document.createElement('script')

    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    function onYouTubeIframeAPIReady() {
      $yt.each(function () {
        const $el = $(this)
        const videoId = $el.data('youtube')

        new YT.Player(`youtube-${videoId}`, {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            controls: 0, // Show pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            fs: 0, // Hide the full screen button
            cc_load_policy: 0, // Hide closed captions
            iv_load_policy: 3, // Hide the Video Annotations
            autohide: 0 // Hide video controls when playing
          },
        })
      })
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  },
}

export default YouTube