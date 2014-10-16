var Param = function(json){
	//暂时不考虑储存情况
	var jsn = json||{};
	this.level = jsn.level || 1;
	this.process = jsn.process || 0;
	this.score = jsn.score || 0;
	this.combo = jsn.combo || 0;
	this.next = jsn.next || [];
	this.map = jsn.map || new Map(7,7);
	this.game = jsn.game || this.map.getGameStr();
	this.strParam = function(){
		return JSON.stringify(this,function(key,value){
			if(typeof value == "function" ){
				return;
			}else{
				return value;
			}
		});
	};
	this.setClr = function(loc,clr){
		this.map.setClr(loc,clr);
	};
	this.clearClr = function(loc){
		this.map.clearClr(loc);
	};
	this.getClr = function(loc){
		return this.map.getClr(loc);
	};
	this.setSlt = function(loc){
		if(this.getClr(loc)<=0){
			console.log("empty!");
			return 0;
		}
		this.map.setSlt(loc);
		return 1;
	};
	this.clearSlt = function(loc){
		this.map.clearSlt(loc);
	};
	this.setNext = function(){
		for(var i = 0 , len = this.level + 2; i < len ; i++ ){
			this.next[i] = Math.floor(Math.random()*3+1);
		}
	};
	this.setLevel = function(){
		
	};
	this.setCombo = function(){
		
	};
	this.setProcess = function(){
		
	};
	
	this.aTob = function(a,b){
		if(this.getClr(b)>0){
			console.log("not empty!");
			return 0;
		}
		this.setClr(b,this.getClr(a));
		this.clearClr(a);
		this.clearSlt(a);
		return 1;
	};
};
