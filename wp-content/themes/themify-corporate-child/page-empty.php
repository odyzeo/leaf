<?php
/**
 * Template name: Empty
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
	<?php wp_head(); ?>
</head>
<body>
<?php if ( ! is_404() && have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <div>
		<?php the_content(); ?>
    </div>
<?php endwhile; endif; ?>
</body>
</html>