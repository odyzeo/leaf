<?php
/*
Plugin Name:  Themify Story Post
Version:      1.0.1
Author:       SIN
Description:  This plugin will add Story post type.
Text Domain:  themify-story-post
Domain Path:  /languages


/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 */

defined( 'ABSPATH' ) or die;

function themify_story_post_setup() {
	global $themify_story_posts;

	$data = get_file_data( __FILE__, array( 'Version' ) );
	if( ! defined( 'THEMIFY_STORY_POST_DIR' ) )
		define( 'THEMIFY_STORY_POST_DIR', plugin_dir_path( __FILE__ ) );

	if( ! defined( 'THEMIFY_STORY_POST_URI' ) )
		define( 'THEMIFY_STORY_POST_URI', plugin_dir_url( __FILE__ ) );

	if( ! defined( 'THEMIFY_STORY_POST_VERSION' ) )
		define( 'THEMIFY_STORY_POST_VERSION', $data[0] );

	if( ! defined( 'THEMIFY_STORY_POSTS_COMPAT_MODE' ) )
		define( 'THEMIFY_STORY_POSTS_COMPAT_MODE', false );

	include THEMIFY_STORY_POST_DIR . 'includes/system.php';

	$themify_story_posts = new Themify_Story_Post( array(
		'url' => THEMIFY_STORY_POST_URI,
		'dir' => THEMIFY_STORY_POST_DIR,
		'version' => THEMIFY_STORY_POST_VERSION
	) );
}
add_action( 'after_setup_theme', 'themify_story_post_setup', 14 );

/**
 * Plugin activation hook
 * Flush rewrite rules after custom post type has been registered
 */
function themify_story_posts_activation() {
	add_action( 'init', 'flush_rewrite_rules', 100 );
}
register_activation_hook( __FILE__, 'themify_story_posts_activation' );