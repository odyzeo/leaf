<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly
/**
 * Module Name: Layout Part
 * Description: Layout Part Module
 */

class TB_Layout_Part_Module extends Themify_Builder_Component_Module {

    function __construct() {
        parent::__construct(array(
            'name' => __('Layout Part', 'themify'),
            'slug' => 'layout-part'
        ));

        add_action('themify_builder_lightbox_fields', array($this, 'add_fields'), 10, 2);
    }

    public function get_options() {
        return array(
            array(
                'id' => 'mod_title_layout_part',
                'type' => 'text',
                'label' => __('Module Title', 'themify'),
                'class' => 'large'
            ),
            array(
                'id' => 'selected_layout_part',
                'type' => 'layout_part_select',
                'label' => __('Select Layout Part', 'themify'),
                'class' => ''
            ),
            // Additional CSS
            array(
                'type' => 'separator',
                'meta' => array('html' => '<hr/>')
            ),
            array(
                'id' => 'add_css_layout_part',
                'type' => 'text',
                'label' => __('Additional CSS Class', 'themify'),
                'help' => sprintf('<br/><small>%s</small>', __('Add additional CSS class(es) for custom styling', 'themify')),
                'class' => 'large exclude-from-reset-field'
            )
        );
    }

    public function get_styling() {
        return array(
            array(
                'type' => 'tabs',
                'id' => 'module-styling',
                'tabs' => array(
                    'module-title' => array(
                        'label' => __('Module Title', 'themify'),
                        'fields' => self::module_title_custom_style($this->slug)
                    )
                )
            ),
        );
    }
    
    public function get_visual_type() {
        return 'ajax';            
    }
    
    function add_fields($field, $mod_name) {
        if ($mod_name !== 'layout-part' || $field['type'] !== 'layout_part_select') {
            return;
        }
        global $Themify_Builder_Layouts;
        $output = '<div class="selectwrapper"><select name="' . esc_attr($field['id']) . '" id="' . esc_attr($field['id']) . '" class="tb_lb_option"' . themify_builder_get_control_binding_data($field) . '>';
        $output .= '<option></option>';
        $args = array(
            'post_type' => $Themify_Builder_Layouts->layout_part->post_type_name,
            'posts_per_page' => -1
        );
        $posts = get_posts($args);
        foreach ($posts as $part) {
            $output .= '<option value="' . esc_attr($part->post_name) . '">' . esc_html($part->post_title) . '</option>';
        }
        $output .= '</select></div><br/>';
        $output .= sprintf('<a href="%s" target="_blank" class="add_new"><span class="themify_builder_icon add"></span> %s</a>', esc_url(add_query_arg('post_type', $Themify_Builder_Layouts->layout_part->post_type_name, admin_url('post-new.php'))), __('New Layout Part', 'themify')
        );
        $output .= sprintf('<a href="%s" target="_blank" class="add_new"><span class="themify_builder_icon ti-folder"></span> %s</a>', esc_url(add_query_arg('post_type', $Themify_Builder_Layouts->layout_part->post_type_name, admin_url('edit.php'))), __('Manage Layout Part', 'themify')
        );
        echo $output;
    }

    public function get_animation() {
        return array();
    }

}

///////////////////////////////////////
// Module Options
///////////////////////////////////////
Themify_Builder_Model::register_module('TB_Layout_Part_Module');
