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

$labels = array(
	'name'                       => __( 'Banner tags', 'leaf' ),
	'singular_name'              => __( 'Banner tag', 'leaf' ),
	'search_items'               => __( 'Search Banner tags', 'leaf' ),
	'popular_items'              => __( 'Popular Banner tags', 'leaf' ),
	'all_items'                  => __( 'All Banner tags', 'leaf' ),
	'parent_item'                => null,
	'parent_item_colon'          => null,
	'edit_item'                  => __( 'Edit Banner tag', 'leaf' ),
	'update_item'                => __( 'Update Banner tag', 'leaf' ),
	'add_new_item'               => __( 'Add New Banner tag', 'leaf' ),
	'new_item_name'              => __( 'New Banner tag Name', 'leaf' ),
	'separate_items_with_commas' => __( 'Separate Banner tags with commas', 'leaf' ),
	'add_or_remove_items'        => __( 'Add or remove Banner tags', 'leaf' ),
	'choose_from_most_used'      => __( 'Choose from the most used Banner tags', 'leaf' ),
	'not_found'                  => __( 'No Banner tags found.', 'leaf' ),
	'menu_name'                  => __( 'Banner tags', 'leaf' ),
);

register_taxonomy( 'banner-tags',
	array( 'banner' ),
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

add_shortcode( 'banners', 'add_banner_shortcode' );

function add_banner_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'tags' => '',
	), $atts );

	$tags = explode( ',', $args['tags'] );

	$post_type      = LEAF_POST_TYPE_BANNER;
	$posts_per_page = 1;

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
		'orderby'        => 'post_date',
		'tax_query'      => array(
			array(
				'taxonomy' => 'banner-tags',
				'field'    => 'slug',
				'terms'    => $tags,
			),
		),
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