define(["lib/text!./view.html","./components/base",
	"./components/living","./components/phy",
	"./components/psy","./components/sick"
	,"./components/tcm","api/api"],function(view,base,living,phy,psy,sick,tcm,{checkFavorites,addFavorites,removeFavorites}){
	var methods = {
	   back(){
		   this.$router.go(-1);
	   },
	   call(mobile){
		   window.location.href="tel:"+mobile;
	   },
	   base(id){
		   //console.log("info:" + id);
		   this.$router.push({path:"/base",query:{userId:id}});
	   },
	   living(id){
		   //console.log("living:" + id);
		   this.$router.push({path:"/living",query:{userId:id}});
	   },
	   phy(id){
		   //console.log("phy:" + id);
		   this.$router.push({path:"/phy",query:{userId:id}});
	   },
	   psy(id){
		   //console.log("psy:" + id);
		   this.$router.push({path:"/psy",query:{userId:id}});
	   },
	   sick(id){
		   //console.log("sick:" + id);
		   this.$router.push({path:"/sick",query:{userId:id}});
	   },
	   tcm(id){
		   //console.log("tcm:" + id);
		   this.$router.push({path:"/tcm",query:{userId:id}});
	   },
	   add(userId){
		   let param = {
				userId:userId
		   };
		   addFavorites(param).then(res=>{
			  if (res.data.success)
			  {
				  this.showFavorites = false;
				  this.check(userId);
				  this.$f7.toast.create({
					  text: '已加入收藏夹',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }else
			  {
				  this.$f7.toast.create({
					  text: '收藏失败',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }
		   })
	   },
	   remove(userId){
		   let param = {
				userId:userId
		   };
		   removeFavorites(param).then(res=>{
			  if (res.data.success)
			  {
				  this.showFavorites = false;
				  this.check(userId);
				  this.$f7.toast.create({
					  text: '删除成功',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }else
			  {
				  this.$f7.toast.create({
					  text: '删除失败',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();  
			  }
		   })
	   },
	   check(userId){
		  let param = {
			  userId:userId
		  };
		  checkFavorites(param).then(res=>{
			  if (res.data)
			  {
				  this.showFavorites = true;
				  this.favorites = res.data.success;
			  }
		  }) 
	   }
	};
	
	const detail = Vue.component("detail",{
		  data() {
			  return {
				  showFavorites: false,
				  favorites: false,
			  };
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.check(vm.$route.query.userId))
		  },
	});
	
	return [
		{path:"/detail",component:detail},
		{path:"/base",component:base},
		{path:"/phy",component:phy},
		{path:"/psy",component:psy},
		{path:"/sick",component:sick},
		{path:"/tcm",component:tcm},
		{path:"/living",component:living},
	]
});