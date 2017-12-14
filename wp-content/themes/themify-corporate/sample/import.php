<?php

defined( 'ABSPATH' ) or die;

$GLOBALS['processed_terms'] = array();
$GLOBALS['processed_posts'] = array();

require_once ABSPATH . 'wp-admin/includes/post.php';
require_once ABSPATH . 'wp-admin/includes/taxonomy.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

function themify_import_post( $post ) {
	global $processed_posts, $processed_terms;

	if ( ! post_type_exists( $post['post_type'] ) ) {
		return;
	}

	/* Menu items don't have reliable post_title, skip the post_exists check */
	if( $post['post_type'] !== 'nav_menu_item' ) {
		$post_exists = post_exists( $post['post_title'], '', $post['post_date'] );
		if ( $post_exists && get_post_type( $post_exists ) == $post['post_type'] ) {
			$processed_posts[ intval( $post['ID'] ) ] = intval( $post_exists );
			return;
		}
	}

	if( $post['post_type'] == 'nav_menu_item' ) {
		if( ! isset( $post['tax_input']['nav_menu'] ) || ! term_exists( $post['tax_input']['nav_menu'], 'nav_menu' ) ) {
			return;
		}
		$_menu_item_type = $post['meta_input']['_menu_item_type'];
		$_menu_item_object_id = $post['meta_input']['_menu_item_object_id'];

		if ( 'taxonomy' == $_menu_item_type && isset( $processed_terms[ intval( $_menu_item_object_id ) ] ) ) {
			$post['meta_input']['_menu_item_object_id'] = $processed_terms[ intval( $_menu_item_object_id ) ];
		} else if ( 'post_type' == $_menu_item_type && isset( $processed_posts[ intval( $_menu_item_object_id ) ] ) ) {
			$post['meta_input']['_menu_item_object_id'] = $processed_posts[ intval( $_menu_item_object_id ) ];
		} else if ( 'custom' != $_menu_item_type ) {
			// associated object is missing or not imported yet, we'll retry later
			// $missing_menu_items[] = $item;
			return;
		}
	}

	$post_parent = ( $post['post_type'] == 'nav_menu_item' ) ? $post['meta_input']['_menu_item_menu_item_parent'] : (int) $post['post_parent'];
	$post['post_parent'] = 0;
	if ( $post_parent ) {
		// if we already know the parent, map it to the new local ID
		if ( isset( $processed_posts[ $post_parent ] ) ) {
			if( $post['post_type'] == 'nav_menu_item' ) {
				$post['meta_input']['_menu_item_menu_item_parent'] = $processed_posts[ $post_parent ];
			} else {
				$post['post_parent'] = $processed_posts[ $post_parent ];
			}
		}
	}

	/**
	 * for hierarchical taxonomies, IDs must be used so wp_set_post_terms can function properly
	 * convert term slugs to IDs for hierarchical taxonomies
	 */
	if( ! empty( $post['tax_input'] ) ) {
		foreach( $post['tax_input'] as $tax => $terms ) {
			if( is_taxonomy_hierarchical( $tax ) ) {
				$terms = explode( ', ', $terms );
				$post['tax_input'][ $tax ] = array_map( 'themify_get_term_id_by_slug', $terms, array_fill( 0, count( $terms ), $tax ) );
			}
		}
	}

	$post['post_author'] = (int) get_current_user_id();
	$post['post_status'] = 'publish';

	$old_id = $post['ID'];

	unset( $post['ID'] );
	$post_id = wp_insert_post( $post, true );
	if( is_wp_error( $post_id ) ) {
		return false;
	} else {
		$processed_posts[ $old_id ] = $post_id;

		if( isset( $post['has_thumbnail'] ) && $post['has_thumbnail'] ) {
			$placeholder = themify_get_placeholder_image();
			if( ! is_wp_error( $placeholder ) ) {
				set_post_thumbnail( $post_id, $placeholder );
			}
		}

		return $post_id;
	}
}

