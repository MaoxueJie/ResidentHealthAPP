define(["lib/text!./view.html","./components/base",
	"./components/living","./components/phy",
	"./components/psy","./components/sick"
	,"./components/tcm"],function(view,base,living,phy,psy,sick,tcm){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   base(id){
		   console.log("info:" + id);
		   this.$router.push({path:"/base",query:{userId:id}});
	   },
	   living(id){
		   console.log("living:" + id);
		   this.$router.push({path:"/living",query:{userId:id}});
	   },
	   phy(id){
		   console.log("phy:" + id);
		   this.$router.push({path:"/phy",query:{userId:id}});
	   },
	   psy(id){
		   console.log("psy:" + id);
		   this.$router.push({path:"/psy",query:{userId:id}});
	   },
	   sick(id){
		   console.log("sick:" + id);
		   this.$router.push({path:"/sick",query:{userId:id}});
	   },
	   tcm(id){
		   console.log("tcm:" + id);
		   this.$router.push({path:"/tcm",query:{userId:id}});
	   },
	};
	
	const detail = Vue.component("detail",{
		  template:view,
		  methods: methods
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