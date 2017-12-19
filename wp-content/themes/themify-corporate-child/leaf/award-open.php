<?php

add_shortcode( 'award-open', 'add_award_open_shortcode' );

function add_award_open_shortcode( $atts ) {
	$result = "
		<div class='wrapper award-open'>
			<div class='container'>
			<h1 class='award-open__title'>Hľadáme šikovné makovice</h1>
			<div class='award-open__bubble'>PRIHLASOVANIE JE UŽ OTVORENÉ</div>
			<a href='/' class='btn btn--min'>VYPLNIŤ PRIHLÁŠKU</a>
		</div>
	</div>
	";

	return $result;
}