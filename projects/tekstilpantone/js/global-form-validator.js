(function($) {

    $.fn.formValidator = function(options) {

        $(this).click(function() {

            // merge options with defaults
            var merged_options = $.extend({}, $.formValidator.defaults, options);

            // fix for jquery.ufalternative.js
            $(merged_options.scope+' input, '+merged_options.scope+' textarea').each(function () {
                if ($(this).attr('title') && $(this).val() != '' && $(this).attr('title') == $(this).val()) {
                    //$(this).val('');
                }
            });

            var resultObj = $.formValidator(merged_options);
            var result = resultObj.result;

            if (result && jQuery.isFunction(merged_options.onSuccess)) {
                merged_options.onSuccess();
                return false;
            } else if (!result && jQuery.isFunction(merged_options.onError)) {
                merged_options.onError(resultObj);
                return false;
            } else {
                return result;
            }
        });
    };

    $.formValidator = function (merged_options) {

        // result boolean
        var boolValid = true;

        // result error message
        var errorMsg = '';

        // false count
        var falseCount = 0;

        // clean errors
        $(merged_options.scope + ' .error-both, ' + merged_options.scope + ' .error-same, ' + merged_options.scope + ' .error-input').removeClass('error-both').removeClass('error-same').removeClass('error-input');

        // gather inputs & check is valid
        $(merged_options.scope+' .req-email, '+merged_options.scope+' .req-ip-email, '+merged_options.scope+' .req-checked, '+merged_options.scope+' .req-string, '+merged_options.scope+' .req-letters, '+merged_options.scope+' .req-same, '+merged_options.scope+' .req-both, '+merged_options.scope+' .req-numeric, '+merged_options.scope+' .req-date, '+merged_options.scope+' .req-min').each(function() {
            thisValid = $.formValidator.validate($(this),merged_options);
            boolValid = boolValid && thisValid.error;
            if (!thisValid.error) {
                errorMsg  = thisValid.message;
                falseCount++;
            }
        });

        // check extra bool
        if (!merged_options.extraBool()) {
            boolValid = false;
            errorMsg = merged_options.extraBoolMsg;
        }

        // check if there are many errors
        if (falseCount > 1) {
            errorMsg = merged_options.manyErrorMsg;
        }

        // submit form if there is and valid
        if ((merged_options.scope != '') && boolValid) {
            $(merged_options.errorDiv).fadeOut();
        }

        // if there is errorMsg print it if it is not valid
        if (!boolValid && errorMsg != '') {

            var tempErr = (merged_options.customErrMsg != '') ? merged_options.customErrMsg : errorMsg;
            $(merged_options.errorDiv).hide().html(tempErr).fadeIn();

            return { result: boolValid, errorTxt: tempErr };

        } else {

            return { result: boolValid };
        }

    };

    $.formValidator.validate = function(obj,opts) {

        var valAttr = $.trim(obj.val());
        var css = opts.errorClass;
        var mail_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var ip_mail_filter = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
        var numeric_filter = /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/;
        var tmpresult = true;
        var result = true;
        var errorTxt = '';
        var reqClass = opts.reqClass;

        // IF THERE IS A SECOND CLASS TO CHECK IS REQUIRED
        if (reqClass != '' && !obj.hasClass(reqClass) && valAttr == '') {
            result = result && true;
        } else {

            // REQUIRED FIELD VALIDATION
            if (obj.hasClass('req-string')) {
                tmpresult = (valAttr != '') && (valAttr != obj.attr('title'));
                if (!tmpresult) errorTxt = opts.errorMsg.reqString;
                result = result && tmpresult;
            }
            // REQUIRED FIELD VALIDATION
            if (obj.hasClass('req-letters')) {
                tmpresult = (valAttr != '') && (valAttr != obj.attr('title'));
                if (!tmpresult) errorTxt = opts.errorMsg.reqString;
                result = result && tmpresult;
            }
            // REQUIRED CHECK VALIDATION
            if (obj.hasClass('req-checked')) {

                var objName = obj.attr('name');
                tmpresult = false;

                $('[name="'+objName+'"]').each(function() {
                    tmpresult = $(this).is(':checked') || tmpresult;
                });

                if (!tmpresult) errorTxt = opts.errorMsg.reqChecked;
                result = result && tmpresult;
            }
            // SAME FIELD VALIDATION
            if (obj.hasClass('req-same')) {

                tmpresult = true;

                group = obj.attr('rel');
                tmpresult = true;
                $(opts.scope+' .req-same[rel="'+group+'"]').each(function() {
                    if($(this).val() != valAttr || valAttr == '') {
                        tmpresult = false;
                    }
                });
                if (!tmpresult && !opts.silent) {
                    $(opts.scope+' .req-same[rel="'+group+'"]').parent().addClass('error-same');
                    errorTxt = opts.errorMsg.reqSame;
                } else {
                    $(opts.scope+' .req-same[rel="'+group+'"]').parent().removeClass('error-same');
                }

                result = result && tmpresult;
            }
            // BOTH INPUT CHECKING
            // if one field entered, the others should too.
            if (obj.hasClass('req-both')) {

                var group = obj.attr('rel');

                tmpresult = true;

                $(opts.scope+' .req-both[rel="'+group+'"]').each(function() {
                    if($(this).val() == '') {
                        tmpresult = false;
                    }
                });

                if (!tmpresult && !opts.silent) {
                    $('#'+group).addClass('error-both');
                    errorTxt = opts.errorMsg.reqBoth;
                } else {
                    $('#'+group).removeClass('error-both');
                }

                result = result && tmpresult;
            }
            // E-MAIL VALIDATION
            if (obj.hasClass('req-email')) {
                tmpresult = mail_filter.test(valAttr);
                if (!tmpresult) errorTxt = (valAttr == '') ? opts.errorMsg.reqMailEmpty : opts.errorMsg.reqMailNotValid;
                result = result && tmpresult;
            }
            // E-MAIL with IP VALIDATION
            if (obj.hasClass('req-email')) {
                tmpresult = ip_mail_filter.test(valAttr);
                if (!tmpresult) errorTxt = (valAttr == '') ? opts.errorMsg.reqMailEmpty : opts.errorMsg.reqMailNotValid;
                result = result && tmpresult;
            }
            // DATE VALIDATION
            if (obj.hasClass('req-date')) {

                tmpresult = true;

                var arr = valAttr.split(opts.dateSeperator);
                var curDate = new Date();

                if (valAttr == '') {

                    tmpresult = false;

                } else {

                    if (arr.length < 3) {
                        tmpresult = false;
                    } else {
                        tmpresult = (parseInt(arr[0]) <= 31) && (parseInt(arr[1]) <= 12) && (parseInt(arr[2]) <= curDate.getFullYear());
                    }
                }

                if (!tmpresult) errorTxt = opts.errorMsg.reqDate;
                result = result && tmpresult;
            }
            // MINIMUM REQUIRED FIELD VALIDATION
            if (obj.hasClass('req-min')) {
                tmpresult = (valAttr.length >= obj.attr('minlength'));
                if (!tmpresult) errorTxt = opts.errorMsg.reqMin.replace('%1',obj.attr('minlength'));
                result = result && tmpresult;
            }
            // NUMERIC FIELD VALIDATION
            if (obj.hasClass('req-numeric')) {
                tmpresult = numeric_filter.test(valAttr);
                tmpresult = (valAttr != '') && tmpresult;
                if (!tmpresult) errorTxt = opts.errorMsg.reqNum;
                result = result && tmpresult;
            }
        }

        if (obj.attr('rel')) {
            if (result) { $('#'+obj.attr('rel')).removeClass(css); } else if(!opts.silent) { $('#'+obj.attr('rel')).addClass(css); }
        } else {
            if (result) {
                if (opts.errorTarget != '') obj.parents(opts.errorTarget).removeClass(css); else obj.removeClass(css);
            } else {
                if (opts.errorTarget != '') obj.parents(opts.errorTarget).addClass(css); else obj.addClass(css);
            }
        }

        return {
            error: result,
            message: errorTxt
        };
    };

    // CUSTOMIZE HERE or overwrite by sending option parameter
    $.formValidator.defaults = {
        silent      : false,
        onSuccess   : null,
        onError     : null,
        scope       : '',
        errorTarget : '',
        reqClass    : '',
        errorClass  : 'error-input',
        errorDiv    : '#warn',
        errorMsg    :   {
            reqString   : 'Zorunlu alanları doldurmanız gerekmektedir',
            reqChecked  : 'Kullanım koşullarını kabul etmelisiniz',
            reqDate     : 'Tarih değeri geçersiz',
            reqNum      : 'Numara girmelisiniz',
            reqMailNotValid : 'E-Posta <b>geçerli</b> değil!',
            reqMailEmpty  : 'E-posta adresi giriniz',
            reqSame     : 'Şifre alanları aynı <b>değil</b>!',
            reqBoth     : 'İki alanı birden doldurmanız gerekmekte.',
            reqMin      : 'En az  %1 karakter yazmalısınız'
        },
        manyErrorMsg  : 'Lütfen formu eksiksiz doldur.',
        customErrMsg  : '',
        extraBoolMsg  : 'Lütfen formu eksiksiz doldur.',
        dateSeperator : '/',
        extraBool   : function() { return true; }
    };
})(jQuery);
