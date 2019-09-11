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
    
    const getSicks = params => { return axios.post(`${base}getSicks_new`, params).then(res => res);};
	const getBase = params => { return axios.get(`${base}base/get`, {params:params}).then(res => res);};
	const getLiving = params => { return axios.get(`${base}living/get`, {params:params}).then(res => res);};
	const getPhy = params => { return axios.get(`${base}phy/get`, {params:params}).then(res => res);};
	const getPsy = params => { return axios.get(`${base}psy/get`, {params:params}).then(res => res);};
	const getSick = params => { return axios.get(`${base}sick/get`, {params:params}).then(res => res);};
	const getFavoriteSicks = params => { return axios.get(`${base}favorites/getSicks`, {params:params}).then(res => res);};
	const checkFavorites = params => { return axios.get(`${base}favorites/check`, {params:params}).then(res => res);};
	const addFavorites = params => { return axios.get(`${base}favorites/add`, {params:params}).then(res => res);};
	const removeFavorites = params => { return axios.get(`${base}favorites/remove`, {params:params}).then(res => res);};
	
	const getLivingDate = params => { return axios.get(`${base}living/date`, {params:params}).then(res => res);};
	const getLivingId = params => { return axios.get(`${base}living/id`, {params:params}).then(res => res);};
	
	const getPhyDate = params => { return axios.get(`${base}phy/date`, {params:params}).then(res => res);};
	const getPhyId = params => { return axios.get(`${base}phy/id`, {params:params}).then(res => res);};
	
	const getPsyDate = params => { return axios.get(`${base}psy/date`, {params:params}).then(res => res);};
	const getPsyId = params => { return axios.get(`${base}psy/id`, {params:params}).then(res => res);};
	
	const getMsgs =  params => { return axios.get(`${base}msgs`, {params:params}).then(res => res);};
	const getMsgById =  params => { return axios.get(`${base}msg/get`, {params:params}).then(res => res);};
	
	const addDoc = params => { return axios.post(`${base}add`, params,
			   {
					transformRequest: [function (data) {
					    data = Qs.stringify(data)
					    return data;
				    }]
			   }
			  ).then(res => res);
			};
	const getLink =  params => { return axios.get(`${base}getLink`, {params:params}).then(res => res);};
	return {login,getUser,changePwd,getSicks,getBase,getLiving,getPhy,getPsy,getSick,getFavoriteSicks,checkFavorites,addFavorites,removeFavorites,test,getLivingDate,getLivingId,getPhyDate,getPhyId,getPsyDate,getPsyId,getMsgs,getMsgById,addDoc,getLink};
	
	
});