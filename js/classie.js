/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */
$(function(){
	if(window.navigator.appName==
   "Microsoft Internet Explorer"&&window.navigator.appVersion.substring(
	window.navigator.appVersion.indexOf("MSIE")+5,window.navigator.appVersion.indexOf("MSIE")+8)<=9) 
	{ 
		
		// document.write("<font color=green size=+3 style='line-height:400px; width:800px; display:block; text-align:center;'>再会吧。。。还等什么？不赔你玩啦...</font>");
		//$('.component-fullwidth li img').css("left","0");
		var imgsrc =  $('#component li.current img').eq(0).attr('src');
		$('.component-fullwidth li').css('background','url('+imgsrc+') center center no-repeat');
		$('.component-fullwidth li img').css('display','none');
		$('.component-fullwidth li').css('display','none');
		$('.component-fullwidth li.current').css('display','block');
		alert('触动提示您：升级您的浏览器效果更佳. iE10以上具有良好体验。');
		return;
	}else{

		( function( window ) {

		'use strict';

		// class helper functions from bonzo https://github.com/ded/bonzo

		function classReg( className ) {
		  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ( 'classList' in document.documentElement ) {
		  hasClass = function( elem, c ) {
		    return elem.classList.contains( c );
		  };
		  addClass = function( elem, c ) {
		    elem.classList.add( c );
		  };
		  removeClass = function( elem, c ) {
		    elem.classList.remove( c );
		  };
		}
		else {
		  hasClass = function( elem, c ) {
		    return classReg( c ).test( elem.className );
		  };
		  addClass = function( elem, c ) {
		    if ( !hasClass( elem, c ) ) {
		      elem.className = elem.className + ' ' + c;
		    }
		  };
		  removeClass = function( elem, c ) {
		    elem.className = elem.className.replace( classReg( c ), ' ' );
		  };
		}

		function toggleClass( elem, c ) {
		  var fn = hasClass( elem, c ) ? removeClass : addClass;
		  fn( elem, c );
		}

		var classie = {
		  // full names
		  hasClass: hasClass,
		  addClass: addClass,
		  removeClass: removeClass,
		  toggleClass: toggleClass,
		  // short names
		  has: hasClass,
		  add: addClass,
		  remove: removeClass,
		  toggle: toggleClass
		};

		// transport
		if ( typeof define === 'function' && define.amd ) {
		  // AMD
		  define( classie );
		} else {
		  // browser global
		  window.classie = classie;
		}

		})( window );


		(function() {
			var support = { animations : Modernizr.cssanimations },
				animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				// animation end event name
				animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
				// effectSel = document.getElementById( 'fxselect' ),
				component = document.getElementById( 'component' ),
				items = component.querySelector( 'ul.itemwrap' ).children,
				current = 0,
				itemsCount = items.length,
				nav = component.querySelector( 'nav' ),
				navNext = nav.querySelector( '.next' ),
				navPrev = nav.querySelector( '.prev' ),
				isAnimating = false;

			function bocaige(){
				navigate( 'next' );
			}	

			function init() {
				hideNav();
				changeEffect();
				navNext.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'next' ); } );
				navPrev.addEventListener( 'click', function( ev ) { ev.preventDefault(); navigate( 'prev' ); } );
				//effectSel.addEventListener( 'change', changeEffect );


				var timerBocai = setInterval(bocaige,5000);

				navNext.addEventListener( 'mouseover', function() { clearInterval(timerBocai); } );
				navNext.addEventListener( 'mouseout', function() { timerBocai = setInterval(bocaige,5000); } );

				navPrev.addEventListener( 'mouseover', function() { clearInterval(timerBocai); } );
				navPrev.addEventListener( 'mouseout', function() { timerBocai = setInterval(bocaige,5000); } );

				changeEffect();
			}

			function hideNav() {
				nav.style.display = 'none';
			}

			function showNav() {
				nav.style.display = 'block';
			}

			function changeEffect() {
				component.className = component.className.replace(/\bfx.*?\b/g, '');
				// if( effectSel.selectedIndex ) {
				// 	//alert( effectSel.options[ effectSel.selectedIndex ].value);
				// 	classie.addClass( component, 'fxPushReveal' );
				// 	showNav();
				// }
				// else {
				// 	hideNav();
				// }
				classie.addClass( component, 'fxPushReveal' );
				showNav();
			}

			function navigate( dir ) {
				//if( isAnimating || !effectSel.selectedIndex ) return false;
				if( isAnimating ) return false;
				isAnimating = true;
				var cntAnims = 0;


				var currentItem = items[ current ];

				if( dir === 'next' ) {
					current = current < itemsCount - 1 ? current + 1 : 0;
				}
				else if( dir === 'prev' ) {
					current = current > 0 ? current - 1 : itemsCount - 1;
				}

				var nextItem = items[ current ];

				var onEndAnimationCurrentItem = function() {
					this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
					classie.removeClass( this, 'current' );
					classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
					++cntAnims;
					if( cntAnims === 2 ) {
						isAnimating = false;
					}
				}

				var onEndAnimationNextItem = function() {
					this.removeEventListener( animEndEventName, onEndAnimationNextItem );
					classie.addClass( this, 'current' );
					classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
					++cntAnims;
					if( cntAnims === 2 ) {
						isAnimating = false;
					}
				}

				if( support.animations ) {
					currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
					nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
				}
				else {
					onEndAnimationCurrentItem();
					onEndAnimationNextItem();
				}

				classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
				classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
			}

			init();
		})();
	}
});