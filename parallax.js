
var Parallax = {
	vWindowHeight : 0,
	vLastScrollTop : 0,
	init : function(){
		window.addEventListener("scroll", this.scrollEvent.bind(this));
		window.addEventListener("resize",this.windowResizeEvent.bind(this));
		this.vWindowHeight = window.innerHeight;
		this.firstPageInitialize();
	},

	scrollEvent : function(e) {
		var top = window.pageYOffset || document.documentElement.scrollTop;
		var page = parseInt(top / this.vWindowHeight); 
		var scrollDirection;

		if (top > this.vLastScrollTop) {
            this.scrollDown(page);
        } else {
            this.scrollUp(page);
        }

        this.vLastScrollTop = top;
	},

	scrollDown : function(page){
		switch(page) {
		    case 0:
		    case 1:
		        this.firstParallax();
		        break;
		    case 2:
		        
		        break;
		    case 3:
		        
		        break;
		}
	},

	scrollUp : function(page){
		var divArr = document.getElementById("firstParallax").childNodes;
		
		for(div in divArr){
			if(div.nodeName =="DIV")
				
		}
	},

	firstPageInitialize : function(){
		var bubbles = document.querySelectorAll(".bubble");
		for (var i = 0; i < bubbles.length ; i++) {
			wHeight = window.innerHeight;
			wWidth  = window.innerWidth; 
			var top = Math.floor(Math.random() * 10000 % wHeight);
			var left = Math.floor(Math.random() * 10000 % wWidth);
			var rate = Math.floor(150 * (Math.random())) +30;
			var cssStyle = "top: " +top +"px; left: "+ left +"px; height: "+rate+"px; width: "+rate+"px; background-size: "+Math.floor(rate*1.1) +"px;"
			bubbles[i].style.cssText = cssStyle;
			bubbles[i].dataset.rate = rate;
		}
	},

	windowResizeEvent : function(e){
		this.vWindowHeight = e.target.innerHeight;
	},

	firstParallax : function(){
		var bubbles = document.querySelectorAll(".bubble");
		for (var i = 0; i < bubbles.length ; i++) {
			var rate = 180 - bubbles[i].dataset.rate;
			var top = bubbles[i].style.top;
			var topValue = parseInt(top.substring(0,(top.length-2)));
			var ch = topValue - Math.floor(window.innerHeight * (rate /1200) );

			topValue = ch + "px";
			bubbles[i].style.top = topValue;
		}
	}
}

Parallax.init();
