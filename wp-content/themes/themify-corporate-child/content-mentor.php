<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 * @subpackage Kleo
 * @since Kleo 1.0
 */
?>

<!-- Begin Article -->
<article id="post-<?php the_ID(); ?>" <?php post_class(array( 'clearfix' )); ?>>

	<div class="article-content">

	<?php
        
        $mentor_info = get_field('sor_more_info');
        $mentor_linkedin = get_field('sor_mentor_linkedin');
        $mentor_category = get_field('sor_mentor_category');
        $mentor_activity = get_field('sor_mentor_activity');
        $mentor_aboutme = get_field('sor_mentor_aboutme');
        
        ?>
        
        <div id="tg-mentor-single">
        <div id="tg-mentor-search-result">
               
            <div class="tg-mentor">
                <div class="tg-image">
                    <?php if ( has_post_thumbnail() ) { ?>
                          <?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'post-thumbnail' ); ?>
                          <img src="<?php echo $thumb[0]; ?>" alt="<?php echo esc_attr(get_the_title());?>" />
                      <?php } ?>
                </div>
                <div class="tg-desc">
                    <?php if($mentor_linkedin){?>
                    <div class="tg-text"><a class="tg-btn-linkedin" href="<?php echo $mentor_linkedin; ?>" target="_blank"><i class="icon-linkedin-squared"></i> LinkedIn profil</a></div>
                    <?php } ?>
                    <div class="tg-text"><h4><strong>Mám vedomosti alebo skúsenosti z týchto oblastí:</strong></h4>
                        <?php
                        if($mentor_category && $mentor_category != ""){
	                        echo strip_tags($mentor_category, '<ul><li><a>');
                        } else {
                            $terms = wp_get_post_terms(get_the_ID(), Sor::TAXONOMY_TYPE_MENTOR, array('orderby' => 'term_order', 'order' => 'ASC', 'fields' => 'names'));
                            if($terms) {
                                echo '<ul>';
                                foreach($terms as $term){
                                    echo '<li>'.$term.'</li>';
                                }
                                echo '</ul>';
                            }
                        }
                        ?>
                    </div>
                    <div class="tg-text">
                        <?php the_content(); ?>
                    </div>
                    
                    <?php if($mentor_info){ ?>
                    <div class="tg-text">
                        <?php echo $mentor_info; ?>
                    </div>
                    <?php } ?>
                    <div class="tg-text"><h4><strong>Moje aktivity:</strong></h4>
                        <?php echo $mentor_activity; ?>
                    </div>
                    <div class="tg-text"><h4><strong>Čo by o mne mal vedieť môj mentee:</strong></h4>
                        <?php echo $mentor_aboutme; ?>
                    </div>
                    
                </div>
            </div>
	
	   </div>
	   </div>
	
	</div><!--end article-content-->

</article><!--end article-->

