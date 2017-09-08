<?php
/*
Plugin Name:  Themify News Post
Version:      1.0.3
Author:       SIN
Description:  This plugin will add News post type.
Text Domain:  themify-news-post
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

function themify_news_post_setup() {
	global $themify_news_posts;

	$data = get_file_data( __FILE__, array( 'Version' ) );
	if( ! defined( 'THEMIFY_NEWS_POST_DIR' ) )
		define( 'THEMIFY_NEWS_POST_DIR', plugin_dir_path( __FILE__ ) );

	if( ! defined( 'THEMIFY_NEWS_POST_URI' ) )
		define( 'THEMIFY_NEWS_POST_URI', plugin_dir_url( __FILE__ ) );

	if( ! defined( 'THEMIFY_NEWS_POST_VERSION' ) )
		define( 'THEMIFY_NEWS_POST_VERSION', $data[0] );

	if( ! defined( 'THEMIFY_NEWS_POSTS_COMPAT_MODE' ) )
		define( 'THEMIFY_NEWS_POSTS_COMPAT_MODE', false );

	include THEMIFY_NEWS_POST_DIR . 'includes/system.php';

	$themify_news_posts = new Themify_News_Post( array(
		'url' => THEMIFY_NEWS_POST_URI,
		'dir' => THEMIFY_NEWS_POST_DIR,
		'version' => THEMIFY_NEWS_POST_VERSION
	) );
}
add_action( 'after_setup_theme', 'themify_news_post_setup', 14 );

add_action( 'init', 'themify_news_posts_init_image_size' );
function themify_news_posts_init_image_size() {  
  	add_image_size( 'news_posts_2560', 2560, 922, 0);
  	add_image_size( 'news_posts_2000', 2000, 720, 0);
  	add_image_size( 'news_posts_1600', 1600, 576, 0);
  	add_image_size( 'news_posts_1200', 1200, 432, 0);
  	add_image_size( 'news_posts_800', 800, 288, 0);
  	add_image_size( 'news_posts_640', 640, 230, 0);
  	add_image_size( 'news_posts_480', 480, 173, 0);
}
/**
 * Plugin activation hook
 * Flush rewrite rules after custom post type has been registered
 */
function themify_news_posts_activation() {
	add_action( 'init', 'flush_rewrite_rules', 100 );
}
register_activation_hook( __FILE__, 'themify_news_posts_activation' );