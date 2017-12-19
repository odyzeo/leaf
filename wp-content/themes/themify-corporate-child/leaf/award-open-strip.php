<?php

add_shortcode( 'award-open-strip', 'add_award_open_strip_shortcode' );

function add_award_open_strip_shortcode( $atts ) {
	$result = "
		<div class='wrapper award-open-strip'>
			<div class='container'>
			<div class='title title--besom'>PRIHLASOVANIE JE UŽ OTVORENÉ</div>
			<a href='/' class='btn btn--min btn--white'>VYPLNIŤ PRIHLÁŠKU</a>
		</div>
	</div>
	";

	return $result;
}