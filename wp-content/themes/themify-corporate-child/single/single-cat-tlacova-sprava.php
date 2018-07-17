<?php
/**
 * Template for single post view
 * @package themify
 * @since 1.0.0
 */
?>

<?php get_header(); ?>

<?php
/** Themify Default Variables
 * @var object
 */
global $themify;
?>

<?php if ( have_posts() ) {
while ( have_posts() ) :
the_post(); ?>

<div id="layout" class="pagewidth clearfix">

    <div id="content" class="list-post">

        <div class="wrapper post-heading">
            <div class="container post-heading__container">
                <h1 class="post-heading__title">
					<?php the_title(); ?>
                </h1>
            </div>
        </div>

		<?php get_template_part( 'includes/loop', 'single' ); ?>

        <div class="post-spacing-bottom"></div>

    </div>

	<?php endwhile;
	} ?>

</div>

<?php get_footer(); ?>
