<?php
/**
 * Render the tiles editor for a post
 * @var $data
 */

?>
<div id="tf-tiles-<?php echo $post_id; ?>" class="tf-tiles tf-tiles-editing" data-post_id="<?php echo $post_id; ?>">

	<div class="tf-tiles-edit-wrap">
		<?php if( ! empty( $data ) ) : foreach( $data as $key => $tile ) : ?>
			<?php echo $this->load_view( 'tile-single.php', array(
				'mod_settings' => (array) $tile, // $tile should be an array
				'module_ID' => 'tf-tile-' . $post_id . '-' . $key
			) ); ?>
		<?php endforeach; endif; ?>
	</div>

	<div class="tf-tiles-actions">

		<a class="tf-tiles-add" href="#" >
			<i class="ti ti-plus"></i>
			<?php _e( 'Add Tile', 'themify-tiles' ); ?>
		</a>
		<a class="tf-tiles-save" href="#" >
			<i class="ti ti-save"></i>
			<?php _e( 'Save', 'themify-tiles' ); ?>
		</a>

	</div>
</div>
	