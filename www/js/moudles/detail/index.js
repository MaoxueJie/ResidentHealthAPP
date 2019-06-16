define(["lib/text!./view.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   info(id){
		   console.log("info:" + id)
	   },
	   living(id){
		   console.log("living:" + id)
	   },
	   phy(id){
		   console.log("phy:" + id)
	   },
	   psy(id){
		   console.log("psy:" + id)
	   },
	   sick(id){
		   console.log("sick:" + id)
	   },
	   tcm(id){
		   console.log("tcm:" + id)
	   },
	};
	return Vue.component("detail",{
		  template:view,
		  methods: methods
	})
});