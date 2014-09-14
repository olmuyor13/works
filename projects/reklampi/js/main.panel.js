var PNL = {

    init: function() {

        PNL.General.init();
        PNL.Tab.init();

    },

    General: {

        init: function(){

            $("#ibanNo").mask("TR99 9999 9999 9999 9999 9999 99",{placeholder:" "});

            PNL.General.FormValidator.init();
        },

        FormValidator: {

            init: function(){


                // If you want to use shake or slideOutRight class, you must to include fe-framework/css/animated.min.css
                $('#bankDataFormSubmit').formValidator({
                    scope: '#bankDataForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#bankDataForm').serialize();
                        return false;
                    }
                });
            }

        }

    },

    Tab: {

        init: function(){

            $('#tabMenu .tab-menu-item:first').addClass('active');
            $('#tabMenu .tab-menu-item').on('click',PNL.Tab.open);

//            $('#tabContent .tab-content-item:first').addClass('active');
//            $('#tabContent .tab-content-item:first').fadeIn();

            $('.tab-content-item.bank-data-content').fadeIn();

        },

        open: function(){

            var th = $(this);
            var index = th.attr('data-tab-index');
            var title = th.attr('data-content-title');
            var source = th.attr('data-title-img');

            $('#tabContentTitleImage').attr('src',source);
            $('#tabContentTitle').html(title);
            $('#tabContentTitle').trUpperCase();

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





