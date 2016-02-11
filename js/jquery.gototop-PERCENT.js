/*
 * jQuery.stickthis v0.1.0
 * https://github.com/alejandromur/gototop
 *
 * Copyright 2016, alejandro@mamutlove.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/**
 *
 *  - HACER VISIBLE AL XX% DEL ALTO DE LA PÄGINA
 *  - O valor directo
 *
 */

(function( $, window, document, undefined ){

    "use strict";

    $.gototop = function(el, options){

        var SCROLL = 0;
        var WINDOW_HEIGHT = 0;
        var PAGE_HEIGHT = 0;
        var PERCENT = 0;
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data('gototop',base);

        base.initialize = function(){
            base.options = $.extend({},$.gototop.defaultOptions, options);
            base.listen();
            base.checkVisibleAt();
        };

        base.checkVisibleAt = function(){
            if( typeof base.options.visibleAt === "string" && base.options.visibleAt.indexOf('%') !== -1 ){
                base.getAbsoluteValue(base.options.visibleAt);
            }
        };

        base.getAbsoluteValue = function(value){
            // CONVERT TO NUMBER
            PERCENT = base.options.visibleAt.replace('%','');
            PERCENT = Number(PERCENT);
            // GET N TO PERCENTAGE
            WINDOW_HEIGHT = window.innerHeight || $(window).outerHeight(true);
            PAGE_HEIGHT = document.getElementsByTagName('body')[0].clientHeight || $("body").outerHeight(true);
            base.options.visibleAt = ((PAGE_HEIGHT-WINDOW_HEIGHT)*PERCENT)/100;
            console.log('VISIBLE AT', base.options.visibleAt);
        };

        base.listen = function(){
            window.addEventListener("scroll", base.getScrollPosition, false);
            base.$el.on("click", { position: base.options.position, duration: base.options.duration}, base.scrolltotop);
        };

        base.getScrollPosition = function(){
            SCROLL = document.body.scrollTop || window.pageYOffset;
            console.log(SCROLL);
            base.checkPosition();
        };

        base.checkPosition = function(){
            if( SCROLL >= base.options.visibleAt ){
                base.$el.addClass(base.options.classname);
            }else{
                base.$el.removeClass(base.options.classname);
            }
        };

        base.scrolltotop = function(event){
        // base.scrolltotop = function(event,position,duration){
            // position = event.data.position || 0;
            // duration = event.data.duration || 750;
            $("html, body").animate({ scrollTop : event.data.position }, event.data.duration);
        };

        base.initialize();

    };

    $.gototop.defaultOptions = {
        position : 50,
        duration : 3000,
        classname : "isvisible",
        visibleAt : 500
    };

    $.fn.gototop = function(options){

        return this.each(function(){
            var gototop = new $.gototop(this,options);
        });
    };

}( jQuery, window, document ));