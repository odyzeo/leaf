<?php if(!is_single()) { global $more; $more = 0; } //enable more link ?>
<?php
/** Themify Default Variables
 *  @var object */
global $themify; ?>

<?php themify_post_before(); //hook ?>

<?php
$categories = wp_get_object_terms(get_the_id(), 'story-category');
$class = '';
foreach($categories as $cat){
	$class .= ' cat-'.$cat->term_id;
}
?>
<?php themify_post_before(); // hook ?>
<article id="story-<?php the_id(); ?>" class="<?php echo implode(' ', get_post_class('post clearfix story-post' . $class)); ?>">
	<?php themify_post_start(); // hook ?>

	<a href="<?php echo themify_get_featured_image_link(); ?>" data-post-permalink="yes" style="display: none;"></a>

	<div class="story-post-wrap-out">

	<?php if( $themify->hide_image != 'yes' ) : ?>
    <!-- image -->
		<?php get_template_part( 'includes/post-media', get_post_type() ); ?>
    <div class="downiconblock"><a href="#story-content" class="downicon"></a></div>
	<?php endif //hide image ?>

	<?php if ( is_singular( 'story' ) ) : ?>
		<div class="story-post-wrap">
			<?php themify_post_title(); ?>
      <?php the_excerpt(); ?>
		</div>
	<?php endif; // is singular story ?>

  </div>

	<div class="post-content"><div class="post-content-out">

		<?php if ( ! is_singular( 'story' ) ) : ?>
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

		<?php endif; // is singular story ?>

						<div id="story-content" class="entry-content">

							<?php if ( 'excerpt' == $themify->display_content && ! is_attachment() ) : ?>

								<?php the_excerpt(); ?>

							<?php elseif ( 'none' == $themify->display_content && ! is_attachment() ) : ?>

							<?php else: 
              
                global $wp;
                $current_url = home_url(add_query_arg(array(),$wp->request));
              ?>
                
                <div class="fb-like" data-href="<?php echo $current_url;?>" data-layout="button" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
                
								<?php the_content(themify_check('setting-default_more_text')? themify_get('setting-default_more_text') : __('More &rarr;', 'themify')); ?>

                <div class="fb-like" data-href="<?php echo $current_url;?>" data-layout="button" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>

							<?php endif; //display content ?>

						</div><!-- /.entry-content -->

						<?php edit_post_link(__('Edit', 'themify'), '<span class="edit-button">[', ']</span>'); ?>

		<?php if ( ! is_singular( 'story' ) ) : ?>

					</div>
					<!-- /.disp-cell -->
				</div>
				<!-- /.disp-row -->
			</div>
			<!-- /.disp-table -->
		<?php endif; // is singular story ?>

	</div></div>
	<!-- /.post-content -->

	<?php themify_post_end(); // hook ?>
</article>
<!-- /.post -->

<?php themify_post_after(); //hook ?>
