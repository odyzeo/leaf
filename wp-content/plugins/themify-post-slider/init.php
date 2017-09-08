<?php
/*
Plugin Name:  Themify Post Slider
Version:      1.0
Author:       MaCho
*/

function themify_post_slider_register_module( $ThemifyBuilder ) {
	$ThemifyBuilder->register_directory( 'templates', plugin_dir_path( __FILE__ ) . '/templates' );
	$ThemifyBuilder->register_directory( 'modules', plugin_dir_path( __FILE__ ) . '/modules' );
}
add_action( 'themify_builder_setup_modules', 'themify_post_slider_register_module' );
