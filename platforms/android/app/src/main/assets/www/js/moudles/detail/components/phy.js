define(["lib/text!./phy.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("phy",{
		  template:view,
		  methods: methods
	})
});