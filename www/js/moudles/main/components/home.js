define(["lib/text!./home.html","api/api"],function(view, {getUser,test}){
	
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
       logout(){
    	   localStorage.removeItem("token");
    	   this.$router.replace("/login");
       },
       about(){
    	   this.$router.push("/about");
       },
       myQr(){
    	   let url = this.qr;
    	   this.$router.push({path:"/qr",query:{qr:url}});
       }
	}
	
	return Vue.component("home",{
		  data() {
		    return {
		      offsetTops:[],
		      name:'姓名',
		      jobTitle:'',
		      unit:'',
		      qr:''
		    };
		  },
	      methods: methods,
		  template:view,
		  activated() {
			  document.getElementById("tab1").scrollTop = this.offsetTops["tab1"]|0;
			  document.getElementById("tab2").scrollTop = this.offsetTops["tab2"]|0;
		  },
		  mounted(){
			  getUser().then(res=>{
				  this.name = res.data.data.name;
				  this.jobTitle = res.data.data.jobTitle;
				  this.unit = res.data.data.unit;
				  this.qr = res.data.data.qr;
			  });
		  },
		  //beforeRouteLeave (to, from, next) {
			//   alert(to);
		  //}
	})
});