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
	
	const test = params => { return axios.get(`${base}test`, {params:params}).then(res => res);};
	
	const getUser = params => { return axios.get(`${base}getUser`, {params:params}).then(res => res);};
	
	const changePwd = params => { return axios.post(`${base}changePwd`, params,
	   {
			transformRequest: [function (data) {
			    data = Qs.stringify(data)
			    return data;
		    }]
	   }
	  ).then(res => res);
    };
    
    const getSicks = params => { return axios.post(`${base}getSicks`, params,
       {
			transformRequest: [function (data) {
			    data = Qs.stringify(data)
			    return data;
		    }]
	   }
	  ).then(res => res);
	};
	
	const getBase = params => { return axios.get(`${base}base/get`, {params:params}).then(res => res);};
	const getLiving = params => { return axios.get(`${base}living/get`, {params:params}).then(res => res);};
	const getPhy = params => { return axios.get(`${base}phy/get`, {params:params}).then(res => res);};
	const getPsy = params => { return axios.get(`${base}psy/get`, {params:params}).then(res => res);};
	const getSick = params => { return axios.get(`${base}sick/get`, {params:params}).then(res => res);};
	
	return {login,getUser,changePwd,getSicks,getBase,getLiving,getPhy,getPsy,getSick,test};
});