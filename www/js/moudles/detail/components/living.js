define(["lib/text!./living.html","lib/echarts.min","api/api"],function(view,echarts,{getLiving,getLivingDate,getLivingId}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(type){
		      let param = {
				userId:this.$route.query.userId,
				type:type?type:0,
			  }
			  this.type = type?type:0;
			  this.noDataTip = '加载中...';
			  /*
			  getLiving(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.living = res.data.data;
				  else
					  this.living = "";
			  });
			  */
			  getLivingDate(param).then(res=>{
				  this.noDataTip = '无相关数据';
				  if (res.data.data)
				  {
					  this.charts = true;
					  this.dates = res.data.data;
					  var dateArray = res.data.data.map(function(val){
						  return val.dateStr;
					  }).reverse();
					  var breakfast = res.data.data.map(function(val){
						  return val.breakfast;
					  }).reverse();
					  var extraMeal1 = res.data.data.map(function(val){
						  return val.extraMeal1;
					  }).reverse();
					  var lunch = res.data.data.map(function(val){
						  return val.lunch;
					  }).reverse();
					  var extraMeal2 = res.data.data.map(function(val){
						  return val.extraMeal2;
					  }).reverse();
					  var dinner = res.data.data.map(function(val){
						  return val.dinner;
					  }).reverse();
					  var nightingale = res.data.data.map(function(val){
						  return val.nightingale;
					  }).reverse();
					  
					  var violentDaysPerWeek = res.data.data.map(function(val){
						  return val.violentDaysPerWeek;
					  }).reverse();
					  
					  var moderateDaysPerWeek = res.data.data.map(function(val){
						  return val.moderateDaysPerWeek;
					  }).reverse();
					  
					  var walkDaysPerWeek = res.data.data.map(function(val){
						  return val.walkDaysPerWeek;
					  }).reverse();
					  
					  var sittingDaysRecent7Days = res.data.data.map(function(val){
						  return val.sittingDaysRecent7Days;
					  }).reverse();
					  
					  if (this.echarts.mealChart && echarts.getInstanceByDom(document.getElementById('meal')))
					  {
						  this.echarts.mealChart.clear();
					  }else
					  {
						  this.echarts.mealChart = echarts.init(document.getElementById('meal'));
					  }
					  var mealOption = {
							    title: {
							        text: '饮食\n'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        data:['','','早餐','上午加餐','午餐','下午加餐','晚餐','夜宵']
							    },
							    grid: {
							    	top: '35%',
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
							    	type: 'category',
							        boundaryGap: false,
							        axisLabel: {
							            formatter: function(val){
							            	if (val==1)
							            		return '每天';
							            	else if (val==2)
							            		return '经常';
							            	else if (val==3)
							            		return '有时';
							            	else if (val==4)
							            		return '偶尔';
							            	else if (val==5)
							            		return '从不';
							            }
							        },
							        data: ['1','2','3','4','5']
							    },
							    series: [
							        {
							            name:'早餐',
							            type:'line',
							            data:breakfast
							        },
							        {
							            name:'上午加餐',
							            type:'line',
							            data:extraMeal1
							        },
							        {
							            name:'午餐',
							            type:'line',
							            data:lunch
							        },
							        {
							            name:'下午加餐',
							            type:'line',
							            data:extraMeal2
							        },
							        {
							            name:'晚餐',
							            type:'line',
							            data:dinner
							        },
							        {
							            name:'夜宵',
							            type:'line',
							            data:nightingale
							        }
							    ]
							};
					  this.echarts.mealChart.setOption(mealOption);
					  
					  if (this.echarts.movementChart && echarts.getInstanceByDom(document.getElementById('movement')))
					  {
						  this.echarts.movementChart.clear();
					  }else
					  {
						  this.echarts.movementChart = echarts.init(document.getElementById('movement'));
					  }
					  var movementOption = {
							    title: {
							        text: '运动\n'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    legend: {
							        data:['','','剧烈运动','适度运动','步行','静坐']
							    },
							    grid: {
							    	top: '35%',
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
							            formatter:'{value} 天/周'
							        }
							    },
							    series: [
							        {
							            name:'剧烈运动',
							            type:'line',
							            data:violentDaysPerWeek
							        },
							        {
							            name:'适度运动',
							            type:'line',
							            data:moderateDaysPerWeek
							        },
							        {
							            name:'步行',
							            type:'line',
							            data:walkDaysPerWeek
							        },
							        {
							            name:'静坐',
							            type:'line',
							            data:sittingDaysRecent7Days
							        }
							    ]
							};
					  this.echarts.movementChart.setOption(movementOption);
				  }else
				  {
					  this.dates = [];
					  this.charts = false;
				  }
			  });
		},
		getLiving(id){
			if (id)
			{
				this.charts = false;
				this.living = "";
				let param = {
						id:id
				}
				getLivingId(param).then(res=>{
					  if (res.data.data)
						  this.living = res.data.data;
					  else
						  this.living = "";
				});
			}else
			{
				this.charts = true;
			}
		},
	};
	return Vue.component("living",{
		  data() {
		    return {
		      living:"",
		      dates:[],
		      charts:true,
		      echarts:{
		    	  mealChart:null,
		    	  movementChart:null,
		      },
		      type:0,
		      noDataTip:'无相关数据'
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