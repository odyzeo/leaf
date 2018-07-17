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

        <div class="container themify_builder_content">

            <div class="module module-divider solid">
                <h3 class="module-title">
				    <?php _e( 'Blogs', 'leaf' ); ?>
                </h3>
            </div>

		    <?php
		    $post_id = get_the_ID();
		    echo do_shortcode( "[latest-blogs category='1' post='$post_id']" );
		    ?>

        </div>

    </div>

	<?php endwhile;
	} ?>

</div>

<?php get_footer(); ?>
