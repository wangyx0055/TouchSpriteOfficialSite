$(function(){
	//滚动浮定部
	if(document.getElementById('bocai1')){
		$.myPlugin = {
			rollBar: function(obj,i) {
				var rollId = $(obj);
				var offset = rollId.offset();
				var rollIdW = rollId.parent().width();
				$(window).scroll(function() {
					var scrollTop = $(window).scrollTop();
					if (scrollTop >= offset.top-(i-1)*42) {
						rollId.css({
							'position': 'fixed',
							'top': (i-1)*42+'px'
						});
						if ($.browser.msie) {
							isIE = $.browser.version;
							switch (isIE) {
								case '6.0':
									rollId.css({
										'position': 'absolute',
										'top': scrollTop
									});
									break;
							}
						}
					} else {
						rollId.css({
							'position': 'absolute',
							'top':'0'
						});
					}
				});
			}
		}
		
		$.myPlugin.rollBar('#bocai1',1);
		$.myPlugin.rollBar('#bocai2',2);
		$.myPlugin.rollBar('#bocai3',3);
		$.myPlugin.rollBar('#bocai4',4);
		$.myPlugin.rollBar('#bocai5',5);
		$.myPlugin.rollBar('#bocai6',6);

		$('.intro_line li i').click(function(){
			var scrollTop = $(this).parent().offset().top;
			bocai_scroll_plagin(scrollTop,300);
		});

		function bocai_scroll_plagin(pos,delay){
			if($(window).scrollTop()!=pos)
				$("html,body").animate({scrollTop:pos},delay);
		}
	}
});