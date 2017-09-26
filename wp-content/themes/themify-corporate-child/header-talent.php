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

        <header id="header" class="pagewidth clearfix" itemtype="https://schema.org/WPHeader">

            <?php themify_header_start(); // hook ?>

            <div id="header-topline-out">
                <div id="header-topline">
                    <div class="logo-wrap">
		                <?php echo themify_logo_image(); ?>
		                <?php if ( $site_desc = get_bloginfo( 'description' ) ) : ?>
			                <?php global $themify_customizer; ?>
                            <div id="site-description" class="site-description"><?php echo class_exists( 'Themify_Customizer' ) ? $themify_customizer->site_description( $site_desc ) : $site_desc; ?></div>
		                <?php endif; ?>
                    </div>
                    <div id="topbar">
                        <div class="menu-aktivity">
                            <div class="page-list-ext-item"></div>
                        </div>
                    </div>
                    <div id="languages"><?php
                        /* language list */
                        $languages = icl_get_languages('skip_missing=0');
                        if (/*false &&*/
                        !empty($languages)) {
                            $languageslangs = array();
                            foreach ($languages as $l) {
                                if ($l['active'])
                                    /*echo '<a href="" class="active" onclick="jQuery(\'#languages-in\').fadeToggle();return false" title="'.$l['translated_name'].'">'.$l['language_code'].'</a>';*/
                                    echo '<a href="" class="active" onclick="return false" title="' . $l['translated_name'] . '">' . $l['language_code'] . '</a>';
                                else
                                    $languageslangs[] = '<a href="' . $l['url'] . '" title="' . $l['translated_name'] . '">' . $l['language_code'] . '</a>';
                            }
                            if (!empty($languageslangs)) echo '<div id="languages-in">' . implode('', $languageslangs) . '</div>';
                        }
                        ?></div>
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
                    <?php wp_nav_menu( array( 'theme_location' => 'talent-nav' , 'fallback_cb' => 'themify_default_main_nav' , 'container'  => '' , 'menu_id' => 'main-nav' , 'menu_class' => 'main-nav clearfix' ) ); ?>
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
