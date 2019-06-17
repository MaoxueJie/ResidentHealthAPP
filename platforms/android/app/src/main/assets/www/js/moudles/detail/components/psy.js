define(["lib/text!./psy.html","api/api"],function(view,{getPsy}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  getPsy(param).then(res=>{
				  console.log(res);
				  if (res.data.data)
					  this.psy = res.data.data;
				  else
					  this.psy = "";
			  });
	   }
	};
	return Vue.component("psy",{
		data() {
		    return {
		      psy:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});