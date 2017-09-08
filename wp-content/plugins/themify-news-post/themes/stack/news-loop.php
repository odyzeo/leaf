<?php do_action( 'themify_news_posts_before_loop' ); ?>

<div class="themify-news-posts">

	<?php
	if ( 'yes' == $filter ) {
			echo $this->get_template( 'filter-news', array(
				'cats' => $category,
				'taxo' => 'news-category'
			) );
		}
	?>

	<div class="loops-wrapper shortcode <?php echo $post_type; ?> <?php echo $layout ?> <?php echo ( $query->post_count > 1 ) ? 'news-multiple clearfix type-multiple' : 'news-single' ?> <?php echo $masonry == 'yes' ? 'masonry-layout' : 'masonry-disabled'; ?>">

		<?php while( $query->have_posts() ) : $query->the_post(); ?>

			<?php include $this->locate_template( 'news' ); ?>

		<?php endwhile; wp_reset_postdata(); ?>

		<?php if( $more_link ) include $this->locate_template( 'more-link' ); ?>

	</div>

</div><!-- .themify-news-posts -->

<?php do_action( 'themify_news_posts_after_loop' ); ?>