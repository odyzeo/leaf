<?php

/**
 * The Builder Visibility Controls class.
 * This is used to show the visibility controls on all rows and modules.
 *
 * @package	Themify_Builder
 * @subpackage Themify_Builder/classes
 */
class Themify_Builder_Visibility_Controls {

    /**
     * Constructor.
     * 
     * @param object Themify_Builder $builder 
     */
    public function __construct() {
        add_filter('themify_builder_module_lightbox_form_settings', array($this, 'register_module_visibility_controls'), 9, 2);
        add_filter('themify_builder_row_lightbox_form_settings', array($this, 'register_row_visibility_controls'), 9, 1);
        if (Themify_Builder_Model::is_premium()) {
            add_filter('themify_builder_row_classes', array($this, 'row_classes'), 10, 3);
            add_filter('themify_builder_module_classes', array($this, 'module_classes'), 10, 4);
        }
    }

    /**
     * Register visibility tab control on module settings.
     * 
     * @param array $settings 
     * @param array $module 
     * @return array
     */
    public function register_module_visibility_controls($settings, $module) {
        $settings['visibility'] = array(
            'name' => esc_html__('Visibility', 'themify'),
            'options' => apply_filters('themify_builder_visibility_settings_fields', $this->get_visibility_controls(), $module)
        );
        return $settings;
    }

    /**
     * Register visibility tab control on row settings.
     * 
     * @param array $settings 
     * @return array
     */
    public function register_row_visibility_controls($settings) {
        $settings['visibility'] = array(
            'name' => esc_html__('Visibility', 'themify'),
            'options' => apply_filters('themify_builder_row_fields_visibility', $this->get_visibility_controls())
        );
        return $settings;
    }

    /**
     * Append visibility controls to row/modules.
     * 
     * @access 	public
     * @return 	array
     */
    private function get_visibility_controls() {
        $disable = Themify_Builder_Model::is_premium();
        $visibility_controls = array(
            array(
                'id' => 'separator_visibility',
                'title' => '',
                'description' => '',
                'type' => 'separator',
                'meta' => array('html' => '<h4>' . __('Visibility', 'themify') . '</h4>'),
            ),
            array(
                'id' => 'visibility_desktop',
                'label' => __('Desktop', 'themify'),
                'type' => 'radio',
                'meta' => array(
                    array('value' => 'show', 'name' => __('Show', 'themify'), 'selected' => true),
                    array('value' => 'hide', 'name' => __('Hide', 'themify'), 'disable' => !$disable),
                ),
                'wrap_with_class' => 'themify_module_visibility_control ' . (!$disable ? 'themify_builder_lite' : '')
            ),
            array(
                'id' => 'visibility_tablet',
                'label' => __('Tablet', 'themify'),
                'type' => 'radio',
                'meta' => array(
                    array('value' => 'show', 'name' => __('Show', 'themify'), 'selected' => true),
                    array('value' => 'hide', 'name' => __('Hide', 'themify'), 'disable' => !$disable),
                ),
                'wrap_with_class' => 'themify_module_visibility_control ' . (!$disable ? 'themify_builder_lite' : '')
            ),
            array(
                'id' => 'visibility_mobile',
                'label' => __('Mobile', 'themify'),
                'type' => 'radio',
                'meta' => array(
                    array('value' => 'show', 'name' => __('Show', 'themify'), 'selected' => true),
                    array('value' => 'hide', 'name' => __('Hide', 'themify'), 'disable' => !$disable),
                ),
                'wrap_with_class' => 'themify_module_visibility_control ' . (!$disable ? 'themify_builder_lite' : '')
            ),
            array(
                'id' => 'visibility_all',
                'label' => __('Hide All', 'themify'),
                'type' => 'checkbox',
                'options' => array(
                    array(
                        'name' => 'hide_all',
                        'value' => __('Hide this in all devices', 'themify'),
                        'toggles' => '.themify_module_visibility_control',
                        'toggles_inverse' => true
                    )
                ),
                'wrap_with_class' => !$disable ? 'themify_builder_lite' : ''
            )
        );
        return $visibility_controls;
    }

    /**
     * Append visibility controls CSS classes to rows.
     * 
     * @param	array $classes
     * @param	array $row
     * @param	string $builder_id
     * @access 	public
     * @return 	array
     */
    public function row_classes($classes, $row, $builder_id) {
        return !empty($row['styling'])?$this->get_classes($row['styling'], $classes, 'row'):$classes;
    }

    /**
     * Append visibility controls CSS classes to modules.
     * 
     * @param	array $classes
     * @param	string $mod_name
     * @param	string $module_ID
     * @param	array $args
     * @access 	public
     * @return 	array
     */
    public function module_classes($classes, $mod_name = null, $module_ID = null, $args = array()) {
        return $this->get_classes($args, $classes, 'module');
    }

    private function get_classes($args, $classes, $type) {
        $elements = array('desktop', 'tablet', 'mobile');
        foreach ($elements as $e) {
            if ((isset($args['visibility_' . $e]) && $args['visibility_' . $e] === 'hide') || (isset($args['visibility_all']) && $args['visibility_all'] === 'hide_all')) {
                if (!Themify_Builder::$frontedit_active) {
                    $classes[] = 'hide-' . $e;
                } elseif ($type === 'row') {
                    $classes[] = 'tb_visibility_hidden';
                    break;
                }
            }
        }
        return $classes;
    }

}
