define(["lib/text!./home.html","api/api"],function(view, {getUser,getSicks,test}){
	
	var methods = {
	   route(name){
		   this.$router.loadMoudle(name)
	   },
	   vibrate(){
           var time = 3000;
           navigator.vibrate(time);
       },
       onScroll(e){
    	   this.offsetTops[e.target.id] = e.target.scrollTop;
       },
       onShowTab(e){
    	   e.target.scrollTop =  this.offsetTops[e.target.id]|0;
    	   this.searchable = this.$$('.tab-main').hasClass('tab-active');
       },
       logout(){
    	   localStorage.removeItem("token");
    	   this.$router.replace("/login");
       },
       changePwd(){
    	   this.$router.push("/password");
       },
       about(){
    	   this.$router.push("/about");
       },
       myQr(){
    	   let url = this.qr;
    	   this.$router.push({path:"/qr",query:{qr:url}});
       },
       detail(user){
    	   this.$router.push({path:"/detail",query:{mobile:user.name,userId:user.id}});
       },
       test(){
    	   this.$router.push("/test");
       },
       search(){
    	   this.page = 1;
    	   this.users = [];
    	   if (this.mobile!="")
    		   this.nullsearch = true;
    	   else
    		   this.nullsearch = false;
    	   this.getSicks();
       },
       more(){
    	   searchPopup.open();
       },
       openSelect(){
    	   smartSelect.open();
       },
       reload(){
    	   this.search();
       },
       getSicks(){
    	   var app = this.$f7;
    	   var $$ = this.$$;
    	   let param = {
    		  page:this.page,
    		  size:this.size,
    		  mobile:this.mobile
    	   }
    	   var that = this;
    	   if (!this.loading)
    	   {
	    	   this.loading = true;
	    	   getSicks(param).then(res=>{
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
	}
	
	return Vue.component("home",{
		  data() {
		    return {
		      offsetTops:[],
		      name:'姓名',
		      jobTitle:'',
		      unit:'',
		      qr:'',
		      searchable:true,
		      users:[],
		      page:1,
		      size:20,
		      loading:false,
		      mobile:'',
		      nullsearch:false,
		      searchPopup:null,
		      smartSelect:null,
		    };
		  },
		  watch: {
			 mobile(val){
				 if (val=="")
				 {
					 if (this.nullsearch)
						 this.search();
				 } 
			 }
		  },
	      methods: methods,
		  template:view,
		  activated() {
			  document.getElementById("tab1").scrollTop = this.offsetTops["tab1"]|0;
			  document.getElementById("tab2").scrollTop = this.offsetTops["tab2"]|0;
		  },
		  mounted(){
			  getUser().then(res=>{
				  this.name = res.data.data.name;
				  this.jobTitle = res.data.data.jobTitle;
				  this.unit = res.data.data.unit;
				  this.qr = res.data.data.qr;
			  });
			  
			  var that = this;
			  this.$f7ready((f7) => {
				  var infiniteScrollContent = this.$$('.infinite-scroll-content');
				  f7.infiniteScroll.create(infiniteScrollContent);
				  this.$$('.infinite-scroll-content').on('infinite', function () {
					  this.getSicks();
				  });
				  this.getSicks();
			  });
			  
			  this.users=[],
			  
			  searchPopup = this.$f7.popup.create({
	    		   el: '.popup-search'
	    	  });
	    	  this.$f7.views.create('.view-popup');
	    	  smartSelect = this.$f7.smartSelect.create({
	    		   el: '.smart-select',
	    		   openIn: 'popup'
	    	  });
			  
		  },
		  //beforeRouteLeave (to, from, next) {
			//   alert(to);
		  //}
	})
});