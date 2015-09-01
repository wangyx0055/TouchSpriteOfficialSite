$(document).ready(function(){
	$(".site-nav-bd li").hover(function(){
		$(this).addClass('current');
	},function(){
		$(this).removeClass('current');
	});

});