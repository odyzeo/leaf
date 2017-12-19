<?php

define( 'LEAF_POST_TYPE_BANNER', ' banner' );

$cpt = array(
	'plural'   => __( 'Banners', 'leaf' ),
	'singular' => __( 'Banner', 'leaf' ),
);

register_post_type( LEAF_POST_TYPE_BANNER, array(
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
	'query_var'       => true,
	'can_export'      => true,
	'capability_type' => 'post',
	'menu_icon'       => 'dashicons-format-image',
) );

add_shortcode( 'banners', 'add_banner_shortcode' );

function add_banner_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'foo' => 'no foo',
		'baz' => 'default baz',
	), $atts );

	$post_type      = LEAF_POST_TYPE_BANNER;
	$posts_per_page = 1;

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
		'orderby'        => 'post_date'
	);

	$wp_query = new WP_Query( $args );

	if ( $wp_query->have_posts() ) {
		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();

			$title   = get_the_title();
			$image   = get_the_post_thumbnail_url();
			$content = apply_filters( 'the_content', get_the_content() );

			$result = "
				<div class='banner' style='background-image: url($image);'>
					<div class='banner__overlay'></div>
					<div class='container'>
						<div class='banner__container'>
							<div class='banner__title'>$title</div>
							<div class='banner__content'>$content</div>
						</div>
					</div>
				</div>
			";
		}
	}

	wp_reset_query();

	return $result;
}