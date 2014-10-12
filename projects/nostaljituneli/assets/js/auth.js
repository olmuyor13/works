// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

/*$('#search-button').on('click',searchVideo);

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    //var responseString = JSON.stringify(response, '', 2);
    //$('#response-container').html(responseString);

    var str = JSON.stringify(response.result,null, " ");
    // $('#response-container').html('<pre>' + str + '</pre> <br />');

    str = JSON.parse(str);

    var dizi = str.items;

    for (var i = 0; i < dizi.length; i++) {

        // videoId var ise
        var videoId = dizi[i].id.videoId;
        if ( videoId != undefined ) {
            console.log('videoid:'+videoId);
        }

        // title var ise
        var title = dizi[i].snippet.title;
        if ( title != undefined ) {
            console.log('title:'+title);
        }

        // url var ise
        var url = dizi[i].snippet.thumbnails.medium.url;
        if ( url != undefined ) {
            console.log('url:'+url);
        }

        if (videoId && title && url){
            var elem = '<div class="item">' +
                            '<h2 class="title">'+title+'</h2>' +
                            '<img width="300" height="300" src="'+url+'" />' +
                            '<iframe width="300" height="300" src="http://www.youtube.com/embed/'+videoId+'"></iframe>' +
                        '</div>';

            $('.content').append(elem);
        }

    }

    PR.data = str;

}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');

}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}


function searchVideo() {

    $('.content').empty();

    // Use the JavaScript client library to create a search.list() API call.
   *//* var request = gapi.client.youtube.search.list({
        q: $('#query').val(),
        part: 'snippet',
        type: 'channel'
    });*//*

    var request = channels.list(part="id", forUsername="username");

    //channels.list(part="id", forUsername="username")

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);

}*/














/*setTimeout(function(){
    $('#search-button').trigger('click');
},1000);*/




