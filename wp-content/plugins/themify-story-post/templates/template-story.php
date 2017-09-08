<?php
if (!defined('ABSPATH'))
    exit; // Exit if accessed directly
/**
 * Template Story
 * 
 * Access original fields: $mod_settings
 * @author Themify
 */
$fields_default = array(
    'mod_title_story' => '',
    'mod_subtitle_story' => '',
    'backtext' => '',
		'layout_story' => 'grid7',
    'type_query_story' => 'category',
    'category_story' => '',
    'query_slug_story' => '',
    'post_per_page_story' => '20',
    'offset_story' => '',
    'order_story' => 'desc',
    'orderby_story' => 'date',
    'display_story' => 'content',
    'hide_feat_img_story' => 'no',
    'image_size_story' => '',
    'img_width_story' => '300',
    'img_height_story' => '300',
    'unlink_feat_img_story' => 'no',
    'hide_post_title_story' => 'no',
    'unlink_post_title_story' => 'no',
    'hide_post_date_story' => 'no',
    'hide_post_meta_story' => 'no',
    'hide_page_nav_story' => 'yes',
    'animation_effect' => '',
    'css_story' => ''
);

if (isset($mod_settings['category_story']))
    $mod_settings['category_story'] = $this->get_param_value($mod_settings['category_story']);

$fields_args = wp_parse_args($mod_settings, $fields_default);
extract($fields_args, EXTR_SKIP);
$animation_effect = $this->parse_animation_effect($animation_effect, $fields_args);

$container_class = implode(' ', apply_filters('themify_builder_module_classes', array(
    'module', 'module-' . $mod_name, $module_ID, $css_story
                ), $mod_name, $module_ID, $fields_args)
);

$container_props = apply_filters( 'themify_builder_module_container_props', array(
    'id' => $module_ID,
    'class' => $container_class
), $fields_args, $mod_name, $module_ID );

$this->add_post_class($animation_effect);
$this->in_the_loop = true;
global $paged;
$paged = $this->get_paged_query();
?>
<?php if ($orderby_story == 'rand' || TFCache::start_cache('story', self::$post_id, array('page' => $paged, 'ID' => $module_ID))): 
  
  $noanim='';
  /**
  $wp_session = WP_Session::get_instance();
  if (isset($wp_session['noanim'])){
    $noanim=' noanim';
  }
  $container_props['class'].=$noanim;
  $wp_session['noanim']=true;
  /**/
