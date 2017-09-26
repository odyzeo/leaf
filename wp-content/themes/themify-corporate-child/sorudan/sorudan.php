<?php

defined('ABSPATH') or die();

class Sor {
    
    const SLUG = 'talentguide';
    const OBJECT_TYPE_MENTOR = 'mentor';
    const TAXONOMY_TYPE_MENTOR = 'taxonomy_mentor';
    
    protected static $_instance = null;
    
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    /*
     * Construct class
     * */
    public function __construct() {
        
        add_action( 'wp_enqueue_scripts', array( $this, 'setupScriptsStyles' ) );
        add_action( 'admin_menu', array( $this, 'addAdminPage' ));
        add_action( 'init', array( $this, 'initObjects' ) );
        add_action( 'restrict_manage_posts', array( $this, 'showTaxonomyFilters' ) );
        
        //run export to CSV
        add_action('admin_init', array( $this, 'runExportCsv' ),11);
    }
    
    public static function setupScriptsStyles() {
        
        /*
         * Loads support stylesheet and scripts.
         */
         
        wp_enqueue_style( 'sor', get_stylesheet_directory_uri() . '/css/sor.css', array(), '1.01' );
        //wp_enqueue_style( 'sor-bootstrap', get_stylesheet_directory_uri() . '/css/bootstrap.css', array(), '3.3.5' );
        
        wp_enqueue_script( 'sor', get_stylesheet_directory_uri().'/js/sor.js', array( 'jquery' ), true);
        //wp_enqueue_script( 'sor-bootstrap', get_stylesheet_directory_uri().'/js/bootstrap.min.js', array( 'jquery' ), true);
        
        
        
    }
    
    public function addAdminPage(){
        global $menu;    
        
        $parent = 'edit.php?post_type='.self::OBJECT_TYPE_MENTOR;
        
        add_submenu_page($parent,'Export', 'Export', 'manage_options',  self::SLUG, array( $this, 'displayAdminPage' ));
    }
    
    /*
     * Content of admin page
     */
    public function displayAdminPage(){
    ?>        
        <div class="wrap">
        <div id="icon-options-general" class="icon32"></div>
        <h2>Export mentorov do CSV</h2>
        
        <form action="" method="post">
        <?php wp_nonce_field( 'export_mentor', 'sor_export_mentor' ); ?>
        <p class="submit">
            <input name="export_submit" class="button button-primary" type="submit" value="Exportovať do CSV" />
        </p>
        
        </div>
    
    <?php
    }
    
    public function runExportCsv(){
        // chceck if correct nonce
        if ( !empty( $_POST ) && isset($_POST["sor_export_mentor"]) && check_admin_referer( 'export_mentor', 'sor_export_mentor' ) && current_user_can( 'manage_options' )) {
             
            if(isset($_POST["export_submit"])){
                
                $this->exportMentorCsv();
                
            }
        }
    }
    
    public function initObjects(){
        $this->registerPostMentor();
        $this->registerTaxonomyMentor();
    }
    
