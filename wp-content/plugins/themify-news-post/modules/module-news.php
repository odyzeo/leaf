<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Module Name: News
 * Description: Display news custom post type
 */
class TB_News_Module extends Themify_Builder_Module {
	var $cpt_options = array(
		'show_in_nav_menus' => true
	);
	var $tax_options = array(
		'show_in_nav_menus' => true
	);

	function __construct() {
		parent::__construct(array(
			'name' => __('News', 'themify-news-posts'),
			'slug' => 'news'
		));

		///////////////////////////////////////
		// Load Post Type
		///////////////////////////////////////
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

		if( ! is_plugin_active( 'themify-news-post/themify-news-post.php' ) ) {
			$this->meta_box = $this->set_metabox();
			$this->initialize_cpt( array(
				'plural' => __('Newss', 'themify-news-posts'),
				'singular' => __('News', 'themify-news-posts'),
				'rewrite' => apply_filters('themify_news_rewrite', 'news'),
				'menu_icon' => 'dashicons-news'
			));

			if ( ! shortcode_exists( 'themify_news_posts' ) ) {
				add_shortcode( 'themify_news_posts', array( $this, 'do_shortcode' ) );
			}
		}
	}

	public function get_title( $module ) {
		$type = isset( $module['mod_settings']['type_query_news'] ) ? $module['mod_settings']['type_query_news'] : 'category';
		$category = isset( $module['mod_settings']['category_news'] ) ? $module['mod_settings']['category_news'] : '';
		$slug_query = isset( $module['mod_settings']['query_slug_news'] ) ? $module['mod_settings']['query_slug_news'] : '';

		if ( 'category' == $type ) {
			return sprintf( '%s : %s', __('Category', 'themify-news-posts'), $category );
		} else {
			return sprintf( '%s : %s', __('Slugs', 'themify-news-posts'), $slug_query );
		}
	}

