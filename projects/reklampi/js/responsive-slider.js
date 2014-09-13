$(function(){

	var slider = $('.slider'),
		list = slider.find('ul.slider_liste'),
		length = list.find('li').length,
		width = slider.outerWidth(),
		totalWidth = width * length,
		index = 0,
		next = $('a.next', slider),
		prev = $('a.prev', slider);
		
	list.find('li').width(width).end().width(totalWidth);
	
	/* responsive */
	$(window).resize(function(){
		width = slider.outerWidth();
		totalWidth = width * length;
		list.find('li').width(width).end().width(totalWidth).css('margin-left', '-' + (index * width) + 'px');
	});
	
	/* sonraki */
	next.on('click', function(){
        var newWidthNext;
		if ( index < length - 1 ) {
            index++;
            newWidthNext = index * width;
        } else if (index == length-1) {
            newWidthNext = 1;
//            console.log('En sonda başa gitmek istedi!');
            index = 0;
        }
        goSlide(newWidthNext);
		return false;
	});

	/* önceki */
	prev.on('click', function(){
        var newWidthPrev;
		if ( index > 0 ) {
            index--;
            newWidthPrev = (index * width);
        } else if (index == 0){
//            console.log('En başta sona gitmek istedi!');
            newWidthPrev = ((length-1) * width);
            index = length-1;
        }
        goSlide(newWidthPrev);
		return false;
	});

    function goSlide(width){
        list.stop().animate({
            marginLeft: '-' + width
        }, 500);
    }

});