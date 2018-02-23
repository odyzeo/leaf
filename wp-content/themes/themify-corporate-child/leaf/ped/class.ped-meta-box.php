<?php

class Ped_Meta_Box {

    public function __construct() {

        if ( is_admin() ) {
            add_action( 'load-post.php', array( $this, 'init_metabox' ) );
            add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );
        }

    }

    public function init_metabox() {

        add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
        add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

    }

    public function add_metabox() {

        add_meta_box(
            LEAF_PED_META_BOX_ID,
            __( 'PED 8', 'leaf' ),
            array( $this, 'render_metabox' ),
            LEAF_POST_TYPE_PED,
            'advanced',
            'default'
        );

    }

    public function render_metabox( $post ) {
        // Add nonce for security and authentication.
        wp_nonce_field( 'leaf_nonce_action', 'leaf_nonce' );

        // Retrieve an existing value from the database.
        $leaf_expertise = maybe_unserialize( get_post_meta( $post->ID, LEAF_PED_EXPERTISE, true ) );
        if ( empty( $leaf_expertise ) ) {
            $leaf_expertise = [];
        }

        $leaf_location = maybe_unserialize( get_post_meta( $post->ID, LEAF_PED_LOCATION, true ) );
        if ( empty( $leaf_location ) ) {
            $leaf_location = [];
        }

        $leaf_focus = maybe_unserialize( get_post_meta( $post->ID, LEAF_PED_FOCUS, true ) );
        if ( empty( $leaf_focus ) ) {
            $leaf_focus = [];
        }

        $leaf_kind = maybe_unserialize( get_post_meta( $post->ID, LEAF_PED_KIND, true ) );
        if ( empty( $leaf_kind ) ) {
            $leaf_kind = [];
        }

        $leaf_period = maybe_unserialize( get_post_meta( $post->ID, LEAF_PED_PERIOD, true ) );
        if ( empty( $leaf_period ) ) {
            $leaf_period = [];
        }

        $leaf_texts_fields = [];
        foreach ( LEAF_META_TEXTS as $text_field ) {
            $leaf_texts_fields[ $text_field['id'] ] = get_post_meta( $post->ID, $text_field['id'], true );
        }

        // Form fields.
        echo '<table class="form-table">';

        echo '	<tr>';
        echo '		<th><label for="leaf_state" class="leaf_state_label">' . __( 'Expertíza dobrovoľníka', 'leaf' ) . '</label></th>';
        echo '		<td>';
        foreach ( LEAF_META_EXPERTISE as $item ) {
            echo '<label><input type="checkbox" name="' . LEAF_PED_EXPERTISE . '[]" value="' . $item['id'] . '" ' . checked( in_array( $item['id'], $leaf_expertise ), true, false ) . '> ' . $item['name'] . '</label>';
            echo '<br>';
        }
        echo '		</td>';
        echo '	</tr>';

        echo '	<tr>';
        echo '		<th><label for="leaf_state" class="leaf_state_label">' . __( 'Lokalita', 'leaf' ) . '</label></th>';
        echo '		<td>';
        foreach ( LEAF_META_LOCATION as $item ) {
            echo '<label><input type="checkbox" name="' . LEAF_PED_LOCATION . '[]" value="' . $item['id'] . '" ' . checked( in_array( $item['id'], $leaf_location ), true, false ) . '> ' . $item['name'] . '</label>';
            echo '<br>';
        }
        echo '		</td>';
        echo '	</tr>';

        echo '	<tr>';
        echo '		<th><label for="leaf_state" class="leaf_state_label">' . __( 'Zameranie organizácie', 'leaf' ) . '</label></th>';
        echo '		<td>';
        foreach ( LEAF_META_FOCUS as $item ) {
            echo '<label><input type="checkbox" name="' . LEAF_PED_FOCUS . '[]" value="' . $item['id'] . '" ' . checked( in_array( $item['id'], $leaf_focus ), true, false ) . '> ' . $item['name'] . '</label>';
            echo '<br>';
        }
        echo '		</td>';
        echo '	</tr>';

        echo '	<tr>';
        echo '		<th><label for="leaf_state" class="leaf_state_label">' . __( 'Druh organizácie', 'leaf' ) . '</label></th>';
        echo '		<td>';
        foreach ( LEAF_META_KIND as $item ) {
            echo '<label><input type="checkbox" name="' . LEAF_PED_KIND . '[]" value="' . $item['id'] . '" ' . checked( in_array( $item['id'], $leaf_kind ), true, false ) . '> ' . $item['name'] . '</label>';
            echo '<br>';
        }
        echo '		</td>';
        echo '	</tr>';

        echo '	<tr>';
        echo '		<th><label for="leaf_state" class="leaf_state_label">' . __( 'Dĺžka projektu', 'leaf' ) . '</label></th>';
        echo '		<td>';
        foreach ( LEAF_META_PERIOD as $item ) {
            echo '<label><input type="checkbox" name="' . LEAF_PED_PERIOD . '[]" value="' . $item['id'] . '" ' . checked( in_array( $item['id'], $leaf_period ), true, false ) . '> ' . $item['name'] . '</label>';
            echo '<br>';
        }
        echo '		</td>';
        echo '	</tr>';

        foreach ( LEAF_META_TEXTS as $text_field ) {
            echo '	<tr>';
            echo '		<th><label for="' . $text_field['id'] . '" class="leaf_state_label">' . $text_field['name'] . '</label></th>';
            echo '		<td>';
            echo '          <textarea name="' . $text_field['id'] . '">' . $leaf_texts_fields[ $text_field['id'] ] . '</textarea>';
            echo '		</td>';
            echo '	</tr>';
        }

        foreach ( LEAF_META_WYSIWYG as $text_field ) {
            echo '	<tr>';
            echo '		<th><label for="' . $text_field['id'] . '" class="leaf_state_label">' . $text_field['name'] . '</label></th>';
            echo '		<td>';
            $content = get_post_meta( $post->ID, $text_field['id'], true );
            wp_editor( $content, $text_field['id'] );
            echo '		</td>';
            echo '	</tr>';
        }

        echo '</table>';
    }

    public function save_metabox( $post_id, $post ) {
        if ( ! isset( $_POST['leaf_nonce'] ) ) {
            return;
        }

        // Add nonce for security and authentication.
        $nonce_name   = $_POST['leaf_nonce'];
        $nonce_action = 'leaf_nonce_action';

        // Check if a nonce is set.
        if ( ! isset( $nonce_name ) ) {
            return;
        }

        // Check if a nonce is valid.
        if ( ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
            return;
        }

        // Check if the user has permissions to save data.
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // Check if it's not an autosave.
        if ( wp_is_post_autosave( $post_id ) ) {
            return;
        }

        // Check if it's not a revision.
        if ( wp_is_post_revision( $post_id ) ) {
            return;
        }

        $arrays = [ LEAF_PED_EXPERTISE, LEAF_PED_LOCATION, LEAF_PED_FOCUS, LEAF_PED_KIND, LEAF_PED_PERIOD ];
        foreach ( $arrays as $array ) {
            // If the checkbox was not empty, save it as array in post meta
            if ( ! empty( $_POST[ $array ] ) ) {
                update_post_meta( $post_id, $array, $_POST[ $array ] );

                // Otherwise just delete it if its blank value.
            } else {
                delete_post_meta( $post_id, $array );
            }
        }

        foreach ( LEAF_META_TEXTS as $text_field ) {
            update_post_meta( $post_id, $text_field['id'], $_POST[ $text_field['id'] ] );
        }

        foreach ( LEAF_META_WYSIWYG as $text_field ) {
            update_post_meta( $post_id, $text_field['id'], $_POST[ $text_field['id'] ] );
        }
    }

}
