<?php

define( 'LEAF_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

define( 'LEAF_PED_META_BOX_ID', 'ped-meta-box-id' );

define( 'LEAF_POST_TYPE_PED', 'ped-8' );

define( 'LEAF_PED_REGISTER_LINK', 'https://www.leaf.sk/dobrovolnici/prihlaska-dobrovolnika/' );

define( 'LEAF_PED_CSV_HEADERS', array(
    'title',
    'ped_excerpt',
    'ped_focus',
    'ped_kind',
    'ped_expertise',
    'ped_period',
    'ped_hours',
    'ped_location',
    'ped_city',
    'ped_offline',
    'ped_challenge',
    'ped_output',
    'ped_profile',
    'ped_why',
    'ped_about',
    'ped_web'
) );

/*
 * Expertíza dobrovoľníka
 */
define( 'LEAF_PED_EXPERTISE', 'ped_expertise' );

// Financie a biznis
define( 'LEAF_PED_FINANCE', 'expertise-finance' );
// Ľudské zdroje
define( 'LEAF_PED_HR', 'expertise-hr' );
// Marketing
define( 'LEAF_PED_MARKETING', 'expertise-marketing' );
// Predaj
define( 'LEAF_PED_SALES', 'expertise-sales' );
// Právo
define( 'LEAF_PED_LAW', 'expertise-law' );
// IT
define( 'LEAF_PED_IT', 'expertise-it' );
// Analýza dát
define( 'LEAF_PED_ANALYSE', 'expertise-analyse' );
// Iné
define( 'LEAF_PED_OTHER', 'expertise-other' );

define( 'LEAF_META_EXPERTISE', array(
    LEAF_PED_FINANCE   => array(
        'id'   => LEAF_PED_FINANCE,
        'name' => __( 'Financie a biznis', 'PED' ),
    ),
    LEAF_PED_HR        => array(
        'id'   => LEAF_PED_HR,
        'name' => __( 'Ľudské zdroje', 'PED' ),
    ),
    LEAF_PED_MARKETING => array(
        'id'   => LEAF_PED_MARKETING,
        'name' => __( 'Marketing', 'PED' ),
    ),
    LEAF_PED_SALES     => array(
        'id'   => LEAF_PED_SALES,
        'name' => __( 'Predaj', 'PED' ),
    ),
    LEAF_PED_LAW       => array(
        'id'   => LEAF_PED_LAW,
        'name' => __( 'Právo', 'PED' ),
    ),
    LEAF_PED_IT        => array(
        'id'   => LEAF_PED_IT,
        'name' => __( 'IT', 'PED' ),
    ),
    LEAF_PED_ANALYSE   => array(
        'id'   => LEAF_PED_ANALYSE,
        'name' => __( 'Analýza dát', 'PED' ),
    ),
    LEAF_PED_OTHER     => array(
        'id'   => LEAF_PED_OTHER,
        'name' => __( 'Iné', 'PED' ),
    ),
) );


/*
 * Lokalita
 */
define( 'LEAF_PED_LOCATION', 'ped_location' );

// Offline status from CSV
define( 'LEAF_PED_OFFLINE', 'ped_offline' );

// Homeoffice
define( 'LEAF_PED_LOCATION_HO', 'ho' );
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

define( 'LEAF_META_LOCATION', array(
    LEAF_PED_LOCATION_HO => array(
        'id'   => LEAF_PED_LOCATION_HO,
        'name' => __( 'Možné robiť aj na diaľku / zo zahraničia', 'PED' ),
    ),
    LEAF_PED_LOCATION_BA => array(
        'id'   => LEAF_PED_LOCATION_BA,
        'name' => __( 'Bratislavský kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_TA => array(
        'id'   => LEAF_PED_LOCATION_TA,
        'name' => __( 'Trnavský kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_TT => array(
        'id'   => LEAF_PED_LOCATION_TT,
        'name' => __( 'Trenčiansky kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_NA => array(
        'id'   => LEAF_PED_LOCATION_NA,
        'name' => __( 'Nitriansky kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_ZA => array(
        'id'   => LEAF_PED_LOCATION_ZA,
        'name' => __( 'Žilinský kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_BB => array(
        'id'   => LEAF_PED_LOCATION_BB,
        'name' => __( 'Banskobystrický kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_PO => array(
        'id'   => LEAF_PED_LOCATION_PO,
        'name' => __( 'Prešovský kraj', 'PED' ),
    ),
    LEAF_PED_LOCATION_KE => array(
        'id'   => LEAF_PED_LOCATION_KE,
        'name' => __( 'Košický kraj', 'PED' ),
    ),
) );


/*
 * Zameranie organizácie
 */
define( 'LEAF_PED_FOCUS', 'ped_focus' );

// Humanitárna činnosť
define( 'LEAF_PED_FOCUS_HUMANITARIAN', 'focus-humanitarian' );
// Kultúra
define( 'LEAF_PED_FOCUS_CULTURE', 'focus-culture' );
// Rozvoj občianskej spoločnosti
define( 'LEAF_PED_FOCUS_DEVELOPMENT', 'focus-development' );
// Vzdelávanie a rozvoj
define( 'LEAF_PED_FOCUS_LEARNING', 'focus-learning' );
// Sociálne znevýhodnení občania
define( 'LEAF_PED_FOCUS_SOCIAL', 'focus-social' );
// Zdravotne znevýhodnení občania
define( 'LEAF_PED_FOCUS_HEALTH', 'focus-health' );
// Rozvoj SR
define( 'LEAF_PED_FOCUS_DEV_SK', 'focus-dev-sk' );
// Seniori
define( 'LEAF_PED_FOCUS_SENIORS', 'focus-seniors' );
// Životné prostredie
define( 'LEAF_PED_FOCUS_ENV', 'focus-env' );
// Veda a technológie
define( 'LEAF_PED_FOCUS_SCIENCE', 'focus-science' );
// Start up
define( 'LEAF_PED_FOCUS_START_UP', 'focus-start-up' );
// iné
define( 'LEAF_PED_FOCUS_OTHER', 'focus-other' );

define( 'LEAF_META_FOCUS', array(
    LEAF_PED_FOCUS_HUMANITARIAN => array(
        'id'   => LEAF_PED_FOCUS_HUMANITARIAN,
        'name' => __( 'Humanitárna činnosť', 'PED' ),
    ),
    LEAF_PED_FOCUS_CULTURE      => array(
        'id'   => LEAF_PED_FOCUS_CULTURE,
        'name' => __( 'Kultúra', 'PED' ),
    ),
    LEAF_PED_FOCUS_DEVELOPMENT  => array(
        'id'   => LEAF_PED_FOCUS_DEVELOPMENT,
        'name' => __( 'Rozvoj občianskej spoločnosti', 'PED' ),
    ),
    LEAF_PED_FOCUS_LEARNING     => array(
        'id'   => LEAF_PED_FOCUS_LEARNING,
        'name' => __( 'Vzdelávanie a rozvoj', 'PED' ),
    ),
    LEAF_PED_FOCUS_SOCIAL       => array(
        'id'   => LEAF_PED_FOCUS_SOCIAL,
        'name' => __( 'Sociálne znevýhodnení občania', 'PED' ),
    ),
    LEAF_PED_FOCUS_HEALTH       => array(
        'id'   => LEAF_PED_FOCUS_HEALTH,
        'name' => __( 'Zdravotne znevýhodnení občania', 'PED' ),
    ),
    LEAF_PED_FOCUS_DEV_SK       => array(
        'id'   => LEAF_PED_FOCUS_DEV_SK,
        'name' => __( 'Rozvoj SR', 'PED' ),
    ),
    LEAF_PED_FOCUS_SENIORS      => array(
        'id'   => LEAF_PED_FOCUS_SENIORS,
        'name' => __( 'Seniori', 'PED' ),
    ),
    LEAF_PED_FOCUS_ENV          => array(
        'id'   => LEAF_PED_FOCUS_ENV,
        'name' => __( 'Životné prostredie', 'PED' ),
    ),
    LEAF_PED_FOCUS_SCIENCE      => array(
        'id'   => LEAF_PED_FOCUS_SCIENCE,
        'name' => __( 'Veda a technológie', 'PED' ),
    ),
    LEAF_PED_FOCUS_START_UP     => array(
        'id'   => LEAF_PED_FOCUS_START_UP,
        'name' => __( 'Start up', 'PED' ),
    ),
    LEAF_PED_FOCUS_OTHER        => array(
        'id'   => LEAF_PED_FOCUS_OTHER,
        'name' => __( 'Iné', 'PED' ),
    ),
) );


/*
 * Druh organizácie
 */
define( 'LEAF_PED_KIND', 'ped_kind' );

// Nezisková organizácia
define( 'LEAF_PED_KIND_NON_PROFIT', 'kind-non-profit' );
// Sociálny podnik
define( 'LEAF_PED_KIND_SOCIAL', 'kind-social' );
// Start-up
define( 'LEAF_PED_KIND_START_UP', 'kind-start-up' );

define( 'LEAF_META_KIND', array(
    LEAF_PED_KIND_NON_PROFIT => array(
        'id'   => LEAF_PED_KIND_NON_PROFIT,
        'name' => __( 'Nezisková organizácia', 'PED' ),
    ),
    LEAF_PED_KIND_SOCIAL     => array(
        'id'   => LEAF_PED_KIND_SOCIAL,
        'name' => __( 'Sociálny podnik', 'PED' ),
    ),
    LEAF_PED_KIND_START_UP   => array(
        'id'   => LEAF_PED_KIND_START_UP,
        'name' => __( 'Start-up', 'PED' ),
    ),
) );


/*
 * Dĺžka projektu
 */
define( 'LEAF_PED_PERIOD', 'ped_period' );

// 3 mesiace
define( 'LEAF_PED_PERIOD_3', 'period-3' );
// 6 mesiace
define( 'LEAF_PED_PERIOD_6', 'period-6' );
// 9 mesiace
define( 'LEAF_PED_PERIOD_9', 'period-9' );
// 12 mesiace
define( 'LEAF_PED_PERIOD_12', 'period-12' );

define( 'LEAF_META_PERIOD', array(
    LEAF_PED_PERIOD_3  => array(
        'id'   => LEAF_PED_PERIOD_3,
        'name' => __( '3 mesiace', 'PED' ),
    ),
    LEAF_PED_PERIOD_6  => array(
        'id'   => LEAF_PED_PERIOD_6,
        'name' => __( '6 mesiacov', 'PED' ),
    ),
    LEAF_PED_PERIOD_9  => array(
        'id'   => LEAF_PED_PERIOD_9,
        'name' => __( '9 mesiacov', 'PED' ),
    ),
    LEAF_PED_PERIOD_12 => array(
        'id'   => LEAF_PED_PERIOD_12,
        'name' => __( '12 mesiacov', 'PED' ),
    ),
) );

// Výzva
define( 'LEAF_PED_CHALLENGE', 'ped_challenge' );

// Zhrnutie
define( 'LEAF_PED_EXCERPT', 'ped_excerpt' );

// Mesto
define( 'LEAF_PED_CITY', 'ped_city' );

// Približný počet hodín na týždeň
define( 'LEAF_PED_HOURS_ESTIMATED', 'ped_hours' );

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
    LEAF_PED_CHALLENGE       => array(
        'id'   => LEAF_PED_CHALLENGE,
        'name' => __( 'Výzva', 'PED' ),
    ),
    LEAF_PED_EXCERPT         => array(
        'id'   => LEAF_PED_EXCERPT,
        'name' => __( 'Zhrnutie', 'PED' ),
    ),
    LEAF_PED_CITY            => array(
        'id'   => LEAF_PED_CITY,
        'name' => __( 'Mesto', 'PED' ),
    ),
    LEAF_PED_HOURS_ESTIMATED => array(
        'id'   => LEAF_PED_HOURS_ESTIMATED,
        'name' => __( 'Približný počet hodín na týždeň', 'PED' ),
    ),
    LEAF_PED_ABOUT           => array(
        'id'   => LEAF_PED_ABOUT,
        'name' => __( 'O organizácii', 'PED' ),
    ),
    LEAF_PED_WEB             => array(
        'id'   => LEAF_PED_WEB,
        'name' => __( 'Webstránka', 'PED' ),
    ),
) );

define( 'LEAF_META_WYSIWYG', array(
    LEAF_PED_OUTPUT  => array(
        'id'   => LEAF_PED_OUTPUT,
        'name' => __( 'Výstup', 'PED' ),
    ),
    LEAF_PED_PROFILE => array(
        'id'   => LEAF_PED_PROFILE,
        'name' => __( 'Profil dobrovoľníka', 'PED' ),
    ),
    LEAF_PED_WHY     => array(
        'id'   => LEAF_PED_WHY,
        'name' => __( 'Prečo by si si nás mal vybrať', 'PED' ),
    ),
) );


/**
 * Register POST TYPE
 */
add_action( 'init', 'leaf_register_ped_post_type' );

function leaf_register_ped_post_type() {

    /**
     * Post Type: PEDs.
     */

    $labels = array(
        "name"               => __( "PED 8s", "PED 8" ),
        "singular_name"      => __( "PED 8", "PED 8" ),
        'add_new'            => __( 'Add PED 8' ),
        'all_items'          => __( 'All PED 8s' ),
        'add_new_item'       => __( 'Add PED 8' ),
        'edit_item'          => __( 'Edit PED 8' ),
        'new_item'           => __( 'New PED 8' ),
        'view_item'          => __( 'View PED 8' ),
        'search_items'       => __( 'Search PED 8s' ),
        'not_found'          => __( 'No PED 8s found' ),
        'not_found_in_trash' => __( 'No PED 8s found in trash' ),
        'parent_item_colon'  => __( 'Parent PED 8' ),
    );

    $args = array(
        "label"               => __( "PED 8s", "PED 8" ),
        "labels"              => $labels,
        "description"         => "",
        "public"              => true,
        "publicly_queryable"  => true,
        "show_ui"             => true,
        "show_in_rest"        => true,
        "rest_base"           => "PED 8",
        "has_archive"         => true,
        "show_in_menu"        => true,
        "exclude_from_search" => false,
        "hierarchical"        => false,
        "query_var"           => true,
        "menu_position"       => 22,
        "supports"            => array( "title", "editor", "thumbnail" ),
        'menu_icon'           => 'dashicons-heart',
    );

    register_post_type( LEAF_POST_TYPE_PED, $args );
}

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

            $metas = [
                LEAF_PED_EXPERTISE,
                LEAF_PED_LOCATION,
                LEAF_PED_FOCUS,
                LEAF_PED_KIND,
                LEAF_PED_PERIOD,
                LEAF_PED_EXCERPT
            ];
            foreach ( $metas as $meta ) {
                $post[ $meta ] = get_post_meta( $post_id, $meta, true );

                foreach ( LEAF_META_EXPERTISE as $period => $v ) {
                    if ( in_array( $period, $post[ $meta ] ) ) {
                        $post[ $meta ][] = $v;
                    }
                }
                foreach ( LEAF_META_LOCATION as $period => $v ) {
                    if ( in_array( $period, $post[ $meta ] ) ) {
                        $post[ $meta ][] = $v;
                    }
                }
                foreach ( LEAF_META_FOCUS as $period => $v ) {
                    if ( in_array( $period, $post[ $meta ] ) ) {
                        $post[ $meta ][] = $v;
                    }
                }
                foreach ( LEAF_META_KIND as $period => $v ) {
                    if ( in_array( $period, $post[ $meta ] ) ) {
                        $post[ $meta ][] = $v;
                    }
                }
                foreach ( LEAF_META_PERIOD as $period => $v ) {
                    if ( in_array( $period, $post[ $meta ] ) ) {
                        $post[ $meta ][] = $v;
                    }
                }
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
        echo "To insert the posts into the database, set FILE ID and click the button below.";
        echo "<form action='{$_SERVER["REQUEST_URI"]}' method='GET'>";
        echo "<input type='hidden' name='post_type' value='ped-8'>";
        echo "<input type='hidden' name='insert_ped_posts' value='true'>";
        echo "<input name='ped-upload'>";
        echo "<button class='button button-primary' type='submit'>Insert Posts</button>";
        echo "</form>";
        echo "</p>";
        echo "</div>";
    }
} );

/**
 * Create and insert posts from CSV files
 */
add_action( "admin_init", function () {

    // Only execute this when we want to.
    if ( ! isset( $_GET["insert_ped_posts"] ) ) {
        return;
    }

    $posts = function () {
        $attachment_id = $_GET["ped-upload"];

        $data = array();
        global $ped_csv_errors;
        $ped_csv_errors = array();

        $file = get_attached_file( $attachment_id );

        // Attempt to change permissions if not readable
        if ( ! is_readable( $file ) ) {
            chmod( $file, 0744 );
        }

        // Check if file is writable, then open it in 'read only' mode
        if ( is_readable( $file ) && $_file = fopen( $file, "r" ) ) {
            $post = array();

            // Get first row in CSV, which is of course the headers
            $header = fgetcsv( $_file );

            // Check if headers are OK
            $wrong_header = false;
            foreach ( $header as $i => $key ) {
                if ( ! in_array( $key, LEAF_PED_CSV_HEADERS ) ) {
                    $wrong_header     = true;
                    $right_header     = implode( ',', LEAF_PED_CSV_HEADERS );
                    $ped_csv_errors[] = "File '$file' contains wrong header '$key'.<br> Acceptable headers are: $right_header";
                }
            }

            if ( $wrong_header === false ) {
                while ( $row = fgetcsv( $_file ) ) {

                    foreach ( $header as $i => $key ) {
                        $post[ $key ] = $row[ $i ];
                    }

                    $data[] = $post;
                }
            }

            fclose( $_file );

        } else {
            $ped_csv_errors[] = "File '$file' could not be opened. Check the file's permissions to make sure it's readable by your server.";
        }

        if ( ! empty( $ped_csv_errors ) ) {
            // ... do stuff with the errors

            add_action( "admin_notices", function () {
                global $ped_csv_errors;

                ?>
                <div class="error notice">
                    <?php
                    foreach ( $ped_csv_errors as $err ) {
                        echo "<p>$err</p>";
                    }
                    ?>
                </div>
                <?php
            } );
        }

        return $data;
    };

    foreach ( $posts() as $post ) {

        // Insert the post into the database
        $post_id = wp_insert_post( array(
            "post_title"  => $post["title"],
            "post_type"   => LEAF_POST_TYPE_PED,
            "post_status" => "publish"
        ) );

        $get_meta_id = function ( $arr, $val ) {
            foreach ( $arr as $item ) {
                if ( $item['name'] === $val ) {
                    return $item['id'];
                }
            }

            return "";
        };

        // EXPERTISE
        $expertise = $get_meta_id( LEAF_META_EXPERTISE, $post[ LEAF_PED_EXPERTISE ] );
        update_post_meta( $post_id, LEAF_PED_EXPERTISE, [ $expertise ] );

        // KIND
        $expertise = $get_meta_id( LEAF_META_KIND, $post[ LEAF_PED_KIND ] );
        update_post_meta( $post_id, LEAF_PED_KIND, [ $expertise ] );

        // FOCUS
        $expertise = $get_meta_id( LEAF_META_FOCUS, $post[ LEAF_PED_FOCUS ] );
        update_post_meta( $post_id, LEAF_PED_FOCUS, [ $expertise ] );

        // PERIOD
        $expertise = $get_meta_id( LEAF_META_PERIOD, $post[ LEAF_PED_PERIOD ] );
        update_post_meta( $post_id, LEAF_PED_PERIOD, [ $expertise ] );

        // LOCATION
        $locations   = [];
        $location    = $get_meta_id( LEAF_META_LOCATION, $post[ LEAF_PED_LOCATION ] );
        $locations[] = $location;

        $offline = $post[ LEAF_PED_OFFLINE ] === 'Áno';
        if ( $offline ) {
            $locations[] = LEAF_PED_LOCATION_HO;
        }
        update_post_meta( $post_id, LEAF_PED_LOCATION, $locations );

        // Meta values as single value
        $metas = [
            LEAF_PED_CHALLENGE,
            LEAF_PED_EXCERPT,
            LEAF_PED_CITY,
            LEAF_PED_HOURS_ESTIMATED,
            LEAF_PED_OUTPUT,
            LEAF_PED_PROFILE,
            LEAF_PED_WHY,
            LEAF_PED_ABOUT,
            LEAF_PED_WEB,
        ];

        foreach ( $metas as $meta ) {
            update_post_meta( $post_id, $meta, $post[ $meta ] );
        }
    }

    $ped_admin_url = get_admin_url() . 'edit.php?post_type=ped-8';
    if ( wp_redirect( $ped_admin_url ) ) {
        exit;
    }

} );

