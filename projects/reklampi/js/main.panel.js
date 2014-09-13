var PNL = {

    init: function() {

        PNL.General.init();
        PNL.Tab.init();

    },

    General: {

        init: function(){

        },

        FormValidator: {

            init: function(){


                // If you want to use shake or slideOutRight class, you must to include fe-framework/css/animated.min.css
                $('#registerFormSubmit').formValidator({
                    scope: '#registerForm',
                    onError: function(){
                        PNL.General.FormValidator.addShake('#registerFormSubmit');
                    },
                    onSuccess: function(){
                        // var serializeData = $('#registerForm').serialize();
                        PNL.General.FormValidator.submitForm('#registerForm','#registerFormSubmit');
                    }
                });
            }

        }

    },

    Tab: {

        init: function(){
            $('#tabMenu .tab-menu-item').on('click',PNL.Tab.open);
        },

        open: function(){

            var th = $(this);
            var index = th.attr('data-tab-index');
            var title = th.attr('data-content-title');
            var source = th.attr('data-title-img');

            $('#tabContentTitleImage').attr('src',source);
            $('#tabContentTitle').html(title);

            th.addClass('active');
            th.fadeIn();
            th.parent().siblings().children().removeClass('active');

            var tabContent = $('#tabContent');
            tabContent.children('.tab-content-item').removeClass('active');
            tabContent.children('.tab-content-item').fadeOut();
            tabContent.children('.tab-content-item[data-tab-index="'+index+'"]').addClass('active');
            tabContent.children('.tab-content-item[data-tab-index="'+index+'"]').fadeIn();

            return false;
        }

    }

};

$(document).ready(function(){
    PNL.init();
});





