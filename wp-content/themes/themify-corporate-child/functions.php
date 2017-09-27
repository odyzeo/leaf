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
flush_rewrite_rules( false );

add_action( 'init', 'odyzeo_migration' );
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
	$rows        = $mydb->get_results( $deleteQuery );
	foreach ( $rows as $obj ) :
		wp_delete_post( $obj->ID, true );
		var_dump( $obj->ID );
	endforeach;
	exit;
	*/


	/*
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
	*/

	function mapTerms( $key ) {
		$termMapTable = array(
			20 => 42, // Business, Consulting, Podnikanie
			21 => 43, // Cudzie jazyky, Literatúra
			22 => 44, // Ekonómia, Financie, Bankovníctvo
			23 => 45, // Humanitné vedy: Psychológia, História, Filozofia, Religionistika
			24 => 46, // Inžinierstvo, Robotika
			25 => 39, // 47, // IT, Programovanie
			26 => 47, // 48, // Marketing, Komunikácia, Médiá
			27 => 48, // 49, // Matematika, Fyzika, Prírodné vedy, Výskum
			28 => 49, // 50, // Medicína, Farmácia
			29 => 50, // 51, // Neziskový sektor, Vzdelávanie, Think Tanky
			30 => 51, // 52, // Politológia, Medzinárodné Vzťahy
			31 => 40, // 53, // Právo
			32 => 52, // 54, // Umenie, Dizajn, Architektúra
		);

		return $termMapTable[ $key ];
	}

	$mentorQuery = "
		SELECT
		  ID,
		  post_content,
		  post_title,
		  post_status,
		  comment_status,
		  post_type,
		  meta_key,
		  meta_value,
		  GROUP_CONCAT(DISTINCT TRS.term_id) AS categories
		FROM tg_posts TPS
		  LEFT JOIN tg_postmeta AS PMT ON TPS.ID = PMT.post_id
		  LEFT JOIN tg_term_relationships TRR ON TRR.object_id = TPS.ID
		  LEFT JOIN tg_term_taxonomy TRX ON TRX.term_taxonomy_id = TRR.term_taxonomy_id AND TRX.taxonomy = 'taxonomy_mentor'
		  LEFT JOIN tg_terms AS TRS ON TRS.term_id = TRX.term_id
		WHERE post_type = 'mentor' AND meta_key IN ('post_image', 'sor_more_info', 'sor_mentor_linkedin', 'sor_mentor_category', 'sor_mentor_activity', 'sor_mentor_aboutme')
		GROUP BY ID, meta_key
		ORDER BY ID
	";
	$rows        = $mydb->get_results( $mentorQuery );
	$toImport = array();

	foreach ( $rows as $obj ) :
		if ( ! array_key_exists( $obj->ID, $toImport ) ) {
			$categories    = explode( ',', $obj->categories );
			$newCategories = array_map( "mapTerms", $categories );

			$toImport[ $obj->ID ] = array(
				'post_title'     => $obj->post_title,
				'post_author'    => 4,
				'post_status'    => $obj->post_status,
				'post_type'      => 'mentor',
				'comment_status' => $obj->comment_status,
				'meta_input'     => array( $obj->meta_key => $obj->meta_value ),
				'categories' => $newCategories,
			);
		} else {
			$toImport[ $obj->ID ]['meta_input'][ $obj->meta_key ] = $obj->meta_value;
		}
	endforeach;

	echo '<pre>';
	var_dump(count($toImport));
	echo '</pre>';

	$i = 0;
	foreach ( $toImport as $mentor ) :

//		if ($i < 3) {
			$newMentorId = wp_insert_post( $mentor );
			wp_set_object_terms( $newMentorId, $mentor['categories'], 'taxonomy_mentor' );
			echo '<br>new' . $newMentorId;
			$i++;
//		}

	endforeach;

	exit;
}
