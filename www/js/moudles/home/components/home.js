define(["lib/text!./home.html","api/api"],function(view, {getUser,getSicks,getMsgs,getLink,test}){
	
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
    	   if (this.$$('.tab-iframe').hasClass('tab-active'))
    	   {
    		   var iframeDiv = document.getElementById("study");
    		   if (!iframeDiv.innerHTML)
    			   iframeDiv.innerHTML = "<iframe style='width:100%;height:100%;margin0;border:0' src='"+this.link+"'></iframe>";
    	   }
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
       adddoc(){
    	   this.$router.push("/docadd");
       },
       updatelink(){
    	   this.$router.push("/link");
       },
       favorites(){
    	   this.$router.push("/favorites");
       },
       myQr(){
    	   let url = this.qr;
    	   this.$router.push({path:"/qr",query:{qr:url}});
       },
       detail(id,mobile){
    	   this.$router.push({path:"/detail",query:{userId:id,mobile:mobile}});
       },
       test(){
    	   this.$router.push("/test");
       },
       search(){
    	   this.page = 1;
    	   this.querySex = null,
    	   this.querySicks = [],
    	   this.queryAge = [],
    	   this.users = [];
    	   if (this.mobile!="")
    		   this.nullsearch = true;
    	   else
    		   this.nullsearch = false;
    	   this.getSicks();
       },
       searchMulti(){
    	   this.nullsearch = false;
    	   this.mobile = "";
    	   this.page = 1;
    	   this.users = [];
    	   searchPopup.close();
    	   this.getSicks();
       },
       more(){
    	   searchPopup.open();
       },
       openSexSelect(){
    	   sexSmartSelect.open();
       },
       openManSelect(){
    	   manSmartSelect.open();
       },
       reload(){
    	   this.querySex = null,
    	   this.querySicks = [],
    	   this.queryAge = [],
    	   this.users = [];
    	   this.page = 1;
    	   this.getSicks();
       },
       reloadMsgs(){
    	   this.msgPage = 1;
    	   this.getMsgs();
       },
       getSicks(){
    	   var app = this.$f7;
    	   var $$ = this.$$;
    	   let param = {
    		  page:this.page,
    		  size:this.size,
    		  mobile:this.mobile,
    		  sex:this.querySex,
    		  age:this.queryAge,
    		  sicks:this.querySicks,
    	   }
    	   var that = this;
    	   if (!this.loading)
    	   {
	    	   this.loading = true;
	    	   getSicks(param).then(res=>{
	    		   //console.log(res);
	    		   if (res.data.success){
	    			   that.page ++;
	    			   for(var i=0;i<res.data.data.length;i++){
	    				   that.users.push({name:res.data.data[i].name?res.data.data[i].name:res.data.data[i].mobile,sex:res.data.data[i].gender?(res.data.data[i].gender==1?'male':res.data.data[i].gender==2?'female':'user-o'):'user-o',id:res.data.data[i].userId,age:res.data.data[i].age});
	    			   }
	    			   if (res.data.data.length<that.size)
	    			   {
	    				 app.infiniteScroll.destroy('.sicks-infinite-scroll');
	    	    		 $$('.sicks_preloader').remove();
	    			   }		   
	    		   }else{
	    			   app.infiniteScroll.destroy('.sicks-infinite-scroll');
	    	    	   $$('.sicks_preloader').remove();
	    		   }

	    		   this.loading = false;
	    		   
	    	   })
    	    }
       },
       getMsgs(){
    	   var app = this.$f7;
    	   var $$ = this.$$;
    	   let param = {
    		  page:this.msgPage,
    		  size:this.msgSize,
    		  max:this.msgMax,
    	   }
    	   var that = this;
    	   if (!this.msgLoading)
    	   {
	    	   this.msgLoading = true;
	    	   getMsgs(param).then(res=>{
	    		   //console.log(res);
	    		   if (res.data.success){
	    			   for(var i=0;i<res.data.data.length;i++){
	    				   if (i==0&&that.msgPage==1)
	    				   {
	    					   that.msgMax = res.data.data[i].id;
	    					   that.msgMin = res.data.data[i].id;
	    				   }
	    				   that.msgs.push({id:res.data.data[i].id,title:res.data.data[i].title,content:res.data.data[i].msg,logo:res.data.data[i].logo,status:res.data.data[i].status,param:JSON.parse(res.data.data[i].param)});
	    			   }
	    			   that.msgPage ++;
	    			   if (that.msgMin == 0)
	    			   {
	    				   that.msgMin = 1;
	    			   }
	    			   if (res.data.data.length<that.msgSize)
	    			   {
	    				 app.infiniteScroll.destroy('.msgs-infinite-scroll');
	    	    		 $$('.msgs_preloader').remove();
	    			   }		   
	    		   }
	    		   this.msgLoading = false;
	    	   })
    	    }
       },
       setData(){
    	    if ((!localStorage.getItem("currentDataUser")) || localStorage.getItem("currentDataUser") != localStorage.getItem("token"))
    	    {
    	    	this.reload();
    	    	getUser().then(res=>{
	  				  this.name = res.data.data.name;
	  				  this.jobTitle = res.data.data.jobTitle;
	  				  this.unit = res.data.data.unit;
	  				  this.admin = res.data.data.admin;
	  				  this.qr = res.data.data.qr;
    	    	});
    	    	localStorage.setItem("currentDataUser",localStorage.getItem("token"))
    	    }else
    	    {
    	    	if (this.users.length==0){
    	    		this.reload();
    	    	}
    	    	if (this.msgs.length==0){
    	    		this.reloadMsgs();
    	    	}
    	    	if (!this.jobTitle)
    	    	{
    	    		getUser().then(res=>{
  	  				  this.name = res.data.data.name;
  	  				  this.jobTitle = res.data.data.jobTitle;
  	  				  this.unit = res.data.data.unit;
  	  				  this.admin = res.data.data.admin;
  	  				  this.qr = res.data.data.qr;
    	    		});
    	    	}
    	    }
       },
       toMsgDetail(msg){
    	   msg.status=1;
    	   this.$router.push({path:"/msg",query:{msgId:msg.id}});
       },
	}
	
	return Vue.component("home",{
		  data() {
		    return {
		      offsetTops:[],
		      name:'姓名',
		      jobTitle:'',
		      unit:'',
		      admin:null,
		      qr:'',
		      searchable:true,
		      users:[],
		      page:1,
		      size:20,
		      loading:false,
		      mobile:'',
		      querySex:null,
		      querySicks:[],
		      queryAge:[],
		      nullsearch:false,
		      searchPopup:null,
		      sexSmartSelect:null,
		      manSmartSelect:null,
		      msgs:[],
		      msgPage:1,
		      msgSize:10,
		      msgMax:0,
		      msgMin:0,
		      msgLoading:false,
		      link:'http://pku_ehealth.baiduux.com/h5/cfbff22c-82be-d15c-1dea-6aba6fb1e276.html',
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
			  document.getElementById("tab3").scrollTop = this.offsetTops["tab3"]|0;
			  document.getElementById("tab4").scrollTop = this.offsetTops["tab4"]|0;
		  },
		  mounted(){
			  var that = this;
			  this.$f7ready((f7) => {
				  var sciks_infiniteScrollContent = this.$$('.sicks-infinite-scroll');
				  f7.infiniteScroll.create(sciks_infiniteScrollContent);
				  sciks_infiniteScrollContent.on('infinite', function () {
					  that.getSicks();
				  });
				  
				  var msgs_infiniteScrollContent = this.$$('.msgs-infinite-scroll');
				  f7.infiniteScroll.create(msgs_infiniteScrollContent);
				  msgs_infiniteScrollContent.on('infinite', function () {
					  that.getMsgs();
				  });
				  
				  var msgs_pullRefresh = this.$$('.ptr-content');
				  f7.ptr.create(msgs_pullRefresh)
				  msgs_pullRefresh.on('ptr:refresh', function () {
					  let param = {
						min:that.msgMin,
				      }
					  if (!that.msgLoading)
			    	  {
						  that.msgLoading = true;
				    	   getMsgs(param).then(res=>{
				    		   if (res.data.success){
				    			   for(var i=0;i<res.data.data.length;i++){
				    				   that.msgMin = res.data.data[i].id;
				    				   that.msgs.unshift({id:res.data.data[i].id,title:res.data.data[i].title,content:res.data.data[i].msg,logo:res.data.data[i].logo,status:res.data.data[i].status,param:JSON.parse(res.data.data[i].param)});
				    			   }
				    		   }
				    		   that.msgLoading = false;
				    		   f7.ptr.done();
				    	   });
			    	  }
					 
				  });

			  });
			  
			  this.users=[],
			  
			  searchPopup = this.$f7.popup.create({
	    		   el: '.popup-search'
	    	  });
	    	  this.$f7.views.create('.view-popup');
	    	  sexSmartSelect = this.$f7.smartSelect.create({
	    		   el: '.sex-smart-select',
	    		   openIn: 'popup',
	    		   popupCloseLinkText: '关闭',
	    	  });
	    	  
	    	  manSmartSelect  = this.$f7.smartSelect.create({
	    		   el: '.man-smart-select',
	    		   openIn: 'popup',
	    		   popupCloseLinkText: '关闭',
	    	  });
	    	  
	    	  this.$f7.range.create({
	    		  el: '.age-range-slider',
	    		  on: {
		    		  changed : function(range,value){
		    			  that.queryAge = value;
		    		  }
	    		  }
	    	  });	
	    	  
	    	  var msgId = localStorage.getItem("msg");
	    	  if (msgId)
	    	  {
	    		  localStorage.removeItem("msg");
	    		  this.$router.push({path:"/msg",query:{msgId:msgId}});
	    	  }
	    	  
	    	  getLink().then(res=>{ 
	    		  if (res.data.success){
	    			  that.link = res.data.data;
	    		  }
	    	  });
		  },
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
		  beforeRouteLeave(to,from,next){ 
			  var iframeDiv = document.getElementById("study");
			  iframeDiv.innerHTML="";
			  next();
		  },
	})
});