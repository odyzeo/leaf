<?php 
/**
 * Post Navigation Template
 * @since 1.0.0
 */

$in_same_cat = false;
$previous = get_previous_post_link( '<span class="themify-news-prev">%link</span>', '<span class="arrow" title="%title"></span>', $in_same_cat, '', 'news-category' );
$next = get_next_post_link( '<span class="themify-news-next">%link</span>', '<span class="arrow" title="%title"></span>', $in_same_cat, '', 'news-category' );

	if ( ! empty( $previous ) || ! empty( $next ) ) : ?>

		<div class="themify-news-post-nav clearfix">
			<?php echo "$previous $next"; ?>
		</div>
		<!-- /.post-nav -->

	<?php endif; // empty previous or next