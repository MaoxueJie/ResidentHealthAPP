define(["./components/home","./components/about","./components/qr","./components/password","./components/test"],function(home,about,qr,password,test){
	return [
		{path:"/",component:home},
		{path:"/about",component:about},
		{path:"/qr",component:qr},
		{path:"/password",component:password},
		{path:"/test",component:test},
	]
});