var PR = {

    init: function() {

        PR.General.init();

    },

    General: {

        init: function(){

            $.globalDropDown();

            // If you used 'transition' effect, use this.
            //$('body').removeClass('invisible');

            // Custom Scrollbar
            $('.scroll-this').mCustomScrollbar();

            // Placeholder this is IE 7 and higher
            $('input, textarea').placeholder();

            // Input Mask this is IE 8 and higher
            //$('#_phone').mask("0(599) 999 99 99", { placeholder : '-' });

            PR.General.FormElements.init();

            PR.General.FormValidator.init();

            PR.General.Modal.init();

            PR.General.Popup.init();

            PR.General.Maps.init();

            PR.General.DropdownMenu.init();


            // // You don't press "space" key.
            $('.no-space').keyup(function(e) {
                if (e.keyCode == 32)
                    return false;
            }).keydown(function(e) {
                    if (e.keyCode == 32)
                        return false;
                });

        },

        Popup: {

            status : true,

            init: function(){

                // Tablet and Mobile
                if ($('body').width() < 1024){
                    PR.General.Popup.rollover();
                    PR.General.Popup.hoverOnBox();
                // Desktop
                } else {
                    $('.sign_in').on('click',PR.General.Popup.toggle);
                }

            },

            rollover: function(){
                $('.sign_in').hover(function(){
                    $('.sign-in-popup').removeClass('hidden');
                }, function(){

                    setTimeout(function(){
                        if (PR.General.Popup.hoverOnBox()) {
                            $('.sign-in-popup').removeClass('hidden');
                        } else {
                            $('.sign-in-popup').addClass('hidden');
                        }
                    },600);


                });
            },

            hoverOnBox: function(){

                $('.sign-in-popup').hover(function(){
                    $('.sign-in-popup').removeClass('hidden');
                    PR.General.Popup.status = true;

                }, function(){
                    $('.sign-in-popup').addClass('hidden');
                    PR.General.Popup.status = false;
                });

                return PR.General.Popup.status;

            },

            toggle: function(){
                $('.sign-in-popup').toggleClass('hidden');
                return false;
            }

        },

        FormElements: {

          init: function(){


              // custom checkbox
              /*
               *
               * Sample usage - HTML:
               *
               * <label for="privacyCheck" class="global-checkbox">
               *     <input type="checkbox" name="privacyCheck" id="privacyCheck" value="1" checked="checked" />
               *     <span class="ck"></span>
               * </label>
               *
               * Sample usage - CSS:
               *
               * label.global-checkbox input          { position: absolute; top: 0; left: 0; opacity: 0; cursor: pointer; }
               * label.global-checkbox span.ck        { cursor:pointer; display: inline-block; width: 16px; height: 16px; background: url("../i/bg-checkbox.png") no-repeat 0 -16px; margin-right: 10px; position: relative; line-height: 25px; }
               * label.global-checkbox span.ck.active { background-position: 0 0; }
               *
               */
              $("label.global-checkbox input[type='checkbox']:checked").siblings("span.ck").addClass("active");
              $("label.global-checkbox input[type='checkbox']").bind('click',function() { $(this).siblings("span.ck").toggleClass("active"); $.event.trigger('checkbox-change', [$(this)]); });

              // custom radiobutton
              /*
               *
               * Sample usage - HTML:
               *
               * <div class="genderChoose">
               *     <label for="imMan" class="global-radiobutton">
               *         <span class="ck"></span>
               *         <input type="radio" name="gender" id="imMan" value="Man" checked />
               *         <span>Man</span>
               *     </label>
               *
               *     <label for="imWoman" class="global-radiobutton">
               *         <span class="ck"></span>
               *         <input type="radio" name="gender" id="imWoman" value="Woman" />
               *         <span>Woman</span>
               *     </label>
               *</div>
               *
               * Sample usage - CSS:
               *
               * label.global-radiobutton input          { position: absolute; top: 0; left: 0; opacity: 0; cursor: pointer; }
               * label.global-radiobutton span.ck        { cursor:pointer; display: inline-block; width: 16px; height: 16px; background: url("../i/bg-radiobutton.png") no-repeat 0 -16px; margin-right: 10px; position: relative; line-height: 25px; }
               * label.global-radiobutton span.ck.active { background-position: 0 0; }
               *
               */
              $("label.global-radiobutton input[type='radio']:checked").siblings("span.ck").addClass("active");
              $("label.global-radiobutton input[type='radio']").bind('click',function() {
                  $(this).parent().siblings('label.global-radiobutton').find('span.ck').removeClass('active');
                  $(this).siblings("span.ck").addClass("active");
                  $.event.trigger('radiobutton-change', [$(this)]);
              });


              // filters
              $('.filter-letters, .req-letters').filterCustom({regex:'[ Ã–Ã¶Ã‡Ã§Ä°Ä±ÄŸÃœÃ¼ÅÅŸa-zA-Z]', live: true});
              $('.filter-numeric, .req-numeric').filterCustom({regex:/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/, live: true});

          }

        },


        FormValidator: {

            init: function(){

                $('#signInFormSubmit').formValidator({
                    scope: '#signInForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#registerForm').serialize();
                    }
                });




                // If you want to use shake or slideOutRight class, you must to include fe-framework/css/animated.min.css
                $('#registerFormSubmit').formValidator({
                    scope: '#registerForm',
                    onError: function(){
                        PR.General.FormValidator.addShake('#registerFormSubmit');
                    },
                    onSuccess: function(){
                        // var serializeData = $('#registerForm').serialize();
                        PR.General.FormValidator.submitForm('#registerForm','#registerFormSubmit');
                    }
                });
            },

            addShake: function(submitBtn){
                $(submitBtn).addClass('shake');
                setTimeout(function() { $(submitBtn).removeClass('shake'); }, 1500);
            },

            submitForm: function(form,submitBtn){
                $(submitBtn).removeClass('shake').addClass('slideOutRight');
                $(form).submit();
            }

        },

        Modal : {

            init: function(){
                $('.mdl-btn').on('click',PR.General.Modal.open);
                $('.close-btn').on('click',PR.General.Modal.close);
                // Escape event has to be declared so that when modal closes and if is not target modal, close modal.
                $('html').on('click',PR.General.Modal.allClose).on('keyup',function(e){ e.keyCode == 27 ? PR.General.Modal.close() : false });
            },

            open: function(){
                PR.General.Modal.close();
                var modalID = $(this).attr('data-modal-id');
                $('#mainModal').removeClass('visuallyhidden').children('div.modal[data-modal-rel="'+modalID+'"]').removeClass('visuallyhidden');
                $('.scroll-this').mCustomScrollbar("destroy");
                $('.scroll-this').mCustomScrollbar();
                //FB.Canvas.scrollTo(0,0);
                return false;
            },

            close: function(){
                $('#mainModal, .modal').addClass('visuallyhidden');
            },

            allClose: function(e){
                (!$(e.target).is('.modal') && !$(e.target).is('.modal *')) ? PR.General.Modal.close() : false;
            }

        },

        Maps : {

            init: function(){

                if ($('#googleMap').length){

                    function initialize()  {
                        var mapProp = {
                            center:new google.maps.LatLng(41.08742,29.120850),
                            zoom:10,
                            mapTypeId:google.maps.MapTypeId.ROADMAP
                        };
                        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                    }

                    google.maps.event.addDomListener(window, 'load', initialize);

                }

            }

        },

        DropdownMenu : {

            init: function() {
                $('.menu-icon').click(function() {
                   $('#dropdownMenu').toggleClass('active');
                    return false;
                });
            }

        }

    }

};

$(document).ready(function(){
    PR.init();
});





