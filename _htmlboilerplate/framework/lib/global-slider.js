(function($) {

    $.globalSlider = function(options){
        var extendDefault = $.extend({}, $.globalSlider.defaults, options);
        $.globalSlider.sliderCreateStructure(extendDefault);
        $.globalSlider.defaults = extendDefault;
    };

    $.globalSlider.sliderCreateStructure = function(extendDefault){

        $(extendDefault.defaultWrapper).each(function() {
             var th = $(this);
             var vItem = th.attr('data-visible-item') != undefined ? parseInt(th.attr('data-visible-item')) : 1;

             var longArea = th.find('.long-area');
             var items = $(this).find('.item');

             if(extendDefault.widthSync)
                $.globalSlider.widthSync(th,items,'padding',vItem);
             else
                $.globalSlider.widthSync(th,items,'width',vItem);
             var itemWidth = $.globalSlider.widthCalc(items.eq(0));
             //items.css({ width : itemWidth});
             items.addClass('passive').first().removeClass('passive').addClass('active');
             if(items.length <= vItem){
                 th.children('.circle-area').addClass('visuallyhidden');
                 th.children('.arrow-area').addClass('visuallyhidden');
             }
             for(var t =0;(items.length / vItem)> t; t++ ){
                 th.find('.circle-area').append('<button type="button" class="circle"></button>');
             }
              th.find('.circle').first().addClass('active');
             if(items.length > 1)
                th.find('.circle-area').children('.circle').off('click').on('click',$.globalSlider.circle);
             longArea.width(itemWidth * items.length);
             var first = items.first().clone();
             var last  = items.last().clone();
             if(vItem == 1){
                longArea.append(first);
                longArea.prepend(last);
             }
             longArea.find('.item').last('passive');
             var leftWidth = vItem > 1 ? 0 : itemWidth;
             longArea.width(itemWidth * (items.length + 2)).css({left : -1 * leftWidth});

             if(extendDefault.Date) {

                 items.each(function() {
                     var it = $(this);
                     var icon = it.attr('data-icons');

                     if(icon == undefined || icon == '')
                         it.children('.icon-wrapper').addClass('visuallyhidden');
                     else
                         it.find('img.icon').attr('src',icon);

                     if(th.find('.text-area').text().length == 0)
                         th.find('.text-area').addClass('visuallyhidden');
                 });

             } else {
                 items.find('.icon-wrapper').addClass('visuallyhidden');
             }
        });

        if(!extendDefault.circleShow)
            $(extendDefault.defaultWrapper).find('.circle-area').addClass('visuallyhidden');

        if(!extendDefault.arrowShow)
            $(extendDefault.defaultWrapper).find('.arrow-area').addClass('visuallyhidden');

        $(extendDefault.defaultWrapper).find('.arrow-right').bind('click',$.globalSlider.next);
        $(extendDefault.defaultWrapper).find('.arrow-left').bind('click',$.globalSlider.prev);

        if(extendDefault.autoPlay){

            $(extendDefault.defaultWrapper).attr('data-auto-play','true').find('.arrow-right').trigger('click');

            if(extendDefault.onHoverPause){
                $(extendDefault.defaultWrapper).bind('mouseenter',$.globalSlider.pause);
                $(extendDefault.defaultWrapper).bind('mouseleave',$.globalSlider.play);
            }
        }

        $(window).bind('resize', $.globalSlider.resize);

    };

    $.globalSlider.next = function(e,item){
        var th;
        if(item == undefined)
           th = $(this);
        else
           th = item;

        var pause = th.parents($.globalSlider.defaults.defaultWrapper).attr('data-pause');
       var circle = th.parents($.globalSlider.defaults.defaultWrapper).attr('data-circle-status');
        var wrapper = th.parents($.globalSlider.defaults.defaultWrapper).find('.long-area');
        var container = wrapper.parents($.globalSlider.defaults.defaultWrapper);
        var vItem = container.attr('data-visible-item') != undefined ? parseInt(container.attr('data-visible-item')) : 1;

        var animSatus = container.attr('data-anim-status');
        if((pause == 'true' || animSatus == 'true') )
            return false;

        var active = wrapper.find('.active');
        var items = wrapper.find('.item');
        var length = wrapper.find('.item').length;
        var width = $.globalSlider.widthCalc(items.eq(0));
        var autoPlay = container.attr('data-auto-play') != undefined;

        var animSpeed =container.attr('data-anim-speed') === undefined  || container.attr('data-anim-speed') === "" ? $.globalSlider.defaults.animateSpeed : parseInt(container.attr('data-anim-speed'));
        container.attr('data-anim-status','true');

        if(vItem == 1) {
            if(length == active.index() +2){
                wrapper.animate({ left : -1 * ((length-1) * width)},animSpeed,function(){
                    wrapper.css({ left : -1 * (width)});
                    active.removeClass('active').addClass('passive');
                    items.eq(1).addClass('active').removeClass('passive');
                    container.attr('data-anim-status','false');
                    container.find('.circle').eq(0).addClass('active').siblings().removeClass('active');
                    if(autoPlay) {
                        setTimeout(function(){
                            if(pause !== 'true')
                                th.trigger('click');
                        }, $.globalSlider.defaults.autoPlayTime);
                    }
                });
            }else {
                var calcWidth = (active.index() + 1) * width < 1 ? 0 : (active.index() + 1) * width;
                wrapper.animate({ left : -1 * calcWidth },animSpeed,function(){
                    active.removeClass('active').addClass('passive');
                    items.eq(active.index() + 1).addClass('active').removeClass('passive');
                    container.find('.circle').last().addClass('active').siblings().removeClass('active');
                    container.attr('data-anim-status','false');
                });
            }


        } else {
            if(active.index() < length  ){
                var calcWidth = (active.index() + 1) * width > length *width - vItem * width ? length *width - vItem * width : (active.index() + 1) * width;
                if((active.index() + 1) * width > length *width - vItem * width){
                    container.attr('data-anim-status','false');
                    return false;
                }

                wrapper.animate({ left : -1 * calcWidth },animSpeed,function (){
                    var newIndex = active.index()  > length - 1 ? length -1 : active.index() + 1;
                    active.removeClass('active').addClass('passive');
                    items.eq(newIndex).addClass('active').removeClass('passive');
                    container.attr('data-anim-status','false');
                    //container.find('.circle').eq(newIndex).addClass('active').siblings().removeClass('active');
                    if(autoPlay) {
                        setTimeout(function(){
                            if(pause !== 'true')
                                th.trigger('click');
                        }, $.globalSlider.defaults.autoPlayTime);
                    }
                });

            } else {
                container.attr('data-anim-status','false');
            }
        }


    };

    $.globalSlider.prev = function(){

        var th = $(this);
        var wrapper = th.parents($.globalSlider.defaults.defaultWrapper).find('.long-area');
        var active = wrapper.find('.active');
        var items = wrapper.find('.item');
        var length = wrapper.find('.item').length;
        var width = $.globalSlider.widthCalc(items.eq(0));
        var container = wrapper.parents($.globalSlider.defaults.defaultWrapper);
        var animSatus = container.attr('data-anim-status');
        if(animSatus == 'true')
            return false;


        container.attr('data-anim-status','true');
        var animSpeed =container.attr('data-anim-speed') === undefined  || container.attr('data-anim-speed') === "" ? $.globalSlider.defaults.animateSpeed : parseInt(container.attr('data-anim-speed'));
        var vItem = container.attr('data-visible-item') != undefined ? parseInt(container.attr('data-visible-item')) : 1;

        if( vItem == 1 )
        {
            if(active.index() == 1){
                wrapper.animate({ left : 0 },animSpeed,function(){
                    wrapper.css({ left : -1 * (width * (length-2))});
                    items.eq((length-2)).addClass('active').removeClass('passive');
                    active.removeClass('active').addClass('passive');
                    container.find('.circle').last().addClass('active').siblings().removeClass('active');
                    container.attr('data-anim-status','false');
                });
            } else {
                var calcWidth = (active.index() - 1) * width < length ? 0 : (active.index() - 1) * width;
                wrapper.animate({ left : -1 * calcWidth },animSpeed,function(){
                    active.removeClass('active').addClass('passive');
                    items.eq(active.index() - 1).addClass('active').removeClass('passive');
                    container.find('.circle').last().addClass('active').siblings().removeClass('active');
                    container.attr('data-anim-status','false');
                });
            }

        } else {
            if(0 < active.index() ){
                var calcWidth = (active.index() - 1) * width < 0  ? 0 : (active.index() - 1) * width;
                console.log(calcWidth);
                wrapper.animate({ left : -1 * calcWidth},animSpeed,function(){
                    container.attr('data-anim-status','false');
                    var newIndex = active.index()  < 0 ? 0 : active.index() - 1;
                    items.eq(newIndex).addClass('active').removeClass('passive');
                    active.removeClass('active').addClass('passive');
                    container.find('.circle').eq(newIndex).addClass('active').siblings().removeClass('active');
                });
            } else {
                container.attr('data-anim-status','false');
            }
        }
    };

    $.globalSlider.widthCalc = function(t){
        if(t[0] == undefined)
            return false;
        var marginLeft = t.css('margin-left').numberControl();
        var marginRight = t.css('margin-right').numberControl();
        var paddingLeft =  t.css('padding-left').numberControl();
        var paddingRight =  t.css('padding-right').numberControl();

        var result = marginLeft + marginRight + paddingLeft + paddingRight + t.width();
        return result;
    };

    $.globalSlider.widthSync = function(first,last,action,vItem){

        var calc = 0;
        if(action == 'margin' || action == undefined || action == null){
            calc  += first.css('margin-left').numberControl();
            calc  += first.css('margin-right').numberControl();
        }
        if(action == 'padding' || action == undefined || action == null){
            last.css('margin-right',first.css('padding-right'));
            last.css('margin-left',first.css('padding-left'));
            last.css('margin-top',first.css('padding-top'));
            last.css('margin-bottom',first.css('padding-bottom'));
            var top = first.css('padding-top').numberControl();
            var bottom = first.css('padding-bottom').numberControl();

            last.height(last.height() - (top + bottom));
        }
        last.width( (first.width() + calc) / vItem);
    };

    $.globalSlider.resize = function() {

        $($.globalSlider.defaults.defaultWrapper).each(function() {
            var th = $(this);
            var resize = th.attr('data-resize') != undefined ? th.attr('data-resize').toLowerCase() == 'true' ? true : false : true;
            if(resize){
                var vItem = th.attr('data-visible-item') != undefined ? parseInt(th.attr('data-visible-item')) : 1;

                var longArea = th.parents($.globalSlider.defaults.defaultWrapper).find('.long-area');
                var items = th.find('.item');

                $.globalSlider.widthSync(th,items,null,vItem);
                var active = longArea.find('.active');
                var itemWidth = $.globalSlider.widthCalc(items.eq(0));
                longArea.css({width : (items.length + 1) * itemWidth});
                longArea.css({ left : -1 * (active.index() * itemWidth)});
            }
        });
    };

    String.prototype.numberControl = function(){
        var result = 0;
        if(this !=undefined && this !=null && !isNaN(parseInt(this)))
            result = parseInt(this);

        return result;

    };

    $.globalSlider.defaults = {
        defaultWrapper : '.slider-wrapper',
        circleShow : false,
        arrowShow : true,
        animateSpeed : 2500,
        autoPlay : true,
        onHoverPause : true,
        autoPlayTime : 3000,
        widthSync : true,
        Date : false
    };

    $.globalSlider.contains = {
        clear             : -1
    };

    $.globalSlider.pause = function(){
        var th = $(this);
        th.attr('data-pause','true');
    };

    $.globalSlider.play = function(){
        var th = $(this);
        th.attr('data-pause','false').find('.arrow-right');
        $.globalSlider.next(null,th.find('.arrow-right'));
    };

    $.globalSlider.circle = function(){
        var th = $(this);
        var pause = th.parents($.globalSlider.defaults.defaultWrapper).attr('data-pause');
        var wrapper = th.parents($.globalSlider.defaults.defaultWrapper).find('.long-area');
        var container = wrapper.parents($.globalSlider.defaults.defaultWrapper);
        var animSatus = container.attr('data-anim-status');
        if(animSatus == 'true')
            return false;

        var active = wrapper.find('.active');
        var items = wrapper.find('.item');
        var width = $.globalSlider.widthCalc(items.eq(0));
        var vItem = container.attr('data-visible-item') != undefined ? parseInt(container.attr('data-visible-item')) : 1;

        var newIndex = vItem == 1 ? th.index() + 1 : th.index() +1;
        var animSpeed =container.attr('data-anim-speed') === undefined  || container.attr('data-anim-speed') === "" ? $.globalSlider.defaults.animateSpeed : parseInt(container.attr('data-anim-speed'));
        container.attr('data-anim-status','true').attr('data-circle-status','true');
        wrapper.stop().animate({ left : -1 * (Math.floor(newIndex/vItem) * width)},animSpeed,function(){
            items.eq(newIndex).addClass('active').removeClass('passive');
            th.siblings('.active').removeClass('active');
            th.addClass('active');
            active.removeClass('active').addClass('passive');
            container.attr('data-anim-status','false').attr('data-circle-status','false')
        });


    };

})(jQuery);