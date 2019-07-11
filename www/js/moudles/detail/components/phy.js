define(["lib/text!./phy.html","api/api"],function(view,{getPhy}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  getPhy(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.phy = res.data.data;
				  else
					  this.phy = "";
			  });
	   }
	};
	return Vue.component("phy",{
		data() {
		    return {
		      phy:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});