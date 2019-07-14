define(["lib/text!./phy.html","api/api"],function(view,{getPhy,getPhyDate,getPhyId}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  /*
			  getPhy(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.phy = res.data.data;
				  else
					  this.phy = "";
			  });*/
			  
			  getPhyDate(param).then(res=>{
				  if (res.data.data)
				  {
					  this.dates = res.data.data;
				  }
			  });
	   },
	   getPhy(id){
		   if (id){
			let param = {
				id:id
			}
			getPhyId(param).then(res=>{
				  if (res.data.data)
					  this.phy = res.data.data;
				  else
					  this.phy = "";
			});
		   }else
		   {
			   this.phy = "";
		   }
		},
	};
	return Vue.component("phy",{
		data() {
		    return {
		      phy:"",
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