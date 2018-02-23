<?php
/**
 * Template for single mentor view
 */
?>

<?php get_header(); ?>

<div id="layout" class="pagewidth clearfix">

    <div id="content" class="clearfix">

        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <div id="page-<?php the_ID(); ?>">

                <div class='wrapper post-heading post-heading--large'>
                    <div class='container post-heading__container'>
                        <h1 class='post-heading__title'>
                            Dobrovoľnícky projekt<br>
                            <small><?php the_title(); ?></small>
                        </h1>
                    </div>
                </div>

                <div class="page-content entry-content">

                    <div class="ped-detail">

                        <div class="ped-detail__main">

                            <?php
                            $post_id = get_the_ID();

                            $meta_values = [];
                            foreach ( LEAF_META_TEXTS as $meta => $v ) {
                                $meta_values[ $meta ] = get_post_meta( $post_id, $meta, true );
                            }
                            foreach ( LEAF_META_WYSIWYG as $meta => $v ) {
                                $meta_values[ $meta ] = get_post_meta( $post_id, $meta, true );
                            }

                            // ARRAYS
                            $meta_arrays = [
                                LEAF_PED_EXPERTISE,
                                LEAF_PED_LOCATION,
                                LEAF_PED_KIND,
                                LEAF_PED_FOCUS,
                                LEAF_PED_PERIOD,
                            ];

                            $get_meta_name = function ( $post_id, $arr, $val ) {
                                foreach ( $arr as $item ) {
                                    $id = get_post_meta( $post_id, $val, true );
                                    if ( $item['id'] == $id[0] ) {
                                        return $item['name'];
                                    }
                                }

                                return "";
                            };

                            $get_meta_name_from_id = function ( $arr, $id ) {
                                foreach ( $arr as $item ) {
                                    if ( $item['id'] == $id ) {
                                        return $item['name'];
                                    }
                                }

                                return "";
                            };

                            $meta_values[ LEAF_PED_EXPERTISE ] = $get_meta_name( $post_id, LEAF_META_EXPERTISE, LEAF_PED_EXPERTISE );
                            $meta_values[ LEAF_PED_LOCATION ]  = $id = get_post_meta( $post_id, LEAF_PED_LOCATION, true );
                            $meta_values[ LEAF_PED_KIND ]      = $get_meta_name( $post_id, LEAF_META_KIND, LEAF_PED_KIND );
                            $meta_values[ LEAF_PED_FOCUS ]     = $get_meta_name( $post_id, LEAF_META_FOCUS, LEAF_PED_FOCUS );
                            $meta_values[ LEAF_PED_PERIOD ]    = $get_meta_name( $post_id, LEAF_META_PERIOD, LEAF_PED_PERIOD );

                            $location    = "";
                            $home_office = false;
                            foreach ( $meta_values[ LEAF_PED_LOCATION ] as $loc ) {
                                if ( $loc === LEAF_PED_LOCATION_HO ) {
                                    $home_office = true;
                                } else {
                                    $location .= $get_meta_name_from_id( LEAF_META_LOCATION, $loc );
                                }
                            }

                            $thumbnail = get_the_post_thumbnail_url( $post_id, 'medium_large' );
                            ?>

                            <div class="ped-detail__detail">
                                Detail projektu
                            </div>

                            <?php

                            echo '<div class="ped-detail__section">';
                            echo '<div class="ped-detail__title">Výzva</div>';
                            echo $meta_values[ LEAF_PED_CHALLENGE ];
                            echo '</div>';

                            echo '<div class="ped-detail__section">';
                            echo '<div class="ped-detail__title">Výstup</div>';
                            echo apply_filters( 'the_content', $meta_values[ LEAF_PED_OUTPUT ] );
                            echo '</div>';

                            echo '<div class="ped-detail__section">';
                            echo '<div class="ped-detail__title">Profil dobrovoľníka</div>';
                            echo apply_filters( 'the_content', $meta_values[ LEAF_PED_PROFILE ] );
                            echo '</div>';

                            echo '<div class="ped-detail__section">';
                            echo '<div class="ped-detail__title">Prečo by si si nás mal vybrať</div>';
                            echo apply_filters( 'the_content', $meta_values[ LEAF_PED_WHY ] );
                            echo '</div>';

                            echo '<div class="ped-detail__section">';
                            echo '<div class="ped-detail__title">O organizácii</div>';
                            echo $meta_values[ LEAF_PED_ABOUT ];
                            echo '</div>';

                            ?>

                            <div class="text-center">
                                <a href="" class="btn btn--primary btn--min">
                                    Prihlásiť
                                </a>
                            </div>

                        </div>

                        <div class="ped-detail__side">

                            <div class="ped-detail__section">
                                <a href="" class="btn btn--primary btn--block">
                                    Prihlásiť
                                </a>
                            </div>

                            <div class="ped-detail__box">

                                <?php
                                if ( ! empty( $thumbnail ) ) {
                                    echo "<img src='$thumbnail' class='ped-detail__image'>";
                                }

                                echo '<div class="ped-detail__title">O organizácii</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Zameranie organizácie</div>';
                                echo $meta_values[ LEAF_PED_FOCUS ];
                                echo '</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Druh organizácie</div>';
                                echo $meta_values[ LEAF_PED_KIND ];
                                echo '</div>';

                                echo '<div class="ped-detail__title">O projekte</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Expertíza dobrovoľníka</div>';
                                echo $meta_values[ LEAF_PED_EXPERTISE ];
                                echo '</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Dĺžka projektu</div>';
                                echo $meta_values[ LEAF_PED_PERIOD ];
                                echo '</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Približný počet hodín na týždeň</div>';
                                echo $meta_values[ LEAF_PED_HOURS_ESTIMATED ];
                                echo '</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Lokalita</div>';
                                echo $location;
                                echo '</div>';

                                echo '<div class="ped-detail__section">';
                                echo '<div class="ped-detail__subtitle">Možnosť zapojenia na diaľku</div>';
                                echo ( $home_office ) ? 'Áno' : 'Nie';
                                echo '</div>';
                                ?>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        <?php endwhile; endif; ?>

    </div>

</div>

<?php get_footer(); ?>
