const baseUrl = 'http://laravel-06z8-26118-6-1316511786.sh.run.tcloudbase.com/';
const userId = uni.getStorageSync("userinfo_Data").id


// post请求封装
function postRequest(url, data, type) {
	var promise = new Promise((resolve, reject) => {
		var postData = data;
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'POST',
			// dataType:"jsonp",
			// jsonp:"callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名
			// jsonpCallback:"success_jsonpCallback",

			header: {
				'content-type': type || 'application/json;charset=UTF-8',
				'token': uni.getStorageSync('token')
			}, //token可以不要，看后端
			success: function(res) {
				resolve(res.data);

			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}

//get请求封装
function getRequest(url, data, type) {
	var promise = new Promise((resolve, reject) => {
		var postData = data;
		uni.request({
			url: commoneUrl + url,
			data: postData,
			method: "GET",
			dataType: 'json',
			header: {
				type || 'content-type': 'application/json',
				'token': uni.getStorageSync('token')
			},
			success: function(res) {
				resolve(res.data);

			},
			error: function(e) {
				reject('网络出错');
			}
		});
	});
	return promise;
}
export {
	post: postRequest,
	get: getRequest
};
