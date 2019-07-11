define(["lib/text!./base.html","api/api"],function(view,{getBase}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
		  let param = {
			userId:this.$route.query.userId
		  }
		  getBase(param).then(res=>{
			  //console.log(res);
			  if (res.data.data)
				  this.base = res.data.data;
			  else
				  this.base = "";
		  });
	   }
	};
	return Vue.component("info",{
		  data() {
		    return {
		      base:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});