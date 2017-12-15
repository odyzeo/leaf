<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Module Name: Story
 * Description: Display story custom post type
 */
class TB_Story_Module extends Themify_Builder_Module {
	var $cpt_options = array(
		'show_in_nav_menus' => true
	);
	var $tax_options = array(
		'show_in_nav_menus' => true
	);

	function __construct() {
		parent::__construct(array(
			'name' => __('Story', 'themify-story-posts'),
			'slug' => 'story'
		));

		///////////////////////////////////////
		// Load Post Type
		///////////////////////////////////////
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

		if( ! is_plugin_active( 'themify-story-post/themify-story-post.php' ) ) {
			$this->meta_box = $this->set_metabox();
			$this->initialize_cpt( array(
				'plural' => __('Storys', 'themify-story-posts'),
				'singular' => __('Story', 'themify-story-posts'),
				'rewrite' => apply_filters('themify_story_rewrite', 'project'),
				'menu_icon' => 'dashicons-story'
			));

			if ( ! shortcode_exists( 'themify_story_posts' ) ) {
				add_shortcode( 'themify_story_posts', array( $this, 'do_shortcode' ) );
			}
		}
	}

	public function get_title( $module ) {
		$type = isset( $module['mod_settings']['type_query_story'] ) ? $module['mod_settings']['type_query_story'] : 'category';
		$category = isset( $module['mod_settings']['category_story'] ) ? $module['mod_settings']['category_story'] : '';
		$slug_query = isset( $module['mod_settings']['query_slug_story'] ) ? $module['mod_settings']['query_slug_story'] : '';

		if ( 'category' == $type ) {
			return sprintf( '%s : %s', __('Category', 'themify-story-posts'), $category );
		} else {
			return sprintf( '%s : %s', __('Slugs', 'themify-story-posts'), $slug_query );
		}
	}

