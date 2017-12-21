<?php

define( 'LEAF_POST_TYPE_LATEST_NEWS', ' latest-news' );
define( 'LEAF_TAXONOMY_LATEST_NEWS_TAG', 'latest-news-tags' );

$cpt = array(
	'plural'   => __( 'Latest news', 'leaf' ),
	'singular' => __( 'Latest news', 'leaf' ),
);

register_post_type( LEAF_POST_TYPE_LATEST_NEWS, array(
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
	'rewrite'         => array( 'slug' => 'latest-news' ),
	'query_var'       => true,
	'can_export'      => true,
	'capability_type' => 'post',
	'menu_icon'       => 'dashicons-book-alt',
) );

$labels = array(
	'name'          => __( 'Latest news tag', 'leaf' ),
	'singular_name' => __( 'Latest news tag', 'leaf' ),
);

register_taxonomy( 'xxx',
	array( LEAF_POST_TYPE_LATEST_NEWS ),
	array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_admin_column' => true,
		'query_var'         => true,
		'public'            => true,
		'show_in_nav_menus' => true,
		'show_ui'           => true,
		'show_tagcloud'     => true,
		'rewrite'           => true,
	)
);

add_shortcode( 'latest-news', 'add_latest_news_shortcode' );

function add_latest_news_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'category' => '',
	), $atts );

	$post_type      = LEAF_POST_TYPE_LATEST_NEWS;
	$posts_per_page = 1000;

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
		'meta_query'     => array(
			'relation'       => 'OR',
			'date_clause'    => array(
				'key'     => 'publish_to',
				'value'   => date( 'Y-m-d' ),
				'compare' => '>=',
				'type'    => 'DATE'
			),
			'publish_clause' => array(
				'key'   => 'publish_to',
				'value' => false,
				'type'  => 'BOOLEAN',
			),
		),
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

			$title = get_the_title();
			$image = get_the_post_thumbnail_url();
			$url   = get_field( "link", $news_id );
			$blank = get_field( "blank", $news_id );
			$date = get_field( "publish_to", $news_id );

			$target = ( $blank === '1' ) ? "target='_blank'" : "";

			$result .= "
                <a href='$url' $target class='swiper-slide'>
                	<div class='news' style='background-image: url($image);'></div>
                </a>
			";
		}
	}

	$result .= "
            </div>
	
            <div class='swiper-button-prev js-swiper-news-prev'>
            	<div class='arrow'>
                	<span class='icon-prev'></span>
				</div>
            </div>
            <div class='swiper-button-next js-swiper-news-next'>
                <div class='arrow'>
                	<span class='icon-next'></span>
				</div>
            </div>

            <div class='swiper-pagination js-swiper-news-pagination'></div>
        </div>
	";

	wp_reset_query();

	return $result;
}