define(["lib/text!./phy.html","lib/echarts.min","api/api"],function(view,echarts,{getPhy,getPhyDate,getPhyId}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  /*
			  getPhy(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.phy = res.data.data;
				  else
					  this.phy = "";
			  });*/
			  
			  getPhyDate(param).then(res=>{
				  if (res.data.data)
				  {
					  this.dates = res.data.data;
					  var dateArray = res.data.data.map(function(val){
						  return val.dateStr;
					  }).reverse();
					  var heights = res.data.data.map(function(val){return val.height}).reverse()
					  var heightChart = echarts.init(document.getElementById('height'));
					  var heightOption = {
							    title: {
							        text: '身高'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        boundaryGap: false,
							        data: dateArray,
							    },
							    yAxis: {
							    	type: 'value',
							    	axisLabel: {
							            formatter:'{value} cm'
							        },
							    },
							    series: [
							        {
							            name:'身高',
							            type:'line',
							            data:heights
							        }
							    ]
							};
					  heightChart.setOption(heightOption);
					  
					  var weights = res.data.data.map(function(val){return val.weight}).reverse()
					  var weightChart = echarts.init(document.getElementById('weight'));
					  var weightOption = {
							    title: {
							        text: '体重'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        boundaryGap: false,
							        data: dateArray,
							    },
							    yAxis: {
							    	type: 'value',
							    	axisLabel: {
							            formatter:'{value} kg'
							        },
							    },
							    series: [
							        {
							            name:'体重',
							            type:'line',
							            data:weights
							        }
							    ]
							};
					  weightChart.setOption(weightOption);
					  
					  var bloodPressureVal5 = res.data.data.map(function(val){return val.bloodPressureVal5}).reverse()
					  var bloodPressureVal6 = res.data.data.map(function(val){return val.bloodPressureVal6}).reverse()
					  
					  var bloodPressureChart = echarts.init(document.getElementById('bloodPressure'));
					  var bloodPressureOption = {
							    title: {
							        text: '血压\n'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        data:['低压','高压']
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        boundaryGap: false,
							        data: dateArray,
							    },
							    yAxis: {
							    	type: 'value',
							        axisLabel: {
							            formatter:'{value} mmHg'
							        }
							          
							    },
							    series: [
							        {
							            name:'低压',
							            type:'line',
							            data:bloodPressureVal5
							        },
							        {
							            name:'高压',
							            type:'line',
							            data:bloodPressureVal6
							        }
							    ]
							};
					  bloodPressureChart.setOption(bloodPressureOption);
					  
					  
					  var bloodSugarVal1 = res.data.data.map(function(val){return val.bloodSugarVal1}).reverse()
					  var bloodSugarVal3 = res.data.data.map(function(val){return val.bloodSugarVal3}).reverse()
					  var bloodSugarVal4 = res.data.data.map(function(val){return val.bloodSugarVal4}).reverse()
					  
					  
					  var bloodSugarChart = echarts.init(document.getElementById('bloodSugar'));
					  var bloodSugarOption = {
							    title: {
							        text: '血糖\n'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        data:['','空腹血糖','餐后两小时','随机']
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        boundaryGap: false,
							        data: dateArray,
							    },
							    yAxis: {
							    	type: 'value',
							        axisLabel: {
							            formatter:'{value} mmol/L'
							        }
							          
							    },
							    series: [
							        {
							            name:'空腹血糖',
							            type:'line',
							            data:bloodSugarVal1
							        },
							        {
							            name:'餐后两小时',
							            type:'line',
							            data:bloodSugarVal3
							        },
							        {
							            name:'随机',
							            type:'line',
							            data:bloodSugarVal4
							        }
							    ]
							};
					  bloodSugarChart.setOption(bloodSugarOption);
					  
					  var bloodLipidVal1 = res.data.data.map(function(val){return val.bloodLipidVal1}).reverse()
					  var bloodLipidVal2 = res.data.data.map(function(val){return val.bloodLipidVal2}).reverse()
					  var bloodLipidVal3 = res.data.data.map(function(val){return val.bloodLipidVal3}).reverse()
					  var bloodLipidVal4 = res.data.data.map(function(val){return val.bloodLipidVal4}).reverse()
					  
					  
					  var bloodLipidChart = echarts.init(document.getElementById('bloodLipid'));
					  var bloodLipidOption = {
							    title: {
							        text: '血脂\n'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        data:['','','总胆固醇','甘油三酯','高密度脂蛋白胆固醇','低密度脂蛋白胆固醇']
							    },
							    grid: {
							    	top: '45%',
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis: {
							        type: 'category',
							        boundaryGap: false,
							        data: dateArray,
							    },
							    yAxis: {
							    	type: 'value',
							        axisLabel: {
							            formatter:'{value} mmol/L'
							        }
							          
							    },
							    series: [
							        {
							            name:'总胆固醇',
							            type:'line',
							            data:bloodLipidVal1
							        },
							        {
							            name:'甘油三酯',
							            type:'line',
							            data:bloodLipidVal2
							        },
							        {
							            name:'高密度脂蛋白胆固醇',
							            type:'line',
							            data:bloodLipidVal3
							        },
							        {
							            name:'低密度脂蛋白胆固醇',
							            type:'line',
							            data:bloodLipidVal4
							        }
							    ]
							};
					  bloodLipidChart.setOption(bloodLipidOption);
				  }
			  });
	   },
	   getPhy(id){
		   if (id){
			    this.charts = false;
			    this.phy = "";
				let param = {
					id:id
				}
				getPhyId(param).then(res=>{
					  if (res.data.data)
						  this.phy = res.data.data;
					  else
						  this.phy = "";
				});
		   }else
		   {
			   this.charts = true;
		   }
		},
	};
	return Vue.component("phy",{
		data() {
		    return {
		      phy:"",
		      dates:[],
		      charts:true,
		    };
		  },
		  computed: {
			  style() {
		        return this.charts?"display:block;margin-top:15px":"display:none;margin-top:15px";
		      }
		  },
		  template:view,
		  methods: methods,
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});