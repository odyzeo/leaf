<?php

add_shortcode( 'press', 'add_press_shortcode' );

function add_press_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'category' => '12', // Press
		'count'    => '-1',
		'class'    => '',
	), $atts );

	$cat          = $args['category'];
	$category__in = explode( ',', $cat );

	$post_type      = 'post';
	$posts_per_page = (int) $args['count'];
	$class          = $args['class'];

	$result = '';
	$args   = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => $post_type,
		'category__in'   => $category__in,
	);

	$wp_query = new WP_Query( $args );
	$posts    = get_leaf_media( $wp_query );

	$result .= "
		<div class='$class'>
			$posts
		</div>
	";

	wp_reset_query();

	return $result;
}

function get_leaf_media( $wp_query ) {
	$result = "";

	$i = 0;
	if ( $wp_query->have_posts() ) {
		while ( $wp_query->have_posts() ) {
			$i ++;
			$wp_query->the_post();

			$title    = get_the_title();
			$url      = get_the_permalink();
			$datetime = get_the_date( 'c' );
			$date     = get_the_date( 'd M Y' );
			$content  = get_the_excerpt();
			$image    = get_the_post_thumbnail_url();
			$source   = get_field( 'source' );

			if ( ! has_post_thumbnail() ) {
				$image = get_stylesheet_directory_uri() . "/assets/images/img-blog-default.png";
			}

			$result .= "
					<article class='card-horizontal'>
						<a href='$url' class='card-horizontal__link'>
							<div class='card-horizontal__left'>
								<figure class='card-horizontal__figure'>
									<img src='$image' alt='$title' class='card-horizontal__image'>
								</figure>
							</div>
							<div class='card-horizontal__inner'>
								<h2 class='card-horizontal__title'>$title</h2>
								<div class='card-horizontal__perex'>$content</div>
								<footer class='card-horizontal__meta'>
									Zdroj: $source | 
									<time datetime='$datetime' itemprop='datePublished'>
										$date
									</time>
								</footer>	
							</div>
						</a>
					</article>
				";
		}
	}

	return $result;
}