	public function get_options() {
		$image_sizes = themify_get_image_sizes_list( false );
		$options = array(
			array(
				'id' => 'mod_title_story',
				'type' => 'text',
				'label' => __('Module Title', 'themify-story-posts'),
				'class' => 'large'
			),
			array(
				'id' => 'mod_subtitle_story',
				'type' => 'text',
				'label' => __('Module Subtitle', 'themify-story-posts'),
				'class' => 'large'
			),
			/*
			array(
				'id' => 'layout_story',
				'type' => 'layout',
				'label' => __('Story Layout', 'themify-story-posts'),
				'options' => array(
					array('img' => 'grid4.png', 'value' => 'grid4', 'label' => __('Grid 4', 'themify-story-posts')),
					array('img' => 'grid3.png', 'value' => 'grid3', 'label' => __('Grid 3', 'themify-story-posts')),
					array('img' => 'grid2.png', 'value' => 'grid2', 'label' => __('Grid 2', 'themify-story-posts')),
					array('img' => 'fullwidth.png', 'value' => 'fullwidth', 'label' => __('fullwidth', 'themify-story-posts'))
				)
			),
			*/
			array(
				'id' => 'type_query_story',
				'type' => 'radio',
				'label' => __('Query by', 'themify-story-posts'),
				'options' => array(
					'category' => __('Category', 'themify-story-posts'),
					'post_slug' => __('Slug', 'themify-story-posts')
				),
				'default' => 'category',
				'option_js' => true,
			),
			array(
				'id' => 'category_story',
				'type' => 'query_category',
				'label' => __('Category', 'themify-story-posts'),
				'options' => array(
					'taxonomy' => 'story-category'
				),
				'help' => sprintf(__('Add more <a href="%s" target="_blank">story posts</a>', 'themify-story-posts'), admin_url('post-new.php?post_type=story')),
				'wrap_with_class' => 'tf-group-element tf-group-element-category'
			),
			array(
				'id' => 'query_slug_story',
				'type' => 'text',
				'label' => __('Story Slugs', 'themify-story-posts'),
				'class' => 'large',
				'wrap_with_class' => 'tf-group-element tf-group-element-post_slug',
				'help' => '<br/>' . __( 'Insert Story slug. Multiple slug should be separated by comma (,)', 'themify-story-posts')
			),
			array(
				'id' => 'post_per_page_story',
				'type' => 'text',
				'label' => __('Limit', 'themify-story-posts'),
				'class' => 'xsmall',
				'help' => __('number of posts to show', 'themify-story-posts')
			),
			array(
				'id' => 'offset_story',
				'type' => 'text',
				'label' => __('Offset', 'themify-story-posts'),
				'class' => 'xsmall',
				'help' => __('number of post to displace or pass over', 'themify-story-posts')
			),
			array(
				'id' => 'order_story',
				'type' => 'select',
				'label' => __('Order', 'themify-story-posts'),
				'help' => __('Descending = show newer posts first', 'themify-story-posts'),
				'options' => array(
					'desc' => __('Descending', 'themify-story-posts'),
					'asc' => __('Ascending', 'themify-story-posts')
				)
			),
			array(
				'id' => 'orderby_story',
				'type' => 'select',
				'label' => __('Order By', 'themify-story-posts'),
				'options' => array(
					'date' => __('Date', 'themify-story-posts'),
					'id' => __('Id', 'themify-story-posts'),
					'author' => __('Author', 'themify-story-posts'),
					'title' => __('Title', 'themify-story-posts'),
					'name' => __('Name', 'themify-story-posts'),
					'modified' => __('Modified', 'themify-story-posts'),
					'rand' => __('Random', 'themify-story-posts'),
					'comment_count' => __('Comment Count', 'themify-story-posts')
				)
			),
			array(
				'id' => 'display_story',
				'type' => 'select',
				'label' => __('Display', 'themify-story-posts'),
				'options' => array(
					'content' => __('Content', 'themify-story-posts'),
					'excerpt' => __('Excerpt', 'themify-story-posts'),
					'none' => __('None', 'themify-story-posts')
				)
			),
			array(
				'id' => 'hide_feat_img_story',
				'type' => 'select',
				'label' => __('Hide Featured Image', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'image_size_story',
				'type' => 'select',
				'label' => Themify_Builder_Model::is_img_php_disabled() ? __('Image Size', 'themify-story-posts') : false,
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'hide' => Themify_Builder_Model::is_img_php_disabled() ? false : true,
				'options' => $image_sizes
			),
			array(
				'id' => 'img_width_story',
				'type' => 'text',
				'label' => __('Image Width', 'themify-story-posts'),
				'class' => 'xsmall'
			),
			array(
				'id' => 'img_height_story',
				'type' => 'text',
				'label' => __('Image Height', 'themify-story-posts'),
				'class' => 'xsmall'
			),
			array(
				'id' => 'unlink_feat_img_story',
				'type' => 'select',
				'label' => __('Unlink Featured Image', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'hide_post_title_story',
				'type' => 'select',
				'label' => __('Hide Post Title', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'unlink_post_title_story',
				'type' => 'select',
				'label' => __('Unlink Post Title', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'hide_post_date_story',
				'type' => 'select',
				'label' => __('Hide Post Date', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'hide_post_meta_story',
				'type' => 'select',
				'label' => __('Hide Post Meta', 'themify-story-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			array(
				'id' => 'hide_page_nav_story',
				'type' => 'select',
				'label' => __('Hide Page Navigation', 'themify-story-posts'),
				'options' => array(
					'yes' => __('Yes', 'themify-story-posts'),
					'no' => __('No', 'themify-story-posts')
				)
			),
			// Additional CSS
			array(
				'type' => 'separator',
				'meta' => array( 'html' => '<hr/>')
			),
			array(
				'id' => 'css_story',
				'type' => 'text',
				'label' => __('Additional CSS Class', 'themify-story-posts'),
				'class' => 'large exclude-from-reset-field',
				'help' => sprintf( '<br/><small>%s</small>', __('Add additional CSS class(es) for custom styling', 'themify-story-posts') )
			)
		);
		return $options;
	}

	public function get_animation() {
		$animation = array(
			array(
				'type' => 'separator',
				'meta' => array( 'html' => '<h4>' . esc_html__( 'Appearance Animation', 'themify-story-posts' ) . '</h4>')
			),
			array(
				'id' => 'multi_Animation Effect',
				'type' => 'multi',
				'label' => __('Effect', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'animation_effect',
						'type' => 'animation_select',
						'label' => __( 'Effect', 'themify-story-posts' )
					),
					array(
						'id' => 'animation_effect_delay',
						'type' => 'text',
						'label' => __( 'Delay', 'themify-story-posts' ),
						'class' => 'xsmall',
						'description' => __( 'Delay (s)', 'themify-story-posts' ),
					),
					array(
						'id' => 'animation_effect_repeat',
						'type' => 'text',
						'label' => __( 'Repeat', 'themify-story-posts' ),
						'class' => 'xsmall',
						'description' => __( 'Repeat (x)', 'themify-story-posts' ),
					),
				)
			)
		);

		return $animation;
	}

	public function get_styling() {
		$general = array(
			// Background
			array(
				'id' => 'separator_image_background',
				'title' => '',
				'description' => '',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Background', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'background_color',
				'type' => 'color',
				'label' => __('Background Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'background-color',
				'selector' => array( '.module-story .post' )
			),
			// Font
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'font_family',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-story-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-story .post-title', '.module-story .post-title a' ),
			),
			array(
				'id' => 'font_color',
				'type' => 'color',
				'label' => __('Font Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-story .post', '.module-story h1', '.module-story h2', '.module-story h3:not(.module-title)', '.module-story h4', '.module-story h5', '.module-story h6', '.module-story .post-title', '.module-story .post-title a' ),
			),
			array(
				'id' => 'multi_font_size',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'font_size',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-story .post'
					),
					array(
						'id' => 'font_size_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'line_height',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-story .post'
					),
					array(
						'id' => 'line_height_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'text_align',
				'label' => __( 'Text Align', 'themify-story-posts' ),
				'type' => 'radio',
				'meta' => array(
					array( 'value' => '', 'name' => __( 'Default', 'themify-story-posts' ), 'selected' => true ),
					array( 'value' => 'left', 'name' => __( 'Left', 'themify-story-posts' ) ),
					array( 'value' => 'center', 'name' => __( 'Center', 'themify-story-posts' ) ),
					array( 'value' => 'right', 'name' => __( 'Right', 'themify-story-posts' ) ),
					array( 'value' => 'justify', 'name' => __( 'Justify', 'themify-story-posts' ) )
				),
				'prop' => 'text-align',
				'selector' => '.module-story .post',
			),
			// Link
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_link',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Link', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'link_color',
				'type' => 'color',
				'label' => __('Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-story a'
			),
			array(
				'id' => 'link_color_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-story a:hover'
			),
			array(
				'id' => 'text_decoration',
				'type' => 'select',
				'label' => __( 'Text Decoration', 'themify-story-posts' ),
				'meta'	=> array(
					array('value' => '',   'name' => '', 'selected' => true),
					array('value' => 'underline',   'name' => __('Underline', 'themify-story-posts')),
					array('value' => 'overline', 'name' => __('Overline', 'themify-story-posts')),
					array('value' => 'line-through',  'name' => __('Line through', 'themify-story-posts')),
					array('value' => 'none',  'name' => __('None', 'themify-story-posts'))
				),
				'prop' => 'text-decoration',
				'selector' => '.module-story a'
			),
			// Padding
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_padding',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Padding', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'multi_padding_top',
				'type' => 'multi',
				'label' => __('Padding', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'padding_top',
						'type' => 'text',
						'class' => 'style_padding style_field xsmall',
						'prop' => 'padding-top',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'padding_top_unit',
						'type' => 'select',
						'description' => __('top', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_padding_right',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'padding_right',
						'type' => 'text',
						'class' => 'style_padding style_field xsmall',
						'prop' => 'padding-right',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'padding_right_unit',
						'type' => 'select',
						'description' => __('right', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_padding_bottom',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'padding_bottom',
						'type' => 'text',
						'class' => 'style_padding style_field xsmall',
						'prop' => 'padding-bottom',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'padding_bottom_unit',
						'type' => 'select',
						'description' => __('bottom', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_padding_left',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'padding_left',
						'type' => 'text',
						'class' => 'style_padding style_field xsmall',
						'prop' => 'padding-left',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'padding_left_unit',
						'type' => 'select',
						'description' => __('left', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			// "Apply all" // apply all padding
			array(
				'id' => 'checkbox_padding_apply_all',
				'class' => 'style_apply_all style_apply_all_padding',
				'type' => 'checkbox',
				'label' => false,
				'options' => array(
					array( 'name' => 'padding', 'value' => __( 'Apply to all padding', 'themify-story-posts' ) )
				)
			),
			// Margin
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_margin',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Margin', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'multi_margin_top',
				'type' => 'multi',
				'label' => __('Margin', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'margin_top',
						'type' => 'text',
						'class' => 'style_margin style_field xsmall',
						'prop' => 'margin-top',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'margin_top_unit',
						'type' => 'select',
						'description' => __('top', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_margin_right',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'margin_right',
						'type' => 'text',
						'class' => 'style_margin style_field xsmall',
						'prop' => 'margin-right',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'margin_right_unit',
						'type' => 'select',
						'description' => __('right', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_margin_bottom',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'margin_bottom',
						'type' => 'text',
						'class' => 'style_margin style_field xsmall',
						'prop' => 'margin-bottom',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'margin_bottom_unit',
						'type' => 'select',
						'description' => __('bottom', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			array(
				'id' => 'multi_margin_left',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'margin_left',
						'type' => 'text',
						'class' => 'style_margin style_field xsmall',
						'prop' => 'margin-left',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'margin_left_unit',
						'type' => 'select',
						'description' => __('left', 'themify-story-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts'))
						)
					),
				)
			),
			// "Apply all" // apply all margin
			array(
				'id' => 'checkbox_margin_apply_all',
				'class' => 'style_apply_all style_apply_all_margin',
				'type' => 'checkbox',
				'label' => false,
				'options' => array(
					array( 'name' => 'margin', 'value' => __( 'Apply to all margin', 'themify-story-posts' ) )
				)
			),
			// Border
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_border',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Border', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'multi_border_top',
				'type' => 'multi',
				'label' => __('Border', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'border_top_color',
						'type' => 'color',
						'class' => 'small',
						'prop' => 'border-top-color',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_top_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-top-width',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_top_style',
						'type' => 'select',
						'description' => __('top', 'themify-story-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-top-style',
						'selector' => '.module-story .post',
					),
				)
			),
			array(
				'id' => 'multi_border_right',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'border_right_color',
						'type' => 'color',
						'class' => 'small',
						'prop' => 'border-right-color',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_right_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-right-width',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_right_style',
						'type' => 'select',
						'description' => __('right', 'themify-story-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-right-style',
						'selector' => '.module-story .post',
					)
				)
			),
			array(
				'id' => 'multi_border_bottom',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'border_bottom_color',
						'type' => 'color',
						'class' => 'small',
						'prop' => 'border-bottom-color',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_bottom_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-bottom-width',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_bottom_style',
						'type' => 'select',
						'description' => __('bottom', 'themify-story-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-bottom-style',
						'selector' => '.module-story .post',
					)
				)
			),
			array(
				'id' => 'multi_border_left',
				'type' => 'multi',
				'label' => '',
				'fields' => array(
					array(
						'id' => 'border_left_color',
						'type' => 'color',
						'class' => 'small',
						'prop' => 'border-left-color',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_left_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-left-width',
						'selector' => '.module-story .post',
					),
					array(
						'id' => 'border_left_style',
						'type' => 'select',
						'description' => __('left', 'themify-story-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-left-style',
						'selector' => '.module-story .post',
					)
				)
			),
			// "Apply all" // apply all border
			array(
				'id' => 'checkbox_border_apply_all',
				'class' => 'style_apply_all style_apply_all_border',
				'type' => 'checkbox',
				'label' => false,
                                'default'=>'border',
				'options' => array(
					array( 'name' => 'border', 'value' => __( 'Apply to all border', 'themify-story-posts' ) )
				)
			)
		);

		$story_title = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_title',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-story-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-story .post-title', '.module-story .post-title a' )
			),
			array(
				'id' => 'font_color_title',
				'type' => 'color',
				'label' => __('Font Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-story .post-title', '.module-story .post-title a' )
			),
			array(
				'id' => 'font_color_title_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-story .post-title:hover', '.module-story .post-title a:hover' )
			),
			array(
				'id' => 'multi_font_size_title',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_title',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-story .post-title'
					),
					array(
						'id' => 'font_size_title_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_title',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_title',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-story .post-title'
					),
					array(
						'id' => 'line_height_title_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
		);

		$story_meta = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_meta',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-story-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-story .post-content .post-meta', '.module-story .post-content .post-meta a' )
			),
			array(
				'id' => 'font_color_meta',
				'type' => 'color',
				'label' => __('Font Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-story .post-content .post-meta', '.module-story .post-content .post-meta a' )
			),
			array(
				'id' => 'multi_font_size_meta',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_meta',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-story .post-content .post-meta'
					),
					array(
						'id' => 'font_size_meta_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_meta',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_meta',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-story .post-content .post-meta'
					),
					array(
						'id' => 'line_height_meta_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
		);

		$story_date = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_date',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-story-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array('.module-story .post .post-date', '.module-story .post .post-date a')
			),
			array(
				'id' => 'font_color_date',
				'type' => 'color',
				'label' => __('Font Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array('.module-story .post .post-date', '.module-story .post .post-date a')
			),
			array(
				'id' => 'font_color_date_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array('.module-story .post .post-date:hover', '.module-story .post .post-date a:hover')
			),
			array(
				'id' => 'multi_font_size_date',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_date',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-story .post .post-date'
					),
					array(
						'id' => 'font_size_date_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_date',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_date',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-story .post .post-date'
					),
					array(
						'id' => 'line_height_date_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
		);

		$story_content = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-story-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_content',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-story-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => '.module-story .post-content .entry-content'
			),
			array(
				'id' => 'font_color_content',
				'type' => 'color',
				'label' => __('Font Color', 'themify-story-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-story .post-content .entry-content'
			),
			array(
				'id' => 'multi_font_size_content',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_content',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-story .post-content .entry-content'
					),
					array(
						'id' => 'font_size_content_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_content',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-story-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_content',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-story .post-content .entry-content'
					),
					array(
						'id' => 'line_height_content_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-story-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-story-posts')),
							array('value' => '%', 'name' => __('%', 'themify-story-posts')),
						)
					)
				)
			),
		);

		return array(
			array(
				'type' => 'tabs',
				'id' => 'module-styling',
				'tabs' => array(
					'general' => array(
		        	'label' => __('General', 'themify-story-posts'),
					'fields' => $general
					),
					'title' => array(
						'label' => __('Story Title', 'themify-story-posts'),
						'fields' => $story_title
					),
					'meta' => array(
						'label' => __('Story Meta', 'themify-story-posts'),
						'fields' => $story_meta
					),
					'date' => array(
						'label' => __('Story Date', 'themify-story-posts'),
						'fields' => $story_date
					),
					'content' => array(
						'label' => __('Story Content', 'themify-story-posts'),
						'fields' => $story_content
					),
				)
			),
		);

	}

	function set_metabox() {
		/** Story Meta Box Options */
		$meta_box = array(
			// Feature Image
			Themify_Builder_Model::$post_image,
			// Featured Image Size
			Themify_Builder_Model::$featured_image_size,
			// Image Width
			Themify_Builder_Model::$image_width,
			// Image Height
			Themify_Builder_Model::$image_height,
			// Hide Title
			array(
				"name" 		=> "hide_post_title",
				"title"		=> __('Hide Post Title', 'themify-story-posts'),
				"description"	=> "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// Unlink Post Title
			array(
				"name" 		=> "unlink_post_title",
				"title" 		=> __('Unlink Post Title', 'themify-story-posts'),
				"description" => __('Unlink post title (it will display the post title without link)', 'themify-story-posts'),
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// Hide Post Date
			array(
				"name" 		=> "hide_post_date",
				"title"		=> __('Hide Post Date', 'themify-story-posts'),
				"description"	=> "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// Hide Post Meta
			array(
				"name" 		=> "hide_post_meta",
				"title"		=> __('Hide Post Meta', 'themify-story-posts'),
				"description"	=> "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// Hide Post Image
			array(
				"name" 		=> "hide_post_image",
				"title" 		=> __('Hide Featured Image', 'themify-story-posts'),
				"description" => "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// Unlink Post Image
			array(
				"name" 		=> "unlink_post_image",
				"title" 		=> __('Unlink Featured Image', 'themify-story-posts'),
				"description" => __('Display the Featured Image without link', 'themify-story-posts'),
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-story-posts')),
					array("value" => "no",	'name' => __('No', 'themify-story-posts'))
				)
			),
			// External Link
			Themify_Builder_Model::$external_link,
			// Lightbox Link
			Themify_Builder_Model::$lightbox_link
		);
		return $meta_box;
	}

	function do_shortcode( $atts ) {
		global $ThemifyBuilder;

		extract( shortcode_atts( array(
			'id' => '',
			'title' => 'yes',
			'unlink_title' => 'no',
			'image' => 'yes', // no
			'image_w' => '',
			'image_h' => '',
			'display' => 'none', // excerpt, content
			'post_meta' => 'yes', // yes
			'post_date' => 'yes', // yes
			'more_link' => false, // true goes to post type archive, and admits custom link
			'more_text' => __('More &rarr;', 'themify-story-posts'),
			'limit' => 4,
			'category' => 0, // integer category ID
			'order' => 'DESC', // ASC
			'orderby' => 'date', // title, rand
			'style' => '', // grid3, grid2
			'sorting' => 'no', // yes
			'page_nav' => 'no', // yes
			'paged' => '0', // internal use for pagination, dev: previously was 1
			// slider parameters
			'autoplay' => '',
			'effect' => '',
			'timeout' => '',
			'speed' => ''
		), $atts ) );

		$sync = array(
			'mod_title_story' => '',
			'mod_subtitle_story' => '',
			'layout_story' => $style,
			'category_story' => $category,
			'post_per_page_story' => $limit,
			'offset_story' => '',
			'order_story' => $order,
			'orderby_story' => $orderby,
			'display_story' => $display,
			'hide_feat_img_story' => $image == 'yes' ? 'no' : 'yes',
			'image_size_story' => '',
			'img_width_story' => $image_w,
			'img_height_story' => $image_h,
			'unlink_feat_img_story' => 'no',
			'hide_post_title_story' => $title == 'yes' ? 'no' : 'yes',
			'unlink_post_title_story' => $unlink_title,
			'hide_post_date_story' => $post_date == 'yes' ? 'no' : 'yes',
			'hide_post_meta_story' => $post_meta == 'yes' ? 'no' : 'yes',
			'hide_page_nav_story' => $page_nav == 'no' ? 'yes' : 'no',
			'animation_effect' => '',
			'css_story' => ''
		);
		$module = array(
			'module_ID' => $this->slug . '-' . rand(0,10000),
			'mod_name' => $this->slug,
			'mod_settings' => $sync
		);

		return $ThemifyBuilder->retrieve_template( 'template-' . $this->slug . '.php', $module, '', '', false );
	}
}

///////////////////////////////////////
// Module Options
///////////////////////////////////////

Themify_Builder_Model::register_module( 'TB_Story_Module' );

