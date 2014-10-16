var Logic = function(){
	this.ui = new UI();
	this.param = new Param();
	this.locA = null;
	this.locB = null;
	
	this.handleLine = function(loc){
		var x = loc.x;
		var y = loc.y;
		var that = this;
		var handleV = function(loc){
			var x = loc.x;
			var y = loc.y;
			var baseclr = that.param.getClr(loc);
			if(baseclr == 0){alert("Erro!"); return;}
			var clearArr = [];
			var tmpx = x;
			var lineNum = 1;
			while(tmpx > 0){
				tmpx--;
				if(that.param.getClr({x:tmpx,y:y}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][y]);
				}else{
					break;
				}
			}
			tmpx = x;
			while(tmpx < that.param.map.gArr.length-1){
				tmpx++;
				if(that.param.getClr({x:tmpx,y:y}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][y]);
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
		var handleH = function(loc){
			var x = loc.x;
			var y = loc.y;
			var baseclr = that.param.getClr(loc);
			if(baseclr == 0){alert("Erro!"); return;}
			var clearArr = [];
			var tmpy = y;
			var lineNum = 1;
			while(tmpy > 0){
				tmpy--;
				if(that.param.getClr({x:x,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[x][tmpy]);
				}else{
					break;
				}
			}
			tmpy = y;
			while(tmpy < that.param.map.gArr[x].length-1){
				tmpy++;
				if(that.param.getClr({x:x,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[x][tmpy]);
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
		var handleLTRB = function(loc){
			var x = loc.x;
			var y = loc.y;
			var baseclr = that.param.getClr(loc);
			if(baseclr == 0){alert("Erro!"); return;}
			var clearArr = [];
			var tmpx = x;
			var tmpy = y;
			var lineNum = 1;
			while(tmpx > 0 && tmpy > 0){
				tmpx--;
				tmpy--;
				if(that.param.getClr({x:tmpx,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][tmpy]);
				}else{
					break;
				}
			}
			tmpx = x;
			tmpy = y;
			while(tmpx < that.param.map.gArr.length-1 && tmpy < that.param.map.gArr[tmpx].length-1){
				tmpx++;
				tmpy++;
				if(that.param.getClr({x:tmpx,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][tmpy]);
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
		var handleRTLB = function(loc){
			var x = loc.x;
			var y = loc.y;
			var baseclr = that.param.getClr(loc);
			if(baseclr == 0){alert("Erro!"); return;}
			var clearArr = [];
			var tmpx = x;
			var tmpy = y;
			var lineNum = 1;
			while(tmpx > 0 &&tmpy < that.param.map.gArr[tmpx].length-1){
				tmpx--;
				tmpy++;
				if(that.param.getClr({x:tmpx,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][tmpy]);
				}else{
					break;
				}
			}
			tmpx = x;
			tmpy = y;
			while(tmpx < that.param.map.gArr.length-1 &&  tmpy > 0){
				tmpx++;
				tmpy--;
				if(that.param.getClr({x:tmpx,y:tmpy}) == baseclr){
					lineNum ++;
					clearArr.push(that.param.map.gArr[tmpx][tmpy]);
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
		var clearArr = [];
		clearArr = clearArr.concat(handleH(loc));
		clearArr = clearArr.concat(handleV(loc));
		clearArr = clearArr.concat(handleLTRB(loc));
		clearArr = clearArr.concat(handleRTLB(loc));
		var clearLen = clearArr.length;
		if(clearLen >= 3){
			clearArr.push(this.param.map.gArr[x][y]);
			for(var i = 0, len = clearArr.length ; i < len ; i ++ ){
				var loc = clearArr[i].getLoc();
				this.param.map.clearClr(loc);
			}
			this.param.process++;
		if(this.param.process > (this.param.level+1)*10 && this.param.level < 4){
			this.param.level++;
			this.param.process=0;
		}
			return clearArr.length;
		}
		return 0;
	};
	
	this.clickFromUI=function(locstr){
		// if(this.param.process > this.param.level){
			// this.param.level++;
			// this.param.process=0;
		// }
		var x = Math.floor(locstr/7);
		var y = locstr%7;
		// for(var i = 0 ; i < this.param.map.emptArr.length; i++){
			// console.log(this.param.map.emptArr[i].getLoc());
		// }
		if(this.locA){
			this.locB = {x:x,y:y}; 
			
			if(this.locA.x == this.locB.x && this.locA.y == this.locB.y){
				this.param.clearSlt(this.locA);
				this.locA = null;
				this.ui.change(this.param);
				return;
			}
			
			//TODO this.aTob(this.locA,this.locB);
			if(!this.aTob(this.locA,this.locB)){
				this.locB = null;
				return;
			}
			
			this.locA = null;
			this.locB = null;
			this.param.map.getMap();
		}else{
			this.locA = {x:x,y:y};
			//TODO this.getWay(this.locA);
			if(!this.getWay(this.locA)){
				this.locA = null;
				return;	
			}
			this.ui.change(this.param);
			this.param.map.getMap();
		}
	};
	this.getWay = function(loc){
		if(this.param.setSlt(loc)){
			return 1;
		}
		return 0;
	};
	
	this.randomAdd = function(num){
		var ranClr = this.param.next[(this.param.next.length-num)];
		var empLen = this.param.map.emptArr.length;
		var ranIte = Math.floor(Math.random()*empLen);
		return this.param.map.setClrFromEmptArr(ranIte,ranClr);
	};
	this.genNext = function(num){
		if(num>6){
			num = 6;
		}
		var tmpArr = [];
		for(var i = 0 ; i < num ; i ++ ){
			tmpArr[i] = Math.floor(Math.random()*5+1);
		}
		this.param.next = tmpArr;
	};
	this.nextMove = function(num){
		if(this.param.map.isFull()){
			alert("Game Over!");
			return;
		}
		setTimeout(function(that,num){
			return function(){
				if(num>0){
					var loc = that.randomAdd(num);
					that.ui.change(that.param);
					var point = that.handleLine(loc);
					if(point){
						that.param.score += (that.param.combo+1)*point;
						setTimeout(function(that){
							return function(){
								that.ui.change(that.param);
								that.nextMove(num-1);
							};
						}(that),400);
					}else{
						that.nextMove(num-1);
					}
				}else{
					that.genNext(that.param.level+2);
					that.ui.change(that.param);
				}
			};
		}(this,num),300);
	};
	
	this.aTob = function(a,b){
		if(this.param.aTob(a,b)){
			this.ui.change(this.param);
			var point = this.handleLine(b);
			if(point){
				this.param.combo++;
				this.param.score += (this.param.combo)*point;
				setTimeout(function(that){
					return function(){that.ui.change(that.param);};
				}(this),400);
			}else{
				this.param.combo=0;
				this.nextMove(this.param.next.length);
			}
			return 1;
		}
		return 0;
	};
	
	this.init = function(){
		this.genNext(this.param.level+2);
		this.nextMove(this.param.level+2);
		this.ui.change(this.param);
	};
	this.init();
};

var game = new Logic();
