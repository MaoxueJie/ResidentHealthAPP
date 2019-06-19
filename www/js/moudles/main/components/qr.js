define(["lib/text!./qr.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   setData(){
		   var qrUrl = this.$route.query.qr;
		   var that = this;
		   if (cordovaHTTP)
		   {
			   cordovaHTTP.get("https://cli.im/api/qrcode/code?", {
				    text: qrUrl,
				    mhid: "5hOSCA3nk88hMHcoI91VMa4"
			   }, { }, function(response) {
				   var html = response.data;
				   var head = html.substring(html.lastIndexOf("<head>"),html.lastIndexOf("</head>"))
				   var script = head.substring(head.lastIndexOf("<script>"),head.lastIndexOf("</script>"))
				   var str = script.substring(script.lastIndexOf("qrcode_plugins_img"))
				   var img = "https:"+str.substring(str.indexOf("\"")+1,str.lastIndexOf("\""))
				   that.qr = img;
			   }, function(response) {
				   console.error(response.error);
			   });
		   }
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
		  beforeRouteEnter(to,from,next){ 
		      next(vm=>vm.setData())
		  },
	})
});