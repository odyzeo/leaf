<?php do_action( 'themify_news_post_before' ); ?>

<article id="news-<?php the_ID(); ?>" class="<?php echo esc_attr( implode( ' ', get_post_class( 'post clearfix news-post ' . (isset($NewsPostObject) && $NewsPostObject ? $NewsPostObject->get_post_category_classes() : $this->get_post_category_classes()) ) ) ); ?>">

	<?php do_action( 'themify_news_post_start' ); ?>

	<?php if ( ( ! tpp_is_news_single() && $image == 'yes' ) ) : ?>

		<?php include( (isset($NewsPostObject) && $NewsPostObject ? $NewsPostObject->locate_template( 'news-media' ) : $this->locate_template( 'news-media' )) ); ?>

	<?php endif //hide image ?>

	<div class="post-content"><div class="post-content-out">
		<div class="disp-table">
			<div class="disp-row">
				<div class="disp-cell valignmid">

					<?php if ( $title == 'yes' ): ?>
						<?php do_action( 'themify_news_post_before_title' ); ?>
						<h2 class="post-title entry-title">
							<?php if ( $unlink_title == 'yes' ): ?>
								<?php the_title(); ?>
							<?php else: ?>
								<a href="<?php echo get_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
							<?php endif; //unlink post title ?>
						</h2>
						<?php do_action( 'themify_news_post_after_title' ); ?>
					<?php endif; //post title ?>

					<div class="entry-content">

						<?php if ( 'excerpt' == $display && ! is_attachment() ) : ?>

							<?php the_excerpt(); ?>

						<?php elseif ( 'none' == $display && ! is_attachment() ) : ?>

						<?php else: ?>

							<?php the_content(  ); ?>

						<?php endif; //display content ?>

					</div>
					<!-- /.entry-content -->

					<?php edit_post_link( __( 'Edit', 'themify-news-post' ), '<span class="edit-button">[', ']</span>' ); ?>

				</div><!-- /.disp-cell -->
			</div><!-- /.disp-row -->
		</div><!-- /.disp-table -->
	</div></div><!-- /.post-content -->

	<?php do_action( 'themify_news_post_end' ); ?>

</article><!-- /.post -->

<?php do_action( 'themify_news_post_after' ); ?>