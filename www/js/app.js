
define(["./moudles/home/index","./settings"],function(){
   var settings = require("./settings");
   require.config({
		...settings
   });
   
   var router = new VueRouter({
		routes: [
			{ 
				path: '/', 
				component: {
					template:"<div></div>",
					methods:{
						quite(){
							this.$router.back();
						}
					},
					beforeRouteEnter (to, from, next) {
						 if (from && from.path == "/home"){
							 navigator.app.exitApp();
						 }else if (from && from.path == "/login"){
							 navigator.app.exitApp();
						 }else
						 {
							 next();
						 }
					}
				} 
			},
		]
   });
   
   router.loadMoudle = function(moudleName,query,param){
		require(["moudles/"+moudleName+"/index"],function(moudle){
			  if (moudle instanceof Array)
			  {
				  router.addRoutes(moudle);
			  }else
			  {
				  router.addRoutes([{path:"/"+moudleName,component:moudle}])
			  }
			  router.push({path:'/'+moudleName,query:query,param:param})
		})
   };
   
   router.beforeEach((to, from, next) => {
	   console.log("to:"+to.path + "   from:"+from.path)
	   var i = to.matched.length;
	   if (i>0)
	   {
		   if (to.path == '/login') {
			   localStorage.removeItem("token");
			   next()
		   }else if(to.path == '/'){
			   next()
		   }else
		   {
				let token = localStorage.getItem("token");
				if (token)
				{
					next()
				}else
				{
					//next({ path: '/login' });
					router.replace("/login")
				}
		   }
	   }else
	   {
			router.loadMoudle(to.path.replace("/",""),to.query,to.param);
	   }
		
   });
   
   router.afterEach((to, from) => {
	   var i = to.matched.length;
	   //console.log(to.path + ":" + i)
   })
   
   router.push("/")
   
   document.addEventListener('deviceReady',function(){
       window.JPush.init();
       window.JPush.isPushStopped(function (result) {
         if (result == 0) {
           //alert("开启")
         } else {
           //alert("关闭")// 关闭
         }
       })
       document.addEventListener("jpush.openNotification", function (event) {
         var alertContent
         if(device.platform == "Android") {
           alertContent = event.alert
         } else {
           alertContent = event.aps.alert
         }
         alert(alertContent)
       }, false)
       document.addEventListener("jpush.receiveNotification", function (event) {
         var alertContent
         if(device.platform == "Android") {
           alertContent = event.alert
         } else {
           alertContent = event.aps.alert
         }
         alert("open Notification:" + alertContent)
       }, false)

    },false);

    Framework7.use(Framework7Vue);
    Framework7.use(Framework73dPanels);
    
	var app = new Vue({
	  el: '#app',
	  data() {
		    return {
		      f7params: {
		        name: 'health',
		        theme: 'ios',
		        id: 'com.breeze.health',
		        panels3d: {
		            enabled: true,
		        },
		      }
		    };
	  },
	  router,
	  mounted() {
	      this.$f7ready((f7) => {
	        f7.views.create('.view-main');
	        require(["moudles/home/index"],function(home){
	        	router.addRoutes(home);
		 		router.push("/home");
	        });
	      });
	  },
	});
	return app
});


