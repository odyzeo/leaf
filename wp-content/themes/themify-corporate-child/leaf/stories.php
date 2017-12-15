<?php

define( 'LEAF_POST_TYPE_STORY', ' story' );

$cpt = array(
	'plural'   => __( 'Stories', 'themify-story-posts' ),
	'singular' => __( 'Story', 'themify-story-posts' ),
);

register_post_type( LEAF_POST_TYPE_STORY, array(
	'labels'          => array(
		'name'          => $cpt['plural'],
		'singular_name' => $cpt['singular']
	),
	'supports'        => isset( $cpt['supports'] ) ? $cpt['supports'] : array(
		'title',
		'editor',
		'thumbnail',
		'custom-fields',
		'excerpt',
		'author'
	),
	'hierarchical'    => false,
	'has_archive'     => true,
	'public'          => true,
	'rewrite'         => array( 'slug' => 'pribehy' ),
	'query_var'       => true,
	'can_export'      => true,
	'capability_type' => 'post',
	'menu_icon'       => 'dashicons-story',
) );

register_taxonomy( 'story-category', array( LEAF_POST_TYPE_STORY ), array(
	'labels'            => array(
		'name'          => sprintf( __( '%s Categories', 'themify-story-posts' ), $cpt['singular'] ),
		'singular_name' => sprintf( __( '%s Category', 'themify-story-posts' ), $cpt['singular'] )
	),
	'public'            => true,
	'show_in_nav_menus' => true,
	'show_ui'           => true,
	'show_tagcloud'     => true,
	'hierarchical'      => true,
	'rewrite'           => true,
	'query_var'         => true
) );

add_shortcode( 'stories', 'add_story_shortcode' );

function add_story_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'foo' => 'no foo',
		'baz' => 'default baz',
	), $atts );

	$post_type      = LEAF_POST_TYPE_STORY;
	$posts_per_page = 1000;

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
	);

	$wp_query = new WP_Query( $args );


	$swiperCircles = "
		<div class='swiper-container swiper-container--circles js-swiper-stories-circles'>
            <div class='swiper-wrapper'>
	";

	$result .= "
		<div class='container'>
			<div class='swiper-container swiper-container--stories js-swiper-stories'>
	            <div class='swiper-wrapper'>
	";

	if ( $wp_query->have_posts() ) {
		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();
			$story_id = $wp_query->post->ID;

			$title   = get_the_title();
			$image   = get_post_meta( $story_id, 'post_image', true );
			$content = get_the_excerpt();
			$url     = get_the_permalink();
			$more    = __( 'Read more', 'leaf' );

			$swiperCircles .= "
                <div class='swiper-slide'>
                	<div class='img-circle'>
                		<div class='img-circle__overlay'></div>
                		<img src='$image' alt='' class='img-circle__image'>
					</div>
                </div>
			";

			$result .= "
                <div class='swiper-slide'>
                	<div class='hcard'>
                		<div class='hcard__head'>
                			<div class='hcard__image-wrapper'>
                				<img src='$image' alt='$title' class='hcard__image'>
							</div>
						</div>
                		<div class='hcard__body'>
                			<div class='hcard__inner'>
                				<div class='hcard__title'>$title</div>
                				<div class='hcard__content'>$content</div>
                				<a href='$url' class='hcard__link'>$more</a>
							</div>
						</div>
					</div>
                </div>
			";
		}
	}

	$swiperCircles .= "
            </div>
        </div>
	";

	$result .= "
	            </div>
	
	            <div class='swiper-button-prev js-swiper-stories-prev'>
	                <span class='icon-prev'></span>
	            </div>
	            <div class='swiper-button-next js-swiper-stories-next'>
	                <span class='icon-next'></span>
	            </div>
	
	            <div class='swiper-pagination js-swiper-stories-pagination'></div>
	        </div>
        </div>
	";

	$result = "$swiperCircles $result";

	wp_reset_query();

	return $result;
}