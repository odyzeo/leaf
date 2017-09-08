<?php
/*
Plugin Name: Themify Builder
Plugin URI: http://themify.me/
Description: Build responsive layouts that work for desktop, tablets, and mobile using intuitive &quot;what you see is what you get&quot; drag &amp; drop framework with live edits and previews.
Version: 1.3.5
Author: Themify
Author URI: http://themify.me
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// Hook loaded
add_action( 'after_setup_theme', 'themify_builder_themify_dependencies' );
add_action( 'after_setup_theme', 'themify_builder_plugin_init', 10 );

/**
 * Load themify functions
 */
function themify_builder_themify_dependencies(){
	if ( class_exists( 'Themify_Builder' ) ) return;

	if ( ! defined( 'THEMIFY_DIR' ) ) {
		require_once( plugin_dir_path( __FILE__ ) . 'themify/themify-database.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'themify/themify-utils.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'themify/themify-hooks.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'themify/themify-config.php' );
		require_once( plugin_dir_path( __FILE__ ) . 'theme-options.php' );
	}
}

/**
 * Init Plugin
 * called after theme to avoid redeclare function error
 */
function themify_builder_plugin_init() {
	if ( class_exists('Themify_Builder') ) return;

	global $ThemifyBuilder, $Themify_Builder_Options, $Themify_Builder_Layouts;

	/**
	 * Define builder constant
	 */
	define( 'THEMIFY_BUILDER_VERSION', '1.3.5' );
	define( 'THEMIFY_BUILDER_VERSION_KEY', 'themify_builder_version' );
	define( 'THEMIFY_BUILDER_NAME', trim( dirname( plugin_basename( __FILE__) ), '/' ) );
	define( 'THEMIFY_BUILDER_SLUG', trim( plugin_basename( __FILE__), '/' ) );

	/**
	 * Layouts Constant
	 */
	define( 'THEMIFY_BUILDER_LAYOUTS_VERSION', '1.0.1' );
	
	// File Path
	define( 'THEMIFY_BUILDER_DIR', dirname(__FILE__) );
	define( 'THEMIFY_BUILDER_MODULES_DIR', THEMIFY_BUILDER_DIR . '/modules' );
	define( 'THEMIFY_BUILDER_TEMPLATES_DIR', THEMIFY_BUILDER_DIR . '/templates' );
	define( 'THEMIFY_BUILDER_CLASSES_DIR', THEMIFY_BUILDER_DIR . '/classes' );
	define( 'THEMIFY_BUILDER_INCLUDES_DIR', THEMIFY_BUILDER_DIR . '/includes' );
	define( 'THEMIFY_BUILDER_LIBRARIES_DIR', THEMIFY_BUILDER_INCLUDES_DIR . '/libraries' );

	// URI Constant
	define( 'THEMIFY_BUILDER_URI', plugins_url( '' , __FILE__ ) );

	// Include files
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-model.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-form.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-layouts.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-module.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-import-export.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-plugin-compat.php' );
	require_once( THEMIFY_BUILDER_CLASSES_DIR . '/class-themify-builder-options.php' );
	require_once( THEMIFY_BUILDER_INCLUDES_DIR . '/themify-builder-options.php' );

	// Load Localization
	load_plugin_textdomain( 'themify', false, dirname(plugin_basename(__FILE__)) . '/languages/' );

	if ( Themify_Builder_Model::builder_check() ) {
		// instantiate the plugin class
		$Themify_Builder_Layouts = new Themify_Builder_Layouts();
		$ThemifyBuilder = new Themify_Builder();
		$themify_builder_plugin_compat = new Themify_Builder_Plugin_Compat();
		$themify_builder_import_export = new Themify_Builder_Import_Export();

		// initiate metabox panel
		themify_build_write_panels(array());
	}

	// register builder options page
	if ( class_exists( 'Themify_Builder_Options' ) ) {
		$ThemifyBuilderOptions = new Themify_Builder_Options();
		// Include Updater
		if ( is_admin() && current_user_can( 'update_plugins' ) ) {
			require_once( THEMIFY_BUILDER_DIR . '/themify-builder-updater.php' );
			$themify_builder_updater = new Themify_Builder_Updater( 'themify-builder', THEMIFY_BUILDER_VERSION, THEMIFY_BUILDER_SLUG );
		}
	}
}

if ( ! function_exists('themify_builder_edit_module_panel') ) {
	/**
	 * Hook edit module frontend panel
	 * @param $mod_name
	 * @param $mod_settings
	 */
	function themify_builder_edit_module_panel( $mod_name, $mod_settings ) {
		do_action( 'themify_builder_edit_module_panel', $mod_name, $mod_settings );
	}
}

if ( ! function_exists( 'themify_builder_grid_lists' ) ) {
	/**
	 * Get Grid menu list
	 */
	function themify_builder_grid_lists( $handle = 'row', $set_gutter = null ) {
		$grid_lists = Themify_Builder_Model::get_grid_settings();
		$gutters = Themify_Builder_Model::get_grid_settings( 'gutter' );
		$selected_gutter = is_null( $set_gutter ) ? '' : $set_gutter; ?>
		<div class="grid_menu" data-handle="<?php echo esc_attr( $handle ); ?>">
			<div class="grid_icon ti-layout-column3"></div>
			<div class="themify_builder_grid_list_wrapper">
				<ul class="themify_builder_grid_list clearfix">
					<?php foreach( $grid_lists as $row ): ?>
					<li>
						<ul>
							<?php foreach( $row as $li ): ?>
								<li><a href="#" class="themify_builder_column_select <?php echo esc_attr( 'grid-layout-' . implode( '-', $li['data'] ) ); ?>" data-handle="<?php echo esc_attr( $handle ); ?>" data-grid="<?php echo esc_attr( json_encode( $li['data'] ) ); ?>"><img src="<?php echo esc_url( $li['img'] ); ?>"></a></li>
							<?php endforeach; ?>
						</ul>
					</li>
					<?php endforeach; ?>
				</ul>

				<select class="gutter_select" data-handle="<?php echo esc_attr( $handle ); ?>">
					<?php foreach( $gutters as $gutter ): ?>
					<option value="<?php echo esc_attr( $gutter['value'] ); ?>"<?php selected( $selected_gutter, $gutter['value'] ); ?>><?php echo esc_html( $gutter['name'] ); ?></option>
					<?php endforeach; ?>
				</select>
				<small><?php _e('Gutter Spacing', 'themify') ?></small>

			</div>
			<!-- /themify_builder_grid_list_wrapper -->
		</div>
		<!-- /grid_menu -->
		<?php
	}
}