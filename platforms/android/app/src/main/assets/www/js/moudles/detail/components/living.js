define(["lib/text!./living.html","api/api"],function(view,{getLiving}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  getLiving(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.living = res.data.data;
				  else
					  this.living = "";
			  });
		}
	};
	return Vue.component("living",{
		  data() {
		    return {
		      living:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});