	public function get_options() {
		$image_sizes = themify_get_image_sizes_list( false );
		$options = array(
			array(
				'id' => 'mod_title_news',
				'type' => 'text',
				'label' => __('Module Title', 'themify-news-posts'),
				'class' => 'large'
			),
			/*
			array(
				'id' => 'layout_news',
				'type' => 'layout',
				'label' => __('News Layout', 'themify-news-posts'),
				'options' => array(
					array('img' => 'grid4.png', 'value' => 'grid4', 'label' => __('Grid 4', 'themify-news-posts')),
					array('img' => 'grid3.png', 'value' => 'grid3', 'label' => __('Grid 3', 'themify-news-posts')),
					array('img' => 'grid2.png', 'value' => 'grid2', 'label' => __('Grid 2', 'themify-news-posts')),
					array('img' => 'fullwidth.png', 'value' => 'fullwidth', 'label' => __('fullwidth', 'themify-news-posts'))
				)
			),
			array(
				'id' => 'type_query_news',
				'type' => 'radio',
				'label' => __('Query by', 'themify-news-posts'),
				'options' => array(
					'category' => __('Category', 'themify-news-posts'),
					'post_slug' => __('Slug', 'themify-news-posts')
				),
				'default' => 'category',
				'option_js' => true,
			),
			*/
			array(
				'id' => 'category_news',
				'type' => 'query_category',
				'label' => __('Category', 'themify-news-posts'),
				'options' => array(
					'taxonomy' => 'news-category'
				),
				'help' => sprintf(__('Add more <a href="%s" target="_blank">news posts</a>', 'themify-news-posts'), admin_url('post-new.php?post_type=news')),
				'wrap_with_class' => 'tf-group-element tf-group-element-category'
			),
			/*
      array(
				'id' => 'query_slug_news',
				'type' => 'text',
				'label' => __('News Slugs', 'themify-news-posts'),
				'class' => 'large',
				'wrap_with_class' => 'tf-group-element tf-group-element-post_slug',
				'help' => '<br/>' . __( 'Insert News slug. Multiple slug should be separated by comma (,)', 'themify-news-posts')
			),
      */
			array(
				'id' => 'post_per_page_news',
				'type' => 'text',
				'label' => __('Limit', 'themify-news-posts'),
				'class' => 'xsmall',
				'help' => __('number of posts to show', 'themify-news-posts')
			),
			array(
				'id' => 'offset_news',
				'type' => 'text',
				'label' => __('Offset', 'themify-news-posts'),
				'class' => 'xsmall',
				'help' => __('number of post to displace or pass over', 'themify-news-posts')
			),
			array(
				'id' => 'order_news',
				'type' => 'select',
				'label' => __('Order', 'themify-news-posts'),
				'help' => __('Descending = show newer posts first', 'themify-news-posts'),
				'options' => array(
					'desc' => __('Descending', 'themify-news-posts'),
					'asc' => __('Ascending', 'themify-news-posts')
				)
			),
			array(
				'id' => 'orderby_news',
				'type' => 'select',
				'label' => __('Order By', 'themify-news-posts'),
				'options' => array(
					'date' => __('Date', 'themify-news-posts'),
					'id' => __('Id', 'themify-news-posts'),
					'author' => __('Author', 'themify-news-posts'),
					'title' => __('Title', 'themify-news-posts'),
					'name' => __('Name', 'themify-news-posts'),
					'modified' => __('Modified', 'themify-news-posts'),
					'rand' => __('Random', 'themify-news-posts'),
					'comment_count' => __('Comment Count', 'themify-news-posts')
				)
			),
      /*
			array(
				'id' => 'display_news',
				'type' => 'select',
				'label' => __('Display', 'themify-news-posts'),
				'options' => array(
					'content' => __('Content', 'themify-news-posts'),
					'excerpt' => __('Excerpt', 'themify-news-posts'),
					'none' => __('None', 'themify-news-posts')
				)
			),
			array(
				'id' => 'hide_feat_img_news',
				'type' => 'select',
				'label' => __('Hide Featured Image', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			/*
      array(
				'id' => 'image_size_news',
				'type' => 'select',
				'label' => Themify_Builder_Model::is_img_php_disabled() ? __('Image Size', 'themify-news-posts') : false,
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'hide' => Themify_Builder_Model::is_img_php_disabled() ? false : true,
				'options' => $image_sizes
			),
			array(
				'id' => 'img_width_news',
				'type' => 'text',
				'label' => __('Image Width', 'themify-news-posts'),
				'class' => 'xsmall'
			),
			array(
				'id' => 'img_height_news',
				'type' => 'text',
				'label' => __('Image Height', 'themify-news-posts'),
				'class' => 'xsmall'
			),
      */
      /*
			array(
				'id' => 'unlink_feat_img_news',
				'type' => 'select',
				'label' => __('Unlink Featured Image', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			array(
				'id' => 'hide_post_title_news',
				'type' => 'select',
				'label' => __('Hide Post Title', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			array(
				'id' => 'unlink_post_title_news',
				'type' => 'select',
				'label' => __('Unlink Post Title', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			array(
				'id' => 'hide_post_date_news',
				'type' => 'select',
				'label' => __('Hide Post Date', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			array(
				'id' => 'hide_post_meta_news',
				'type' => 'select',
				'label' => __('Hide Post Meta', 'themify-news-posts'),
				'empty' => array(
					'val' => '',
					'label' => ''
				),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
			array(
				'id' => 'hide_page_nav_news',
				'type' => 'select',
				'label' => __('Hide Page Navigation', 'themify-news-posts'),
				'options' => array(
					'yes' => __('Yes', 'themify-news-posts'),
					'no' => __('No', 'themify-news-posts')
				)
			),
      */
			// Additional CSS
			array(
				'type' => 'separator',
				'meta' => array( 'html' => '<hr/>')
			),
			array(
				'id' => 'css_news',
				'type' => 'text',
				'label' => __('Additional CSS Class', 'themify-news-posts'),
				'class' => 'large exclude-from-reset-field',
				'help' => sprintf( '<br/><small>%s</small>', __('Add additional CSS class(es) for custom styling', 'themify-news-posts') )
			)
		);
		return $options;
	}

