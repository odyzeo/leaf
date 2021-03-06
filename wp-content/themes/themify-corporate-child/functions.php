<?php

require_once( 'leaf/award-open.php' );
require_once( 'leaf/award-open-strip.php' );
require_once( 'leaf/banners.php' );
require_once( 'leaf/blogs.php' );
require_once( 'leaf/bubble.php' );
require_once( 'leaf/stories.php' );
require_once( 'leaf/latest-blogs.php' );
require_once( 'leaf/latest-news.php' );
require_once( 'leaf/media.php' );
require_once( 'leaf/news.php' );
require_once( 'leaf/ped/ped.php' );
require_once( 'leaf/videostrip.php' );

/*
* Define a constant path to our single template folder
*/
define( 'WP_LEAF_VERSION', '1.1.3' );
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
		'award-nav'      => __( 'Award Navigation', 'themify' ),
		'talent-nav'     => __( 'TalentGuide Navigation', 'themify' ),
		'irpu-nav'       => __( 'IRPU Navigation', 'themify' ),
		'delta-nav'      => __( 'Delta Navigation', 'themify' ),
        'volunteers-nav' => __( 'Volunteers Navigation', 'themify' ),
        'marta-nav'      => __( 'Marta Navigation', 'themify' ),
	) );
}

add_action( 'init', 'themify_child_register_custom_nav' );

function themify_custom_enqueue_child_theme_styles() {
	wp_enqueue_script( 'app', get_theme_file_uri( '/app.js' ), array( 'jquery' ), WP_LEAF_VERSION );
	wp_enqueue_script( 'parent-theme-js', get_stylesheet_directory_uri() . '/scripts.js', array( 'jquery' ), '1.0', true );
	wp_enqueue_style( 'parent-theme-css', get_template_directory_uri() . '/style.css' );
	wp_localize_script( 'app', 'ajax_object',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' )
		)
	);
    wp_enqueue_style( 'wpb-google-fonts-open', 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin-ext', false );
    wp_enqueue_style( 'wpb-google-fonts-nunito', 'https://fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&subset=latin-ext', false );
    wp_enqueue_style( 'wpb-google-fonts-pt', 'https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i&subset=latin-ext', false );
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

function get_leaf_facebook_button() {
	global $post;
	$facebook_group = "https://www.facebook.com/LEAFnonprofit/";

	$post_slug = $post->post_name;

	$hidden = array(
		'leaf-academy',
		'pre-mladych-profesionalov',
		'pre-slovakov-v-zahranici',
		'pre-ucitelov',
	);

	if ( in_array( $post_slug, $hidden ) ) {
		return "";
	}

	return "
		<div class='fb-like'
			data-href='$facebook_group'
			data-layout='button'
			data-action='like'
     		data-size='small'
     		data-show-faces='false'
     		data-share='true'>
		</div>
     ";
}

function get_leaf_page_title() {
	$post_id    = get_the_ID();
	$title      = get_the_title();
	$page_class = get_post_meta( $post_id, 'page_class', true );

	$class = ( strpos( $page_class, 'page-title-award' ) > - 1 ) ? ' post-heading--award' : '';

	return "
        <div class='wrapper post-heading$class'>
            <div class='container post-heading__container'>
                <h1 class='post-heading__title'>
				    $title
                </h1>
            </div>
        </div>
	";
}


/**
 * Get post primary category
 * @return array|null|object|WP_Error
 */
function get_leaf_post_primary_category() {
	$primary_cat_id = get_post_meta( get_the_ID(), '_yoast_wpseo_primary_category', true );
	if ( $primary_cat_id != null ) {
		$category = get_category( $primary_cat_id );
	} else {
		$categories = get_the_category();
		$category   = $categories[0];
	}

	return $category;
}

/* Add Google Tag Manager javascript code as close to
the opening <head> tag as possible
=====================================================*/
function google_tag_head(){
    ?>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NCK8LHX');</script>
    <!-- End Google Tag Manager -->

    <?php
}
add_action( 'wp_head', 'google_tag_head', 10 );

/* Add Google Tag Manager noscript codeimmediately after
the opening <body> tag
========================================================*/
function google_tag_body(){
    ?>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCK8LHX"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Facebook -->
    <div id="fb-root"></div>
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) return
            js = d.createElement(s)
            js.id = id
            js.src = '//connect.facebook.net/sk_SK/sdk.js#xfbml=1&version=v2.10'
            fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))</script>
    <!-- End Facebook -->

    <?php
}
add_action( 'after_body_open_tag', 'google_tag_body' );
