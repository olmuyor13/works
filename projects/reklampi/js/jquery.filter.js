// Filter plugin
(function($){

    $.fn.extend({

        filterCustom: function(options) {

            var defaults = {
                regex:".*",
                live:false
            };

            var options =  $.extend(defaults, options);
            var regex = new RegExp(options.regex);

            function filterCustomFunc(event) {

                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

                // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
                if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {

                    if ($.browser.mozilla) {

                        // if charCode = key & keyCode = 0
                        // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .

                        if (event.charCode == 0 && event.keyCode == key) {
                            return true;
                        }
                    }
                }

                var string = String.fromCharCode(key);
                if (regex.test(string)) {
                    return true;
                } else if (typeof(options.feedback) == 'function') {
                    options.feedback.call(this, string);
                }
                return false;
            }

            if (options.live) {
                $(document).on('keypress paste', this.selector, filterCustomFunc);
            } else {
                return this.each(function() {
                    var input = $(this);
                    input.unbind('keypress').keypress(filterCustomFunc);
                });
            }
        }
    });

})(jQuery);