var UI = {
	score : document.getElementById("score"),
	combo : document.getElementById("combo"),
	level : document.getElementById("level"),
	next  : document.getElementById("next"),
	game  : document.getElementById("game")
};


var game = new Game();
game.init();
game.getArr();


UI.init = function(){
	var nextArr = this.next.getElementsByTagName("div");
	
}();

