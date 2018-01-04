<?php
/**
 * Template for generic post display.
 * @package themify
 * @since 1.0.0
 */
?>
<?php if ( ! is_single() ) {
	global $more;
	$more = 0;
} //enable more link ?>

<?php
/** Themify Default Variables
 * @var object
 */
global $themify;
?>

<div class="container">
    <article id="post-<?php the_id(); ?>" <?php post_class( 'post clearfix' ); ?>>

		<?php if ( $themify->hide_image != 'yes' ) : ?>
			<?php
			$themify->image_setting = 'setting=image_post_single&';
			$themify->width         = null;
			$themify->height        = null;
			?>
			<?php if ( themify_has_post_video() ) : ?>

				<?php echo themify_post_video(); ?>

			<?php elseif ( $post_image = themify_get_image( $themify->auto_featured_image . $themify->image_setting . "w=" . $themify->width . "&h=" . $themify->height ) ) : ?>
                <figure class="post-image">
					<?php if ( 'yes' == $themify->unlink_image ): ?>
						<?php echo $post_image; ?>
					<?php else: ?>
                        <a href="<?php echo themify_get_featured_image_link(); ?>"><?php echo $post_image; ?><?php themify_zoom_icon(); ?></a>
					<?php endif; // unlink image ?>
                </figure>

			<?php endif; // video else image ?>
		<?php endif; // hide image ?>

        <div class="post-content">

            <div class="post__meta">
                <div class="fb-like"
                     data-href="<?php echo get_permalink(); ?>"
                     data-layout="button"
                     data-action="like"
                     data-size="small"
                     data-show-faces="true"
                     data-share="true">
                </div>

                <time datetime="<?php the_time('o-m-d') ?>" class="post-date entry-date updated">
			        <?php the_date('d M Y') ?>
                </time>
            </div>

            <div class="entry-content">

				<?php if ( 'excerpt' == $themify->display_content && ! is_attachment() ) : ?>

					<?php the_excerpt(); ?>

					<?php if ( themify_check( 'setting-excerpt_more' ) ) : ?>

                        <p><a href="<?php the_permalink(); ?>"
                              class="more-link"><?php echo themify_check( 'setting-default_more_text' ) ? themify_get( 'setting-default_more_text' ) : __( 'More &rarr;', 'themify' ) ?></a>
                        </p>

					<?php endif; ?>

				<?php elseif ( $themify->display_content == 'none' ): ?>

				<?php else: ?>

					<?php the_content( themify_check( 'setting-default_more_text' ) ? themify_get( 'setting-default_more_text' ) : __( 'More &rarr;', 'themify' ) ); ?>

				<?php endif; //display content ?>
            </div><!-- /.entry-content -->

            <div class="fb-like"
                 data-href="<?php echo get_permalink(); ?>"
                 data-layout="button"
                 data-action="like"
                 data-size="small"
                 data-show-faces="true"
                 data-share="true">
            </div>

			<?php edit_post_link( __( 'Edit', 'themify' ), '<span class="edit-button">[', ']</span>' ); ?>

        </div>
        <!-- /.post-content -->
		<?php // themify_post_end(); // hook ?>

    </article>
</div>
