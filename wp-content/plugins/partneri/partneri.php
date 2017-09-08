<?php
/*
Plugin Name: Partneri list
Description: This plugin provides a shortcode to list posts, with parameters. It also registers a couple of post types and tacxonomies to work with.
Version: 1.0
Author: MadMaCho
*/
// Field Array
$prefix = 'partneri_';
$custom_meta_fields = array(
    array(
        'label'=> 'Link',
        'desc'  => '',
        'id'    => $prefix.'link',
        'type'  => 'text'
    ),
    array(
        'label'=> 'Zobraziť v päte',
        'desc'  => '',
        'id'    => $prefix.'footer',
        'type'  => 'checkbox'
    ),
);

// register custom post type to work with
add_action( 'init', 'partneri_create_post_type' );
function partneri_create_post_type() {  // clothes custom post type
  	add_image_size( 'partner', 120, 90, 0);
    // set up labels
    $labels = array(
        'name' => 'Partneri',
        'singular_name' => 'Partner',
        'add_new' => 'Pridaj',
        'add_new_item' => 'Pridaj partnera',
        'edit_item' => 'Edituj partnera',
        'new_item' => 'Nový partner',
        'all_items' => 'Všetci partneri',
        'view_item' => 'Zobraz partnera',
        'search_items' => 'Hľadaj partnera',
        'not_found' =>  'Nenašiel sa žiaden partner',
        'not_found_in_trash' => 'Nenašiel sa žiaden partner v koši',
        'parent_item_colon' => '',
        'menu_name' => 'Partneri',
    );
    register_post_type(
        'partneri',
        array(
            'labels' => $labels,
            'has_archive' => false,
            'public' => true,
            'hierarchical' => false,
            'supports' => array( 'title', 'thumbnail', 'page-attributes' ),
            //'taxonomies' => array( 'post_tag', 'category' ),
            'exclude_from_search' => true,
            'capability_type' => 'post',
        )
    );
    /*
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size( 600, 360, true );
    */
}

// Add the Meta Box
function partneri_add_custom_meta_box() {
    global $wp_meta_boxes;
    if (isset($wp_meta_boxes) && isset($wp_meta_boxes['partneri']))
    foreach($wp_meta_boxes['partneri'] as $position => $boxes)
      foreach($boxes as $priority => $boxes1)
        foreach($boxes1 as $name => $boxes2)
          if (!in_array($name,array('submitdiv','postimagediv','slugdiv','pageparentdiv')))
            remove_meta_box($name,'partneri',$position);
            /*var_dump($name);*/


    add_meta_box(
        'partneri_meta_box', // $id
        'Info partnera', // $title 
        'partneri_show_custom_meta_box', // $callback
        'partneri', // $page
        'normal', // $context
        'high'); // $priority
}
add_action('add_meta_boxes', 'partneri_add_custom_meta_box',10000); 

