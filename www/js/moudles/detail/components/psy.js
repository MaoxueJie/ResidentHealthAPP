define(["lib/text!./psy.html","api/api"],function(view,{getPsy,getPsyDate,getPsyId}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  /*
			  getPsy(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.psy = res.data.data;
				  else
					  this.psy = "";
			  });*/
			  getPsyDate(param).then(res=>{
				  if (res.data.data)
				  {
					  this.dates = res.data.data;
				  }
			  });
	   },
	   getPsy(id){
		    if(id){
				let param = {
					id:id
				}
				getPsyId(param).then(res=>{
					  if (res.data.data)
						  this.psy = res.data.data;
					  else
						  this.psy = "";
				});
		    }else{
		    	 this.psy = "";
		    }
		},
	};
	return Vue.component("psy",{
		data() {
		    return {
		      psy:"",
		      dates:[],
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});