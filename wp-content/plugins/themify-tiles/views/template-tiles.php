<?php
/**
 * Render the tiles editor for a post
 * @var $data array of tiles to render
 */

?>
<div id="tf-tiles-<?php echo $post_id; ?>" class="tf-tiles" data-post_id="<?php echo $post_id; ?>">

	<div class="tf-tiles-wrap">
		<?php if( ! empty( $data ) ) : foreach( $data as $key => $tile ) : ?>
			<?php echo $this->load_view( 'tile-single.php', array(
				'mod_settings' => (array) $tile, // $tile should be an array
				'module_ID' => 'tf-tile-' . $post_id . '-' . $key
			) ); ?>
		<?php endforeach; endif; ?>
	</div>
</div>