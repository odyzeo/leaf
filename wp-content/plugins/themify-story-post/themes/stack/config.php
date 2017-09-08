<?php

return array(
	'name'		=> __( 'Story Styles', 'themify' ),
	'id' 		=> 'story-styles',
	'options' 	=> array(
		// Separator - Styling
		array(
		    'name'        => '_separator_background',
		    'title'       => '',
		    'description' => '',
		    'type'        => 'separator',
		    'meta'        => array(
		        'html' => '<h4>' . __( 'Story Style in Archive Views', 'themify-story-posts' ) . '</h4>'
		    ),
		),
	    // Tile Size
		array(
			'name'        => 'tile_layout',
			'title'       => __( 'Masonry Layout', 'themify-story-posts' ),
			'description' => __( 'This layout arrangement applies in story archive if masonry style is selected.', 'themify-story-posts' ),
			'type'        => 'layout',
			'show_title'  => true,
			'meta'        => array(
				array(
					'value'    => 'size-large image-left',
					'img'      => THEMIFY_STORY_POST_URI . 'images/layout-icons/large-image-left.png',
					'title'    => __( 'Large tile, Image on the left', 'themify-story-posts' ),
					'selected' => true,
				),
				array(
					'value' => 'size-small image-left',
					'img'   => THEMIFY_STORY_POST_URI . 'images/layout-icons/small-image-left.png',
					'title' => __( 'Small tile, Image on the left', 'themify-story-posts' ),
				),
				array(
					'value'    => 'size-large image-right',
					'img'      => THEMIFY_STORY_POST_URI . 'images/layout-icons/large-image-right.png',
					'title'    => __( 'Large tile, Image on the right', 'themify-story-posts' ),
					'selected' => true,
				),
				array(
					'value' => 'size-small image-right',
					'img'   => THEMIFY_STORY_POST_URI . 'images/layout-icons/small-image-right.png',
					'title' => __( 'Small tile, Image on the right', 'themify-story-posts' ),
				),
			)
		),
		// Background Color
		array(
			'name'        => 'background_color',
			'title'       => __( 'Background', 'themify-story-posts' ),
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
			'title'       => __( 'Background Repeat', 'themify-story-posts' ),
			'description' => '',
			'type'        => 'dropdown',
			'meta'        => array(
				array(
					'value' => '',
					'name'  => ''
				),
				array(
					'value' => 'fullcover',
					'name'  => __( 'Fullcover', 'themify-story-posts' )
				),
				array(
					'value' => 'repeat',
					'name'  => __( 'Repeat', 'themify-story-posts' )
				),
				array(
					'value' => 'repeat-x',
					'name'  => __( 'Repeat horizontally', 'themify-story-posts' )
				),
				array(
					'value' => 'repeat-y',
					'name'  => __( 'Repeat vertically', 'themify-story-posts' )
				),
			),
			'toggle'      => 'solid-toggle',
		),
		// Text color
		array(
			'name'        => 'text_color',
			'title'       => __( 'Text Color', 'themify-story-posts' ),
			'description' => '',
			'type'        => 'color',
			'meta'        => array( 'default' => null ),
		),
		// Link color
		array(
			'name'        => 'link_color',
			'title'       => __( 'Link Color', 'themify-story-posts' ),
			'description' => '',
			'type'        => 'color',
			'meta'        => array( 'default' => null ),
		),
	),
	'pages'		=> 'story'
);