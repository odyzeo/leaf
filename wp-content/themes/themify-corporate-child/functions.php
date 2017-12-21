<?php

require_once( 'leaf/award-open.php' );
require_once( 'leaf/award-open-strip.php' );
require_once( 'leaf/banners.php' );
require_once( 'leaf/bubble.php' );
require_once( 'leaf/stories.php' );
require_once( 'leaf/latest-news.php' );
require_once( 'leaf/news.php' );
require_once( 'leaf/videostrip.php' );

/*
* Define a constant path to our single template folder
*/
define( 'WP_LEAF_VERSION', '1.0.0' );
define( 'SINGLE_PATH', get_stylesheet_directory() . '/single' );

function theme_name_setup() {
	load_theme_textdomain( 'leaf', get_stylesheet_directory() . '/languages' );
}

add_action( 'after_setup_theme', 'theme_name_setup' );

function leaf_single_template( $single ) {
	global $wp_query, $post;

	/**
	 * Checks for single template by category
	 * Check by category slug and ID
	 */
	foreach ( (array) get_the_category() as $cat ) :

		if ( file_exists( SINGLE_PATH . '/single-cat-' . $cat->slug . '.php' ) ) {
			return SINGLE_PATH . '/single-cat-' . $cat->slug . '.php';
		} elseif ( file_exists( SINGLE_PATH . '/single-cat-' . $cat->term_id . '.php' ) ) {
			return SINGLE_PATH . '/single-cat-' . $cat->term_id . '.php';
		}

	endforeach;

	return $single;
}

add_filter( 'single_template', 'leaf_single_template' );

/**
 * Enqueues child theme stylesheet, loading first the parent theme stylesheet.
 */
function themify_child_register_custom_nav() {
	register_nav_menus( array(
		'award-nav'  => __( 'Award Navigation', 'themify' ),
		'talent-nav' => __( 'TalentGuide Navigation', 'themify' ),
		'irpu-nav'   => __( 'IRPU Navigation', 'themify' ),
	) );
}

add_action( 'init', 'themify_child_register_custom_nav' );

function themify_custom_enqueue_child_theme_styles() {
	wp_enqueue_script( 'app', get_theme_file_uri( '/app.js' ), array( 'jquery' ), WP_LEAF_VERSION );
	wp_enqueue_script( 'parent-theme-js', get_stylesheet_directory_uri() . '/scripts.js', array( 'jquery' ), '1.0', true );
	wp_enqueue_style( 'parent-theme-css', get_template_directory_uri() . '/style.css' );
}

add_action( 'wp_enqueue_scripts', 'themify_custom_enqueue_child_theme_styles', 11 );

function themify_child_theme_register_sidebars() {
	$sidebars = array(
		array(
			'name'          => __( 'Bottombar', 'themify' ),
			'id'            => 'bottombar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widgettitle">',
			'after_title'   => '</h3>',
		),
		array(
			'name'          => __( 'Topbar', 'themify' ),
			'id'            => 'topbar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widgettitle">',
			'after_title'   => '</h3>',
		),
	);
	foreach ( $sidebars as $sidebar ) {
		register_sidebar( $sidebar );
	}
}

add_action( 'widgets_init', 'themify_child_theme_register_sidebars' );


/**
 * TALENTGUIDE MIGRATION
 */
require_once( 'sorudan/sorudan.php' );
require_once( 'sorudan/shortcode.php' );

function leaf_get_languages( $class = 'header__lang' ) {
	$result    = "";
	$languages = icl_get_languages( 'skip_missing=0' );
	if ( ! empty( $languages ) ) {
		$languageslangs = array();
		foreach ( $languages as $l ) {
			if ( $l['active'] ) {

			} else {
				$languageslangs[] = '<a class="' . $class . '" href="' . $l['url'] . '" title="' . $l['translated_name'] . '">' . $l['language_code'] . '</a>';
			}
		}
		if ( ! empty( $languageslangs ) ) {
			$result = implode( '', $languageslangs );
		}
	}

	return $result;
}
