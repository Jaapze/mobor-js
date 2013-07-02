$(function(){
	
	var start_tracking	=	false;
	
	$('body').delegate('#tours ul li','click', function(){
		$('#tours ul li').not(this).removeClass('open');
		$(this).addClass('open');
	});
	
});