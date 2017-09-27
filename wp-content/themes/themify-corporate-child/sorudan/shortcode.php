<?php

defined( 'ABSPATH' ) or die();

class SorShortcode {

	/*
	 * Init function
	 * */
	public static function init() {

		add_shortcode( 'talentguide_mentori', array( __CLASS__, 'showMentors' ) );

	}

	public static function showMentors( $atts, $content = null ) {

		global $post;

		extract( shortcode_atts( array(
			'number_per_page' => '15'
		), $atts ) );

		$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;

		$args = array(
			'post_type'      => Sor::OBJECT_TYPE_MENTOR,
			'post_status'    => 'publish',
			'posts_per_page' => $number_per_page,
			'paged'          => $paged
		);

		if ( $_GET["category"] ) {
			$args['tax_query'][] = array(
				'taxonomy' => Sor::TAXONOMY_TYPE_MENTOR,
				'field'    => 'slug',
				'terms'    => $_GET["category"]
			);
		}

		$category = get_terms( Sor::TAXONOMY_TYPE_MENTOR );

		ob_start();

		?>

        <form id="tg-mentor-search-form" class="form" action="">
            <h3>Vyberte kategóriu</h3>
            <div class="form__group" data-toggle="buttons">
				<?php $i = 0;
				foreach ( $category as $cat ) {
					$i ++;
					$sel = 0;
					if ( isset( $_GET["category"] ) ) {
						if ( in_array( $cat->slug, $_GET["category"] ) ) {
							$sel = 1;
						}
					}
					?>
                    <input type="checkbox" <?php if ( $sel ) { echo 'checked="checked" '; } ?>
                           name="category[]"
                           id="tg_cat<?php echo $i; ?>"
                           value="<?php echo $cat->slug; ?>"
                           class="form__checkbox">
                    <label for="tg_cat<?php echo $i; ?>" class="form__label">
						<?php echo $cat->name; ?>
                    </label>
				<?php } ?>
            </div>
            <input type="submit" class="ui builder_button green" value="Filtruj">
            <input type="hidden" name="paged" value="1"/>
        </form>

        <div id="tg-mentor-search-result">

			<?php
			$the_query = new WP_Query( $args );

			if ( $the_query->have_posts() ) {
				while ( $the_query->have_posts() ) {
					$the_query->the_post();

					$mentor_info     = get_field( 'sor_more_info' );
					$mentor_linkedin = get_field( 'sor_mentor_linkedin' );
					$mentor_category = get_field( 'sor_mentor_category' );
					$mentor_activity = get_field( 'sor_mentor_activity' );
					$mentor_aboutme  = get_field( 'sor_mentor_aboutme' );

					?>

                    <div class="tg-mentor">
                        <div class="tg-image">
							<?php if ( has_post_thumbnail() ) { ?>
								<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'post-thumbnail' ); ?>
                                <a href="<?php the_permalink(); ?>"><img src="<?php echo $thumb[0]; ?>"
                                                                         alt="<?php echo esc_attr( get_the_title() ); ?>"/></a>
							<?php } ?>
                        </div>
                        <div class="tg-desc">
                            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<?php if ( $mentor_linkedin ) { ?>
                                <div class="tg-text"><a class="tg-btn-linkedin" href="<?php echo $mentor_linkedin; ?>"
                                                        target="_blank"><i class="icon-linkedin-squared"></i> LinkedIn
                                        profil</a></div>
							<?php } ?>
                            <div class="tg-text"><h4><strong>Mám vedomosti alebo skúsenosti z týchto oblastí:</strong>
                                </h4>
								<?php
								if ( $mentor_category && $mentor_category != "" ) {
									echo strip_tags($mentor_category, '<ul><li><a>');
								} else {
									$terms = wp_get_post_terms( $post->ID, Sor::TAXONOMY_TYPE_MENTOR, array(
										'orderby' => 'term_order',
										'order'   => 'ASC',
										'fields'  => 'names'
									) );
									if ( $terms ) {
										echo '<ul>';
										foreach ( $terms as $term ) {
											echo '<li>' . $term . '</li>';
										}
										echo '</ul>';
									}
								}
								?>
                            </div>
                            <div class="tg-text">
								<?php the_content(); ?>
                            </div>

                            <div class="tg-more">
								<?php if ( $mentor_info ) { ?>
                                    <div class="tg-text">
										<?php echo $mentor_info; ?>
                                    </div>
								<?php } ?>
                                <div class="tg-text"><h4><strong>Moje aktivity:</strong></h4>
									<?php echo $mentor_activity; ?>
                                </div>
                                <div class="tg-text"><h4><strong>Čo by o mne mal vedieť môj mentee:</strong></h4>
									<?php echo $mentor_aboutme; ?>
                                </div>
                            </div>
                            <p class="tg-control"><a class="btn btn-default tg-show-more" href="#">Viac o mne</a></p>
                            <p class="tg-control"><a class="btn btn-default tg-show-less" href="#">Zavrieť</a></p>

                        </div>
                    </div>

				<?php }
			} ?>

        </div>

		<?php

		wp_reset_postdata();

		//$big = 999999999; // need an unlikely integer

		$base = get_permalink( get_the_ID() ) . '?%_%';

		$pag_args = array(
			'base'               => $base,
			'format'             => '?paged=%#%',
			'current'            => max( 1, $paged ),
			'total'              => $the_query->max_num_pages,
			'show_all'           => false,
			'end_size'           => 1,
			'mid_size'           => 2,
			'prev_next'          => true,
			'prev_text'          => '&laquo;',
			'next_text'          => '&raquo;',
			'type'               => 'plain',
			'add_args'           => true,
			'add_fragment'       => '',
			'before_page_number' => '',
			'after_page_number'  => '',
			'type'               => 'array'
		);

		$pagination = paginate_links( $pag_args );
		if ( count( $pagination ) ) {
			echo '<ul class="pagination">';
			foreach ( $pagination as $item ) {
				echo '<li>' . $item . '</li>';
			}
			echo '</ul>';
		}


		return ob_get_clean();

	}

}

SorShortcode::init();