define(["lib/text!./docadd.html","api/api"],function(view,{addDoc}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   add(){
		  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(this.mobile)) {
        	  this.$f7.toast.create({
				  text: '手机号码格式有误',
				  position: 'center',
				  closeTimeout: 2000
			  }).open();
        	  return;
          }
          if (!this.name)
          {
        	  this.$f7.toast.create({
				  text: '请填写姓名',
				  position: 'center',
				  closeTimeout: 2000
			  }).open();
        	  return;
          }
          if (!this.jobTitle)
          {
        	  this.$f7.toast.create({
				  text: '请填写职务/职称',
				  position: 'center',
				  closeTimeout: 2000
			  }).open();
        	  return;
          }
          if (!this.unit)
          {
        	  this.$f7.toast.create({
				  text: '请填写工作单位',
				  position: 'center',
				  closeTimeout: 2000
			  }).open();
        	  return;
          }
		  let param = {
			 mobile:this.mobile,
			 jobTitle:this.jobTitle,
			 unit:this.unit,
			 name:this.name
		  }
		  addDoc(param).then(res=>{
			  if (res.data.success)
			  {
				  this.back();
			  }else
			  {
				  this.$f7.toast.create({
					  text: res.data.message?res.data.message:'添加失败',
					  position: 'center',
					  closeTimeout: 2000
				  }).open();
			  }
		  });
	   }
	};
	return Vue.component("docadd",{
		data() {
		    return {
		    	mobile:'',
		    	name:'',
		        jobTitle:'',
		        unit:'',
		    }
		},
		template:view,
	    methods: methods
	})
});