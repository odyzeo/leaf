<?php
/**
 * Template name: Volunteers
 */
?>

<?php get_header( 'volunteers' ); ?>

<?php
/** Themify Default Variables
 * @var object
 */
global $themify; ?>

<!-- layout-container -->
<div id="layout" class="pagewidth clearfix">

	<?php themify_content_before(); // hook ?>
    <!-- content -->
    <div id="content" class="clearfix">
		<?php themify_content_start(); // hook ?>

		<?php
		/////////////////////////////////////////////
		// PAGE
		/////////////////////////////////////////////
		?>
		<?php if ( ! is_404() && have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <div id="page-<?php the_ID(); ?>" class="type-page">

                <!-- page-title -->
				<?php if ( $themify->page_title != "yes" ): ?>
                    <h1 class="page-title"><?php the_title(); ?></h1>
				<?php endif; ?>
                <!-- /page-title -->

                <div class="page-content entry-content">

					<?php if ( $themify->hide_page_image != 'yes' && has_post_thumbnail() ) : ?>
                        <figure class="post-image"><?php themify_image( "{$themify->auto_featured_image}w={$themify->image_page_single_width}&h={$themify->image_page_single_height}&ignore=true" ); ?></figure>
					<?php endif; ?>

					<?php the_content(); ?>

					<?php wp_link_pages( array(
						'before'         => '<p class="post-pagination"><strong>' . __( 'Pages:', 'themify' ) . '</strong> ',
						'after'          => '</p>',
						'next_or_number' => 'number'
					) ); ?>

					<?php edit_post_link( __( 'Edit', 'themify' ), '[', ']' ); ?>

                    <!-- comments -->
					<?php if ( ! themify_check( 'setting-comments_pages' ) && $themify->query_category == "" ): ?>
						<?php comments_template(); ?>
					<?php endif; ?>
                    <!-- /comments -->

                </div>
                <!-- /.post-content -->

            </div><!-- /.type-page -->
		<?php endwhile; endif; ?>

		<?php themify_content_end(); // hook ?>
    </div>
    <!-- /content -->
	<?php themify_content_after(); // hook ?>

	<?php
	/////////////////////////////////////////////
	// Sidebar
	/////////////////////////////////////////////
	if ( $themify->layout != 'sidebar-none' ): get_sidebar(); endif; ?>

</div>
<!-- /layout-container -->

<?php get_footer(); ?>
