<?php get_header();
global $themify, $query_string;

if( is_front_page() && ! is_paged() ) get_template_part( 'includes/slider');
if( is_front_page() && ! is_paged() ) get_template_part( 'includes/welcome-message'); ?>
		
<!-- layout -->
<div id="layout" class="pagewidth clearfix">
	<?php themify_content_before(); //hook ?>

	<div id="content" class="clearfix">
		<?php themify_content_start(); //hook ?>
		
		<h1 class="page-title"><?php single_cat_title(); ?></h1>
		<?php 
			echo themify_get_term_description();

			$query_vars = $wp_query->query_vars['taxonomy'];
			$set_post_type = str_replace( '-category', '', $query_vars );
			if( in_array( $query_vars, get_object_taxonomies( $set_post_type ) ) ){
				query_posts( $query_string . '&post_type=' . $set_post_type . '&paged=' . $paged );
			}
		?>

		<?php if (have_posts()) : ?>
			<div id="loops-wrapper" class="loops-wrapper <?php echo $themify->layout . ' ' . $themify->post_layout; ?>">
				<?php while( have_posts() ) { the_post(); get_template_part( 'includes/loop-portfolio' , 'index'); } ?>
			</div>

			<?php get_template_part( 'includes/pagination'); ?>
		<?php else : ?>
			<p><?php _e( 'Sorry, nothing found.', 'themify' ); ?></p>
		<?php endif; ?>
	
		<?php themify_content_end(); //hook ?>
	</div><!-- /#content -->
	
	<?php
		themify_content_after(); //hook
		if( $themify->layout != "sidebar-none" ) get_sidebar();
	?>
</div>
<!-- /#layout -->

<?php get_footer(); ?>