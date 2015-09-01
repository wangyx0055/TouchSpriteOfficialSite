$(document).ready(function () {
	//菠菜哥自定义获取get参数 2015-7-28
    jQuery.extend({
		getRequest: function(strName) {
		    var strHref = document.location.href;
			var intPos = strHref.indexOf("?");
			var strRight = strHref.substr(intPos + 1);
			var arrTmp = strRight.split("&");
			for(var i = 0; i < arrTmp.length; i++ ) {
				var arrTemp = arrTmp[i].split("=");
				if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
			}
			return 0;
		}
	});

	//公告内容展合
    // $('.txtScroll-left .bd li a')
    $('.txtScroll-left .bd').delegate('a','click',(function(event){
        var _this = $(this).parent();
        if(_this.hasClass('hover')){
            _this.removeClass('hover');
            _this.find('.dis-content').eq(0).slideUp(400);
        }else{
            $('.txtScroll-left .bd li').removeClass('hover');
            $('.txtScroll-left .bd li .dis-content').css('display','none');
            _this.addClass('hover');
            _this.find('.dis-content').eq(0).fadeIn(300);
        }
    }));

	var el,li,j,Upcount;
	el = $('.txtScroll-left .bd ul');
	el.empty();

	var p_val = $.getRequest('p');
	if(p_val == 0){
		p_val = 1; //默认第一页
	}

	$.get('https://www.touchsprite.net/ajax/web',{'type':'tips','p':p_val},function(data){
		for ( j in data.tips ) {

			Upcount = '<a href="javascript:;"><h3>'+data.tips[j].title+'</h3><i class="ic_new"></i><span>'+data.tips[j].time_format+'</span><i class="isnew"></i><u></u><div class="dis-content">'+data.tips[j].content+'</div></a>';
			li = $("<li></li>");
	        li.html(Upcount);
	        if(!data.tips[j].top){
	        	li.find('.isnew').remove();
	        }
	        if(!data.tips[j].new){
	        	li.find('.ic_new').remove();
	        }
	        el.append(li);
        }

		$('.ui-paging .ui-paging-bold').text(data.page_info.current + '/' +data.page_info.total);
		$('#inputNum').val(data.page_info.current);

		var rowId = $.getRequest('rowId');
		var local_href = document.location.href;
		var rel = local_href.indexOf('?');
		var tmp;

		if(rowId!=0){
			var _this = $('.txtScroll-left .bd li').eq(rowId-1);
			_this.addClass('hover');
		    _this.find('.dis-content').eq(0).slideDown(400);
		}

		$('.ui-paging-prev').click(function(){
			if( data.page_info.current > 1 ){
				tmp = data.page_info.current - 1;
				if( rel > 0 ){
					local_href = local_href.substr(0,rel);
				}
				$(this).attr('href',local_href+"?p="+tmp);
			}
		});

		$('.ui-paging-next').click(function(){
			if( data.page_info.current < data.page_info.total ){
				tmp = data.page_info.current + 1;
				if( rel > 0 ){
					local_href = local_href.substr(0,rel);
				}
				$(this).attr('href',local_href+"?p="+tmp);
			}
		});

		$('.ui-paging-item').each(function(){
			if($(this).text() <= data.page_info.total){
				$(this).removeClass('hide');
				if( $(this).text() == data.page_info.current ){
					$(this).addClass('ui-paging-current');
				}
				tmp = $(this).text();
				if( rel > 0 ){
					local_href = local_href.substr(0,rel);
				}
				$(this).attr('href',local_href+"?p="+tmp);
			}
		});

		$('#jump').click(function(){
			var jumpNum = $('#inputNum');
			if(isNaN(jumpNum.val())){
				console.log('exception - 波哥提示：输入非数字！');
				jumpNum.val(data.page_info.current);
			}else if( jumpNum.val() > data.page_info.total || jumpNum.val() < 1 ){
				console.log('exception - 波哥提示：超越范围！');
				jumpNum.val(data.page_info.current);
			}else{
				tmp = jumpNum.val();
				if( rel > 0 ){
					local_href = local_href.substr(0,rel);
				}
				window.location.href = local_href+"?p="+tmp;
			}
		});

	},'json');

});