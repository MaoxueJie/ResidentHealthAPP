define(["lib/text!./psy.html","lib/echarts.min","api/api"],function(view,echarts,{getPsy,getPsyDate,getPsyId}){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
			  let param = {
				userId:this.$route.query.userId
			  }
			  /*
			  getPsy(param).then(res=>{
				  //console.log(res);
				  if (res.data.data)
					  this.psy = res.data.data;
				  else
					  this.psy = "";
			  });*/
			  getPsyDate(param).then(res=>{
				  if (res.data.data)
				  {
					  this.dates = res.data.data;
					  var dateArray = res.data.data.map(function(val){
						  return val.dateStr;
					  }).reverse();
					  var gad7s = res.data.data.map(function(val){return val.gad7Score}).reverse()
					  //var gad7s = res.data.data.map(function(val){return [val.gad7Score,val.dateStr]}).reverse()
					  if (this.echarts.gad7Chart)
					  {
						  this.echarts.gad7Chart.clear();
					  }else
					  {
						  this.echarts.gad7Chart = echarts.init(document.getElementById('gad7'));
					  }
					  
					  var gad7Option = {
							    title: {
							        text: 'GAD7'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    grid: {
							        left: '3%',
							        right: '11%',
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
							            formatter:'{value} 分'
							        },
							        min:0,
							        max:30
							    },
							    series: [
							        {
							            name:'得分',
							            type:'line',
							            data:gad7s
							        }
							    ],
							    visualMap: {
							    	show:false,
						            top: 10,
						            right: 10,
						            pieces: [{
						                gt: 0,
						                lte: 5,
						                color: '#096'
						            }, {
						                gt: 5,
						                lte: 10,
						                color: '#ffde33'
						            }, {
						                gt: 10,
						                lte: 15,
						                color: '#ff9933'
						            }, {
						                gt: 15,
						                lte: 20,
						                color: '#cc0033'
						            }, {
						                gt: 20,
						                lte: 25,
						                color: '#660099'
						            }, {
						                gt: 25,
						                color: '#7e0023'
						            }],
						            outOfRange: {
						                color: '#999'
						            }
						        },
							};
							/*
					  gad7s.unshift(['score', 'date'])
					  var gad7Option = {
							    title: {
							        text: 'GAD7'
							    },
							    dataset: {
							        source:gad7s
							    },
							    grid: {containLabel: true},
							    yAxis: {name: '得分',min:0,max:30},
							    xAxis: {type: 'category'},
							    visualMap: {
							        orient: 'horizontal',
							        left: 'center',
							        min: 0,
							        max: 30,
							        text: ['高', '低'],
							        // Map the score column to color
							        dimension: 0,
							        inRange: {
							            color: ['#D7DA8B', '#E15457']
							        }
							    },
							    series: [
							        {
							            type: 'bar',
							            encode: {
							                y: 'score',
							                x: 'date'
							            },
							            barWidth:"20px",
							        }
							    ]
							};*/
					  this.echarts.gad7Chart.setOption(gad7Option);
					  
					  var phq9s = res.data.data.map(function(val){return val.phq9Score}).reverse()
					  //var phq9s = res.data.data.map(function(val){return [val.phq9Score,val.dateStr]}).reverse()
					  if (this.echarts.phq9Chart)
					  {
						  this.echarts.phq9Chart.clear();
					  }else
					  {
						  this.echarts.phq9Chart = echarts.init(document.getElementById('phq9'));
					  }
					  var phq9Option = {
							    title: {
							        text: 'PHQ9'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    grid: {
							        left: '3%',
							        right: '11%',
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
							            formatter:'{value} 分'
							        },
							        min:0,
							        max:30
							    },
							    series: [
							        {
							            name:'得分',
							            type:'line',
							            data:phq9s
							        }
							    ],
							    visualMap: {
							    	show:false,
						            top: 10,
						            right: 10,
						            pieces: [{
						                gt: 0,
						                lte: 5,
						                color: '#096'
						            }, {
						                gt: 5,
						                lte: 10,
						                color: '#ffde33'
						            }, {
						                gt: 10,
						                lte: 15,
						                color: '#ff9933'
						            }, {
						                gt: 15,
						                lte: 20,
						                color: '#cc0033'
						            }, {
						                gt: 20,
						                lte: 25,
						                color: '#660099'
						            }, {
						                gt: 25,
						                color: '#7e0023'
						            }],
						            outOfRange: {
						                color: '#999'
						            }
						        },
							};
							/*phq9s.unshift(['score', 'date'])
					  var phq9Option = {
							    title: {
							        text: 'PHQ9'
							    },
							    dataset: {
							        source:phq9s
							    },
							    grid: {containLabel: true},
							    yAxis: {name: '得分',min:0,max:30},
							    xAxis: {type: 'category'},
							    visualMap: {
							        orient: 'horizontal',
							        left: 'center',
							        min: 0,
							        max: 30,
							        text: ['高', '低'],
							        // Map the score column to color
							        dimension: 0,
							        inRange: {
							            color: ['#D7DA8B', '#E15457']
							        }
							    },
							    series: [
							        {
							            type: 'bar',
							            encode: {
							                y: 'score',
							                x: 'date'
							            },
							            barWidth:"20px",
							        }
							    ]
							};*/
					  this.echarts.phq9Chart.setOption(phq9Option);
					  
					  
					  var ad8s = res.data.data.map(function(val){return val.ad8Score}).reverse()
					  //var ad8s = res.data.data.map(function(val){return [val.ad8Score,val.dateStr]}).reverse()
					  if (this.echarts.ad8Chart)
					  {
						  this.echarts.ad8Chart.clear();
					  }else
					  {
						  this.echarts.ad8Chart = echarts.init(document.getElementById('ad8'));
					  }
					  
					  var ad8Option = {
							    title: {
							        text: 'AD8'
							    },
							    tooltip: {
							        trigger: 'axis'
							    },
							    grid: {
							        left: '3%',
							        right: '11%',
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
							            formatter:'{value} 分'
							        },
							        min:0,
							    	max:30
							    },
							    series: [
							        {
							            name:'得分',
							            type:'line',
							            data:ad8s
							        }
							    ],
							    visualMap: {
							    	show:false,
						            top: 10,
						            right: 10,
						            pieces: [{
						                gt: 0,
						                lte: 5,
						                color: '#096'
						            }, {
						                gt: 5,
						                lte: 10,
						                color: '#ffde33'
						            }, {
						                gt: 10,
						                lte: 15,
						                color: '#ff9933'
						            }, {
						                gt: 15,
						                lte: 20,
						                color: '#cc0033'
						            }, {
						                gt: 20,
						                lte: 25,
						                color: '#660099'
						            }, {
						                gt: 25,
						                color: '#7e0023'
						            }],
						            outOfRange: {
						                color: '#999'
						            }
						        },
							};
							/*ad8s.unshift(['score', 'date'])
					  var ad8Option = {
							    title: {
							        text: 'AD8'
							    },
							    dataset: {
							        source:ad8s
							    },
							    grid: {containLabel: true},
							    yAxis: {name: '得分',min:0,max:30},
							    xAxis: {type: 'category'},
							    visualMap: {
							        orient: 'horizontal',
							        left: 'center',
							        min: 0,
							        max: 30,
							        text: ['高', '低'],
							        // Map the score column to color
							        dimension: 0,
							        inRange: {
							            color: ['#D7DA8B', '#E15457']
							        }
							    },
							    series: [
							        {
							            type: 'bar',
							            encode: {
							                y: 'score',
							                x: 'date'
							            },
							            barWidth:"20px",
							        }
							    ]
							};*/
					  this.echarts.ad8Chart.setOption(ad8Option);
				  }
			  });
	   },
	   getPsy(id){
		    if(id){
		    	this.charts = false;
		    	this.psy = "";
				let param = {
					id:id
				}
				getPsyId(param).then(res=>{
					  if (res.data.data)
						  this.psy = res.data.data;
					  else
						  this.psy = "";
				});
		    }else{
		    	 this.charts = true;
		    }
		},
	};
	return Vue.component("psy",{
		data() {
		    return {
		      psy:"",
		      dates:[],
		      charts:true,
		      echarts:{
		    	  gad7Chart:null,
		    	  phq9Chart:null,
		    	  ad8Chart:null,
		      }
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