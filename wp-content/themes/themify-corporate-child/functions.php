<?php
/**
 * Enqueues child theme stylesheet, loading first the parent theme stylesheet.
 */
function themify_child_register_custom_nav() {
	register_nav_menus( array(
		'award-nav'  => __( 'Award Navigation', 'themify' ),
		'talent-nav' => __( 'TalentGuide Navigation', 'themify' ),
	) );
}

add_action( 'init', 'themify_child_register_custom_nav' );

function themify_custom_enqueue_child_theme_styles() {
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


/**
 * ENABLE IF NEW POST TYPE PAGE WANTED - 404 NOT FOUND
 * RUN ONLY ONCE
 */
// flush_rewrite_rules( false );

// add_action( 'init', 'odyzeo_migration' );
function odyzeo_migration() {
	return;
	/**
	 * $mydb =
	 */
	/*
	$deleteQuery = "
	SELECT
	  ID
	FROM wp_posts
	WHERE post_type = 'mentor'
	";
		$rows = $mydb->get_results($deleteQuery);
		foreach ($rows as $obj) :
		wp_delete_post($obj->ID, true);
		var_dump($obj->ID);


		endforeach;
		exit;

	$termQuery = "
SELECT name
FROM tg_terms
LEFT JOIN tg_term_taxonomy ON tg_terms.term_id = tg_term_taxonomy.term_id
WHERE tg_term_taxonomy.taxonomy = 'taxonomy_mentor'
";

	$rows = $mydb->get_results($termQuery);
	foreach ($rows as $obj) :
		$termId = wp_insert_term($obj->name, 'taxonomy_mentor');
		var_dump($termId);
	endforeach;

	$mentorQuery = "
SELECT
  ID,
  post_author,
  post_date,
  post_content,
  post_title,
  post_status,
  comment_status,
  post_name,
  post_type,
  menu_order,
  meta_key,
  meta_value
FROM tg_posts
  LEFT JOIN tg_postmeta ON tg_posts.ID = tg_postmeta.post_id
WHERE post_type = 'mentor' AND meta_key IN ('sor_more_info', 'sor_mentor_linkedin', 'sor_mentor_category', 'sor_mentor_activity', 'sor_mentor_aboutme')
ORDER BY ID
";
	$rows        = $mydb->get_results( $mentorQuery );
	$newMentorId = 0;
	$lastMentor  = 0;
	$i           = 0;
	foreach ( $rows as $obj ) :

		if ( $lastMentor !== $obj->ID ) {
			$lastMentor  = $obj->ID;
			$newMentorId = 0;
		}

			$options = [
				'ID'          => $newMentorId,
				'post_title'  => $obj->post_title,
				'post_author' => get_current_user_id(),
				'post_status' => $obj->post_status,
				'post_type'   => 'mentor',
				'comment_status' => $obj->comment_status,
			];
			if ( $newMentorId === 0 ) {
				$newMentorId = wp_insert_post( $options );
			} else {
				wp_update_post( $options );
			}
			add_post_meta( $newMentorId, $obj->meta_key, $obj->meta_value );
			var_dump( 'MENTOR', $lastMentor, $newMentorId );
			$i ++;

	endforeach;

	exit;
	*/
}
