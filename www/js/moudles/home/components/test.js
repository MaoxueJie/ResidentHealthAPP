define(["lib/text!./test.html"],function(view){
	var methods = {
	   back(){
		   this.$router.back();
	   },
	   onInfiniteScroll(){
		   alert();
	   }
	      
	};
	return Vue.component("test",{
		  template:view,
		  methods: methods,
		  mounted(){
			  this.$f7ready((f7) => {
				  var app = f7;
				  // Loading flag
				  var allowInfinite = true;

				  // Last loaded index
				  var lastItemIndex = this.$$('.list li').length;

				  // Max items to load
				  var maxItems = 200;

				  // Append items per load
				  var itemsPerLoad = 20;
				  
				  var infiniteScrollContent = this.$$('.infinite-scroll-content');
				  
				  app.infiniteScroll.create(infiniteScrollContent);
				  
				  this.$$('.infinite-scroll-content').on('infinite', function () {
					  // Exit, if loading in progress
					  if (!allowInfinite) return;

					  // Set loading flag
					  allowInfinite = false;

					  // Emulate 1s loading
					  setTimeout(function () {
					    // Reset loading flag
					    allowInfinite = true;

					    if (lastItemIndex >= maxItems) {
					      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
					      app.infiniteScroll.destroy('.infinite-scroll-content');
					      // Remove preloader
					      $$('.infinite-scroll-preloader').remove();
					      return;
					    }

					    // Generate new items HTML
					    var html = '';
					    for (var i = lastItemIndex + 1; i <= lastItemIndex + itemsPerLoad; i++) {
					      html += '<li>Item ' + i + '</li>';
					    }

					    // Append new items
					    $$('.list ul').append(html);

					    // Update last loaded index
					    lastItemIndex = $$('.list li').length;
					  }, 1000);
					});
			  });
			  
		  },
	})
});