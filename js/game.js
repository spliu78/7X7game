/* 流程：游戏开始，先生成一个二维数组，称为游戏面，该数组中值全0；
 * 随机生成level+2个元素，随机填入游戏面中；
 * 	|-此步中，先检查游戏面是否已满，不满则添加，添加后判断元素连线
 * 	|-满，则结束游戏
 * 遍历判断每一个游戏面元素，是否能与其他元素连成4个以上的一条线，有，则将线上的所有元素置0，积分；
 * 无，则等待玩家移动一个元素，再次判断是否...，有,则...积分；
 * 无，则返回第二步；
* */
var Node = function(x,y,clr){
	this.clr = clr ? clr : 0;
	this.x = x ? x : 0;
	this.y = y ? y : 0;
	this.getClr = function(){
		return this.clr;
	};
	this.setClr = function(clr){
		this.clr = clr;
		return clr;
	};
	this.getloc = function(){
		return [x,y];
	};
};

var Graph = function(){
	var gArr = [];
	var emptArr = [];
	this.getClr = function(x,y){
		return gArr[x][y].getClr();
	};
	this.setClr = function(x,y,clr){
		var tmp = gArr[x][y];
		for(var i = 0, len = emptArr.length; i < len ; i++){
			if(tmp === emptArr[i]){
				emptArr.splice(i,1);
				break;
			}else if( i == len){
				alert("Erro!");
				return ;
			}
		}
		return tmp.setClr(clr);
	};
	this.setClrByEA = function(i,clr){
		var tmp = emptArr[i];
		tmp.setClr(clr);
		emptArr.splice(i,1);
		return tmp.getloc();
	};
	this.clearClr = function(x,y){
		var tmp = gArr[x][y];
		for(var i = 0 , len = emptArr.length; i < len; i++){
			if(tmp === emptArr[i]){
				alert("Erro!"+x+","+y);
				return ;
			}
		}
		emptArr.push(tmp);
		return tmp.setClr(0);
	};
	this.isFull = function(){
		if(emptArr.length > 0){
			return false;
		}else{
			return true;
		}
	};
	this.aTb = function(ax,ay,bx,by){
		if(this.getClr(bx,by) != 0 ){
			return false;
		}else{
			this.setClr(bx,by,this.getClr(ax,ay));
			this.setClr(ax,ay,0);
			return true;
		}
	};
	this.handleLine = function(x,y){
		console.log("handling:"+x+","+y);
		var clearArr = [];
		clearArr = clearArr.concat(this.handleHorizon(x,y));
		clearArr = clearArr.concat(this.handleVertical(x,y));
		clearArr = clearArr.concat(this.handleltTorb(x,y));
		clearArr = clearArr.concat(this.handlertTolb(x,y));
		if(clearArr.length >= 3){
			clearArr.push(gArr[x][y]);
		}
		for(var i = 0, len = clearArr.length ; i < len ; i ++ ){
			var ret = clearArr[i].getloc();
			this.clearClr(ret[0],ret[1]);
			console.log("clear ("+ret.join(",")+")");
		}
	};
	this.handleHorizon = function(x,y){
		var baseclr = this.getClr(x,y);
		if(baseclr == 0){alert("Erro!"); return;}
		var clearArr = [];
		var tmpy = y;
		var lineNum = 1;
		while(tmpy > 0){
			tmpy--;
			if(this.getClr(x,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[x][tmpy]);
			}else{
				break;
			}
		}
		tmpy = y;
		while(tmpy < gArr[x].length-1){
			tmpy++;
			if(this.getClr(x,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[x][tmpy]);
			}else{
				break;
			}
		}	
		if(lineNum>3){
			return clearArr;
		}else{
			return [];
		}
	};
	this.handleVertical = function(x,y){
		var baseclr = this.getClr(x,y);
		if(baseclr == 0){alert("Erro!"); return;}
		var clearArr = [];
		var tmpx = x;
		var lineNum = 1;
		while(tmpx > 0){
			tmpx--;
			if(this.getClr(tmpx,y) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][y]);
			}else{
				break;
			}
		}
		tmpx = x;
		while(tmpx < gArr.length-1){
			tmpx++;
			if(this.getClr(tmpx,y) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][y]);
			}else{
				break;
			}
		}	
		if(lineNum>3){
			return clearArr;
		}else{
			return [];
		}
	};
	this.handleltTorb = function(x,y){
		var baseclr = this.getClr(x,y);
		if(baseclr == 0){alert("Erro!"); return;}
		var clearArr = [];
		var tmpx = x;
		var tmpy = y;
		var lineNum = 1;
		while(tmpx > 0 && tmpy>0){
			tmpx--;
			tmpy--;
			if(this.getClr(tmpx,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][tmpy]);
			}else{
				break;
			}
		}
		tmpx = x;
		tmpy = y;
		while(tmpx < gArr.length-1 && tmpy < gArr.length-1){
			tmpx++;
			tmpy++;
			if(this.getClr(tmpx,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][tmpy]);
			}else{
				break;
			}
		}	
		if(lineNum>3){
			return clearArr;
		}else{
			return [];
		}
	};
	this.handlertTolb = function(x,y){
		var baseclr = this.getClr(x,y);
		if(baseclr == 0){alert("Erro!"); return;}
		var clearArr = [];
		var tmpx = x;
		var tmpy = y;
		var lineNum = 1;
		while(tmpx > 0 && tmpy < gArr.length-1){
			tmpx--;
			tmpy++;
			if(this.getClr(tmpx,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][tmpy]);
			}else{
				break;
			}
		}
		tmpx = x;
		tmpy = y;
		while(tmpx < gArr.length-1 && tmpy > 0){
			tmpx++;
			tmpy--;
			if(this.getClr(tmpx,tmpy) == baseclr){
				lineNum ++;
				clearArr.push(gArr[tmpx][tmpy]);
			}else{
				break;
			}
		}	
		if(lineNum>3){
			return clearArr;
		}else{
			return [];
		}
	};
	this.emptToClr = function(clr){
		var rnd = Math.floor(Math.random()*emptArr.length);
		return this.setClrByEA(rnd,clr);
	};
	for(var i = 0 ; i < 7; i++){
		gArr[i] = [];
		for(var j = 0; j < 7; j++){
			gArr[i][j] = new Node(i,j);
			emptArr.push(gArr[i][j]);
		}
	}
};

