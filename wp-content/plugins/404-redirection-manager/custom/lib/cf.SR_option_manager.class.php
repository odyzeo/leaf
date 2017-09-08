<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
if(!class_exists('SR_option_manager')){
class SR_option_manager {

  
    /* General Options ----------------------------------------------- */
    public static function manage_general_options($run_separately=1)
    {
        if(SRP_PLUGINS::get_request()->post('save_general_options')!='' || $run_separately==0)
        {

            SRP_PLUGINS::get_options()->save_post_option_value('404_plugin_status','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_show_redirect_box','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_add_auto_redirect','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_reflect_modifications','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_cache_enable','int');
            if(intval(SRP_PLUGINS::get_request()->post('404_cache_enable'))==0)
            {
                $SR_redirect_cache = new clogica_SR_redirect_cache();
                $SR_redirect_cache->free_cache(1);
            }

            if($run_separately==1)
            {
                SRP_PLUGINS::get_app()->echo_message("General options saved successfully!");
            }
        }
    }

    /* History Options ----------------------------------------------- */
    public static function manage_history_options($run_separately=1)
    {
        if(SRP_PLUGINS::get_request()->post('save_history_options')!='' || $run_separately==0)
        {

            SRP_PLUGINS::get_options()->save_post_option_value('404_history_status','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_history_limit','int');

            if($run_separately==1)
            {
                SRP_PLUGINS::get_app()->echo_message("History options saved successfully!");
            }
        }
    }

    /* clear history ----------------------------------------------- */
    public static function clear_history($blog=0)
    {
        global $wpdb;
        if(SRP_PLUGINS::get_request()->post('clear_history')!='')
        {
            $current_blog=get_current_blog_id();
            if($blog>0)
            {
                $current_blog=$blog;
            }
            $wpdb->query($wpdb->prepare(" delete from " . SR_database::WP_SEO_Redirection_LOG() . " where blog=%s ", $current_blog));
            SRP_PLUGINS::get_app()->echo_message("History cleared successfully!");
        }
    }



    /* 404 Options ----------------------------------------------- */
    public static function manage_404_options($run_separately=1)
    {
        if(SRP_PLUGINS::get_request()->post('save_404_options')!='' || $run_separately==0)
        {

            SRP_PLUGINS::get_options()->save_post_option_value('404_p404_discovery_status','int');
            SRP_PLUGINS::get_options()->save_post_option_value('404_p404_rules','int');

            if($run_separately==1)
            {
                SRP_PLUGINS::get_app()->echo_message("404 options saved successfully!");
            }
        }
    }

    /* clear 404 errors ----------------------------------------------- */
    public static function clear_404_errors($blog=0)
    {
        global $wpdb;
        if(SRP_PLUGINS::get_request()->post('clear_404')!='')
        {
            $current_blog=get_current_blog_id();
            if($blog>0)
            {
                $current_blog=$blog;
            }
            $wpdb->query($wpdb->prepare(" delete from " . SR_database::WP_SEO_404_links() . " where blog=%s ", $current_blog));
            SRP_PLUGINS::get_app()->echo_message("Discovered 404 links cleared successfully!");
        }
    }


    /* Uninstall Options ----------------------------------------------- */
    public static function manage_uninstall_options($run_separately=1)
    {
        if(SRP_PLUGINS::get_request()->post('save_uninstall_options')!='' || $run_separately==0)
        {

            SRP_PLUGINS::get_options()->save_post_option_value('404_keep_data','int');

            if($run_separately==1)
            {
                SRP_PLUGINS::get_app()->echo_message("Uninstall options saved successfully!");
            }
        }
    }


    /* Optimize tables ----------------------------------------------- */
    public static function optimize_tables()
    {
        if(SRP_PLUGINS::get_request()->post('optimize_tables')!='')
        {
            global $wpdb;
            $wpdb->query(" OPTIMIZE TABLE  " . SR_database::WP_SEO_Redirection() . "," . SR_database::WP_SEO_Cache() . "," . SR_database::WP_SEO_Groups() . "," . SR_database::WP_SEO_404_links() . ", " . SR_database::WP_SEO_Redirection_LOG() . " ");
            SRP_PLUGINS::get_app()->echo_message("Database is optimized successfully!");
        }
    }


    /* Manage All Options --------------------------------------------- */
    public static function manage_all_options()
    {
        if(SRP_PLUGINS::get_request()->post('save_all_options')!='')
        {
            self::manage_general_options(0);
            self::manage_history_options(0);
            self::manage_404_options(0);
            self::manage_uninstall_options(0);
            SRP_PLUGINS::get_app()->echo_message("Options saved successfully!");
        }
    }


    /* Reset Options ----------------------------------------------- */
    public static function reset_options()
    {
        if(SRP_PLUGINS::get_request()->post('reset_options')!='')
        {
            SRP_PLUGINS::get_options()->save_option_value('404_plugin_status',1);
            SRP_PLUGINS::get_options()->save_option_value('404_show_redirect_box',1);
            SRP_PLUGINS::get_options()->save_option_value('404_add_auto_redirect',1);
            SRP_PLUGINS::get_options()->save_option_value('404_reflect_modifications',1);
            SRP_PLUGINS::get_options()->save_option_value('404_history_status',1);
            SRP_PLUGINS::get_options()->save_option_value('404_history_limit',30);
            SRP_PLUGINS::get_options()->save_option_value('404_p404_discovery_status',1);
            SRP_PLUGINS::get_options()->save_option_value('404_p404_rules',1);
            SRP_PLUGINS::get_options()->save_option_value('404_keep_data',1);
            SRP_PLUGINS::get_app()->echo_message("Options are updated to default values successfully!");
        }
    }



    /* Option Listener -------------------------------------------------------- */
    public static function option_listener()
    {
        self::manage_general_options();
        self::manage_history_options();
        self::manage_404_options();
        self::manage_uninstall_options();
        self::manage_all_options();
        self::reset_options();
        self::optimize_tables();
        self::clear_history();
        self::clear_404_errors();
    }



    /* get group id ------------------------------------------- */
    public static function get_group_id($name, $type=1)
    {
        global $wpdb;
        $grpID=$wpdb->get_var(" select ID from ". SR_database::WP_SEO_Groups() ." where blog='". get_current_blog_id() ."' and group_type='$type' and group_title='$name' ");
        if(intval($grpID)>0)
        {
            return intval($grpID);
        }else
        {
            return 0;
        }
    }


}}