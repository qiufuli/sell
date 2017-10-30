/**
 * 解析url参数
 * @example ?id=1234&a=b
 * @return object id:1234,a:b
 * 
 * **/
export function urlParse(){
	let url = window.location.search;
	let obj = {};
	// []包含? & 后面跟着多个没有？&的 然后跟着= 然后跟着多个没有？&的 全局
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	if(arr){
		// ['?id=1234','&a=b']
		arr.forEach((item)=>{
			let tempArr = item.substring(1).split("=");
			let key =decodeURIComponent(tempArr[0]);
			let val =decodeURIComponent(tempArr[1]);
			obj[key] = val;
		})
	}
	return obj
}

export function saveToLocal(id,key,value){
	
	let seller = window.localStorage._seller_;
	if(!seller){
		seller = {};
		seller[id] = {};
		seller[id][key] = value;
	}else{
		seller = JSON.parse(seller);
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage._seller_ = JSON.stringify(seller);
}
export function loadFromLocal(id,key,def){
	let seller = window.localStorage._seller_;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
}
