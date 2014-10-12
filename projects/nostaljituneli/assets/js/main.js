var PR = {

    VideoID: 0,

    data: null,

    init: function() {
        PR.Video.init();
    },

    Video : {

        player: [],

        init: function(){

            $('.disabled').on('click', function(){ return false; });

            //PR.Video.createVideo();
            PR.Video.getAll($('.get-all').eq(0).attr('data-playlist-id'));
            PR.Video.getAll($('.get-all').eq(1).attr('data-playlist-id'));

            $('.get-all').on('click',function(){
                PR.Video.getAll($(this).attr('data-playlist-id'));
                return false;
            });

            $(document).on('click', '.video-list-item', function(){
                 $('.black-bg').fadeIn();
                 var id      = $(this).attr('data-video-id');
                 var title   = $(this).find('.video-title').attr('data-feed-title');
                 PR.Video.createVideo(id,title);
                 return false;
            });

        },

        getAll: function(playListID){

            if ( !$('.get-all').hasClass('disabled') ) {

                $('.get-all').addClass('disabled');

                // Playlist
                var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+playListID+'?v=2&alt=json&callback=?';
                var embedURL    = 'http://www.youtube.com/embed/';

                $.getJSON(playListURL, function(data) {

                    var i = 0;

                    var list_data = "";

                    $.each(data.feed.entry, function(i, item) {

                        var feedTitle   = item.title.$t;
                        var feedURL     = item.link[1].href;
                        var viewCount   = Number(item.yt$statistics != undefined && item.yt$statistics.viewCount != undefined ? item.yt$statistics.viewCount : 0);
                            viewCount   = PR.Video.slice(viewCount);
                        var fragments   = feedURL.split("/");
                        var videoID     = fragments[fragments.length - 2];
                        var url         = embedURL + videoID;
                        var thumb       = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";
                        list_data +=    '<li class="video-list-item" data-video-id="'+videoID+'">' +
                                            '<div class="related-video-box">' +
                                                '<span class="thumb-wrap">' +
                                                    '<img src="'+thumb+'" alt=""/>' +
                                                '</span>' +
                                                '<span class="video-text-area">' +
                                                    '<span data-feed-title=\''+feedTitle+'\' class="video-title">'+feedTitle+'</span>' +
                                                    '<span class="video-cat-title"></span>' +
                                                    '<span class="view-count">'+viewCount+'</span>' +
                                                '</span>' +
                                            '</div>' +
                                        '</li>';

                        // Son item'da olduğunun kontrolü
                        if ( i == data.feed.entry.length-1 ) {
                            $('.get-all').removeClass('disabled');
                        }

                    });

                    $('#contentArea').empty();
                    $(list_data).appendTo("#contentArea");

                    var firstItemID     = $('.video-list-item:first').attr('data-video-id');
                    var firstItemTitle  = $('.video-list-item:first .video-title').attr('data-feed-title');
                    PR.Video.createVideo(firstItemID,firstItemTitle);

                });

            }

        },

        createVideo : function(videoID,firstItemTitle) {

            var embedURL    = 'http://www.youtube.com/embed/'+videoID+'';
            $('#playerWrapper h2').html(firstItemTitle);
            $('#playerWrapper iframe').attr('src',embedURL);
            $('.black-bg').hide();
            return false;

        },

        slice: function(viewCount){

            var viewCount = JSON.stringify(viewCount);
            var sep = '.';
            var len = viewCount.length;
            var numberArr = '';

            if (len > 3) {

                for (var i = 0; i < len; i=i+3) {
                    numberArr += viewCount.slice(i,i+3) + sep;
                }

                var newLength   = numberArr.length;
                numberArr       = numberArr.slice(0,newLength-1) + ' Görüntülenme';
            } else {
                numberArr = viewCount;
            }

            return numberArr;

         }

    }

};


// Yedek - var playListURL = 'http://gdata.youtube.com/feeds/api/users/UCdE6PZoEw-T3hDamPq6Z_0g?v=2.1&alt=json';




