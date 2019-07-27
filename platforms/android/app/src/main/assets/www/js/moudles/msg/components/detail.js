define(["lib/text!./detail.html","lib/moment","api/api"],function(view,moment,{getMsgById}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
		  let param = {
			 msgId:this.$route.query.msgId
		  }
		  getMsgById(param).then(res=>{
			  if (res.data.data)
				  this.msg = res.data.data;
			  else
				  this.msg = "";
		  });
	   },
	   formatDate(date){
		   return moment(date).format('YYYY-MM-DD HH:mm');
	   },
	   userDetail(msg){
		   let param = JSON.parse(msg.param);
    	   this.$router.push({path:"/detail",query:{userId:param.userId,mobile:param.mobile}});
       },
	};
	return Vue.component("msgDetail",{
		data() {
		    return {
		    	msg:"",
		    };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});