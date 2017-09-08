<?php

class Themify_Tiles {

	private static $instance = null;
	var $mobile_breakpoint = 768;

	/**
	 * Creates or returns an instance of this class.
	 *
	 * @return	A single instance of this class.
	 */
	public static function get_instance() {
		return null == self::$instance ? self::$instance = new self : self::$instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'load_themify_library' ), 1 );
		add_action( 'init', array( $this, 'i18n' ), 5 );
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue' ) );
		add_action( 'wp_head', array( $this, 'dynamic_css' ) );
		add_action( 'admin_footer', array( $this, 'admin_footer' ) );
		add_shortcode( 'themify_tiles', array( $this, 'shortcode' ) );

		if( is_admin() ) {
			add_action( 'wp_ajax_tf_preview_tile', array( $this, 'ajax_preview_tile' ) );
			add_action( 'wp_ajax_tf_get_tiles_edit', array( $this, 'ajax_get_tiles_edit' ) );
			add_action( 'wp_ajax_tf_save_tiles', array( $this, 'ajax_save_tiles' ) );
			add_action( 'wp_ajax_tf_clear_tiles', array( $this, 'ajax_clear_tiles' ) );
		}
	}

	/**
	 * Setup Themify library if its not already loaded
	 */
	public function load_themify_library() {
		if( ! defined( 'THEMIFY_DIR' ) ) {
			define( 'THEMIFY_VERSION', '2.0.9' );
			define( 'THEMIFY_DIR', THEMIFY_TILES_DIR . '/includes/themify' );
			define( 'THEMIFY_URI', THEMIFY_TILES_URI . '/includes/themify' );
			if ( ! class_exists( 'Themify_Mobile_Detect' ) ) {
				require_once THEMIFY_DIR . '/class-themify-mobile-detect.php';
				global $themify_mobile_detect;
				$themify_mobile_detect = new Themify_Mobile_Detect;
			}
			include( THEMIFY_TILES_DIR . 'includes/theme-options.php' );
			include( THEMIFY_DIR . '/themify-database.php' );
			include( THEMIFY_DIR . '/themify-utils.php' );
			include( THEMIFY_DIR . '/themify-wpajax.php' );
			if( ! function_exists( 'themify_builder_module_settings_field' ) ) {
				include( THEMIFY_TILES_DIR . 'includes/themify-builder/includes/themify-builder-options.php' );
			}
		}
	}

	public function i18n() {
		load_plugin_textdomain( 'themify-tiles', false, THEMIFY_TILES_DIR . 'languages/' );
	}

	function register_post_type() {
		$labels = array(
			'name'               => _x( 'Tiles Group', 'post type general name', 'themify-tiles' ),
			'singular_name'      => _x( 'Tile Group', 'post type singular name', 'themify-tiles' ),
			'menu_name'          => _x( 'Themify Tiles', 'admin menu', 'themify-tiles' ),
			'name_admin_bar'     => _x( 'Tile Group', 'add new on admin bar', 'themify-tiles' ),
			'add_new'            => _x( 'Add New', 'book', 'themify-tiles' ),
			'add_new_item'       => __( 'Add New Tile Group', 'themify-tiles' ),
			'new_item'           => __( 'New Tile Group', 'themify-tiles' ),
			'edit_item'          => __( 'Edit Tile Group', 'themify-tiles' ),
			'all_items'          => __( 'Manage Tiles', 'themify-tiles' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => false,
			'publicly_queryable' => false,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_nav_menus'  => false,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'book' ),
			'capability_type'    => 'post',
			'menu_position'      => 80, /* below Settings */
			'has_archive'        => false,
			'supports'           => array( 'title' ),
			'register_meta_box_cb' => array( $this, 'admin_metabox' )
		);

		register_post_type( 'themify_tile', $args );
	}

	public function admin_metabox( $post ) {
		add_meta_box(
			'themify-tiles',
			__( 'Tiles', 'themify-tiles' ),
			array( $this, 'tiles_metabox' ),
			'themify_tile',
			'normal'
		);
	}

	public function tiles_metabox( $post ) {
		global $hook_suffix;
		echo $this->load_view( 'tiles-edit.php', array(
			'post_id' => $post->ID,
			'data' => $this->get_tiles_data( $post->ID )
		) );
		if( 'post.php' == $hook_suffix ) {
			echo __( 'To display this tile group you can use this shortcode:', 'themify-tiles' );
			echo '<br/><code>[themify_tiles group="'. $post->ID .'"]</code>';
			echo '<br/><code>[themify_tiles group="'. $post->post_name .'"]</code>';
		}
	}

	public function shortcode( $atts, $content = '' ) {
		$output = '';
		if( isset( $atts['group'] ) ) {
			if( ! is_numeric( $atts['group'] ) ) {
				global $wpdb;
				$atts['group'] = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type= %s AND post_status = 'publish'", $atts['group'], 'themify_tile' ) );
			}
			$post = get_post( $atts['group'] );
			if( $post && $post->post_type == 'themify_tile' ) {
				$output .= $this->render_tiles( $atts['group'] );
				ob_start();
				edit_post_link( __( 'Edit this Tile Group', 'themify-tiles' ), '<p style="clear: both;">', '</p>', $atts['group'] );
				$output .= ob_get_clean();
			}
		}

		return apply_filters( 'themify_tiles_output', $output, $atts );
	}

	function is_admin_screen() {
		global $hook_suffix, $post;
		if( ( 'post.php' == $hook_suffix || 'post-new.php' == $hook_suffix ) && $post->post_type == 'themify_tile' ) {
			return true;
		}
		return false;
	}

	public function render_tiles( $group_id ) {
		$post = get_post( $group_id );
		$output = '';
		if( $post && $post->post_type == 'themify_tile' ) {
			$data = $this->get_tiles_data( $group_id );
			$template = 'template-tiles.php';
			$output .= $this->load_view( $template, array(
				'data' => $data,
				'post_id' => $group_id
			) );
		}

		return $output;
	}

	/**
	 * Get the saved tiles data for a post
	 *
	 * @return mixed
	 * @since 1.0
	 */
	public function get_tiles_data( $post_id = null ) {
		if( ! $post_id )
			$post_id = get_the_ID();

		return get_post_meta( $post_id, '_themify_tiles', true );
	}

	/**
	 * Get the physical path to a view file
	 *
	 * @return string template path, false if fails
	 * @since 1.0
	 */
	public function get_view_path( $name ) {
		if( locate_template( 'themify-tiles/' . $name ) ) {
			return locate_template( 'themify-tiles/' . $name );
		} elseif( file_exists( THEMIFY_TILES_DIR . 'views/' . $name ) ) {
			return THEMIFY_TILES_DIR . 'views/' . $name;
		}

		return false;
	}

	public function load_view( $name, $data = array() ) {
		extract( $data );
		if( $view = $this->get_view_path( $name ) ) {
			ob_start();
			include( $view );
			return ob_get_clean();
		}

		return '';
	}

	/**
	 * Queue the necessary assets to render the tiles on front end
	 *
	 * @since 1.0
	 */
	public function enqueue() {
		// assets shared with Builder
		wp_enqueue_script( 'themify-smartresize', THEMIFY_TILES_URI . 'assets/jquery.smartresize.js', array( 'jquery' ), THEMIFY_TILES_VERSION, true );
		wp_enqueue_script( 'themify-widegallery', THEMIFY_TILES_URI . 'assets/themify.widegallery.js', array( 'jquery', 'jquery-masonry' ), THEMIFY_TILES_VERSION, true );
		wp_enqueue_style( 'themify-animate', THEMIFY_TILES_URI . 'includes/themify-builder/css/animate.min.css', array(), THEMIFY_TILES_VERSION );

		if ( ! wp_script_is( 'themify-carousel-js' ) ) {
			wp_enqueue_script( 'themify-carousel-js', THEMIFY_URI . '/js/carousel.js', array('jquery') ); // grab from themify framework
		}
		wp_register_script( 'themify-builder-map-script', themify_https_esc( 'http://maps.google.com/maps/api/js' ) . '?sensor=false', array(), false, true );

		wp_enqueue_style( 'themify-tiles', THEMIFY_TILES_URI . 'assets/style.css', null, THEMIFY_TILES_VERSION );

		wp_enqueue_script( 'themify-tiles', THEMIFY_TILES_URI . 'assets/script.js', array( 'jquery', 'jquery-masonry' ), THEMIFY_TILES_VERSION, true );
		wp_localize_script( 'themify-tiles', 'ThemifyTiles', apply_filters( 'themify_tiles_script_vars', array(
			'ajax_nonce'	=> wp_create_nonce('ajax_nonce'),
			'ajax_url'		=> admin_url( 'admin-ajax.php' ),
			'networkError'	=> __('Unknown network error. Please try again later.', 'themify'),
			'termSeparator'	=> ', ',
			'galleryFadeSpeed' => '300',
			'galleryEvent' => 'click',
			'transition_duration' => 750,
			'isOriginLeft' => is_rtl() ? 0 : 1,
		) ) );

		wp_enqueue_style( 'themify-font-icons-css', THEMIFY_URI . '/fontawesome/css/font-awesome.min.css', array(), THEMIFY_TILES_VERSION );
	}

	/**
	 * Queue the necessary assets for the tiles editor
	 *
	 * @since 1.0
	 */
	public function admin_enqueue() {
		global $post;

		if( ! $this->is_admin_screen() )
			return;

		/* load assets for front end, needed for preview */
		$this->enqueue();
		/* add the CSS codes to set the tile sizes */
		$this->dynamic_css();

		wp_enqueue_media();

		// assets borrowed from Builder & framework
		wp_enqueue_style( 'colorpicker', THEMIFY_URI . '/css/jquery.minicolors.css' );
		wp_enqueue_script( 'colorpicker-js', THEMIFY_URI . '/js/jquery.minicolors.js', array( 'jquery' ) );
		wp_enqueue_script( 'themify-font-icons-js', THEMIFY_URI . '/js/themify.font-icons-select.js', array( 'jquery' ) );
		add_action( 'admin_footer', 'themify_font_icons_dialog' );
		wp_enqueue_style( 'themify-builder-main', THEMIFY_TILES_URI . 'includes/themify-builder/css/themify-builder-main.css', array() );
		wp_enqueue_style( 'themify-builder-admin-ui', THEMIFY_TILES_URI . 'includes/themify-builder/css/themify-builder-admin-ui.css', array() );
		wp_enqueue_script( 'themify-plupload', THEMIFY_URI . '/js/plupload.js', array('jquery', 'themify-scripts'), false);
		wp_register_script( 'gallery-shortcode', THEMIFY_URI . '/js/gallery-shortcode.js', array( 'jquery', 'themify-scripts' ), false, true );
		wp_enqueue_script( 'themify-builder-map-script' );

		wp_enqueue_style( 'themify-tiles-admin', THEMIFY_TILES_URI . 'assets/admin.css' );
		wp_enqueue_script( 'themify-tiles-admin', THEMIFY_TILES_URI . 'assets/admin.js', array( 'jquery', 'jquery-ui-draggable', 'jquery-ui-sortable', 'jquery-ui-tabs', 'plupload-all' ), THEMIFY_TILES_VERSION, true );
		wp_localize_script( 'themify-tiles-admin', 'ThemifyTilesAdmin', array(
			'post_id' => $post->ID
		) );
		wp_localize_script( 'themify-tiles-admin', 'themify_builder_plupload_init', $this->get_builder_plupload_init() );

		/* Script files to load only if Builder is not loaded */
		if( ! wp_script_is( 'themify-builder-front-ui-js' ) ) {
			wp_enqueue_script( 'themify-tiles-builder-compat', THEMIFY_TILES_URI . 'assets/builder-compat.js', array( 'jquery' ) );
		}

		wp_enqueue_style( 'themify-icons', THEMIFY_URI . '/themify-icons/themify-icons.css', array(), THEMIFY_TILES_VERSION );
	}

	public function admin_footer() {
		echo '<script type="text/html" id="themify-tiles-settings">';
		$options = include( $this->get_view_path( 'config.php' ) );
		themify_builder_module_settings_field( $options['options'], '' );
		echo '<div id="tf-tiles-save-settings"><a href="#" class="builder_button">'. __( 'Save', 'themify-tiles' ) .'</a></div>';
		echo '</script>';
	}

	public function ajax_preview_tile() {
		if( isset( $_POST['tf_tile'] ) ) {
			$data = stripslashes_deep( (array) $_POST['tf_tile'] );
			$post_id = $_POST['tf_post_id'];
			echo $this->load_view( 'tile-single.php', array(
				'mod_settings' => $data,
				'module_ID' => 'tf-tile-' . $post_id . '-' . uniqid(),
			) );
		}

		die;
	}

	public function ajax_save_tiles() {
		if( isset( $_POST['tf_post_id'] ) ) {
			$post_id = $_POST['tf_post_id'];
			$tiles_data = $_POST['tf_data'];
			$tiles_data = array_map( 'stripcslashes', $tiles_data );
			$tiles_data = array_map( 'json_decode', $tiles_data );

			update_post_meta( $post_id, '_themify_tiles', $tiles_data );

			echo '1';
		}

		die;
	}

	public function get_tile_sizes() {
		return apply_filters( 'builder_tiles_sizes', array(
			'square-large' => array( 'label' => __( 'Square Large', 'themify-tiles' ), 'width' => 480, 'height' => 480, 'mobile_width' => 280, 'mobile_height' => 280, 'image' => THEMIFY_TILES_URI . 'assets/size-sl.png' ),
			'square-small' => array( 'label' => __( 'Square Small', 'themify-tiles' ), 'width' => 240, 'height' => 240, 'mobile_width' => 140, 'mobile_height' => 140, 'image' => THEMIFY_TILES_URI . 'assets/size-ss.png' ),
			'landscape' => array( 'label' => __( 'Landscape', 'themify-tiles' ), 'width' => 480, 'height' => 240, 'mobile_width' => 280, 'mobile_height' => 140, 'image' => THEMIFY_TILES_URI . 'assets/size-l.png' ),
			'portrait' => array( 'label' => __( 'Portrait', 'themify-tiles' ), 'width' => 240, 'height' => 480, 'mobile_width' => 140, 'mobile_height' => 280, 'image' => THEMIFY_TILES_URI . 'assets/size-p.png' ),
		) );
	}

	public function dynamic_css() {
		$css = '';
		foreach( $this->get_tile_sizes() as $key => $size ) {
			$css .= sprintf( '
			.tf-tile.size-%1$s,
			.tf-tile.size-%1$s .map-container {
				width: %2$spx;
				height: %3$spx;
			}
			@media (max-width: ' . $this->mobile_breakpoint . 'px) {
				.tf-tile.size-%1$s,
				.tf-tile.size-%1$s .map-container {
					width: %4$spx;
					height: %5$spx;
				}
			}',
				$key,
				$size['width'],
				$size['height'],
				$size['mobile_width'],
				$size['mobile_height']
			);
		}
		echo sprintf( '<style>%s</style>', $css );
	}

	/**
	 * Get RGBA color format from hex color
	 *
	 * @return string
	 */
	function get_rgba_color( $color ) {
		$color = explode( '_', $color );
		$opacity = isset( $color[1] ) ? $color[1] : '1';
		return 'rgba(' . $this->hex2rgb( $color[0] ) . ', ' . $opacity . ')';
	}

	/**
	 * Converts color in hexadecimal format to RGB format.
	 *
	 * @since 1.9.6
	 *
	 * @param string $hex Color in hexadecimal format.
	 * @return string Color in RGB components separated by comma.
	 */
	function hex2rgb( $hex ) {
		$hex = str_replace( "#", "", $hex );

		if ( strlen( $hex ) == 3 ) {
			$r = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
			$g = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
			$b = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
		} else {
			$r = hexdec( substr( $hex, 0, 2 ) );
			$g = hexdec( substr( $hex, 2, 2 ) );
			$b = hexdec( substr( $hex, 4, 2 ) );
		}
		return implode( ',', array( $r, $g, $b ) );
	}

	/**
	 * Get images from gallery shortcode
	 * @return object
	 */
	function get_images_from_gallery_shortcode( $shortcode ) {
		preg_match( '/\[gallery.*ids=.(.*).\]/', $shortcode, $ids );
		$image_ids = explode( ",", $ids[1] );
		$orderby = $this->get_gallery_param_option( $shortcode, 'orderby' );
		$orderby = $orderby != '' ? $orderby : 'post__in';
		$order = $this->get_gallery_param_option( $shortcode, 'order' );
		$order = $order != '' ? $order : 'ASC';

		// Check if post has more than one image in gallery
		return get_posts( array(
			'post__in' => $image_ids,
			'post_type' => 'attachment',
			'post_mime_type' => 'image',
			'numberposts' => -1,
			'orderby' => $orderby,
			'order' => $order
		) );
	}

	/**
	 * Get gallery shortcode options
	 * @param $shortcode
	 * @param $param
	 */
	function get_gallery_param_option( $shortcode, $param = 'link' ) {
		if ( $param == 'link' ) {
			preg_match( '/\[gallery .*?(?=link)link=.([^\']+)./si', $shortcode, $out );
		} elseif ( $param == 'order' ) {
			preg_match( '/\[gallery .*?(?=order)order=.([^\']+)./si', $shortcode, $out );	
		} elseif ( $param == 'orderby' ) {
			preg_match( '/\[gallery .*?(?=orderby)orderby=.([^\']+)./si', $shortcode, $out );	
		} elseif ( $param == 'columns' ) {
			preg_match( '/\[gallery .*?(?=columns)columns=.([^\']+)./si', $shortcode, $out );	
		}
		
		$out = isset($out[1]) ? explode( '"', $out[1] ) : array('');
		return $out[0];
	}

	/**
	 * Get initialization parameters for plupload. Filtered through themify_tiles_plupload_init_vars.
	 * @return mixed|void
	 * @since 1.4.2
	 */
	function get_builder_plupload_init() {
		return apply_filters( 'themify_tiles_plupload_init_vars', array(
			'runtimes'				=> 'html5,flash,silverlight,html4',
			'browse_button'			=> 'themify-builder-plupload-browse-button', // adjusted by uploader
			'container' 			=> 'themify-builder-plupload-upload-ui', // adjusted by uploader
			'drop_element' 			=> 'drag-drop-area', // adjusted by uploader
			'file_data_name' 		=> 'async-upload', // adjusted by uploader
			'multiple_queues' 		=> true,
			'max_file_size' 		=> wp_max_upload_size() . 'b',
			'url' 					=> admin_url('admin-ajax.php'),
			'flash_swf_url' 		=> includes_url('js/plupload/plupload.flash.swf'),
			'silverlight_xap_url' 	=> includes_url('js/plupload/plupload.silverlight.xap'),
			'filters' 				=> array( array(
				'title' => __( 'Allowed Files', 'themify-tiles' ),
				'extensions' => 'jpg,jpeg,gif,png,zip,txt'
			)),
			'multipart' 			=> true,
			'urlstream_upload' 		=> true,
			'multi_selection' 		=> false, // added by uploader
			 // additional post data to send to our ajax hook
			'multipart_params' 		=> array(
				'_ajax_nonce' 		=> '', // added by uploader
				'action' 			=> 'themify_builder_plupload_action', // the ajax action name
				'imgid' 			=> 0 // added by uploader
			)
		));
	}
}