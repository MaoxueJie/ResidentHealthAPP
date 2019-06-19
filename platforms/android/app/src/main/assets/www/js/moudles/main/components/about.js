define(["lib/text!./about.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("about",{
		  template:view,
		  methods: methods
	})
});