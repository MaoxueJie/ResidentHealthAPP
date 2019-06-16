define(["lib/text!./base.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("base",{
		  template:view,
		  methods: methods
	})
});