    /**
     * POSTS
     */
    
    
    private function registerPostMentor() {
            
        $labels = array(
            'name'               => 'Mentori',
            'singular_name'      => 'Mentor',
            'menu_name'          => 'Mentori',
            'name_admin_bar'     => 'Mentor',
            'add_new'            => 'Pridať mentora',
            'add_new_item'       => 'Pridať nového mentora',
            'new_item'           => 'Nový mentor',
            'edit_item'          => 'Upraviť mentora',
            'view_item'          => 'Zobraziť mentora',
            'all_items'          => 'Všetci mentori',
            'search_items'       => 'Vyhľadať mentora',
            'parent_item_colon'  => 'Nadradení mentori:',
            'not_found'          => 'Nenájdení žiadni mentori',
            'not_found_in_trash' => 'Nenájdení žiadni mentori v koši'
        );
        
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => self::OBJECT_TYPE_MENTOR ),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 5,
            'taxonomies'         => array(self::TAXONOMY_TYPE_MENTOR),
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' , 'revisions' )
        );
        
        register_post_type(self::OBJECT_TYPE_MENTOR, $args );
    }
    
    /**
     * TAXONOMIES
     */
     
     private function registerTaxonomyMentor() {
        
        $labels = array(
            'name'                       => 'Kategórie pre mentorov',
            'singular_name'              => 'Kategória',
            'search_items'               => 'Vyhľadať kategórie',
            'popular_items'              => 'Populárne kategórie',
            'all_items'                  => 'Všetky kategórie',
            'parent_item'                => null,
            'parent_item_colon'          => null,
            'edit_item'                  => 'Upraviť kategóriu',
            'update_item'                => 'Aktualizovať kategóriu',
            'add_new_item'               => 'Pridať kategóriu',
            'new_item_name'              => 'Nový názov pre kategóriu',
            'separate_items_with_commas' => 'Oddeliť kategórie čiarkami',
            'add_or_remove_items'        => 'Pridať alebo odobrať kategórie',
            'choose_from_most_used'      => 'Vybrať najpoužívanejšie kategórie',
            'not_found'                  => 'Nenájdené žiadne kategórie',
            'menu_name'                  => 'Kategórie pre mentorov',
        );
    
        $args = array(
            'hierarchical'          => true,
            'labels'                => $labels,
            'show_ui'               => true,
            'show_admin_column'     => true,
            'query_var'             => true,
            'rewrite'               => array( 'slug' => self::TAXONOMY_TYPE_MENTOR ),
        );
        
        register_taxonomy( self::TAXONOMY_TYPE_MENTOR, array(self::OBJECT_TYPE_MENTOR), $args );

    }
    
    /**
     * Show all custom taxonomy filters in post
     */
    public static function showTaxonomyFilters() {
        global $typenow;
        if( $typenow != "page" && $typenow != "post" ){
            $filters = get_object_taxonomies($typenow);
            foreach ($filters as $tax_slug) {
                if($tax_slug == "category" || $tax_slug == "post_tag" || $tax_slug == "post_format") continue;   
                $tax_obj = get_taxonomy($tax_slug);
                $tax_name = $tax_obj->labels->name;
                $terms = get_terms($tax_slug);
                echo "<select name='$tax_slug' id='$tax_slug' class='postform'>";
                echo "<option value=''>".__('All')." $tax_name</option>";
                foreach ($terms as $term) { echo '<option value='. $term->slug, $_GET[$tax_slug] == $term->slug ? ' selected="selected"' : '','>' . $term->name .' (' . $term->count .')</option>'; }
                echo "</select>";
            }
        }
    }
    
    public function getAllCategories($taxonomyCode) {
        $args = array(
            'orderby'                  => 'name',
            'order'                    => 'ASC',
            'hide_empty'               => 0,
            'taxonomy'                 => $taxonomyCode,
            'pad_counts'               => false 
        );
        return get_categories($args);
    }
    
    public static function exportMentorCsv(){
        
        global $post;
        $mentors = array();
        
        remove_filter ('the_excerpt', 'wpautop');
        remove_filter ('the_content', 'wpautop');
        remove_filter ('acf_the_content', 'wpautop');
        
        $args = array(
            'post_type' => Sor::OBJECT_TYPE_MENTOR,
            'post_status' => 'publish',
            'posts_per_page' => -1
        );
        
        $text_replace = array(
          '"' => '\'', 
          ";" => ",",
          "\r" => " ",
          "\n" => " ",
          "\r\n" => " "
        );
        
        $list_replace = array(
            '<li>' => '',
            '</li>' => ',',
            '<ul>' => '',
            '</ul>' => '',
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                
                $mentor_info = get_field('sor_more_info');
                $mentor_linkedin = get_field('sor_mentor_linkedin');
                $mentor_category = get_field('sor_mentor_category');
                $mentor_activity = get_field('sor_mentor_activity');
                $mentor_aboutme = get_field('sor_mentor_aboutme');
                
                if($mentor_category && $mentor_category != ""){
                    $mentor_category = str_replace(array_keys($list_replace), array_values($list_replace), $mentor_category);
                } else {
                    $terms = wp_get_post_terms($post->ID, Sor::TAXONOMY_TYPE_MENTOR, array('orderby' => 'term_order', 'order' => 'ASC', 'fields' => 'names'));
                    if($terms) {
                        $mentor_category = implode(",",$terms);
                    }
                }
                
                $excerpt = $post->post_excerpt;
                $title = get_the_title();
                $content = get_the_content();
                
                $mentor_export = array(
                    "name" => str_replace('"', "'", $title),
                    "categoty" => str_replace(array_keys($text_replace), array_values($text_replace), $mentor_category),
                    "content" => str_replace(array_keys($text_replace), array_values($text_replace), $content),
                    "info" => str_replace(array_keys($text_replace), array_values($text_replace), $mentor_info),
                    "activity" => str_replace(array_keys($text_replace), array_values($text_replace), $mentor_activity),
                    "about" => str_replace(array_keys($text_replace), array_values($text_replace), $mentor_aboutme)
                    //"excerpt" => str_replace(array_keys($text_replace), array_values($text_replace), $excerpt),
                );
                
                $mentors[] = $mentor_export;
            }
        }
        wp_reset_postdata();
        
        header('Content-Encoding: UTF-8');
        header('Content-type: text/csv; charset=UTF-8');
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename=mentori.csv');
        echo "\xEF\xBB\xBF"; // UTF-8 BOM
        echo '"Meno";"Kategória";"Popis";"Info";"Aktivity";"O mňe";' . "\r\n";
        foreach($mentors as $mentor){
            echo '"' . implode('";"', $mentor) . '"' . "\r\n";
        }
        exit();
    }
    
}

function SOR() {
    return Sor::instance();
}

SOR();


