define(["lib/text!./home.html","api/api"],function(view, {test}){
	
	var methods = {
	   route(name){
		   this.$router.loadMoudle(name)
	   },
	   vibrate(){
           var time = 3000;
           navigator.vibrate(time);
       },
       onScroll(e){
    	   this.offsetTops[e.target.id] = e.target.scrollTop;
       },
       onShowTab(e){
    	   e.target.scrollTop =  this.offsetTops[e.target.id]|0;
       },
       test(){
    	   test().then(res=>{
    		   console.log(res);
    	   });
       }
	}
	
	return Vue.component("home",{
		  data() {
		    return {
		      offsetTops:[]
		    };
		  },
	      methods: methods,
		  template:view,
		  activated() {
			  document.getElementById("tab1").scrollTop = this.offsetTops["tab1"]|0;
			  document.getElementById("tab2").scrollTop = this.offsetTops["tab2"]|0;
		  }
	})
});