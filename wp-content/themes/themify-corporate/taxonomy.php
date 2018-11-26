<?php
/**
 * Template for common archive pages, author and search results
 * @package themify
 * @since 1.0.0
 */

get_header();
global $themify; ?>

<!-- layout -->
<div id="layout" class="pagewidth clearfix">
	<?php themify_content_before(); //hook ?>

	<div id="content" class="clearfix">
		<?php themify_content_start(); //hook ?>
		
		<h1 class="page-title"><?php single_cat_title(); ?></h1>
		<?php echo themify_get_term_description(); ?>
		
		<?php if ( have_posts() ) : ?>
			<div id="loops-wrapper" class="loops-wrapper <?php echo $themify->layout . ' ' . $themify->post_layout; ?>">
				<?php while ( have_posts() ) { the_post(); get_template_part( 'includes/loop' , 'index'); } ?>
			</div>

			<?php get_template_part( 'includes/pagination'); ?>
		
		<?php else : ?>
			<p><?php _e( 'Sorry, nothing found.', 'themify' ); ?></p>
		<?php endif; ?>

		<?php themify_content_end(); //hook ?>
	</div><!-- /#content -->

	<?php 
		themify_content_after(); //hook
		if ( $themify->layout != "sidebar-none" ) get_sidebar();
	?>

</div>
<!-- /#layout -->

<?php get_footer(); ?>