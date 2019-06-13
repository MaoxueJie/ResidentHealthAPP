
define(["./moudles/main/index","./settings"],function(){
   var settings = require("./settings");
   require.config({
		...settings
   });

   var router = new VueRouter({
		routes: [
			
		]
   });
   
   var main = require("./moudles/main/index");
   router.addRoutes(main);
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

	

	router.loadMoudle = function(moudleName){
		require(["moudles/"+moudleName+"/index"],function(moudle){
			  if (moudle instanceof Array)
			  {
				  router.addRoutes(moudle);
			  }else
			  {
				  router.addRoutes([{path:"/"+moudleName,component:moudle}])
			  }
			  router.push('/'+moudleName)
		})
	};
	
	router.beforeEach((to, from, next) => {
		var i = to.matched.length;
		if (i>0)
		{
			next()
		}else
		{
			router.loadMoudle(to.path.replace("/",""));
		}
	})

    Framework7.use(Framework7Vue);
    Framework7.use(Framework73dPanels);
    
	var app = new Vue({
	  el: '#app',
	  data() {
		    return {
		      // Framework7 parameters that we pass to <f7-app> component
		      f7params: {
		        // Array with app routes
		        //routes: router,
		        // App Name
		        name: 'health',
		        theme: 'ios',
		        // App id
		        id: 'com.breeze.health',
		        panels3d: {
		            enabled: true,
		        },
		        
		        // ...
		      }
		    };
	  },
	  router
	});
	return app
});


