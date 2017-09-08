<?php

return array(
	'name'		=> __( 'News Styles', 'themify' ),
	'id' 		=> 'news-styles',
	'options' 	=> array(
		// Separator - Styling
		array(
		    'name'        => '_separator_background',
		    'title'       => '',
		    'description' => '',
		    'type'        => 'separator',
		    'meta'        => array(
		        'html' => '<h4>' . __( 'News Style in Archive Views', 'themify-news-posts' ) . '</h4>'
		    ),
		),
	    // Tile Size
		array(
			'name'        => 'tile_layout',
			'title'       => __( 'Masonry Layout', 'themify-news-posts' ),
			'description' => __( 'This layout arrangement applies in news archive if masonry style is selected.', 'themify-news-posts' ),
			'type'        => 'layout',
			'show_title'  => true,
			'meta'        => array(
				array(
					'value'    => 'size-large image-left',
					'img'      => THEMIFY_NEWS_POST_URI . 'images/layout-icons/large-image-left.png',
					'title'    => __( 'Large tile, Image on the left', 'themify-news-posts' ),
					'selected' => true,
				),
				array(
					'value' => 'size-small image-left',
					'img'   => THEMIFY_NEWS_POST_URI . 'images/layout-icons/small-image-left.png',
					'title' => __( 'Small tile, Image on the left', 'themify-news-posts' ),
				),
				array(
					'value'    => 'size-large image-right',
					'img'      => THEMIFY_NEWS_POST_URI . 'images/layout-icons/large-image-right.png',
					'title'    => __( 'Large tile, Image on the right', 'themify-news-posts' ),
					'selected' => true,
				),
				array(
					'value' => 'size-small image-right',
					'img'   => THEMIFY_NEWS_POST_URI . 'images/layout-icons/small-image-right.png',
					'title' => __( 'Small tile, Image on the right', 'themify-news-posts' ),
				),
			)
		),
		// Background Color
		array(
			'name'        => 'background_color',
			'title'       => __( 'Background', 'themify-news-posts' ),
			'description' => '',
			'type'        => 'color',
			'meta'        => array( 'default' => null ),
		),
		// Background image
		array(
			'name'        => 'background_image',
			'title'       => '',
			'type'        => 'image',
			'description' => '',
			'meta'        => array(),
			'before'      => '',
			'after'       => '',
		),
		// Background repeat
		array(
			'name'        => 'background_repeat',
			'title'       => __( 'Background Repeat', 'themify-news-posts' ),
			'description' => '',
			'type'        => 'dropdown',
			'meta'        => array(
				array(
					'value' => '',
					'name'  => ''
				),
				array(
					'value' => 'fullcover',
					'name'  => __( 'Fullcover', 'themify-news-posts' )
				),
				array(
					'value' => 'repeat',
					'name'  => __( 'Repeat', 'themify-news-posts' )
				),
				array(
					'value' => 'repeat-x',
					'name'  => __( 'Repeat horizontally', 'themify-news-posts' )
				),
				array(
					'value' => 'repeat-y',
					'name'  => __( 'Repeat vertically', 'themify-news-posts' )
				),
			),
			'toggle'      => 'solid-toggle',
		),
		// Text color
		array(
			'name'        => 'text_color',
			'title'       => __( 'Text Color', 'themify-news-posts' ),
			'description' => '',
			'type'        => 'color',
			'meta'        => array( 'default' => null ),
		),
		// Link color
		array(
			'name'        => 'link_color',
			'title'       => __( 'Link Color', 'themify-news-posts' ),
			'description' => '',
			'type'        => 'color',
			'meta'        => array( 'default' => null ),
		),
	),
	'pages'		=> 'news'
);