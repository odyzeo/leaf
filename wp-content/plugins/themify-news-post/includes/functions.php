<?php

/**
 * Conditional tag to check if we're on a news category archive page
 * Can optionally check for specific news category terms
 * Should only be used after template_redirect
 *
 * @return bool
 * @since 1.0.0
 */
function tpp_is_news_category( $term = null ) {
	global $themify_news_posts;

	return $themify_news_posts->is_news_category( $term );
}

/**
 * Conditional tag to check if we're on a single news page
 * Can optionally check for specific news slug
 * Should only be used after template_redirect
 *
 * @return bool
 * @since 1.0.0
 */
function tpp_is_news_single( $slug = null ) {
	global $themify_news_posts;

	return $themify_news_posts->is_news_single( $slug );
}

/**
 * Check if option is set for the current item in the loop
 *
 * @since 1.0
 */
function tpp_news_check( $var ) {
	global $post;

	if ( is_object( $post ) && get_post_meta( $post->ID, $var, true ) != '' && get_post_meta( $post->ID, $var, true ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Get an option for the current item in the loop
 *
 * @since 1.0
 */
function tpp_news_get( $var, $default = null ) {
	global $post;

	if ( is_object( $post ) && get_post_meta( $post->ID, $var, true ) != '' ) {
		return get_post_meta( $post->ID, $var, true );
	} else {
		return $default;
	}
}