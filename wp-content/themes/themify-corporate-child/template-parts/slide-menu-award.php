<div class="slide-menu">
    <div class="slide-menu__wrapper js-slide-menu__wrapper">
        <nav class="slide-menu slide-menu--slide-left">
            <div class="slide-menu__header">
                <a href="//leaf.sk/award" class="slide-menu__logo-link">
                    <img class="logo-leaf-award"
                         src="<?php echo get_stylesheet_directory_uri(); ?>/img/leaf-award-color.png"
                         alt="LEAF AWARD">
                </a>
            </div>
            <div class="slide-menu__body">

				<?php if ( has_nav_menu( 'award-nav' ) ) :
					wp_nav_menu( array(
						'container'      => false,
						'theme_location' => 'award-nav',
						'menu_class'     => 'menu-mobile',
					) );
				endif; ?>

            </div>
            <div class="slide-menu__footer">

				<?php echo leaf_get_languages( 'slide-menu__lang' ); ?>

            </div>
        </nav>
    </div>
    <div class="slide-menu__mask js-slide-menu__mask"></div>
</div>