function themify_get_placeholder_image() {
	static $placeholder_image = null;

	if( $placeholder_image == null ) {
		if ( ! function_exists( 'WP_Filesystem' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}
		WP_Filesystem();
		global $wp_filesystem;
		$upload = wp_upload_bits( $post['post_name'] . '.jpg', null, $wp_filesystem->get_contents( THEMIFY_DIR . '/img/image-placeholder.jpg' ) );

		if ( $info = wp_check_filetype( $upload['file'] ) )
			$post['post_mime_type'] = $info['type'];
		else
			return new WP_Error( 'attachment_processing_error', __( 'Invalid file type', 'themify' ) );

		$post['guid'] = $upload['url'];
		$post_id = wp_insert_attachment( $post, $upload['file'] );
		wp_update_attachment_metadata( $post_id, wp_generate_attachment_metadata( $post_id, $upload['file'] ) );

		$placeholder_image = $post_id;
	}

	return $placeholder_image;
}

function themify_import_term( $term ) {
	global $processed_terms;

	if( $term_id = term_exists( $term['slug'], $term['taxonomy'] ) ) {
		if ( is_array( $term_id ) ) $term_id = $term_id['term_id'];
		if ( isset( $term['term_id'] ) )
			$processed_terms[ intval( $term['term_id'] ) ] = (int) $term_id;
		return (int) $term_id;
	}

	if ( empty( $term['parent'] ) ) {
		$parent = 0;
	} else {
		$parent = term_exists( $term['parent'], $term['taxonomy'] );
		if ( is_array( $parent ) ) $parent = $parent['term_id'];
	}

	$id = wp_insert_term( $term['name'], $term['taxonomy'], array(
		'parent' => $parent,
		'slug' => $term['slug'],
		'description' => $term['description'],
	) );
	if ( ! is_wp_error( $id ) ) {
		if ( isset( $term['term_id'] ) ) {
			$processed_terms[ intval($term['term_id']) ] = $id['term_id'];
			return $term['term_id'];
		}
	}

	return false;
}

function themify_get_term_id_by_slug( $slug, $tax ) {
	$term = get_term_by( 'slug', $slug, $tax );
	if( $term ) {
		return $term->term_id;
	}

	return false;
}

function themify_undo_import_term( $term ) {
	$term_id = term_exists( $term['slug'], $term['term_taxonomy'] );
	if ( $term_id ) {
		if ( is_array( $term_id ) ) $term_id = $term_id['term_id'];
		if ( isset( $term_id ) ) {
			wp_delete_term( $term_id, $term['term_taxonomy'] );
		}
	}
}

/**
 * Determine if a post exists based on title, content, and date
 *
 * @global wpdb $wpdb WordPress database abstraction object.
 *
 * @param array $args array of database parameters to check
 * @return int Post ID if post exists, 0 otherwise.
 */
function themify_post_exists( $args = array() ) {
	global $wpdb;

	$query = "SELECT ID FROM $wpdb->posts WHERE 1=1";
	$db_args = array();

	foreach ( $args as $key => $value ) {
		$value = wp_unslash( sanitize_post_field( $key, $value, 0, 'db' ) );
		if( ! empty( $value ) ) {
			$query .= ' AND ' . $key . ' = %s';
			$db_args[] = $value;
		}
	}

	if ( !empty ( $args ) )
		return (int) $wpdb->get_var( $wpdb->prepare($query, $args) );

	return 0;
}

function themify_undo_import_post( $post ) {
	if( $post['post_type'] == 'nav_menu_item' ) {
		$post_exists = themify_post_exists( array(
			'post_name' => $post['post_name'],
			'post_modified' => $post['post_date'],
			'post_type' => 'nav_menu_item',
		) );
	} else {
		$post_exists = post_exists( $post['post_title'], '', $post['post_date'] );
	}
	if( $post_exists && get_post_type( $post_exists ) == $post['post_type'] ) {
		/**
		 * check if the post has been modified, if so leave it be
		 *
		 * NOTE: posts are imported using wp_insert_post() which modifies post_modified field
		 * to be the same as post_date, hence to check if the post has been modified,
		 * the post_modified field is compared against post_date in the original post.
		 */
		if( $post['post_date'] == get_post_field( 'post_modified', $post_exists ) ) {
			wp_delete_post( $post_exists, true ); // true: bypass trash
		}
	}
}

function themify_do_demo_import() {
$term = array (
  'term_id' => 25,
  'name' => 'Blog',
  'slug' => 'blog',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 26,
  'name' => 'Images',
  'slug' => 'images',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 27,
  'name' => 'News',
  'slug' => 'news',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 28,
  'name' => 'Sports',
  'slug' => 'sports',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 27,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 31,
  'name' => 'Video',
  'slug' => 'video',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 35,
  'name' => 'Lifestyle',
  'slug' => 'lifestyle',
  'term_group' => 0,
  'taxonomy' => 'category',
  'description' => '',
  'parent' => 27,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 36,
  'name' => 'gallery',
  'slug' => 'gallery-2',
  'term_group' => 0,
  'taxonomy' => 'post_tag',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 13,
  'name' => 'Games',
  'slug' => 'games',
  'term_group' => 0,
  'taxonomy' => 'product_cat',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 22,
  'name' => 'Tshirts',
  'slug' => 'tshirts',
  'term_group' => 0,
  'taxonomy' => 'product_cat',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 23,
  'name' => 'Shoes',
  'slug' => 'shoes',
  'term_group' => 0,
  'taxonomy' => 'product_cat',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 24,
  'name' => 'Jacket',
  'slug' => 'jacket',
  'term_group' => 0,
  'taxonomy' => 'product_cat',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 48,
  'name' => 'Team',
  'slug' => 'team',
  'term_group' => 0,
  'taxonomy' => 'team-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 49,
  'name' => 'Testimonials',
  'slug' => 'testimonials',
  'term_group' => 0,
  'taxonomy' => 'testimonial-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 61,
  'name' => 'Uncategorized',
  'slug' => 'uncategorized',
  'term_group' => 0,
  'taxonomy' => 'testimonial-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 63,
  'name' => 'Team',
  'slug' => 'team',
  'term_group' => 0,
  'taxonomy' => 'testimonial-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 43,
  'name' => 'Illustrations',
  'slug' => 'illustrations',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 44,
  'name' => 'Photos',
  'slug' => 'photos',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 51,
  'name' => 'Videos',
  'slug' => 'videos',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 52,
  'name' => 'Vintage',
  'slug' => 'vintage',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 57,
  'name' => 'Misc',
  'slug' => 'misc',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 59,
  'name' => 'Uncategorized',
  'slug' => 'uncategorized',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 62,
  'name' => 'Featured',
  'slug' => 'featured',
  'term_group' => 0,
  'taxonomy' => 'portfolio-category',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 55,
  'name' => 'Main Nav',
  'slug' => 'main-nav',
  'term_group' => 0,
  'taxonomy' => 'nav_menu',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 56,
  'name' => 'Single Page Menu',
  'slug' => 'single-page-menu',
  'term_group' => 0,
  'taxonomy' => 'nav_menu',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$term = array (
  'term_id' => 58,
  'name' => 'Test Scroll-to-Anchor',
  'slug' => 'test-scroll-to-anchor',
  'term_group' => 0,
  'taxonomy' => 'nav_menu',
  'description' => '',
  'parent' => 0,
);
if( ERASEDEMO ) {
	themify_undo_import_term( $term );
} else {
	themify_import_term( $term );
}

$post = array (
  'ID' => 2083,
  'post_date' => '2008-06-11 20:22:47',
  'post_date_gmt' => '2008-06-11 20:22:47',
  'post_content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac lobortis orci, a ornare dui. Phasellus consequat vulputate dignissim. Etiam condimentum aliquam augue, a ullamcorper erat facilisis et. Proin congue augue sit amet ligula dictum porta. Integer pharetra euismod velit ac laoreet. Ut dictum vitae ligula sed fermentum. Sed dapibus purus sit amet massa faucibus varius. Proin nec malesuada libero.',
  'post_title' => 'Butterfly Light',
  'post_excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac lobortis orci...',
  'post_name' => 'butterfly-light',
  'post_modified' => '2017-08-21 06:26:41',
  'post_modified_gmt' => '2017-08-21 06:26:41',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=6',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2084,
  'post_date' => '2008-06-11 20:27:11',
  'post_date_gmt' => '2008-06-11 20:27:11',
  'post_content' => 'Integer ultrices turpis laoreet tellus venenatis, sed luctus libero gravida. Vestibulum eu hendrerit eros. Quisque eget luctus turpis, eget cursus velit. Nullam auctor ligula velit, fringilla molestie elit mattis et. Donec volutpat adipiscing urna, at egestas odio venenatis aliquet.',
  'post_title' => 'Sunset',
  'post_excerpt' => 'Integer ultrices turpis laoreet tellus venenatis, sed luctus libero gravida.',
  'post_name' => 'sunset',
  'post_modified' => '2017-08-21 06:26:39',
  'post_modified_gmt' => '2017-08-21 06:26:39',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=8',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2085,
  'post_date' => '2008-06-11 20:38:30',
  'post_date_gmt' => '2008-06-11 20:38:30',
  'post_content' => 'Vestibulum a quam nisl. Nam sagittis neque erat, sed egestas urna facilisis et. Cras interdum imperdiet est, ac porttitor sapien porttitor id. Aenean semper congue dolor, non malesuada sapien. Sed neque diam, cursus eget eros at, pretium sagittis ligula. Sed pretium urna vitae velit pharetra',
  'post_title' => 'Late Stroll',
  'post_excerpt' => 'Vestibulum a quam nisl. Nam sagittis neque erat, sed egestas urna facilisis et.',
  'post_name' => 'late-stroll',
  'post_modified' => '2017-08-21 06:26:38',
  'post_modified_gmt' => '2017-08-21 06:26:38',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=22',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2086,
  'post_date' => '2008-06-11 20:41:16',
  'post_date_gmt' => '2008-06-11 20:41:16',
  'post_content' => 'Etiam ipsum ligula, mollis eu vestibulum id, ornare vel nibh. Sed sollicitudin, arcu non auctor pulvinar, velit eros viverra sapien, a mattis sem tortor sed arcu. Aenean gravida tincidunt commodo. In felis nunc, ultricies vel congue nec, congue vitae lacus.',
  'post_title' => 'Empty House',
  'post_excerpt' => 'Etiam ipsum ligula, mollis eu vestibulum id, ornare vel nibh. Sed sollicitudin, arcu non...',
  'post_name' => 'empty-house',
  'post_modified' => '2017-08-21 06:26:36',
  'post_modified_gmt' => '2017-08-21 06:26:36',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=25',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2087,
  'post_date' => '2008-06-11 20:42:29',
  'post_date_gmt' => '2008-06-11 20:42:29',
  'post_content' => 'Vestibulum malesuada neque nec hendrerit lobortis. Maecenas erat diam, fringilla et hendrerit eu, laoreet vel quam. Integer sollicitudin nec eros a fringilla. Mauris sed velit sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada.',
  'post_title' => 'Sweet Tooth',
  'post_excerpt' => 'Vestibulum malesuada neque nec hendrerit lobortis. Maecenas erat diam, fringilla...',
  'post_name' => 'sweet-tooth',
  'post_modified' => '2017-08-21 06:26:33',
  'post_modified_gmt' => '2017-08-21 06:26:33',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=28',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2088,
  'post_date' => '2008-06-11 20:45:36',
  'post_date_gmt' => '2008-06-11 20:45:36',
  'post_content' => 'Sed pharetra fringilla venenatis. Quisque quis lobortis nibh, nec egestas leo. Cras id augue id nulla interdum feugiat. Cras quam lacus, congue at consequat sit amet, consectetur id enim. Sed id lorem id turpis ultrices mattis at a odio.',
  'post_title' => 'Lightbox Link',
  'post_excerpt' => 'Sed pharetra fringilla venenatis. Quisque quis lobortis nibh, nec egestas leo.',
  'post_name' => 'lightbox-link',
  'post_modified' => '2017-08-21 06:26:31',
  'post_modified_gmt' => '2017-08-21 06:26:31',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=31',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
    'lightbox_link' => 'https://themify.me/demo/themes/builder/files/2013/06/129025022.jpg',
    'lightbox_icon' => 'on',
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2089,
  'post_date' => '2008-06-11 20:58:56',
  'post_date_gmt' => '2008-06-11 20:58:56',
  'post_content' => 'Sed pharetra fringilla venenatis. Quisque quis lobortis nibh, nec egestas leo. Pellentesque ornare auctor velit eget rutrum. Vivamus enim quam, commodo auctor erat sed, sodales tristique erat.

[gallery link="file" columns="6" ids="36,37,38,39,40,41"]',
  'post_title' => 'Gallery Post',
  'post_excerpt' => 'Sed pharetra fringilla venenatis. Quisque quis lobortis nibh, nec egestas leo.',
  'post_name' => 'gallery-post',
  'post_modified' => '2017-08-21 06:26:29',
  'post_modified_gmt' => '2017-08-21 06:26:29',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=34',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
    'post_tag' => 'gallery-2',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2091,
  'post_date' => '2008-06-11 21:16:04',
  'post_date_gmt' => '2008-06-11 21:16:04',
  'post_content' => 'Ut tempus nibh elit, eu faucibus lorem fringilla sed. Phasellus lobortis urna eget eleifend aliquet. Cras id augue id nulla interdum feugiat. Cras quam lacus, congue at consequat sit amet, consectetur id enim. Sed id lorem id turpis ultrices mattis at a odio.',
  'post_title' => 'External Link',
  'post_excerpt' => 'Ut tempus nibh elit, eu faucibus lorem fringilla sed. Phasellus lobortis urna eget.',
  'post_name' => 'external-link',
  'post_modified' => '2017-08-21 06:26:27',
  'post_modified_gmt' => '2017-08-21 06:26:27',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=50',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
    'external_link' => 'https://themify.me/',
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2092,
  'post_date' => '2008-06-11 21:19:37',
  'post_date_gmt' => '2008-06-11 21:19:37',
  'post_content' => 'Mauris faucibus, tellus sed commodo luctus, nibh libero tristique felis, a vulputate nibh tellus et purus. Donec dictum odio non magna accumsan pellentesque. Sed pharetra fringilla venenatis. Quisque quis lobortis nibh, nec egestas leo.',
  'post_title' => 'Landscape',
  'post_excerpt' => 'Mauris faucibus, tellus sed commodo luctus, nibh libero tristique felis, a vulputate nibh...',
  'post_name' => 'landscape',
  'post_modified' => '2017-08-21 06:26:25',
  'post_modified_gmt' => '2017-08-21 06:26:25',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=53',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog, images',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2407,
  'post_date' => '2013-07-12 06:15:51',
  'post_date_gmt' => '2013-07-12 06:15:51',
  'post_content' => 'Maecenas tincidunt congue purus. Donec fringilla felis vel dolor consectetur, vel gravida quam molestie. Curabitur ut orci a sapien feugiat auctor in sit amet nisl. Morbi justo metus, dapibus a dignissim a, accumsan sit amet odio.

Duis venenatis at diam sed aliquet. Nunc interdum odio et nibh euismod laoreet. Sed non ultrices dui, sit amet adipiscing libero. Maecenas accumsan quam eleifend quam facilisis, sit amet aliquet neque mollis. Cras sit amet sollicitudin sem. Sed tincidunt rhoncus urna a pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque malesuada accumsan ante ac imperdiet. Quisque eu elementum urna. Maecenas venenatis imperdiet enim at bibendum. Duis eget convallis felis, id sollicitudin mauris. Nam sem metus, sagittis non feugiat vel, porttitor eu arcu. Sed dictum, nulla ac laoreet accumsan, dui sapien vestibulum nibh, in pharetra dolor dui eu erat. Ut feugiat dictum egestas. Nam eget arcu quis mauris imperdiet pulvinar.',
  'post_title' => 'Classic Car on the Beach',
  'post_excerpt' => '',
  'post_name' => 'car',
  'post_modified' => '2017-08-21 06:26:15',
  'post_modified_gmt' => '2017-08-21 06:26:15',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=79',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 82,
  'post_date' => '2013-07-12 06:24:06',
  'post_date_gmt' => '2013-07-12 06:24:06',
  'post_content' => 'Maecenas tincidunt congue purus. Donec fringilla felis vel dolor consectetur, vel gravida quam molestie. Curabitur ut orci a sapien feugiat auctor in sit amet nisl. Morbi justo metus, dapibus a dignissim a, accumsan sit amet odio.

Duis venenatis at diam sed aliquet. Nunc interdum odio et nibh euismod laoreet. Sed non ultrices dui, sit amet adipiscing libero. Maecenas accumsan quam eleifend quam facilisis, sit amet aliquet neque mollis. Cras sit amet sollicitudin sem. Sed tincidunt rhoncus urna a pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque malesuada accumsan ante ac imperdiet. Quisque eu elementum urna. Maecenas venenatis imperdiet enim at bibendum. Duis eget convallis felis, id sollicitudin mauris. Nam sem metus, sagittis non feugiat vel, porttitor eu arcu. Sed dictum, nulla ac laoreet accumsan, dui sapien vestibulum nibh, in pharetra dolor dui eu erat. Ut feugiat dictum egestas. Nam eget arcu quis mauris imperdiet pulvinar.',
  'post_title' => 'Meet My Best Friend',
  'post_excerpt' => '',
  'post_name' => 'meet-my-best-friend',
  'post_modified' => '2017-08-21 06:26:11',
  'post_modified_gmt' => '2017-08-21 06:26:11',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=82',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 84,
  'post_date' => '2013-07-12 06:19:32',
  'post_date_gmt' => '2013-07-12 06:19:32',
  'post_content' => 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce tristique placerat nisi et ultricies. Aliquam orci nisl, cursus vitae venenatis sit amet, laoreet in lacus. Integer ac ullamcorper sem, vel auctor ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla mattis, erat sit amet pellentesque blandit, libero augue sollicitudin leo, a convallis diam purus sit amet nibh. Sed condimentum blandit nibh in semper.

Vestibulum dignissim rutrum porttitor. Curabitur lacinia, arcu sed sollicitudin semper, sem enim faucibus velit, non scelerisque enim justo et tortor. Phasellus accumsan iaculis augue, sit amet sodales mi egestas nec. Phasellus in sagittis ipsum. Morbi elementum magna et ligula tincidunt, sit amet vestibulum nibh posuere. Ut facilisis felis in tortor feugiat, ac pretium enim tempus. Praesent volutpat, lacus sed congue hendrerit, justo risus venenatis massa, non fringilla velit metus ut lacus. Maecenas tincidunt congue purus. Donec fringilla felis vel dolor consectetur, vel gravida quam molestie. Curabitur ut orci a sapien feugiat auctor in sit amet nisl. Morbi justo metus, dapibus a dignissim a, accumsan sit amet odio.',
  'post_title' => 'Miniature City',
  'post_excerpt' => '',
  'post_name' => 'miniature-city',
  'post_modified' => '2017-08-21 06:26:13',
  'post_modified_gmt' => '2017-08-21 06:26:13',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=84',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1822,
  'post_date' => '2008-06-26 23:38:36',
  'post_date_gmt' => '2008-06-26 23:38:36',
  'post_content' => 'Donec auctor consectetur tellus, in hendrerit urna vulputate non. Ut elementum fringilla purus. Nam dui erat, porta eu gravida sit amet, ornare sit amet sem.',
  'post_title' => 'Dirt Championship',
  'post_excerpt' => '',
  'post_name' => 'dirt-championship',
  'post_modified' => '2017-08-21 06:26:17',
  'post_modified_gmt' => '2017-08-21 06:26:17',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=1822',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'sports',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1863,
  'post_date' => '2008-06-26 02:48:34',
  'post_date_gmt' => '2008-06-26 02:48:34',
  'post_content' => 'Proin vitae lectus eu turpis sollicitudin sagittis. Aliquam nunc odio, semper lacinia tincidunt a, dapibus vitae dolor. Class aptent taciti sociosqu ad litora torquent per conubia.',
  'post_title' => 'Learn Something New',
  'post_excerpt' => '',
  'post_name' => 'learn-something-new',
  'post_modified' => '2017-08-21 06:26:23',
  'post_modified_gmt' => '2017-08-21 06:26:23',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=1863',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'lifestyle',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1865,
  'post_date' => '2008-06-26 02:49:39',
  'post_date_gmt' => '2008-06-26 02:49:39',
  'post_content' => 'Vivamus pharetra magna fermentum tincidunt imperdiet. Aenean venenatis sollicitudin odio in ultrices. Proin a nibh at dolor rhoncus pulvinar. Nullam eget tincidunt enim.',
  'post_title' => 'Clean Air',
  'post_excerpt' => '',
  'post_name' => 'clean-air',
  'post_modified' => '2017-08-21 06:26:21',
  'post_modified_gmt' => '2017-08-21 06:26:21',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=1865',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'lifestyle',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1893,
  'post_date' => '2008-06-26 21:19:12',
  'post_date_gmt' => '2008-06-26 21:19:12',
  'post_content' => 'Aliquam blandit, velit elementum bibendum dictum, est leo volutpat quam, id pellentesque nisl arcu quis purus. Pellentesque luctus lacus lorem, id ullamcorper dolor vestibulum id.',
  'post_title' => 'Views of the Burj Khalifa',
  'post_excerpt' => '',
  'post_name' => 'burj-khalifa',
  'post_modified' => '2017-08-21 06:26:19',
  'post_modified_gmt' => '2017-08-21 06:26:19',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?p=1893',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'category' => 'video',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2161,
  'post_date' => '2013-07-16 18:51:39',
  'post_date_gmt' => '2013-07-16 18:51:39',
  'post_content' => 'Maecenas cursus urna vitae tellus egestas venenatis. Quisque hendrerit massa sit amet erat bibendum fringilla. Aenean quis arcu porta, consectetur mauris ut, mollis dui. Donec pharetra a quam vitae adipiscing.',
  'post_title' => 'Tandem',
  'post_excerpt' => '',
  'post_name' => 'tandem',
  'post_modified' => '2017-08-21 06:26:08',
  'post_modified_gmt' => '2017-08-21 06:26:08',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=2161',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2164,
  'post_date' => '2013-07-16 18:53:03',
  'post_date_gmt' => '2013-07-16 18:53:03',
  'post_content' => 'Donec tincidunt et massa sit amet sodales. In cursus augue ac sem ornare, eu interdum odio volutpat. Donec odio quam, lacinia quis nibh at, bibendum fringilla ante.',
  'post_title' => 'Needed Vacation',
  'post_excerpt' => '',
  'post_name' => 'needed-vacation',
  'post_modified' => '2017-08-21 06:26:06',
  'post_modified_gmt' => '2017-08-21 06:26:06',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=2164',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2167,
  'post_date' => '2013-07-16 18:59:11',
  'post_date_gmt' => '2013-07-16 18:59:11',
  'post_content' => 'Donec id lectus sed risus fermentum auctor. In fringilla nulla tincidunt congue vulputate. Donec auctor risus ut elit pretium, ultrices iaculis velit interdum.',
  'post_title' => 'Vegetable Fun',
  'post_excerpt' => '',
  'post_name' => 'vegetable-fun',
  'post_modified' => '2017-08-21 06:26:00',
  'post_modified_gmt' => '2017-08-21 06:26:00',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=2167',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
    'layout' => 'sidebar-none',
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2178,
  'post_date' => '2013-07-16 22:05:22',
  'post_date_gmt' => '2013-07-16 22:05:22',
  'post_content' => 'Pellentesque ipsum nisi, rhoncus dictum magna at, adipiscing cor honcus dictum magna atmmodo magna. Aenean accumsan erat a lacus semper, nec vulputate magna euismod. Maecenas a lacus rhoncus, ullamcorper sem consectetur, mollis lacus.',
  'post_title' => 'The Canyon',
  'post_excerpt' => '',
  'post_name' => 'the-canyon',
  'post_modified' => '2017-08-21 06:26:04',
  'post_modified_gmt' => '2017-08-21 06:26:04',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?p=2178',
  'menu_order' => 0,
  'post_type' => 'post',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'category' => 'blog',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2357,
  'post_date' => '2014-08-29 18:28:42',
  'post_date_gmt' => '2014-08-29 18:28:42',
  'post_content' => '',
  'post_title' => 'Shop',
  'post_excerpt' => '',
  'post_name' => 'shop',
  'post_modified' => '2017-08-21 06:28:17',
  'post_modified_gmt' => '2017-08-21 06:28:17',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/shop/',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2358,
  'post_date' => '2014-08-29 18:28:42',
  'post_date_gmt' => '2014-08-29 18:28:42',
  'post_content' => '[woocommerce_cart]',
  'post_title' => 'Cart',
  'post_excerpt' => '',
  'post_name' => 'cart',
  'post_modified' => '2017-08-21 06:28:11',
  'post_modified_gmt' => '2017-08-21 06:28:11',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/cart/',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'portfolio_feature_size_page' => 'blank',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2359,
  'post_date' => '2014-08-29 18:28:42',
  'post_date_gmt' => '2014-08-29 18:28:42',
  'post_content' => '[woocommerce_checkout]',
  'post_title' => 'Checkout',
  'post_excerpt' => '',
  'post_name' => 'checkout',
  'post_modified' => '2017-08-21 06:28:13',
  'post_modified_gmt' => '2017-08-21 06:28:13',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/checkout/',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'portfolio_feature_size_page' => 'blank',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2360,
  'post_date' => '2014-08-29 18:28:42',
  'post_date_gmt' => '2014-08-29 18:28:42',
  'post_content' => '[woocommerce_my_account]',
  'post_title' => 'My Account',
  'post_excerpt' => '',
  'post_name' => 'my-account',
  'post_modified' => '2017-08-21 06:28:15',
  'post_modified_gmt' => '2017-08-21 06:28:15',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/my-account/',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2205,
  'post_date' => '2013-10-11 18:49:29',
  'post_date_gmt' => '2013-10-11 18:49:29',
  'post_content' => '',
  'post_title' => 'Blog - 3 Columns',
  'post_excerpt' => '',
  'post_name' => 'blog-3-columns',
  'post_modified' => '2017-08-21 06:28:41',
  'post_modified_gmt' => '2017-08-21 06:28:41',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2205',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'query_category' => '0',
    'layout' => 'grid3',
    'posts_per_page' => '6',
    'image_width' => '328',
    'image_height' => '230',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2835,
  'post_date' => '2015-04-16 15:32:56',
  'post_date_gmt' => '2015-04-16 15:32:56',
  'post_content' => '<!--themify_builder_static--><p>adadasdadfdaf</p>
 <p>adadasdadfdaf</p>
 <p>adadasdadfdaf</p>
 <p>adadasdadfdaf</p><!--/themify_builder_static-->',
  'post_title' => 'Test Scroll to Anchor',
  'post_excerpt' => '',
  'post_name' => 'test-scroll-to-anchor',
  'post_modified' => '2017-09-28 16:10:34',
  'post_modified_gmt' => '2017-09-28 16:10:34',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?page_id=2835',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'custom_menu' => 'test-scroll-to-anchor',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>adadasdadfdaf</p>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_type\\":\\"image\\",\\"background_slider\\":\\"\\",\\"background_slider_mode\\":\\"\\",\\"background_video\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_color\\":\\"ff0000_1.00\\",\\"cover_color\\":\\"\\",\\"cover_color_hover\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\",\\"row_anchor\\":\\"#Test\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>adadasdadfdaf</p>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_type\\":\\"image\\",\\"background_slider\\":\\"\\",\\"background_slider_mode\\":\\"\\",\\"background_video\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_color\\":\\"ff00dd_1.00\\",\\"cover_color\\":\\"\\",\\"cover_color_hover\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\",\\"row_anchor\\":\\"#Test-1\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>adadasdadfdaf</p>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_type\\":\\"image\\",\\"background_slider\\":\\"\\",\\"background_slider_mode\\":\\"\\",\\"background_video\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_color\\":\\"0051ff_1.00\\",\\"cover_color\\":\\"\\",\\"cover_color_hover\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\",\\"row_anchor\\":\\"#Test-2\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>adadasdadfdaf</p>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_type\\":\\"image\\",\\"background_slider\\":\\"\\",\\"background_slider_mode\\":\\"\\",\\"background_video\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_color\\":\\"ffbb00_1.00\\",\\"cover_color\\":\\"\\",\\"cover_color_hover\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\",\\"row_anchor\\":\\"#Test-3\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[],\\"styling\\":[]}],\\"styling\\":[]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2521,
  'post_date' => '2014-09-09 23:05:23',
  'post_date_gmt' => '2014-09-09 23:05:23',
  'post_content' => '<!--themify_builder_static--><ul data-id="slider-0-" data-visible="1" data-scroll="1" data-auto-scroll="4" data-speed="1" data-wrap="yes" data-arrow="no" data-pagination="yes" data-effect="scroll" data-height="variable" data-pause-on-hover="resume" > 
 <li> <a href="https://themify.me/demo/themes/corporate/shop/" alt="NEW ARRIVALS"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/164096684-1200x600.jpg" width="1200" height="600" alt="NEW ARRIVALS" /> </a> 
 <h3> <a href="https://themify.me/demo/themes/corporate/shop/">NEW ARRIVALS</a> </h3> Ut efficitur, metus at venenatis suscipit, mi lacus dictum metus, nec venenatis augue magna vel purus </li> <li> <a href="https://themify.me/demo/themes/corporate/shop/" alt="THIS SEASON"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/129985073-1200x600.jpg" width="1200" height="600" alt="THIS SEASON" /> </a> 
 <h3> <a href="https://themify.me/demo/themes/corporate/shop/">THIS SEASON</a> </h3> Ut sagittis tortor augue, at mollis eros lacinia at. Morbi bibendum tincidunt dignissim </li> <li> <a href="https://themify.me/demo/themes/corporate/shop/" alt="ACCESSORIES"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/160846136-1200x600.jpg" width="1200" height="600" alt="ACCESSORIES" /> </a> 
 <h3> <a href="https://themify.me/demo/themes/corporate/shop/">ACCESSORIES</a> </h3> Ut feugiat, nisl vitae posuere elementum, lacus orci congue dui, non posuere augue ex quis erat </li> </ul> 
 <p style="text-align: center;"> </p> <h1 style="text-align: center;">FREE SHIPPING WORLDWIDE</h1> <p style="text-align: center;"><a href="https://themify.me">Find Out More ></a></p> <p style="text-align: center;"> </p>
 <h4 style="text-align: center;">Shop</h4> <h1 style="text-align: center;">BY EVENT</h1> <p style="text-align: center;">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia, dignissim hendrerit magna condimentum id</p> <p style="text-align: center;"> </p>
 
 <a href="https://themify.me/demo/themes/corporate/shop/" > Classic </a> <a href="https://themify.me/demo/themes/corporate/shop/" > New </a> 
 <h4 style="text-align: center;">Shop</h4> <h1 style="text-align: center;">BY BRAND</h1> <p style="text-align: center;">Etiam odio tellus, interdum tempus pulvinar a, sagittis dictum magna. Vivamus eget ultrices elit vivamus nibh lacus, tristique et arcu vel</p>
 
 <a href="https://themify.me/demo/themes/corporate/shop/" > Women\'s Brand </a> <a href="https://themify.me/demo/themes/corporate/shop/" > Men\'s Brand </a> 
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/116448214-400x600.jpg" width="400" height="600" alt="116448214" /> 
 <h4>MEN</h4><p>Mauris ut neque quis neque ornare pellentesque</p><p><a href="https://themify.me/demo/themes/corporate/shop/">View Store ></a></p>
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/135932492-400x600.jpg" width="400" height="600" alt="135932492" /> 
 <h4>WOMEN</h4><p>Donec sollicitudin massa ipsum, a viverra urna sagittis convallis</p><p><a href="https://themify.me/demo/themes/corporate/shop/">View Store ></a></p>
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/30717703-400x600.jpg" width="400" height="600" alt="30717703" /> 
 <h4>BRANDS</h4><p>Proin est orci, eleifend in elit in, ullamcorper semper metus</p><p><a href="https://themify.me/demo/themes/corporate/shop/">View Store ></a></p>
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/157646438-400x600.jpg" width="400" height="600" alt="157646438" /> 
 <h4>STYLES</h4><p>Morbi malesuada diam bibendum ullamcorper tempus</p><p><a href="https://themify.me/demo/themes/corporate/shop/">View Store ></a></p>
 <h4 style="text-align: center;">FIND US ON</h4>
 
 <a href="http://twitter.com/themify" > </a> <a href="http://facebook.com/themify" > </a> <a href="https://plus.google.com/102333925087069536501" > </a> <a href="https://www.pinterest.com/" > </a><!--/themify_builder_static-->',
  'post_title' => 'Shop Landing',
  'post_excerpt' => '',
  'post_name' => 'shop-landing',
  'post_modified' => '2017-10-29 14:20:52',
  'post_modified_gmt' => '2017-10-29 14:20:52',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?page_id=2521',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"slider\\",\\"mod_settings\\":{\\"layout_display_slider\\":\\"image\\",\\"blog_category_slider\\":\\"|single\\",\\"slider_category_slider\\":\\"|single\\",\\"portfolio_category_slider\\":\\"|single\\",\\"testimonial_category_slider\\":\\"|single\\",\\"order_slider\\":\\"desc\\",\\"orderby_slider\\":\\"date\\",\\"display_slider\\":\\"content\\",\\"img_content_slider\\":[{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/164096684.jpg\\",\\"img_title_slider\\":\\"NEW ARRIVALS\\",\\"img_link_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"img_caption_slider\\":\\"Ut efficitur, metus at venenatis suscipit, mi lacus dictum metus, nec venenatis augue magna vel purus\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/129985073.jpg\\",\\"img_title_slider\\":\\"THIS SEASON\\",\\"img_link_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"img_caption_slider\\":\\"Ut sagittis tortor augue, at mollis eros lacinia at. Morbi bibendum tincidunt dignissim\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/160846136.jpg\\",\\"img_title_slider\\":\\"ACCESSORIES\\",\\"img_link_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"img_caption_slider\\":\\"Ut feugiat, nisl vitae posuere elementum, lacus orci congue dui, non posuere augue ex quis erat\\"}],\\"layout_slider\\":\\"slider-caption-overlay\\",\\"img_w_slider\\":\\"1200\\",\\"img_h_slider\\":\\"600\\",\\"visible_opt_slider\\":\\"1\\",\\"auto_scroll_opt_slider\\":\\"4\\",\\"scroll_opt_slider\\":\\"1\\",\\"speed_opt_slider\\":\\"normal\\",\\"effect_slider\\":\\"scroll\\",\\"pause_on_hover_slider\\":\\"resume\\",\\"wrap_slider\\":\\"yes\\",\\"show_nav_slider\\":\\"yes\\",\\"show_arrow_slider\\":\\"no\\"}}]}],\\"styling\\":{\\"padding_top\\":\\"0\\",\\"padding_bottom\\":\\"0\\",\\"margin_bottom\\":\\"30\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_color\\":\\"000000\\",\\"background_repeat\\":\\"repeat\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"text_decoration\\":\\"none\\",\\"padding_top\\":\\"1\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"5\\",\\"padding_right_unit\\":\\"%\\",\\"padding_bottom\\":\\"1\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"5\\",\\"padding_left_unit\\":\\"%\\",\\"margin_bottom\\":\\"3\\",\\"margin_bottom_unit\\":\\"%\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\"> <\\\\/p>\\\\n<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">FREE SHIPPING WORLDWIDE<\\\\/h1>\\\\n<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\"><a href=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\">Find Out More &gt;<\\\\/a><\\\\/p>\\\\n<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\"> <\\\\/p>\\"}}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_repeat\\":\\"repeat\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"#000000\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}}],\\"styling\\":{\\"animation_effect\\":\\"slide-up\\",\\"padding_top\\":\\"0\\",\\"padding_bottom\\":\\"0\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"padding_top\\":\\"3\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"3\\",\\"padding_right_unit\\":\\"%\\",\\"padding_bottom\\":\\"3\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"3\\",\\"padding_left_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Shop<\\\\/h4>\\\\n<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">BY EVENT<\\\\/h1>\\\\n<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia, dignissim hendrerit magna condimentum id<\\\\/p>\\\\n<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\"> <\\\\/p>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"text_transform\\":\\"uppercase\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"border_top_color\\":\\"#ce30e3\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"normal\\",\\"buttons_style\\":\\"rounded\\",\\"content_button\\":[{\\"label\\":\\"Classic\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"purple\\"},{\\"label\\":\\"New\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"purple\\"}]}}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_repeat\\":\\"repeat\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"#f7f7f7\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"3\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_color\\":\\"f7f7f7\\",\\"background_repeat\\":\\"repeat\\",\\"padding_top\\":\\"3\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"3\\",\\"padding_right_unit\\":\\"%\\",\\"padding_bottom\\":\\"3\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"3\\",\\"padding_left_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Shop<\\\\/h4>\\\\n<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">BY BRAND<\\\\/h1>\\\\n<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Etiam odio tellus, interdum tempus pulvinar a, sagittis dictum magna. Vivamus eget ultrices elit vivamus nibh lacus, tristique et arcu vel<\\\\/p>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"text_transform\\":\\"uppercase\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"border_top_color\\":\\"#ce30e3\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"normal\\",\\"buttons_style\\":\\"rounded\\",\\"content_button\\":[{\\"label\\":\\"Women\\\\\\\\\\\'s Brand\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"purple\\"},{\\"label\\":\\"Men\\\\\\\\\\\'s Brand\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"purple\\"}]}}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_repeat\\":\\"repeat\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"#f7f7f7\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}}],\\"styling\\":{\\"padding_top\\":\\"0\\",\\"padding_bottom\\":\\"0\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/116448214.jpg\\",\\"width_image\\":\\"400\\",\\"height_image\\":\\"600\\",\\"cid\\":\\"c57\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4>MEN<\\\\/h4><p>Mauris ut neque quis neque ornare pellentesque<\\\\/p><p><a href=\\\\\\\\\\\\\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\\\\\\\\\\\\\">View Store ><\\\\/a><\\\\/p>\\",\\"cid\\":\\"c61\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/135932492.jpg\\",\\"width_image\\":\\"400\\",\\"height_image\\":\\"600\\",\\"cid\\":\\"c69\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4>WOMEN<\\\\/h4><p>Donec sollicitudin massa ipsum, a viverra urna sagittis convallis<\\\\/p><p><a href=\\\\\\\\\\\\\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\\\\\\\\\\\\\">View Store ><\\\\/a><\\\\/p>\\",\\"cid\\":\\"c73\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/30717703.jpg\\",\\"width_image\\":\\"400\\",\\"height_image\\":\\"600\\",\\"cid\\":\\"c81\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4>BRANDS<\\\\/h4><p>Proin est orci, eleifend in elit in, ullamcorper semper metus<\\\\/p><p><a href=\\\\\\\\\\\\\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\\\\\\\\\\\\\">View Store ><\\\\/a><\\\\/p>\\",\\"cid\\":\\"c85\\"}}]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/157646438.jpg\\",\\"width_image\\":\\"400\\",\\"height_image\\":\\"600\\",\\"cid\\":\\"c93\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4>STYLES<\\\\/h4><p>Morbi malesuada diam bibendum ullamcorper tempus<\\\\/p><p><a href=\\\\\\\\\\\\\\"https://themify.me/demo/themes/corporate\\\\/shop\\\\/\\\\\\\\\\\\\\">View Store ><\\\\/a><\\\\/p>\\",\\"cid\\":\\"c97\\"}}]}],\\"styling\\":{\\"animation_effect\\":\\"fade-in\\",\\"text_decoration\\":\\"none\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">FIND US ON<\\\\/h4>\\",\\"cid\\":\\"c108\\"}},{\\"mod_name\\":\\"icon\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"icon_size\\":\\"normal\\",\\"icon_style\\":\\"none\\",\\"icon_arrangement\\":\\"icon_horizontal\\",\\"content_icon\\":[{\\"icon\\":\\"fa-twitter\\",\\"icon_color_bg\\":\\"black\\",\\"link\\":\\"http:\\\\/\\\\/twitter.com\\\\/themify\\",\\"link_options\\":\\"regular\\"},{\\"icon\\":\\"fa-facebook\\",\\"icon_color_bg\\":\\"black\\",\\"link\\":\\"http:\\\\/\\\\/facebook.com\\\\/themify\\",\\"link_options\\":\\"regular\\"},{\\"link_options\\":\\"regular\\"},{\\"icon\\":\\"fa-google-plus\\",\\"icon_color_bg\\":\\"black\\",\\"link\\":\\"https:\\\\/\\\\/plus.google.com\\\\/102333925087069536501\\",\\"link_options\\":\\"regular\\"},{\\"icon\\":\\"fa-pinterest\\",\\"icon_color_bg\\":\\"black\\",\\"link\\":\\"https:\\\\/\\\\/www.pinterest.com\\\\/\\",\\"link_options\\":\\"regular\\"}]}}]}],\\"styling\\":{\\"background_color\\":\\"f2f2f2\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 4359,
  'post_date' => '2015-10-21 19:49:07',
  'post_date_gmt' => '2015-10-21 19:49:07',
  'post_content' => '',
  'post_title' => 'Test',
  'post_excerpt' => '',
  'post_name' => 'test-3',
  'post_modified' => '2017-08-21 06:28:19',
  'post_modified_gmt' => '2017-08-21 06:28:19',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?page_id=4359',
  'menu_order' => 0,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 9,
  'post_date' => '2013-07-12 02:54:11',
  'post_date_gmt' => '2013-07-12 02:54:11',
  'post_content' => '<!--themify_builder_static--><h2 style="text-align: center;">Welcome!</h2><h3 style="text-align: center;">Themify Corporate is a professional-looking, responsive, multi-purpose theme that is based from our very own Themify.me site.</h3>
 
 <iframe src="https://player.vimeo.com/video/100751417" width="1165" height="655" title="Wild &amp; Woolly" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
 
 <h2 style="text-align: center;">Services</h2><h3 style="text-align: center;">Use the Builder Feature module to display animated circle with icons (perfect for highlighting your services and product features)</h3>
 
 
 
 
 <h3> WordPress Themes </h3> <p>Pellentesque mi mi, sollicitudin quis purus vitae, viverra dapibus quam. Cras in nisl lorem.</p> 
 
 
 
 
 
 <h3> Cool Logos </h3> <p>Morbi sodales leo non purus adipiscing interdum. Vivamus quam dolor.</p> 
 
 
 
 
 
 <h3> Fast Hosting </h3> <p>Curabitur mollis pretium arcu, vel maximus orci molestie ut. Donec eu nisi quam.</p> 
 
 <h2 style="text-align: center;">Portfolio</h2><h3 style="text-align: center;">Beautiful grid styled Portfolio with post filtering</h3>
 <ul> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" >Featured</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/illustrations/" >Illustrations</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" >Misc</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/photos/" >Photos</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/uncategorized/" >Uncategorized</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/videos/" >Videos</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/vintage/" >Vintage</a> </li> </ul>
<article id="portfolio-2574"> <a href="https://themify.me/demo/themes/corporate/project/builder-project/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/builder-project/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/4-500x500.jpg" width="500" height="500" alt="4" srcset="https://themify.me/demo/themes/corporate/files/2014/09/4-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/4-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/4-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/4-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/4-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/4-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/4-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/4-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/4-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/4-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/4-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/4-60x60.jpg 60w, https://themify.me/demo/themes/corporate/files/2014/09/4-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2014/09/4-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/4-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/4-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2014/09/4-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/4-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2014/09/4-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/4.jpg 800w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/builder-project/">Builder Project</a> </h2> September 10, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 <p>Builder Project This project page is built using the Themify&#8217;s drag &amp; drop Builder Research Time Our team spent 3 night in&#8230; Fun Time Planning More of the time are spent in planning Started Project finally started after 3 months of planning Testing Testing, revising, and testing and then revising Done! After 9 months, the [&hellip;]</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2574&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2504"> <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/152111928-500x500.jpg" width="500" height="500" alt="152111928" srcset="https://themify.me/demo/themes/corporate/files/2014/09/152111928-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-200x200.jpg 200w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/152111928.jpg 1000w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/">Custom BG Project</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/vintage/" rel="tag">Vintage</a> </p> 
 <p>In ut tincidunt nunc. Maecenas tempor faucibus ligula quis tincidunt.</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2504&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2503"> <a href="https://themify.me/demo/themes/corporate/project/perspective/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/perspective/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/7-500x500.jpg" width="500" height="500" alt="7" srcset="https://themify.me/demo/themes/corporate/files/2014/09/7-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/7-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/7-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/7-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/7-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/7-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/7-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/7-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/7-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/7-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/7-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/7-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/7-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/7-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/7-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/7.jpg 800w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/perspective/">Perspective</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/photos/" rel="tag">Photos</a> </p> 
 <p>Sed efficitur sit amet enim ut tristique. Nunc metus justo, ornare et lacinia a, pretium eu neque</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2503&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2502"> <a href="https://themify.me/demo/themes/corporate/project/field/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/field/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/102683366-500x500.jpg" width="500" height="500" alt="102683366" srcset="https://themify.me/demo/themes/corporate/files/2014/09/102683366-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/102683366.jpg 1000w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/field/">Field</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/illustrations/" rel="tag">Illustrations</a> </p> 
 <p>Etiam dapibus metus leo, finibus tempor mauris scelerisque lacinia.</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2502&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2501"> <a href="https://themify.me/demo/themes/corporate/project/connections/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/connections/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/5-500x500.jpg" width="500" height="500" alt="5" srcset="https://themify.me/demo/themes/corporate/files/2014/09/5-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/5-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/5-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/5-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/5-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/5-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/5-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/5-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/5-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/5-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/5-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/5-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/5-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/5-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/5.jpg 800w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/connections/">Connections</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 <p>Duis quis odio eget lorem sollicitudin mattis eget ac risus.</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2501&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2496"> <a href="https://themify.me/demo/themes/corporate/project/sk8-1/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/sk8-1/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/103850612-500x500.jpg" width="500" height="500" alt="103850612" srcset="https://themify.me/demo/themes/corporate/files/2014/09/103850612-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/103850612.jpg 1000w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/sk8-1/">SK8.1</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 <p>Praesent vulputate ligula vel augue pellentesque blandit</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2496&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2495"> <a href="https://themify.me/demo/themes/corporate/project/dusk/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/dusk/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/3-500x500.jpg" width="500" height="500" alt="3" srcset="https://themify.me/demo/themes/corporate/files/2014/09/3-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/3-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/3-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/3-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/3-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/3-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/3-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/3-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/3-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/3-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/3-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/3-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/3-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/3-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/3.jpg 800w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/dusk/">Dusk</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 <p>Aliquam quis augue facilisis, blandit sapien id, condimentum mi</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2495&#038;action=edit">Edit</a>] 
 </article>
<article id="portfolio-2494"> <a href="https://themify.me/demo/themes/corporate/project/top/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/top/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/2-500x500.jpg" width="500" height="500" alt="2" srcset="https://themify.me/demo/themes/corporate/files/2014/09/2-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/2-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/2-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/2-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/2-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/2-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/2-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/2-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/2-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/2-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/2-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/2-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/2-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/2-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/2.jpg 800w" sizes="(max-width: 500px) 100vw, 500px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/top/">Up Top</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 <p>Pellentesque finibus odio id quam tincidunt, id ultricies quam laoreet</p>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2494&#038;action=edit">Edit</a>] 
 </article>
 <h2 style="text-align: center;">Testimonials</h2><h3 style="text-align: center;">Show off the testimonials from your clients</h3>
 <h2 style="text-align: center;">Our Team</h2><h3 style="text-align: center;">Custom Team post type with animated hover content, social icons, and skill set bars</h3>
 
<article id="team-2513"> 
 <figure> <a href="https://themify.me/demo/themes/corporate/team/clara-black/" title="Clara Black"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/181161062-1024x1024-362x362.jpg" width="362" height="362" alt="181161062" srcset="https://themify.me/demo/themes/corporate/files/2014/09/181161062-1024x1024-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-1024x1024.jpg 1024w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/181161062.jpg 1200w" sizes="(max-width: 362px) 100vw, 362px" /> </a> </figure> <h2> <a href="https://themify.me/demo/themes/corporate/team/clara-black/" title="Clara Black"> Clara Black </a> </h2> Web Developer <p> <a href="http://twitter.com/themify"></a>
<a href="http://facebook.com/themify"></a>
<a href="http://pinterest.com/"></a> </p> 
 
 
 
 <p>Duis condimentum sem nec euismod accumsan. Pellentesque ultricies ultricies arcu vel aliquam. Donec quis eleifend justo, ac elementum tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p> 
 <i>PHP</i>
<i>JavaScript</i>
<i>Ruby</i>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2513&#038;action=edit">Edit Team</a>] </article>
<article id="team-2511"> 
 <figure> <a href="https://themify.me/demo/themes/corporate/team/allison-peters/" title="Allison Peters"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/141574357-1024x1024-362x362.jpg" width="362" height="362" alt="141574357" srcset="https://themify.me/demo/themes/corporate/files/2014/09/141574357-1024x1024-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-1024x1024.jpg 1024w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/141574357.jpg 1200w" sizes="(max-width: 362px) 100vw, 362px" /> </a> </figure> <h2> <a href="https://themify.me/demo/themes/corporate/team/allison-peters/" title="Allison Peters"> Allison Peters </a> </h2> PR <p> <a href="http://twitter.com/themify"></a>
<a href="http://facebook.com/themify"></a>
<a href="http://pinterest.com/"></a> </p> 
 
 
 
 <p>Nullam dolor ex, tincidunt a congue non, aliquam nec est. Phasellus egestas urna et nibh mattis, sit amet malesuada nisi vestibulum. Phasellus accumsan, ante pellentesque suscipit ullamcorper.</p> 
 <i>Social Networking</i>
<i>Graphic Design</i>
<i>Copyedit</i> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2511&#038;action=edit">Edit Team</a>] </article>
<article id="team-48"> 
 <figure> <a href="https://themify.me/demo/themes/corporate/team/amy-weaver/" title="Amy Weaver"> <img src="https://themify.me/demo/themes/corporate/files/2013/07/193052534-1024x1024-362x362.jpg" width="362" height="362" alt="193052534" srcset="https://themify.me/demo/themes/corporate/files/2013/07/193052534-1024x1024-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-1024x1024.jpg 1024w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2013/07/193052534-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2013/07/193052534.jpg 1200w" sizes="(max-width: 362px) 100vw, 362px" /> </a> </figure> <h2> <a href="https://themify.me/demo/themes/corporate/team/amy-weaver/" title="Amy Weaver"> Amy Weaver </a> </h2> Project Manager <p> <a href="http://twitter.com/themify"></a>
<a href="http://facebook.com/themify"></a>
<a href="http://pinterest.com/"></a> </p> 
 
 
 
 <p>Maecenas luctus aliquet risus ac feugiat. Curabitur enim mi, placerat sit amet porttitor ac, mollis lobortis elit. Cras sit amet erat eget dolor varius tristique. Duis eu nisl tortor. Mauris pulvinar metus eget.</p> 
 <i>Project Management</i>
<i>Marketing</i>
<i>Logistics</i> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=48&#038;action=edit">Edit Team</a>] </article>
 <h2 style="text-align: center;">WooCommerce Shop</h2><h3 style="text-align: center;">Use the Builder to display products anywhere on your site</h3> <ul>
 <li> <a href="https://themify.me/demo/themes/corporate/product/builder-product/"> Sale! <img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-670x670.jpg 670w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-978x978.jpg 978w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720.jpg 720w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Builder Product</h2>Rated <strong>5.00</strong> out of 5 <del>&pound;79.00</del> <ins>&pound;49.00</ins> </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=85" data-quantity="1" data-product_id="85" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/era/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/eraLX-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/eraLX-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-670x670.jpg 670w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-978x978.jpg 978w, //themify.me/demo/themes/corporate/files/2012/02/eraLX.jpg 800w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Era</h2> &pound;69.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=83" data-quantity="1" data-product_id="83" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/vansera/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-362x362.jpeg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-362x362.jpeg 362w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-150x150.jpeg 150w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-300x300.jpeg 300w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-90x90.jpeg 90w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-305x305.jpeg 305w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-670x670.jpeg 670w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon.jpeg 800w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Vansera</h2>Rated <strong>5.00</strong> out of 5 &pound;79.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=80" data-quantity="1" data-product_id="80" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/bardenas/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720.jpg 720w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Bardenas</h2> &pound;69.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=77" data-quantity="1" data-product_id="77" data-product_sku="">Add to cart</a></li>
 </ul>
 
 <h2>More Demos!</h2> <h3>Did we mention drag &#038; drop Builder, video background, transparent header, animating background colors, progress bars, animation effects? Click on the buttons below to see more pages designed with the Builder.</h3>
 
 <a href="https://themify.me/demo/themes/corporate/home/features/" > Features </a> <a href="https://themify.me/demo/themes/corporate/home/company-landing/" > Company </a> <a href="https://themify.me/demo/themes/corporate/home/shop-landing/" > Shop </a> <a href="https://themify.me/demo/themes/corporate/home/software/" > Software </a> <a href="https://themify.me/demo/themes/corporate/home/web-app-page/" > Web App </a> <a href="https://themify.me/demo/themes/corporate/project/builder-project/" > Portfolio </a><!--/themify_builder_static-->',
  'post_title' => 'Demos',
  'post_excerpt' => '',
  'post_name' => 'home',
  'post_modified' => '2017-10-29 14:37:42',
  'post_modified_gmt' => '2017-10-29 14:37:42',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=9',
  'menu_order' => 1,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Welcome!<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Themify Corporate is a professional-looking, responsive, multi-purpose theme that is based from our very own Themify.me site.<\\\\/h3>\\",\\"animation_effect\\":\\"fadeInUp\\",\\"font_color\\":\\"ffffff_1.00\\",\\"padding_right\\":\\"5\\",\\"padding_right_unit\\":\\"%\\",\\"padding_left\\":\\"5\\",\\"padding_left_unit\\":\\"%\\",\\"cid\\":\\"c19\\"}},{\\"mod_name\\":\\"video\\",\\"mod_settings\\":{\\"style_video\\":\\"video-top\\",\\"url_video\\":\\"http:\\\\/\\\\/vimeo.com\\\\/100751417\\",\\"animation_effect\\":\\"fadeInUp\\",\\"margin_bottom\\":\\"-14\\"}}]}],\\"styling\\":{\\"custom_css_row\\":\\"animated-bg\\",\\"background_type\\":\\"image\\",\\"background_color\\":\\"654e9c_1.00\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"ffffff_1.00\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\",\\"breakpoint_mobile\\":{\\"background_type\\":\\"image\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\"}}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Services<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Use the Builder Feature module to display animated circle with icons (perfect for highlighting your services and product features)<\\\\/h3>\\",\\"animation_effect\\":\\"fadeInUp\\",\\"cid\\":\\"c34\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_repeat\\":\\"repeat\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"#ff0009\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"WordPress Themes\\",\\"content_feature\\":\\"<p>Pellentesque mi mi, sollicitudin quis purus vitae, viverra dapibus quam. Cras in nisl lorem.<\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"80\\",\\"circle_stroke_feature\\":\\"3\\",\\"circle_color_feature\\":\\"73b70b\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-desktop\\",\\"icon_color_feature\\":\\"ffffff\\",\\"icon_bg_feature\\":\\"73b70b\\",\\"animation_effect\\":\\"fadeInLeft\\",\\"cid\\":\\"c45\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Cool Logos\\",\\"content_feature\\":\\"<p>Morbi sodales leo non purus adipiscing interdum. Vivamus quam dolor.<\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"75\\",\\"circle_stroke_feature\\":\\"3\\",\\"circle_color_feature\\":\\"ff5353\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-thumbs-o-up\\",\\"icon_color_feature\\":\\"ffffff\\",\\"icon_bg_feature\\":\\"ff5353\\",\\"animation_effect\\":\\"fadeInUp\\",\\"cid\\":\\"c53\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Fast Hosting\\",\\"content_feature\\":\\"<p>Curabitur mollis pretium arcu, vel maximus orci molestie ut. Donec eu nisi quam.<\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"60\\",\\"circle_stroke_feature\\":\\"3\\",\\"circle_color_feature\\":\\"13c0e1\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-cloud\\",\\"icon_color_feature\\":\\"ffffff\\",\\"icon_bg_feature\\":\\"13c0e1\\",\\"animation_effect\\":\\"fadeInRight\\",\\"cid\\":\\"c61\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_repeat\\":\\"repeat\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"ffffff\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Portfolio<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Beautiful grid styled Portfolio with post filtering<\\\\/h3>\\",\\"animation_effect\\":\\"fadeInUp\\",\\"cid\\":\\"c72\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>[themify_portfolio_posts style=\\\\\\\\\\\\\\"grid4\\\\\\\\\\\\\\" limit=\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\" display=\\\\\\\\\\\\\\"excerpt\\\\\\\\\\\\\\" post_date=\\\\\\\\\\\\\\"yes\\\\\\\\\\\\\\" post_meta=\\\\\\\\\\\\\\"yes\\\\\\\\\\\\\\"  image_w=\\\\\\\\\\\\\\"500\\\\\\\\\\\\\\" image_h=\\\\\\\\\\\\\\"500\\\\\\\\\\\\\\"]<\\\\/p>\\",\\"animation_effect\\":\\"bounceIn\\",\\"margin_top\\":\\"0\\",\\"margin_right\\":\\"0\\",\\"margin_bottom\\":\\"0\\",\\"margin_left\\":\\"0\\",\\"cid\\":\\"c76\\"}}]}],\\"styling\\":{\\"row_width\\":\\"fullwidth-content\\",\\"background_type\\":\\"image\\",\\"background_color\\":\\"91e9ff_1.00\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"111111_1.00\\",\\"link_color\\":\\"000000_1.00\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Testimonials<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Show off the testimonials from your clients<\\\\/h3>\\",\\"animation_effect\\":\\"shake\\",\\"cid\\":\\"c87\\"}},{\\"mod_name\\":\\"testimonial\\",\\"mod_settings\\":{\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"layout_testimonial\\":\\"grid2\\",\\"type_query_testimonial\\":\\"category\\",\\"category_testimonial\\":\\"testimonials|multiple\\",\\"post_per_page_testimonial\\":\\"4\\",\\"order_testimonial\\":\\"desc\\",\\"orderby_testimonial\\":\\"date\\",\\"display_testimonial\\":\\"content\\",\\"hide_feat_img_testimonial\\":\\"no\\",\\"img_width_testimonial\\":\\"72\\",\\"img_height_testimonial\\":\\"72\\",\\"hide_post_title_testimonial\\":\\"yes\\",\\"hide_page_nav_testimonial\\":\\"yes\\",\\"animation_effect\\":\\"flipInX\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_color\\":\\"c4df9b\\",\\"font_color\\":\\"333333\\",\\"link_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Our Team<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Custom Team post type with animated hover content, social icons, and skill set bars<\\\\/h3>\\",\\"animation_effect\\":\\"fadeInUp\\",\\"cid\\":\\"c102\\"}},{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p>[themify_team_posts style=\\\\\\\\\\\\\\"grid3\\\\\\\\\\\\\\" display=\\\\\\\\\\\\\\"excerpt\\\\\\\\\\\\\\" limit=\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\" image_w=\\\\\\\\\\\\\\"362\\\\\\\\\\\\\\" image_h=\\\\\\\\\\\\\\"362\\\\\\\\\\\\\\"]<\\\\/p>\\",\\"animation_effect\\":\\"flipInY\\",\\"cid\\":\\"c106\\"}}]}],\\"styling\\":{\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">WooCommerce Shop<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Use the Builder to display products anywhere on your site<\\\\/h3><p>[recent_products per_page=\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\" columns=\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\"]<\\\\/p>\\",\\"animation_effect\\":\\"fadeInLeft\\",\\"cid\\":\\"c117\\"}}]}],\\"styling\\":{\\"background_color\\":\\"f0f0f0\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"7\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"padding_right_unit\\":\\"%\\",\\"padding_left_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h2>More Demos!<\\\\/h2>\\\\n<h3>Did we mention drag &amp; drop Builder, video background, transparent header, animating background colors, progress bars, animation effects? Click on the buttons below to see more pages designed with the Builder.<\\\\/h3>\\",\\"animation_effect\\":\\"fadeIn\\",\\"cid\\":\\"c128\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_image-gradient-angle\\":\\"0\\",\\"text_align\\":\\"center\\",\\"padding_left\\":\\"26\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"normal\\",\\"buttons_style\\":\\"outline\\",\\"content_button\\":[{\\"label\\":\\"Features\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/home\\\\/features\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Company\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/home\\\\/company-landing\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Shop\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/home\\\\/shop-landing\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Software\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/home\\\\/software\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Web App\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/home\\\\/web-app-page\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Portfolio\\",\\"link\\":\\"https://themify.me/demo/themes/corporate\\\\/project\\\\/builder-project\\\\/\\",\\"link_options\\":\\"regular\\"}]}}]}],\\"styling\\":{\\"background_type\\":\\"video\\",\\"background_slider_size\\":\\"large\\",\\"background_slider_mode\\":\\"fullcover\\",\\"background_video\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/clips_of_the_aurora.mp4\\",\\"background_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/thomas_mandelid-clips_of_the_Aurora.jpg\\",\\"background_repeat\\":\\"fullcover\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"000000\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"ffffff\\",\\"text_align\\":\\"center\\",\\"link_color\\":\\"#ffffff\\",\\"padding_top\\":\\"14\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"14\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\"}},{\\"row_order\\":\\"8\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2604,
  'post_date' => '2014-09-15 04:45:45',
  'post_date_gmt' => '2014-09-15 04:45:45',
  'post_content' => '<!--themify_builder_static--><h2 style="text-align: center;">Video Background</h2><h3 style="text-align: center;">Upload any custom video as background</h3>
 <h2 style="text-align: center;">Animating Background Colors</h2><h3 style="text-align: center;">Custom animating background colors anywhere</h3>
 <h2 style="text-align: center;">Parallax Scrolling</h2><h3 style="text-align: center;">Full height parallax scrolling background</h3>
 <h2 style="text-align: center;">Portfolio</h2><h3 style="text-align: center;">Portfolio post type with filter</h3> <ul> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" >Featured</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/illustrations/" >Illustrations</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" >Misc</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/photos/" >Photos</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/uncategorized/" >Uncategorized</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/videos/" >Videos</a> </li> <li><a href="https://themify.me/demo/themes/corporate/portfolio-category/vintage/" >Vintage</a> </li> </ul>
<article id="portfolio-2574"> <a href="https://themify.me/demo/themes/corporate/project/builder-project/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/builder-project/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/4-400x400.jpg" width="400" height="400" alt="4" srcset="https://themify.me/demo/themes/corporate/files/2014/09/4-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/4-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/4-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/4-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/4-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/4-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/4-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/4-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/4-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/4-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/4-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/4-60x60.jpg 60w, https://themify.me/demo/themes/corporate/files/2014/09/4-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2014/09/4-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/4-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/4-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2014/09/4-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/4-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2014/09/4-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/4.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/builder-project/">Builder Project</a> </h2> September 10, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2574&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2504"> <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/152111928-400x400.jpg" width="400" height="400" alt="152111928" srcset="https://themify.me/demo/themes/corporate/files/2014/09/152111928-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-200x200.jpg 200w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/152111928-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/152111928.jpg 1000w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/custom-bg-project/">Custom BG Project</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/vintage/" rel="tag">Vintage</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2504&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2503"> <a href="https://themify.me/demo/themes/corporate/project/perspective/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/perspective/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/7-400x400.jpg" width="400" height="400" alt="7" srcset="https://themify.me/demo/themes/corporate/files/2014/09/7-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/7-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/7-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/7-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/7-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/7-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/7-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/7-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/7-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/7-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/7-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/7-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/7-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/7-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/7-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/7.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/perspective/">Perspective</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/photos/" rel="tag">Photos</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2503&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2502"> <a href="https://themify.me/demo/themes/corporate/project/field/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/field/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/102683366-400x400.jpg" width="400" height="400" alt="102683366" srcset="https://themify.me/demo/themes/corporate/files/2014/09/102683366-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-387x387.jpg 387w, https://themify.me/demo/themes/corporate/files/2014/09/102683366-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/102683366.jpg 1000w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/field/">Field</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/illustrations/" rel="tag">Illustrations</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2502&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2501"> <a href="https://themify.me/demo/themes/corporate/project/connections/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/connections/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/5-400x400.jpg" width="400" height="400" alt="5" srcset="https://themify.me/demo/themes/corporate/files/2014/09/5-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/5-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/5-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/5-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/5-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/5-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/5-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/5-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/5-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/5-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/5-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/5-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/5-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/5-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/5.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/connections/">Connections</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2501&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2496"> <a href="https://themify.me/demo/themes/corporate/project/sk8-1/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/sk8-1/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/103850612-400x400.jpg" width="400" height="400" alt="103850612" srcset="https://themify.me/demo/themes/corporate/files/2014/09/103850612-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/103850612-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/103850612.jpg 1000w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/sk8-1/">SK8.1</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2496&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2495"> <a href="https://themify.me/demo/themes/corporate/project/dusk/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/dusk/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/3-400x400.jpg" width="400" height="400" alt="3" srcset="https://themify.me/demo/themes/corporate/files/2014/09/3-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/3-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/3-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/3-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/3-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/3-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/3-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/3-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/3-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/3-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/3-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/3-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/3-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/3-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/3.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/dusk/">Dusk</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2495&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2494"> <a href="https://themify.me/demo/themes/corporate/project/top/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/top/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/2-400x400.jpg" width="400" height="400" alt="2" srcset="https://themify.me/demo/themes/corporate/files/2014/09/2-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/2-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/2-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/2-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/2-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/2-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/2-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/2-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/2-240x240.jpg 240w, https://themify.me/demo/themes/corporate/files/2014/09/2-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/2-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/2-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/2-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/2-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/2.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/top/">Up Top</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2494&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2485"> <a href="https://themify.me/demo/themes/corporate/project/city-view/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/city-view/"><img src="https://themify.me/demo/themes/corporate/files/2014/09/1-400x400.jpg" width="400" height="400" alt="1" srcset="https://themify.me/demo/themes/corporate/files/2014/09/1-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2014/09/1-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/1-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/1-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/1-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/1-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/1-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2014/09/1-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2014/09/1-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2014/09/1-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2014/09/1-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/1-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2014/09/1-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/1.jpg 800w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/city-view/">City View</a> </h2> September 3, 2014 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/misc/" rel="tag">Misc</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2485&action=edit">Edit</a>] 
 </article>
<article id="portfolio-157"> <a href="https://themify.me/demo/themes/corporate/project/dark-gallery/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/dark-gallery/"><img src="https://themify.me/demo/themes/corporate/files/2013/07/26100514-400x400.jpg" width="400" height="400" alt="26100514" srcset="https://themify.me/demo/themes/corporate/files/2013/07/26100514-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2013/07/26100514-978x978.jpg 978w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/dark-gallery/">Dark Gallery</a> </h2> July 12, 2013 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=157&action=edit">Edit</a>] 
 </article>
<article id="portfolio-2406"> <a href="https://themify.me/demo/themes/corporate/project/watercolor/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/watercolor/"><img src="https://themify.me/demo/themes/corporate/files/2013/07/102951533-400x400.jpg" width="400" height="400" alt="102951533" srcset="https://themify.me/demo/themes/corporate/files/2013/07/102951533-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2013/07/102951533-978x978.jpg 978w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/watercolor/">Watercolor</a> </h2> July 12, 2013 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/featured/" rel="tag">Featured</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2406&action=edit">Edit</a>] 
 </article>
<article id="portfolio-63"> <a href="https://themify.me/demo/themes/corporate/project/red-rose/" data-post-permalink="yes" style="display: none;"></a>
 <figure>
 <a href="https://themify.me/demo/themes/corporate/project/red-rose/"><img src="https://themify.me/demo/themes/corporate/files/2013/07/63982807-400x400.jpg" width="400" height="400" alt="63982807" srcset="https://themify.me/demo/themes/corporate/files/2013/07/63982807-400x400.jpg 400w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-221x221.jpg 221w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-580x580.jpg 580w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-390x390.jpg 390w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-640x640.jpg 640w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2013/07/63982807-978x978.jpg 978w" sizes="(max-width: 400px) 100vw, 400px" /></a> </figure>
 
 
 <h2> <a href="https://themify.me/demo/themes/corporate/project/red-rose/">Red Rose</a> </h2> July 12, 2013 <p> <a href="https://themify.me/demo/themes/corporate/portfolio-category/uncategorized/" rel="tag">Uncategorized</a> </p> 
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=63&action=edit">Edit</a>] 
 </article>
 <h2 style="text-align: center;">Testimonials</h2><h3 style="text-align: center;">Custom post type Testimonial with various layout options</h3>
<article id="testimonial-2408"> 
 <h1>Diana Jones</h1> <p>Maecenas in orci nunc. Curabitur velit sapien, mollis vel aliquam et, dignissim consequat eros. Curabitur egestas quam dapibus arcu egestas mollnisi elit consequat ipsum, nec sagittis sem hilt slhie sodhlite in the nibhi snisi elit consequat ipsum.</p> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2408&action=edit">Edit Testimonial</a>] 
 <figure> <img src="https://themify.me/demo/themes/corporate/files/2013/07/82152160-70x70.jpg" width="70" height="70" alt="82152160" srcset="https://themify.me/demo/themes/corporate/files/2013/07/82152160-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-80x80.jpg 80w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2013/07/82152160-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2013/07/82152160.jpg 369w" sizes="(max-width: 70px) 100vw, 70px" /> </figure> <p> &mdash; Diana JonesCEO, Nice Company </p> </article>
<article id="testimonial-20"> 
 <h1>Amanda Elric</h1> <p>Rravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. This is Photoshop’s version of Lorem Ipsum. Llorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=20&action=edit">Edit Testimonial</a>] 
 <figure> <img src="https://themify.me/demo/themes/corporate/files/2013/07/112268515-70x70.jpg" width="70" height="70" alt="112268515" srcset="https://themify.me/demo/themes/corporate/files/2013/07/112268515-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-80x80.jpg 80w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2013/07/112268515-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2013/07/112268515.jpg 577w" sizes="(max-width: 70px) 100vw, 70px" /> </figure> <p> &mdash; Amanda ElricManager, Themify </p> </article>
<article id="testimonial-12"> 
 <h1>Mike Canlas</h1> <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. This is Photoshop&#8217;s version of Lorem Ipsum. Llorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=12&action=edit">Edit Testimonial</a>] 
 <figure> <img src="https://themify.me/demo/themes/corporate/files/2013/07/124661612-70x70.jpg" width="70" height="70" alt="124661612" srcset="https://themify.me/demo/themes/corporate/files/2013/07/124661612-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-80x80.jpg 80w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2013/07/124661612-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2013/07/124661612.jpg 373w" sizes="(max-width: 70px) 100vw, 70px" /> </figure> <p> &mdash; Mike CanlasOwner </p> </article>
<article id="testimonial-1592"> 
 <h1>Exceeded Our Expectation</h1> <p>Aliquam metus diam, mattis fringilla adipiscing at, lacinia at nulla. Fusce ut sem est. In eu sagittis felis. In gravida arcu ut neque ornare vitae rutrum tu. Cras a fringilla nunc. Suspendisse volutpat, eros cong rpis vehicula.</p> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=1592&action=edit">Edit Testimonial</a>] 
 <figure> <a href="https://themify.me/" title="Exceeded Our Expectation"> <img src="https://themify.me/demo/themes/corporate/files/2008/11/208729672-70x70.jpg" width="70" height="70" alt="208729672" srcset="https://themify.me/demo/themes/corporate/files/2008/11/208729672-70x70.jpg 70w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-72x72.jpg 72w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-80x80.jpg 80w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-100x100.jpg 100w, https://themify.me/demo/themes/corporate/files/2008/11/208729672-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2008/11/208729672.jpg 800w" sizes="(max-width: 70px) 100vw, 70px" /> </a> </figure> <p> <a href="https://themify.me/" title="Exceeded Our Expectation">&mdash; Vanessa</a>Manager </p> </article>
 <h2 style="text-align: center;">Progress Bars</h2><h3 style="text-align: center;">Any color, width, and label</h3><p style="text-align: center;"><i>Social Networking</i></p><p style="text-align: center;"><i>Graphic Design</i></p><p style="text-align: center;"><i>Copyedit</i></p>
 <h2 style="text-align: center;">WooCommerce Shop</h2><h3 style="text-align: center;">Matching WooCommerce styling </h3> <ul>
 <li> <a href="https://themify.me/demo/themes/corporate/product/builder-product/"> Sale! <img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-670x670.jpg 670w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720-978x978.jpg 978w, //themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720.jpg 720w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Builder Product</h2>Rated <strong>5.00</strong> out of 5 <del>&pound;79.00</del> <ins>&pound;49.00</ins> </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=85" data-quantity="1" data-product_id="85" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/era/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/eraLX-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/eraLX-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-670x670.jpg 670w, //themify.me/demo/themes/corporate/files/2012/02/eraLX-978x978.jpg 978w, //themify.me/demo/themes/corporate/files/2012/02/eraLX.jpg 800w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Era</h2> &pound;69.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=83" data-quantity="1" data-product_id="83" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/vansera/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-362x362.jpeg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-362x362.jpeg 362w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-150x150.jpeg 150w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-300x300.jpeg 300w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-90x90.jpeg 90w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-305x305.jpeg 305w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon-670x670.jpeg 670w, //themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon.jpeg 800w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Vansera</h2>Rated <strong>5.00</strong> out of 5 &pound;79.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=80" data-quantity="1" data-product_id="80" data-product_sku="">Add to cart</a></li>
 <li> <a href="https://themify.me/demo/themes/corporate/product/bardenas/"><img width="362" height="362" src="//themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-362x362.jpg" alt="" srcset="//themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-362x362.jpg 362w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-150x150.jpg 150w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-300x300.jpg 300w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-90x90.jpg 90w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720-305x305.jpg 305w, //themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720.jpg 720w" sizes="(max-width: 362px) 100vw, 362px" /><h2>Bardenas</h2> &pound;69.00 </a><a rel="nofollow" href="/demo/themes/corporate/wp-admin/admin-ajax.php?add-to-cart=77" data-quantity="1" data-product_id="77" data-product_sku="">Add to cart</a></li>
 </ul>
 
 <h2 style="text-align: center;">Our Team</h2><h3 style="text-align: center;">Custom post type Team with various layout options</h3>
<article id="team-2513"> 
 <figure> <a href="https://themify.me/demo/themes/corporate/team/clara-black/" title="Clara Black"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/181161062-540x540.jpg" width="540" height="540" alt="181161062" srcset="https://themify.me/demo/themes/corporate/files/2014/09/181161062-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-1024x1024.jpg 1024w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-1024x1024-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/181161062-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/181161062.jpg 1200w" sizes="(max-width: 540px) 100vw, 540px" /> </a> </figure> <h2> <a href="https://themify.me/demo/themes/corporate/team/clara-black/" title="Clara Black"> Clara Black </a> </h2> Web Developer <p> <a href="http://twitter.com/themify"></a>
<a href="http://facebook.com/themify"></a>
<a href="http://pinterest.com/"></a> </p> 
 
 
 
 <p>Duis condimentum sem nec euismod accumsan. Pellentesque ultricies ultricies arcu vel aliquam. Donec quis eleifend justo, ac elementum tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p> 
 <i>PHP</i>
<i>JavaScript</i>
<i>Ruby</i>
 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2513&action=edit">Edit Team</a>] </article>
<article id="team-2511"> 
 <figure> <a href="https://themify.me/demo/themes/corporate/team/allison-peters/" title="Allison Peters"> <img src="https://themify.me/demo/themes/corporate/files/2014/09/141574357-540x540.jpg" width="540" height="540" alt="141574357" srcset="https://themify.me/demo/themes/corporate/files/2014/09/141574357-540x540.jpg 540w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-300x300.jpg 300w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-1024x1024.jpg 1024w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-1024x1024-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-305x305.jpg 305w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-978x978.jpg 978w, https://themify.me/demo/themes/corporate/files/2014/09/141574357-670x670.jpg 670w, https://themify.me/demo/themes/corporate/files/2014/09/141574357.jpg 1200w" sizes="(max-width: 540px) 100vw, 540px" /> </a> </figure> <h2> <a href="https://themify.me/demo/themes/corporate/team/allison-peters/" title="Allison Peters"> Allison Peters </a> </h2> PR <p> <a href="http://twitter.com/themify"></a>
<a href="http://facebook.com/themify"></a>
<a href="http://pinterest.com/"></a> </p> 
 
 
 
 <p>Nullam dolor ex, tincidunt a congue non, aliquam nec est. Phasellus egestas urna et nibh mattis, sit amet malesuada nisi vestibulum. Phasellus accumsan, ante pellentesque suscipit ullamcorper.</p> 
 <i>Social Networking</i>
<i>Graphic Design</i>
<i>Copyedit</i> 
 [<a href="https://themify.me/demo/themes/corporate/wp-admin/post.php?post=2511&action=edit">Edit Team</a>] </article>
 <h2 style="text-align: center;">Animation</h2><h3 style="text-align: center;">Over 60+ animation from slide to bounce to fade</h3>
 <h4 style="text-align: center;">Boounce</h4> 
 <h4 style="text-align: center;">Flash</h4> 
 <h4 style="text-align: center;">Pulse</h4> 
 <h4 style="text-align: center;">Rubber Band</h4> 
 <h4 style="text-align: center;">Shake</h4> 
 <h4 style="text-align: center;">Swing</h4> 
 <h4 style="text-align: center;">Tada</h4> 
 <h4 style="text-align: center;">Flip</h4> 
 <h4 style="text-align: center;">Light speed in</h4> 
 <h4 style="text-align: center;">Rotate out</h4> 
 <h4 style="text-align: center;">Hinge</h4> 
 <h4 style="text-align: center;">Zoom in</h4> 
 <h4 style="text-align: center;">Social Icons</h4><p style="text-align: center;"><a href="http://twitter.com/themify"></a> <a href="http://facebook.com/themify"></a> <a href="https://plus.google.com/102333925087069536501"></a> <a href="https://www.pinterest.com/"></a>
 <h4 style="text-align: center;">Web Butons</h4><p style="text-align: center;"><a href="https://themify.me">Favorites</a> <a href="https://themify.me">Car</a> <a href="https://themify.me">Calculator</a>
 <h4 style="text-align: center;">Text Butons</h4><p style="text-align: center;"><a href="https://themify.me">Email</a> <br /><a href="https://themify.me">416-123-4568</a><!--/themify_builder_static--></p>',
  'post_title' => 'Features',
  'post_excerpt' => '',
  'post_name' => 'features',
  'post_modified' => '2017-09-28 16:26:26',
  'post_modified_gmt' => '2017-09-28 16:26:26',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/demos-copy/',
  'menu_order' => 1,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'header_wrap' => 'transparent',
    'headerwrap_text_color' => '#ffffff',
    'headerwrap_link_color' => '#ffffff',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Video Background<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Upload any custom video as background<\\\\/h3>\\"}}]}],\\"styling\\":{\\"background_type\\":\\"video\\",\\"background_slider_size\\":\\"thumbnail\\",\\"background_slider_mode\\":\\"best-fit\\",\\"background_video\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/after_the_rain_wait_for_me.mp4\\",\\"background_video_options\\":\\"mute\\",\\"background_image\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/car-1140468_1920-1024x768.jpg\\",\\"background_repeat\\":\\"fullcover\\",\\"background_position\\":\\"center-center\\",\\"background_color\\":\\"000000\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"ffffff\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom_unit\\":\\"%\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"row_height\\":\\"fullheight\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Animating Background Colors<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Custom animating background colors anywhere<\\\\/h3>\\"}}]}],\\"styling\\":{\\"background_color\\":\\"654e9c\\",\\"font_color\\":\\"ffffff\\",\\"padding_top\\":\\"14\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"14\\",\\"padding_bottom_unit\\":\\"%\\",\\"custom_css_row\\":\\"animated-bg\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Parallax Scrolling<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Full height parallax scrolling background<\\\\/h3>\\"}}]}],\\"styling\\":{\\"row_height\\":\\"fullheight\\",\\"background_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/193500593_2.jpg\\",\\"background_repeat\\":\\"builder-parallax-scrolling\\",\\"background_color\\":\\"000000\\",\\"font_color\\":\\"ffffff\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Portfolio<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Portfolio post type with filter<\\\\/h3><p>[themify_portfolio_posts style=\\\\\\\\\\\\\\"grid4\\\\\\\\\\\\\\" limit=\\\\\\\\\\\\\\"12\\\\\\\\\\\\\\" display=\\\\\\\\\\\\\\"none\\\\\\\\\\\\\\" post_date=\\\\\\\\\\\\\\"yes\\\\\\\\\\\\\\" post_meta=\\\\\\\\\\\\\\"yes\\\\\\\\\\\\\\"  image_w=\\\\\\\\\\\\\\"400\\\\\\\\\\\\\\" image_h=\\\\\\\\\\\\\\"400\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]}],\\"styling\\":{\\"row_width\\":\\"fullwidth-content\\",\\"background_type\\":\\"image\\",\\"background_color\\":\\"91e9ff_1.00\\",\\"cover_color-type\\":\\"color\\",\\"cover_color_hover-type\\":\\"hover_color\\",\\"font_color\\":\\"111111_1.00\\",\\"link_color\\":\\"000000_1.00\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"0\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Testimonials<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Custom post type Testimonial with various layout options<\\\\/h3><p>[themify_testimonial_posts style=\\\\\\\\\\\\\\"grid2\\\\\\\\\\\\\\" limit=\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\" display=\\\\\\\\\\\\\\"excerpt\\\\\\\\\\\\\\" image_w=\\\\\\\\\\\\\\"70\\\\\\\\\\\\\\" image_h=\\\\\\\\\\\\\\"70\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]}],\\"styling\\":{\\"background_color\\":\\"6abdd9\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Progress Bars<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Any color, width, and label<\\\\/h3><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[progress_bar label=\\\\\\\\\\\\\\"Social Networking\\\\\\\\\\\\\\" color=\\\\\\\\\\\\\\"#13c0e1\\\\\\\\\\\\\\" percentage=\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\"]<\\\\/p><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[progress_bar label=\\\\\\\\\\\\\\"Graphic Design\\\\\\\\\\\\\\" color=\\\\\\\\\\\\\\"#fdd761\\\\\\\\\\\\\\" percentage=\\\\\\\\\\\\\\"80\\\\\\\\\\\\\\"]<\\\\/p><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[progress_bar label=\\\\\\\\\\\\\\"Copyedit\\\\\\\\\\\\\\" color=\\\\\\\\\\\\\\"#fa5ba5\\\\\\\\\\\\\\" percentage=\\\\\\\\\\\\\\"90\\\\\\\\\\\\\\"]<\\\\/p>\\",\\"padding_right\\":\\"10\\",\\"padding_right_unit\\":\\"%\\",\\"padding_left\\":\\"10\\",\\"padding_left_unit\\":\\"%\\"}}]}],\\"styling\\":{\\"background_color\\":\\"000000\\",\\"font_color\\":\\"ffffff\\",\\"padding_top\\":\\"10\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"10\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">WooCommerce Shop<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Matching WooCommerce styling <\\\\/h3><p>[recent_products per_page=\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\" columns=\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]}],\\"styling\\":{\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\",\\"margin_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"7\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Our Team<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Custom post type Team with various layout options<\\\\/h3><p>[themify_team_posts style=\\\\\\\\\\\\\\"grid2\\\\\\\\\\\\\\" display=\\\\\\\\\\\\\\"excerpt\\\\\\\\\\\\\\" limit=\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\" image_w=\\\\\\\\\\\\\\"540\\\\\\\\\\\\\\" image_h=\\\\\\\\\\\\\\"540\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]}],\\"styling\\":{\\"background_color\\":\\"cae2e6\\",\\"font_color\\":\\"000000\\",\\"link_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"8\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Animation<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Over 60+ animation from slide to bounce to fade<\\\\/h3>\\"}}]}],\\"styling\\":{\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"9\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Boounce<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"bounce\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Flash<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"flash\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Pulse<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"pulse\\"}}]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Rubber Band<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"rubberBand\\"}}]}]},{\\"row_order\\":\\"10\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Shake<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"shake\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Swing<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"swing\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Tada<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"tada\\"}}]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Flip<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"flip\\"}}]}]},{\\"row_order\\":\\"11\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Light speed in<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"lightSpeedIn\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Rotate out<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"rotateOut\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Hinge<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"hinge\\"}}]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Zoom in<\\\\/h4>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"zoomIn\\"}}]}]},{\\"row_order\\":\\"12\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Social Icons<\\\\/h4><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[themify_icon icon=\\\\\\\\\\\\\\"fa-twitter\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"http:\\\\/\\\\/twitter.com\\\\/themify\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"xlarge\\\\\\\\\\\\\\"] [themify_icon icon=\\\\\\\\\\\\\\"fa-facebook\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"http:\\\\/\\\\/facebook.com\\\\/themify\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"xlarge\\\\\\\\\\\\\\"] [themify_icon icon=\\\\\\\\\\\\\\"fa-google-plus\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/plus.google.com\\\\/102333925087069536501\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"xlarge\\\\\\\\\\\\\\"] [themify_icon icon=\\\\\\\\\\\\\\"fa-pinterest\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/www.pinterest.com\\\\/\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"xlarge\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Web Butons<\\\\/h4><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[themify_icon icon=\\\\\\\\\\\\\\"fa-heart\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"large\\\\\\\\\\\\\\" label=\\\\\\\\\\\\\\"Favorites\\\\\\\\\\\\\\"] [themify_icon icon=\\\\\\\\\\\\\\"fa-car\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"large\\\\\\\\\\\\\\" label=\\\\\\\\\\\\\\"Car\\\\\\\\\\\\\\"] [themify_icon icon=\\\\\\\\\\\\\\"fa-calculator\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"large\\\\\\\\\\\\\\" label=\\\\\\\\\\\\\\"Calculator\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Text Butons<\\\\/h4><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">[themify_icon icon=\\\\\\\\\\\\\\"fa-paper-plane\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"large\\\\\\\\\\\\\\" label=\\\\\\\\\\\\\\"Email\\\\\\\\\\\\\\"] <br \\\\/>[themify_icon icon=\\\\\\\\\\\\\\"fa-phone\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"large\\\\\\\\\\\\\\" label=\\\\\\\\\\\\\\"416-123-4568\\\\\\\\\\\\\\"]<\\\\/p>\\"}}]}],\\"styling\\":{\\"background_color\\":\\"ededed\\",\\"font_color\\":\\"000000\\",\\"link_color\\":\\"000000\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\",\\"margin_top\\":\\"4\\",\\"margin_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"13\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2527,
  'post_date' => '2014-09-10 03:08:55',
  'post_date_gmt' => '2014-09-10 03:08:55',
  'post_content' => '<!--themify_builder_static--><h1 style="text-align: center;">From day to night</h1> <h3 style="text-align: center;">we got you covered</h3>
 
 <a href="https://themify.me/" > Call Us Now </a> 
 <h2 style="text-align: center;">Discover how Themify can help your business:</h2><p> </p>
 
 
 
 
 <h3> Monitor </h3> <p style="text-align: center;">Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula. </p> 
 
 
 
 
 
 <h3> Comfort </h3> <p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a lige!</p> 
 
 
 
 
 
 <h3> Security </h3> <p>Suspendisse ornare ut massa in sagittis. Sed tempus imperdiet libero at dignissim. </p> 
 
 
 
 
 
 <h3> 24/7 Support </h3> <p>Arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligisse ornare ut.</p> 
 
 <h2 style="text-align: center;">Many small businesses thrive with Themify</h2><h3 style="text-align: center;">Meet a few of our customers and see the impact Themify has had with their lives.</h3>
 <h2 style="text-align: center;">Featured</h2><h3 style="text-align: center;">Check some other brands where we&#8217;ve been featured&#8230;.</h3>
 <ul data-id="slider-0-" data-visible="5" data-scroll="1" data-auto-scroll="1" data-speed="1" data-wrap="no" data-arrow="no" data-pagination="no" data-effect="continuously" data-height="variable" data-pause-on-hover="resume" > 
 <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo6-100x100.png" width="100" height="100" alt="logo6" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo6-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo6-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo6-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo5-100x100.png" width="100" height="100" alt="logo5" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo5-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo5-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo5-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo4-100x100.png" width="100" height="100" alt="logo4" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo4-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo4-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo4-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo3-100x100.png" width="100" height="100" alt="logo3" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo3-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo3-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo3-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo2-100x100.png" width="100" height="100" alt="logo2" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo2-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo2-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo2-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> <li> <img src="https://themify.me/demo/themes/corporate/files/2014/09/logo1-100x100.png" width="100" height="100" alt="logo1" srcset="https://themify.me/demo/themes/corporate/files/2014/09/logo1-100x100.png 100w, https://themify.me/demo/themes/corporate/files/2014/09/logo1-90x90.png 90w, https://themify.me/demo/themes/corporate/files/2014/09/logo1-200x200.png 200w" sizes="(max-width: 100px) 100vw, 100px" /> </li> </ul> 
 
 <img src="https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-500x500.jpg" width="500" height="500" alt="sb10064068ac-001" srcset="https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-500x500.jpg 500w, https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-150x150.jpg 150w, https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-90x90.jpg 90w, https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-362x362.jpg 362w, https://themify.me/demo/themes/corporate/files/2013/06/sb10064068ac-001-305x305.jpg 305w" sizes="(max-width: 500px) 100vw, 500px" /> 
 <h2>Start making your business better!</h2> <h3>Integer sit amet tellus ut dolor sagittis maximus eget a massa.</h3>
 
 <a href="https://themify.me/" > Join Now </a><!--/themify_builder_static-->',
  'post_title' => 'Company Landing',
  'post_excerpt' => '',
  'post_name' => 'company-landing',
  'post_modified' => '2017-10-29 14:06:51',
  'post_modified_gmt' => '2017-10-29 14:06:51',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?page_id=2527',
  'menu_order' => 2,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'header_wrap' => 'transparent',
    'headerwrap_text_color' => '#000000',
    'headerwrap_link_color' => '#000000',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">From day to night<\\\\/h1>\\\\n<h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">we got you covered<\\\\/h3>\\",\\"animation_effect\\":\\"bounceIn\\",\\"cid\\":\\"c17\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"xlarge\\",\\"buttons_style\\":\\"outline\\",\\"content_button\\":[{\\"label\\":\\"Call Us Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\"}]}}]}],\\"styling\\":{\\"row_height\\":\\"fullheight\\",\\"background_type\\":\\"video\\",\\"background_video\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/golden_gate_bridge.mp4\\",\\"background_image\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/golden_gate_bridge.jpg\\",\\"background_repeat\\":\\"fullcover\\",\\"background_color\\":\\"000000\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"checkbox_padding_apply_all\\":\\"padding\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Discover how Themify can help your business:<\\\\/h2><p> <\\\\/p>\\",\\"padding_bottom\\":\\"0\\",\\"margin_bottom\\":\\"-30\\",\\"cid\\":\\"c32\\"}}]}],\\"styling\\":{\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Monitor\\",\\"content_feature\\":\\"<p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula. <\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"100\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"6b6666\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-video-camera\\",\\"icon_color_feature\\":\\"000000\\",\\"animation_effect\\":\\"fly-in\\",\\"cid\\":\\"c43\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Comfort\\",\\"content_feature\\":\\"<p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a lige!<\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"100\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"6b6666\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-home\\",\\"icon_color_feature\\":\\"000000\\",\\"animation_effect\\":\\"fly-in\\",\\"cid\\":\\"c51\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Security\\",\\"content_feature\\":\\"<p>Suspendisse ornare ut massa in sagittis. Sed tempus imperdiet libero at dignissim. <\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"100\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"6b6666\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-key\\",\\"icon_color_feature\\":\\"000000\\",\\"animation_effect\\":\\"fly-in\\",\\"cid\\":\\"c59\\"}}]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"24\\\\/7 Support\\",\\"content_feature\\":\\"<p>Arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligisse ornare ut.<\\\\/p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"100\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"6b6666\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-user\\",\\"icon_color_feature\\":\\"000000\\",\\"animation_effect\\":\\"fly-in\\",\\"cid\\":\\"c67\\"}}]}],\\"styling\\":{\\"animation_effect\\":\\"fly-in\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Many small businesses thrive with Themify<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Meet a few of our customers and see the impact Themify has had with their lives.<\\\\/h3>\\",\\"cid\\":\\"c78\\"}},{\\"mod_name\\":\\"testimonial\\",\\"mod_settings\\":{\\"layout_testimonial\\":\\"grid2\\",\\"category_testimonial\\":\\"testimonials|multiple\\",\\"post_per_page_testimonial\\":\\"4\\",\\"order_testimonial\\":\\"desc\\",\\"orderby_testimonial\\":\\"date\\",\\"display_testimonial\\":\\"content\\",\\"img_width_testimonial\\":\\"100\\",\\"img_height_testimonial\\":\\"100\\",\\"hide_page_nav_testimonial\\":\\"yes\\",\\"animation_effect\\":\\"fly-in\\"}}]}],\\"styling\\":{\\"background_color\\":\\"4d86c7\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\",\\"custom_css_row\\":\\"animated-bg\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Featured<\\\\/h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Check some other brands where we\\\\\\\\\\\'ve been featured....<\\\\/h3>\\",\\"padding_top\\":\\"0\\",\\"cid\\":\\"c93\\"}},{\\"mod_name\\":\\"slider\\",\\"mod_settings\\":{\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"layout_display_slider\\":\\"image\\",\\"post_type\\":\\"post\\",\\"taxonomy\\":\\"category\\",\\"blog_category_slider\\":\\"0|multiple\\",\\"portfolio_category_slider\\":\\"0|multiple\\",\\"testimonial_category_slider\\":\\"0|multiple\\",\\"order_slider\\":\\"desc\\",\\"orderby_slider\\":\\"date\\",\\"display_slider\\":\\"content\\",\\"hide_post_title_slider\\":\\"yes\\",\\"unlink_post_title_slider\\":\\"yes\\",\\"hide_feat_img_slider\\":\\"yes\\",\\"unlink_feat_img_slider\\":\\"yes\\",\\"open_link_new_tab_slider\\":\\"yes\\",\\"img_content_slider\\":[{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo6.png\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo5.png\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo4.png\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo3.png\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo2.png\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/logo1.png\\"}],\\"layout_slider\\":\\"slider-agency\\",\\"img_w_slider\\":\\"100\\",\\"img_h_slider\\":\\"100\\",\\"visible_opt_slider\\":\\"5\\",\\"auto_scroll_opt_slider\\":\\"1\\",\\"scroll_opt_slider\\":\\"1\\",\\"speed_opt_slider\\":\\"normal\\",\\"effect_slider\\":\\"continuously\\",\\"pause_on_hover_slider\\":\\"resume\\",\\"wrap_slider\\":\\"no\\",\\"show_nav_slider\\":\\"no\\",\\"show_arrow_slider\\":\\"no\\",\\"height_slider\\":\\"variable\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2013\\\\/06\\\\/sb10064068ac-001.jpg\\",\\"appearance_image\\":\\"circle\\",\\"width_image\\":\\"500\\",\\"height_image\\":\\"500\\",\\"animation_effect\\":\\"fly-in\\",\\"cid\\":\\"c108\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"padding_top\\":\\"6\\",\\"padding_top_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h2>Start making your business better!<\\\\/h2>\\\\n<h3>Integer sit amet tellus ut dolor sagittis maximus eget a massa.<\\\\/h3>\\",\\"cid\\":\\"c116\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"xlarge\\",\\"buttons_style\\":\\"circle\\",\\"content_button\\":[{\\"label\\":\\"Join Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"blue\\"}],\\"cid\\":\\"c120\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"padding_top\\":\\"3\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2172,
  'post_date' => '2013-07-16 19:14:30',
  'post_date_gmt' => '2013-07-16 19:14:30',
  'post_content' => '',
  'post_title' => 'Portfolio',
  'post_excerpt' => '',
  'post_name' => 'portfolio',
  'post_modified' => '2017-08-21 06:28:35',
  'post_modified_gmt' => '2017-08-21 06:28:35',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2172',
  'menu_order' => 3,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'display_content' => 'content',
    'portfolio_query_category' => '0',
    'portfolio_layout' => 'grid4',
    'portfolio_posts_per_page' => '12',
    'portfolio_display_content' => 'none',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2210,
  'post_date' => '2013-10-11 19:06:23',
  'post_date_gmt' => '2013-10-11 19:06:23',
  'post_content' => '',
  'post_title' => 'Portfolio - 3 Columns',
  'post_excerpt' => '',
  'post_name' => 'portfolio-3-columns',
  'post_modified' => '2017-08-21 06:28:38',
  'post_modified_gmt' => '2017-08-21 06:28:38',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2210',
  'menu_order' => 3,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'display_content' => 'content',
    'image_width' => '390',
    'image_height' => '390',
    'portfolio_query_category' => '0',
    'portfolio_layout' => 'grid3',
    'portfolio_posts_per_page' => '9',
    'portfolio_display_content' => 'none',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2212,
  'post_date' => '2013-10-11 19:07:08',
  'post_date_gmt' => '2013-10-11 19:07:08',
  'post_content' => '',
  'post_title' => 'Portfolio - 2 Columns',
  'post_excerpt' => '',
  'post_name' => 'portfolio-2-columns',
  'post_modified' => '2017-08-21 06:28:36',
  'post_modified_gmt' => '2017-08-21 06:28:36',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2212',
  'menu_order' => 3,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'display_content' => 'content',
    'image_width' => '580',
    'image_height' => '580',
    'portfolio_query_category' => '0',
    'portfolio_layout' => 'grid2',
    'portfolio_posts_per_page' => '6',
    'portfolio_display_content' => 'none',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2557,
  'post_date' => '2014-09-10 19:52:22',
  'post_date_gmt' => '2014-09-10 19:52:22',
  'post_content' => '<!--themify_builder_static--><h1>The App.</h1> <h3>Sign up today to get access to this amazing payment solution.</h3> <p> </p>
 
 <a href="https://themify.me/" > Sign Up Now </a> 
 
 Call us: 1-888-123-4567 Email us: hello@noname.com 
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/08/ios-500x335.png" width="500" alt="ios" srcset="https://themify.me/demo/themes/corporate/files/2014/08/ios-500x335.png 500w, https://themify.me/demo/themes/corporate/files/2014/08/ios-300x201.png 300w, https://themify.me/demo/themes/corporate/files/2014/08/ios-450x301.png 450w, https://themify.me/demo/themes/corporate/files/2014/08/ios.png 600w" sizes="(max-width: 500px) 100vw, 500px" /> 
 <h1>Get started today with Web Apps.</h1><h3>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac. Quisque hendrerit suscipit dictum. Quisque nibh libero.</h3>
 <h4>Level 1</h4><h2>$0<br />Free</h2><h6>10% + $1<br /> per transaction or less</h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.</p><a href="https://themify.me">    Buy    </a> 
 <h4>Level 2</h4><h2>$5<br />Monthly</h2><h6>20% + $2<br /> per transaction or less</h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.</p><a href="https://themify.me">    Buy    </a> 
 <h4>Level 3</h4><h2>$25<br />Yearly</h2><h6>30% + $3<br /> per transaction or less</h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.</p><a href="https://themify.me">    Buy    </a> 
 <h3>Add the Wepp App to your Website.</h3><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula. Suspendisse ornare ut massa in sagittis. Sed tempus imperdiet libero at dignissim. Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris. Fusce nec sem lacinia, gravida risus sed, rutrum leo. Vivamus turpis est, laoreet et convallis sed, dictum a massa.</p>
 
 <img src="https://themify.me/demo/themes/corporate/files/2013/07/parallax-responsive-design-500x350.jpg" width="500" alt="parallax responsive design" srcset="https://themify.me/demo/themes/corporate/files/2013/07/parallax-responsive-design-500x350.jpg 500w, https://themify.me/demo/themes/corporate/files/2013/07/parallax-responsive-design-300x210.jpg 300w, https://themify.me/demo/themes/corporate/files/2013/07/parallax-responsive-design.jpg 651w" sizes="(max-width: 500px) 100vw, 500px" /> 
 <h2>Download the Web App and boost your sales by up to 40%</h2> <h3>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris.</h3>
 
 <a href="https://themify.me/" > Learn More </a> <a href="https://themify.me/" > Download </a> 
 <h1>Do it now. Do it fast. </h1> <p>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris. Fusce nec sem lacinia, gravida risus sed, rutrum leo. Vivamus turpis.</p>
 
 <a href="https://themify.me/" > Sign Up Now </a> 
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/ipad-image1-800x904.jpg" width="800" alt="ipad image1" srcset="https://themify.me/demo/themes/corporate/files/2014/09/ipad-image1.jpg 800w, https://themify.me/demo/themes/corporate/files/2014/09/ipad-image1-265x300.jpg 265w" sizes="(max-width: 800px) 100vw, 800px" /> 
 <h2>&#8220;This web app has done miracles for both big and small businesses. Raising both their sales and their overall efficiency.&#8221;</h2><h3><strong>Max Donohue, Chief Executive Officer </strong></h3>
 <h3>Everything done through this one web app. Easy and simple.</h3> <p> </p>
 
 <a href="https://themify.me/" > Sign Up Now </a> 
 
 Call us: 1-888-123-4567 Email us: hello@noname.com<!--/themify_builder_static-->',
  'post_title' => 'Web App Page',
  'post_excerpt' => '',
  'post_name' => 'web-app-page',
  'post_modified' => '2017-10-29 14:36:14',
  'post_modified_gmt' => '2017-10-29 14:36:14',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?page_id=2557',
  'menu_order' => 3,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'header_wrap' => 'transparent',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"font_color\\":\\"ffffff\\",\\"padding_top_unit\\":\\"%\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h1>The App.<\\\\/h1>\\\\n<h3>Sign up today to get access to this amazing payment solution.<\\\\/h3>\\\\n<p> <\\\\/p>\\",\\"animation_effect\\":\\"fadeInUp\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"10\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"large\\",\\"buttons_style\\":\\"circle\\",\\"content_button\\":[{\\"label\\":\\"Sign Up Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"blue\\"}],\\"animation_effect\\":\\"fadeInUp\\"}},{\\"mod_name\\":\\"icon\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"40\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"icon_size\\":\\"normal\\",\\"icon_style\\":\\"none\\",\\"icon_arrangement\\":\\"icon_vertical\\",\\"content_icon\\":[{\\"icon\\":\\"fa-phone\\",\\"icon_color_bg\\":\\"transparent\\",\\"label\\":\\"Call us: 1-888-123-4567\\",\\"link_options\\":\\"regular\\"},{\\"icon\\":\\"fa-envelope-o\\",\\"label\\":\\" Email us: hello@noname.com\\",\\"link_options\\":\\"regular\\"}],\\"animation_effect\\":\\"fadeInUp\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/08\\\\/ios.png\\",\\"width_image\\":\\"500\\",\\"animation_effect\\":\\"fadeIn\\",\\"margin_top\\":\\"4\\",\\"margin_top_unit\\":\\"%\\",\\"cid\\":\\"c27\\"}}]}],\\"styling\\":{\\"background_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/193500593_2-1024x715.jpg\\",\\"background_repeat\\":\\"builder-parallax-scrolling\\",\\"background_color\\":\\"695c51\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"padding_top\\":\\"16\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h1>Get started today with Web Apps.<\\\\/h1><h3>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac. Quisque hendrerit suscipit dictum. Quisque nibh libero.<\\\\/h3>\\",\\"font_color\\":\\"000000\\",\\"text_align\\":\\"center\\",\\"padding_bottom\\":\\"15\\",\\"cid\\":\\"c38\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_color\\":\\"c3d9db\\",\\"font_color\\":\\"000000\\",\\"link_color\\":\\"000000\\",\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Level 1<\\\\/h4><h2>$0<br \\\\/>Free<\\\\/h2><h6>10% + $1<br \\\\/> per transaction or less<\\\\/h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.<\\\\/p><p>[themify_button style=\\\\\\\\\\\\\\"Large blue rounded\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" ]    Buy    [\\\\/themify_button]<\\\\/p>\\",\\"appearance_box\\":\\"rounded|gradient\\",\\"animation_effect\\":\\"bounceIn\\",\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"000000\\",\\"text_align\\":\\"center\\",\\"margin_bottom\\":\\"20\\",\\"cid\\":\\"c49\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Level 2<\\\\/h4><h2>$5<br \\\\/>Monthly<\\\\/h2><h6>20% + $2<br \\\\/> per transaction or less<\\\\/h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.<\\\\/p><p>[themify_button style=\\\\\\\\\\\\\\"Large blue rounded\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" ]    Buy    [\\\\/themify_button]<\\\\/p>\\",\\"appearance_box\\":\\"rounded|gradient\\",\\"animation_effect\\":\\"bounceIn\\",\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"000000\\",\\"text_align\\":\\"center\\",\\"padding_bottom\\":\\"20\\",\\"cid\\":\\"c57\\"}}]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Level 3<\\\\/h4><h2>$25<br \\\\/>Yearly<\\\\/h2><h6>30% + $3<br \\\\/> per transaction or less<\\\\/h6><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula.<\\\\/p><p>[themify_button style=\\\\\\\\\\\\\\"Large blue rounded\\\\\\\\\\\\\\" link=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" ]    Buy    [\\\\/themify_button]<\\\\/p>\\",\\"appearance_box\\":\\"rounded|gradient\\",\\"animation_effect\\":\\"bounceIn\\",\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"000000\\",\\"text_align\\":\\"center\\",\\"margin_bottom\\":\\"20\\",\\"cid\\":\\"c65\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_color\\":\\"c3d9db\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h3>Add the Wepp App to your Website.<\\\\/h3><p>Mauris laoreet, arcu eu facilisis fermentum, nisi arcu congue tortor, vel porta leo est a ligula. Suspendisse ornare ut massa in sagittis. Sed tempus imperdiet libero at dignissim. Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris. Fusce nec sem lacinia, gravida risus sed, rutrum leo. Vivamus turpis est, laoreet et convallis sed, dictum a massa.<\\\\/p>\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"15\\",\\"padding_top_unit\\":\\"%\\",\\"cid\\":\\"c76\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2013\\\\/07\\\\/parallax-responsive-design.jpg\\",\\"width_image\\":\\"500\\",\\"cid\\":\\"c84\\"}}]}],\\"styling\\":{\\"background_color\\":\\"ffffff\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"font_color\\":\\"ffffff\\",\\"text_align\\":\\"center\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"10\\",\\"padding_right_unit\\":\\"%\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"10\\",\\"padding_left_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h2>Download the Web App and boost your sales by up to 40%<\\\\/h2>\\\\n<h3>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris.<\\\\/h3>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"20\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"large\\",\\"buttons_style\\":\\"circle\\",\\"content_button\\":[{\\"label\\":\\"Learn More\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\"},{\\"label\\":\\"Download\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\"}],\\"animation_effect\\":\\"fadeInUp\\"}}]}],\\"styling\\":{\\"background_color\\":\\"54cca2\\",\\"padding_top\\":\\"60\\",\\"padding_bottom\\":\\"60\\",\\"custom_css_row\\":\\"animated-bg\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_color\\":\\"ffffff\\",\\"background_repeat\\":\\"repeat\\",\\"font_color\\":\\"000000\\",\\"text_align\\":\\"center\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"30\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h1>Do it now. Do it fast. <\\\\/h1>\\\\n<p>Quisque hendrerit suscipit dictum. Quisque nibh libero, eleifend mattis tortor ac, laoreet aliquam mauris. Fusce nec sem lacinia, gravida risus sed, rutrum leo. Vivamus turpis.<\\\\/p>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"10\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"xlarge\\",\\"buttons_style\\":\\"circle\\",\\"content_button\\":[{\\"label\\":\\"Sign Up Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"blue\\"}],\\"animation_effect\\":\\"fadeInUp\\"}},{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-center\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/ipad-image1.jpg\\",\\"width_image\\":\\"800\\",\\"animation_effect\\":\\"fly-in\\",\\"text_align\\":\\"center\\",\\"cid\\":\\"c110\\"}}]}],\\"styling\\":{\\"padding_top\\":\\"4\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"0\\"}},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2>\\\\\\\\\\\\\\"This web app has done miracles for both big and small businesses. Raising both their sales and their overall efficiency.\\\\\\\\\\\\\\"<\\\\/h2><h3><strong>Max Donohue, Chief Executive Officer <\\\\/strong><\\\\/h3>\\",\\"font_color\\":\\"ffffff\\",\\"text_align\\":\\"center\\",\\"padding_top\\":\\"40\\",\\"padding_bottom\\":\\"40\\",\\"cid\\":\\"c121\\"}}]}],\\"styling\\":{\\"row_width\\":\\"fullwidth\\",\\"background_color\\":\\"7b4fbd\\",\\"text_align\\":\\"center\\",\\"padding_right\\":\\"5\\",\\"padding_right_unit\\":\\"%\\",\\"padding_left\\":\\"5\\",\\"padding_left_unit\\":\\"%\\"}},{\\"row_order\\":\\"7\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"text_align\\":\\"center\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h3>Everything done through this one web app. Easy and simple.<\\\\/h3>\\\\n<p> <\\\\/p>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"10\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"large\\",\\"buttons_style\\":\\"circle\\",\\"content_button\\":[{\\"label\\":\\"Sign Up Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"blue\\"}]}},{\\"mod_name\\":\\"icon\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"margin_bottom\\":\\"40\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"icon_size\\":\\"normal\\",\\"icon_style\\":\\"none\\",\\"icon_arrangement\\":\\"icon_vertical\\",\\"content_icon\\":[{\\"icon\\":\\"fa-phone\\",\\"icon_color_bg\\":\\"transparent\\",\\"label\\":\\"Call us: 1-888-123-4567\\",\\"link_options\\":\\"regular\\"},{\\"icon\\":\\"fa-envelope-o\\",\\"label\\":\\" Email us: hello@noname.com\\",\\"link_options\\":\\"regular\\"}]}}]}],\\"styling\\":{\\"background_color\\":\\"64b3b3\\",\\"font_color\\":\\"ffffff\\",\\"link_color\\":\\"ffffff\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"4\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"8\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 106,
  'post_date' => '2013-07-12 06:57:37',
  'post_date_gmt' => '2013-07-12 06:57:37',
  'post_content' => '<!--themify_builder_static--><h1 style="text-align: center;">All In One Software!</h1>
 
 <a href="https://themify.me/" > Download Now </a> 
 <h2>Slide right through!</h2><p>Proin gravida, ante eu aliquet fringilla, nisi nisl fringilla elit, sit amet gravida magna magna quis dolor. Nulla vel eros congue, aliquam dolor ut, ultricies felis. Nam nisi mauris, porttitor ac augue vel, hendrerit condimentum mauris.</p><p><a title="Themify.me" href="https://themify.me" target="_blank">Limitless Possibilities</a></p>
 <p><img style="margin: 0;" src="https://themify.me/demo/themes/corporate/files/2014/08/android.png" alt="android" width="412" height="508" /></p>
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/08/ios-450x301.png" width="450" alt="ios" srcset="https://themify.me/demo/themes/corporate/files/2014/08/ios-450x301.png 450w, https://themify.me/demo/themes/corporate/files/2014/08/ios-300x201.png 300w, https://themify.me/demo/themes/corporate/files/2014/08/ios-500x335.png 500w, https://themify.me/demo/themes/corporate/files/2014/08/ios.png 600w" sizes="(max-width: 450px) 100vw, 450px" /> 
 <h2>One App for All Platforms</h2><p>Donec pulvinar maximus convallis. Duis vel metus ut est eleifend dictum. Nullam vel velit at ex molestie faucibus. Fusce venenatis dictum augue vitae auctor.</p><p><a title="Themify.me" href="https://themify.me" target="_blank">Download App</a></p>
 <h2 style="text-align: center;">Sync Between Devices</h2><p style="text-align: center;">Pellentesque viverra facilisis vestibulum. Cras condimentum eget dui sit amet malesuada. Nunc eget nunc blandit, aliquet diam eget, dapibus massa. Aenean vel ullamcorper nulla. Praesent neque lectus, molestie semper augue nec, facilisis ultricies nibh.</p>
 <h2>Free Account</h2> <p>Duis ultricies, urna at facilisis egestas, erat ex ornare est, at elementum ex nisi sed velit. Proin nec vehicula est, id dignissim tellus. Nunc sagittis justo in mauris volutpat euismod. Integer sit amet sollicitudin nisi.</p>
 
 <a href="https://themify.me/" > Download Now </a> 
 
 <img src="https://themify.me/demo/themes/corporate/files/2014/09/ipad-image-transparent-300x375.png" width="300" alt="ipad image transparent" srcset="https://themify.me/demo/themes/corporate/files/2014/09/ipad-image-transparent-300x375.png 300w, https://themify.me/demo/themes/corporate/files/2014/09/ipad-image-transparent-240x300.png 240w, https://themify.me/demo/themes/corporate/files/2014/09/ipad-image-transparent.png 600w" sizes="(max-width: 300px) 100vw, 300px" /><!--/themify_builder_static-->',
  'post_title' => 'Software Page',
  'post_excerpt' => '',
  'post_name' => 'software',
  'post_modified' => '2017-10-29 14:22:46',
  'post_modified_gmt' => '2017-10-29 14:22:46',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=106',
  'menu_order' => 4,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'content_width' => 'full_width',
    'hide_page_title' => 'yes',
    'display_content' => 'content',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">All In One Software!<\\\\/h1>\\",\\"animation_effect\\":\\"fadeInDownBig\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"text_align\\":\\"center\\",\\"font_weight\\":\\"bold\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"xlarge\\",\\"buttons_style\\":\\"rounded\\",\\"content_button\\":[{\\"label\\":\\"Download Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"purple\\"}]}}]}],\\"styling\\":{\\"background_type\\":\\"video\\",\\"background_video\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/zuerich_airport.mp4\\",\\"background_image\\":\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/demo-videos\\\\/zuerich_airport.jpg\\",\\"background_repeat\\":\\"fullcover\\",\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"ffffff\\",\\"padding_top\\":\\"200\\",\\"padding_bottom\\":\\"200\\",\\"checkbox_margin_apply_all\\":\\"margin\\",\\"checkbox_border_apply_all\\":\\"border\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2>Slide right through!<\\\\/h2><p>Proin gravida, ante eu aliquet fringilla, nisi nisl fringilla elit, sit amet gravida magna magna quis dolor. Nulla vel eros congue, aliquam dolor ut, ultricies felis. Nam nisi mauris, porttitor ac augue vel, hendrerit condimentum mauris.<\\\\/p><p><a title=\\\\\\\\\\\\\\"Themify.me\\\\\\\\\\\\\\" href=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" target=\\\\\\\\\\\\\\"_blank\\\\\\\\\\\\\\">Limitless Possibilities<\\\\/a><\\\\/p>\\",\\"margin_top\\":\\"150\\",\\"cid\\":\\"c27\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<p><img class=\\\\\\\\\\\\\\"alignright wp-image-2585 size-full\\\\\\\\\\\\\\" style=\\\\\\\\\\\\\\"margin: 0;\\\\\\\\\\\\\\" src=\\\\\\\\\\\\\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/08\\\\/android.png\\\\\\\\\\\\\\" alt=\\\\\\\\\\\\\\"android\\\\\\\\\\\\\\" width=\\\\\\\\\\\\\\"412\\\\\\\\\\\\\\" height=\\\\\\\\\\\\\\"508\\\\\\\\\\\\\\" \\\\/><\\\\/p>\\\\n\\",\\"padding_top\\":\\"0\\",\\"padding_right\\":\\"0\\",\\"padding_bottom\\":\\"0\\",\\"padding_left\\":\\"0\\",\\"margin_top\\":\\"0\\",\\"margin_right\\":\\"0\\",\\"margin_bottom\\":\\"0\\",\\"margin_left\\":\\"0\\",\\"cid\\":\\"c35\\"}}]}],\\"styling\\":{\\"background_type\\":\\"image\\",\\"background_color\\":\\"ffffff\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"7\\",\\"padding_top_unit\\":\\"%\\",\\"margin_bottom\\":\\"0\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-top\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/08\\\\/ios.png\\",\\"appearance_image\\":\\"rounded\\",\\"width_image\\":\\"450\\",\\"cid\\":\\"c46\\"}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2>One App for All Platforms<\\\\/h2><p>Donec pulvinar maximus convallis. Duis vel metus ut est eleifend dictum. Nullam vel velit at ex molestie faucibus. Fusce venenatis dictum augue vitae auctor.<\\\\/p><p><a title=\\\\\\\\\\\\\\"Themify.me\\\\\\\\\\\\\\" href=\\\\\\\\\\\\\\"https:\\\\/\\\\/themify.me\\\\\\\\\\\\\\" target=\\\\\\\\\\\\\\"_blank\\\\\\\\\\\\\\">Download App<\\\\/a><\\\\/p>\\",\\"margin_top\\":\\"100\\",\\"cid\\":\\"c54\\"}}]}],\\"styling\\":{\\"background_color\\":\\"c4df9b\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"150\\",\\"padding_bottom\\":\\"150\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Sync Between Devices<\\\\/h2><p style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Pellentesque viverra facilisis vestibulum. Cras condimentum eget dui sit amet malesuada. Nunc eget nunc blandit, aliquet diam eget, dapibus massa. Aenean vel ullamcorper nulla. Praesent neque lectus, molestie semper augue nec, facilisis ultricies nibh.<\\\\/p>\\",\\"cid\\":\\"c65\\"}}]}],\\"styling\\":{\\"background_image\\":\\"https://themify.me/demo/themes/corporate-dev\\\\/files\\\\/2014\\\\/08\\\\/wood_pat.jpg\\",\\"background_repeat\\":\\"builder-parallax-scrolling\\",\\"font_color\\":\\"ffffff\\",\\"padding_top\\":\\"9\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"9\\",\\"padding_bottom_unit\\":\\"%\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"background_repeat\\":\\"repeat\\",\\"padding_top\\":\\"10\\",\\"padding_top_unit\\":\\"%\\",\\"margin_top_unit\\":\\"%\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"content_text\\":\\"<h2>Free Account<\\\\/h2>\\\\n<p>Duis ultricies, urna at facilisis egestas, erat ex ornare est, at elementum ex nisi sed velit. Proin nec vehicula est, id dignissim tellus. Nunc sagittis justo in mauris volutpat euismod. Integer sit amet sollicitudin nisi.<\\\\/p>\\"}},{\\"mod_name\\":\\"buttons\\",\\"mod_settings\\":{\\"background_image-type\\":\\"image\\",\\"checkbox_padding_apply_all\\":\\"1\\",\\"checkbox_margin_apply_all\\":\\"1\\",\\"checkbox_border_apply_all\\":\\"1\\",\\"checkbox_padding_link_apply_all\\":\\"1\\",\\"checkbox_link_margin_apply_all\\":\\"1\\",\\"checkbox_link_border_apply_all\\":\\"1\\",\\"buttons_size\\":\\"normal\\",\\"buttons_style\\":\\"rounded\\",\\"content_button\\":[{\\"label\\":\\"Download Now\\",\\"link\\":\\"https:\\\\/\\\\/themify.me\\\\/\\",\\"link_options\\":\\"regular\\",\\"button_color_bg\\":\\"black\\"}]}}]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-center\\",\\"url_image\\":\\"https://themify.me/demo/themes/corporate\\\\/files\\\\/2014\\\\/09\\\\/ipad-image-transparent.png\\",\\"width_image\\":\\"300\\",\\"cid\\":\\"c84\\"}}]}],\\"styling\\":{\\"background_color\\":\\"74d7fc\\",\\"font_color\\":\\"000000\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_bottom\\":\\"2\\",\\"padding_bottom_unit\\":\\"%\\",\\"margin_bottom\\":\\"0\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full\\"}]}]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2156,
  'post_date' => '2013-07-15 23:30:22',
  'post_date_gmt' => '2013-07-15 23:30:22',
  'post_content' => '',
  'post_title' => 'Blog',
  'post_excerpt' => '',
  'post_name' => 'blog',
  'post_modified' => '2017-09-07 18:27:09',
  'post_modified_gmt' => '2017-09-07 18:27:09',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2156',
  'menu_order' => 4,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'query_category' => '0',
    'posts_per_page' => '6',
    'display_content' => 'content',
    'image_width' => '705',
    'image_height' => '370',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2203,
  'post_date' => '2013-10-11 18:46:39',
  'post_date_gmt' => '2013-10-11 18:46:39',
  'post_content' => '',
  'post_title' => 'Blog - 4 Columns',
  'post_excerpt' => '',
  'post_name' => 'blog-4-columns',
  'post_modified' => '2017-08-21 06:28:45',
  'post_modified_gmt' => '2017-08-21 06:28:45',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2203',
  'menu_order' => 4,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'query_category' => '0',
    'layout' => 'grid4',
    'posts_per_page' => '12',
    'display_content' => 'none',
    'image_width' => '236',
    'image_height' => '170',
    'hide_meta_all' => 'no',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2208,
  'post_date' => '2013-10-11 18:59:02',
  'post_date_gmt' => '2013-10-11 18:59:02',
  'post_content' => '',
  'post_title' => 'Blog - 2 Columns',
  'post_excerpt' => '',
  'post_name' => 'blog-2-columns',
  'post_modified' => '2017-08-21 06:28:43',
  'post_modified_gmt' => '2017-08-21 06:28:43',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/flat/?page_id=2208',
  'menu_order' => 4,
  'post_type' => 'page',
  'meta_input' => 
  array (
    'page_layout' => 'sidebar-none',
    'query_category' => '0',
    'layout' => 'grid2',
    'posts_per_page' => '12',
    'image_width' => '512',
    'image_height' => '330',
    'portfolio_display_content' => 'content',
    'portfolio_feature_size_page' => 'blank',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2761,
  'post_date' => '2015-01-22 23:34:23',
  'post_date_gmt' => '2015-01-22 23:34:23',
  'post_content' => '',
  'post_title' => 'Test',
  'post_excerpt' => '',
  'post_name' => 'test',
  'post_modified' => '2017-09-28 16:10:34',
  'post_modified_gmt' => '2017-09-28 16:10:34',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=tbuilder_layout_part&#038;p=2761',
  'menu_order' => 0,
  'post_type' => 'tbuilder_layout_part',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[[]]',
  ),
  'tax_input' => 
  array (
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 94,
  'post_date' => '2012-02-23 22:39:44',
  'post_date_gmt' => '2012-02-23 22:39:44',
  'post_content' => 'Ut eleifend rhoncus augue sit amet dignissim. In mattis lobortis imperdiet. Aliquam molestie nisi et purus mattis volutpat. Cras dignissim, arcu vel pretium interdum, turpis sapien rutrum felis, non condimentum nulla orci ornare tellus.',
  'post_title' => 'Parka',
  'post_excerpt' => '',
  'post_name' => 'parka',
  'post_modified' => '2017-08-21 06:52:26',
  'post_modified_gmt' => '2017-08-21 06:52:26',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=94',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2375',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/parkajacket3-400x400.jpg',
    '_edit_last' => '172',
    '_regular_price' => '169',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '169',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '1',
    '_edit_lock' => '1503298216:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'jacket',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 80,
  'post_date' => '2012-02-24 22:18:10',
  'post_date_gmt' => '2012-02-24 22:18:10',
  'post_content' => 'Nullam dapibus semper risus eu accumsan. Nulla facilisis eros ac ligula sodales suscipit. Fusce pellentesque iaculis dignissim. Phasellus tristique neque vitae justo laoreet tempus.',
  'post_title' => 'Vansera',
  'post_excerpt' => '',
  'post_name' => 'vansera',
  'post_modified' => '2017-08-21 06:52:07',
  'post_modified_gmt' => '2017-08-21 06:52:07',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=80',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2368',
    '_edit_last' => '172',
    '_regular_price' => '79',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '79',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '13',
    '_edit_lock' => '1503298210:172',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/vanschukkadecon.jpeg',
    '_wc_rating_count' => 
    array (
      5 => 1,
    ),
    '_wc_average_rating' => '5.00',
    '_wc_review_count' => '1',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured, rated-5',
    'product_cat' => 'shoes',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 77,
  'post_date' => '2012-02-24 22:15:42',
  'post_date_gmt' => '2012-02-24 22:15:42',
  'post_content' => 'Donec quis augue nibh, eu facilisis metus. Donec cursus condimentum erat quis sollicitudin. Mauris enim tortor, hendrerit ut pharetra non, eleifend non elit. Ut dapibus eleifend ipsum a rhoncus. Aenean eu ante felis, nec vulputate enim.',
  'post_title' => 'Bardenas',
  'post_excerpt' => '',
  'post_name' => 'bardenas',
  'post_modified' => '2017-08-21 06:52:10',
  'post_modified_gmt' => '2017-08-21 06:52:10',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=77',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_edit_last' => '172',
    '_regular_price' => '69',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '69',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '13',
    '_edit_lock' => '1503298355:172',
    '_thumbnail_id' => '2382',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/Chukka-bardenas-720x720.jpg',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured',
    'product_cat' => 'shoes',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 74,
  'post_date' => '2012-02-24 22:13:48',
  'post_date_gmt' => '2012-02-24 22:13:48',
  'post_content' => 'In at sem ipsum, sed commodo felis. Nullam nec elit sapien. Donec at congue sapien. Mauris a diam nec felis auctor ultrices. Sed tempus mollis orci in viverra. Vivamus libero eros, dictum id aliquam in, tristique id sapien.',
  'post_title' => 'Elephant',
  'post_excerpt' => '',
  'post_name' => 'elephant',
  'post_modified' => '2017-08-21 06:52:12',
  'post_modified_gmt' => '2017-08-21 06:52:12',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=74',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2374',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/elephant.jpg',
    '_edit_last' => '172',
    '_regular_price' => '25',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '25',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '1',
    '_edit_lock' => '1503298355:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'tshirts',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 70,
  'post_date' => '2012-02-24 22:11:52',
  'post_date_gmt' => '2012-02-24 22:11:52',
  'post_content' => '',
  'post_title' => 'Pilotwings Resort',
  'post_excerpt' => '',
  'post_name' => 'pilotwings-resort',
  'post_modified' => '2017-08-21 06:52:15',
  'post_modified_gmt' => '2017-08-21 06:52:15',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=70',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2376',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/pilotwinds-resort.jpg',
    '_edit_last' => '172',
    '_regular_price' => '23',
    '_sale_price' => '15',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '15',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '2',
    '_edit_lock' => '1503298212:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'games',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 72,
  'post_date' => '2012-02-24 22:12:51',
  'post_date_gmt' => '2012-02-24 22:12:51',
  'post_content' => 'Maecenas rhoncus malesuada aliquet. Morbi vulputate vulputate mauris quis condimentum. Ut ut ligula et mauris accumsan tristique ut nec lacus. Cras tempus pretium sagittis. Praesent porta libero nec magna vulputate porta.',
  'post_title' => 'Australia',
  'post_excerpt' => '',
  'post_name' => 'australia',
  'post_modified' => '2017-08-21 06:52:14',
  'post_modified_gmt' => '2017-08-21 06:52:14',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=72',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2371',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/australia.jpg',
    '_edit_last' => '172',
    '_regular_price' => '28',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '28',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '15',
    '_edit_lock' => '1503298212:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured',
    'product_cat' => 'tshirts',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 67,
  'post_date' => '2012-02-24 22:10:07',
  'post_date_gmt' => '2012-02-24 22:10:07',
  'post_content' => 'Ut ut ligula et mauris accumsan tristique ut nec lacus. Cras tempus pretium sagittis. Praesent porta libero nec magna vulputate porta. Maecenas rhoncus malesuada aliquet. Morbi vulputate vulputate mauris quis condimentum.',
  'post_title' => 'Ridge Racers 3D',
  'post_excerpt' => '',
  'post_name' => 'ridge-racers-3d',
  'post_modified' => '2017-08-21 06:52:18',
  'post_modified_gmt' => '2017-08-21 06:52:18',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=67',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2379',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/ridge-racers.jpg',
    '_edit_last' => '172',
    '_regular_price' => '29',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '29',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    '_edit_lock' => '1503298357:172',
    'total_sales' => '0',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured',
    'product_cat' => 'games',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 65,
  'post_date' => '2012-02-24 22:08:10',
  'post_date_gmt' => '2012-02-24 22:08:10',
  'post_content' => 'Maecenas rhoncus malesuada aliquet. Morbi vulputate vulputate mauris quis condimentum. Ut ut ligula et mauris accumsan tristique ut nec lacus. Cras tempus pretium sagittis. Praesent porta libero nec magna vulputate porta.',
  'post_title' => 'PKM',
  'post_excerpt' => '',
  'post_name' => 'pkm',
  'post_modified' => '2017-08-21 06:52:20',
  'post_modified_gmt' => '2017-08-21 06:52:20',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=65',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_edit_last' => '172',
    '_regular_price' => '26',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '26',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    '_wp_old_slug' => 'peppa-pig',
    'total_sales' => '3',
    '_thumbnail_id' => '2377',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/pkmnb-550x506.jpg',
    '_edit_lock' => '1503298213:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured',
    'product_cat' => 'games',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2366,
  'post_date' => '2012-02-24 22:06:11',
  'post_date_gmt' => '2012-02-24 22:06:11',
  'post_content' => 'Vivamus in dolor eu lacus luctus auctor non ac turpis. Proin et rutrum dolor. Praesent venenatis purus convallis ipsum porttitor convallis consectetur orci condimentum. Curabitur ornare interdum pellentesque.',
  'post_title' => 'Puzzle Bobble',
  'post_excerpt' => '',
  'post_name' => 'puzzle-bobble',
  'post_modified' => '2017-08-21 06:52:21',
  'post_modified_gmt' => '2017-08-21 06:52:21',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=62',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_edit_last' => '172',
    '_regular_price' => '29',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '29',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '2',
    '_thumbnail_id' => '2378',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/puzzle-bobble.jpg',
    '_wp_old_slug' => 'barbie',
    '_edit_lock' => '1503298214:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'games',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 54,
  'post_date' => '2012-02-24 21:50:23',
  'post_date_gmt' => '2012-02-24 21:50:23',
  'post_content' => 'Praesent eu ligula ut ligula tempus porttitor. In at sem ipsum, sed commodo felis. Nullam nec elit sapien. Donec at congue sapien. Mauris a diam nec felis auctor ultrices. Sed tempus mollis orci in viverra.',
  'post_title' => 'Donkey Kong',
  'post_excerpt' => '',
  'post_name' => 'donkey-kong',
  'post_modified' => '2017-08-21 06:52:23',
  'post_modified_gmt' => '2017-08-21 06:52:23',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=54',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_edit_last' => '172',
    '_regular_price' => '18',
    '_sale_price' => '15',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '15',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    '_thumbnail_id' => '2373',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/dk.jpg',
    'total_sales' => '2',
    '_edit_lock' => '1503298215:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'tshirts',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 52,
  'post_date' => '2012-02-24 21:48:04',
  'post_date_gmt' => '2012-02-24 21:48:04',
  'post_content' => 'Vivamus in dolor eu lacus luctus auctor non ac turpis. Proin et rutrum dolor. Praesent venenatis purus convallis ipsum porttitor convallis consectetur orci condimentum. Curabitur ornare interdum pellentesque.',
  'post_title' => 'Bloody Mary',
  'post_excerpt' => '',
  'post_name' => 'bloody-mary',
  'post_modified' => '2017-08-21 06:52:24',
  'post_modified_gmt' => '2017-08-21 06:52:24',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=52',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_stock_status' => 'instock',
    '_edit_last' => '172',
    '_regular_price' => '18',
    '_tax_status' => 'taxable',
    '_thumbnail_id' => '2372',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/bloody-mary.jpg',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '18',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '3',
    '_edit_lock' => '1503298215:172',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_cat' => 'tshirts',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 22,
  'post_date' => '2012-02-23 19:22:45',
  'post_date_gmt' => '2012-02-23 19:22:45',
  'post_content' => 'Duis id tincidunt tortor. Curabitur placerat luctus lacinia. In hac habitasse platea dictumst. Suspendisse potenti. Nunc vestibulum, erat et pharetra aliquet, mi nunc iaculis erat, in pharetra libero felis sit amet ipsum.',
  'post_title' => 'Super Monkey Ball',
  'post_excerpt' => '',
  'post_name' => 'super-monkey-ball',
  'post_modified' => '2017-08-21 06:52:28',
  'post_modified_gmt' => '2017-08-21 06:52:28',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=22',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_edit_last' => '172',
    '_regular_price' => '20',
    '_sale_price' => '18',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'no',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '18',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    '_thumbnail_id' => '2380',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/monkey-ball.jpg',
    'total_sales' => '1',
    '_edit_lock' => '1503298216:172',
    '_wc_rating_count' => 
    array (
      4 => '1',
    ),
    '_wc_average_rating' => '4.00',
    '_wc_review_count' => '1',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'rated-4',
    'product_cat' => 'games',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 85,
  'post_date' => '2014-02-24 22:34:11',
  'post_date_gmt' => '2014-02-24 22:34:11',
  'post_content' => 'Aliquam gravida eros sit amet leo scelerisque molestie. Morbi et cursus felis. Pellentesque at dui nunc. Integer euismod tincidunt nisl, in iaculis tellus feugiat sed. Proin non velit arcu, sit amet laoreet massa.',
  'post_title' => 'Builder Product',
  'post_excerpt' => '',
  'post_name' => 'builder-product',
  'post_modified' => '2017-09-28 16:10:33',
  'post_modified_gmt' => '2017-09-28 16:10:33',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=85',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2370',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/Sk8-HI-720x720.jpg',
    '_edit_last' => '172',
    '_regular_price' => '79',
    '_sale_price' => '49',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '49',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '22',
    '_edit_lock' => '1503298207:172',
    '_wp_old_slug' => 'sk8',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"image\\",\\"mod_settings\\":{\\"style_image\\":\\"image-left\\",\\"url_image\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/laptop_angle.png\\",\\"appearance_image\\":\\"rounded\\",\\"width_image\\":\\"500\\",\\"title_image\\":\\"Image Module\\",\\"caption_image\\":\\"Curabitur vel risus eros, sed eleifend arcu. Donec porttitor hendrerit diam et blandit. Curabitur vitae velit ligula, vitae lobortis massa. Mauris mattis est quis dolor venenatis vitae pharetra diam gravida. Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum risus luctus purus.\\"}}],\\"styling\\":[]}],\\"styling\\":[]},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2 first\\",\\"modules\\":[{\\"mod_name\\":\\"accordion\\",\\"mod_settings\\":{\\"layout_accordion\\":\\"default\\",\\"expand_collapse_accordion\\":\\"accordion\\",\\"color_accordion\\":\\"default\\",\\"accordion_appearance_accordion\\":\\"rounded|gradient\\",\\"content_accordion\\":[{\\"title_accordion\\":\\"FAQ One\\",\\"text_accordion\\":\\"<p>Curabitur vel risus eros, sed eleifend arcu. Donec porttitor hendrerit diam et blandit. Curabitur vitae velit ligula, vitae lobortis massa. Mauris mattis est quis dolor venenatis vitae pharetra diam gravida. Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum risus luctus purus.</p>\\",\\"default_accordion\\":\\"open\\"},{\\"title_accordion\\":\\"Accordion Two\\",\\"text_accordion\\":\\"<p>In gravida arcu ut neque ornare vitae rutrum turpis vehicula. Nunc ultrices sem mollis metus rutrum non malesuada metus fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque interdum rutrum quam, a pharetra est pulvinar ac.</p>\\",\\"default_accordion\\":\\"closed\\"},{\\"title_accordion\\":\\"Accordion Three\\",\\"text_accordion\\":\\"<p>Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus, congue non egestas quis, condimentum ut arcu. Nulla placerat, tortor non egestas rutrum, mi turpis adipiscing dui, et mollis turpis tortor vel orci.</p>\\",\\"default_accordion\\":\\"closed\\"}]}}],\\"styling\\":[]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2 last\\",\\"modules\\":[{\\"mod_name\\":\\"video\\",\\"mod_settings\\":{\\"style_video\\":\\"video-top\\",\\"url_video\\":\\"http://www.youtube.com/watch?v=A0JrDX8tpks\\",\\"width_video\\":\\"100\\",\\"unit_video\\":\\"%\\"}}],\\"styling\\":[]}],\\"column_alignment\\":\\"\\",\\"styling\\":[]},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"slider\\",\\"mod_settings\\":{\\"layout_display_slider\\":\\"image\\",\\"blog_category_slider\\":\\"|single\\",\\"slider_category_slider\\":\\"|single\\",\\"portfolio_category_slider\\":\\"|single\\",\\"img_content_slider\\":[{\\"img_url_slider\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/128730368.jpg\\",\\"img_title_slider\\":\\"Slider Image One\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/63992509.jpg\\",\\"img_title_slider\\":\\"Slider Image Two\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/image-center1.jpg\\",\\"img_title_slider\\":\\"Slider Image Three\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/image-center-2.jpg\\",\\"img_title_slider\\":\\"Slider Image Four\\"},{\\"img_url_slider\\":\\"https://themify.me/demo/themes/flatshop/files/2013/10/bg-desktop_pair2.jpg\\",\\"img_title_slider\\":\\"Slider Image Five\\"}],\\"layout_slider\\":\\"slider-default\\",\\"img_w_slider\\":\\"240\\",\\"img_h_slider\\":\\"180\\",\\"visible_opt_slider\\":\\"4\\",\\"auto_scroll_opt_slider\\":\\"4\\",\\"scroll_opt_slider\\":\\"1\\",\\"speed_opt_slider\\":\\"normal\\",\\"effect_slider\\":\\"scroll\\",\\"wrap_slider\\":\\"yes\\",\\"show_nav_slider\\":\\"yes\\",\\"show_arrow_slider\\":\\"yes\\",\\"left_margin_slider\\":\\"15\\",\\"right_margin_slider\\":\\"15\\"}}],\\"styling\\":[]}],\\"styling\\":[]},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-2 first\\",\\"modules\\":[{\\"mod_name\\":\\"map\\",\\"mod_settings\\":{\\"address_map\\":\\"1 Yonge Street\\\\nToronto, ON\\\\nCanada\\",\\"zoom_map\\":\\"13\\",\\"w_map\\":\\"100\\",\\"unit_w\\":\\"%\\",\\"h_map\\":\\"300\\",\\"unit_h\\":\\"px\\",\\"b_style_map\\":\\"solid\\",\\"b_width_map\\":\\"1\\",\\"b_color_map\\":\\"000000\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-2 last\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4>Address</h4><p>123 Street Name<br />City Toronto<br />Canada</p>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"column_alignment\\":\\"\\",\\"styling\\":[]},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"tab\\",\\"mod_settings\\":{\\"layout_tab\\":\\"minimal\\",\\"color_tab\\":\\"black\\",\\"tab_content_tab\\":[{\\"title_tab\\":\\"More Info\\",\\"text_tab\\":\\"<p>Nunc eleifend consectetur odio sit amet viverra. Ut euismod ligula eu tellus interdum mattis ac eu nulla. Phasellus cursus, lacus quis convallis aliquet, dolor urna ullamcorper mi, eget dapibus velit est vitae nisi.</p><p> </p><p>[gallery columns=\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\" ids=\\\\\\\\\\\\\\"2425,2415,2357,2365,2338,2340\\\\\\\\\\\\\\"]</p>\\"},{\\"title_tab\\":\\"Tab Two\\",\\"text_tab\\":\\"<p>Fusce ut sem est. In eu sagittis felis. In gravida arcu ut neque ornare vitae rutrum turpis vehicula. Nunc ultrices sem mollis metus rutrum non malesuada metus fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque interdum rutrum quam, a pharetra est pulvinar ac. Vestibulum congue nisl magna. Ut vulputate odio id dui convallis in adipiscing libero condimentum. </p>\\"},{\\"title_tab\\":\\"Three\\",\\"text_tab\\":\\"<p>Cras a fringilla nunc. Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu. Mauris consequat rhoncus dolor id sagittis. Cras tortor elit, aliquet quis tincidunt eget, dignissim non tortor. Cras ultricies cursus nisl, eget congue tellus consequat nec. Cras id nibh neque, eu dignissim orci. Aenean at adipiscing urna. Suspendisse potenti.</p>\\"}]}}],\\"styling\\":[]}],\\"styling\\":[]},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col3-1 first\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Box 1</h4><p>Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu.</p>\\",\\"color_box\\":\\"yellow\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"bounce\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col3-1\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Box 2</h4><p>Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu.</p>\\",\\"color_box\\":\\"light-blue\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"flash\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col3-1 last\\",\\"modules\\":[{\\"mod_name\\":\\"box\\",\\"mod_settings\\":{\\"content_box\\":\\"<h4>Box 3</h4><p>Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu.</p>\\",\\"color_box\\":\\"purple\\",\\"appearance_box\\":\\"rounded\\",\\"animation_effect\\":\\"shake\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"column_alignment\\":\\"\\",\\"styling\\":[]},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first last\\",\\"modules\\":[],\\"styling\\":[]}],\\"styling\\":[]}]',
    '_wc_rating_count' => 
    array (
      5 => 1,
    ),
    '_wc_average_rating' => '5.00',
    '_wc_review_count' => '1',
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured, rated-5',
    'product_cat' => 'shoes',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 83,
  'post_date' => '2012-02-24 22:32:25',
  'post_date_gmt' => '2012-02-24 22:32:25',
  'post_content' => 'Proin non velit arcu, sit amet laoreet massa. Aliquam gravida eros sit amet leo scelerisque molestie. Morbi et cursus felis. Pellentesque at dui nunc. Integer euismod tincidunt nisl, in iaculis tellus feugiat sed.',
  'post_title' => 'Era',
  'post_excerpt' => '',
  'post_name' => 'era',
  'post_modified' => '2017-08-21 06:52:05',
  'post_modified_gmt' => '2017-08-21 06:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/shopdock/?post_type=product&#038;p=83',
  'menu_order' => 0,
  'post_type' => 'product',
  'meta_input' => 
  array (
    '_thumbnail_id' => '2367',
    'post_image' => 'https://themify.me/demo/themes/corporate/files/2012/02/eraLX.jpg',
    '_edit_last' => '172',
    '_regular_price' => '69',
    '_tax_status' => 'taxable',
    '_stock_status' => 'instock',
    '_visibility' => 'visible',
    '_featured' => 'yes',
    '_product_attributes' => 
    array (
    ),
    '_downloadable' => 'no',
    '_virtual' => 'no',
    '_price' => '69',
    '_stock' => NULL,
    '_manage_stock' => 'no',
    '_backorders' => 'no',
    'total_sales' => '14',
    '_edit_lock' => '1503298209:172',
    '_product_image_gallery' => '2369,2368',
    '_wc_rating_count' => 
    array (
    ),
    '_wc_average_rating' => '0',
    '_wc_review_count' => '0',
    '_upsell_ids' => 
    array (
    ),
    '_crosssell_ids' => 
    array (
    ),
    '_default_attributes' => 
    array (
    ),
    '_download_limit' => '-1',
    '_download_expiry' => '-1',
    '_product_version' => '3.1.1',
    '_yoast_wpseo_content_score' => '30',
  ),
  'tax_input' => 
  array (
    'product_type' => 'simple',
    'product_visibility' => 'featured',
    'product_cat' => 'shoes',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 45,
  'post_date' => '2013-07-12 05:00:25',
  'post_date_gmt' => '2013-07-12 05:00:25',
  'post_content' => 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. dolor quis sollicitudin accumsan, elit turpis tempor est mattis.',
  'post_title' => 'Boris Ivanov',
  'post_excerpt' => '',
  'post_name' => 'boris-ivanov',
  'post_modified' => '2017-08-21 06:48:14',
  'post_modified_gmt' => '2017-08-21 06:48:14',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=team&#038;p=45',
  'menu_order' => 0,
  'post_type' => 'team',
  'meta_input' => 
  array (
    'team_title' => 'Web Designer',
    'skills' => '[progress_bar label="Graphic Design" color="#74e7cf" percentage="80"]
[progress_bar label="Web Design" color="#654e9c" percentage="58"]
[progress_bar label="jQuery" color="#ff5353" percentage="69"]',
    'social' => '[themify_icon link="http://twitter.com/themify"  icon="fa-twitter" style="large"]
[themify_icon link="http://facebook.com/themify" icon="fa-facebook" style="large"]
[themify_icon  link="http://pinterest.com/" icon="fa-pinterest" style="large"]',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'team-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 48,
  'post_date' => '2013-07-12 05:09:49',
  'post_date_gmt' => '2013-07-12 05:09:49',
  'post_content' => 'Maecenas luctus aliquet risus ac feugiat. Curabitur enim mi, placerat sit amet porttitor ac, mollis lobortis elit. Cras sit amet erat eget dolor varius tristique. Duis eu nisl tortor. Mauris pulvinar metus eget.',
  'post_title' => 'Amy Weaver',
  'post_excerpt' => '',
  'post_name' => 'amy-weaver',
  'post_modified' => '2017-08-21 06:48:14',
  'post_modified_gmt' => '2017-08-21 06:48:14',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=team&#038;p=48',
  'menu_order' => 0,
  'post_type' => 'team',
  'meta_input' => 
  array (
    'team_title' => 'Project Manager',
    'skills' => '[progress_bar label="Project Management" color="#fdd761" percentage="80"]
[progress_bar label="Marketing" color="#6487d5" percentage="58"]
[progress_bar label="Logistics" color="#73b70b" percentage="69"]',
    'social' => '[themify_icon link="http://twitter.com/themify"  icon="fa-twitter" style="large"]
[themify_icon link="http://facebook.com/themify" icon="fa-facebook" style="large"]
[themify_icon  link="http://pinterest.com/" icon="fa-pinterest" style="large"]',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'team-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2511,
  'post_date' => '2014-09-03 22:03:18',
  'post_date_gmt' => '2014-09-03 22:03:18',
  'post_content' => 'Nullam dolor ex, tincidunt a congue non, aliquam nec est. Phasellus egestas urna et nibh mattis, sit amet malesuada nisi vestibulum. Phasellus accumsan, ante pellentesque suscipit ullamcorper.',
  'post_title' => 'Allison Peters',
  'post_excerpt' => '',
  'post_name' => 'allison-peters',
  'post_modified' => '2017-08-21 06:48:10',
  'post_modified_gmt' => '2017-08-21 06:48:10',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=team&#038;p=2511',
  'menu_order' => 0,
  'post_type' => 'team',
  'meta_input' => 
  array (
    'team_title' => 'PR',
    'skills' => '[progress_bar label="Social Networking" color="#13c0e1" percentage="95"]
[progress_bar label="Graphic Design" color="#fdd761" percentage="85"]
[progress_bar label="Copyedit" color="#fa5ba5" percentage="90"]',
    'social' => '[themify_icon link="http://twitter.com/themify"  icon="fa-twitter" style="large"]
[themify_icon link="http://facebook.com/themify" icon="fa-facebook" style="large"]
[themify_icon  link="http://pinterest.com/" icon="fa-pinterest" style="large"]',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'team-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2513,
  'post_date' => '2014-09-03 22:38:42',
  'post_date_gmt' => '2014-09-03 22:38:42',
  'post_content' => 'Duis condimentum sem nec euismod accumsan. Pellentesque ultricies ultricies arcu vel aliquam. Donec quis eleifend justo, ac elementum tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
  'post_title' => 'Clara Black',
  'post_excerpt' => '',
  'post_name' => 'clara-black',
  'post_modified' => '2017-08-21 06:48:08',
  'post_modified_gmt' => '2017-08-21 06:48:08',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=team&#038;p=2513',
  'menu_order' => 0,
  'post_type' => 'team',
  'meta_input' => 
  array (
    'team_title' => 'Web Developer',
    'skills' => '[progress_bar label="PHP" color="#6B7EB9" percentage="80"]
[progress_bar label="JavaScript" color="#F1DA4E" percentage="58"]
[progress_bar label="Ruby" color="#9E1316" percentage="69"]
',
    'social' => '[themify_icon link="http://twitter.com/themify"  icon="fa-twitter" style="large"]
[themify_icon link="http://facebook.com/themify" icon="fa-facebook" style="large"]
[themify_icon  link="http://pinterest.com/" icon="fa-pinterest" style="large"]',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'team-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 12,
  'post_date' => '2013-07-12 03:03:52',
  'post_date_gmt' => '2013-07-12 03:03:52',
  'post_content' => 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. This is Photoshop\'s version of Lorem Ipsum. Llorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
  'post_title' => 'Mike Canlas',
  'post_excerpt' => '',
  'post_name' => 'mike-canlas',
  'post_modified' => '2017-08-21 06:51:00',
  'post_modified_gmt' => '2017-08-21 06:51:00',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=testimonial&#038;p=12',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Mike Canlas',
    'testimonial_title' => 'Owner',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'uncategorized',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 20,
  'post_date' => '2013-07-12 04:13:47',
  'post_date_gmt' => '2013-07-12 04:13:47',
  'post_content' => 'Rravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. This is Photoshop’s version of Lorem Ipsum. Llorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
  'post_title' => 'Amanda Elric',
  'post_excerpt' => '',
  'post_name' => 'amanda-elric',
  'post_modified' => '2017-08-21 06:50:56',
  'post_modified_gmt' => '2017-08-21 06:50:56',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=testimonial&#038;p=20',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Amanda Elric',
    'testimonial_title' => 'Manager, Themify',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'uncategorized',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1589,
  'post_date' => '2008-11-02 19:39:01',
  'post_date_gmt' => '2008-11-02 19:39:01',
  'post_content' => 'Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu. Mauris consequat rhoncus dolor id sagittis. Cras tortor elit, aliquet quis tincidunt eget, dignissim non tortor.',
  'post_title' => 'Extremely Happy',
  'post_excerpt' => '',
  'post_name' => 'extremely-happy',
  'post_modified' => '2017-09-28 16:10:33',
  'post_modified_gmt' => '2017-09-28 16:10:33',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=testimonial&#038;p=27',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'feature_size' => 'blank',
    'testimonial_name' => 'April',
    'testimonial_title' => 'Manager, A & D',
    'external_link' => 'https://themify.me/',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '{\\"_thumbnail_id\\":[\\"2517\\"],\\"post_image\\":[\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/themes\\\\/corporate\\\\/files\\\\/2008\\\\/11\\\\/129116051.jpg\\",\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/themes\\\\/corporate\\\\/files\\\\/2008\\\\/11\\\\/129116051.jpg\\",\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/themes\\\\/corporate\\\\/files\\\\/2008\\\\/11\\\\/129116051.jpg\\",\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/themes\\\\/corporate\\\\/files\\\\/2008\\\\/11\\\\/129116051.jpg\\",\\"https:\\\\/\\\\/themify.me\\\\/demo\\\\/themes\\\\/corporate\\\\/files\\\\/2008\\\\/11\\\\/129116051.jpg\\"],\\"_post_image_attach_id\\":[\\"2517\\"],\\"_edit_last\\":[\\"32\\"],\\"_testimonial_name\\":[\\"April\\"],\\"_testimonial_link\\":[\\"http:\\\\/\\\\/icondock.com\\"],\\"_testimonial_company\\":[\\"IconDock\\"],\\"_testimonial_position\\":[\\"Designer\\"],\\"_edit_lock\\":[\\"1409788463:32\\"],\\"feature_size\\":[\\"blank\\"],\\"external_link\\":[\\"https:\\\\/\\\\/themify.me\\\\/\\"],\\"testimonial_name\\":[\\"April\\"],\\"testimonial_title\\":[\\"Manager, A & D\\"],\\"builder_switch_frontend\\":[\\"0\\"]}',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'testimonials',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1590,
  'post_date' => '2008-11-09 20:28:43',
  'post_date_gmt' => '2008-11-09 20:28:43',
  'post_content' => 'Nam nunc lectus, congue non egestas quis, condimentum ut arcu. Nulla placerat, tortor non egestas rutrum, mi turpis adipiscing dui, et mollis turpis tortor vel orci. Cras a fringilla nunc. Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu.',
  'post_title' => 'Super Awesome!',
  'post_excerpt' => '',
  'post_name' => 'super-awesome',
  'post_modified' => '2017-08-21 06:51:04',
  'post_modified_gmt' => '2017-08-21 06:51:04',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=testimonial&#038;p=66',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Rachel',
    'testimonial_title' => 'Designer, IconDock',
    'external_link' => 'https://themify.me/',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'testimonials',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1591,
  'post_date' => '2008-11-19 19:58:11',
  'post_date_gmt' => '2008-11-19 19:58:11',
  'post_content' => 'Mauris mattis est quis dolor venenatis vitae pharetra diam gravida. Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum risus luctus purus.',
  'post_title' => 'Best Services in Town!',
  'post_excerpt' => '',
  'post_name' => 'best-services-in-town',
  'post_modified' => '2017-08-21 06:51:02',
  'post_modified_gmt' => '2017-08-21 06:51:02',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=testimonial&#038;p=1152',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Martin',
    'testimonial_title' => 'PR, N.Design Studio',
    'external_link' => 'https://themify.me/',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'testimonials',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1592,
  'post_date' => '2008-11-19 19:59:53',
  'post_date_gmt' => '2008-11-19 19:59:53',
  'post_content' => 'Aliquam metus diam, mattis fringilla adipiscing at, lacinia at nulla. Fusce ut sem est. In eu sagittis felis. In gravida arcu ut neque ornare vitae rutrum tu. Cras a fringilla nunc. Suspendisse volutpat, eros cong rpis vehicula.',
  'post_title' => 'Exceeded Our Expectation',
  'post_excerpt' => '',
  'post_name' => 'exceeded-our-expectation',
  'post_modified' => '2017-08-21 06:51:01',
  'post_modified_gmt' => '2017-08-21 06:51:01',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=testimonial&#038;p=1156',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Vanessa',
    'testimonial_title' => 'Manager',
    'external_link' => 'https://themify.me/',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'testimonials',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2097,
  'post_date' => '2008-06-11 21:26:15',
  'post_date_gmt' => '2008-06-11 21:26:15',
  'post_content' => 'Fusce ultrices placerat sem at rutrum. Etiam bibendum ac sapien in vulputate. Maecenas commodo elementum gravida. Vivamus odio odio, pulvinar vel leo id, fringilla ullamcorper odio.',
  'post_title' => 'Carl Schmidt',
  'post_excerpt' => '',
  'post_name' => 'carl-schmidt',
  'post_modified' => '2017-08-21 06:51:13',
  'post_modified_gmt' => '2017-08-21 06:51:13',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?post_type=testimonial&#038;p=59',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2098,
  'post_date' => '2008-06-11 21:28:42',
  'post_date_gmt' => '2008-06-11 21:28:42',
  'post_content' => 'Sed volutpat tristique metus eget suscipit. Donec aliquam eget purus id cursus. Integer ut arcu scelerisque, porttitor eros nec, placerat eros.',
  'post_title' => 'Clara Ray',
  'post_excerpt' => '',
  'post_name' => 'clara-ray',
  'post_modified' => '2017-08-21 06:51:11',
  'post_modified_gmt' => '2017-08-21 06:51:11',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?post_type=testimonial&#038;p=61',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2099,
  'post_date' => '2008-06-11 21:31:55',
  'post_date_gmt' => '2008-06-11 21:31:55',
  'post_content' => 'Maecenas in orci nunc. Curabitur velit sapien, mollis vel aliquam et, dignissim consequat eros. Curabitur egestas quam dapibus arcu egestas mollis.',
  'post_title' => 'Diana Jones',
  'post_excerpt' => '',
  'post_name' => 'diana-jones-2',
  'post_modified' => '2017-08-21 06:51:10',
  'post_modified_gmt' => '2017-08-21 06:51:10',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?post_type=testimonial&#038;p=63',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2100,
  'post_date' => '2008-06-11 21:33:02',
  'post_date_gmt' => '2008-06-11 21:33:02',
  'post_content' => 'Aliquam euismod aliquet nunc, mollis consectetur sapien congue eu. Pellentesque erat mauris, varius non posuere sit amet, tempor ac velit.',
  'post_title' => 'Patricia Wolf',
  'post_excerpt' => '',
  'post_name' => 'patricia-wolf',
  'post_modified' => '2017-08-21 06:51:08',
  'post_modified_gmt' => '2017-08-21 06:51:08',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/builder/?post_type=testimonial&#038;p=65',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'team',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2408,
  'post_date' => '2013-07-12 04:28:32',
  'post_date_gmt' => '2013-07-12 04:28:32',
  'post_content' => 'Maecenas in orci nunc. Curabitur velit sapien, mollis vel aliquam et, dignissim consequat eros. Curabitur egestas quam dapibus arcu egestas mollnisi elit consequat ipsum, nec sagittis sem hilt slhie sodhlite in the nibhi snisi elit consequat ipsum.',
  'post_title' => 'Diana Jones',
  'post_excerpt' => '',
  'post_name' => 'diana-jones',
  'post_modified' => '2017-08-21 06:50:54',
  'post_modified_gmt' => '2017-08-21 06:50:54',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=testimonial&#038;p=22',
  'menu_order' => 0,
  'post_type' => 'testimonial',
  'meta_input' => 
  array (
    'testimonial_name' => 'Diana Jones',
    'testimonial_title' => 'CEO, Nice Company',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'testimonial-category' => 'uncategorized',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 250,
  'post_date' => '2008-01-25 19:20:02',
  'post_date_gmt' => '2008-01-25 19:20:02',
  'post_content' => 'Nulla ut mi risus. Phasellus pretium diam in risus vestibulum elementum. Donec quis ipsum sem, in elementum metus. Mauris sagittis cursus felis vitae mattis. Donec adipiscing consequat velit vitae convallis. Proin sit amet lectus non enim lobortis aliquet. Donec sit amet magna vitae ante pellentesque adipiscing.',
  'post_title' => 'In The Spotlight',
  'post_excerpt' => 'Fusce fermentum ante turpis, et congue',
  'post_name' => 'in-the-spotlight',
  'post_modified' => '2008-01-25 19:20:02',
  'post_modified_gmt' => '2008-01-25 19:20:02',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=250',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 274,
  'post_date' => '2008-01-25 21:53:37',
  'post_date_gmt' => '2008-01-25 21:53:37',
  'post_content' => 'Sed sagittis, elit egestas rutrum vehicula, neque dolor fringilla lacus, ut rhoncus turpis augue vitae libero. Nam risus velit, rhoncus eget consectetur id, posuere at ligula. Vivamus imperdiet diam ac tortor tempus posuere. Curabitur at arcu id turpis posuere bibendum. Sed commodo mauris eget diam pretium cursus. In sagittis feugiat mauris, in ultrices mauris lacinia eu.',
  'post_title' => 'Photo Project',
  'post_excerpt' => 'Pellentesque diam velit, luctus vel porta',
  'post_name' => 'photo-project',
  'post_modified' => '2008-01-25 21:53:37',
  'post_modified_gmt' => '2008-01-25 21:53:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=274',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 283,
  'post_date' => '2008-01-25 22:15:36',
  'post_date_gmt' => '2008-01-25 22:15:36',
  'post_content' => 'Fusce augue velit, vulputate elementum semper congue, rhoncus adipiscing nisl. Curabitur vel risus eros, sed eleifend arcu. Donec porttitor hendrerit diam et blandit. Curabitur vitae velit ligula, vitae lobortis massa. Mauris mattis est quis dolor venenatis vitae pharetra diam gravida. Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum.',
  'post_title' => 'Another Photo Shot',
  'post_excerpt' => 'Lorem ipsum dolor sit amet',
  'post_name' => 'another-photo-shot',
  'post_modified' => '2008-01-25 22:15:36',
  'post_modified_gmt' => '2008-01-25 22:15:36',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=283',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 288,
  'post_date' => '2008-01-25 22:22:08',
  'post_date_gmt' => '2008-01-25 22:22:08',
  'post_content' => 'In eu sagittis felis. In gravida arcu ut neque ornare vitae rutrum turpis vehicula. Nunc ultrices sem mollis metus rutrum non malesuada metus fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque interdum rutrum quam.',
  'post_title' => 'Just a Model',
  'post_excerpt' => 'Fusce fermentum ante turpis, et congue',
  'post_name' => 'just-a-model',
  'post_modified' => '2008-01-25 22:22:08',
  'post_modified_gmt' => '2008-01-25 22:22:08',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=288',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2494,
  'post_date' => '2014-09-03 00:46:39',
  'post_date_gmt' => '2014-09-03 00:46:39',
  'post_content' => 'Pellentesque finibus odio id quam tincidunt, id ultricies quam laoreet. Curabitur posuere sapien ut quam consequat molestie. In id neque et sem ornare egestas.',
  'post_title' => 'Up Top',
  'post_excerpt' => 'Pellentesque finibus odio id quam tincidunt, id ultricies quam laoreet',
  'post_name' => 'top',
  'post_modified' => '2017-08-21 06:49:37',
  'post_modified_gmt' => '2017-08-21 06:49:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2494',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'misc',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2495,
  'post_date' => '2014-09-03 00:47:49',
  'post_date_gmt' => '2014-09-03 00:47:49',
  'post_content' => 'Aliquam quis augue facilisis, blandit sapien id, condimentum mi. Morbi ut dignissim enim. Vestibulum vestibulum nulla vitae magna blandit, sed volutpat nibh hendrerit. Suspendisse sollicitudin ante neque, vitae maximus nunc tempus volutpat.',
  'post_title' => 'Dusk',
  'post_excerpt' => 'Aliquam quis augue facilisis, blandit sapien id, condimentum mi',
  'post_name' => 'dusk',
  'post_modified' => '2017-08-21 06:49:35',
  'post_modified_gmt' => '2017-08-21 06:49:35',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2495',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'misc',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2496,
  'post_date' => '2014-09-03 00:50:17',
  'post_date_gmt' => '2014-09-03 00:50:17',
  'post_content' => 'Praesent vulputate ligula vel augue pellentesque blandit. Praesent accumsan justo elit, ac aliquam dui vehicula mattis. Integer tempus massa elit, quis convallis dolor ultricies viverra. Morbi tincidunt ullamcorper imperdiet.',
  'post_title' => 'SK8.1',
  'post_excerpt' => 'Praesent vulputate ligula vel augue pellentesque blandit',
  'post_name' => 'sk8-1',
  'post_modified' => '2017-08-21 06:49:33',
  'post_modified_gmt' => '2017-08-21 06:49:33',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2496',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'misc',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2501,
  'post_date' => '2014-09-03 19:41:10',
  'post_date_gmt' => '2014-09-03 19:41:10',
  'post_content' => 'Duis quis odio eget lorem sollicitudin mattis eget ac risus. Nam finibus vehicula tellus, in fermentum ex. Nulla iaculis eu ante eu elementum. Suspendisse faucibus ut lorem vitae auctor.',
  'post_title' => 'Connections',
  'post_excerpt' => 'Duis quis odio eget lorem sollicitudin mattis eget ac risus.',
  'post_name' => 'connections',
  'post_modified' => '2017-08-21 06:49:31',
  'post_modified_gmt' => '2017-08-21 06:49:31',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2501',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2502,
  'post_date' => '2014-09-03 19:42:31',
  'post_date_gmt' => '2014-09-03 19:42:31',
  'post_content' => 'Etiam dapibus metus leo, finibus tempor mauris scelerisque lacinia. Maecenas pulvinar vulputate ante, aliquam egestas sem laoreet vitae. Nullam ullamcorper eget risus non efficitur. Cras a velit metus. Cras vestibulum rhoncus nulla a gravida.',
  'post_title' => 'Field',
  'post_excerpt' => 'Etiam dapibus metus leo, finibus tempor mauris scelerisque lacinia.',
  'post_name' => 'field',
  'post_modified' => '2017-08-21 06:49:29',
  'post_modified_gmt' => '2017-08-21 06:49:29',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2502',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'illustrations',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 63,
  'post_date' => '2013-07-12 05:54:32',
  'post_date_gmt' => '2013-07-12 05:54:32',
  'post_content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan consectetur erat ac sodales. Mauris rhoncus dolor sed ante vulputate, ut mollis augue semper. Etiam eleifend turpis lorem, in sollicitudin enim cursus in. Donec at interdum felis. Cras tristique eget ante sit amet iaculis. Aliquam eu egestas nulla.',
  'post_title' => 'Red Rose',
  'post_excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan consectetur erat ac sodales.',
  'post_name' => 'red-rose',
  'post_modified' => '2017-08-21 06:49:45',
  'post_modified_gmt' => '2017-08-21 06:49:45',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=63',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'uncategorized',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2406,
  'post_date' => '2013-07-12 05:58:27',
  'post_date_gmt' => '2013-07-12 05:58:27',
  'post_content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan consectetur erat ac sodales. Mauris rhoncus dolor sed ante vulputate, ut mollis augue semper. Etiam eleifend turpis lorem, in sollicitudin enim cursus in. Donec at interdum felis. Cras tristique eget ante sit amet iaculis. Aliquam eu egestas nulla.',
  'post_title' => 'Watercolor',
  'post_excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan consectetur erat ac sodales.',
  'post_name' => 'watercolor',
  'post_modified' => '2017-08-21 06:49:43',
  'post_modified_gmt' => '2017-08-21 06:49:43',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=65',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 71,
  'post_date' => '2013-07-08 06:06:17',
  'post_date_gmt' => '2013-07-08 06:06:17',
  'post_content' => 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean porta id orci eu sodales. Ut facilisis nisi hendrerit, pharetra lorem non, dignissim eros. Cras elit nisi, malesuada viverra risus molestie, luctus bibendum nisi. Nulla id ipsum scelerisque, fringilla purus ac, sollicitudin tellus. Quisque convallis lorem ac turpis rhoncus dignissim. Donec pulvinar, sapien id adipiscing faucibus, metus eros tincidunt quam, feugiat interdum ante risus quis nunc.',
  'post_title' => 'TV Commercial',
  'post_excerpt' => 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean porta id orci eu sodales.',
  'post_name' => 'tv-commercial',
  'post_modified' => '2017-08-21 06:49:53',
  'post_modified_gmt' => '2017-08-21 06:49:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=71',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'videos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 73,
  'post_date' => '2013-07-09 06:09:48',
  'post_date_gmt' => '2013-07-09 06:09:48',
  'post_content' => 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean porta id orci eu sodales. Ut facilisis nisi hendrerit, pharetra lorem non, dignissim eros. Cras elit nisi, malesuada viverra risus molestie, luctus bibendum nisi. Nulla id ipsum scelerisque, fringilla purus ac, sollicitudin tellus. Quisque convallis lorem ac turpis rhoncus dignissim. Donec pulvinar, sapien id adipiscing faucibus, metus eros tincidunt quam, feugiat interdum ante risus quis nunc.',
  'post_title' => 'Summer Vacation',
  'post_excerpt' => '',
  'post_name' => 'summer-vacation',
  'post_modified' => '2017-08-21 06:49:51',
  'post_modified_gmt' => '2017-08-21 06:49:51',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=73',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'vintage',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 151,
  'post_date' => '2013-07-11 23:16:09',
  'post_date_gmt' => '2013-07-11 23:16:09',
  'post_content' => 'Donec at interdum felis. Cras tristique eget ante sit amet iaculis. Aliquam eu egestas nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan consectetur erat ac sodales. Mauris rhoncus dolor sed ante vulputate, ut mollis augue semper. Etiam eleifend turpis lorem, in sollicitudin enim cursus in.',
  'post_title' => 'Black &amp; White',
  'post_excerpt' => 'Donec at interdum felis. Cras tristique eget ante sit amet iaculis. Aliquam eu egestas nulla.',
  'post_name' => 'black-white',
  'post_modified' => '2017-08-21 06:49:46',
  'post_modified_gmt' => '2017-08-21 06:49:46',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=151',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 157,
  'post_date' => '2013-07-12 23:26:37',
  'post_date_gmt' => '2013-07-12 23:26:37',
  'post_content' => 'Fusce augue velit, vulputate elementum semper congue, rhoncus adipiscing nisl. Curabitur vel risus eros, sed eleifend arcu. Donec porttitor hendrerit diam et blandit. Curabitur vitae velit ligula, vitae lobortis massa. Mauris mattis est quis dolor venenatis vitae pharetra diam gravida. Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo.',
  'post_title' => 'Dark Gallery',
  'post_excerpt' => 'Fusce augue velit, vulputate elementum semper congue, rhoncus adipiscing nisl. ',
  'post_name' => 'dark-gallery',
  'post_modified' => '2017-08-21 06:49:41',
  'post_modified_gmt' => '2017-08-21 06:49:41',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=157',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 161,
  'post_date' => '2013-07-10 23:28:30',
  'post_date_gmt' => '2013-07-10 23:28:30',
  'post_content' => 'Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum risus luctus purus. Fusce augue velit, vulputate elementum semper congue, rhoncus adipiscing nisl. Curabitur vel risus eros, sed eleifend arcu. Donec porttitor hendrerit diam et blandit. Curabitur vitae velit ligula, vitae lobortis massa. Mauris mattis est quis dolor venenatis vitae pharetra diam gravida.',
  'post_title' => 'On The Ride',
  'post_excerpt' => 'Vivamus dignissim, ligula vel ultricies varius, nibh velit pretium leo, vel placerat ipsum risus luctus purus.',
  'post_name' => 'on-the-ride',
  'post_modified' => '2017-08-21 06:49:49',
  'post_modified_gmt' => '2017-08-21 06:49:49',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=161',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 165,
  'post_date' => '2013-07-10 23:45:57',
  'post_date_gmt' => '2013-07-10 23:45:57',
  'post_content' => 'Curabitur venenatis vehicula mattis. Nunc eleifend consectetur odio sit amet viverra. Ut euismod ligula eu tellus interdum mattis ac eu nulla. Phasellus cursus, lacus quis convallis aliquet, dolor urna ullamcorper mi, eget dapibus velit est vitae nisi.',
  'post_title' => 'Red Rose',
  'post_excerpt' => 'Curabitur venenatis vehicula mattis. Nunc eleifend consectetur odio sit amet viverra.',
  'post_name' => 'red-rose-2',
  'post_modified' => '2017-08-21 06:49:47',
  'post_modified_gmt' => '2017-08-21 06:49:47',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/flat/?post_type=portfolio&#038;p=165',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 291,
  'post_date' => '2008-01-25 22:25:29',
  'post_date_gmt' => '2008-01-25 22:25:29',
  'post_content' => 'The congue non egestas quis, condime estibulum congue nisl magna. Ut vulputate odio id dui convallis in adipiscing libero condimentum. Nunc et pharetra enim. Praesent pharetra, neque et luctus tempor, leo sapien faucibus leo, a dignissim turpis ipsum sed libero. Sed sed luctus purus. Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus ntu.',
  'post_title' => 'In The Wood',
  'post_excerpt' => 'Morbi sed arcu at tortor ultricies',
  'post_name' => 'in-the-wood',
  'post_modified' => '2008-01-25 22:25:29',
  'post_modified_gmt' => '2008-01-25 22:25:29',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=291',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 292,
  'post_date' => '2008-01-25 22:26:46',
  'post_date_gmt' => '2008-01-25 22:26:46',
  'post_content' => 'Praesent pharetra, neque et luctus tempor estibulum congue nisl magna. Ut vulputate odio id dui convallis in adipiscing libero condimentum. Nunc et pharetra enim, leo sapien faucibus leo, a dignissim turpis ipsum sed libero. Sed sed luctus purus. Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus, congue non egestas quis, condimentu.',
  'post_title' => 'Late Arrival',
  'post_excerpt' => 'Quisque ornare vestibulum nibh in lacinia',
  'post_name' => 'late-arrival',
  'post_modified' => '2008-01-25 22:26:46',
  'post_modified_gmt' => '2008-01-25 22:26:46',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=292',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 293,
  'post_date' => '2008-01-25 22:27:53',
  'post_date_gmt' => '2008-01-25 22:27:53',
  'post_content' => 'Praesent pharetra, neque et luctus tempor. Vestibulum congue nisl magna. Ut vulputate odio id dui convallis in adipiscing libero condimentum. Nunc et pharetra enim. Praesent pharetra, neque et luctus tempor, leo sapien faucibus leo, a dignissim turpis ipsum sed libero. Sed sed luctus purus. Aliquam faucibus turpis at libero consectetur euismod.',
  'post_title' => 'Summer Rain',
  'post_excerpt' => 'Vestibulum rutrum, metus vitae pretium',
  'post_name' => 'summer-rain',
  'post_modified' => '2008-01-25 22:27:53',
  'post_modified_gmt' => '2008-01-25 22:27:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/metro/?post_type=portfolio&amp;p=293',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1489,
  'post_date' => '2008-09-18 20:49:59',
  'post_date_gmt' => '2008-09-18 20:49:59',
  'post_content' => 'Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus, congue non egestas quis, condimentum ut arcu. Nulla placerat, tortor non egestas rutrum, mi turpis adipiscing dui, et mollis turpis tortor vel orci. Cras a fringilla nunc. Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu. Mauris consequat rhoncus dolor id sagittis. Cras tortor elit, aliquet quis tincidunt eget, dignissim non tortor.',
  'post_title' => 'Just a Photo',
  'post_excerpt' => 'Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus, congue non egestas quis, condimentum ut arcu.',
  'post_name' => 'just-a-photo',
  'post_modified' => '2014-09-02 23:53:27',
  'post_modified_gmt' => '2014-09-02 23:53:27',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=portfolio&#038;p=1089',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'content_width' => 'default_width',
    'feature_size' => 'blank',
    'hide_post_title' => 'default',
    'unlink_post_title' => 'default',
    'hide_post_date' => 'default',
    'hide_post_meta' => 'default',
    'hide_post_image' => 'default',
    'unlink_post_image' => 'default',
    'header_wrap' => 'solid',
    'background_repeat' => 'fullcover',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1570,
  'post_date' => '2008-09-18 20:51:12',
  'post_date_gmt' => '2008-09-18 20:51:12',
  'post_content' => 'Praesent pharetra, neque et luctus tempor, leo sapien faucibus leo, a dignissim turpis ipsum sed libero. Sed sed luctus purus. Aliquam faucibus turpis at libero consectetur euismod. Nam nunc lectus, congue non egestas quis, condimentum ut arcu. Nulla placerat, tortor non egestas rutrum, mi turpis adipiscing dui, et mollis turpis tortor vel orci. Cras a fringilla nunc. Suspendisse volutpat, eros congue scelerisque iaculis, magna odio sodales dui, vitae vulputate elit metus ac arcu.',
  'post_title' => 'Photo Two',
  'post_excerpt' => 'Praesent pharetra, neque et luctus tempor, leo sapien.',
  'post_name' => 'photo-two',
  'post_modified' => '2017-08-21 06:49:58',
  'post_modified_gmt' => '2017-08-21 06:49:58',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=portfolio&#038;p=1091',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1571,
  'post_date' => '2008-09-18 20:52:05',
  'post_date_gmt' => '2008-09-18 20:52:05',
  'post_content' => 'Aliquam metus diam, mattis fringilla adipiscing at, lacinia at nulla. Fusce ut sem est. In eu sagittis felis. In gravida arcu ut neque ornare vitae rutrum turpis vehicula. Nunc ultrices sem mollis metus rutrum non malesuada metus fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque interdum rutrum quam, a pharetra est pulvinar ac. Vestibulum congue nisl magna.',
  'post_title' => 'Shot Number Three',
  'post_excerpt' => 'Aliquam metus diam, mattis fringilla adipiscing at',
  'post_name' => 'shot-number-three',
  'post_modified' => '2017-08-21 06:49:57',
  'post_modified_gmt' => '2017-08-21 06:49:57',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=portfolio&#038;p=1093',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 1572,
  'post_date' => '2008-09-18 20:52:37',
  'post_date_gmt' => '2008-09-18 20:52:37',
  'post_content' => 'Ut euismod ligula eu tellus interdum mattis ac eu nulla. Phasellus cursus, lacus quis convallis aliquet, dolor urna ullamcorper mi, eget dapibus velit est vitae nisi. Aliquam erat nulla, sodales at imperdiet vitae, convallis vel dui. Sed ultrices felis ut justo suscipit vestibulum. Pellentesque nisl nisi, vehicula vitae hendrerit vel, mattis eget mauris. Donec consequat eros eget lectus dictum sit amet ultrices neque sodales. Aliquam metus diam, mattis fringilla adipiscing at, lacinia at nulla. Fusce ut sem est. In eu sagittis felis.',
  'post_title' => 'Beautiful Shot',
  'post_excerpt' => 'Ut euismod ligula eu tellus interdum mattis ac eu nulla.',
  'post_name' => 'beautiful-shot',
  'post_modified' => '2017-08-21 06:49:56',
  'post_modified_gmt' => '2017-08-21 06:49:56',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/agency/?post_type=portfolio&#038;p=1095',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2503,
  'post_date' => '2014-09-03 19:44:38',
  'post_date_gmt' => '2014-09-03 19:44:38',
  'post_content' => 'Sed efficitur sit amet enim ut tristique. Nunc metus justo, ornare et lacinia a, pretium eu neque. Mauris elit lacus, laoreet nec diam et, fringilla facilisis erat.',
  'post_title' => 'Perspective',
  'post_excerpt' => 'Sed efficitur sit amet enim ut tristique. Nunc metus justo, ornare et lacinia a, pretium eu neque',
  'post_name' => 'perspective',
  'post_modified' => '2017-08-21 06:49:26',
  'post_modified_gmt' => '2017-08-21 06:49:26',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2503',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'featured_area_background_color' => '#667280',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'photos',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2485,
  'post_date' => '2014-09-03 00:44:35',
  'post_date_gmt' => '2014-09-03 00:44:35',
  'post_content' => 'Proin eros urna, egestas quis urna in, sodales ultrices magna. Ut feugiat suscipit maximus. Nulla mattis auctor turpis, ac iaculis diam placerat eu. Duis sollicitudin elit vel orci consectetur eleifend.',
  'post_title' => 'City View',
  'post_excerpt' => 'Proin eros urna, egestas quis urna in, sodales ultrices magna',
  'post_name' => 'city-view',
  'post_modified' => '2017-08-21 06:49:39',
  'post_modified_gmt' => '2017-08-21 06:49:39',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2485',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'misc',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2504,
  'post_date' => '2014-09-03 20:07:00',
  'post_date_gmt' => '2014-09-03 20:07:00',
  'post_content' => 'In ut tincidunt nunc. Maecenas tempor faucibus ligula quis tincidunt. Mauris scelerisque imperdiet enim nec ultricies. Donec vulputate orci nec justo varius bibendum. Duis ac diam sed nibh finibus sollicitudin in et nunc.',
  'post_title' => 'Custom BG Project',
  'post_excerpt' => 'In ut tincidunt nunc. Maecenas tempor faucibus ligula quis tincidunt.',
  'post_name' => 'custom-bg-project',
  'post_modified' => '2017-08-21 06:49:24',
  'post_modified_gmt' => '2017-08-21 06:49:24',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2504',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'header_wrap' => 'transparent',
    'headerwrap_text_color' => '#ffffff',
    'headerwrap_link_color' => '#ffffff',
    'featured_area_background_image' => 'https://themify.me/demo/themes/corporate/files/2014/09/193500593_2.jpg',
    'featured_area_background_repeat' => 'fullcover',
    'builder_switch_frontend' => '0',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'vintage',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2574,
  'post_date' => '2014-09-10 23:41:37',
  'post_date_gmt' => '2014-09-10 23:41:37',
  'post_content' => '<!--themify_builder_static--><h1 style="text-align: center">Builder Project</h1><h3 style="text-align: center">This project page is built using the Themify&#8217;s drag &amp; drop Builder</h3>
 <h2 style="text-align: center">Research Time</h2><h3 style="text-align: center">Our team spent 3 night in&#8230;</h3>
 <h2 style="text-align: center">Fun Time</h2>
 
 
 
 
 <h3> Planning </h3> <p>More of the time are spent in planning</p> 
 
 
 
 
 
 <h3> Started </h3> <p>Project finally started after 3 months of planning</p> 
 
 
 
 
 
 <h3> Testing </h3> <p>Testing, revising, and testing and then revising</p> 
 
 
 
 
 
 <h3> Done! </h3> <p>After 9 months, the project is finally done. Kudo!</p> 
 
 <h2>Thanks to the team</h2><h3>We couldn&#8217;t do it without the awesome Themify team</h3>
 <h4 style="text-align: center">What did the client say?</h4><h2 style="text-align: center">&#8220;Themify team has done an amazing to make this theme possible. Two thumb up!&#8221;</h2><h5 style="text-align: center">John Doe, CEO</h5><!--/themify_builder_static-->',
  'post_title' => 'Builder Project',
  'post_excerpt' => '',
  'post_name' => 'builder-project',
  'post_modified' => '2017-09-28 16:10:33',
  'post_modified_gmt' => '2017-09-28 16:10:33',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?post_type=portfolio&#038;p=2574',
  'menu_order' => 0,
  'post_type' => 'portfolio',
  'meta_input' => 
  array (
    'content_width' => 'full_width',
    'hide_post_title' => 'yes',
    'hide_post_date' => 'yes',
    'hide_post_meta' => 'yes',
    'hide_post_image' => 'yes',
    'header_wrap' => 'transparent',
    'headerwrap_text_color' => '#ffffff',
    'headerwrap_link_color' => '#ffffff',
    'builder_switch_frontend' => '0',
    '_themify_builder_settings_json' => '[{\\"row_order\\":\\"0\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first last\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h1 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Builder Project</h1><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">This project page is built using the Themify\\\\\\\\\\\'s drag & drop Builder</h3>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"https://themify.me/demo/themes/corporate/files/2014/09/4.jpg\\",\\"background_repeat\\":\\"builder-parallax-scrolling\\",\\"background_video\\":\\"\\",\\"background_color\\":\\"000000\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"ffffff\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"ffffff\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"1\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first last\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Research Time</h2><h3 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Our team spent 3 night in...</h3>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"fullheight\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"https://themify.me/demo/themes/corporate/files/2014/09/messier_marathon.jpg\\",\\"background_repeat\\":\\"fullcover\\",\\"background_video\\":\\"https://themify.me/demo/themes/corporate/files/2014/09/messier_marathon.mp4\\",\\"background_color\\":\\"000000\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"ffffff\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"ffffff\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"2\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">Fun Time</h2>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"4\\",\\"margin_bottom_unit\\":\\"%\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_video\\":\\"\\",\\"background_color\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"5\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"3\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col4-1 first\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Planning\\",\\"content_feature\\":\\"<p>More of the time are spent in planning</p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"30\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"f5c400\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-calendar\\",\\"icon_color_feature\\":\\"000000\\",\\"param_feature\\":\\"|\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"1\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Started\\",\\"content_feature\\":\\"<p>Project finally started after 3 months of planning</p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"50\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"2ec282\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-folder-open\\",\\"icon_color_feature\\":\\"000000\\",\\"param_feature\\":\\"|\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"2\\",\\"grid_class\\":\\"col4-1\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Testing\\",\\"content_feature\\":\\"<p>Testing, revising, and testing and then revising</p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"80\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"f052e8\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-bar-chart-o\\",\\"icon_color_feature\\":\\"000000\\",\\"param_feature\\":\\"|\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]},{\\"column_order\\":\\"3\\",\\"grid_class\\":\\"col4-1 last\\",\\"modules\\":[{\\"mod_name\\":\\"feature\\",\\"mod_settings\\":{\\"title_feature\\":\\"Done!\\",\\"content_feature\\":\\"<p>After 9 months, the project is finally done. Kudo!</p>\\",\\"layout_feature\\":\\"icon-top\\",\\"circle_percentage_feature\\":\\"100\\",\\"circle_stroke_feature\\":\\"2\\",\\"circle_color_feature\\":\\"7b00ff\\",\\"circle_size_feature\\":\\"medium\\",\\"icon_type_feature\\":\\"icon\\",\\"icon_feature\\":\\"fa-thumbs-o-up\\",\\"icon_color_feature\\":\\"000000\\",\\"param_feature\\":\\"|\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"column_alignment\\":\\"\\",\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_video\\":\\"\\",\\"background_color\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"5\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"4\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h2>Thanks to the team</h2><h3>We couldn\\\\\\\\\\\'t do it without the awesome Themify team</h3>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"https://themify.me/demo/themes/corporate/files/2014/09/people_project.jpg\\",\\"background_repeat\\":\\"builder-parallax-scrolling\\",\\"background_video\\":\\"\\",\\"background_color\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"ffffff\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"ffffff\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"20\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"20\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"5\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first\\",\\"modules\\":[{\\"mod_name\\":\\"text\\",\\"mod_settings\\":{\\"content_text\\":\\"<h4 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">What did the client say?</h4><h2 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">\\\\\\\\\\\\\\"Themify team has done an amazing to make this theme possible. Two thumb up!\\\\\\\\\\\\\\"</h2><h5 style=\\\\\\\\\\\\\\"text-align: center;\\\\\\\\\\\\\\">John Doe, CEO</h5>\\",\\"font_family\\":\\"default\\",\\"text_align_left\\":\\"left\\",\\"text_align_center\\":\\"center\\",\\"text_align_right\\":\\"right\\",\\"text_align_justify\\":\\"justify\\",\\"padding_top_unit\\":\\"px\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom_unit\\":\\"px\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left_unit\\":\\"px\\"}}],\\"styling\\":[]}],\\"styling\\":{\\"row_width\\":\\"\\",\\"row_height\\":\\"\\",\\"animation_effect\\":\\"\\",\\"background_image\\":\\"\\",\\"background_repeat\\":\\"\\",\\"background_video\\":\\"\\",\\"background_color\\":\\"\\",\\"font_family\\":\\"default\\",\\"font_color\\":\\"\\",\\"font_size\\":\\"\\",\\"font_size_unit\\":\\"\\",\\"line_height\\":\\"\\",\\"line_height_unit\\":\\"\\",\\"text_align\\":\\"\\",\\"link_color\\":\\"\\",\\"text_decoration\\":\\"\\",\\"padding_top\\":\\"10\\",\\"padding_top_unit\\":\\"%\\",\\"padding_right\\":\\"\\",\\"padding_right_unit\\":\\"px\\",\\"padding_bottom\\":\\"3\\",\\"padding_bottom_unit\\":\\"%\\",\\"padding_left\\":\\"\\",\\"padding_left_unit\\":\\"px\\",\\"margin_top\\":\\"\\",\\"margin_top_unit\\":\\"px\\",\\"margin_right\\":\\"\\",\\"margin_right_unit\\":\\"px\\",\\"margin_bottom\\":\\"\\",\\"margin_bottom_unit\\":\\"px\\",\\"margin_left\\":\\"\\",\\"margin_left_unit\\":\\"px\\",\\"border_top_color\\":\\"\\",\\"border_top_width\\":\\"\\",\\"border_top_style\\":\\"\\",\\"border_right_color\\":\\"\\",\\"border_right_width\\":\\"\\",\\"border_right_style\\":\\"\\",\\"border_bottom_color\\":\\"\\",\\"border_bottom_width\\":\\"\\",\\"border_bottom_style\\":\\"\\",\\"border_left_color\\":\\"\\",\\"border_left_width\\":\\"\\",\\"border_left_style\\":\\"\\",\\"custom_css_row\\":\\"\\"}},{\\"row_order\\":\\"6\\",\\"cols\\":[{\\"column_order\\":\\"0\\",\\"grid_class\\":\\"col-full first last\\",\\"modules\\":[],\\"styling\\":[]}],\\"styling\\":[]}]',
  ),
  'tax_input' => 
  array (
    'portfolio-category' => 'featured',
  ),
  'has_thumbnail' => true,
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2395,
  'post_date' => '2014-08-29 22:52:05',
  'post_date_gmt' => '2014-08-29 22:52:05',
  'post_content' => '',
  'post_title' => 'Top',
  'post_excerpt' => '',
  'post_name' => 'top',
  'post_modified' => '2014-08-29 22:52:05',
  'post_modified_gmt' => '2014-08-29 22:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/top/',
  'menu_order' => 1,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2395',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2456,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2456',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2456',
  'menu_order' => 1,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '9',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2842,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2842',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2842',
  'menu_order' => 1,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '9',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2394,
  'post_date' => '2014-08-29 22:52:05',
  'post_date_gmt' => '2014-08-29 22:52:05',
  'post_content' => '',
  'post_title' => 'Portfolio',
  'post_excerpt' => '',
  'post_name' => 'portfolio',
  'post_modified' => '2014-08-29 22:52:05',
  'post_modified_gmt' => '2014-08-29 22:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/portfolio/',
  'menu_order' => 2,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2394',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#portfolio',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2618,
  'post_date' => '2014-09-15 05:41:15',
  'post_date_gmt' => '2014-09-15 05:41:15',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2618',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2618',
  'menu_order' => 2,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2456',
    '_menu_item_object_id' => '2604',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2843,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2843',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2843',
  'menu_order' => 2,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2842',
    '_menu_item_object_id' => '2521',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2397,
  'post_date' => '2014-08-29 22:52:05',
  'post_date_gmt' => '2014-08-29 22:52:05',
  'post_content' => '',
  'post_title' => 'Highlights',
  'post_excerpt' => '',
  'post_name' => 'highlights',
  'post_modified' => '2014-08-29 22:52:05',
  'post_modified_gmt' => '2014-08-29 22:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/highlights/',
  'menu_order' => 3,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2397',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#highlight',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2535,
  'post_date' => '2014-09-10 16:42:33',
  'post_date_gmt' => '2014-09-10 16:42:33',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2535',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2535',
  'menu_order' => 3,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2456',
    '_menu_item_object_id' => '2527',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2844,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2844',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2844',
  'menu_order' => 3,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2842',
    '_menu_item_object_id' => '2604',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2396,
  'post_date' => '2014-08-29 22:52:05',
  'post_date_gmt' => '2014-08-29 22:52:05',
  'post_content' => '',
  'post_title' => 'Team',
  'post_excerpt' => '',
  'post_name' => 'team',
  'post_modified' => '2014-08-29 22:52:05',
  'post_modified_gmt' => '2014-08-29 22:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/team/',
  'menu_order' => 4,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2396',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#team',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2576,
  'post_date' => '2014-09-11 00:01:05',
  'post_date_gmt' => '2014-09-11 00:01:05',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2576',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2576',
  'menu_order' => 4,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2456',
    '_menu_item_object_id' => '2521',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2845,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2845',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2845',
  'menu_order' => 4,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2842',
    '_menu_item_object_id' => '2527',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2404,
  'post_date' => '2014-08-29 22:52:06',
  'post_date_gmt' => '2014-08-29 22:52:06',
  'post_content' => '',
  'post_title' => 'Testimonials',
  'post_excerpt' => '',
  'post_name' => 'testimonials',
  'post_modified' => '2014-08-29 22:52:06',
  'post_modified_gmt' => '2014-08-29 22:52:06',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/testimonials/',
  'menu_order' => 5,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2404',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#testimonial-post-type',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2457,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2457',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2457',
  'menu_order' => 5,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2456',
    '_menu_item_object_id' => '106',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2846,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2846',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2846',
  'menu_order' => 5,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2842',
    '_menu_item_object_id' => '2557',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2405,
  'post_date' => '2014-08-29 22:52:06',
  'post_date_gmt' => '2014-08-29 22:52:06',
  'post_content' => '',
  'post_title' => 'Blog',
  'post_excerpt' => '',
  'post_name' => 'blog',
  'post_modified' => '2014-08-29 22:52:06',
  'post_modified_gmt' => '2014-08-29 22:52:06',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/blog/',
  'menu_order' => 6,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2405',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#blog-3',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2559,
  'post_date' => '2014-09-10 19:52:57',
  'post_date_gmt' => '2014-09-10 19:52:57',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2559',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2559',
  'menu_order' => 6,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2456',
    '_menu_item_object_id' => '2557',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2847,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2847',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2847',
  'menu_order' => 6,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2842',
    '_menu_item_object_id' => '106',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2398,
  'post_date' => '2014-08-29 22:52:05',
  'post_date_gmt' => '2014-08-29 22:52:05',
  'post_content' => '',
  'post_title' => 'More',
  'post_excerpt' => '',
  'post_name' => 'more',
  'post_modified' => '2014-08-29 22:52:05',
  'post_modified_gmt' => '2014-08-29 22:52:05',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/more/',
  'menu_order' => 7,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2398',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2449,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2449',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2449',
  'menu_order' => 7,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2172',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2837,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => '',
  'post_title' => 'Test',
  'post_excerpt' => '',
  'post_name' => 'test',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2837',
  'menu_order' => 7,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2837',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#Test',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2441,
  'post_date' => '2014-08-29 22:52:10',
  'post_date_gmt' => '2014-08-29 22:52:10',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2441',
  'post_modified' => '2014-08-29 22:52:10',
  'post_modified_gmt' => '2014-08-29 22:52:10',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2441/',
  'menu_order' => 8,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2398',
    '_menu_item_object_id' => '9',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2450,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2450',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2450',
  'menu_order' => 8,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2449',
    '_menu_item_object_id' => '2212',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2838,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => '',
  'post_title' => 'Test-1',
  'post_excerpt' => '',
  'post_name' => 'test-1',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2838',
  'menu_order' => 8,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2838',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#Test-1',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2451,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2451',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2451',
  'menu_order' => 9,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2449',
    '_menu_item_object_id' => '2210',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2839,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => '',
  'post_title' => 'Test-2',
  'post_excerpt' => '',
  'post_name' => 'test-2',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2839',
  'menu_order' => 9,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2839',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#Test-2',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2443,
  'post_date' => '2014-08-29 22:52:10',
  'post_date_gmt' => '2014-08-29 22:52:10',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2443',
  'post_modified' => '2014-08-29 22:52:10',
  'post_modified_gmt' => '2014-08-29 22:52:10',
  'post_content_filtered' => '',
  'post_parent' => 9,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2443/',
  'menu_order' => 10,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2441',
    '_menu_item_object_id' => '106',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2452,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2452',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2452',
  'menu_order' => 10,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2156',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2840,
  'post_date' => '2015-04-16 15:31:37',
  'post_date_gmt' => '2015-04-16 15:31:37',
  'post_content' => '',
  'post_title' => 'Test-3',
  'post_excerpt' => '',
  'post_name' => 'test-3',
  'post_modified' => '2015-04-16 15:31:37',
  'post_modified_gmt' => '2015-04-16 15:31:37',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2840',
  'menu_order' => 10,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'custom',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2840',
    '_menu_item_object' => 'custom',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
    '_menu_item_url' => '#Test-3',
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'test-scroll-to-anchor',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2453,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2453',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2453',
  'menu_order' => 11,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2452',
    '_menu_item_object_id' => '2208',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2426,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2426',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2426/',
  'menu_order' => 12,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2398',
    '_menu_item_object_id' => '2172',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2454,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2454',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2454',
  'menu_order' => 12,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2452',
    '_menu_item_object_id' => '2205',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2427,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2427',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2427/',
  'menu_order' => 13,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2426',
    '_menu_item_object_id' => '2212',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2455,
  'post_date' => '2014-08-29 22:58:32',
  'post_date_gmt' => '2014-08-29 22:58:32',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2455',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2455',
  'menu_order' => 13,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2452',
    '_menu_item_object_id' => '2203',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2428,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2428',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 2172,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2428/',
  'menu_order' => 14,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2426',
    '_menu_item_object_id' => '2210',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2617,
  'post_date' => '2014-09-15 05:41:18',
  'post_date_gmt' => '2014-09-15 05:41:18',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2617',
  'post_modified' => '2016-01-25 17:14:53',
  'post_modified_gmt' => '2016-01-25 17:14:53',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/?p=2617',
  'menu_order' => 14,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '0',
    '_menu_item_object_id' => '2357',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'main-nav',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2429,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2429',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 0,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2429/',
  'menu_order' => 15,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2398',
    '_menu_item_object_id' => '2156',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2430,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2430',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2430/',
  'menu_order' => 16,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2429',
    '_menu_item_object_id' => '2208',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2431,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2431',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2431/',
  'menu_order' => 17,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2429',
    '_menu_item_object_id' => '2205',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}

$post = array (
  'ID' => 2432,
  'post_date' => '2014-08-29 22:52:09',
  'post_date_gmt' => '2014-08-29 22:52:09',
  'post_content' => ' ',
  'post_title' => '',
  'post_excerpt' => '',
  'post_name' => '2432',
  'post_modified' => '2014-08-29 22:52:09',
  'post_modified_gmt' => '2014-08-29 22:52:09',
  'post_content_filtered' => '',
  'post_parent' => 2156,
  'guid' => 'https://themify.me/demo/themes/corporate/2014/08/29/2432/',
  'menu_order' => 18,
  'post_type' => 'nav_menu_item',
  'meta_input' => 
  array (
    '_menu_item_type' => 'post_type',
    '_menu_item_menu_item_parent' => '2429',
    '_menu_item_object_id' => '2203',
    '_menu_item_object' => 'page',
    '_menu_item_classes' => 
    array (
      0 => '',
    ),
  ),
  'tax_input' => 
  array (
    'nav_menu' => 'single-page-menu',
  ),
);
if( ERASEDEMO ) {
	themify_undo_import_post( $post );
} else {
	themify_import_post( $post );
}


function themify_import_get_term_id_from_slug( $slug ) {
	$menu = get_term_by( "slug", $slug, "nav_menu" );
	return is_wp_error( $menu ) ? 0 : (int) $menu->term_id;
}

	$widgets = get_option( "widget_themify-twitter" );
$widgets[1002] = array (
  'title' => 'Latest Tweets',
  'username' => 'themify',
  'show_count' => '3',
  'hide_timestamp' => NULL,
  'show_follow' => NULL,
  'follow_text' => '→ Follow me',
  'include_retweets' => 'on',
  'exclude_replies' => NULL,
);
update_option( "widget_themify-twitter", $widgets );

$widgets = get_option( "widget_woocommerce_products" );
$widgets[1003] = array (
  'title' => 'Products',
  'number' => '3',
  'show' => '',
  'orderby' => 'date',
  'order' => 'desc',
  'hide_free' => 0,
  'show_hidden' => 0,
);
update_option( "widget_woocommerce_products", $widgets );

$widgets = get_option( "widget_themify-feature-posts" );
$widgets[1004] = array (
  'title' => 'Recent Posts',
  'category' => '0',
  'show_count' => '3',
  'show_date' => NULL,
  'show_thumb' => 'on',
  'display' => 'none',
  'hide_title' => NULL,
  'thumb_width' => '50',
  'thumb_height' => '50',
  'excerpt_length' => '55',
  'orderby' => 'date',
  'order' => 'DESC',
);
update_option( "widget_themify-feature-posts", $widgets );

$widgets = get_option( "widget_themify-social-links" );
$widgets[1005] = array (
  'title' => '',
  'show_link_name' => NULL,
  'open_new_window' => NULL,
  'icon_size' => 'icon-medium',
  'orientation' => 'horizontal',
);
update_option( "widget_themify-social-links", $widgets );

$widgets = get_option( "widget_themify-social-links" );
$widgets[1006] = array (
  'title' => '',
  'show_link_name' => NULL,
  'open_new_window' => NULL,
  'icon_size' => 'icon-medium',
  'orientation' => 'horizontal',
);
update_option( "widget_themify-social-links", $widgets );



$sidebars_widgets = array (
  'sidebar-main' => 
  array (
    0 => 'themify-twitter-1002',
    1 => 'woocommerce_products-1003',
    2 => 'themify-feature-posts-1004',
  ),
  'social-widget' => 
  array (
    0 => 'themify-social-links-1005',
  ),
  'footer-social-widget' => 
  array (
    0 => 'themify-social-links-1006',
  ),
); 
update_option( "sidebars_widgets", $sidebars_widgets );

$menu_locations = array();
$menu = get_terms( "nav_menu", array( "slug" => "main-nav" ) );
if( is_array( $menu ) && ! empty( $menu ) ) $menu_locations["main-nav"] = $menu[0]->term_id;
set_theme_mod( "nav_menu_locations", $menu_locations );


$homepage = get_posts( array( 'name' => 'home', 'post_type' => 'page' ) );
			if( is_array( $homepage ) && ! empty( $homepage ) ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', $homepage[0]->ID );
			}
			
	ob_start(); ?>a:74:{s:16:"setting-page_404";s:1:"0";s:21:"setting-webfonts_list";s:11:"recommended";s:22:"setting-default_layout";s:8:"sidebar1";s:27:"setting-default_post_layout";s:9:"list-post";s:30:"setting-default_layout_display";s:7:"content";s:25:"setting-default_more_text";s:4:"More";s:21:"setting-index_orderby";s:4:"date";s:19:"setting-index_order";s:4:"DESC";s:31:"setting-image_post_feature_size";s:5:"blank";s:32:"setting-default_page_post_layout";s:8:"sidebar1";s:38:"setting-image_post_single_feature_size";s:5:"blank";s:27:"setting-default_page_layout";s:8:"sidebar1";s:38:"setting-default_portfolio_index_layout";s:12:"sidebar-none";s:39:"setting-default_portfolio_index_display";s:4:"none";s:50:"setting-default_portfolio_index_post_meta_category";s:3:"yes";s:41:"setting-default_portfolio_index_post_date";s:3:"yes";s:49:"setting-default_portfolio_single_image_post_width";s:4:"1160";s:50:"setting-default_portfolio_single_image_post_height";s:3:"700";s:22:"themify_portfolio_slug";s:7:"project";s:34:"setting-default_team_single_layout";s:12:"sidebar-none";s:17:"themify_team_slug";s:4:"team";s:53:"setting-customizer_responsive_design_tablet_landscape";s:4:"1024";s:43:"setting-customizer_responsive_design_tablet";s:3:"768";s:43:"setting-customizer_responsive_design_mobile";s:3:"680";s:33:"setting-mobile_menu_trigger_point";s:4:"1200";s:24:"setting-gallery_lightbox";s:8:"lightbox";s:27:"setting-script_minification";s:7:"disable";s:27:"setting-page_builder_expiry";s:1:"2";s:19:"setting-entries_nav";s:8:"numbered";s:35:"setting-testimonial_slider_autoplay";s:4:"4000";s:33:"setting-testimonial_slider_effect";s:5:"slide";s:43:"setting-testimonial_slider_transition_speed";s:3:"500";s:29:"setting-color_animation_speed";s:1:"5";s:22:"setting-footer_widgets";s:17:"footerwidget-3col";s:27:"setting-global_feature_size";s:5:"blank";s:22:"setting-link_icon_type";s:9:"font-icon";s:32:"setting-link_type_themify-link-0";s:10:"image-icon";s:33:"setting-link_title_themify-link-0";s:7:"Twitter";s:31:"setting-link_img_themify-link-0";s:95:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/images/twitter.png";s:32:"setting-link_type_themify-link-1";s:10:"image-icon";s:33:"setting-link_title_themify-link-1";s:8:"Facebook";s:31:"setting-link_img_themify-link-1";s:96:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/images/facebook.png";s:32:"setting-link_type_themify-link-2";s:10:"image-icon";s:33:"setting-link_title_themify-link-2";s:6:"Google";s:31:"setting-link_img_themify-link-2";s:99:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/images/google-plus.png";s:32:"setting-link_type_themify-link-3";s:10:"image-icon";s:33:"setting-link_title_themify-link-3";s:7:"YouTube";s:31:"setting-link_img_themify-link-3";s:95:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/images/youtube.png";s:32:"setting-link_type_themify-link-4";s:10:"image-icon";s:33:"setting-link_title_themify-link-4";s:9:"Pinterest";s:31:"setting-link_img_themify-link-4";s:97:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/images/pinterest.png";s:32:"setting-link_type_themify-link-7";s:9:"font-icon";s:33:"setting-link_title_themify-link-7";s:6:"Google";s:32:"setting-link_link_themify-link-7";s:45:"https://plus.google.com/102333925087069536501";s:33:"setting-link_ficon_themify-link-7";s:14:"fa-google-plus";s:32:"setting-link_type_themify-link-6";s:9:"font-icon";s:33:"setting-link_title_themify-link-6";s:8:"Facebook";s:32:"setting-link_link_themify-link-6";s:27:"http://facebook.com/themify";s:33:"setting-link_ficon_themify-link-6";s:11:"fa-facebook";s:32:"setting-link_type_themify-link-5";s:9:"font-icon";s:33:"setting-link_title_themify-link-5";s:7:"Twitter";s:32:"setting-link_link_themify-link-5";s:26:"http://twitter.com/themify";s:33:"setting-link_ficon_themify-link-5";s:10:"fa-twitter";s:32:"setting-link_type_themify-link-8";s:9:"font-icon";s:33:"setting-link_title_themify-link-8";s:7:"YouTube";s:33:"setting-link_ficon_themify-link-8";s:10:"fa-youtube";s:32:"setting-link_type_themify-link-9";s:9:"font-icon";s:33:"setting-link_title_themify-link-9";s:9:"Pinterest";s:33:"setting-link_ficon_themify-link-9";s:12:"fa-pinterest";s:22:"setting-link_field_ids";s:341:"{"themify-link-0":"themify-link-0","themify-link-1":"themify-link-1","themify-link-2":"themify-link-2","themify-link-3":"themify-link-3","themify-link-4":"themify-link-4","themify-link-7":"themify-link-7","themify-link-6":"themify-link-6","themify-link-5":"themify-link-5","themify-link-8":"themify-link-8","themify-link-9":"themify-link-9"}";s:23:"setting-link_field_hash";s:2:"10";s:30:"setting-page_builder_is_active";s:6:"enable";s:46:"setting-page_builder_animation_parallax_scroll";s:6:"mobile";s:4:"skin";s:101:"https://themify.me/demo/themes/corporate/wp-content/themes/themify-corporate/themify/img/non-skin.gif";}<?php $themify_data = unserialize( ob_get_clean() );

	// fix the weird way "skin" is saved
	if( isset( $themify_data['skin'] ) ) {
		$parsed_skin = parse_url( $themify_data['skin'], PHP_URL_PATH );
		$basedir_skin = basename( dirname( $parsed_skin ) );
		$themify_data['skin'] = trailingslashit( get_template_directory_uri() ) . 'skins/' . $basedir_skin . '/style.css';
	}

	themify_set_data( $themify_data );
	
}
themify_do_demo_import();