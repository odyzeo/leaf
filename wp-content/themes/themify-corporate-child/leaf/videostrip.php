<?php
function videostrip_shortcode($atts, $content) {
	$param = shortcode_atts( array(
		'class' => ''
	), $atts);

	return "<div class='videostrip'>" . do_shortcode(strip_tags($content, "<p><a><span><strong><h1><h2><h3><h4><ul><li><img><iframe><div>")) . "</div>";
}

function videostrip_item_shortcode($atts, $content = null) {
	$param = shortcode_atts( array(
		'id' => 'undefined',
		'title' => '',
		'class' => ''
	), $atts);

	$id = $param['id'];
	$title = $param['title'];
	$class = $param['class'];
	$play_icon = get_stylesheet_directory_uri() . '/assets/svg/play.svg';

	return "
	<div class='videostrip__item $class'>
		<a href='https://www.youtube.com/watch?v=$id' data-lity class='videostrip__wrapper'  data-youtube='$id'>
			<div id='youtube-$id' class='videostrip__video'></div>
			
			<div class='videostrip__overlay'></div>
			<div class='videostrip__title'>$title</div>
		</a>
	</div>";
}

add_shortcode('videostrip-item', 'videostrip_item_shortcode');
add_shortcode('videostrip', 'videostrip_shortcode');
