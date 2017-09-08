<?php
/**
 * Template for common archive pages, author and search results
 * @package themify
 * @since 1.0.0
 */
?>
<?php get_header(); ?>

<?php
/** Themify Default Variables
 *  @var object */
global $themify,$query,$wp_query,$NewsPostObject,$args;
extract( $args );
?>

<!-- layout -->
<div id="layout" class="pagewidth clearfix">

	<!-- content -->
    <?php themify_content_before(); //hook ?>
	<div id="content" class="clearfix">
    	<?php themify_content_start(); //hook ?>
    <h1 class="page-title"><?php _e( 'News', 'themify' ); ?></h1>
		<?php
		/////////////////////////////////////////////
		// Loop
		/////////////////////////////////////////////
		?>
		<?php if (have_posts()) : $query=$wp_query;?>

			<?php do_action( 'themify_news_posts_before_loop' ); ?>
			
			<div class="themify-news-posts">
			
				<div class="loops-wrapper shortcode <?php echo $post_type; ?> <?php echo $layout ?> <?php echo ( $query->post_count > 1 ) ? 'news-multiple clearfix type-multiple' : 'news-single' ?> <?php echo $masonry == 'yes' ? 'masonry-layout' : 'masonry-disabled'; ?>">
			
					<?php while( $query->have_posts() ) : $query->the_post(); ?>
			
						<?php include $NewsPostObject->locate_template( 'archive-news-post' ); ?>
			
					<?php endwhile; wp_reset_postdata(); ?>
			
					<?php if( $more_link ) include $NewsPostObject->locate_template( 'more-link' ); ?>
			
				</div>
			
				<?php get_template_part( 'includes/pagination'); ?>
				
			</div><!-- .themify-news-posts -->
			
			<?php do_action( 'themify_news_posts_after_loop' ); ?>

		<?php
		/////////////////////////////////////////////
		// Error - No Page Found
		/////////////////////////////////////////////
		?>

		<?php else : ?>

			<p><?php _e( 'Sorry, nothing found.', 'themify' ); ?></p>

		<?php endif; ?>
	<?php themify_content_end(); //hook ?>
	</div>
    <?php themify_content_after(); //hook ?>
	<!-- /#content -->

	<?php
	/////////////////////////////////////////////
	// Sidebar
	/////////////////////////////////////////////
	if ($themify->layout != "sidebar-none"): get_sidebar(); endif; ?>

</div>
<!-- /#layout -->

<?php get_footer(); ?>
