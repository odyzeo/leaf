<?php

define( 'LEAF_POST_TYPE_NEWS', ' news' );

add_shortcode( 'news', 'add_news_shortcode' );

function add_news_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'foo' => 'no foo',
		'baz' => 'default baz',
	), $atts );

	$post_type      = LEAF_POST_TYPE_NEWS;
	$posts_per_page = 1000;

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
	);

	$wp_query = new WP_Query( $args );


	$result .= "
		<div class='swiper-container swiper-container--news js-swiper-news'>
            <div class='swiper-wrapper'>
	";

	if ( $wp_query->have_posts() ) {
		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();
			$news_id = $wp_query->post->ID;

			$title   = get_the_title();
			$content = get_the_excerpt();
			$url     = get_field( "link", $news_id );

			// TODO REFACTOR TO NEW POST TYPE
			if ( wp_is_mobile() ) {
				$post_image_srcset_array_sizes = array(
					'news_posts_640',
					'news_posts_800',
					'news_posts_1200'
					/*,'news_posts_1600','news_posts_2000','news_posts_2560'*/
				);
			} else {
				$post_image_srcset_array_sizes = array(
					'news_posts_640',
					'news_posts_800',
					'news_posts_1200',
					'news_posts_1600',
					'news_posts_2000',
					'news_posts_2560'
				);
			}

			$image = "";
			$backgroundimage = get_field( "obrazok", $news_id );
			if ( $backgroundimage ) {
				$post_image_src          = wp_get_attachment_image_src( $backgroundimage['id'], 'news_posts_640' );
				$post_image_srcset       = wp_get_attachment_image_srcset( $backgroundimage['id'], 'news_posts_480'/*'news_posts_2560'/*,'news_posts_2000','news_posts_1600','news_posts_1200','news_posts_800','news_posts_640','news_posts_480')*/ );
				$post_image_srcset_array = array();
				foreach ( $post_image_srcset_array_sizes as $pom_image_size ) {
					$post_image_srcset_image = wp_get_attachment_image_src( $backgroundimage['id'], $pom_image_size );
					if ( ! isset( $post_image_srcset_array[ $post_image_srcset_image[0] ] ) ) {
						$post_image_srcset_array[ $post_image_srcset_image[0] ] = $post_image_srcset_image[1];
					}
				}
				foreach ( $post_image_srcset_array as $pomkey => $pomvalue ) {
					$post_image_srcset .= ( $post_image_srcset == '' ? '' : ', ' ) . $pomkey . ' ' . $pomvalue . 'w';
				}
				$image .= '<img class="news__image" src="' . $post_image_src[0] . '" srcset="' . $post_image_srcset . '">';
			}

			$result .= "
                <a href='$url' class='swiper-slide'>
                	<div class='news'>
                		$image
                		$title
					</div>
                </a>
			";
		}
	}

	$result .= "
            </div>

            <div class='swiper-pagination js-swiper-news-pagination'></div>
        </div>
	";

	wp_reset_query();

	return $result;
}