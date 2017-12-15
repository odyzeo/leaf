<?php

/**
 * Conditional tag to check if we're on a story category archive page
 * Can optionally check for specific story category terms
 * Should only be used after template_redirect
 *
 * @return bool
 * @since 1.0.0
 */
function tpp_is_story_category( $term = null ) {
	global $themify_story_posts;

	return $themify_story_posts->is_story_category( $term );
}

/**
 * Conditional tag to check if we're on a single story page
 * Can optionally check for specific story slug
 * Should only be used after template_redirect
 *
 * @return bool
 * @since 1.0.0
 */
function tpp_is_story_single( $slug = null ) {
	global $themify_story_posts;

	return $themify_story_posts->is_story_single( $slug );
}

/**
 * Check if option is set for the current item in the loop
 *
 * @since 1.0
 */
function tpp_story_check( $var ) {
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
function tpp_story_get( $var, $default = null ) {
	global $post;

	if ( is_object( $post ) && get_post_meta( $post->ID, $var, true ) != '' ) {
		return get_post_meta( $post->ID, $var, true );
	} else {
		return $default;
	}
}