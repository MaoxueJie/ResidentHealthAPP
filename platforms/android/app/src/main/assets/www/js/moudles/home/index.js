define(["./components/home","./components/about","./components/qr","./components/password","./components/favorites","./components/docadd","./components/link","./components/test"],function(home,about,qr,password,favorites,docadd,link,test){
	return [
		{path:"/home",component:home},
		{path:"/about",component:about},
		{path:"/qr",component:qr},
		{path:"/password",component:password},
		{path:"/favorites",component:favorites},
		{path:"/docadd",component:docadd},
		{path:"/link",component:link},
		{path:"/test",component:test},
	]
});