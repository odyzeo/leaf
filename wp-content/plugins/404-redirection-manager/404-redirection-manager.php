<?php
/*
    Plugin Name: 404 to 301 SEO Redirection
    Plugin URI: http://www.clogica.com/product/seo-redirection-premium-wordpress-plugin
    Description: Manage all your 404 errors and more ..
    Version: 1.3
    Author: Fakhri Alsadi
    Author URI: http://www.clogica.com
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
    define('SR_PLUGIN_NAME', '404 to 301 SEO Redirection');
    
    require_once "cf/build.2.php";
    require_once "SRP_PLUGINS.php";
    require_once "custom/installer.php";
    require_once "custom/lib/cf.SR_redirect_cache.class.php";
    require_once "custom/lib/cf.SR_database.class.php";
    require_once "custom/lib/cf.SR_option_manager.class.php";
    require_once "custom/lib/cf.SR_redirect_manager.class.php";
    require_once "custom/lib/cf.SR_plugin_menus.class.php";
    
    SRP_PLUGINS::init('wp-seo-redirection-group', __FILE__);
    
    SR_plugin_menus::init();
    SR_plugin_menus::hook_menus();

    seo_redirection_installer::set_version("1.0");
    seo_redirection_installer::hook_installer();

    SR_redirect_manager::hook_redirection();
    
   