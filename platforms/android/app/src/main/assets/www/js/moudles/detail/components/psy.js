define(["lib/text!./psy.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("psy",{
		  template:view,
		  methods: methods
	})
});