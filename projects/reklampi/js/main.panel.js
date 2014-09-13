var PNL = {

    init: function() {

        PNL.General.init();

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

    }

};

$(document).ready(function(){
    PNL.init();
});





