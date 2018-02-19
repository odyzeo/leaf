<?php

define( 'LEAF_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

define( 'LEAF_POST_TYPE_PED', 'ped-8' );


/*
 * Expertíza dobrovoľníka
 */
define( 'LEAF_PED_EXPERTISE', 'ped_expertise' );

// Financie a biznis
define( 'LEAF_PED_FINANCE', 'finance' );
// Ľudské zdroje
define( 'LEAF_PED_HR', 'hr' );
// Marketing
define( 'LEAF_PED_MARKETING', 'marketing' );
// Predaj
define( 'LEAF_PED_SALES', 'sales' );
// Právo
define( 'LEAF_PED_LAW', 'law' );
// IT
define( 'LEAF_PED_IT', 'it' );
// Analýza dát
define( 'LEAF_PED_ANALYSE', 'analyse' );
// Iné
define( 'LEAF_PED_OTHER', 'other' );

define( 'LEAF_META_EXPERTISE', array(
    array(
        'id'   => LEAF_PED_FINANCE,
        'name' => __( 'Financie a biznis', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_HR,
        'name' => __( 'Ľudské zdroje', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_MARKETING,
        'name' => __( 'Marketing', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_SALES,
        'name' => __( 'Predaj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LAW,
        'name' => __( 'Právo', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_IT,
        'name' => __( 'IT', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_ANALYSE,
        'name' => __( 'Analýza dát', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_OTHER,
        'name' => __( 'Iné', 'workout' ),
    ),
) );


/*
 * Lokalita
 */
define( 'LEAF_PED_LOCATION', 'ped_location' );

// Bratislavský kraj
define( 'LEAF_PED_LOCATION_BA', 'ba' );
// Trnavský kraj
define( 'LEAF_PED_LOCATION_TA', 'ta' );
// Trenčiansky kraj
define( 'LEAF_PED_LOCATION_TT', 'tt' );
// Nitriansky kraj
define( 'LEAF_PED_LOCATION_NA', 'na' );
// Žilinský kraj
define( 'LEAF_PED_LOCATION_ZA', 'za' );
// Banskobystrický kraj
define( 'LEAF_PED_LOCATION_BB', 'bb' );
// Prešovský kraj
define( 'LEAF_PED_LOCATION_PO', 'po' );
// Košický kraj
define( 'LEAF_PED_LOCATION_KE', 'ke' );
// Homeoffice
define( 'LEAF_PED_LOCATION_HO', 'ho' );

define( 'LEAF_META_LOCATION', array(
    array(
        'id'   => LEAF_PED_LOCATION_BA,
        'name' => __( 'Bratislavský kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_TA,
        'name' => __( 'Trnavský kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_TT,
        'name' => __( 'Trenčiansky kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_NA,
        'name' => __( 'Nitriansky kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_ZA,
        'name' => __( 'Žilinský kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_BB,
        'name' => __( 'Banskobystrický kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_PO,
        'name' => __( 'Prešovský kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_KE,
        'name' => __( 'Košický kraj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_LOCATION_HO,
        'name' => __( 'Možné robiť aj na diaľku / zo zahraničia', 'workout' ),
    ),
) );


/*
 * Zameranie organizácie
 */
define( 'LEAF_PED_FOCUS', 'ped_focus' );

// Humanitárna činnosť
define( 'LEAF_PED_FOCUS_HUMANITARIAN', 'humanitarian' );
// Kultúra
define( 'LEAF_PED_FOCUS_CULTURE', 'culture' );
// Rozvoj občianskej spoločnosti
define( 'LEAF_PED_FOCUS_DEVELOPMENT', 'development' );
// Vzdelávanie a rozvoj
define( 'LEAF_PED_FOCUS_LEARNING', 'learning' );
// Sociálne znevýhodnení občania
define( 'LEAF_PED_FOCUS_SOCIAL', 'social' );
// Zdravotne znevýhodnení občania
define( 'LEAF_PED_FOCUS_HEALTH', 'health' );
// Rozvoj SR
define( 'LEAF_PED_FOCUS_DEV_SK', 'dev-sk' );
// Seniori
define( 'LEAF_PED_FOCUS_SENIORS', 'seniors' );
// Životné prostredie
define( 'LEAF_PED_FOCUS_ENV', 'env' );
// Veda a technológie
define( 'LEAF_PED_FOCUS_SCIENCE', 'science' );
// Start up
define( 'LEAF_PED_FOCUS_START_UP', 'start-up' );
// iné
define( 'LEAF_PED_FOCUS_OTHER', 'other' );

define( 'LEAF_META_FOCUS', array(
    array(
        'id'   => LEAF_PED_FOCUS_HUMANITARIAN,
        'name' => __( 'Humanitárna činnosť', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_CULTURE,
        'name' => __( 'Kultúra', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_DEVELOPMENT,
        'name' => __( 'Rozvoj občianskej spoločnosti', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_LEARNING,
        'name' => __( 'Vzdelávanie a rozvoj', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_SOCIAL,
        'name' => __( 'Sociálne znevýhodnení občania', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_HEALTH,
        'name' => __( 'Zdravotne znevýhodnení občania', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_DEV_SK,
        'name' => __( 'Rozvoj SR', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_SENIORS,
        'name' => __( 'Seniori', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_ENV,
        'name' => __( 'Životné prostredie', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_SCIENCE,
        'name' => __( 'Veda a technológie', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_START_UP,
        'name' => __( 'Start up', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_FOCUS_OTHER,
        'name' => __( 'iné', 'workout' ),
    ),
) );


/*
 * Druh organizácie
 */
define( 'LEAF_PED_KIND', 'ped_kind' );

// Nezisková organizácia
define( 'LEAF_PED_KIND_NON_PROFIT', 'non-profit' );
// Sociálny podnik
define( 'LEAF_PED_KIND_SOCIAL', 'social' );
// Start-up
define( 'LEAF_PED_KIND_START_UP', 'start-up' );

define( 'LEAF_META_KIND', array(
    array(
        'id'   => LEAF_PED_KIND_NON_PROFIT,
        'name' => __( 'Nezisková organizácia', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_KIND_SOCIAL,
        'name' => __( 'Sociálny podnik', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_KIND_START_UP,
        'name' => __( 'Start-up', 'workout' ),
    ),
) );


/*
 * Dĺžka projektu:
 */
define( 'LEAF_PED_PERIOD', 'ped_period' );

// 3 mesiace
define( 'LEAF_PED_PERIOD_3', '3' );
// 6 mesiace
define( 'LEAF_PED_PERIOD_6', '6' );
// 9 mesiace
define( 'LEAF_PED_PERIOD_9', '9' );
// 12 mesiace
define( 'LEAF_PED_PERIOD_12', '12' );

define( 'LEAF_META_PERIOD', array(
    array(
        'id'   => LEAF_PED_PERIOD_3,
        'name' => __( '3 mesiace', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_PERIOD_6,
        'name' => __( '6 mesiacov', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_PERIOD_9,
        'name' => __( '9 mesiasov', 'workout' ),
    ),
    array(
        'id'   => LEAF_PED_PERIOD_12,
        'name' => __( '12 mesiacov', 'workout' ),
    ),
) );

// Výzva
define( 'LEAF_PED_CHALLENGE', 'ped_challenge' );

// Zhrnutie
define( 'LEAF_PED_EXCERPT', 'ped_excerpt' );

// Mesto
define( 'LEAF_PED_CITY', 'ped_city' );

// Výstup
define( 'LEAF_PED_OUTPUT', 'ped_output' );

// Profil dobrovoľníka
define( 'LEAF_PED_PROFILE', 'ped_profile' );

// Prečo by si si nás mal vybrať
define( 'LEAF_PED_WHY', 'ped_why' );

// O organizácii
define( 'LEAF_PED_ABOUT', 'ped_about' );

// Webstránka
define( 'LEAF_PED_WEB', 'ped_web' );

define( 'LEAF_META_TEXTS', array(
    LEAF_PED_CHALLENGE => array(
        'id'   => LEAF_PED_CHALLENGE,
        'name' => __( 'Výzva', 'workout' ),
    ),
    LEAF_PED_EXCERPT   => array(
        'id'   => LEAF_PED_EXCERPT,
        'name' => __( 'Zhrnutie', 'workout' ),
    ),
    LEAF_PED_CITY      => array(
        'id'   => LEAF_PED_CITY,
        'name' => __( 'Mesto', 'workout' ),
    ),
    LEAF_PED_OUTPUT    => array(
        'id'   => LEAF_PED_OUTPUT,
        'name' => __( 'Výstup', 'workout' ),
    ),
    LEAF_PED_PROFILE   => array(
        'id'   => LEAF_PED_PROFILE,
        'name' => __( 'Profil dobrovoľníka', 'workout' ),
    ),
    LEAF_PED_WHY       => array(
        'id'   => LEAF_PED_WHY,
        'name' => __( 'Prečo by si si nás mal vybrať', 'workout' ),
    ),
    LEAF_PED_ABOUT     => array(
        'id'   => LEAF_PED_ABOUT,
        'name' => __( 'O organizácii', 'workout' ),
    ),
    LEAF_PED_WEB       => array(
        'id'   => LEAF_PED_WEB,
        'name' => __( 'Webstránka', 'workout' ),
    ),
) );


require_once( LEAF_PLUGIN_DIR . 'class.ped-meta-box.php' );
new Ped_Meta_Box();

// FUNCTIONS
function get_ped_opportunities() {
    $result = array();
    $args   = array(
        'posts_per_page' => - 1,
        'post_type'      => LEAF_POST_TYPE_PED,
        'orderby'        => 'post_date',
    );

    $wp_query = new WP_Query( $args );

    if ( $wp_query->have_posts() ) {
        while ( $wp_query->have_posts() ) {
            $wp_query->the_post();

            $post = array();

            $post_id       = get_the_ID();
            $title         = get_the_title();
            $post['title'] = $title;
            $post['link']  = get_permalink();

            $metas = [LEAF_PED_EXPERTISE, LEAF_PED_LOCATION, LEAF_PED_FOCUS, LEAF_PED_KIND, LEAF_PED_PERIOD];
            foreach ( $metas as $meta ) {
                $post[$meta]  = get_post_meta( $post_id, $meta, true );
            }

            $result[] = $post;
        }
    }

    return $result;
}

// ADMIN PART
/**
 * Show 'insert posts' button on backend
 */
add_action( "admin_notices", function () {
    $screen = get_current_screen();

    if ( $screen->id === 'edit-ped-8' ) {
        echo "<div class='updated'>";
        echo "<p>";
        echo "To insert the posts into the database, click the button to the right.";
        echo "<a class='button button-primary' style='margin:0.25em 1em' href='{$_SERVER["REQUEST_URI"]}&insert_sitepoint_posts'>Insert Posts</a>";
        echo "</p>";
        echo "</div>";
    }
} );

/**
 * Create and insert posts from CSV files
 */
add_action( "admin_init", function () {
    global $wpdb;

    // I'd recommend replacing this with your own code to make sure
    //  the post creation _only_ happens when you want it to.
    if ( ! isset( $_GET["insert_sitepoint_posts"] ) ) {
        return;
    }

    // Change these to whatever you set
    $sitepoint = array(
        "custom-field"     => "sitepoint_post_attachment",
        "custom-post-type" => "sitepoint_posts"
    );

    // Get the data from all those CSVs!
    $posts = function () {
        $data   = array();
        $errors = array();

        // Get array of CSV files
        $files = glob( __DIR__ . "/data/*.csv" );

        foreach ( $files as $file ) {

            // Attempt to change permissions if not readable
            if ( ! is_readable( $file ) ) {
                chmod( $file, 0744 );
            }

            // Check if file is writable, then open it in 'read only' mode
            if ( is_readable( $file ) && $_file = fopen( $file, "r" ) ) {

                // To sum this part up, all it really does is go row by
                //  row, column by column, saving all the data
                $post = array();

                // Get first row in CSV, which is of course the headers
                $header = fgetcsv( $_file );

                while ( $row = fgetcsv( $_file ) ) {

                    foreach ( $header as $i => $key ) {
                        $post[ $key ] = $row[ $i ];
                    }

                    $data[] = $post;
                }

                fclose( $_file );

            } else {
                $errors[] = "File '$file' could not be opened. Check the file's permissions to make sure it's readable by your server.";
            }
        }

        if ( ! empty( $errors ) ) {
            // ... do stuff with the errors
        }

        return $data;
    };


    var_dump( $posts() );

    $okk = add_post_meta( 4080, 'wpcf-expertise', 'it' );
    var_dump( $okk );

    return;

    // Simple check to see if the current post exists within the
    //  database. This isn't very efficient, but it works.
    $post_exists = function ( $title ) use ( $wpdb, $sitepoint ) {

        // Get an array of all posts within our custom post type
        $posts = $wpdb->get_col( "SELECT post_title FROM {$wpdb->posts} WHERE post_type = '{$sitepoint["custom-post-type"]}'" );

        // Check if the passed title exists in array
        return in_array( $title, $posts );
    };

    foreach ( $posts() as $post ) {

        // If the post exists, skip this post and go to the next one
        if ( $post_exists( $post["title"] ) ) {
            continue;
        }

        // Insert the post into the database
        $post["id"] = wp_insert_post( array(
            "post_title"   => $post["title"],
            "post_content" => $post["content"],
            "post_type"    => $sitepoint["custom-post-type"],
            "post_status"  => "publish"
        ) );

        // Get uploads dir
        $uploads_dir = wp_upload_dir();

        // Set attachment meta
        $attachment         = array();
        $attachment["path"] = "{$uploads_dir["baseurl"]}/sitepoint-attachments/{$post["attachment"]}";
        $attachment["file"] = wp_check_filetype( $attachment["path"] );
        $attachment["name"] = basename( $attachment["path"], ".{$attachment["file"]["ext"]}" );

        // Replace post attachment data
        $post["attachment"] = $attachment;

        // Insert attachment into media library
        $post["attachment"]["id"] = wp_insert_attachment( array(
            "guid"           => $post["attachment"]["path"],
            "post_mime_type" => $post["attachment"]["file"]["type"],
            "post_title"     => $post["attachment"]["name"],
            "post_content"   => "",
            "post_status"    => "inherit"
        ) );

        // Update post's custom field with attachment
        update_field( $sitepoint["custom-field"], $post["attachment"]["id"], $post["id"] );

    }

} );
