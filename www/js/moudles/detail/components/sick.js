define(["lib/text!./sick.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("sick",{
		  template:view,
		  methods: methods
	})
});