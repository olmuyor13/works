/*
 * 	Tab Plugin v1 - jQuery plugin
 *	written by Kenan YILDIZ
 *
 *	Copyright (c) 16.09.2013 Kenan YILDIZ
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

/*
 *	Sample usage $(".global-tab-wrapper").globalTab();
 *
 *  default data-mode="show"
 *	data-mode="slide" or data-mode="fade" or data-mode=""
 *
 * 	<div class="global-tab-wrapper" data-mode="show" data-active-class="active">
 *       <div class="global-tab-nav">
 *          <a class="m" data-index="1" href="#">1</a>
 *          <a class="m" data-index="2" href="#">2</a>
 *          <a class="m" data-index="3" href="#">3</a>
 *       </div>
 *       <div class="global-tab-container">
 *          <div class="global-tab-content" data-index="1">1. Content Area</div>
 *          <div class="global-tab-content" data-index="2">2. Content Area</div>
 *          <div class="global-tab-content" data-index="3">3. Content Area</div>
 *       </div>
 *  </div>
 *
 *   // Default Stylesheet
 * 	.global-tab-wrapper 						 { width: 300px; }
 *  .global-tab-wrapper .global-tab-nav 			 { margin-bottom: 10px; }
 *  .global-tab-wrapper .global-tab-nav a.m   	 { display: inline-block; padding: 10px 20px; font: 20px Arial; border: 1px solid grey; background: black; text-align: center; text-decoration: none; color: white; }
 *  .global-tab-wrapper .global-tab-nav a.m.active { color: black; background: white }
 *  .global-tab-wrapper .global-tab-content        { width: 180px;  border: 1px solid #AAA; background: yellowgreen; padding: 30px; font: 16px Arial;}
 *
 */

(function($){

    $.globalTab = {};

    $.fn.globalTab = function(options){
        var th = $(this);
        var opts = $.extend({}, $.globalTab.defaults, options);
        $.createStructureTab(opts,th);
    };

    $.createStructureTab = function(opts,th){
        var selector = $(th);
        selector.each(function(){
            var th = $(this);
            var active = th.data('active-class');
            th.find('.global-tab-nav a.m[data-index="1"]').addClass(active);
            th.find('.global-tab-container .global-tab-content[data-index="1"]').addClass(active);
            th.find('.global-tab-container .global-tab-content:not([data-index="1"])').hide();
            th.find('.global-tab-nav a.m').attr('data-selector',selector.attr('class')).attr('data-active-class',active).on('click', $.globalTab.open);
        });
    };

    $.globalTab.open = function() {

        var th           = $(this);
        var active       = th.attr('data-active-class');
        var dataSelector = th.attr('data-selector');
        var mode         = th.parents('.'+dataSelector).attr('data-mode');
        var indis        = th.attr('data-index');
        var container    = th.parent('.global-tab-nav').siblings('.global-tab-container');

        th.addClass(active).siblings('a.m').removeClass(active);

        if ( !mode || mode == "show" || mode == undefined ) {

            container.find('.global-tab-content').hide();
            container.find('.global-tab-content[data-index='+indis+']').show();

        } else if ( mode == 'fade' ) {

            container.find('.global-tab-content').hide();
            container.find('.global-tab-content[data-index='+indis+']').fadeIn();

        } else if ( mode == 'slide' ) {

            container.find('.global-tab-content').slideUp();
            container.find('.global-tab-content[data-index='+indis+']').slideDown();

        }

        return false;

    };

}) (jQuery);
