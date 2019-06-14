define(["lib/axios.min","lib/qs"],function(axios,Qs){
	let base = 'http://ehealth.drshuo.com/cfd/app/';
	axios.interceptors.request.use(function (config) {
		let token = localStorage.getItem('token');
		if (token)
			config.headers.common['Authorization'] = token;
	    return config;
	}, function (error) {
	    return Promise.reject(error);
	});
	
	axios.interceptors.response.use(function (response) {
	    return response;
	}, function (error) {
	     return Promise.reject(error);
	});

	
	const login = params => { return axios.post(`${base}login`, params,
	   {
			transformRequest: [function (data) {
			    data = Qs.stringify(data)
			    return data;
		    }]
	   }
	  ).then(res => res);
	};
	
	const test = params => { return axios.get(`${base}test`, params).then(res => res);};
	
	return {login,test};
});