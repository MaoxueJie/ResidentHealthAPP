define(["text!./view.html","api/api"],function(view,{login}){
	var methods = {
	   login(){
		  let param = {
				  mobile:this.user,
				  password:this.password
		  }
		  login(param).then(res=>{
			  //console.log(res);
			  if (res.data.success)
			  {
				  this.user = "";
				  this.password = "";
				  localStorage.setItem("token", res.data.data.token);
				  let path = localStorage.getItem("last");
				  if (path)
				  {
					  this.$router.replace(path)
				  }else
				  {
					  this.$router.replace("/home");
				  }
			  }else
			  {
				  this.$f7.toast.create({
					  text: '用户名或密码错误',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }
		  });
	   },
	   eyeClick(){
		   if (this.eye == "eye")
			   this.eye="eye_off";
		   else
			   this.eye="eye";
		   localStorage.setItem("eye",this.eye);
	   }
	}
			
	return Vue.component("login",{
		  data:function(){
			return{
				user:null,
				password:null,
				eye:false,
			}  
		  },
		  methods:methods,
		  template:view,
		  created() {
			 this.eye = localStorage.getItem("eye") || "eye";
		  }
	})
});