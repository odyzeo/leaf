<?php

/**
 * Load assets needed for Stack theme on front end
 *
 * @since 1.0
 */
function themify_story_posts_stack_enqueue() {
	global $themify_story_posts;

	// Backstretch
	wp_register_script( 'themify-backstretch', $themify_story_posts->get_theme_url() . '/js/backstretch.js', array( 'jquery' ), $themify_story_posts->version, true );

	wp_enqueue_script( 'themify-story-posts-stack', $themify_story_posts->get_theme_url() . '/js/scripts.js', array( 'jquery', 'jquery-masonry' ), $themify_story_posts->version, true );

	wp_enqueue_style( $themify_story_posts->pid, $themify_story_posts->get_theme_url() . '/style.css' );
	// wp_enqueue_style( 'themify-font-icons-css', THEMIFY_URI . '/fontawesome/css/font-awesome.min.css', array(), THEMIFY_VERSION );
}
add_action( 'wp_enqueue_scripts', 'themify_story_posts_stack_enqueue' );

if ( ! function_exists( 'themify_story_posts_stack_custom_post_css' ) ) {
	/**
	 * Outputs custom post CSS at the end of a post
	 * @since 1.0.0
	 */
	function themify_story_posts_stack_custom_post_css() {
		global $themify;

		if( tpp_is_story_single() ) {
			return;
		}

		$post_id = get_the_ID();
		if ( in_array( get_post_type( $post_id ), array( 'story' ) ) ) {
			$css = array();
			$style = '';
			$rules = array();

			if ( ! is_single() ) {
				$entry_id = '.post-' . $post_id;
				$entry = $entry_id . '.post';
				$rules = array(
					$entry => array(
						array(
							'prop' => 'background-color',
							'key'  => 'background_color'
						),
						array(
							'prop' => 'background-image',
							'key'  => 'background_image'
						),
						array(
							'prop' => 'background-repeat',
							'key'  => 'background_repeat',
							'dependson' => array(
								'prop' => 'background-image',
								'key'  => 'background_image'
							),
						),
						array(
							'prop' => 'color',
							'key'  => 'text_color'
						),
					),
					"$entry a" => array(
						array(
							'prop' => 'color',
							'key'  => 'link_color'
						),
					),
				);
			}

			foreach ( $rules as $selector => $property ) {
				foreach ( $property as $val ) {
					$prop = $val['prop'];
					$key = $val['key'];
					if ( is_array( $key ) ) {
						if ( $prop == 'font-size' && tpp_story_check( $key[0] ) ) {
							$css[$selector][$prop] = $prop . ': ' . tpp_story_get( $key[0] ) . tpp_story_get( $key[1] );
						}
					} elseif ( tpp_story_check( $key ) && 'default' != tpp_story_get( $key ) ) {
						if ( $prop == 'color' || stripos( $prop, 'color' ) ) {
							$css[$selector][$prop] = $prop . ': #' . tpp_story_get( $key );
						}
						elseif ( $prop == 'background-image' && 'default' != tpp_story_get( $key ) ) {
							$css[$selector][$prop] = $prop .': url(' . tpp_story_get( $key ) . ')';
						}
						elseif ( $prop == 'background-repeat' && 'fullcover' == tpp_story_get( $key ) ) {
							if ( isset( $val['dependson'] ) ) {
								if ( $val['dependson']['prop'] == 'background-image' && ( tpp_story_check( $val['dependson']['key'] ) && 'default' != tpp_story_get( $val['dependson']['key'] ) ) ) {
									$css[$selector]['background-size'] = 'background-size: cover';
								}
							} else {
								$css[$selector]['background-size'] = 'background-size: cover';
							}
						}
						elseif ( $prop == 'font-family' ) {
							$font = tpp_story_get( $key );
							$css[$selector][$prop] = $prop .': '. $font;
							if ( ! in_array( $font, themify_get_web_safe_font_list( true ) ) ) {
								$themify->google_fonts .= str_replace( ' ', '+', $font.'|' );
							}
						}
						else {
							$css[$selector][$prop] = $prop .': '. tpp_story_get( $key );
						}
					}
				}
				if ( ! empty( $css[$selector] ) ) {
					$style .= "$selector {\n\t" . implode( ";\n\t", $css[$selector] ) . "\n}\n";
				}
			}

			if ( '' != $style ) {
				echo "\n<!-- Entry Style -->\n<style>\n$style</style>\n<!-- End Entry Style -->\n";
			}
		}
	}
}
add_action( 'themify_story_post_end', 'themify_story_posts_stack_custom_post_css' );

function themify_story_posts_stack_post_class( $classes ) {
	global $post;

	if( $post->post_type == 'story' ) {
		if ( $size = get_post_meta( $post->ID, 'tile_layout', true ) ) {
			$classes[] = $size;
		} else {
			$classes[] = 'size-large image-left';
		}
	}

	return $classes;
}
add_filter( 'post_class', 'themify_story_posts_stack_post_class' );