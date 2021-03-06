<!Doctype html>
<html lang="TR">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" type="text/css" href="https://shumoda.com/html/c/normalize.css">
    <style>
        .video-list-item { width: 330px; height: 90px; margin-bottom: 15px; cursor: pointer; }
        .video-list-item .related-video-link { width: 330px; height: 90px; display: block;  }
        .video-list-item span.thumb-wrap { display: block; width: 120px; height: 90px; margin-right: 8px; float: left; }
        .video-list-item span.video-title { display: block; font: 14px/1.5 Arial; }
        .video-list-item span.thumb-wrap img { display: block; width: 100%; height: 100%; }
        .video-list-item span.video-cat-title { display: block; font: 14px/1.5 Arial; }
        .video-list-item span.view-count {  display: block; font: 12px/1.5 Arial; }
        .video-text-area { width: 196px; float: left; display: block; }

        #contentArea { float: right; width: 330px;  }

        #playerWrapper { width: 640px; position: relative; float: left; margin-left: 15px; }
        .black-bg { width: 100%; height: 100%; position: absolute; z-index: 1; top: 0; left: 0; background: #000; }
        .current-video-title { font: 24px Arial; margin: 7px 0; }

        .get-all { border: 1px solid #aaa; margin: 15px; font: 16px Arial; padding: 3px 5px; }

    </style>
</head>
<body>

<div class="select-cat">
    <button id="turkceList" class="get-all" data-playlist-id="PLzza9l5VHqLSUPqavAh1Gw7HXugNcZIXu">Türkçe Liste</button>
    <button id="myList" class="get-all" data-playlist-id="PLzza9l5VHqLR70MyoTe7jxsS0XftvsKBV">Yabancı Liste</button>
</div>





