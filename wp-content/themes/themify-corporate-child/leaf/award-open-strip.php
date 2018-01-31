<?php

add_shortcode( 'award-open-strip', 'add_award_open_strip_shortcode' );

function add_award_open_strip_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'title' => 'PRIHLASOVANIE UŽ LEN DO 5.2.2018',
		'button' => 'VYPLNIŤ PRIHLÁŠKU',
		'url' => 'https://www.leaf.sk/award/prihlaska/'
	), $atts );

	$result = "
		<div class='wrapper award-open-strip'>
			<div class='container'>
			<div class='title title--besom'>{$args['title']}</div>
			<a href='{$args['url']}' class='btn btn--min btn--white'>{$args['button']}</a>
		</div>
	</div>
	";

	return $result;
}