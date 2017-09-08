<?php
if (!defined('ABSPATH'))
    exit; // Exit if accessed directly
/**
 * Template News
 * 
 * Access original fields: $mod_settings
 * @author Themify
 */
$fields_default = array(
    'mod_title_news' => '',
    'backtext' => '',
		'layout_news' => 'fullwidth',
    'type_query_news' => 'category',
    'category_news' => '',
    'query_slug_news' => '',
    'post_per_page_news' => '20',
    'offset_news' => '',
    'order_news' => 'desc',
    'orderby_news' => 'date',
    'display_news' => 'content',
    'hide_feat_img_news' => 'no',
    'image_size_news' => '',
    'img_width_news' => '1800',
    'img_height_news' => '',
    'unlink_feat_img_news' => 'no',
    'hide_post_title_news' => 'no',
    'unlink_post_title_news' => 'no',
    'hide_post_date_news' => 'no',
    'hide_post_meta_news' => 'no',
    'hide_page_nav_news' => 'yes',
    'animation_effect' => '',
    'css_news' => ''
);

if (isset($mod_settings['category_news']))
    $mod_settings['category_news'] = $this->get_param_value($mod_settings['category_news']);

$fields_args = wp_parse_args($mod_settings, $fields_default);
extract($fields_args, EXTR_SKIP);
$animation_effect = $this->parse_animation_effect($animation_effect, $fields_args);

