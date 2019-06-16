define(["lib/text!./living.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("living",{
		  template:view,
		  methods: methods
	})
});