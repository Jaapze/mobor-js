$(function(){
	var current_URL;
	var navigation_done		=	true;
	var body				=	$('body');
	var config				= {
		'defaults':		{
			'direction':	'forward',
			'transition':	'slide',
		},
	};
	
	init();
	function init(){
		$('.page').addClass('current');
	}
	
	function navigate(URL, transition, direction){
		if(navigation_done){
			$.event.trigger({
				type:	'page_load',
				URL:	URL,
			});
			var data_elm,html	=	null;
			$.get(URL, function(data) {
				data_elm	=	$(data);
				html		=	data_elm.filter(".page");
				if(html.length > 0){
					current_URL		=	URL;
					do_transition(transition, direction, html);
					$.event.trigger({
						type:	'page_loaded',
						URL:	current_URL,
					});
				}else{
					console.error('no page class found on '+URL);
				}
			});
		}
	}
	
	function do_transition(transition, direction, html){
		navigation_done		=	false;
		switch(transition){
			case 'slide':
				var from	=	(direction == 'forward')?'right':'left';
				var to		=	(direction != 'forward')?'right':'left';
				body.append(html.addClass(from));
				setTimeout(function(){
					html.removeClass(from).addClass('transition center');
					$('.current').removeClass('current').addClass(to+' transition remove').removeClass('center');
				},1);
			break;
			case 'fade':
				body.append(html);
				$('.current').removeClass('current').addClass('remove');
				html.addClass('fadeIn current transition');
			break;
		}
		if(transition == 'slide')
		{
			$('.page.current').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				reset_pages();
			});
		}else{
			$('.page.current').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) {
				reset_pages();
			});
		}
	}
	
	function reset_pages()
	{
		$('.remove').remove();
		$('.page').addClass('current');
		setTimeout(function(){navigation_done = true;},2);
		$.event.trigger({
			type:	'transition_done',
			URL:	current_URL,
		});
		$('.fadeIn, .transition, .center').removeClass('fadeIn transition center');
	}
	
	$('body').delegate('a, .navigate', 'click', function(){
		var elm				=	$(this);
		if(elm.hasClass('external')){
			return true;
		}
		var attr_href		=	elm.attr('href');
		var attr_trans		=	elm.data('transition');
		var attr_dir		=	elm.data('direction');
		
		var URL				=	(typeof attr_href !== 'undefined' && attr_href !== false) ? attr_href : elm.data('url');
		var transition		=	(typeof attr_trans !== 'undefined' && attr_trans !== false) ? attr_trans : config.defaults.transition;
		var direction		=	(typeof attr_dir !== 'undefined' && attr_dir !== false) ? attr_dir : config.defaults.direction;
		
		navigate(URL, transition, direction);
		return false;
	});
	
});