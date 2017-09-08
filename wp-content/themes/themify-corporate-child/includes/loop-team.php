<?php if(!is_single()) { global $more; $more = 0; } //enable more link ?>
<?php
/** Themify Default Variables
 *  @var object */
global $themify; ?>

<?php themify_post_before(); //hook ?>

<?php themify_post_before(); // hook ?>
<article id="team-<?php the_id(); ?>" class="<?php echo implode(' ', get_post_class('post clearfix team-post')); ?>">
	<?php themify_post_start(); // hook ?>

	<a href="<?php echo themify_get_featured_image_link(); ?>" data-post-permalink="yes" style="display: none;"></a>


			<?php
				// Set image width
				$themify->width = get_post_meta($post_id, 'image_width', true);

				// Set image height
				$themify->height = get_post_meta($post_id, 'image_height', true);
			?>
			<figure class="post-image">
					<?php themify_image('ignore=true&w='.$themify->width.'&h='.$themify->height); ?>
			</figure>

	<div class="post-content"><div class="post-content-out">

	<?php if ( is_singular( 'team' ) ) : ?>
		<div class="team-post-wrap">
			<?php themify_post_title(); ?>
		</div>
	<?php endif; // is singular team ?>

		<?php if ( ! is_singular( 'team' ) ) : ?>
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

		<?php endif; // is singular team ?>

						<div class="entry-content">

							<?php if ( 'excerpt' == $themify->display_content && ! is_attachment() ) : ?>

								<?php the_excerpt(); ?>

							<?php elseif ( 'none' == $themify->display_content && ! is_attachment() ) : ?>

							<?php else: ?>

								<?php the_content(themify_check('setting-default_more_text')? themify_get('setting-default_more_text') : __('More &rarr;', 'themify')); ?>

							<?php endif; //display content ?>

						</div><!-- /.entry-content -->

						<?php edit_post_link(__('Edit', 'themify'), '<span class="edit-button">[', ']</span>'); ?>

		<?php if ( ! is_singular( 'team' ) ) : ?>

					</div>
					<!-- /.disp-cell -->
				</div>
				<!-- /.disp-row -->
			</div>
			<!-- /.disp-table -->
		<?php endif; // is singular team ?>

	</div></div>
	<!-- /.post-content -->

	<?php themify_post_end(); // hook ?>
</article>
<!-- /.post -->

<?php themify_post_after(); //hook ?>
