define(["text!./home.html"],function(view){
	function data(){
	  return {
   	      count: 0,
   	      message:"hello world!"
   	  }
	}
	
	var methods = {
		test(){
  		  this.count++
  		  that = this;
  		  setTimeout(function(){
  			that.$router.push("/")
  		  },1000)
  	    },
  	    second(){
  	    	this.$router.push("m1/second")
  	    }
	}
	
	return Vue.component("m1",{
		      data: data,
		      methods: methods,
			  template:view
	})
});