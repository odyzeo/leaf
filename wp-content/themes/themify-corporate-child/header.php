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
<?php // TODO UNCOMMENT get_template_part( 'template-parts/header', 'facebook' ); ?>
<?php themify_body_start(); // hook ?>
<div id="pagewrap" class="hfeed site">

	<?php get_template_part( 'template-parts/slide-menu' ); ?>

    <header class="wrapper header js-header">
        <a href="/" class="header__logo header__logo--absolute">
            <img class="logo-leaf"
                 src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/leaf-logo.svg"
                 alt="LEAF">
        </a>
        <div class="container header__container">
            <a href="/" class="header__logo header__logo--desktop">
                <img class="logo-leaf"
                     src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/leaf-logo.svg"
                     alt="LEAF">
            </a>
            <div class="header__menu">

				<?php if ( has_nav_menu( 'main-nav' ) ) :
					wp_nav_menu( array(
						'container'      => false,
						'theme_location' => 'main-nav',
						'menu_class'     => 'menu-primary',
					) );
				endif; ?>

            </div>
        </div>
        <div class="header__info">

			<?php echo leaf_get_languages(); ?>

        </div>
    </header>
    <div class="header__placeholder"></div>

    <div class="header__menu-mobile-toggler">
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
