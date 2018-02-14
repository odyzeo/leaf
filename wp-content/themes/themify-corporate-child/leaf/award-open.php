<?php

add_shortcode( 'award-open', 'add_award_open_shortcode' );

function add_award_open_shortcode( $atts ) {
	$args = shortcode_atts( array(
		'title'  => 'Hľadáme šikovné makovice',
		'bubble' => 'PRIHLASOVANIE JE UŽ OTVORENÉ',
		'button' => 'VYPLNIŤ PRIHLÁŠKU',
		'url'    => 'https://www.leaf.sk/award/prihlaska/'
	), $atts );

	$result = "
		<div class='wrapper award-open award-open--deadline'>
			<div class='container'>
				<h1 class='award-open__title'>
					<span>Hľadáme</span> <span>šikovné</span> <span>makovice</span>
				</h1>
				<div class='award-open__bubble'>{$args['bubble']}</div>
				<div class='award-open__stamp'></div>
			</div>
		</div>
	";

	return $result;
}