define(["lib/text!./password.html","api/api"],function(view,{changePwd}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   change(){
		   if (this.newPassword=="")
		   {
			   this.$f7.toast.create({
					  text: '新密码不能为空',
					  position: 'center',
					  closeTimeout: 2000
			   }).open();
			   return;
		   }
		   
		   if (this.newPassword!=this.rePassword)
		   {
			   this.$f7.toast.create({
					  text: '两次输入新密码不一致',
					  position: 'center',
					  closeTimeout: 2000
			   }).open();
			   return;
		   }
		   let param = {
			  oldPassword:this.oldPassword,
			  newPassword:this.newPassword
		   }
		   changePwd(param).then(res=>{
			   if (res.data.success)
			   {
				   this.oldPassword = "";
				   this.newPassword = "";
				   this.rePassword = "";
				   this.back();
			   }else
			   {
				   this.$f7.toast.create({
						  text: res.data.message,
						  position: 'center',
						  closeTimeout: 2000
				   }).open();
			   }
		   });
	   }
	};
	return Vue.component("password",{
		  data() {
		    return {
		      oldPassword:'',
		      newPassword:'',
		      rePassword:'',
		    };
		  },
		  template:view,
		  methods: methods
	})
});