<?php themify_post_before(); //hook ?>

<?php
$categories = wp_get_object_terms(get_the_id(), 'news-category');
$class = '';
foreach($categories as $cat){
	$class .= ' cat-'.$cat->term_id;
}
?>
<?php themify_post_before(); // hook ?>
<article id="news-<?php the_id(); ?>" class="<?php echo implode(' ', get_post_class('post clearfix news-post' . $class)); ?>">
	<?php themify_post_start(); // hook ?>

	<a href="<?php echo themify_get_featured_image_link(); ?>" data-post-permalink="yes" style="display: none;"></a>

	<?php if ( is_singular( 'news' ) ) : ?>
		<div class="news-post-wrap">
			<?php if($title == 'yes'): ?>
				<?php themify_post_title(); ?>
			<?php endif; //post title ?>

			<?php if ( $post_date == 'yes' ): ?>
				<time datetime="<?php the_time('o-m-d') ?>" class="post-date entry-date updated">
					<?php echo get_the_date( apply_filters( 'themify_loop_date', '' ) ) ?>
				</time>
			<?php endif; //post date ?>

			<?php if ( $post_meta == 'yes' ): ?>
				<p class="post-meta entry-meta">
					<?php the_terms( get_the_id(), get_post_type() . '-category', '<span class="post-category">', ' <span class="separator">/</span> ', ' </span>' ) ?>
				</p>
			<?php endif; //post meta ?>
		</div>
	<?php endif; // is singular news ?>

	<?php if( $image == 'yes' ) : ?>
    <!-- image -->
  	<?php themify_before_post_image(); // Hook ?>
  
  	<?php
  	if ( themify_get( 'video_url' ) != '' ) : ?>
  
  		<figure class="post-image">
  			<?php
  				global $wp_embed;
  				echo $wp_embed->run_shortcode('[embed]' . themify_get('video_url') . '[/embed]');
  			?>
  		</figure>
  
  	<?php else: ?>
  
  		<?php
  		if ( 'yes' == $use_original_dimensions ) {
  			$image_w = tpp_news_get( 'image_width' );
  			$image_h = tpp_news_get( 'image_height' );
  		}

  		if ( ! wp_script_is( 'themify-backstretch' ) ) {
  			// Enqueue Backstretch
  			wp_enqueue_script( 'themify-backstretch' );
  		}
  		?>
  
  		<?php if( has_post_thumbnail() && $post_image = themify_do_img( wp_get_attachment_url( get_post_thumbnail_id() ), $image_w, $image_h ) ) : ?>
  
  			<figure class="post-image">
  
  				<?php if( $unlink_image == 'no' ) : ?><a href="<?php echo get_permalink(); ?>" class="themify-lightbox"><?php endif; ?>
  				<img src="<?php echo $post_image['url'] ?>" width="<?php echo $post_image['width'] ?>" height="<?php echo $post_image['height'] ?>" alt="" />
  				<?php if( $unlink_image == 'no' ) : ?></a><?php endif; ?>
  
  			</figure>
  
  		<?php endif; // if there's a featured image?>
  
  	<?php endif; // video else image ?>
  
  	<?php themify_after_post_image(); // Hook ?>

	<?php endif //hide image ?>

	<div class="post-content">

		<?php if ( ! is_singular( 'news' ) ) : ?>
			<div class="disp-table">
				<div class="disp-row">
					<div class="disp-cell valignmid">

						<?php if($title == 'yes'): ?>
							<?php themify_before_post_title(); // hook ?>
							<h2 class="post-title entry-title">
								<?php if($unlink_title == 'yes'): ?>
									<?php the_title(); ?>
								<?php else: ?>
									<a href="<?php echo themify_get_featured_image_link(); ?>"><?php the_title(); ?></a>
								<?php endif; //unlink post title ?>
							</h2>
							<?php themify_after_post_title(); // hook ?>
						<?php endif; //post title ?>

						<?php if ( $post_date == 'yes' ): ?>
							<div class="post-date-wrap">
								<?php /*echo get_the_date( apply_filters( 'themify_loop_date', '' ) )*/ ?>
          			<time datetime="<?php the_time('o-m-d') ?>" class="post-date entry-date updated">
          				<span class="day"><?php the_time( 'j' ); ?></span>
          				<span class="month"><?php the_time( 'M' ); ?></span>
          				<span class="year"><?php the_time( 'Y' ); ?></span>
          			</time>
							</div>
						<?php endif; //post date ?>

						<?php if ( $post_meta == 'yes' ): ?>
							<p class="post-meta entry-meta">
								<?php the_terms( get_the_id(), get_post_type() . '-category', '<span class="post-category">', ' <span class="separator">/</span> ', ' </span>' ) ?>
							</p>
						<?php endif; //post meta ?>

		<?php endif; // is singular news ?>

						<div class="entry-content">

							<?php if ( 'excerpt' == $display && ! is_attachment() ) : ?>

								<?php the_excerpt(); ?>

							<?php elseif ( 'none' == $display && ! is_attachment() ) : ?>

							<?php else: ?>

								<?php the_content(themify_check('setting-default_more_text')? themify_get('setting-default_more_text') : __('More &rarr;', 'themify')); ?>

							<?php endif; //display content ?>

						</div><!-- /.entry-content -->

						<?php edit_post_link(__('Edit', 'themify'), '<span class="edit-button">[', ']</span>'); ?>

		<?php if ( ! is_singular( 'news' ) ) : ?>

					</div>
					<!-- /.disp-cell -->
				</div>
				<!-- /.disp-row -->
			</div>
			<!-- /.disp-table -->
		<?php endif; // is singular news ?>

	</div>
	<!-- /.post-content -->

	<?php themify_post_end(); // hook ?>
</article>
<!-- /.post -->

<?php themify_post_after(); //hook ?>
