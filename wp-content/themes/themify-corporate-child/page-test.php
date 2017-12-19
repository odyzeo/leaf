<?php
/**
 * Template name: Admin Test
 */

if ( true ) {
	global $wpdb;

	$querystr = "
		SELECT
			WP.post_title,
			WM.meta_key,
			WM.meta_value
		FROM
			$wpdb->posts AS WP
			LEFT JOIN $wpdb->postmeta AS WM ON WP.ID = WM.post_id 
		WHERE
			WP.post_type = 'mentor' 
	AND WM.meta_key IN ( 'sor_more_info', 'sor_mentor_linkedin', 'sor_mentor_category', 'sor_mentor_activity', 'sor_mentor_aboutme' );
 ";

	$result = $wpdb->get_results( $querystr );

	$rows = [];
	foreach ( $result as $post ) {
		$row = "$post->post_title";
		if ( ! array_key_exists( $post->post_title, $rows ) ) {
			$rows[ $post->post_title ]                        = [];
			$rows[ $post->post_title ]['meno']                = $post->post_title;
			$rows[ $post->post_title ]['sor_more_info']       = '';
			$rows[ $post->post_title ]['sor_mentor_linkedin'] = '';
			$rows[ $post->post_title ]['sor_mentor_category'] = '';
			$rows[ $post->post_title ]['sor_mentor_activity'] = '';
			$rows[ $post->post_title ]['sor_mentor_aboutme']  = '';
		}
		$rows[ $post->post_title ][ $post->meta_key ] = trim( preg_replace( '/\s\s+/', ' ', strip_tags( $post->meta_value ) ) );
	}

	echo $row = "meno;sor_more_info;sor_mentor_linkedin;sor_mentor_category;sor_mentor_activity;sor_mentor_aboutme\n\r";
	foreach ( $rows as $row ) {
		echo $row['meno'] . ';' . $row['sor_more_info'] . ';' . $row['sor_mentor_linkedin'] . ';' . $row['sor_mentor_category'] . ';' . $row['sor_mentor_activity'] . ';' . $row['sor_mentor_aboutme'] . "\n\r";
	}

//	print_r($rows);
}