var Node = function(x,y,clr,slt){
	this.clr = clr ? clr : 0;
	this.x = x ? x : 0;
	this.y = y ? y : 0;
	this.selected = slt ? slt : 0;
	this.getClr = function(){
		return this.clr;
	};
	this.getClass = function(){
		return "box clr"+ this.getClr()+" slt"+this.selected;
	};
	this.setClr = function(clr){
		this.clr = clr;
		return clr;
	};
	this.setSlt = function(){
		this.selected = 1;
	};
	this.clearSlt = function(){
		this.selected = 0;
	};
	this.getLoc = function(){
		return {x:this.x,y:this.y};
	};
};

var Map = function(w,h){
	this.gArr = [];
	this.emptArr = [];
	
	this.init = function(w,h){
		for(var i = 0 ; i < w; i++){
			this.gArr[i] = [];
			for(var j = 0; j < h; j++){
				this.gArr[i][j] = new Node(i,j);
				this.emptArr.push(this.gArr[i][j]);
			}
		}
	};
	
	this.getClr = function(loc){
		var x = loc.x, y = loc.y;
		return this.gArr[x][y].getClr();
	};
	this.getClassByI = function(i){
		var x = Math.floor(i/7);
		var y = i%7;
		return this.gArr[x][y].getClass();
	};
	this.getGameStr = function(){
		var tmp = [];
		for(var i = 0 , len = this.gArr.length ; i < len ; i ++ ){
			tmp = tmp.concat(this.gArr[i]);
		}
		return tmp;
	};
	this.getMap = function(){
		for(var i = 0 , len = this.gArr.length ; i < len ; i ++ ){
			var str = "Line"+i+":  ";
			for(var j = 0 ; j < 7 ; j++ ){
				str += this.gArr[i][j].getClr()+"    ";
			}
			console.log(str);
		}
		console.log("===========>");
	};
	this.setClr = function(loc,clr){
		var x = loc.x, y = loc.y;
		var tmp = this.gArr[x][y];
			for(var i = 0, len = this.emptArr.length; i < len ; i++){
				if(tmp === this.emptArr[i]){
					tmp.setClr(clr);
					this.emptArr.splice(i,1);
					return {x:x,y:y};
				}
			}
			alert("Erro while setting color from gArr ("+x+","+y+")");
			return ;	
	};
	this.clearClr = function(loc){
		var x = loc.x, y = loc.y;
		var tmp = this.gArr[x][y];
		for(var i = 0 , len = this.emptArr.length; i < len; i++){
			if(tmp === this.emptArr[i]){
				alert("Erro while clearing color ("+x+","+y+")");
				return ;
			}
		}
		this.emptArr.push(tmp);	
		tmp.setClr(0);	
	};
	this.setSlt = function(loc){
		this.gArr[loc.x][loc.y].setSlt();
	};
	this.clearSlt = function(loc){
		this.gArr[loc.x][loc.y].clearSlt();
	};
	this.setClrFromEmptArr = function(i,clr){
		if(this.emptArr.length <=0){
			console.error("Erro while setting color from emptArr ("+x+","+y+")");
		}
		var tmp = this.emptArr[i];
		tmp.setClr(clr);
		this.emptArr.splice(i,1);
		return tmp.getLoc();
	};
	this.isFull = function(){
		if(this.emptArr.length > 0){
			return false;
		}else{
			return true;
		}
	};
	this.init(w,h);
};

