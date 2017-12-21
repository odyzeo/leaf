<div class="slide-menu">
    <div class="slide-menu__wrapper js-slide-menu__wrapper">
        <nav class="slide-menu slide-menu--slide-left">
            <div class="slide-menu__header">
                <a href="/" class="slide-menu__logo-link">
                    <img class="logo-leaf"
                         src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/leaf-logo.svg"
                         alt="LEAF">
                </a>
            </div>
            <div class="slide-menu__body">

				<?php if ( has_nav_menu( 'irpu-nav' ) ) :
					wp_nav_menu( array(
						'container'      => false,
						'theme_location' => 'irpu-nav',
						'menu_class'     => 'menu-mobile',
					) );
				endif; ?>

            </div>
            <div class="slide-menu__footer">

                <a href="/">LEAF.SK</a>

            </div>
        </nav>
    </div>
    <div class="slide-menu__mask js-slide-menu__mask"></div>
</div>