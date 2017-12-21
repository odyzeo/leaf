<?php

add_shortcode( 'award-open', 'add_award_open_shortcode' );

function add_award_open_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'title' => 'Hľadáme šikovné makovice',
		'bubble' => 'PRIHLASOVANIE JE UŽ OTVORENÉ',
		'button' => 'VYPLNIŤ PRIHLÁŠKU',
		'url' => 'https://www.leaf.sk/award/prihlaska/'
	), $atts );

	$result = "
		<div class='wrapper award-open'>
			<div class='container'>
				<h1 class='award-open__title'>{$args['title']}</h1>
				<div class='award-open__bubble'>{$args['bubble']}</div>
				<a href='{$args['url']}' class='btn btn--min'>{$args['button']}</a>
			</div>
		</div>
	";

	return $result;
}