$container_class = implode(' ', apply_filters('themify_builder_module_classes', array(
    'module', 'module-' . $mod_name, $module_ID, $css_news
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

$news_slider="";
$news_slider_in="";
?>
<?php if ($orderby_news == 'rand' || TFCache::start_cache('news', self::$post_id, array('page' => $paged, 'ID' => $module_ID))): 
    $news_slider.='<div'.$this->get_element_attributes( $container_props ).'>';
    if ($mod_title_news != ''):
      $news_slider.=$mod_settings['before_title'] . wp_kses_post(apply_filters('themify_builder_module_title', $mod_title_news, $fields_args)) . $mod_settings['after_title'];
    endif;

        // The Query
        $order = $order_news;
        $orderby = $orderby_news;
        $limit = $post_per_page_news;
        $terms = $category_news;
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
            'post_type' => 'news',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'order' => $order,
            /*'orderby' => $orderby,*/
            'meta_key'			=> 'datum',
	           'orderby'			=> 'meta_value',
            'suppress_filters' => false,
            'paged' => $paged
        );

        if (count($new_terms) > 0 && !in_array('0', $new_terms) && 'category' == $type_query_news) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'news-category',
                    'field' => $tax_field,
                    'terms' => $new_terms
                )
            );
        }

        if (!empty($query_slug_news) && 'post_slug' == $type_query_news) {
            $args['post__in'] = $this->parse_slug_to_ids($query_slug_news, 'news');
        }

        // add offset posts
        if ($offset_news != '') {
            if (empty($limit))
                $limit = get_option('posts_per_page');

            $args['offset'] = ( ( $paged - 1) * $limit ) + $offset_news;
        }
        
        $postslist='';

        $the_query = new WP_Query();
        $args = apply_filters("themify_builder_module_{$mod_name}_query_args", $args, $fields_args);
        $posts = $the_query->query($args);
        $news_slider.='<div class="builder-posts-wrap-out news '.$layout_news.'"><div class="builder-posts-wrap news clearfix loops-wrapper"><div class="builder-posts-wrap-in">';

        if (wp_is_mobile()){
          $post_image_srcset_array_sizes = array('news_posts_640','news_posts_800','news_posts_1200'/*,'news_posts_1600','news_posts_2000','news_posts_2560'*/);
        }else{
          $post_image_srcset_array_sizes = array('news_posts_640','news_posts_800','news_posts_1200','news_posts_1600','news_posts_2000','news_posts_2560');
        }


                global $post;
                $temp_post = $post;
                $index=0;
                foreach ($posts as $post): setup_postdata($post);
                
                  $zobrazitdo=get_field( "zobrazovat_do", $post->ID );
                  if (($zobrazitdo!='') && (date('Y-m-d')>=date('Y-m-d',strtotime($zobrazitdo)))){
                    continue;
                  }

                  $link=get_field( "link", $post->ID );
                  $blank=(get_field( "blank", $post->ID )=='ano');
                  $hidedate=(get_field( "skryt_datum", $post->ID )=='ano');
                  
                  $strdate=strtotime(get_field( "datum", $post->ID ));
                  $postslist.='<li id="list-post-'.esc_attr($post->ID).'" data-item="'.$index.'" class="'.join( ' ', get_post_class("post news-post clearfix")).' item'.$index.'">';
                  $postslist.='<a href="'.($link!=''?$link.($blank?'" target="_blank':''):themify_get_featured_image_link()).'">';
                  if ($hidedate){
                    $postslist.='<time class="post-date entry-date">&nbsp;</time>';
                  }else{
                    $postslist.='<time datetime="'.date('o-m-d',$strdate).'" class="post-date entry-date">';
            				$postslist.='<span class="day">'.date( 'j' ,$strdate).'</span>';
            				$postslist.='<span class="month">'.date( 'M' ,$strdate).'</span>';
            				$postslist.='<span class="year">'.date( 'Y' ,$strdate).'</span>';
            			  $postslist.='</time>';
                  }
                  $postslist.='<strong>'.get_the_title().'</strong></a>';
                  $postslist.='</li>';
                  
                  $index++;

                  $news_slider_in.='<article id="post-'.esc_attr($post->ID).'" class="'.join( ' ', get_post_class("post news-post clearfix")).'">';
                        $backgroundimage=get_field( "obrazok", $post->ID );
                        if ($backgroundimage) {
                          $post_image_src = wp_get_attachment_image_src($backgroundimage['id'],'news_posts_640');
                          $post_image_srcset = wp_get_attachment_image_srcset($backgroundimage['id'],'news_posts_480'/*'news_posts_2560'/*,'news_posts_2000','news_posts_1600','news_posts_1200','news_posts_800','news_posts_640','news_posts_480')*/);
                          $post_image_srcset_array=array();
                          foreach ($post_image_srcset_array_sizes as $pom_image_size){
                            $post_image_srcset_image = wp_get_attachment_image_src($backgroundimage['id'],$pom_image_size);
                            if (!isset($post_image_srcset_array[$post_image_srcset_image[0]]))
                              $post_image_srcset_array[$post_image_srcset_image[0]] = $post_image_srcset_image[1];
                          }
                          foreach ($post_image_srcset_array as $pomkey => $pomvalue){ 
                            $post_image_srcset .= ($post_image_srcset==''?'':', ').$pomkey.' '.$pomvalue.'w';
                          }
                          /**$news_slider_in.='<span style="display:none">'.var_export($post_image_srcset_image,true).var_export($post_image_srcset,true).'</span>';/**/
                          $news_slider_in.='<figure class="post-image"><img src="'.$post_image_src[0].'" srcset="'.$post_image_srcset.'" /></figure>';
                        }
                        
                        $width=get_field( "sirka_bloku_textu", $post->ID );
                        $padding=get_field( "odsadenie_textu", $post->ID );
                        $valign=get_field( "vertikalne_zarovnanie", $post->ID );
                        $halign=get_field( "horizontalne_zarovnanie", $post->ID );
                        
                        $style="";
                        $style2="";
                        if ($valign!='') $style.="vertical-align:".$valign.';';
                        if ($halign!='') $style.="text-align:".$halign.';';
                        if ($width!='') $style2.="width:".$width.'%;';
                        if ($padding!='') $style2.="padding-left:".$padding.'%;';
                        if ($style!='') $style=' style="'.$style.'"';
                        if ($style2!='') $style2=' style="'.$style2.'"';
                        
                        $news_slider_in.='<div class="post-content"'.$style.'><div class="post-content-in"'.$style2.'>'.get_field( "text", $post->ID ).'</div></div>';


                        if ($link!=''){
                          $news_slider_in.='<a href="'.$link.'"'.($blank?' target="_blank"':'').' class="news-post-slider-link"></a>';
                        }

                    $news_slider_in.='</article>';
                endforeach;
                wp_reset_postdata();
                $post = $temp_post;
                
    if ($news_slider_in==''){
      $news_slider='';
    }else{
      $news_slider.=$news_slider_in.'</div></div>';
      $news_slider.='<a href="" class="left-arrow"></a><a href="" class="right-arrow"></a>';
      $news_slider.='</div>';
      $news_slider.='<div id="news-posts-list-out" class="count-'.$index.'"><ul id="news-posts-list" class="items'.$index.'">'.$postslist.'</div>';
      $news_slider.='</div>';
    } 
    echo $news_slider;       
endif; 
if ($orderby_news != 'rand'): 
    TFCache::end_cache(); 
endif; 
$this->in_the_loop = false; 