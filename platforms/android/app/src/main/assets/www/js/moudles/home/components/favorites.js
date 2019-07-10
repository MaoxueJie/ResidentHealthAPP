define(["lib/text!./favorites.html","api/api"],function(view,{getFavoriteSicks}){
	var methods = {
	   back(){
		   this.$router.back();
	   }, 
	   detail(user){
    	   this.$router.push({path:"/detail",query:{mobile:user.name,userId:user.id}});
       },
	   getSicks(){
    	   var app = this.$f7;
    	   var $$ = this.$$;
    	   let param = {
    		  page:this.page,
    		  size:this.size
    	   }
    	   var that = this;
    	   if (!this.loading)
    	   {
	    	   this.loading = true;
	    	   getFavoriteSicks(param).then(res=>{
	    		   console.log(res);
	    		   if (res.data.success){
	    			   that.page ++;
	    			   for(var i=0;i<res.data.data.length;i++){
	    				   that.users.push({name:res.data.data[i].mobile,sex:res.data.data[i].gender?(res.data.data[i].gender==1?'male':res.data.data[i].gender==2?'female':'user-o'):'user-o',id:res.data.data[i].userId});
	    			   }
	    			   if (that.page>10 || res.data.data.length<that.size)
	    			   {
	    				 app.infiniteScroll.destroy('.infinite-scroll-content');
	    	    		 $$('.infinite-scroll-preloader').remove();
	    			   }		   
	    		   }
	    		   this.loading = false;
	    	   })
    	    }
       },
       reload(){
    	   this.page = 1;
    	   this.users = [];
    	   this.getSicks();
       },
	};
	return Vue.component("favorites",{
		  data(){
			  return {
				  users:[],
			      page:1,
			      size:20,
			      loading:false,
			  }
		  },
		  template:view,
		  methods: methods,
		  mounted(){
			  var that = this;
			  this.$f7ready((f7) => {
				  var infiniteScrollContent = this.$$('.infinite-scroll-content');
				  f7.infiniteScroll.create(infiniteScrollContent);
				  this.$$('.infinite-scroll-content').on('infinite', function () {
					  this.getSicks();
				  });
				  this.getSicks();
			  });
		  },
		  
		  beforeRouteEnter (to, from, next) {
			 next(vm=>vm.reload());
		  }
	})
});