var Game = function(){
	this.gArr = null;
	this.next = null;

	//判断是否为满，满，则gameover，不满，则添加元素，然后判断连线，循环。
	this.rndAdd = function(lev){
		var rollNum = lev + 2;
		while(rollNum > 0){
			if(this.gArr.isFull()){
				this.gameOver();
				return 0;
			}
			rndClr = Math.floor(Math.random() * 3 + 1 );
			var ret = this.gArr.emptToClr(rndClr);
			console.log("add No."+(4-rollNum)+" to "+ret.join(","));
			this.gArr.handleLine(ret[0],ret[1]);
			rollNum--;
		}
		return 1;
	};
	this.change = function(a,b,c,d){
		this.gArr.setClr(c,d,this.gArr.getClr(a,b));
		this.gArr.clearClr(a,b);
		this.gArr.handleLine(c,d);
	};
	this.move = function(a,b,c,d){
		this.change(a,b,c,d);
		this.rndAdd(1);
		this.getArr();
	};
	this.gameOver = function(){
		alert("Game Over!");
	};
	this.init = function(){
		this.next = [];
		this.level = 1;
		this.combo = 1;
		this.gArr = new Graph();
		this.gArr.setClr(0,0,3);
		this.gArr.setClr(1,1,3);
		this.gArr.setClr(2,2,3);
		this.gArr.setClr(4,4,3);
		// this.gArr.setClr(5,5,3);
		// this.gArr.setClr(6,6,3);
		// this.gArr.setClr(1,3,3);
		// this.gArr.setClr(2,3,3);
		// this.gArr.setClr(3,3,3);
		// this.gArr.setClr(4,3,3);
		// this.gArr.setClr(5,3,3);
		// this.gArr.setClr(6,3,3);
		// this.gArr.setClr(6,1,4);
		this.getArr();
	};
	this.getArr = function(){
		var len = 0;
		console.log("           0   1   2   3   4   5   6   ");
		for(var i = 0 ; i < 7 ; i ++ ){
			var str = "";
			for(var j = 0 ; j < 7 ; j ++){
				if(this.gArr.getClr(i,j)!=0){
					len++;
				}
				str += this.gArr.getClr(i,j)+"   ";
			}
			console.log("line"+i+":     "+str);
		}
		console.log(len);
		return this.gArr;
	};
};