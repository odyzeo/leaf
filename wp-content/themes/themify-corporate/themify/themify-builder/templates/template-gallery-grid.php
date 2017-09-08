<?php
if (!defined('ABSPATH'))
	exit; // Exit if accessed directly
/**
 * Template Gallery Grid
 * 
 * Access original fields: $mod_settings
 * @author Themify
 */
extract( $settings, EXTR_SKIP );

$i = 0;
$pagination = $settings['gallery_pagination'] && $settings['gallery_per_page'] > 0;
if ( $pagination ) {
	$total = count( $gallery_images );
	if ( $total <= $settings['gallery_per_page'] ) {
		$pagination = false;
	} else {
		$current = is_front_page() ? get_query_var( 'page', 1 ) : get_query_var( 'paged', 1 );
		if ( ! $current ) {
			$current = 1;
		}
		$offset = $settings['gallery_per_page'] * ( $current - 1 );
		$gallery_images = array_slice( $gallery_images, $offset, $settings['gallery_per_page'], true );
	}
}
foreach ( $gallery_images as $image ) :
	$alt = get_post_meta( $image->ID, '_wp_attachment_image_alt', true );
	$title = ! empty( $alt ) ? $alt : $image->post_excerpt; ?>
	
	<dl class="gallery-item">
		<dt class="gallery-icon">
		<?php
		if ( $link_opt == 'file' ) {
			$link = wp_get_attachment_image_src( $image->ID, $link_image_size );
			$link = $link[0];
		} elseif ( 'none' == $link_opt ) {
			$link = '';
		} else {
			$link = get_attachment_link( $image->ID );
		}
		$link_before = '' != $link ? sprintf( '<a title="%s" href="%s">', esc_attr( $title ), esc_url( $link ) ) : '';
		$link_before = apply_filters( 'themify_builder_image_link_before', $link_before, $image, $settings );
		$link_after = '' != $link ? '</a>' : '';
		if ( $this->is_img_php_disabled() ) {
			$img = wp_get_attachment_image( $image->ID, $image_size_gallery );
		} else {
			$img = wp_get_attachment_image_src( $image->ID, 'large' );
			$img = themify_get_image( "ignore=true&src={$img[0]}&w={$thumb_w_gallery}&h={$thumb_h_gallery}" );
		}

		echo ! empty( $img ) ? $link_before . $img . $link_after : '';
		?>
		</dt>
		<dd<?php if( $gallery_image_title==='library' && ! empty( $title ) ) : ?> class="wp-caption-text gallery-caption"<?php endif; ?>>
			<?php if( $gallery_image_title === 'library' && ! empty( $title ) ) : ?>
				<strong class="themify_image_title"><?php echo $title ?></strong>
			<?php endif; ?>
		</dd>
	</dl>

	<?php if ( $columns > 0 && ++$i % $columns == 0 ) : ?>
		<br style="clear: both" />
	<?php endif; ?>

<?php endforeach; // end loop  ?>
<br style="clear: both" />
<?php if ( $pagination ) : ?>
	<div class="builder_gallery_nav" data->
		<?php
		echo paginate_links( array(
			'current' => $current,
			'total' => ceil( $total / $settings['gallery_per_page'] )
		) );
		?>
	</div>
<?php endif; ?>