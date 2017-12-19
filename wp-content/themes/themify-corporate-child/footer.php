<?php
global $themify;
?>

<?php themify_layout_after(); //hook ?>
</div>
<!-- /#body -->

<footer class="wrapper footer">
    <div class="container">
        <div class="footer__row">
            <div class="footer__col">
				<?php dynamic_sidebar( 'footer-widget-1' ); ?>
            </div>
            <div class="footer__col">
				<?php dynamic_sidebar( 'footer-widget-2' ); ?>
            </div>

            <div class="flex-grow"></div>

            <div class="footer__right">
                <div class="footer__newsletter">
                    <p class="footer__subtitle">
						<?php _e( 'Subscribe to newsletter', 'leaf' ); ?>
                    </p>
					<?php
					echo do_shortcode( '[email-subscribers namefield="NO" desc="" group="footer"]' );
					?>
                </div>

				<?php dynamic_sidebar( 'footer-social-widget' ); ?>
            </div>
        </div>
    </div>
</footer>

</div>
<!-- /#pagewrap -->

<?php themify_body_end(); // hook ?>
<!-- wp_footer -->
<?php wp_footer(); ?>

</body>
</html>
