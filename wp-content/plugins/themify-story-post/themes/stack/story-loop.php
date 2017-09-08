<?php do_action( 'themify_story_posts_before_loop' ); ?>

<div class="themify-story-posts">

	<?php
	if ( 'yes' == $filter ) {
			echo $this->get_template( 'filter-story', array(
				'cats' => $category,
				'taxo' => 'story-category'
			) );
		}
	?>

	<div class="loops-wrapper shortcode <?php echo $post_type; ?> <?php echo $layout ?> <?php echo ( $query->post_count > 1 ) ? 'story-multiple clearfix type-multiple' : 'story-single' ?> <?php echo $masonry == 'yes' ? 'masonry-layout' : 'masonry-disabled'; ?>">

		<?php while( $query->have_posts() ) : $query->the_post(); ?>

			<?php include $this->locate_template( 'story' ); ?>

		<?php endwhile; wp_reset_postdata(); ?>

		<?php if( $more_link ) include $this->locate_template( 'more-link' ); ?>

	</div>

</div><!-- .themify-story-posts -->

<?php do_action( 'themify_story_posts_after_loop' ); ?>