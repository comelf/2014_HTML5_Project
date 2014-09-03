
var mEvent;

var Parallax = {
	vWindowHeight : 0,
	vLastScrollTop : 0,
	vCurrentTop : 0,
	init : function(){
		this.calculatePage(5);
		window.addEventListener("scroll", this.scrollEvent.bind(this));
		window.addEventListener("resize",this.windowResizeEvent.bind(this));
		window.addEventListener("load",this.windowReloadEvent);
		this.vWindowHeight = window.innerHeight;
		this.firstPageInitialize();

	},

	calculatePage : function(pageCount){
		var windowHeight = window.innerHeight;
		totalHeight = windowHeight * pageCount;
		var wrapper = document.getElementById("wrapper");
		wrapper.style.cssText = "height: " + totalHeight + "px;";
	},

	scrollEvent : function(e) {
		clearInterval(mEvent);

		var top  = window.pageYOffset || document.documentElement.scrollTop;
		var page = parseInt(top / this.vWindowHeight); 
		var scrollDirection;
		var duration = 3;
		var timeCount = 0;

		
			(top > this.vLastScrollTop) ?  scrollDirection = "Down" : scrollDirection = "Up";
			this.vLastScrollTop = top;

	        mEvent = setInterval(function(){
	        	//duration 계산

	        	//현재 스크롤 위치와, 움직일 위치 거리 계산

				this["scroll"+scrollDirection](0);
				(duration<=timeCount) ? clearInterval(mEvent) : timeCount++;
			}.bind(this),100);
		
	},


	scrollDown : function(page){
		console.log("down");
		switch(page) {
		    case 0:
		    case 1:
		        this.firstScrollDownAction();
		        break;
		    case 2:
		        
		        break;
		    case 3:
		        
		        break;
		}
	},

	scrollUp : function(page){
		console.log("up");
		switch(page) {
		    case 0:
		    case 1:
		        this.firstScrollUpAction();
		        break;
		    case 2:
		        
		        break;
		    case 3:
		        
		        break;
		}
	},

	firstPageInitialize : function(){
		var bubbles = document.querySelectorAll(".bubble");
		for (var i = 0; i < bubbles.length ; i++) {
			wHeight = window.innerHeight;
			wWidth  = window.innerWidth; 
			var top = Math.floor(Math.random() * 10000 % wHeight);
			var left = Math.floor(Math.random() * 10000 % wWidth);
			var rate = Math.floor(10 * (Math.random()))*10 + 50;
			var cssStyle = "top: " +top +"px; left: "+ left +"px; height: "+rate+"px; width: "+rate+"px; background-size: "+Math.floor(rate*1.1) +"px;"
			bubbles[i].style.cssText = cssStyle;
			bubbles[i].dataset.rate = rate;
		}
	},

	windowResizeEvent : function(e){
		this.vWindowHeight = e.target.innerHeight;
	},

	windowReloadEvent : function(e){
		setTimeout(function(){
			window.scrollTo(0,0);	
		},10);
		
	},

	firstScrollDownAction : function(){
		var bubbles = document.querySelectorAll(".bubble");
		for (var i = 0; i < bubbles.length ; i++) {
			var rate = 180 - bubbles[i].dataset.rate;
			var top = bubbles[i].style.top;
			var topValue = parseInt(top.substring(0,(top.length-2)));
			var ch = topValue - Math.floor(window.innerHeight * (rate /1200) );

			topValue = ch + "px";
			bubbles[i].style.top = topValue;
		}
	},

	firstScrollUpAction : function(){
		var bubbles = document.querySelectorAll(".bubble");
		for (var i = 0; i < bubbles.length ; i++) {
			var rate = 180 - bubbles[i].dataset.rate;
			var top = bubbles[i].style.top;
			var topValue = parseInt(top.substring(0,(top.length-2)));
			var ch = topValue + Math.floor(window.innerHeight * (rate /1200) );

			topValue = ch + "px";
			bubbles[i].style.top = topValue;
		}
	},

	relocation : function(){
	
		wHeight = window.innerHeight;
		wWidth  = window.innerWidth; 
		var top = Math.random() * 10000 % wHeight;
		var left = Math.random() * 10000 % wWidth;
		var pxSize = 150 * Math.floor(Math.random() * 100);

		var cssStyle = "top: " +top +"; left: "+ left +"; height: "+pxSize+"+px; width: "+pxSize+"px; background-size: "+pxSize*10+"px;";

	}

}

Parallax.init();
