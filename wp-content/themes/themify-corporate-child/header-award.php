<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php
	/** Themify Default Variables
	 * @var object
	 */
	global $themify; ?>
    <meta charset="<?php bloginfo( 'charset' ); ?>">

    <!-- wp_header -->
	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<?php do_action('after_body_open_tag'); ?>
<?php themify_body_start(); // hook ?>
<?php $page_class = get_post_meta( get_the_ID(), 'page_class', true ) ?>
<div id="pagewrap" class="hfeed site <?php echo $page_class; ?>">

	<?php get_template_part( 'template-parts/slide-menu', 'award' ); ?>

    <header class="wrapper header header--award js-header">
        <a href="//leaf.sk/award" class="header__logo header__logo--absolute">
            <img class="logo-leaf-award"
                 src="<?php echo get_stylesheet_directory_uri(); ?>/img/leaf-award-color.png"
                 alt="LEAF AWARD">
        </a>
        <div class="container header__container">
            <a href="//leaf.sk/award" class="header__logo header__logo--desktop">
                <img class="logo-leaf-award"
                     src="<?php echo get_stylesheet_directory_uri(); ?>/img/leaf-award-color.png"
                     alt="LEAF AWARD">
            </a>
            <div class="header__menu">

				<?php if ( has_nav_menu( 'award-nav' ) ) :
					wp_nav_menu( array(
						'container'      => false,
						'theme_location' => 'award-nav',
						'menu_class'     => 'menu-primary',
					) );
				endif; ?>

            </div>
        </div>
        <div class="header__info">

            <div class="header__socials">
		        <?php echo get_leaf_facebook_button(); ?>
            </div>

            <div class="header__right">
                <a href="/" class="header__link">LEAF.SK</a>
            </div>

        </div>
    </header>
    <div class="header__placeholder"></div>

    <div class="header__menu-mobile-toggler header__menu-mobile-toggler--award">
        <a href class="menu-icon js-slide-menu">
            <div class="menu-icon__content">
                <div class="menu-icon__line menu-icon__line--1"></div>
                <div class="menu-icon__line menu-icon__line--2"></div>
                <div class="menu-icon__line menu-icon__line--3"></div>
            </div>
        </a>
    </div>

    <div id="body" class="clearfix">

		<?php themify_layout_before(); //hook ?>
