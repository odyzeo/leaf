<?php do_action( 'themify_news_single_before_loop' ); ?>

<div class="themify-news-single">

	<?php while( $query->have_posts() ) : $query->the_post(); ?>

	<div class="featured-area">

	<?php if ( $post_meta == 'yes' ) : ?>

		<?php do_action( 'themify_news_post_before_image' ); ?>

		<?php
		if( has_post_thumbnail() && $post_image = themify_do_img( wp_get_attachment_url( get_post_thumbnail_id() ), $image_w, $image_h ) ) : ?>

			<figure class="post-image">
				<img src="<?php echo $post_image['url'] ?>" width="<?php echo $post_image['width'] ?>" height="<?php echo $post_image['height'] ?>" alt="" />
			</figure>

		<?php endif; // video else image ?>

		<?php do_action( 'themify_news_post_after_image' ); ?>

	<?php endif; // hide image ?>

	</div>

	<?php include $this->locate_template( 'news' ); ?>

	<?php include $this->locate_template( 'post-nav' ); ?>

	<?php endwhile; wp_reset_postdata(); ?>

</div><!-- .themify-news-single -->

<?php do_action( 'themify_news_single_after_loop' ); ?>