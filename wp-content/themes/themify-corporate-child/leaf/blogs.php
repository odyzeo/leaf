<?php

add_action( 'wp_ajax_ajax_posts', 'ajax_posts' );
add_action( 'wp_ajax_nopriv_ajax_posts', 'ajax_posts' );

function ajax_posts() {
    $data     = $_REQUEST['data'];
    $page     = $data['page'];
    $category = $data['category'];
    $offset   = $data['offset'];
    $args     = array(
        'posts_per_page' => $data['posts'],
        'post_type'      => $data['type'],
        'paged'          => $page,
    );

    if ( isset( $category ) ) {
        $args['category__in'] = explode( ',', $category );
    }

    // To show on HP 10 posts but load more $args['posts_per_page']
//    if ( isset( $offset ) && $offset === '1' ) {
//        $offset         = ( ( $page - 2 ) * ( $data['posts'] + 1 ) ) + 10;
//        $args['offset'] = $offset;
//    }

    $wp_query = new WP_Query( $args );
    $posts    = get_leaf_posts( $wp_query );

    $response = array(
        'data' => $posts,
        'page' => ( $wp_query->max_num_pages > $page ) ? ++ $page : - 1
    );
    die( json_encode( $response ) );
}

function get_leaf_posts( $wp_query, $initial = false ) {
    $result = "";

    $i = 0;
    if ( $wp_query->have_posts() ) {
        while ( $wp_query->have_posts() ) {
            $i ++;
            $wp_query->the_post();

            $title       = get_the_title();
            $url         = get_the_permalink();
            $datetime    = get_the_date( 'c' );
            $date        = get_the_date( 'd M Y' );
            $content     = get_the_excerpt();
            $image       = get_the_post_thumbnail_url();
            $poppy_index = ( ( $i - 1 ) % 6 ) + 1;
            $category    = get_leaf_post_primary_category();
            $category    = ( ! empty( $category ) ) ? $category->name : "";

            $poppy = "
				<div class='poppy poppy--$poppy_index card__poppy'></div>
			";

            if ( ! has_post_thumbnail() ) {
                $image = get_stylesheet_directory_uri() . "/assets/images/img-blog-default.png";
            }

            if ( $initial ) {
                $initial = false; // First will be true so .card-vertical

                $result .= "
					<div class='flex-1'>
						<a href='$url'  class='card-vertical'>
							<div class='card-vertical__left'>
								<div class='card__image-wrapper'>
									<img src='$image' alt='$title' class='card__image'>
								</div>
							</div>
							<div class='card-vertical__right'>
								<div class='card card--border'>
									<div class='card__image-wrapper'>
										<img src='$image' alt='$title' class='card__image'>
									</div>
									<div class='card__inner'>
										<div class='card__title'>$title</div>
										<div class='card__perex'>$content</div>
										<div class='card__meta'>
											<time datetime='$datetime' itemprop='datePublished'>
												$date
											</time>
											&nbsp;|&nbsp;$category
										</div>	
										$poppy
									</div>
								</div>
							</div>
						</a>
					</div>
				";
            } else {
                $result .= "
					<div class='flex-1-3'>
						<a href='$url' class='card card--border'>
							<div>
								<div class='card__image-wrapper'>
									<img src='$image' alt='$title' class='card__image'>
								</div>
							</div>
							<div class='card__inner'>
								<div class='card__title'>$title</div>
								<div class='card__perex'>$content</div>
								<div class='card__meta'>
									<time datetime='$datetime' itemprop='datePublished'>
										$date
									</time>
									&nbsp;|&nbsp;$category
								</div>	
								$poppy
							</div>
						</a>
					</div>
				";
            }
        }
    }

    return $result;
}

add_shortcode( 'blogs', 'add_blogs_shortcode' );

function add_blogs_shortcode( $atts ) {
    $args = shortcode_atts( array(
        'category' => '1', // Blog
        'count'    => '9',
        'layout'   => '', // 'grid' - First blog will be not 100%
    ), $atts );

    $cat          = $args['category'];
    $category__in = explode( ',', $cat );

    $post_type      = 'post';
    $posts_per_page = (int) $args['count'];
    $initial        = $args['layout'] === '';

    $result = '';
    $args   = array(
        'posts_per_page' => $posts_per_page, // 10, // To show on Blog page 10 and load more $posts_per_page = 9
        'post_type'      => $post_type,
        'category__in'   => $category__in,
    );

    $wp_query = new WP_Query( $args );
    $posts    = get_leaf_posts( $wp_query, $initial );

    $result .= "
		<div class='cards cards--listing'>
			<div id='posts'  class='flex flex--grid-mini'>
				$posts
			</div> 
	";

    if ( $wp_query->max_num_pages > 1 ) {
        $more   = "Zobraziť viac";
        $result .= "
			<div class='cards__more'>
                <a href='#'
                   id='load-more-events'
                   class='btn btn--blank load-more__btn'
                   data-type='post'
                   data-page='2'
                   data-offset='1'
                   data-posts='$posts_per_page'
                   data-target='#posts'
                   data-action='ajax_posts'
                   data-category='$cat'
                >
                    $more
                </a>
			</div>
	    ";
    }

    $result .= "
		</div>
	";

    wp_reset_query();

    return $result;
}
