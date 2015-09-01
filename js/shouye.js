$(function(){
	//判断终端
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	//版本数据
	$.get('https://www.touchsprite.net/ajax/web',{'type':'home'},function(data){
		if(data.success){
			for(var i in data.softVersions){
				var _this;
				if(data.softVersions[i].os=='ios'){
					_this = $('.itemwrap li').eq(0);
				}else if(data.softVersions[i].os=='android'){
					_this = $('.itemwrap li').eq(1);
				}
				if(isiOS){
					_this.find('a').eq(0).attr('href','http://pre.im/touchsprite');
				}else{
					_this.find('a').eq(0).attr('href',data.softVersions[i].url);
				}
				_this.find('.banner_version span').text(data.softVersions[i].version);
				_this.find('.open_date span').text(data.softVersions[i].time_format);
				
			}
		}
	},'json');
	
	//公告数据
	$.get('https://www.touchsprite.net/ajax/web',{'type':'tips','p':1},function(data){
		if(data.success){
			for(var i = 0 ; i < 2/*data.tips.length*/ ; i++ ){
				var _this = $('.site-news-bd li').eq(i);
				//判断是否加入new
				var tmp = data.tips[i].new?'<i></i>':'';
				_this.find('a').eq(0).html(data.tips[i].title+tmp);
				_this.find('a').eq(0).attr('href','notice.html?rowId='+(i+1));
			}
		}
	},'json');

	// $.ajax({
	// 	type:'get',
	// 	url : 'http://itunes.apple.com/lookup?id=992826500',
	// 	dataType : 'jsonp',
	// 	success  : function(data) {
	// 		var url=data.results[0].artistViewUrl;
	// 		top.location.href=url;
	// 	},
	// 	error : function() {
	// 		alert('fail');
	// 	}
	// });
	
});