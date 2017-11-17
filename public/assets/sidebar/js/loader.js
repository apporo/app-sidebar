Zepto(function($) {
	$(".navBot-list").mouseover(function(){
	   $('.navBot-list li a span').addClass('hoverNav');
        $('.navBot-list li a i').each(function (index, element) {
               var colorIcon = $(element).attr("colorAssign")
               $(element).css("color", colorIcon)
        });
	});
	$(".navBot-list").mouseout(function(){
	   $('.navBot-list li a span').removeClass('hoverNav');
        $('.navBot-list li a i').css("color", "white");
	});
    // $('.navBot-list').hover(
    //   function() {
    //     $('.navBot-list li a span').addClass('hoverNav');
    //     $('.navBot-list li a i').each(function (index, element) {
    //            var colorIcon = $(element).attr("colorAssign")
    //            $(element).css("color", colorIcon)
    //     });
    //   },
    //   function() {
    //     $('.navBot-list li a span').removeClass('hoverNav');
    //     $('.navBot-list li a i').css("color", "white");
    //   }
    // )
	$('.btn_navBot span').click(function() {
		$('.navBot-container').toggleClass('navBot_hide')
	})
});
