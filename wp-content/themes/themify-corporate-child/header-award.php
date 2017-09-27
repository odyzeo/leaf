<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php
    /** Themify Default Variables
     * @var object
     */
    global $themify; ?>
    <meta charset="<?php bloginfo('charset'); ?>">

    <!-- wp_header -->
    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<?php themify_body_start(); // hook ?>
<div id="pagewrap" class="hfeed site">

    <div id="headerwrap">

        <?php themify_header_before(); // hook ?>

        <header id="header" class="pagewidth clearfix" itemscope="itemscope" itemtype="https://schema.org/WPHeader">

            <?php themify_header_start(); // hook ?>

            <div id="header-topline-out">
                <div id="header-topline">
                    <div class="logo-wrap">
                        <div id="site-logo">
                            <a href="//leaf.sk/award" title="LEAF AWARD">
                                <img class="logo-leaf-award"
                                     src="<?php echo get_stylesheet_directory_uri(); ?>/img/leaf-award-color.png"
                                     alt="LEAF AWARD"
                                     title="LEAF AWARD">
                            </a>
                        </div>
                    </div>
                    <div id="topbar">

                    </div>
                </div>
            </div>
            <a id="menu-icon" href="#mobile-menu"></a>
            <div id="mobile-menu" class="sidemenu sidemenu-off">

                <?php if (false) { ?>
                    <div class="social-widget">
                        <?php dynamic_sidebar('social-widget'); ?>

                        <?php if (!themify_check('setting-exclude_rss')) : ?>
                            <div class="rss"><a
                                        href="<?php echo themify_get('setting-custom_feed_url') != '' ? themify_get('setting-custom_feed_url') : get_bloginfo('rss2_url'); ?>"></a>
                            </div>
                        <?php endif ?>
                    </div>
                    <!-- /.social-widget -->

                    <div id="searchform-wrap">
                        <?php if (!themify_check('setting-exclude_search_form')): ?>
                            <?php get_search_form(); ?>
                        <?php endif ?>
                    </div>
                    <!-- /searchform-wrap -->
                <?php } ?>

                <nav id="main-nav-wrap" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement">
                    <?php wp_nav_menu( array( 'theme_location' => 'award-nav' , 'fallback_cb' => 'themify_default_main_nav' , 'container'  => '' , 'menu_id' => 'main-nav' , 'menu_class' => 'main-nav clearfix' ) ); ?>
                    <!-- /#main-nav -->
                </nav>

                <a id="menu-icon-close" href="#"></a>

            </div>
            <!-- /#mobile-menu -->

            <?php themify_header_end(); // hook ?>

        </header>
        <!-- /#header -->

        <?php themify_header_after(); // hook ?>

    </div>
    <!-- /#headerwrap -->

    <div id="body" class="clearfix">

        <?php themify_layout_before(); //hook ?>
