
$(window).load(function() { 
	$("#loader").fadeOut();				
});

$(function(){

	function windowResize()
	{
	
		if($(window).height() <= 300)
			$("body").addClass("smallHeight");
		else
			$("body").removeClass("smallHeight");
		
		//If landscape
		if($(window).height() <= $(window).width())
			$("body").addClass("p-landscape");
		else
			$("body").removeClass("p-landscape");
			
		var homeHeight = parseInt($("#Logo").width() /2) * -1;
		$(".home-content").css({'margin-top': homeHeight});
		
	}
	
	windowResize();
	
	$(window).resize(function() {
		windowResize();
	});
	
	
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 100) { 
			$("body").addClass("p-scrolling");    
		}
		else
		{
			$("body").removeClass("p-scrolling");
		}
	});

	//---------------------------------------------------------------------- mmenu
	$('nav#menu').mmenu({
		 searchfield : false,
		 slidingSubmenus: true,
         position: "top",
         zposition: "front"
	});
		
	//---------------------------------------------------------------------- BANNER SLIDER
	if($(".flexslider").length != 0) {
		$('.flexslider').flexslider({
			animation: "slide",
			start: function(slider){
			  $('body').removeClass('loading');
			}
		});
	}
				
	//---------------------------------------------------------------------- Gallery
	if($("#Gallery").length != 0) {
		$("#Gallery a").photoSwipe();
	}
	
	
	//---------------------------------------------------------------------- ABOUT
	$(".about-openBtn").click(function(){
		var self = $(this);
		
		if(self.hasClass("active"))
		{
			self.parent().find(".o-person-content").slideUp(500);
			self.removeClass("active").find('i').removeClass("fa-minus");
			return false;
		}
		
		self.addClass("active").find('i').addClass("fa-minus");
		self.parent().find(".o-person-content").slideDown(500);
			
		// Easy-pie-chart
			self.parent().find(".chart.red").easyPieChart({
			animate: 2500,
			scaleColor: false,
			lineWidth : 3,
			trackColor : "#efefef",
			barColor : "#131e2d",
			size : 75
		});
		
		$("body.o-page").animate({ scrollTop: self.parent().offset().top -80 }, 600);
	});

	

	
});


