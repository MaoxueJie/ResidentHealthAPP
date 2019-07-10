define(["./components/home","./components/about","./components/qr","./components/password","./components/favorites","./components/test"],function(home,about,qr,password,favorites,test){
	return [
		{path:"/home",component:home},
		{path:"/about",component:about},
		{path:"/qr",component:qr},
		{path:"/password",component:password},
		{path:"/favorites",component:favorites},
		{path:"/test",component:test},
	]
});