	public function get_animation() {
		$animation = array(
			array(
				'type' => 'separator',
				'meta' => array( 'html' => '<h4>' . esc_html__( 'Appearance Animation', 'themify-news-posts' ) . '</h4>')
			),
			array(
				'id' => 'multi_Animation Effect',
				'type' => 'multi',
				'label' => __('Effect', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'animation_effect',
						'type' => 'animation_select',
						'label' => __( 'Effect', 'themify-news-posts' )
					),
					array(
						'id' => 'animation_effect_delay',
						'type' => 'text',
						'label' => __( 'Delay', 'themify-news-posts' ),
						'class' => 'xsmall',
						'description' => __( 'Delay (s)', 'themify-news-posts' ),
					),
					array(
						'id' => 'animation_effect_repeat',
						'type' => 'text',
						'label' => __( 'Repeat', 'themify-news-posts' ),
						'class' => 'xsmall',
						'description' => __( 'Repeat (x)', 'themify-news-posts' ),
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
				'meta' => array('html'=>'<h4>'.__('Background', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'background_color',
				'type' => 'color',
				'label' => __('Background Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'background-color',
				'selector' => array( '.module-news .post' )
			),
			// Font
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'font_family',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-news-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-news .post-title', '.module-news .post-title a' ),
			),
			array(
				'id' => 'font_color',
				'type' => 'color',
				'label' => __('Font Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-news .post', '.module-news h1', '.module-news h2', '.module-news h3:not(.module-title)', '.module-news h4', '.module-news h5', '.module-news h6', '.module-news .post-title', '.module-news .post-title a' ),
			),
			array(
				'id' => 'multi_font_size',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'font_size',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-news .post'
					),
					array(
						'id' => 'font_size_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'line_height',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-news .post'
					),
					array(
						'id' => 'line_height_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'text_align',
				'label' => __( 'Text Align', 'themify-news-posts' ),
				'type' => 'radio',
				'meta' => array(
					array( 'value' => '', 'name' => __( 'Default', 'themify-news-posts' ), 'selected' => true ),
					array( 'value' => 'left', 'name' => __( 'Left', 'themify-news-posts' ) ),
					array( 'value' => 'center', 'name' => __( 'Center', 'themify-news-posts' ) ),
					array( 'value' => 'right', 'name' => __( 'Right', 'themify-news-posts' ) ),
					array( 'value' => 'justify', 'name' => __( 'Justify', 'themify-news-posts' ) )
				),
				'prop' => 'text-align',
				'selector' => '.module-news .post',
			),
			// Link
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_link',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Link', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'link_color',
				'type' => 'color',
				'label' => __('Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-news a'
			),
			array(
				'id' => 'link_color_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-news a:hover'
			),
			array(
				'id' => 'text_decoration',
				'type' => 'select',
				'label' => __( 'Text Decoration', 'themify-news-posts' ),
				'meta'	=> array(
					array('value' => '',   'name' => '', 'selected' => true),
					array('value' => 'underline',   'name' => __('Underline', 'themify-news-posts')),
					array('value' => 'overline', 'name' => __('Overline', 'themify-news-posts')),
					array('value' => 'line-through',  'name' => __('Line through', 'themify-news-posts')),
					array('value' => 'none',  'name' => __('None', 'themify-news-posts'))
				),
				'prop' => 'text-decoration',
				'selector' => '.module-news a'
			),
			// Padding
			array(
				'type' => 'separator',
				'meta' => array('html'=>'<hr />')
			),
			array(
				'id' => 'separator_padding',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Padding', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'multi_padding_top',
				'type' => 'multi',
				'label' => __('Padding', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'padding_top',
						'type' => 'text',
						'class' => 'style_padding style_field xsmall',
						'prop' => 'padding-top',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'padding_top_unit',
						'type' => 'select',
						'description' => __('top', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'padding_right_unit',
						'type' => 'select',
						'description' => __('right', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'padding_bottom_unit',
						'type' => 'select',
						'description' => __('bottom', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'padding_left_unit',
						'type' => 'select',
						'description' => __('left', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
					array( 'name' => 'padding', 'value' => __( 'Apply to all padding', 'themify-news-posts' ) )
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
				'meta' => array('html'=>'<h4>'.__('Margin', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'multi_margin_top',
				'type' => 'multi',
				'label' => __('Margin', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'margin_top',
						'type' => 'text',
						'class' => 'style_margin style_field xsmall',
						'prop' => 'margin-top',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'margin_top_unit',
						'type' => 'select',
						'description' => __('top', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'margin_right_unit',
						'type' => 'select',
						'description' => __('right', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'margin_bottom_unit',
						'type' => 'select',
						'description' => __('bottom', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'margin_left_unit',
						'type' => 'select',
						'description' => __('left', 'themify-news-posts'),
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
                                                        array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts'))
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
					array( 'name' => 'margin', 'value' => __( 'Apply to all margin', 'themify-news-posts' ) )
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
				'meta' => array('html'=>'<h4>'.__('Border', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'multi_border_top',
				'type' => 'multi',
				'label' => __('Border', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'border_top_color',
						'type' => 'color',
						'class' => 'small',
						'prop' => 'border-top-color',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_top_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-top-width',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_top_style',
						'type' => 'select',
						'description' => __('top', 'themify-news-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-top-style',
						'selector' => '.module-news .post',
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_right_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-right-width',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_right_style',
						'type' => 'select',
						'description' => __('right', 'themify-news-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-right-style',
						'selector' => '.module-news .post',
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_bottom_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-bottom-width',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_bottom_style',
						'type' => 'select',
						'description' => __('bottom', 'themify-news-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-bottom-style',
						'selector' => '.module-news .post',
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
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_left_width',
						'type' => 'text',
						'description' => 'px',
						'class' => 'style_border style_field xsmall',
						'prop' => 'border-left-width',
						'selector' => '.module-news .post',
					),
					array(
						'id' => 'border_left_style',
						'type' => 'select',
						'description' => __('left', 'themify-news-posts'),
						'meta' => Themify_Builder_model::get_border_styles(),
						'prop' => 'border-left-style',
						'selector' => '.module-news .post',
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
					array( 'name' => 'border', 'value' => __( 'Apply to all border', 'themify-news-posts' ) )
				)
			)
		);

		$news_title = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_title',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-news-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-news .post-title', '.module-news .post-title a' )
			),
			array(
				'id' => 'font_color_title',
				'type' => 'color',
				'label' => __('Font Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-news .post-title', '.module-news .post-title a' )
			),
			array(
				'id' => 'font_color_title_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-news .post-title:hover', '.module-news .post-title a:hover' )
			),
			array(
				'id' => 'multi_font_size_title',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_title',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-news .post-title'
					),
					array(
						'id' => 'font_size_title_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_title',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_title',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-news .post-title'
					),
					array(
						'id' => 'line_height_title_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
		);

		$news_meta = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_meta',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-news-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array( '.module-news .post-content .post-meta', '.module-news .post-content .post-meta a' )
			),
			array(
				'id' => 'font_color_meta',
				'type' => 'color',
				'label' => __('Font Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array( '.module-news .post-content .post-meta', '.module-news .post-content .post-meta a' )
			),
			array(
				'id' => 'multi_font_size_meta',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_meta',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-news .post-content .post-meta'
					),
					array(
						'id' => 'font_size_meta_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_meta',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_meta',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-news .post-content .post-meta'
					),
					array(
						'id' => 'line_height_meta_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
		);

		$news_date = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_date',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-news-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => array('.module-news .post .post-date', '.module-news .post .post-date a')
			),
			array(
				'id' => 'font_color_date',
				'type' => 'color',
				'label' => __('Font Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array('.module-news .post .post-date', '.module-news .post .post-date a')
			),
			array(
				'id' => 'font_color_date_hover',
				'type' => 'color',
				'label' => __('Color Hover', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => array('.module-news .post .post-date:hover', '.module-news .post .post-date a:hover')
			),
			array(
				'id' => 'multi_font_size_date',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_date',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-news .post .post-date'
					),
					array(
						'id' => 'font_size_date_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_date',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_date',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-news .post .post-date'
					),
					array(
						'id' => 'line_height_date_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
		);

		$news_content = array(
			// Font
			array(
				'id' => 'separator_font',
				'type' => 'separator',
				'meta' => array('html'=>'<h4>'.__('Font', 'themify-news-posts').'</h4>'),
			),
			array(
				'id' => 'font_family_content',
				'type' => 'font_select',
				'label' => __('Font Family', 'themify-news-posts'),
				'class' => 'font-family-select',
				'prop' => 'font-family',
				'selector' => '.module-news .post-content .entry-content'
			),
			array(
				'id' => 'font_color_content',
				'type' => 'color',
				'label' => __('Font Color', 'themify-news-posts'),
				'class' => 'small',
				'prop' => 'color',
				'selector' => '.module-news .post-content .entry-content'
			),
			array(
				'id' => 'multi_font_size_content',
				'type' => 'multi',
				'label' => __('Font Size', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'font_size_content',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'font-size',
						'selector' => '.module-news .post-content .entry-content'
					),
					array(
						'id' => 'font_size_content_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
						)
					)
				)
			),
			array(
				'id' => 'multi_line_height_content',
				'type' => 'multi',
				'label' => __('Line Height', 'themify-news-posts'),
				'fields' => array(
					array(
						'id' => 'line_height_content',
						'type' => 'text',
						'class' => 'xsmall',
						'prop' => 'line-height',
						'selector' => '.module-news .post-content .entry-content'
					),
					array(
						'id' => 'line_height_content_unit',
						'type' => 'select',
						'meta' => array(
							array('value' => 'px', 'name' => __('px', 'themify-news-posts')),
							array('value' => 'em', 'name' => __('em', 'themify-news-posts')),
							array('value' => '%', 'name' => __('%', 'themify-news-posts')),
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
		        	'label' => __('General', 'themify-news-posts'),
					'fields' => $general
					),
					'title' => array(
						'label' => __('News Title', 'themify-news-posts'),
						'fields' => $news_title
					),
					'meta' => array(
						'label' => __('News Meta', 'themify-news-posts'),
						'fields' => $news_meta
					),
					'date' => array(
						'label' => __('News Date', 'themify-news-posts'),
						'fields' => $news_date
					),
					'content' => array(
						'label' => __('News Content', 'themify-news-posts'),
						'fields' => $news_content
					),
				)
			),
		);

	}

	function set_metabox() {
		/** News Meta Box Options */
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
				"title"		=> __('Hide Post Title', 'themify-news-posts'),
				"description"	=> "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-news-posts')),
					array("value" => "no",	'name' => __('No', 'themify-news-posts'))
				)
			),
			// Unlink Post Title
			array(
				"name" 		=> "unlink_post_title",
				"title" 		=> __('Unlink Post Title', 'themify-news-posts'),
				"description" => __('Unlink post title (it will display the post title without link)', 'themify-news-posts'),
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-news-posts')),
					array("value" => "no",	'name' => __('No', 'themify-news-posts'))
				)
			),
			// Hide Post Date
			array(
				"name" 		=> "hide_post_date",
				"title"		=> __('Hide Post Date', 'themify-news-posts'),
				"description"	=> "",
				"type" 		=> "dropdown",
				"meta"		=> array(
					array("value" => "default", "name" => "", "selected" => true),
					array("value" => "yes", 'name' => __('Yes', 'themify-news-posts')),
					array("value" => "no",	'name' => __('No', 'themify-news-posts'))
				)
			),
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
			'more_text' => __('More &rarr;', 'themify-news-posts'),
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
			'mod_title_news' => '',
			'layout_news' => $style,
			'category_news' => $category,
			'post_per_page_news' => $limit,
			'offset_news' => '',
			'order_news' => $order,
			'orderby_news' => $orderby,
			'display_news' => $display,
			'hide_feat_img_news' => $image == 'yes' ? 'no' : 'yes',
			'image_size_news' => '',
			'img_width_news' => $image_w,
			'img_height_news' => $image_h,
			'unlink_feat_img_news' => 'no',
			'hide_post_title_news' => $title == 'yes' ? 'no' : 'yes',
			'unlink_post_title_news' => $unlink_title,
			'hide_post_date_news' => $post_date == 'yes' ? 'no' : 'yes',
			'hide_post_meta_news' => $post_meta == 'yes' ? 'no' : 'yes',
			'hide_page_nav_news' => $page_nav == 'no' ? 'yes' : 'no',
			'animation_effect' => '',
			'css_news' => ''
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

Themify_Builder_Model::register_module( 'TB_News_Module' );

