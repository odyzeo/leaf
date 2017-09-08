<?php
/*
Plugin Name:  Themify Tiles
Plugin URI:   
Version:      1.0.2
Author:       Themify
Description:  Create masonry tile layouts that's similar to the Windows 8 Metro desktop style.
Text Domain:  themify-tiles
Domain Path:  /languages

		This program is free software; you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation; either version 2 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program; if not, write to the Free Software
		Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

defined( 'ABSPATH' ) or die( '-1' );

/**
 * Bootstrap Tiles plugin
 *
 * @since 1.0
 */
function themify_tiles_setup() {
	if( ! defined( 'THEMIFY_TILES_DIR' ) )
		define( 'THEMIFY_TILES_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

	if( ! defined( 'THEMIFY_TILES_URI' ) )
		define( 'THEMIFY_TILES_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );

	if( ! defined( 'THEMIFY_TILES_VERSION' ) )
		define( 'THEMIFY_TILES_VERSION', '1.0.0' );

	include THEMIFY_TILES_DIR . 'includes/system.php';

	Themify_Tiles::get_instance();
}
add_action( 'after_setup_theme', 'themify_tiles_setup', 100 );

function themify_tiles_updater_setup() {
	require_once( THEMIFY_TILES_DIR . 'themify-tiles-updater.php' );
	new Themify_Tiles_Updater( trim( dirname( plugin_basename( __FILE__) ), '/' ), THEMIFY_TILES_VERSION, trim( plugin_basename( __FILE__), '/' ) );
}
add_action( 'init', 'themify_tiles_updater_setup' );