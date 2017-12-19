<?php

add_shortcode( 'bubble', 'add_bubble_shortcode' );

function add_bubble_shortcode( $atts, $content ) {
	$result = "
		<div class='wrapper bubble'>
			<div class='container'>
				<div class='bubble__bubble'>
					$content
				</div>
			</div>
		</div>
	";

	return $result;
}