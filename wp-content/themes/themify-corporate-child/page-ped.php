<?php
/**
 * Template name: PED 8
 */
?>

<?php get_header(); ?>

<?php
/** Themify Default Variables
 * @var object
 */
global $themify; ?>

<!-- layout-container -->
<div id="layout" class="pagewidth clearfix">

    <?php themify_content_before(); // hook ?>
    <!-- content -->
    <div id="content" class="clearfix">
        <?php themify_content_start(); // hook ?>

        <div id="page-<?php the_ID(); ?>" class="type-page">

            <?php echo get_leaf_page_title(); ?>

            <div id="ped">
                <ped
                    :expertise='<?php echo json_encode( LEAF_META_EXPERTISE, JSON_UNESCAPED_UNICODE ); ?>'
                    :location='<?php echo json_encode( LEAF_META_LOCATION, JSON_UNESCAPED_UNICODE ); ?>'
                    :focus='<?php echo json_encode( LEAF_META_FOCUS, JSON_UNESCAPED_UNICODE ); ?>'
                    :kind='<?php echo json_encode( LEAF_META_KIND, JSON_UNESCAPED_UNICODE ); ?>'
                    :period='<?php echo json_encode( LEAF_META_PERIOD, JSON_UNESCAPED_UNICODE ); ?>'
                    :posts='<?php echo json_encode( get_ped_opportunities() ); ?>'>
                </ped>
            </div>

        </div><!-- /.type-page -->

        <?php themify_content_end(); // hook ?>
    </div>
    <!-- /content -->
    <?php themify_content_after(); // hook ?>

</div>
<!-- /layout-container -->

<?php get_footer(); ?>