add_action('admin_head','partneri_add_custom_scripts');
function partneri_add_custom_scripts() {
    global $custom_meta_fields, $post;
     
    $output = '<script type="text/javascript">
                jQuery(function() {';
                 
    /*
    foreach ($custom_meta_fields as $field) { // loop through the fields looking for certain types
        if($field['type'] == 'date')
            $output .= 'jQuery(".datepicker").datepicker({dateFormat:\'dd.mm.yy\'});';
    }
    */
     
    $output .= '});
        </script>';
         
    echo $output;
}

// The Callback
function partneri_show_custom_meta_box() {
    global $custom_meta_fields, $post;
    // Use nonce for verification
    echo '<input type="hidden" name="custom_meta_box_nonce" value="'.wp_create_nonce(basename(__FILE__)).'" />';
     
    // Begin the field table and loop
    echo '<table class="form-table">';
    foreach ($custom_meta_fields as $field) {
        // get value of this field if it exists for this post
        $meta = get_post_meta($post->ID, $field['id'], true);
        // begin a table row with
        echo '<tr>
                <th><label for="'.$field['id'].'">'.$field['label'].'</label></th>
                <td>';
                switch($field['type']) {
                    // text
                    case 'text':
                        echo '<input type="text" name="'.$field['id'].'" id="'.$field['id'].'" value="'.$meta.'" size="30" />
                            <br /><span class="description">'.$field['desc'].'</span>';
                    break;
                    
                    // textarea
                    case 'textarea':
                        echo '<textarea name="'.$field['id'].'" id="'.$field['id'].'" cols="60" rows="4">'.$meta.'</textarea>
                            <br /><span class="description">'.$field['desc'].'</span>';
                    break;
                    
                    // checkbox
                    case 'checkbox':
                        echo '<input type="checkbox" name="'.$field['id'].'" id="'.$field['id'].'" ',$meta ? ' checked="checked"' : '','/>
                            <label for="'.$field['id'].'">'.$field['desc'].'</label>';
                    break;
                    
                    // select
                    case 'select':
                        echo '<select name="'.$field['id'].'" id="'.$field['id'].'">';
                        foreach ($field['options'] as $option) {
                            echo '<option', $meta == $option['value'] ? ' selected="selected"' : '', ' value="'.$option['value'].'">'.$option['label'].'</option>';
                        }
                        echo '</select><br /><span class="description">'.$field['desc'].'</span>';
                    break;
                    
                    // date
                    case 'date':
                    	echo '<input type="text" class="datepicker" name="'.$field['id'].'" id="'.$field['id'].'" value="'.$meta.'" size="30" />
                    			<br /><span class="description">'.$field['desc'].'</span>';
                    break;
                    
                } //end switch
        echo '</td></tr>';
    } // end foreach
    echo '</table>'; // end table
}

// Save the Data
function partneri_save_custom_meta($post_id) {
    global $custom_meta_fields;
     
    // verify nonce
    if (!wp_verify_nonce($_POST['custom_meta_box_nonce'], basename(__FILE__))) 
        return $post_id;
    // check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
        return $post_id;
    // check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id))
            return $post_id;
        } elseif (!current_user_can('edit_post', $post_id)) {
            return $post_id;
    }
     
    // loop through fields and save the data
    foreach ($custom_meta_fields as $field) {
        $old = get_post_meta($post_id, $field['id'], true);
        $new = $_POST[$field['id']];
        if ($new && $new != $old) {
            update_post_meta($post_id, $field['id'], $new);
        } elseif ('' == $new && $old) {
            delete_post_meta($post_id, $field['id'], $old);
        }
    } // end foreach
}
add_action('save_post', 'partneri_save_custom_meta');
// register two taxonomies to go with the post type
//add_action( 'init', 'partneri_create_taxonomies', 0 );
function partneri_create_taxonomies() {
    // color taxonomy
    
    $labels = array(
        'name'              => _x( 'Colors', 'taxonomy general name' ),
        'singular_name'     => _x( 'Color', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Colors' ),
        'all_items'         => __( 'All Colors' ),
        'parent_item'       => __( 'Parent Color' ),
        'parent_item_colon' => __( 'Parent Color:' ),
        'edit_item'         => __( 'Edit Color' ),
        'update_item'       => __( 'Update Color' ),
        'add_new_item'      => __( 'Add New Color' ),
        'new_item_name'     => __( 'New Color' ),
        'menu_name'         => __( 'Colors' ),
    );
    register_taxonomy(
        'color',
        'companies',
        array(
            'hierarchical' => true,
            'labels' => $labels,
            'query_var' => true,
            'rewrite' => true,
            'show_admin_column' => true
        )
    );
    // fabric taxonomy
    $labels = array(
        'name'              => _x( 'Fabrics', 'taxonomy general name' ),
        'singular_name'     => _x( 'Fabric', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Fabrics' ),
        'all_items'         => __( 'All Fabric' ),
        'parent_item'       => __( 'Parent Fabric' ),
        'parent_item_colon' => __( 'Parent Fabric:' ),
        'edit_item'         => __( 'Edit Fabric' ),
        'update_item'       => __( 'Update Fabric' ),
        'add_new_item'      => __( 'Add New Fabric' ),
        'new_item_name'     => __( 'New Fabric' ),
        'menu_name'         => __( 'Fabrics' ),
    );
    register_taxonomy(
        'fabric',
        'companies',
        array(
            'hierarchical' => true,
            'labels' => $labels,
            'query_var' => true,
            'rewrite' => true,
            'show_admin_column' => true
        )
    );
    
}
add_action( 'plugins_loaded', 'partneri_add_shortcodes' );
function partneri_add_shortcodes(  ) {
  add_shortcode( 'list-partneri', 'partneri_post_listing_shortcode1' );
}

add_filter('widget_text', 'do_shortcode');

// create shortcode to list all clothes which come in blue
function partneri_post_listing_shortcode1( $atts , $content = null, $code = '' ) {
    ob_start();
        // define attributes and their defaults
    extract( shortcode_atts( array (
        'type' => 'partneri',
        'order' => 'ASC',
        'orderby' => 'menu_order',
        'posts' => -1,
        'title' => ''
    ), $atts ) );
 
    // define query parameters based on attributes
    $options = array(
        'post_type' => $type,
        'order' => $order,
        'orderby' => $orderby,
        'posts_per_page' => $posts,
        'post_status' => 'publish',
    );
    $query = new WP_Query( $options );
    if ( $query->have_posts() ) { ?>
             <?php 
            while ( $query->have_posts() ) : $query->the_post();
              $post_meta_data = get_post_custom($post->ID);
              if (isset($post_meta_data['partneri_footer'][0])){
            ?>
            <li id="partneri-<?php the_ID(); ?>" <?php post_class(); ?>>
              <div class="partner-thumb"><div class="partner-thumb-in">  
                <?php
                $link=$post_meta_data['partneri_link'][0];
                if ($link!=''){
                ?>
                <a href="<?php echo $link;?>" title="<?php the_title(); ?>" target="_blank">
                <?php }?>
                <?php the_post_thumbnail('partner');?>
                <?php
                $link=$post_meta_data['partneri_link'][0];
                if ($link!=''){
                ?>
                </a>
                <?php }?>
              </div></div>  
            </li>
            <?php 
            }
            endwhile;
            wp_reset_postdata(); ?>
        
    <?php $myvariable = ob_get_clean();
    $id=uniqId('partneri_');
    if ($myvariable!='')
      $myvariable='<div class="partneri-block"><h3><span>'.$title.'</span></h3><div id="'.$id.'" class="partneri-out"><div class="partneri-out2"><ul class="partneri">'.$myvariable.'</ul><div class="clear"></div></div><a href="" class="partneri-arrow-left"></a><a href="" class="partneri-arrow-right"></a></div></div>';
    $myvariable.='<script>
    var partneriIndex=0;
  function movePartneri(x,needturn){
    var Z=6;
    var z=jQuery(\'ul.partneri\',x);
    var y=jQuery(\'li\',z);
    partneriIndex+=needturn;
    if (partneriIndex<0) partneriIndex=0;
    if (partneriIndex>y.length-Z) partneriIndex=y.length-Z;
    z.stop(true,true).animate({left:(-partneriIndex/Z*100)+\'%\'},700);
  }
  
  function partneriInit(){
    jQuery(\'#'.$id.' .partneri-arrow-right\').click(function(){
      movePartneri(\'#'.$id.'\',1);
      return false;
    });
    jQuery(\'#'.$id.' .partneri-arrow-left\').click(function(){
      movePartneri(\'#'.$id.'\',-1);
      return false;
    });
  };
  jQuery(function(){partneriInit()});
    </script>';
    return $myvariable;
    }
}

function partneri_enqueue() {
	wp_enqueue_style( 'partneri-story-post', plugin_dir_url( __FILE__ ) . 'style.css', null, '1.0' );
}
add_action( 'wp_enqueue_scripts', 'partneri_enqueue' , 15 );




class Partneri_Widget extends WP_Widget {

	function __construct() {
		parent::__construct(
			'partneri_widget',
			__( 'Partneri Widget' ),
			array( 'description' => __( 'Zobrazi zoznam log partnerov' ) )
		);
	}

	function form( $instance ) {
		if ( $instance ) {
			$title = esc_attr( $instance['title'] );
		}
		else {
			$title = __( 'Partneri' );
		}
?>

		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>" />
		</p>

<?php 
	}

	function update( $new_instance, $old_instance ) {
		$instance['title'] = strip_tags( $new_instance['title'] );
		return $instance;
	}

	function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'];
			echo '<span>'.esc_html( $instance['title'] ).'</span>';
			echo $args['after_title'];
		}
    echo partneri_post_listing_shortcode1(array());
		echo $args['after_widget'];
	}
}

function partneri_register_widgets() {
	register_widget( 'Partneri_Widget' );
}

add_action( 'widgets_init', 'partneri_register_widgets' );
