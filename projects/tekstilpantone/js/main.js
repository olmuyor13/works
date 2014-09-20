var PR = {

    init: function() {

        PR.General.init();

    },

    General: {

        init: function(){

            $('body').removeClass('invisible');

            // Placeholder this is IE 7 and higher
            $('input, textarea').placeholder();

            PR.General.FormElements.init();

            PR.General.FormValidator.init();

            PR.General.Modal.init();

            PR.General.Popup.init();

            PR.General.Maps.init();

            PR.General.DropdownMenu.init();

            PR.General.Accordion.init();


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
                PR.General.Popup.rollover();
                PR.General.Popup.hoverOnBox();
                PR.General.Popup.products();
            },

            rollover: function(){
                $('a.products').hover(function(){
                    $('.product-submenu').removeClass('hidden');
                }, function(){

                    setTimeout(function(){
                        if (PR.General.Popup.hoverOnBox()) {
                            $('.product-submenu').removeClass('hidden');
                        } else {
                            $('.product-submenu').addClass('hidden');
                        }
                    },1000);


                });
            },

            hoverOnBox: function(){

                $('.product-submenu').hover(function(){
                    $('.product-submenu').removeClass('hidden');
                    PR.General.Popup.status = true;

                }, function(){
                    $('.product-submenu').addClass('hidden');
                    var default_src = $('img.product-cat-visual').attr('data-default-src');
                  $('img.product-cat-visual').attr('src',default_src);
                    PR.General.Popup.status = false;
                });

                return PR.General.Popup.status;

            },

            products: function(){

                $('.submenu-title-wrap .submenu-item').hover(function(){

                    var th = $(this);
                    var src = th.attr('data-img-src');

                    $('img.product-cat-visual').attr('src',src);

                }, function(){

                  

                });


            }



        },

        FormElements: {

          init: function(){

              // filters
              $('.filter-letters, .req-letters').filterCustom({regex:'[ Ã–Ã¶Ã‡Ã§Ä°Ä±ÄŸÃœÃ¼ÅÅŸa-zA-Z]', live: true});
              $('.filter-numeric, .req-numeric').filterCustom({regex:/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)|(^-?\d*$)/, live: true});

          }

        },

        validateEmail: function(email){

          var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          var valid = emailReg.test(email);

          if(!valid) {
                return false;
            } else {
              return true;
            }
        },


        FormValidator: {

            init: function(){

                $('#searchFormSubmit').formValidator({
                    scope: '#searchForm',
                    onError: function(){
                    },
                    onSuccess: function(){
                        // var serializeData = $('#searchForm').serialize();
                    }
                });


                 $('#footer_contactUsFormSubmit').formValidator({
                    scope: '#footer_contactUsForm',
                    onError: function(){
                    },
                    extraBool: function(){

                        var result = true;

                        if ($('.ebulten-input').val().length > 0){

                          var email = $('.ebulten-input').val();

                          if (!PR.General.validateEmail(email)){
                             $('.eBultenBox').addClass('error-input');
                             $('.ebulten-input').addClass('req-email');
                              result = false;
                          }
                          
                        } else {
                          $('.eBultenBox').removeClass('error-input');
                          $('.ebulten-input').removeClass('req-email');
                        }

                        return result;

                    },
                    onSuccess: function(){
                        // var serializeData = $('#footer_contactUsForm').serialize();
                        alert('Oldu');
                    }
                });

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

        },

        Accordion: {

          init: function(){
            $('.accordion-wrapper .acc-item').on('click',PR.General.Accordion.firstLevelOpen);
            $('.acc-inner-content > li > a').on('click',PR.General.Accordion.secondLevelOpen);
          },

          firstLevelOpen: function(){

            var th = $(this);
            var result = false;

            // Tıklanana atcive atar, kardeşlerinden siler.
            th.addClass('active').siblings().removeClass('active');

            $('ul.second-level').slideUp();

            // Tıklanan item'ın yanında ul varsa, alt menüsü var demektir.
            if (th.next('ul.acc-inner-content').length) {

                if (!th.next('ul.acc-inner-content').is(':visible')){
                   // alt menü açılır.
                  th.next('ul.acc-inner-content').slideDown();
                } else {
                  th.next('ul.acc-inner-content').slideUp();
                }

            } else {
              result = true;
            }

            return result;

            
          },

           secondLevelOpen: function(){

            var th = $(this);
            var result = false;

            // Tıklanan item'ın yanında ul varsa, alt menüsü var demektir.
            if (th.next('ul.second-level').length) {

              if (!th.next('ul.second-level').is(':visible')){
                // alt menü açılır.
                th.next('ul.second-level').slideDown();
                th.addClass('active').parent().siblings().find('a').removeClass('active');

              } else {
                 th.next('ul.second-level').slideUp();
                  $('.acc-inner-content > li > a').removeClass('active');
              }

            } else {
              result = true;
            }

            return result;

           
          }


        }

    }

};

$(document).ready(function(){
    PR.init();
});





