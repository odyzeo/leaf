<?php if(!is_single()) { global $more; $more = 0; } //enable more link ?>
<?php
/** Themify Default Variables
 *  @var object */
global $themify; ?>

<?php themify_post_before(); //hook ?>

<?php
$categories = wp_get_object_terms(get_the_id(), 'portfolio-category');
$class = '';

foreach( $categories as $cat ) {
	if( isset( $cat->term_id ) ) {
		$class .= ' cat-' . $cat->term_id;
	}
}

?>
<?php themify_post_before(); // hook ?>
<article id="portfolio-<?php the_id(); ?>" class="<?php echo implode(' ', get_post_class('post clearfix portfolio-post' . $class)); ?>">
	<?php themify_post_start(); // hook ?>

	<a href="<?php echo themify_get_featured_image_link(); ?>" data-post-permalink="yes" style="display: none;"></a>

	<?php if ( is_singular( 'portfolio' ) ) : ?>
		<div class="portfolio-post-wrap">
			<?php if($themify->hide_title != 'yes'): ?>
				<?php themify_post_title(); ?>
			<?php endif; //post title ?>

			<?php if ( $themify->hide_date != 'yes' ): ?>
				<time datetime="<?php the_time('o-m-d') ?>" class="post-date entry-date updated">
					<?php echo get_the_date( apply_filters( 'themify_loop_date', '' ) ) ?>
				</time>
			<?php endif; //post date ?>

			<?php if ( $themify->hide_meta != 'yes' ): ?>
				<p class="post-meta entry-meta">
					<?php the_terms( get_the_id(), get_post_type() . '-category', '<span class="post-category">', ' <span class="separator">/</span> ', ' </span>' ) ?>
				</p>
			<?php endif; //post meta ?>
		</div>
	<?php endif; // is singular portfolio ?>

	<?php if( $themify->hide_image != 'yes' ) : ?>

		<?php get_template_part( 'includes/post-media', get_post_type() ); ?>

	<?php endif //hide image ?>

	<div class="post-content">

		<?php if ( ! is_singular( 'portfolio' ) ) : ?>
			<div class="disp-table">
				<div class="disp-row">
					<div class="disp-cell valignmid">

						<?php if($themify->hide_title != 'yes'): ?>
							<?php themify_before_post_title(); // hook ?>
							<h2 class="post-title entry-title">
								<?php if($themify->unlink_title == 'yes'): ?>
									<?php the_title(); ?>
								<?php else: ?>
									<a href="<?php echo themify_get_featured_image_link(); ?>"><?php the_title(); ?></a>
								<?php endif; //unlink post title ?>
							</h2>
							<?php themify_after_post_title(); // hook ?>
						<?php endif; //post title ?>

						<?php if ( $themify->hide_date != 'yes' ): ?>
							<div class="post-date-wrap">
								<?php echo get_the_date( apply_filters( 'themify_loop_date', '' ) ) ?>
							</div>
						<?php endif; //post date ?>

						<?php if ( $themify->hide_meta != 'yes' ): ?>
							<p class="post-meta entry-meta">
								<?php the_terms( get_the_id(), get_post_type() . '-category', '<span class="post-category">', ' <span class="separator">/</span> ', ' </span>' ) ?>
							</p>
						<?php endif; //post meta ?>

		<?php endif; // is singular portfolio ?>

						<div class="entry-content">

							<?php if ( 'excerpt' == $themify->display_content && ! is_attachment() ) : ?>

								<?php the_excerpt(); ?>

							<?php elseif ( 'none' == $themify->display_content && ! is_attachment() ) : ?>

							<?php else: ?>

								<?php the_content(themify_check('setting-default_more_text')? themify_get('setting-default_more_text') : __('More &rarr;', 'themify')); ?>

							<?php endif; //display content ?>

						</div><!-- /.entry-content -->

						<?php edit_post_link(__('Edit', 'themify'), '<span class="edit-button">[', ']</span>'); ?>

		<?php if ( ! is_singular( 'portfolio' ) ) : ?>

					</div>
					<!-- /.disp-cell -->
				</div>
				<!-- /.disp-row -->
			</div>
			<!-- /.disp-table -->
		<?php endif; // is singular portfolio ?>

	</div>
	<!-- /.post-content -->

	<?php themify_post_end(); // hook ?>
</article>
<!-- /.post -->

<?php themify_post_after(); //hook ?>
