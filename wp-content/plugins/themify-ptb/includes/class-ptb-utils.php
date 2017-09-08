<?php

/**
 * Utility class with various static functions
 *
 * This class helps to manipulate with arrays
 *
 * @link       http://themify.me
 * @since      1.0.0
 *
 * @package    PTB
 * @subpackage PTB/includes
 */

/**
 * Utility class of various static functions
 *
 * This class helps to manipulate with arrays
 *
 * @since      1.0.0
 * @package    PTB
 * @subpackage PTB/includes
 * @author     Themify <ptb@themify.me>
 */
class PTB_Utils {

    /**
     * This function add the value to array if it's already not in array
     *
     * @since      1.0.0
     *
     * @param mixed $value The value to add
     * @param array $array The reference of array
     *
     * @return bool Returns true if value added to array and false if value already in array
     */
    public static function add_to_array($value, &$array) {

        if (!in_array($value, $array)) {

            array_push($array, $value);

            return true;
        }

        return false;
    }

    /**
     * This function remove the value from array if it's in array
     *
     * @since      1.0.0
     *
     * @param mixed $value The value to remove
     * @param array $array The reference of array
     *
     * @return bool Returns true if value removed from array and false if value does not exist in array
     */
    public static function remove_from_array($value, &$array) {

        $key = array_search($value, $array);

        if (false !== $key) {

            unset($array[$key]);

            return true;
        }

        return false;
    }

    /**
     * Divides array into segments provided in argument
     *
     * @since 1.0.0
     *
     * @param $array
     * @param int $segmentCount
     *
     * @return array|bool
     */
    public static function array_divide($array, $segmentCount = 2) {
        $dataCount = count($array);
        if ($dataCount == 0) {
            return false;
        }
        $segmentLimit = ceil($dataCount / $segmentCount);
        $outputArray = array_chunk($array, $segmentLimit);

        return $outputArray;
    }

    /**
     * Log array to wp debug file
     *
     * @param array $array
     */
    public static function Log_Array($array) {

        error_log(print_r($array, true));
    }

    /**
     * Log to wp debug file
     *
     * @param string $value
     */
    public static function Log($value) {

        error_log(print_r($value, true));
    }

    /**
     * Returns the current language code
     *
     * @since 1.0.0
     *
     * @return string the language code, e.g. "en"
     */
    public static function get_current_language_code() {
        
        static $language_code = false;
        if($language_code){
            return $language_code;
        }
        if (defined('ICL_LANGUAGE_CODE')) {

            $language_code = ICL_LANGUAGE_CODE;
        } elseif (function_exists('qtrans_getLanguage')) {

            $language_code = qtrans_getLanguage();
        }
        if (!$language_code) {
            $language_code = substr(get_bloginfo('language'), 0, 2);
        }
        $language_code = strtolower(trim($language_code));
        return $language_code;
    }

    /**
     * Returns the site languages
     *
     * @since 1.0.0
     *
     * @return array the languages code, e.g. "en",name e.g English
     */
    public static function get_all_languages() {

        static $languages = array();
        if(!empty($languages)){
            return $languages;
        }
        if (defined('ICL_LANGUAGE_CODE')) {
            $lng = self::get_current_language_code();
            if ($lng == 'all') {
                $lng = self::get_default_language_code();
            }
            $all_lang = icl_get_languages('skip_missing=0&orderby=KEY&order=DIR&link_empty_to=str');
            foreach ($all_lang as $key => $l) {
                if ($lng == $key) {
                    $languages[$key]['selected'] = true;
                }
                $languages[$key]['name'] = $l['native_name'];
            }
        } elseif (function_exists('qtrans_getLanguage')) {

            $languages = qtrans_getSortedLanguages();
        } else {

            $all_lang = self::get_default_language_code();
            $languages[$all_lang]['name'] = '';
            $languages[$all_lang]['selected'] = true;
        }
        return $languages;
    }

    /**
     * Returns the current language code
     *
     * @since 1.0.0
     *
     * @return string the language code, e.g. "en"
     */
    public static function get_default_language_code() {

        global $sitepress;
        static $language_code=false;
        if($language_code!==false){
            return $language_code;
        }
        if (isset($sitepress)) {

            $language_code = $sitepress->get_default_language();
        }

        $language_code = empty($language_code) ? substr(get_bloginfo('language'), 0, 2) : $language_code;
        $language_code = strtolower(trim($language_code));
        return $language_code;
    }

    public static function get_label($label) {
        if (!is_array($label)) {
            return esc_attr($label);
        }
        static $lng=false;
        if($lng===false){
            $lng = self::get_current_language_code();
        }
        $value = '';
        if (isset($label[$lng]) && $label[$lng]) {
            $value = $label[$lng];
        } else {
            static $default_lng=false;
            if($default_lng===false){
                $default_lng = self::get_default_language_code();
            }
            $value = isset($label[$default_lng]) && $label[$default_lng] ? $label[$default_lng] : current($label);
        }
        return esc_attr($value);
    }
    
    
    public static function get_reserved_terms(){

            return array(
                    'attachment',
                    'attachment_id',
                    'author',
                    'author_name',
                    'calendar',
                    'cat',
                    'category',
                    'category__and',
                    'category__in',
                    'category__not_in',
                    'category_name',
                    'comments_per_page',
                    'comments_popup',
                    'custom',
                    'customize_messenger_channel',
                    'customized',
                    'cpage',
                    'day',
                    'debug',
                    'embed',
                    'error',
                    'exact',
                    'feed',
                    'hour',
                    'link_category',
                    'm',
                    'minute',
                    'monthnum',
                    'more',
                    'name',
                    'nav_menu',
                    'nonce',
                    'nopaging',
                    'offset',
                    'order',
                    'orderby',
                    'p',
                    'page',
                    'page_id',
                    'paged',
                    'pagename',
                    'pb',
                    'perm',
                    'post',
                    'post__in',
                    'post__not_in',
                    'post_format',
                    'post_mime_type',
                    'post_status',
                    'post_tag',
                    'post_type',
                    'posts',
                    'posts_per_archive_page',
                    'posts_per_page',
                    'preview',
                    'robots',
                    's',
                    'search',
                    'second',
                    'sentence',
                    'showposts',
                    'static',
                    'subpost',
                    'subpost_id',
                    'tag',
                    'tag__and',
                    'tag__in',
                    'tag__not_in',
                    'tag_id',
                    'tag_slug__and',
                    'tag_slug__in',
                    'taxonomy',
                    'tb',
                    'term',
                    'terms',
                    'theme',
                    'title',
                    'type',
                    'w',
                    'withcomments',
                    'withoutcomments',
                    'year'
            );
    }

}
