var UI = function(){
	this.level = document.getElementById("level");
	this.process = document.getElementById("process");
	this.score = document.getElementById("score");
	this.combo = document.getElementById("combo");
	this.next = document.getElementById("next").getElementsByTagName("div");
	this.game = document.getElementById("game").getElementsByTagName("div");
	this.click = document.getElementById("game").getElementsByTagName("td");
	
	this.change = function(param){
		this.level.innerHTML = param.level;
		this.process.innerHTML = param.process + "/" +(param.level*10+10);
		
		this.score.innerHTML = param.score;
		this.combo.innerHTML = param.combo;

		for(var i = 0 , len = this.next.length; i < len ; i++ ){
			this.next[i].className = "box clr"+(param.next[i]||0);
		}
		
		for(var i = 0 , len = this.game.length; i < len ; i++ ){
			this.game[i].className = param.map.getClassByI(i);
		}
	};
	this.setFlag = function(){
		for(var i = 0 , len = this.game.length; i < len ; i ++){
			this.click[i].sevenFlag = i;
			this.game[i].sevenFlag = i;
			this.click[i].addEventListener("click",function(event){
				game.clickFromUI(event.target.sevenFlag);
			},false);
		}	
	};
	this.setFlag();
};
