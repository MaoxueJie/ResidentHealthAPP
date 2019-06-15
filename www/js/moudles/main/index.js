define(["./components/home","./components/about","./components/qr"],function(home,about,qr){
	return [
		{path:"/",component:home},
		{path:"/about",component:about},
		{path:"/qr",component:qr},
	]
});