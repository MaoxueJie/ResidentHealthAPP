define(["lib/text!./qr.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   }
	};
	return Vue.component("qr",{
		  data() {
		    return {
		      qr:''
		    };
		  },
		  template:view,
		  methods: methods,
		  mounted(){
			  this.qr = this.$route.query.qr;
		  }
	})
});