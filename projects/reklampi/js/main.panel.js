var PNL = {

    init: function() {

        PNL.General.init();
        PNL.Tab.init();
        PNL.ApprovedAction.init();

    },

    General: {

        init: function(){

            // IBAN mask
            $("#ibanNo").mask("TR99 9999 9999 9999 9999 9999 99",{placeholder:" "});

            // Phone mask
            $('#phoneNo').mask("0(999) 999 99 99", { placeholder : '-' });

            PNL.General.FormValidator.init();
        },

        FormValidator: {

            init: function(){

                // Bank Data Form
                $('#bankDataFormSubmit').formValidator({
                    scope: '#bankDataForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#bankDataForm').serialize();
                        // Ajax in there.
                        return false;
                    }
                });

                // User Data Form
                $('#userDataFormSubmit').formValidator({
                    scope: '#userDataForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#userDataForm').serialize();
                        // Ajax in there.
                        return false;
                    }
                });

                // Change Password Form
                $('#changeMyPasswordFormSubmit').formValidator({
                    scope: '#changeMyPasswordForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#changePasswordForm').serialize();
                        // Ajax in there.
                        return false;
                    }
                });

            }

        }

    },

    ApprovedAction: {

        init: function(){
            $('#bankDataApprovedBtn').on('click',PNL.ApprovedAction.success);
        },

        success: function(){
            $('.bank-data-content .approved-row').remove();
            $('.bank-data-content .success-area').addClass('active');
            return false;
        }

    },

    Tab: {

        init: function(){

            $('#tabMenu .tab-menu-item:first').addClass('active');
            $('#tabMenu .tab-menu-item').on('click',PNL.Tab.open);

            $('#tabContent .tab-content-item:first').addClass('active');
            $('#tabContent .tab-content-item:first').fadeIn();

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





