/*
*
******** 09-05-2014 *********
* linkAttr - Calistirildi. (Bug Fix)
* autoSelect - Calistirildi. (Bug Fix)
*
* Versiyon 2.00
*
* Update: Page loading removeClass hidden on hiddenDiv.
*
* */


(function($) {

    $.globalDropDown = function(options){
        var extendDefault = $.extend({}, $.globalDropDown.defaults, options);
        $.createStructure(extendDefault);
    };

    $.createStructure = function(extendDefault){

        var selector = $(extendDefault.selector);
        var selectorLength = selector.length;

        if(selectorLength == 1){

            selector.addClass('global-customDropDown-style');

            if(extendDefault.animate){
                selector.children('.hiddenDiv').attr('data-anim','true');
                selector.children('.hiddenDiv').attr('data-animspeed',extendDefault.animateSpeed);
                selector.children('.hiddenDiv').attr('data-height',extendDefault.height);
            }

            if(extendDefault.activeClass)
                selector.children('.hiddenDiv').attr('data-active','true');

            if(!extendDefault.autoDraggerLength){
                selector.children('.hiddenDiv').attr('data-arrow','false');
            }
            if(extendDefault.labelActive){
                selector.children('.hiddenDiv').attr('data-label-active','true');
            }

            if(!extendDefault.scrollSelector)
                selector.children('.hiddenDiv').attr('data-scroll','false');

            if(extendDefault.lastClass)
                $(extendDefault.selector + ' li:last').addClass(extendDefault.lastClass);

            if(extendDefault.linkAttr){
                selector.attr('data-linkAttr',extendDefault.linkAttr);
            }
            if(extendDefault.targetAttr){
                selector.attr('data-targetAttr',extendDefault.targetAttr);
            }
            if(extendDefault.autoSelect){
                selector.attr('data-auto',extendDefault.autoSelectEq).attr('data-isAutoEq',extendDefault.isAutoSelectEq);
            }

            selector.find('.global-dropDownSpan').attr('data-place', selector.find('.global-dropDownSpan').html());

        }else{
            for(var j = 0; selectorLength > j;j++)
            {
                $(selector[j]).addClass('global-customDropDown-style');


                if(extendDefault.animate){
                    $(selector[j]).children('.hiddenDiv').attr('data-anim','true');
                    $(selector[j]).children('.hiddenDiv').attr('data-animspeed',extendDefault.animateSpeed);
                    $(selector[j]).children('.hiddenDiv').attr('data-height',extendDefault.height);
                }
                if(extendDefault.activeClass)
                    $(selector[j]).children('.hiddenDiv').attr('data-active','true');

                if(!extendDefault.scrollSelector)
                    $(selector[j]).children('.hiddenDiv').attr('data-scroll','false');

                if(!extendDefault.autoDraggerLength){
                    $(selector[j]).children('.hiddenDiv').attr('data-arrow','false');
                }

                if(extendDefault.labelActive){
                    $(selector[j]).children('.hiddenDiv').attr('data-label-active','true');
                }

                if(extendDefault.lastClass){
                    $(selector[j]).children('.hiddenDiv').children('ul').children('li:last').addClass(extendDefault.lastClass);
                }

                if(extendDefault.linkAttr){
                    $(selector[j]).attr('data-linkAttr',extendDefault.linkAttr);
                }
                if(extendDefault.targetAttr){
                    $(selector[j]).attr('data-targetAttr',extendDefault.targetAttr);
                }

                if(extendDefault.autoSelect){
                    $(selector[j]).attr('data-auto',extendDefault.autoSelectEq).attr('data-isAutoEq',extendDefault.isAutoSelectEq);
                }

                $(selector[j]).find('.global-dropDownSpan').attr('data-place', $(selector[j]).find('.global-dropDownSpan').html());
            }
        }
        
        selector.removeClass('hidden').find('.hiddenDiv').removeClass('hidden');
        $(document).on('click', extendDefault.selector + ' label', $.globalDropDown.open);
        $(document).on('click', extendDefault.selector + ' .hiddenDiv li', $.globalDropDown.chose);
        $('html').on('click', $.globalDropDown.close);
        $(document).on('keypress', $.globalDropDown.keyWatch);
        if(extendDefault.fill){
            $.globalDropDown.fill(extendDefault);
        }

    };

    $.globalDropDown.open = function(){
        var th = $(this).siblings('.hiddenDiv');

        if(th.find('li').length == 0)
            return false;

        if (th.parent().hasClass('disabled'))
            return false;

        if(th.parent().hasClass('active')){
            $.globalDropDown.clear();
            return false;
        }

        $.globalDropDown.clear();

        if(th.attr('data-anim')){
            var animateSpeed = parseInt(th.attr('data-animspeed'));
            var heightDiv = parseInt(th.attr('data-height'));
            th.animate({height : heightDiv },animateSpeed);
        }else
            th.addClass('active');

        if(th.attr('data-scroll') == null){
            var arrow = true;
            if(th.attr('data-arrow') != null)
                arrow = false;
            th.mCustomScrollbar("destroy");
            th.mCustomScrollbar({
                autoDraggerLength : arrow,
                mouseWheelPixels: "50"
            });
        }
        if(th.attr('data-active')){
            th.parent('div').addClass('active');
        }

        if(th.attr('data-label-active')){
            th.siblings('label').addClass('active');
        }

        var label  = th.parent().find('.global-dropDownLabel');
        $.event.trigger('dd-open', [label,$(this),th.parent()]);
        return false;
    };

    $.globalDropDown.chose = function(){

        var th = $(this).parents('.hiddenDiv');

        if($(this).attr(th.parent().attr('data-linkAttr')) != '' && $(this).attr(th.parent().attr('data-linkAttr')) != undefined){
            location.href = $(this).attr(th.parent().attr('data-linkAttr'));
            return false;
        }
        th.siblings('label').children('span.global-dropDownSpan').html($(this).html());

        th.siblings('input[type=hidden]').val($(this).attr($.globalDropDown.defaults.targetAttr));

        if (th.attr('data-anim')) {
            var animateSpeed = parseInt(th.attr('data-animspeed'));
            th.animate({height : 0 },animateSpeed);
        }else
            th.removeClass('active');

        if(th.attr('data-active')){
            th.parent('div').removeClass('active');
        }
        if(th.attr('data-label-active'))
            th.siblings('label').removeClass('active');


        $.event.trigger('dd-change', [$(this).attr('data-id'),th.parent(),$(this)]);

    };

    $.globalDropDown.clear = function() {
        var selector = $($.globalDropDown.contains.defaultSelector);
        var selectorLength = selector.length;
        if (selectorLength > 0) {
            for (var j = 0; selectorLength > j; j++) {

                if ($(selector[j]).children('.hiddenDiv').attr('data-anim')) {
                    $(selector[j]).children('.hiddenDiv').animate({ height: 0 }, $(selector[j]).children('.hiddenDiv').attr('data-animspeed'));
                } else {
                    $(selector[j]).children('.hiddenDiv').removeClass('active');
                }

                if ($(selector[j]).children('.hiddenDiv').attr('data-active')) {
                    $(selector[j]).children('.hiddenDiv').parent('div').removeClass('active');
                }
                if ($(selector[j]).children('.hiddenDiv').attr('data-label-active'))
                    $(selector[j]).children('.hiddenDiv').siblings('label').removeClass('active');


            }
        } else {
            if (selector.children('.hiddenDiv').attr('data-anim')) {
                selector.children('.hiddenDiv').animate({ height: 0 }, selector.children('.hiddenDiv').attr('data-animspeed'));
            } else {
                selector.children('.hiddenDiv').removeClass('active');
            }
            if (selector.children('.hiddenDiv').attr('data-label-active'))
                selector.children('.hiddenDiv').siblings('label').removeClass('active');

        }

        $.globalDropDown.contains.lastIndex = -1;
        $.globalDropDown.contains.firstSelect = false;
        $.globalDropDown.contains.lastCharacter = '';
    };

    $.globalDropDown.close = function(e){
        if (!$(e.target).is($.globalDropDown.defaults.selector) && !$(e.target).is($.globalDropDown.defaults.selector +' *'))
        {
            $.globalDropDown.clear();
        }
    };

    $.globalDropDown.fill = function(extendDefault){
        $(extendDefault.selector).each(function(){
            var th = $(this);
            var val =  th.find('input').val();
            if(val != '0' && val != ""){
                var text = th.find('ul li[data-id='+val+']');
                th.find('span.global-dropDownSpan').html(text);
            }else{
                if(th.attr('data-auto') != undefined){
                    if(th.attr('data-isAutoEq') == 'true'){
                        th.find('li').eq(parseInt(th.attr('data-auto'))).trigger('click');
                    }
                    else{
                        th.find('li['+th.attr('data-targetAttr')+'="'+th.attr('data-auto')+'"]').trigger('click');
                    }
                }
            }
        });
    };

    $.globalDropDown.keyWatch = function(e){

        var index = -1;
        var count = 0;

        $('.hiddenDiv.active ul li').each(function(){
            var th = $(this);
            if(th.html().substring(0,1).trUpperCase() == String.fromCharCode(e.which).trUpperCase()){
                if(!th.hasClass('active')){

                    if(!$.globalDropDown.contains.firstSelect){
                        $('.hiddenDiv.active ul li').removeClass('active');
                        th.addClass('active');
                        $.globalDropDown.contains.firstSelect = true;
                        index = th.index();
                        th.parents('.hiddenDiv').siblings('label').children('span.global-dropDownSpan').html($(this).html());
                        th.parents('.hiddenDiv').siblings('input[type=hidden]').val($(this).attr('data-id'));
                        $.event.trigger('dd-change', [th.attr('data-id'),th.parents('.hiddenDiv').parent(),th]);

                    }

                    if($.globalDropDown.contains.lastIndex <th.index() || $.globalDropDown.contains.lastCharacter.trUpperCase() != String.fromCharCode(e.which).trUpperCase())
                    {
                        $('.hiddenDiv.active ul li').removeClass('active');
                        th.addClass('active');
                        $.globalDropDown.contains.lastIndex = th.index();
                        $.globalDropDown.contains.lastCharacter = String.fromCharCode(e.which).trUpperCase();
                        $.globalDropDown.contains.firstSelect = false;
                        th.parents('.hiddenDiv').siblings('label').children('span.global-dropDownSpan').html($(this).html());
                        th.parents('.hiddenDiv').siblings('input[type=hidden]').val($(this).attr('data-id'));
                        $.event.trigger('dd-change', [th.attr('data-id'),th.parents('.hiddenDiv').parent(),th]);
                        count++;
                        return false;
                    }

                }
            }
        });

        if(count == 0){
            $.globalDropDown.contains.firstSelect = false;
            $.globalDropDown.contains.lastIndex = index;
        }

        if($.globalDropDown.contains.lastIndex != 0){
            var calHeight = 0;
            var containerHeight = parseInt($('.hiddenDiv.active .mCSB_container').css('height'));
            var scrollBoxHeight = parseInt($('.hiddenDiv.active .mCustomScrollBox').css('height'));
            var rate =  scrollBoxHeight / containerHeight;
            var maxTop = containerHeight - scrollBoxHeight;
            var liSelector  = $('.hiddenDiv.active .mCSB_container > ul > li');
            var totalMargin = 0;

            if(!isNaN(parseInt(liSelector.css('margin-top'))))
                totalMargin += parseInt(liSelector.css('margin-top'));

            if(!isNaN(parseInt(liSelector.css('margin-bottom'))))
                totalMargin += parseInt(liSelector.css('margin-bottom'));

            if(!isNaN(parseInt(liSelector.css('padding-top'))))
                totalMargin += parseInt(liSelector.css('padding-top'));

            if(!isNaN(parseInt(liSelector.css('padding-bottom'))))
                totalMargin += parseInt(liSelector.css('padding-bottom'));

            for(var a = 0; $.globalDropDown.contains.lastIndex > a; a++){
                calHeight += parseInt($(liSelector[a]).css('height')) + totalMargin;
            }

            if(calHeight < maxTop){
                $('.hiddenDiv.active  .mCSB_container').animate({top :  -1 * calHeight},300);
                $('.hiddenDiv.active  .mCSB_dragger').animate({top : calHeight * rate},300);
            } else {
                var maxHeightButton = parseInt($('.hiddenDiv.active  .mCSB_draggerContainer').css('height')) -  parseInt($('.hiddenDiv.active .mCSB_dragger').css('height'));
                $('.hiddenDiv.active  .mCSB_container').animate({top :  -1 * maxTop},300);
                $('.hiddenDiv.active  .mCSB_dragger').animate({top : maxHeightButton},300);
            }
        } else {
            $('.hiddenDiv.active  .mCSB_container').animate({top : 0},300);
            $('.hiddenDiv.active  .mCSB_dragger').animate({top : 0},300);
        }

    };

    $.globalDropDown.defaults = {
        animate             : false,
        targetAttr          : 'data-id',
        linkAttr            : 'data-url',
        selector            : '.global-customDropDown',
        scrollSelector      : '.scroll-drop-down',
        autoSelect          : false,
        height              : 250,
        activeClass         : true,
        lastClass           : true,
        autoDraggerLength   : true,
        labelActive         : true,
        animateSpeed        : 1500,
        autoComplete        : false,
        fill                : false,
        isAutoSelectEq      : true,
        autoSelectEq        : 0
    };

    $.globalDropDown.contains = {
        lastIndex             : -1,
        lastCharacter         : '',
        firstSelect           : false,
        defaultSelector       : '.global-customDropDown-style'
    };

    $.globalDropDown.relClear = function(rel){
        rel.find('span.global-dropDownSpan').html(rel.find('span.global-dropDownSpan').attr('data-place'));
        rel.find('input[type=hidden]').val('');
    };

})(jQuery);