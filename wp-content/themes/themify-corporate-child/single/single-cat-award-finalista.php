<?php
/**
 * Template for single post view
 * @package themify
 * @since 1.0.0
 */
?>

<?php get_header('award'); ?>

<?php
/** Themify Default Variables
 * @var object
 */
global $themify;
?>

<?php if (have_posts()) {
while (have_posts()) :
the_post(); ?>

<div id="layout" class="pagewidth clearfix">

    <div id="content" class="list-post">

        <div class="wrapper post-heading post-heading--award">
            <div class="container post-heading__container">
                <h1 class="post-heading__title">
                    <?php the_title(); ?>
                </h1>
            </div>
        </div>

        <?php get_template_part('includes/loop', 'single'); ?>

        <div class="container themify_builder_content">

            <div class="module module-divider solid">
                <h3 class="module-title">
                    <?php _e('Novinky', 'leaf'); ?>
                </h3>
            </div>

            <?php
            $post_id = get_the_ID();
            echo do_shortcode("[latest-blogs category='57' post='$post_id']");
            ?>

            <div class="newsletter__row js-newsletter">
                <div class="module module-divider solid">
                    <h3 class="module-title">
                        <?php _e('Newsletter', 'leaf'); ?>
                    </h3>
                </div>

                <div class="flex flex--grid">
                    <div class="flex-1-2">
                        <div class="page-content">
                            <?php
                            echo do_shortcode("[email-subscribers namefield='YES' desc='' group='award']");
                            ?>
                        </div>
                    </div>
                    <div class="flex-1-2">
                        <?php
                        _e('Prihlás sa, ak chceš vedieť, čo je nové.', 'leaf');
                        echo '<br>';
                        _e('Pošleme ti občas newsletter.', 'leaf');
                        ?>

                    </div>
                </div>
            </div>
        </div>

    </div>

    <?php endwhile;
    } ?>

</div>

<?php get_footer(); ?>