?>
    <!-- module story -->
    <div<?php echo $this->get_element_attributes( $container_props ); ?>>
        <?php if ($mod_title_story != ''): ?>
            <?php echo $mod_settings['before_title'] .'<strong>'. wp_kses_post(apply_filters('themify_builder_module_title', $mod_title_story, $fields_args)) .'</strong><span>'. wp_kses_post(apply_filters('themify_builder_module_title', $mod_subtitle_story, $fields_args)) .'</span>'. $mod_settings['after_title']; ?>
        <?php endif; ?>

        <?php
        do_action('themify_builder_before_template_content_render');

        // The Query
        $order = $order_story;
        $orderby = $orderby_story;
        $limit = $post_per_page_story;
        $terms = $category_story;
        $temp_terms = explode(',', $terms);
        $new_terms = array();
        $is_string = false;
        foreach ($temp_terms as $t) {
            if (!is_numeric($t))
                $is_string = true;
            if ('' != $t) {
                array_push($new_terms, trim($t));
            }
        }
        $tax_field = ( $is_string ) ? 'slug' : 'id';

        $args = array(
            'post_type' => 'story',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'order' => $order,
            'orderby' => $orderby,
            'suppress_filters' => false,
            'paged' => $paged
        );

        if (count($new_terms) > 0 && !in_array('0', $new_terms) && 'category' == $type_query_story) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'story-category',
                    'field' => $tax_field,
                    'terms' => $new_terms
                )
            );
        }

        if (!empty($query_slug_story) && 'post_slug' == $type_query_story) {
            $args['post__in'] = $this->parse_slug_to_ids($query_slug_story, 'story');
        }

        // add offset posts
        if ($offset_story != '') {
            if (empty($limit))
                $limit = get_option('posts_per_page');

            $args['offset'] = ( ( $paged - 1) * $limit ) + $offset_story;
        }

        $the_query = new WP_Query();
        $args = apply_filters("themify_builder_module_{$mod_name}_query_args", $args, $fields_args);
        $posts = $the_query->query($args);
        ?>
        <div class="builder-posts-wrap story clearfix loops-wrapper <?php echo $layout_story.$noanim ?>">
            <?php
            // check if theme loop template exists
            $is_theme_template = $this->is_loop_template_exist('loop-story.php', 'includes');

            // use theme template loop
            if ($is_theme_template) {
                // save a copy
                global $themify;
                $themify_save = clone $themify;

                // override $themify object
                $themify->hide_image = $hide_feat_img_story;
                $themify->unlink_image = $unlink_feat_img_story;
                $themify->hide_title = $hide_post_title_story;
                $themify->width = $img_width_story;
                $themify->height = $img_height_story;
                $themify->image_setting = 'ignore=true&';
                if ($this->is_img_php_disabled())
                    $themify->image_setting .= $image_size_story != '' ? 'image_size=' . $image_size_story . '&' : '';
                $themify->unlink_title = $unlink_post_title_story;
                $themify->display_content = $display_story;
                $themify->hide_date = $hide_post_date_story;
                $themify->hide_meta = $hide_post_meta_story;
                $themify->post_layout = $layout_story;

                // hooks action
                do_action_ref_array('themify_builder_override_loop_themify_vars', array($themify, $mod_name));

                $out = '';
                if ($posts) {
                    $out .= themify_get_shortcode_template($posts, 'includes/loop', 'story-grid');
                }

                // revert to original $themify state
                $themify = clone $themify_save;
                echo!empty($out) ? $out : '';
            } else {
                // use builder template
                global $post;
                $temp_post = $post;
                foreach ($posts as $post): setup_postdata($post);
                    ?>

                    <?php themify_post_before(); // hook ?>

                    <article id="post-<?php echo esc_attr($post->ID); ?>" <?php post_class("post story-post clearfix"); ?>>

                        <?php themify_post_start(); // hook ?>

                        <?php
                        if ($hide_feat_img_story != 'yes') {
                            $width = $img_width_story;
                            $height = $img_height_story;
                            $param_image = 'w=' . $width . '&h=' . $height . '&ignore=true&sizes=100vw';
                            if ($this->is_img_php_disabled())
                                $param_image .= $image_size_story != '' ? '&image_size=' . $image_size_story : '';

                            // Check if there is a video url in the custom field
                            if (themify_get('video_url') != '') {
                                global $wp_embed;

                                themify_before_post_image(); // Hook

                                echo $wp_embed->run_shortcode('[embed]' . esc_url(themify_get('video_url')) . '[/embed]');

                                themify_after_post_image(); // Hook
                            } elseif ($post_image = themify_get_image($param_image)) {
                                themify_before_post_image(); // Hook 
                                ?>
                                <figure class="post-image">
                                	<div class="image-back"></div>
                                    <?php if ($unlink_feat_img_story == 'yes'): ?>
                                        <?php echo wp_kses_post($post_image); ?>
                                    <?php else: ?>
                                        <a href="<?php echo themify_get_featured_image_link(); ?>"><?php echo wp_kses_post($post_image); ?></a>
                                    <?php endif; ?>
                                </figure>
                                <?php
                                themify_after_post_image(); // Hook
                            }
                        }
                        ?>

                        <div class="post-content"><div class="post-content-out"><div class="post-content-in"><div class="post-content-in1"><div class="post-content-in2">

                            <?php if ($hide_post_title_story != 'yes'): ?>
                                <?php themify_before_post_title(); // Hook ?>
                                <?php if ($unlink_post_title_story == 'yes'): ?>
                                    <h1 class="post-title"><?php the_title(); ?></h1>
                                <?php else: ?>
                                    <h1 class="post-title"><a href="<?php echo themify_get_featured_image_link(); ?>"><?php the_title(); ?></a></h1>
                                <?php endif; //unlink post title ?>
                                <?php themify_after_post_title(); // Hook ?> 
                            <?php endif; //post title  ?>    

                            <?php
                            // fix the issue more link doesn't output
                            global $more;
                            $more = 0;
                            ?>

                            <?php if ($display_story == 'excerpt'): ?>

                                <?php the_excerpt(); ?>

                            <?php elseif ($display_story == 'none'): ?>

                            <?php else: ?>

                                <?php the_content(themify_check('setting-default_more_text') ? themify_get('setting-default_more_text') : __('More &rarr;', 'themify')); ?>

                            <?php endif; //display content  ?>

                        </div></div></div></div></div>
                        <!-- /.post-content -->
                        <?php themify_post_end(); // hook  ?>

                    </article>
                    <?php themify_post_after(); // hook ?>
                    <?php
                endforeach;
                wp_reset_postdata();
                $post = $temp_post;
            } // end $is_theme_template
            if (true){
            ?>
            <article id="post-0" class="post story-post clearfix last-post">
            	<figure class="post-image">
                <div class="image-back"></div>
                <div class="module-story-all"><strong><span><?php _e('Your story', 'themify');?></span></strong></div>
              </figure>
            </article>
            <?php
            }
            if (false){
            ?>
            <article id="post-0" class="post story-post clearfix last-post">
            	<figure class="post-image">
                <div class="image-back"></div>
                <a href="<?php 	
                global $wp_rewrite;
                echo str_replace('%story%','',$wp_rewrite->get_extra_permastruct('story')); ?>" class="post-title module-story-all"><strong><span><?php _e('Next stories', 'themify');?></span></strong></a>
              </figure>
            </article>
            <?php
            }
            ?>
        </div><!-- .builder-posts-wrap -->
        <?php if ('yes' != $hide_page_nav_story): ?>
             <?php echo $this->get_pagenav( '', '', $the_query, $offset_story ) ?>
        <?php endif; ?>
        <?php
        do_action('themify_builder_after_template_content_render');
        $this->remove_post_class($animation_effect);
        ?>
    </div>
    <!-- /module story -->
<?php endif; ?>
<?php if ($orderby_story != 'rand'): ?>
    <?php TFCache::end_cache(); ?>
<?php endif; ?>
<?php $this->in_the_loop = false; ?>