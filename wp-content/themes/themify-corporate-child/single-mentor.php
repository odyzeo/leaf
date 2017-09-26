<?php
/**
 * Template for single mentor view
 */
?>

<?php get_header( 'talent' ); ?>

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

	                <?php get_template_part( 'content', 'mentor' ); ?>

                </div>
                <!-- /.post-content -->

            </div><!-- /.type-page -->
		<?php endwhile; endif; ?>

		<?php themify_content_end(); // hook ?>
    </div>
    <!-- /content -->
	<?php themify_content_after(); // hook ?>

</div>
<!-- /layout-container -->

<?php get_footer(); ?>
