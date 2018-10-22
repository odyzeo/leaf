<?php
global $themify;
?>

<?php themify_layout_after(); //hook ?>
</div>
<!-- /#body -->

<!--Anchor for menu-->
<div id="footer"></div>

<footer class="wrapper footer">
    <div class="container">
        <div class="footer__row">
            <div class="footer__col">
                <?php dynamic_sidebar('footer-widget-1'); ?>
            </div>
            <div class="footer__col">
                <?php dynamic_sidebar('footer-widget-2'); ?>
            </div>

            <div class="flex-grow"></div>

            <div class="footer__right">
                <div class="footer__newsletter js-newsletter">
                    <p class="footer__subtitle widgettitle">
                        <?php _e('Subscribe to newsletter', 'leaf'); ?>
                    </p>
                    <?php
                    echo do_shortcode('[email-subscribers namefield="YES" desc="" group="footer"]');
                    ?>

                    <div class="footer__agreement js-checkbox">
                        <label>
                            <input type="checkbox" v-model="checked">
                            Súhlasím so
                            <a href="https://www.leaf.sk/spracovanie-osobnych-udajov/"
                               title="Spracovanie kontaktných údajov">spracovaním kontaktných údajov</a> za účelom
                            informovania o vzdelávacich a rozvojových aktivitách LEAF a LEAF Academy.
                        </label>
                    </div>
                </div>

                <?php dynamic_sidebar('footer-social-widget'); ?>
            </div>
        </div>
    </div>
</footer>

</div>

<div id="cookie-agreement" class="cookie-agreement">
    <div class="container cookie-agreement__container">
        <div class="cookie-agreement__text">
            Text si vypytaj od Erika
        </div>
        <a href id="cookie-agreement-btn" class="cookie-agreement__btn">
            OK
        </a>
    </div>
</div>
<!-- /#pagewrap -->

<?php themify_body_end(); // hook ?>
<!-- wp_footer -->
<?php wp_footer(); ?>

</body>
</html>
