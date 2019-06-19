define(["lib/text!./sick.html","api/api"],function(view,{getSick}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  getSick(param).then(res=>{
				  console.log(res);
				  if (res.data.data)
					  this.sick = res.data.data;
				  else
					  this.sick = "";
			  });
	   }
	};
	return Vue.component("sick",{
		data() {
		    return {
		    	sick:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});