import ProgressBar from 'progressbar.js';
import Swiper from 'swiper';

const Swipers = {
    init() {
        this.initNews();
        this.initStories();
    },
    initNews() {
        /**
         * Swiper news
         */
        const $newsSwipers = $('.js-swiper-news');
        if ($newsSwipers.length > 0) {
            $newsSwipers.each(function () {
                const autoplayTime = +$(this).data('autoplay');
                const $newsSwiper = $(this);
                const newsCount = $newsSwiper.find('.swiper-slide').length;
                $newsSwiper.toggleClass('swiper-container--single', newsCount === 1);

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
                };

                if (!Number.isNaN(autoplayTime) && autoplayTime > 0) {
                    defaultNewsOptions.autoplay = {
                        delay: autoplayTime,
                        disableOnInteraction: true,
                    };
                }

                if (newsCount === 1) {
                    defaultNewsOptions.loop = false;
                    defaultNewsOptions.slidesPerView = 1;
                    defaultNewsOptions.centeredSlides = true;
                    defaultNewsOptions.spaceBetween = 0;
                    defaultNewsOptions.navigation = false;
                    defaultNewsOptions.pagination = false;
                }

                const $swiper = new Swiper($newsSwiper, defaultNewsOptions);
            });
        }
    },
    initStories() {
        /**
         * Swiper stories
         */
        const $storiesCirclesSwiper = $('.js-swiper-stories-circles');
        const $storiesCirclesSwiperSlides = $('.js-swiper-stories-circles').find('.swiper-slide');
        const $storiesSwiper = $('.js-swiper-stories');
        const storiesCount = $storiesSwiper.find('.swiper-slide:not(.swiper-slide-duplicate)').length;

        // Scroll to swiper stories when click on
        $storiesCirclesSwiper.find('.swiper-slide').on('click', () => {
            // Smaller header height 70 - desktop, 60 - desktop smaller, mobile should be small
            // - 10 for offset
            const top = $('#swiper-circles').offset().top - Math.min($('.js-header').height(), 60) - 10;
            $('html, body').animate({ scrollTop: `${top}px` }, 300);
        });

        if ($storiesSwiper.length > 0) {
            const defaultCirclesOptions = {
                allowTouchMove: false,
                centeredSlides: true,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.js-swiper-circles-next',
                    prevEl: '.js-swiper-circles-prev',
                },
                on: {
                    slideChangeTransitionEnd: transitionEndCircles,
                },
            };

            const looping = ($storiesCirclesSwiperSlides.length > 10);
            if (looping) {
                defaultCirclesOptions.loop = true;
                defaultCirclesOptions.loopedSlides = 50;
                defaultCirclesOptions.loopAdditionalSlides = 50;
            }

            const speed = 300;
            const autoplayTime = 15000;
            const defaultOptions = {
                slidesPerView: 1,
                speed,
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
            };

            let initialized = false;
            let clicked = false;

            const $swiper = new Swiper($storiesSwiper, defaultOptions);
            const $circlesSwiper = new Swiper($storiesCirclesSwiper, defaultCirclesOptions);

            // if (!looping) {
            //   console.log('bind')
            //   $storiesCirclesSwiper.find('.js-swiper-circles-next').on('click', function (e) {
            //     e.preventDefault()
            //     e.stopPropagation()
            //     if ($(this).hasClass('swiper-button-disabled')) {
            //
            //       console.log('next', $(this).hasClass('swiper-button-disabled'), $(this))
            //       $circlesSwiper.slideTo(0)
            //     }
            //   })
            //   $storiesCirclesSwiper.on('click', '.js-swiper-circles-prev.swiper-button-disabled', function () {
            //     console.log('prev')
            //     $circlesSwiper.slideTo($storiesCirclesSwiperSlides.length - 1)
            //   })
            // }

            function transitionEndCircles() {
                /**
                 * Progress bar
                 */
                const $active = $('.js-swiper-stories-circles .swiper-slide-active .js-swiper-timer');
                let $progress = $('#js-swiper-progress');
                $progress.remove();
                $progress = $('<div id=\'js-swiper-progress\' class=\'swiper__progress\'></div>');

                $progress.appendTo($active);
                const bar = new ProgressBar.Circle('#js-swiper-progress', {
                    strokeWidth: 3,
                    easing: 'linear',
                    duration: autoplayTime - speed,
                    color: '#40b153',
                    trailColor: '#fff',
                    trailWidth: 2,
                    svgStyle: null,
                });
                bar.animate(1.0);

                /**
                 * Prevent slide from another swiper
                 */
                if (clicked) {
                    clicked = false;
                    return;
                }

                let clickedIndex = this.realIndex;
                if ($swiper && initialized) {
                    clickedIndex %= storiesCount;// + 1
                    clicked = true;
                    $swiper.slideTo(clickedIndex);
                }
                initialized = true;
            }

            function transitionEnd() {
                /**
                 * Prevent slide from another swiper
                 */
                if (clicked) {
                    clicked = false;
                    return;
                }

                const index = this.realIndex;
                if ($circlesSwiper) {
                    clicked = true;
                    const to = looping ? index + storiesCount : index;
                    $circlesSwiper.slideTo(to);
                }
            }
        }
    },
};

export default Swipers;
