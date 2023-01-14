//GET
// 引入提示
let getlist = function(urling){//这里动态传入url
	return new Promise((resolve,reject)=>{
		uni.request({
				url:urling,
				method:'GET',
			})
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				let errs = '服务器错误，稍后再试'
				errdata.errlist(errs,"none")
				reject(err)
			})
		}
	)
}
//POST
// 引入提示
let postlist = function(urling){//这里动态传入url
	return new Promise((resolve,reject)=>{
		uni.request({
				url:urling,
				method:'POST',
			})
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				let errs = '服务器错误，稍后再试'
				errdata.errlist(errs,"none")
				reject(err)
			})
		}
	)
}
export{getlist}//导出

export{postlist}//导出
