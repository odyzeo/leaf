<?php

define( 'LEAF_POST_TYPE_BANNER', ' banner' );

add_shortcode( 'latest-blogs', 'add_latest_blogs_shortcode' );

function add_latest_blogs_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'category' => '1', // Blog
		'count'    => '3',
		'display'  => 'inline',
		'post'     => '',
	), $atts );

	$post__not_in = explode( ',', $args['post'] );
	$category__in = explode( ',', $args['category'] );

	$post_type      = 'post';
	$posts_per_page = (int) $args['count'];

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
		'category__in'   => $category__in,
		'post__not_in'   => $post__not_in
	);

	$wp_query = new WP_Query( $args );

	$result .= "
		<div class='flex flex--grid'>
	";
	if ( $wp_query->have_posts() ) {
		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();

			$title    = get_the_title();
			$url      = get_the_permalink();
			$datetime = get_the_date( 'c' );
			$date     = get_the_date( 'd M Y' );
			$content  = get_the_excerpt();

			$result .= "
				<div class='flex-1-3'>
					<a href='$url' class='card'>
						<div class='card__title'>$title</div>
						<div class='card__perex'>$content</div>
						<div class='card__meta'>
							<time datetime='$datetime' itemprop='datePublished'>
								$date
							</time>
						</div>
					</a>
				</div>
			";
		}
	}

	$result .= "
		</div> 
	";

	wp_reset_query();

	return $result;
}