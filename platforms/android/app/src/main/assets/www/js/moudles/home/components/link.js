define(["lib/text!./link.html","api/api"],function(view,{getLink,updateLink}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   update(){
          if (!this.link)
          {
        	  this.$f7.toast.create({
				  text: '请填写外部链接',
				  position: 'center',
				  closeTimeout: 2000
			  }).open();
        	  return;
          }
		  let param = {
			link:this.link
		  }
		  updateLink(param).then(res=>{
			  if (res.data.success)
			  {
				  this.back();
			  }else
			  {
				  this.$f7.toast.create({
					  text: res.data.message?res.data.message:'修改失败',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }
		  });
	   },
	   loadData(){
		   getLink().then(res=>{ 
	    		  if (res.data.success){
	    			  this.link = res.data.data;
	    		  }
	       });
	   }
	};
	return Vue.component("link1",{
		data() {
		    return {
		    	link:'',
		    }
		},
		template:view,
	    methods: methods,
	    beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.loadData())
        },
	})
});