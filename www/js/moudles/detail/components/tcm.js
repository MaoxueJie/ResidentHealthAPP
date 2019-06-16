define(["lib/text!./tcm.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("tcm",{
		  template:view,
		  methods: methods
	})
});